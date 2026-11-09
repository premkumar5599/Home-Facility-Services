import { pageMetadata } from "@/lib/seo";
import type { Metadata } from "next";
import { PageHero } from "@/components/ui";
import { company } from "@/lib/data";
export const metadata: Metadata = pageMetadata(
  "Privacy Notice",
  "Learn how the HFS enquiry form works, what happens to the details you enter and how to contact Home Facility Services about your information.",
  "/privacy/",
);
export default function Privacy() {
  return (
    <>
      <PageHero
        label="Privacy notice"
        title="Your enquiry, in your hands."
        description="How this website handles the details you enter."
      />
      <section className="section">
        <div className="container prose">
          <h2>Enquiry form</h2>
          <p>
            When you submit an enquiry, your name, email, service requirement
            and any other details you enter are encrypted in your browser and
            sent to our enquiry endpoint. The endpoint decrypts the message to
            validate it and, when configured, send it by email. This does not
            provide end-to-end encryption of email messages. When email delivery
            is configured, an email provider processes those details to send the
            message to HFS. In local test mode, the endpoint validates the
            enquiry without sending an email and the form states that no email
            was sent. Form entries are not saved in browser storage or a website
            database by this implementation. HFS and its email provider may
            retain delivered messages to handle your enquiry.
          </p>
          <h2>Email and phone enquiries</h2>
          <p>
            When you contact HFS by email or telephone, the details you share
            can be used to understand and respond to your service requirements.
            Avoid including confidential financial information in an initial
            enquiry.
          </p>
          <h2>Website hosting</h2>
          <p>
            The hosting provider may process technical connection information
            needed to deliver and protect the website. This website does not add
            advertising trackers or analytics scripts.
          </p>
          <h2>Questions</h2>
          <p>
            Contact <a href={`mailto:${company.email}`}>{company.email}</a> with
            questions about an enquiry or information you have shared.
          </p>
        </div>
      </section>
    </>
  );
}
