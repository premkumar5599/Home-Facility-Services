export type EnquiryPublicKey = {
  version: number;
  keyId: string;
  publicKey: JsonWebKey;
};

const encoder = new TextEncoder();

function base64(value: ArrayBuffer | Uint8Array) {
  const bytes = value instanceof Uint8Array ? value : new Uint8Array(value);
  return btoa(String.fromCharCode(...bytes));
}

export async function encryptEnquiry(
  enquiry: Record<string, FormDataEntryValue>,
  descriptor: EnquiryPublicKey,
) {
  if (descriptor.version !== 1 || !/^[a-f0-9]{64}$/.test(descriptor.keyId)) {
    throw new Error("Unsupported enquiry encryption key");
  }
  const publicKey = await crypto.subtle.importKey(
    "jwk",
    descriptor.publicKey,
    { name: "RSA-OAEP", hash: "SHA-256" },
    false,
    ["encrypt"],
  );
  const aesKey = await crypto.subtle.generateKey(
    { name: "AES-GCM", length: 256 },
    true,
    ["encrypt"],
  );
  const iv = crypto.getRandomValues(new Uint8Array(12));
  const ciphertext = await crypto.subtle.encrypt(
    {
      name: "AES-GCM",
      iv,
      additionalData: encoder.encode(`hfs-enquiry-v1:${descriptor.keyId}`),
      tagLength: 128,
    },
    aesKey,
    encoder.encode(
      JSON.stringify({
        enquiry,
        issuedAt: Date.now(),
        nonce: crypto.randomUUID(),
      }),
    ),
  );
  const wrappedKey = await crypto.subtle.encrypt(
    { name: "RSA-OAEP" },
    publicKey,
    await crypto.subtle.exportKey("raw", aesKey),
  );
  return {
    version: 1,
    keyId: descriptor.keyId,
    wrappedKey: base64(wrappedKey),
    iv: base64(iv),
    ciphertext: base64(ciphertext),
  };
}

export async function prepareEncryptedEnquiry(
  enquiry: Record<string, FormDataEntryValue>,
  endpoint: string,
) {
  const url = new URL(endpoint, window.location.origin);
  const loopback = ["localhost", "127.0.0.1", "[::1]"].includes(url.hostname);
  if (
    !window.isSecureContext ||
    (url.protocol !== "https:" && !(url.protocol === "http:" && loopback)) ||
    url.username ||
    url.password
  ) {
    throw new Error("HTTPS is required for enquiry submission");
  }
  const keyUrl = new URL(url);
  keyUrl.pathname = `${url.pathname.replace(/\/$/, "")}/key/`;
  keyUrl.search = "";
  const response = await fetch(keyUrl, {
    cache: "no-store",
    credentials: "omit",
    signal: AbortSignal.timeout(10000),
    redirect: "error",
  });
  if (!response.ok) throw new Error("Enquiry encryption unavailable");
  return encryptEnquiry(enquiry, await response.json());
}
