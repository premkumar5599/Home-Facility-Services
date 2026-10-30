import { FAQ } from '@/components/faq';
import { generalFAQs } from '@/lib/service-content';
import { IndustryContent } from '@/components/business-content';
import { pageMetadata } from '@/lib/seo';
import type { Metadata } from 'next';
import { CTA, PageHero, Eyebrow } from '@/components/ui';
import { services } from '@/lib/data';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';

export const metadata: Metadata = pageMetadata(
  'Facility Services in Chennai, Vellore & Hosur',
  'Explore HFS housekeeping, security, vehicle water wash, plumbing, electrical maintenance and staffing services. Serving Chennai, Vellore and Hosur.',
  '/services/'
);

export default function Services() {
  return (
    <>
      <PageHero
        label="Our services"
        title="Facility services in Chennai, Vellore and Hosur."
        description="From the everyday details to essential technical support, explore services designed around the way you work."
      />
      <section className="section">
        <div className="container service-media-grid">
          {services.map((s, i) => (
            <Link className="service-media-card home-reveal" href={`/services/${s.slug}/`} key={s.slug}>
              <div className="service-media-image">
                <Image src={`/assets/${s.image}`} alt={`Illustrative photo for ${s.title.toLowerCase()}`} fill sizes="(max-width: 750px) 90vw, 33vw" />
              </div>
              <div className="service-media-body">
                <span className="service-media-number">0{i + 1} / 06</span>
                <h2>{s.title}</h2>
                <p>{s.description}</p>
                <span className="service-media-link">Explore service <ArrowUpRight size={18} /></span>
              </div>
            </Link>
          ))}
        </div>
        <p className="container service-photo-note">Photos illustrate the services and spaces; they do not depict HFS personnel or client sites.</p>
      </section>
      <section className="section soft-section">
        <div className="container split-heading fade-up">
          <div>
            <Eyebrow>FLEXIBLE BY DESIGN</Eyebrow>
            <h2>Your premises.<br />Your priorities.</h2>
          </div>
          <div>
            <p className="section-intro">
              Whether you need a single service or support across your facility, our team starts by understanding your requirements.
            </p>
            <p className="muted">
              We work with corporate offices, hotels, hospitals, automotive and food industries, multi-storey buildings and retail spaces. Talk to us about your location, workforce and operational needs.
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
