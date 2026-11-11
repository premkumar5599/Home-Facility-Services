import { createEnquiryEncryption } from "./encryption.mjs";
import { submitEnquiry } from "./enquiry.mjs";
import { deliveryOptions } from "./smtp.mjs";

export function createVercelHandler(env = process.env, dependencies = {}) {
  let encryption;
  const attempts = new Map();
  const delivery = deliveryOptions(env, dependencies.createTransport);
  const allowedOrigins = new Set(
    (
      env.ENQUIRY_ALLOWED_ORIGINS ||
      env.SITE_URL ||
      "https://homefacilityservices.in"
    )
      .split(",")
      .map((origin) => origin.trim())
      .filter(Boolean),
  );
  return async (request, operation) => {
    const headers = new Headers({
      "Cache-Control": "no-store",
      Vary: "Origin",
      "X-Content-Type-Options": "nosniff",
    });
    const reply = (status, body) => Response.json(body, { status, headers });
    const origin = request.headers.get("origin");
    if (origin && !allowedOrigins.has(origin)) return reply(403, { ok: false });
    if (origin) headers.set("Access-Control-Allow-Origin", origin);
    headers.set("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
    headers.set("Access-Control-Allow-Headers", "Content-Type");
    if (request.method === "OPTIONS")
      return new Response(null, { status: 204, headers });
    const expectedMethod = operation === "key" ? "GET" : "POST";
    if (request.method !== expectedMethod) {
      headers.set("Allow", `${expectedMethod}, OPTIONS`);
      return reply(405, { ok: false });
    }
    if (operation !== "key") {
      if (!request.headers.get("content-type")?.startsWith("application/json"))
        return reply(415, { ok: false });
      // Vercel overwrites x-forwarded-for. This is a per-instance backstop;
      // configure Vercel Firewall rate limits for protection across instances.
      const ip =
        request.headers.get("x-forwarded-for")?.split(",")[0].trim() ||
        "unknown";
      const now = Date.now();
      for (const [key, entry] of attempts)
        if (now - entry.start >= 60000) attempts.delete(key);
      const entry = attempts.get(ip) || { start: now, count: 0 };
      if (attempts.size >= 10000 && !attempts.has(ip))
        return reply(429, { ok: false });
      entry.count += 1;
      attempts.set(ip, entry);
      if (entry.count > 10) {
        headers.set("Retry-After", "60");
        return reply(429, { ok: false });
      }
    }
    let crypto;
    try {
      // Both functions must use the same persistent PEM key, including after
      // cold starts. Never generate an ephemeral production key here.
      encryption ||= createEnquiryEncryption({
        privateKeyPem: env.ENQUIRY_PRIVATE_KEY,
      });
      crypto = await encryption;
    } catch (error) {
      encryption = undefined;
      const code = [
        "KEY_MISSING",
        "KEY_INVALID_FORMAT",
        "KEY_INVALID",
        "KEY_WEAK",
      ].includes(error.code)
        ? error.code
        : "KEY_INITIALIZATION_FAILED";
      console.error(`Enquiry encryption configuration: ${code}`);
      return reply(503, {
        ok: false,
        error: "Enquiry service is not configured.",
      });
    }
    if (operation === "key") return reply(200, crypto.descriptor);
    let payload;
    try {
      if (Number(request.headers.get("content-length")) > 65536)
        return reply(413, { ok: false });
      const reader = request.body?.getReader();
      if (!reader) return reply(400, { ok: false });
      const chunks = [];
      let length = 0;
      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        length += value.byteLength;
        if (length > 65536) {
          await reader.cancel();
          return reply(413, { ok: false });
        }
        chunks.push(Buffer.from(value));
      }
      payload = await crypto.decrypt(
        JSON.parse(Buffer.concat(chunks).toString("utf8")),
      );
    } catch {
      return reply(400, { ok: false, error: "Invalid request." });
    }
    const result = await submitEnquiry(payload, {
      ...delivery,
      // Vercel tests must also use a configured key; test mode never sends mail.
      testMode: env.ENQUIRY_TEST_MODE === "true",
    });
    return reply(result.status, result.body);
  };
}

const handle = createVercelHandler();
export default handle;
