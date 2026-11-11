import nodemailer from "nodemailer";

export function smtpSender(env, createTransport = nodemailer.createTransport) {
  const required = [env.SMTP_HOST, env.SMTP_USER, env.SMTP_PASS];
  if (required.some((value) => !value || value.startsWith("REPLACE_")))
    return undefined;
  const port = Number(env.SMTP_PORT || 465);
  const secure = (env.SMTP_SECURE || "true") === "true";
  if (!((port === 465 && secure) || (port === 587 && !secure)))
    return undefined;
  let transport;
  return async (message) => {
    transport ||= createTransport({
      host: env.SMTP_HOST,
      port,
      secure,
      requireTLS: !secure,
      auth: { user: env.SMTP_USER, pass: env.SMTP_PASS },
      connectionTimeout: 5000,
      greetingTimeout: 5000,
      socketTimeout: 10000,
      disableFileAccess: true,
      disableUrlAccess: true,
      logger: false,
      debug: false,
    });
    const result = await transport.sendMail(message);
    if (
      !Array.isArray(result.accepted) ||
      !result.accepted.some(
        (address) => address.toLowerCase() === message.to.toLowerCase(),
      ) ||
      result.rejected?.length
    )
      throw new Error("SMTP did not accept the recipient");
  };
}

export function deliveryOptions(env, createTransport) {
  return {
    from: env.ENQUIRY_FROM || env.SMTP_USER,
    to: env.ENQUIRY_TO || "hr@homefacilityservices.in",
    sendMail: smtpSender(env, createTransport),
  };
}
