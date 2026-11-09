import {
  createPrivateKey,
  createPublicKey,
  createHash,
  webcrypto,
} from "node:crypto";

const { subtle } = webcrypto;
const encoder = new TextEncoder();

function decode(value, maxBytes) {
  if (
    typeof value !== "string" ||
    value.length > Math.ceil(maxBytes / 3) * 4 ||
    !/^[A-Za-z0-9+/]+={0,2}$/.test(value)
  )
    throw new Error("Invalid encrypted enquiry");
  const bytes = Buffer.from(value, "base64");
  if (bytes.length > maxBytes || bytes.toString("base64") !== value)
    throw new Error("Invalid encrypted enquiry");
  return bytes;
}

export async function createEnquiryEncryption({
  testMode = false,
  privateKeyPem,
} = {}) {
  let privateKey;
  let publicKey;
  if (privateKeyPem) {
    const key = createPrivateKey(privateKeyPem);
    if (
      key.asymmetricKeyType !== "rsa" ||
      key.asymmetricKeyDetails.modulusLength < 3072
    )
      throw new Error("Enquiry key must be RSA with at least 3072 bits");
    privateKey = await subtle.importKey(
      "pkcs8",
      key.export({ type: "pkcs8", format: "der" }),
      { name: "RSA-OAEP", hash: "SHA-256" },
      false,
      ["decrypt"],
    );
    publicKey = await subtle.importKey(
      "spki",
      createPublicKey(key).export({ type: "spki", format: "der" }),
      { name: "RSA-OAEP", hash: "SHA-256" },
      true,
      ["encrypt"],
    );
  } else if (testMode) {
    ({ privateKey, publicKey } = await subtle.generateKey(
      {
        name: "RSA-OAEP",
        modulusLength: 3072,
        publicExponent: new Uint8Array([1, 0, 1]),
        hash: "SHA-256",
      },
      false,
      ["encrypt", "decrypt"],
    ));
  } else {
    throw new Error(
      "Configure ENQUIRY_PRIVATE_KEY or ENQUIRY_PRIVATE_KEY_FILE before starting email mode",
    );
  }
  const keyId = createHash("sha256")
    .update(Buffer.from(await subtle.exportKey("spki", publicKey)))
    .digest("hex");
  const descriptor = {
    version: 1,
    keyId,
    publicKey: await subtle.exportKey("jwk", publicKey),
  };
  const nonces = new Map();
  return {
    descriptor,
    async decrypt(envelope) {
      if (!envelope || envelope.version !== 1 || envelope.keyId !== keyId)
        throw new Error("Invalid encrypted enquiry");
      const wrapped = decode(
        envelope.wrappedKey,
        privateKey.algorithm.modulusLength / 8,
      );
      if (wrapped.length !== privateKey.algorithm.modulusLength / 8)
        throw new Error("Invalid encrypted enquiry");
      const iv = decode(envelope.iv, 12);
      if (iv.length !== 12) throw new Error("Invalid encrypted enquiry");
      const ciphertext = decode(envelope.ciphertext, 32768);
      const rawKey = await subtle.decrypt(
        { name: "RSA-OAEP" },
        privateKey,
        wrapped,
      );
      if (rawKey.byteLength !== 32)
        throw new Error("Invalid encrypted enquiry");
      const aesKey = await subtle.importKey("raw", rawKey, "AES-GCM", false, [
        "decrypt",
      ]);
      const plaintext = await subtle.decrypt(
        {
          name: "AES-GCM",
          iv,
          additionalData: encoder.encode(`hfs-enquiry-v1:${keyId}`),
          tagLength: 128,
        },
        aesKey,
        ciphertext,
      );
      const data = JSON.parse(
        new TextDecoder("utf-8", { fatal: true }).decode(plaintext),
      );
      const now = Date.now();
      if (
        !Number.isSafeInteger(data.issuedAt) ||
        data.issuedAt < now - 600000 ||
        data.issuedAt > now + 60000 ||
        typeof data.nonce !== "string" ||
        !/^[a-f0-9-]{36}$/.test(data.nonce)
      )
        throw new Error("Invalid encrypted enquiry");
      for (const [nonce, expiry] of nonces)
        if (expiry < now) nonces.delete(nonce);
      if (nonces.has(data.nonce) || nonces.size >= 10000)
        throw new Error("Invalid encrypted enquiry");
      nonces.set(data.nonce, data.issuedAt + 600000);
      return data.enquiry;
    },
  };
}
