import test from "node:test";
import assert from "node:assert/strict";
import { submitEnquiry } from "./enquiry.mjs";

const valid = {
  name: "Test Manager",
  email: "test@example.com",
  service: "plumbing",
  message: "Office plumbing support",
  website: "",
};

test("test mode validates without contacting an email provider", async () => {
  const result = await submitEnquiry(valid, {
    testMode: true,
    send: () => {
      throw new Error("Must not call email provider");
    },
  });
  assert.deepEqual(result, { status: 200, body: { ok: true, mode: "test" } });
});
test("rejects invalid, missing, oversized and automated submissions", async () => {
  for (const payload of [
    null,
    [],
    {},
    { ...valid, email: "invalid" },
    { ...valid, service: "__proto__" },
    { ...valid, name: " " },
    { ...valid, message: "a".repeat(3001) },
    { ...valid, name: "x\nBcc: attacker" },
    { ...valid, website: "spam" },
  ]) {
    assert.equal(
      (await submitEnquiry(payload, { testMode: true })).status,
      400,
    );
  }
});
test("missing delivery configuration cannot report success", async () => {
  const result = await submitEnquiry(valid);
  assert.equal(result.status, 503);
  assert.equal(result.body.ok, false);
});
test("email provider receives a fixed recipient and visitor Reply-To", async () => {
  const result = await submitEnquiry(
    { ...valid, to: "attacker@example.com" },
    {
      apiKey: "test-key",
      from: "HFS <verified@example.com>",
      send: async (url, options) => {
        assert.equal(url, "https://api.resend.com/emails");
        const message = JSON.parse(options.body);
        assert.deepEqual(message.to, ["hr@homefacilityservices.in"]);
        assert.equal(message.reply_to, valid.email);
        assert.match(message.text, /Office plumbing support/);
        return Response.json({ id: "test-provider-id" });
      },
    },
  );
  assert.deepEqual(result.body, { ok: true, mode: "email" });
});
test("provider rejection, invalid response and network failure never claim success", async () => {
  for (const send of [
    async () => Response.json({ error: "rejected" }, { status: 403 }),
    async () => Response.json({}),
    async () => {
      throw new Error("Network unavailable");
    },
  ]) {
    const result = await submitEnquiry(valid, {
      apiKey: "test-key",
      from: "verified@example.com",
      send,
    });
    assert.equal(result.status, 502);
    assert.equal(result.body.ok, false);
  }
});
