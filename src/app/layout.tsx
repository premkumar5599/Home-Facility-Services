import type { Metadata } from "next";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { WhatsAppButton } from "@/components/whatsapp-button";
import { ScrollAnimationProvider } from "@/components/scroll-reveal";
import "./globals.css";
import { siteOrigin, indexable, businessSchema } from "@/lib/seo";
import { StructuredData } from "@/components/structured-data";

export const metadata: Metadata = {
  metadataBase: new URL(siteOrigin),
  title: {
    default: "Home Facility Services | Care for your workplace",
    template: "%s | Home Facility Services",
  },
  description:
    "Facility services in Chennai, Vellore and Hosur: housekeeping, security, water wash, plumbing, electrical maintenance and staffing.",
  robots: { index: indexable, follow: indexable },
  publisher: "Home Facility Services",
  icons: { icon: "/assets/profile-image1.jpeg" },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" data-scroll-behavior="smooth">
      <head>
        <link
          rel="preload"
          href="/fonts/inter-latin-variable.woff2"
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
        />
      </head>
      <body>
        <StructuredData data={businessSchema} />
        <ScrollAnimationProvider />
        <Header />
        <main id="main">{children}</main>
        <Footer />
        <WhatsAppButton />
      </body>
    </html>
  );
}
