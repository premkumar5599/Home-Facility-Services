import { CompanyStats } from "@/components/company-stats";
import { pageMetadata } from "@/lib/seo";
import { FAQ } from "@/components/faq";
import { generalFAQs } from "@/lib/service-content";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Check } from "lucide-react";
import { ButtonLink, CTA, Eyebrow } from "@/components/ui";
import { services, steps } from "@/lib/data";
import { ScrollReveal } from "@/components/scroll-reveal";
import { LogoMarquee } from "@/components/logo-marquee";

export const metadata = pageMetadata(
  "Facility Services in Chennai, Vellore & Hosur",
  "Home Facility Services provides housekeeping, security, water wash, plumbing, electrical maintenance and staffing support. Serving Chennai, Vellore and Hosur.",
  "/",
);

export default function Home() {
  return (
    <>
      <section className="hero home-hero" aria-labelledby="home-hero-title">
        <div className="container hero-grid">
          <div className="hero-copy">
            <Eyebrow>SERVING CHENNAI, VELLORE & HOSUR</Eyebrow>
            <h1 id="home-hero-title">
              Better care for
              <br />
              <span>your workplace.</span>
            </h1>
            <p className="hero-description">
              From daily housekeeping to security and technical support, we help
              keep your premises ready for the people who use them. Serving
              Chennai, Vellore and Hosur.
            </p>
            <div className="hero-actions">
              <ButtonLink href="/contact/">
                Discuss your requirements
              </ButtonLink>
              <Link
                prefetch={false}
                className="hero-service-link"
                href="/services/"
              >
                Explore our services{" "}
                <ArrowUpRight size={18} aria-hidden="true" />
              </Link>
            </div>
            <div className="hero-proof">
              <span>
                <Check size={14} /> Trained people
              </span>
              <span>
                <Check size={14} /> Flexible services
              </span>
              <span>
                <Check size={14} /> Chennai based
              </span>
            </div>
            <CompanyStats variant="hero" />
          </div>
          <div className="home-hero-visual">
            <div className="home-hero-main">
              <Image
                src="/assets/home/workplace.jpg"
                alt="Bright modern workplace atrium"
                fill
                priority
                sizes="(max-width: 750px) calc(100vw - 58px), 46vw"
              />
            </div>
            <div className="home-hero-inset">
              <Image
                src="/assets/stock/housekeeping-team.jpg"
                alt="Housekeeping team mopping floors and cleaning surfaces and windows"
                fill
                sizes="(max-width: 750px) 43vw, 17vw"
              />
            </div>
            <div className="hero-image-caption">
              <span>PEOPLE. PLACES. EVERYDAY CARE.</span>
              <p>Support that fits your space.</p>
            </div>
            <p className="home-photo-note">
              Stock photography; illustrative service environments.
            </p>
          </div>
        </div>
        <div className="container sectors-strip">
          <span>SUPPORTING YOUR EVERYDAY</span>
          <div>
            <span>Offices</span>
            <span>Healthcare</span>
            <span>Automotive</span>
            <span>Hospitality</span>
            <span>Residential</span>
          </div>
        </div>
      </section>

      <section
        className="home-photo-services section"
        aria-labelledby="home-photo-services-title"
      >
        <div className="container">
          <div className="section-heading home-reveal">
            <div>
              <Eyebrow>SUPPORT FOR WORKING SPACES</Eyebrow>
              <h2 id="home-photo-services-title">
                The details people notice.
                <br />
                <span className="muted-heading">
                  The support you can count on.
                </span>
              </h2>
            </div>
            <p>
              From daily upkeep to specialist personnel, HFS helps businesses
              keep their facilities ready for the people who use them. Serving
              Chennai, Vellore and Hosur.
            </p>
          </div>
          <div className="home-photo-grid">
            {services.map((service, index) => (
              <Link
                prefetch={false}
                href={`/services/${service.slug}/`}
                className="home-photo-card home-reveal"
                key={service.slug}
              >
                <div className="home-service-image">
                  <Image
                    src={`/assets/${service.image}`}
                    alt={`Illustrative stock photo for ${service.title.toLowerCase()}`}
                    fill
                    sizes="(max-width: 600px) calc(100vw - 40px), (max-width: 1050px) 45vw, 31vw"
                  />
                  <small>0{index + 1} / 06</small>
                </div>
                <div className="home-service-body">
                  <h3>{service.title}</h3>
                  <p>{service.description}</p>
                  <span className="home-service-link">
                    Explore service{" "}
                    <ArrowUpRight size={19} aria-hidden="true" />
                  </span>
                </div>
              </Link>
            ))}
          </div>
          <p className="home-photo-disclaimer">
            Stock photos illustrate service environments and do not depict HFS
            personnel or client sites.
          </p>
        </div>
      </section>

      <ScrollReveal>
        <section className="section approach-section">
          <div className="container approach-grid">
            <div className="home-reveal">
              <Eyebrow>THE HFS WAY</Eyebrow>
              <h2>
                Built around your space.
                <br />
                <span className="muted-heading">Focused on your people.</span>
              </h2>
              <p className="section-intro">
                A well-managed facility makes a difference to everyone who walks
                through the door. We&apos;re here to make that happen.
              </p>
              <ButtonLink href="/about/" secondary>
                Get to know HFS
              </ButtonLink>
            </div>
            <div className="approach-visual-steps">
              <figure className="approach-photo">
                <Image
                  src="/assets/stock/team-meeting.jpg"
                  alt="Colleagues reviewing documents around a meeting table"
                  fill
                  sizes="(max-width: 750px) 90vw, 45vw"
                />
                <figcaption>Understanding your space comes first.</figcaption>
              </figure>
              <div className="steps">
                {steps.map((s, i) => (
                  <div className="step home-reveal" key={s.title}>
                    <span>0{i + 1}</span>
                    <div>
                      <h3>{s.title}</h3>
                      <p>{s.text}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      </ScrollReveal>

      <ScrollReveal>
        <section className="section">
          <div className="container">
            <div className="section-heading home-reveal">
              <div>
                <Eyebrow>IN GOOD COMPANY</Eyebrow>
                <h2>
                  Across industries.
                  <br />
                  Around your needs.
                </h2>
              </div>
              <Link prefetch={false} className="text-link" href="/clients/">
                Explore our client portfolio <ArrowUpRight size={17} />
              </Link>
            </div>
            <div className="home-reveal">
              <LogoMarquee />
            </div>
          </div>
        </section>
      </ScrollReveal>

      <ScrollReveal>
        <section className="section soft-section">
          <div className="container split-heading home-reveal">
            <div>
              <Eyebrow>START WITH A CLEAR BRIEF</Eyebrow>
              <h2>
                Planning facility support?
                <br />
                Here&apos;s what to prepare.
              </h2>
            </div>
            <div>
              <p className="section-intro">
                Your location, work areas, staffing needs and schedule help
                define the right service. Our checklist explains what to share
                and what to clarify in a quotation.
              </p>
              <ButtonLink href="/facility-planning/" secondary>
                View the enquiry checklist
              </ButtonLink>
            </div>
          </div>
        </section>
      </ScrollReveal>

      <div className="home-reveal">
        <FAQ
          title="Facility services: your questions answered"
          items={generalFAQs}
        />
      </div>
      <div className="home-reveal">
        <CTA />
      </div>
    </>
  );
}
