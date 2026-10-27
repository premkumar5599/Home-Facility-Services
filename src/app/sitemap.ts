import type { MetadataRoute } from 'next';
import { services } from '@/lib/data';
import { absoluteUrl, indexable } from '@/lib/seo';
export const dynamic = 'force-static';
export default function sitemap(): MetadataRoute.Sitemap {
  if (!indexable) return [];
  return ['/', '/about/', '/services/', '/clients/', '/contact/', '/privacy/', '/facility-planning/', ...services.map(s => `/services/${s.slug}/`)].map(path => ({ url: absoluteUrl(path) }));
}
