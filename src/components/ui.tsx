import { BreadcrumbSchema } from './structured-data';
import Link from 'next/link';
import { ArrowUpRight, Check } from 'lucide-react';
import type { Service } from '@/lib/data';
export function ButtonLink({ href, children, secondary = false }: { href: string; children: React.ReactNode; secondary?: boolean }) {
  return <Link className={`button ${secondary ? 'button-secondary' : ''}`} href={href}>{children}<ArrowUpRight size={18} aria-hidden="true" /></Link>;
}
export function Eyebrow({ children }: { children: React.ReactNode }) { return <p className="eyebrow"><span />{children}</p>; }
export function PageHero({ label, title, description }: { label: string; title: string; description: string }) {
  return <section className="page-hero"><BreadcrumbSchema items={[{ name: "Home", path: "/" }, { name: label, path: ({ "Our services": "/services/", "About HFS": "/about/", "Our clients": "/clients/", "Contact us": "/contact/", "Privacy notice": "/privacy/", "Facility planning": "/facility-planning/" } as Record<string, string>)[label] || "/" }]} /><div className="container"><div className="breadcrumb"><Link href="/">Home</Link><span>/</span>{label}</div><Eyebrow>{label}</Eyebrow><h1>{title}</h1><p>{description}</p></div></section>;
}
export function ServiceCard({ service, index }: { service: Service; index: number }) {
  return <Link href={`/services/${service.slug}/`} className="service-card"><div className="card-top"><span className="card-number">0{index + 1}</span></div><h3>{service.title}</h3><p>{service.description}</p><span className="card-link">Explore service <ArrowUpRight size={18} /></span></Link>;
}
export function CTA() { return <section className="section cta-section"><div className="container cta"><div><Eyebrow>YOUR NEXT STEP</Eyebrow><h2>A better workplace<br />starts with a conversation.</h2><p>Let’s find the right support for your space.</p></div><ButtonLink href="/contact/">Let’s talk about your facility</ButtonLink></div></section>; }
export function CheckItem({ children }: { children: React.ReactNode }) { return <li><Check size={17} aria-hidden="true" />{children}</li>; }
