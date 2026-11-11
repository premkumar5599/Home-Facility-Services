"use client";
import { useEffect, useState, type FormEvent } from "react";
import { ArrowUpRight, CheckCircle2 } from "lucide-react";
import Link from "next/link";
import { company, services } from "@/lib/data";
import { prepareEncryptedEnquiry } from "@/lib/enquiry-encryption";
export function EnquiryForm() {
  const [service, setService] = useState("");
  const [status, setStatus] = useState("");
  const [ready, setReady] = useState(false);
  const [sending, setSending] = useState(false);
  const [failed, setFailed] = useState(false);
  useEffect(() => {
    setReady(true);
    const value = new URLSearchParams(window.location.search).get("service");
    if (value && services.some((s) => s.slug === value)) setService(value);
  }, []);
  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (sending) return;
    const form = event.currentTarget;
    const payload = Object.fromEntries(new FormData(form));
    setSending(true);
    setStatus("");
    setFailed(false);
    try {
      const endpoint =
        process.env.NEXT_PUBLIC_ENQUIRY_ENDPOINT || "/api/enquiry/";
      const encrypted = await prepareEncryptedEnquiry(payload, endpoint);
      const response = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(encrypted),
        credentials: "omit",
        signal: AbortSignal.timeout(25000),
      });
      const result = await response.json();
      if (!response.ok || result.ok !== true)
        throw new Error("Submission failed");
      setStatus(
        result.mode === "test"
          ? "Test enquiry received successfully. No email was sent."
          : "Your enquiry has been submitted to our email service. Thank you; the HFS team can reply using your contact details.",
      );
      form.reset();
      setService("");
    } catch {
      setFailed(true);
      setStatus(
        `We could not submit your enquiry. Your details are still here. Please try again, email ${company.email} or call ${company.phone}.`,
      );
    } finally {
      setSending(false);
    }
  }

  return (
    <form
      id="enquiry"
      className="enquiry-form"
      method="post"
      action="/api/enquiry"
      onSubmit={submit}
    >
      <span className="form-tag">LET’S GET STARTED</span>
      <h2>Tell us what you need.</h2>
      <p>Share a few details to help us understand your facility.</p>
      {!ready && (
        <p>
          This enquiry tool needs JavaScript. You can{" "}
          <a href={`mailto:${company.email}`}>email HFS</a> or{" "}
          <a href={`tel:${company.telephone}`}>call {company.phone}</a>{" "}
          directly.
        </p>
      )}
      <fieldset disabled={!ready || sending} className="enquiry-fields">
        <legend className="visually-hidden">
          Your facility service enquiry
        </legend>
        <div className="form-grid">
          <label>
            Your name <span>*</span>
            <input
              name="name"
              required
              autoComplete="name"
              placeholder="Full name"
              maxLength={100}
            />
          </label>
          <label>
            Company
            <input
              name="company"
              autoComplete="organization"
              placeholder="Business name"
              maxLength={150}
            />
          </label>
          <label>
            Email address <span>*</span>
            <input
              name="email"
              type="email"
              required
              autoComplete="email"
              placeholder="you@company.com"
              maxLength={200}
            />
          </label>
          <label>
            Phone number
            <input
              name="phone"
              type="tel"
              autoComplete="tel"
              placeholder="Your contact number"
              maxLength={30}
            />
          </label>
        </div>
        <label>
          Service required <span>*</span>
          <select
            value={service}
            onChange={(e) => setService(e.target.value)}
            required
            name="service"
          >
            <option value="">Choose a service</option>
            {services.map((s) => (
              <option value={s.slug} key={s.slug}>
                {s.title}
              </option>
            ))}
            <option value="multiple">Multiple services</option>
          </select>
        </label>
        <label>
          Facility location
          <input name="location" placeholder="City or area" maxLength={200} />
        </label>
        <label>
          Your requirements <span>*</span>
          <textarea
            name="message"
            required
            rows={4}
            placeholder="Tell us about your premises, staffing needs or service requirements…"
            maxLength={3000}
          />
        </label>
        <div className="enquiry-trap" aria-hidden="true">
          <label>
            Leave this field empty
            <input name="website" tabIndex={-1} autoComplete="off" />
          </label>
        </div>
        <button type="submit" className="button" disabled={!ready || sending}>
          {sending ? "Sending enquiry..." : "Send enquiry"}{" "}
          <ArrowUpRight size={18} />
        </button>
      </fieldset>
      <p className="form-note">
        Your details are sent to HFS to respond to your enquiry. Submitting this
        form does not confirm a booking.{" "}
        <Link prefetch={false} href="/privacy/">
          Read how your enquiry is handled.
        </Link>
      </p>
      {status && (
        <div className="form-status" role={failed ? "alert" : "status"}>
          {!failed && <CheckCircle2 size={20} />}
          <p>{status}</p>
        </div>
      )}
    </form>
  );
}
