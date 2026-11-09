import test from "node:test";
import assert from "node:assert/strict";
import { webcrypto, randomUUID, generateKeyPairSync } from "node:crypto";
import { createEnquiryEncryption } from "./encryption.mjs";

const encoder = new TextEncoder();
const encryption = await createEnquiryEncryption({ testMode: true });
const payload = {
  name: "Test Manager",
  email: "test@example.com",
  service: "plumbing",
  message: "தமிழ் enquiry & details " + "x".repeat(3000),
};

async function encrypt(
  enquiry = payload,
  descriptor = encryption.descriptor,
  extra = {},
) {
  const { subtle } = webcrypto;
  const publicKey = await subtle.importKey(
    "jwk",
    descriptor.publicKey,
    { name: "RSA-OAEP", hash: "SHA-256" },
    false,
    ["encrypt"],
  );
  const aes = await subtle.generateKey({ name: "AES-GCM", length: 256 }, true, [
    "encrypt",
  ]);
  const iv = webcrypto.getRandomValues(new Uint8Array(12));
  const ciphertext = await subtle.encrypt(
    {
      name: "AES-GCM",
      iv,
      additionalData: encoder.encode(`hfs-enquiry-v1:${descriptor.keyId}`),
      tagLength: 128,
    },
    aes,
    encoder.encode(
      JSON.stringify({
        enquiry,
        issuedAt: Date.now(),
        nonce: randomUUID(),
        ...extra,
      }),
    ),
  );
  const wrappedKey = await subtle.encrypt(
    "RSA-OAEP",
    publicKey,
    await subtle.exportKey("raw", aes),
  );
  return {
    version: 1,
    keyId: descriptor.keyId,
    iv: Buffer.from(iv).toString("base64"),
    ciphertext: Buffer.from(ciphertext).toString("base64"),
    wrappedKey: Buffer.from(wrappedKey).toString("base64"),
  };
}

test("hybrid encryption handles long Unicode enquiries and exposes no private key", async () => {
  const envelope = await encrypt();
  assert.deepEqual(await encryption.decrypt(envelope), payload);
  assert.equal(encryption.descriptor.publicKey.d, undefined);
  assert(!JSON.stringify(envelope).includes(payload.email));
});
test("fresh submissions use different ciphertext and key material", async () => {
  const first = await encrypt();
  const second = await encrypt();
  assert.notEqual(first.iv, second.iv);
  assert.notEqual(first.wrappedKey, second.wrappedKey);
  assert.notEqual(first.ciphertext, second.ciphertext);
});
test("plaintext and malformed envelopes are rejected", async () => {
  for (const input of [
    payload,
    null,
    {},
    { version: 2, keyId: encryption.descriptor.keyId },
    { version: 1, keyId: "wrong-key" },
  ])
    await assert.rejects(() => encryption.decrypt(input));
});
test("tampering with ciphertext, IV or wrapped key is rejected", async () => {
  const envelope = await encrypt();
  for (const field of ["ciphertext", "iv", "wrappedKey"]) {
    const bytes = Buffer.from(envelope[field], "base64");
    bytes[0] ^= 1;
    await assert.rejects(() =>
      encryption.decrypt({ ...envelope, [field]: bytes.toString("base64") }),
    );
  }
});
test("expired, future-dated and replayed submissions are rejected", async () => {
  for (const issuedAt of [Date.now() - 700000, Date.now() + 120000])
    await assert.rejects(async () =>
      encryption.decrypt(
        await encrypt(payload, encryption.descriptor, { issuedAt }),
      ),
    );
  const envelope = await encrypt();
  await encryption.decrypt(envelope);
  await assert.rejects(() => encryption.decrypt(envelope));
});
test("email mode requires a private key; stable server keys can decrypt after restart", async () => {
  await assert.rejects(() => createEnquiryEncryption());
  const { privateKey } = generateKeyPairSync("rsa", {
    modulusLength: 3072,
    privateKeyEncoding: { type: "pkcs8", format: "pem" },
    publicKeyEncoding: { type: "spki", format: "pem" },
  });
  const first = await createEnquiryEncryption({ privateKeyPem: privateKey });
  const restarted = await createEnquiryEncryption({
    privateKeyPem: privateKey,
  });
  assert.equal(first.descriptor.keyId, restarted.descriptor.keyId);
  const envelope = await encrypt(payload, first.descriptor);
  assert.deepEqual(await restarted.decrypt(envelope), payload);
});
