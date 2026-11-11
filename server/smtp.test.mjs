import test from "node:test";
import assert from "node:assert/strict";
import { smtpSender, deliveryOptions } from "./smtp.mjs";
import { submitEnquiry } from "./enquiry.mjs";

const env = {
  SMTP_HOST: "smtp.example.com",
  SMTP_PORT: "465",
  SMTP_SECURE: "true",
  SMTP_USER: "website@example.com",
  SMTP_PASS: "test-app-password",
};
const enquiry = {
  name: "Test Visitor",
  email: "visitor@example.com",
  service: "housekeeping",
  message: "Daily office cleaning",
  to: "attacker@example.com",
  from: "attacker@example.com",
};

test("SMTP uses TLS and server-controlled sender/recipient with visitor Reply-To", async () => {
  let calls = 0;
  const options = deliveryOptions(env, (config) => {
    assert.equal(config.port, 465);
    assert.equal(config.secure, true);
    assert.deepEqual(config.auth, { user: env.SMTP_USER, pass: env.SMTP_PASS });
    assert.equal(config.disableFileAccess, true);
    return {
      async sendMail(message) {
        calls++;
        assert.equal(message.from, env.SMTP_USER);
        assert.equal(message.to, "hr@homefacilityservices.in");
        assert.equal(message.replyTo, enquiry.email);
        assert.match(message.text, /Daily office cleaning/);
        return { accepted: [message.to], rejected: [] };
      },
    };
  });
  const result = await submitEnquiry(enquiry, options);
  assert.equal(result.status, 200);
  assert.equal(calls, 1);
});

test("SMTP port 587 requires STARTTLS; incompatible port/security is rejected", async () => {
  const sender = smtpSender(
    { ...env, SMTP_PORT: "587", SMTP_SECURE: "false" },
    (options) => {
      assert.equal(options.requireTLS, true);
      assert.equal(options.secure, false);
      return {
        sendMail: async () => ({ accepted: ["hr@homefacilityservices.in"] }),
      };
    },
  );
  await sender({ to: "hr@homefacilityservices.in" });
  assert.equal(smtpSender({ ...env, SMTP_PORT: "25" }), undefined);
  assert.equal(smtpSender({ ...env, SMTP_PORT: "587" }), undefined);
});

test("missing/placeholder SMTP settings fail closed; test and invalid submissions send nothing", async () => {
  for (const settings of [
    {},
    { ...env, SMTP_PASS: "" },
    { ...env, SMTP_HOST: "REPLACE_WITH_HOST" },
  ])
    assert.equal(
      (await submitEnquiry(enquiry, deliveryOptions(settings))).status,
      503,
    );
  const options = deliveryOptions(env, () => {
    throw Error("Must not connect");
  });
  assert.equal(
    (await submitEnquiry(enquiry, { ...options, testMode: true })).status,
    200,
  );
  assert.equal(
    (await submitEnquiry({ ...enquiry, email: "invalid" }, options)).status,
    400,
  );
});

test("SMTP rejection and authentication/network errors cannot report success", async () => {
  for (const result of [
    { accepted: [], rejected: ["hr@homefacilityservices.in"] },
    null,
  ]) {
    const options = deliveryOptions(env, () => ({
      sendMail: async () => {
        if (!result) throw Error("Authentication failed");
        return result;
      },
    }));
    const response = await submitEnquiry(enquiry, options);
    assert.equal(response.status, 502);
    assert.equal(response.body.ok, false);
  }
});
