import type { Metadata } from 'next';
import { company, serviceCities } from './data';

const configuredOrigin = process.env.SITE_URL;
export const siteOrigin = new URL(configuredOrigin || 'https://home-facility-services.cosmicdrake16.chatgpt.site').origin;
export const indexable = process.env.SITE_INDEXABLE === 'true';
if (indexable && (!configuredOrigin || !siteOrigin.startsWith('https://') || siteOrigin.endsWith('.chatgpt.site'))) {
  throw new Error('Public indexing requires SITE_URL set to the confirmed HTTPS public domain. Keep private previews non-indexable.');
}
export function absoluteUrl(path: string) { return new URL(path, siteOrigin).toString(); }
export function pageMetadata(title: string, description: string, path: string): Metadata {
  const fullTitle = `${title} | ${company.name}`;
  return {
    title, description, alternates: { canonical: absoluteUrl(path) },
    openGraph: { type: 'website', locale: 'en_IN', siteName: company.name, title: fullTitle, description, url: absoluteUrl(path), images: [{ url: absoluteUrl('/assets/profile-image1.jpeg'), alt: company.name }] },
    twitter: { card: 'summary', title: fullTitle, description, images: [absoluteUrl('/assets/profile-image1.jpeg')] },
  };
}
export const businessSchema = {
  '@context': 'https://schema.org', '@type': 'LocalBusiness', '@id': absoluteUrl('/#business'),
  name: company.name, url: absoluteUrl('/'), telephone: company.telephone, email: company.email,
  logo: absoluteUrl('/assets/profile-image1.jpeg'), image: absoluteUrl('/assets/profile-image1.jpeg'),
  description: 'Housekeeping, security, water wash, plumbing, electrical maintenance and staffing services in Chennai, Vellore and Hosur.',
  address: { '@type': 'PostalAddress', streetAddress: 'No. 01, Perumal Kovil Street, Koyambedu', addressLocality: 'Chennai', addressRegion: 'Tamil Nadu', postalCode: '600107', addressCountry: 'IN' },
  areaServed: serviceCities.map(name => ({ '@type': 'City', name })),
  contactPoint: [{ '@type': 'ContactPoint', telephone: company.telephone, contactType: 'customer service' }, { '@type': 'ContactPoint', telephone: company.landlineTelephone, contactType: 'customer service' }],
};
