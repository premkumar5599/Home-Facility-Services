import { FAQ } from "@/components/faq";
import { generalFAQs } from "@/lib/service-content";
import { IndustryContent } from "@/components/business-content";
import { pageMetadata } from "@/lib/seo";
import type { Metadata } from "next";
import { CTA, PageHero, Eyebrow } from "@/components/ui";
import { services } from "@/lib/data";
import { serviceContent } from "@/lib/service-content";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

export const metadata: Metadata = pageMetadata(
  "Facility Services in Chennai, Vellore & Hosur",
  "Explore HFS housekeeping, security, vehicle water wash, plumbing, electrical maintenance and staffing services. Serving Chennai, Vellore and Hosur.",
  "/services/",
);

export default function Services() {
  return (
    <>
      <PageHero
        label="Our services"
        title="Facility services in Chennai, Vellore and Hosur."
        description="Compare housekeeping, security personnel, vehicle water wash, plumbing, electrical maintenance and staffing for your business or shared premises. Choose a service to see who it is for and what to include in your enquiry."
      />
      <section className="section">
        <div className="container service-media-grid">
          {services.map((s, i) => (
            <Link
              prefetch={false}
              className="service-media-card home-reveal"
              href={`/services/${s.slug}/`}
              key={s.slug}
            >
              <div className="service-media-image">
                <Image
                  src={`/assets/${s.image}`}
                  alt={`Illustrative photo for ${s.title.toLowerCase()}`}
                  fill
                  sizes="(max-width: 750px) 90vw, 33vw"
                />
              </div>
              <div className="service-media-body">
                <span className="service-media-number">0{i + 1} / 06</span>
                <h2>{s.title}</h2>
                <p>{s.description}</p>
                <span className="service-media-link">
                  Explore service <ArrowUpRight size={18} />
                </span>
              </div>
            </Link>
          ))}
        </div>
        <p className="container service-photo-note">
          Stock photography illustrates the services and spaces; it does not
          depict HFS personnel or client sites.
        </p>
      </section>
      <section
        className="section soft-section"
        aria-labelledby="compare-services"
      >
        <div className="container">
          <Eyebrow>CHOOSE YOUR STARTING POINT</Eyebrow>
          <h2 id="compare-services">Which service fits your requirement?</h2>
          <div
            className="comparison-scroll"
            tabIndex={0}
            role="region"
            aria-label="Service comparison"
          >
            <table className="service-comparison">
              <caption>
                Use these enquiry topics to compare services. Duties, resources,
                staffing and timing are confirmed in your quotation.
              </caption>
              <thead>
                <tr>
                  <th scope="col">Service</th>
                  <th scope="col">Enquiry focus</th>
                  <th scope="col">What to prepare</th>
                </tr>
              </thead>
              <tbody>
                {services.map((service) => (
                  <tr key={service.slug}>
                    <th scope="row">
                      <Link
                        prefetch={false}
                        href={`/services/${service.slug}/`}
                      >
                        {service.title}
                      </Link>
                    </th>
                    <td>{service.description}</td>
                    <td>{serviceContent[service.slug].planning[0]}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="section-intro">
            If you need people to work alongside your existing team, describe
            the roles, duties and reporting lines. If you need support for a
            wider service scope, list the work areas, tasks and responsibilities
            you want included. HFS can assess the proposed arrangement before
            you agree a service.
          </p>
          <Link
            prefetch={false}
            className="text-link"
            href="/facility-planning/"
          >
            Prepare a facility service brief <ArrowUpRight size={18} />
          </Link>
        </div>
      </section>
      <section className="section soft-section">
        <div className="container split-heading fade-up">
          <div>
            <Eyebrow>FLEXIBLE BY DESIGN</Eyebrow>
            <h2>
              Your premises.
              <br />
              Your priorities.
            </h2>
          </div>
          <div>
            <p className="section-intro">
              Whether you need a single service or support across your facility,
              our team starts by understanding your requirements.
            </p>
            <p className="muted">
              We work with corporate offices, hotels, hospitals, automotive and
              food industries, multi-storey buildings and retail spaces. Talk to
              us about your location, workforce and operational needs.
            </p>
          </div>
        </div>
      </section>
      <div className="fade-up">
        <IndustryContent />
      </div>
      <FAQ title="Choosing your facility services" items={generalFAQs} />
      <CTA />
    </>
  );
}
