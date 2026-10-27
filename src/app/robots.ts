import type { MetadataRoute } from 'next';
import { absoluteUrl, indexable } from '@/lib/seo';
export const dynamic = 'force-static';
export default function robots(): MetadataRoute.Robots {
  return indexable
    ? { rules: { userAgent: '*', allow: '/' }, sitemap: absoluteUrl('/sitemap.xml') }
    : { rules: { userAgent: '*', disallow: '/' } };
}
