const services = {
  housekeeping: "Housekeeping",
  security: "Security services",
  "water-wash": "Water wash",
  plumbing: "Plumbing",
  "electrical-maintenance": "Electrical maintenance",
  staffing: "Staffing & outsourcing",
  multiple: "Multiple services",
};

export async function submitEnquiry(
  payload,
  {
    testMode = false,
    apiKey,
    from,
    to = "hr@homefacilityservices.in",
    send = fetch,
  } = {},
) {
  const invalid = {
    status: 400,
    body: { ok: false, error: "Check your enquiry details." },
  };
  if (!payload || typeof payload !== "object" || Array.isArray(payload))
    return invalid;
  const limits = {
    name: 100,
    company: 150,
    email: 200,
    phone: 30,
    location: 200,
    message: 3000,
    service: 40,
    website: 200,
  };
  const data = {};
  for (const [field, max] of Object.entries(limits)) {
    if (payload[field] !== undefined && typeof payload[field] !== "string")
      return invalid;
    data[field] = (payload[field] || "").trim();
    if (data[field].length > max) return invalid;
  }
  if (data.website) return invalid;
  if (
    !data.name ||
    !data.message ||
    !Object.hasOwn(services, data.service) ||
    !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)
  )
    return invalid;
  if (/[\r\n]/.test(data.name + data.email)) return invalid;
  if (testMode) return { status: 200, body: { ok: true, mode: "test" } };
  if (!apiKey || !from || !to)
    return {
      status: 503,
      body: { ok: false, error: "Email delivery is not configured." },
    };
  try {
    const response = await send("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      signal: AbortSignal.timeout(10000),
      body: JSON.stringify({
        from,
        to: [to],
        reply_to: data.email,
        subject: `Facility service enquiry: ${services[data.service]}`,
        text: `Name: ${data.name}\nCompany: ${data.company || "Not provided"}\nEmail: ${data.email}\nPhone: ${data.phone || "Not provided"}\nLocation: ${data.location || "Not provided"}\nService: ${services[data.service]}\n\nRequirements:\n${data.message}`,
      }),
    });
    const result = await response.json();
    if (!response.ok || typeof result.id !== "string" || !result.id)
      throw new Error("Provider rejected email");
    return { status: 200, body: { ok: true, mode: "email" } };
  } catch {
    return {
      status: 502,
      body: {
        ok: false,
        error: "Email delivery could not be confirmed. Please try again.",
      },
    };
  }
}
