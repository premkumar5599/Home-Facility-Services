import { FAQ } from '@/components/faq';
import { generalFAQs } from '@/lib/service-content';
import { IndustryContent } from '@/components/business-content';
import { pageMetadata } from '@/lib/seo';
import type { Metadata } from 'next';
import { CTA, PageHero, ServiceCard, Eyebrow } from '@/components/ui';
import { services } from '@/lib/data';
export const metadata: Metadata = pageMetadata('Facility Services in Chennai', 'Explore HFS housekeeping, security, vehicle water wash, plumbing, electrical maintenance and staffing services. Discuss your Chennai facility requirements.', "/services/");
export default function Services() { return <><PageHero label="Our services" title="Facility services in Chennai for your everyday operations." description="From the everyday details to essential technical support, explore services designed around the way you work." /><section className="section"><div className="container services-grid">{services.map((s, i) => <ServiceCard key={s.slug} service={s} index={i} />)}</div></section><section className="section soft-section"><div className="container split-heading"><div><Eyebrow>FLEXIBLE BY DESIGN</Eyebrow><h2>Your premises.<br />Your priorities.</h2></div><div><p className="section-intro">Whether you need a single service or support across your facility, our team starts by understanding your requirements.</p><p className="muted">We work with corporate offices, hotels, hospitals, automotive and food industries, multi-storey buildings and retail spaces. Talk to us about your location, workforce and operational needs.</p></div></div></section><IndustryContent /><FAQ title="Choosing your facility services" items={generalFAQs} /><CTA /></>; }
