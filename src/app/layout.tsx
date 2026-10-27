import type { Metadata } from 'next';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import './globals.css';
import { siteOrigin, indexable, businessSchema } from '@/lib/seo';
import { StructuredData } from '@/components/structured-data';
export const metadata: Metadata = {
  metadataBase: new URL(siteOrigin),
  title: { default: 'Home Facility Services | Care for your workplace', template: '%s | Home Facility Services' },
  description: 'Chennai-based facility services for businesses: housekeeping, security, water wash, plumbing, electrical maintenance and staffing.',
  robots: { index: indexable, follow: indexable },
  publisher: 'Home Facility Services',
  icons: { icon: '/assets/profile-image1.jpeg' },
};
export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) { return <html lang="en"><body><StructuredData data={businessSchema} /><Header /><main id="main">{children}</main><Footer /></body></html>; }
