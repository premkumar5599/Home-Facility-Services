import test from "node:test";
import assert from "node:assert/strict";
import { generateKeyPairSync, webcrypto, randomUUID } from "node:crypto";
import { createVercelHandler } from "./vercel-handler.mjs";

const { privateKey } = generateKeyPairSync("rsa", {
  modulusLength: 3072,
  privateKeyEncoding: { type: "pkcs8", format: "pem" },
  publicKeyEncoding: { type: "spki", format: "pem" },
});
const env = {
  ENQUIRY_PRIVATE_KEY: privateKey,
  SITE_URL: "https://homefacilityservices.in",
  SMTP_HOST: "smtp.example.com",
  SMTP_USER: "website@example.com",
  SMTP_PASS: "test-only-password",
};
const origin = env.SITE_URL;
const encoder = new TextEncoder();
async function envelope(descriptor) {
  const { subtle } = webcrypto;
  const publicKey = await subtle.importKey(
    "jwk",
    descriptor.publicKey,
    { name: "RSA-OAEP", hash: "SHA-256" },
    false,
    ["encrypt"],
  );
  const key = await subtle.generateKey({ name: "AES-GCM", length: 256 }, true, [
    "encrypt",
  ]);
  const iv = webcrypto.getRandomValues(new Uint8Array(12));
  const bytes = await subtle.encrypt(
    {
      name: "AES-GCM",
      iv,
      additionalData: encoder.encode(`hfs-enquiry-v1:${descriptor.keyId}`),
    },
    key,
    encoder.encode(
      JSON.stringify({
        issuedAt: Date.now(),
        nonce: randomUUID(),
        enquiry: {
          name: "Visitor",
          email: "visitor@example.com",
          service: "plumbing",
          message: "Office support",
        },
      }),
    ),
  );
  return {
    version: 1,
    keyId: descriptor.keyId,
    iv: Buffer.from(iv).toString("base64"),
    ciphertext: Buffer.from(bytes).toString("base64"),
    wrappedKey: Buffer.from(
      await subtle.encrypt(
        "RSA-OAEP",
        publicKey,
        await subtle.exportKey("raw", key),
      ),
    ).toString("base64"),
  };
}
const request = (method, body, requestOrigin = origin) =>
  new Request(`${origin}/api/enquiry/`, {
    method,
    headers: { origin: requestOrigin, "Content-Type": "application/json" },
    ...(body !== undefined ? { body: JSON.stringify(body) } : {}),
  });

test("separate Vercel instances share the configured key and deliver encrypted enquiries through SMTP", async () => {
  const keyHandler = createVercelHandler(env);
  let deliveries = 0;
  const submitHandler = createVercelHandler(env, {
    createTransport: () => ({
      sendMail: async (message) => {
        deliveries++;
        assert.equal(message.to, "hr@homefacilityservices.in");
        return { accepted: [message.to] };
      },
    }),
  });
  const keyResponse = await keyHandler(request("GET"), "key");
  assert.equal(keyResponse.headers.get("cache-control"), "no-store");
  const descriptor = await keyResponse.json();
  assert.equal(descriptor.publicKey.d, undefined);
  const encrypted = await envelope(descriptor);
  const response = await submitHandler(request("POST", encrypted), "submit");
  assert.equal(response.status, 200);
  assert.equal(deliveries, 1);
  assert.equal(
    (await submitHandler(request("POST", encrypted), "submit")).status,
    400,
  );
  assert.equal(
    (await submitHandler(request("POST", { name: "plaintext" }), "submit"))
      .status,
    400,
  );
  assert.equal(deliveries, 1);
});

test("Vercel handler rejects unknown origins, unsupported methods, oversized input and missing key", async () => {
  const handler = createVercelHandler(env);
  assert.equal(
    (await handler(request("POST", {}, "https://attacker.example"), "submit"))
      .status,
    403,
  );
  assert.equal((await handler(request("GET"), "submit")).status, 405);
  assert.equal(
    (await handler(request("POST", "x".repeat(66000)), "submit")).status,
    413,
  );
  const unconfigured = createVercelHandler({});
  assert.equal((await unconfigured(request("GET"), "key")).status, 503);
});

test("Vercel handler limits repeated submissions without calling SMTP", async () => {
  const handler = createVercelHandler(env);
  for (let i = 0; i < 10; i++) await handler(request("POST", {}), "submit");
  const response = await handler(request("POST", {}), "submit");
  assert.equal(response.status, 429);
  assert.equal(response.headers.get("retry-after"), "60");
});
