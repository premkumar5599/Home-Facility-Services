import { CompanyStats } from '@/components/company-stats';
import { pageMetadata } from '@/lib/seo';
import { FAQ } from '@/components/faq';
import { generalFAQs } from '@/lib/service-content';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowDown, ArrowUpRight, Check } from 'lucide-react';
import { ButtonLink, CTA, Eyebrow, ServiceCard } from '@/components/ui';
import { services, steps } from '@/lib/data';
import { ScrollReveal } from '@/components/scroll-reveal';
import { LogoMarquee } from '@/components/logo-marquee';

export const metadata = pageMetadata(
  'Facility Services in Chennai, Vellore & Hosur',
  'Home Facility Services provides housekeeping, security, water wash, plumbing, electrical maintenance and staffing support. Serving Chennai, Vellore and Hosur.',
  '/'
);

export default function Home() {
  return (
    <>
      <section className="hero">
        <div className="container hero-grid">
          <div className="hero-copy">
            <Eyebrow>SERVING CHENNAI, VELLORE & HOSUR</Eyebrow>
            <h1>
              Great spaces.<br />
              Better working<br />
              <span>days.</span>
            </h1>
            <p>
              Housekeeping, security, maintenance and staffing support in Chennai, Vellore and Hosur. We take care of your premises so you can focus on your business.
            </p>
            <div className="hero-actions">
              <ButtonLink href="/contact/">Find your facility solution</ButtonLink>
              <Link className="circle-link" href="/services/" aria-label="Explore services">
                <ArrowDown size={20} />
              </Link>
            </div>
            <div className="hero-proof">
              <span><Check size={14} /> Trained people</span>
              <span><Check size={14} /> Flexible services</span>
              <span><Check size={14} /> Chennai based</span>
            </div>
            <CompanyStats variant="hero" />
          </div>
          <div className="home-hero-visual">
            <div className="home-hero-main">
              <Image src="/assets/home/workplace.jpg" alt="Bright modern workplace atrium" fill priority sizes="(max-width: 750px) 100vw, 46vw" />
            </div>
            <div className="home-hero-inset">
              <Image src="/assets/home/cleaning.jpg" alt="Cleaner maintaining a workplace corridor" fill sizes="(max-width: 750px) 43vw, 17vw" />
            </div>
            <p className="home-photo-note">Illustrative workplace photography</p>
          </div>
        </div>
        <div className="container sectors-strip">
          <span>SUPPORTING YOUR EVERYDAY</span>
          <div>Offices <i /> Healthcare <i /> Automotive <i /> Hospitality <i /> Residential</div>
        </div>
      </section>

      <section className="home-photo-services section" aria-labelledby="home-photo-services-title">
        <div className="container">
          <div className="section-heading home-reveal">
            <div>
              <Eyebrow>SUPPORT FOR WORKING SPACES</Eyebrow>
              <h2 id="home-photo-services-title">The details people notice.<br /><span className="muted-heading">The support you can count on.</span></h2>
            </div>
            <p>From daily upkeep to specialist personnel, HFS helps businesses keep their facilities ready for the people who use them.</p>
          </div>
          <div className="home-photo-grid">
            <Link href="/services/housekeeping/" className="home-photo-card home-reveal">
              <Image src="/assets/home/cleaning.jpg" alt="Cleaner maintaining an indoor corridor" fill sizes="(max-width: 750px) 100vw, 32vw" />
              <small>01 / 06</small>
              <span><strong>Housekeeping</strong><ArrowUpRight size={20} /></span>
            </Link>
            <Link href="/services/water-wash/" className="home-photo-card home-reveal">
              <Image src="/assets/services/water-wash.jpg" alt="Worker washing a vehicle" fill sizes="(max-width: 750px) 100vw, 32vw" />
              <small>02 / 06</small>
              <span><strong>Vehicle water wash</strong><ArrowUpRight size={20} /></span>
            </Link>
            <Link href="/services/staffing/" className="home-photo-card home-reveal">
              <Image src="/assets/home/workplace.jpg" alt="Modern workplace atrium" fill sizes="(max-width: 750px) 100vw, 32vw" />
              <small>03 / 06</small>
              <span><strong>Staffing &amp; site support</strong><ArrowUpRight size={20} /></span>
            </Link>
          </div>
          <p className="home-photo-disclaimer">Photos illustrate service environments and do not depict HFS personnel or client sites.</p>
        </div>
      </section>

      <ScrollReveal>
        <section className="section">
          <div className="container">
            <div className="section-heading home-reveal">
              <div>
                <Eyebrow>WHAT WE TAKE CARE OF</Eyebrow>
              <h2>More ways we support<br /><span className="muted-heading">your everyday operations.</span></h2>
              </div>
              <div>
                <p>Specialist people and practical expertise for the systems and spaces your business relies on.</p>
                <Link className="text-link" href="/services/">
                  Discover all services <ArrowUpRight size={17} />
                </Link>
              </div>
            </div>
            <div className="services-grid">
              {services.filter(s => ['security', 'plumbing', 'electrical-maintenance'].includes(s.slug)).map((s, i) => (
                <div className="home-reveal" key={s.slug}>
                  <ServiceCard service={s} index={i + 3} />
                </div>
              ))}
            </div>
          </div>
        </section>
      </ScrollReveal>

      <ScrollReveal>
        <section className="section approach-section">
          <div className="container approach-grid">
            <div className="home-reveal">
              <Eyebrow>THE HFS WAY</Eyebrow>
              <h2>Built around your space.<br /><span className="muted-heading">Focused on your people.</span></h2>
              <p className="section-intro">
                A well-managed facility makes a difference to everyone who walks through the door. We&apos;re here to make that happen.
              </p>
              <ButtonLink href="/about/" secondary>Get to know HFS</ButtonLink>
              
            </div>
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
        </section>
      </ScrollReveal>

      <ScrollReveal>
        <section className="section">
          <div className="container">
            <div className="section-heading home-reveal">
              <div>
                <Eyebrow>IN GOOD COMPANY</Eyebrow>
                <h2>Across industries.<br />Around your needs.</h2>
              </div>
              <Link className="text-link" href="/clients/">
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
              <h2>Planning facility support?<br />Here&apos;s what to prepare.</h2>
            </div>
            <div>
              <p className="section-intro">
                Your location, work areas, staffing needs and schedule help define the right service. Our checklist explains what to share and what to clarify in a quotation.
              </p>
              <ButtonLink href="/facility-planning/" secondary>
                View the enquiry checklist
              </ButtonLink>
            </div>
          </div>
        </section>
      </ScrollReveal>

      <div className="home-reveal">
        <FAQ title="Facility services: your questions answered" items={generalFAQs} />
      </div>
      <div className="home-reveal">
        <CTA />
      </div>
    </>
  );
}
