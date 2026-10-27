import { pageMetadata, absoluteUrl } from '@/lib/seo';
import { serviceContent } from '@/lib/service-content';
import { FAQ } from '@/components/faq';
import { StructuredData, BreadcrumbSchema } from '@/components/structured-data';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { services, steps } from '@/lib/data';
import { ButtonLink, CheckItem, Eyebrow, CTA } from '@/components/ui';

export function generateStaticParams() {
  return services.map(s => ({ slug: s.slug }));
}

export const dynamicParams = false;

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const service = services.find(s => s.slug === slug);
  return service
    ? pageMetadata(
        `${service.title} in Chennai`,
        `${service.description} Contact Home Facility Services in Chennai to discuss scope, staffing and availability.`,
        `/services/${slug}/`
      )
    : { title: 'Service not found', robots: { index: false } };
}

export default async function ServiceDetail({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const service = services.find(s => s.slug === slug);
  if (!service) notFound();
  const content = serviceContent[service.slug];

  return (
    <>
      <StructuredData
        data={{
          '@context': 'https://schema.org',
          '@type': 'Service',
          name: service.title,
          description: service.description,
          url: absoluteUrl(`/services/${service.slug}/`),
          provider: { '@id': absoluteUrl('/#business') },
          areaServed: { '@type': 'City', name: 'Chennai' },
        }}
      />
      <BreadcrumbSchema
        items={[
          { name: 'Home', path: '/' },
          { name: 'Services', path: '/services/' },
          { name: service.title, path: `/services/${service.slug}/` },
        ]}
      />
      <section className="detail-hero">
        <div className="container">
          <div className="breadcrumb">
            <Link href="/">Home</Link>
            <span>/</span>
            <Link href="/services/">Services</Link>
            <span>/</span>
            {service.title}
          </div>
          <div className="detail-grid">
            <div>
              <Eyebrow>{service.title}</Eyebrow>
              <h1>{service.title}<br />in Chennai.</h1>
              <p>{service.description}</p>
              <ButtonLink href={`/contact/?service=${service.slug}`}>Discuss {service.title.toLowerCase()}</ButtonLink>
            </div>
            <div className="detail-image">
              <Image
                src={`/assets/${service.image}`}
                alt={`${service.title} illustration from the HFS profile`}
                fill
                sizes="(max-width: 750px) 90vw, 40vw"
                priority
              />
            </div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container detail-content fade-up">
          <div>
            <Eyebrow>SERVICE OVERVIEW</Eyebrow>
            <h2>{content.intro}</h2>
            <p className="section-intro">{service.details}</p>
            <ul className="check-list">
              {service.features.map(f => (
                <CheckItem key={f}>{f}</CheckItem>
              ))}
            </ul>
          </div>
          <aside className="service-aside">
            <h3>Explore our services</h3>
            {services.map(s => (
              <Link href={`/services/${s.slug}/`} key={s.slug} aria-current={s.slug === slug ? 'page' : undefined}>
                {s.title}
                <ArrowRight size={16} />
              </Link>
            ))}
            <p>Need more than one service? We can discuss a coordinated approach for your facility.</p>
          </aside>
        </div>
      </section>

      <section className="section soft-section">
        <div className="container fade-up">
          <Eyebrow>HOW WE WORK TOGETHER</Eyebrow>
          <h2>From your brief to your team.</h2>
          <div className="process-grid">
            {steps.map((s, i) => (
              <article key={s.title} className="fade-up" style={{ transitionDelay: `${i * 100}ms` }}>
                <span>0{i + 1}</span>
                <h3>{s.title}</h3>
                <p>{s.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container detail-content fade-up">
          <div>
            <Eyebrow>IS THIS RIGHT FOR YOUR SITE?</Eyebrow>
            <h2>Who this service is for</h2>
            <p className="section-intro">{content.suitableFor}</p>
            <h3>What to discuss before getting a quote</h3>
            <ul className="planning-list">
              {content.planning.map(item => (
                <li key={item}>{item}</li>
              ))}
            </ul>
            <Link className="text-link" href="/facility-planning/">
              Prepare your facility service brief <ArrowRight size={16} />
            </Link>
          </div>
          <aside className="service-aside">
            <h3>A clear scope comes first</h3>
            <p>
              Service inclusions, staffing, costs and timing are confirmed directly with HFS for your location. An enquiry is the start of a discussion, not a confirmed booking.
            </p>
            <p>
              Home Facility Services is a Chennai-based partnership. <Link href="/about/">Meet the team and view company details.</Link>
            </p>
          </aside>
        </div>
      </section>

      <FAQ title={`${service.title}: common questions`} items={content.faqs} />
      <CTA />
    </>
  );
}
