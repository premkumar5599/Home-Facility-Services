import { generateKeyPairSync } from "node:crypto";
import { mkdirSync, writeFileSync } from "node:fs";
import { resolve } from "node:path";

const directory = resolve(".local");
mkdirSync(directory, { recursive: true });
const path = resolve(directory, "enquiry-private.pem");
const { privateKey } = generateKeyPairSync("rsa", {
  modulusLength: 3072,
  privateKeyEncoding: { type: "pkcs8", format: "pem" },
  publicKeyEncoding: { type: "spki", format: "pem" },
});
writeFileSync(path, privateKey, { mode: 0o600, flag: "wx" });
console.log(
  `Private key saved to ${path}. Keep it server-side; never publish it. Existing keys are never overwritten.`,
);
