import { createServer } from "node:http";
import { submitEnquiry } from "./enquiry.mjs";
import { readFile } from "node:fs/promises";
import { createEnquiryEncryption } from "./encryption.mjs";
import { deliveryOptions } from "./smtp.mjs";

const port = Number(process.env.ENQUIRY_PORT || 8787);
const testMode =
  process.env.ENQUIRY_TEST_MODE === "true" ||
  process.argv.includes("--test-mode");
const encryption = await createEnquiryEncryption({
  testMode,
  privateKeyPem:
    process.env.ENQUIRY_PRIVATE_KEY?.replace(/\\n/g, "\n") ||
    (process.env.ENQUIRY_PRIVATE_KEY_FILE
      ? await readFile(process.env.ENQUIRY_PRIVATE_KEY_FILE, "utf8")
      : undefined),
});
const allowedOrigins = new Set(
  (
    process.env.ENQUIRY_ALLOWED_ORIGINS ||
    "http://localhost:3000,http://127.0.0.1:3000"
  )
    .split(",")
    .map((value) => value.trim()),
);
const attempts = new Map();
const delivery = deliveryOptions(process.env);
const server = createServer(async (request, response) => {
  const origin = request.headers.origin;
  response.setHeader("Cache-Control", "no-store");
  response.setHeader("Vary", "Origin");
  if (origin && !allowedOrigins.has(origin)) {
    response.writeHead(403).end();
    return;
  }
  if (origin) response.setHeader("Access-Control-Allow-Origin", origin);
  response.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
  response.setHeader("Access-Control-Allow-Headers", "Content-Type");
  const reply = (status, body) =>
    response
      .writeHead(status, { "Content-Type": "application/json" })
      .end(JSON.stringify(body));
  const path = new URL(request.url, "http://localhost").pathname.replace(
    /\/+$/,
    "",
  );
  if (path === "/api/enquiry/key" && request.method === "GET") {
    reply(200, encryption.descriptor);
    return;
  }
  if (path !== "/api/enquiry" && path !== "/api/enquiry/key") {
    reply(404, { ok: false });
    return;
  }
  if (request.method === "OPTIONS") {
    response.writeHead(204).end();
    return;
  }
  if (path !== "/api/enquiry") {
    reply(405, { ok: false });
    return;
  }
  if (request.method !== "POST") {
    response.setHeader("Allow", "POST, OPTIONS");
    reply(405, { ok: false });
    return;
  }
  if (!request.headers["content-type"]?.startsWith("application/json")) {
    reply(415, { ok: false });
    return;
  }
  const key = request.socket.remoteAddress;
  const now = Date.now();
  for (const [ip, entry] of attempts)
    if (now - entry.start > 60000) attempts.delete(ip);
  const entry = attempts.get(key) || { start: now, count: 0 };
  entry.count += 1;
  attempts.set(key, entry);
  if (entry.count > 10) {
    response.setHeader("Retry-After", "60");
    reply(429, { ok: false });
    return;
  }
  try {
    const chunks = [];
    let length = 0;
    for await (const chunk of request) {
      length += chunk.length;
      if (length > 65536) {
        reply(413, { ok: false });
        return;
      }
      chunks.push(chunk);
    }
    const result = await submitEnquiry(
      await encryption.decrypt(
        JSON.parse(Buffer.concat(chunks).toString("utf8")),
      ),
      {
        testMode,
        ...delivery,
      },
    );
    reply(result.status, result.body);
  } catch {
    reply(400, { ok: false, error: "Invalid request." });
  }
});
server.requestTimeout = 15000;
server.listen(port, "127.0.0.1", () => {
  console.log(
    `Enquiry endpoint: http://127.0.0.1:${port}/api/enquiry (${testMode ? "TEST MODE: no emails sent" : "email mode"})`,
  );
});
