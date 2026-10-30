import { pageMetadata } from '@/lib/seo';
import type { Metadata } from 'next';
import { ClientPortfolio } from '@/components/client-portfolio';
import { CTA, PageHero } from '@/components/ui';

export const metadata: Metadata = pageMetadata(
  'Client Portfolio Across Industries',
  'Browse the HFS client list across automobile, corporate offices, factory, healthcare, residential, restaurants and retail, with filters by sector.',
  '/clients/'
);

export default function Clients() {
  return (
    <>
      <PageHero
        label="Our clients"
        title="Different industries. A shared standard of care."
        description="Explore our complete supplied client list across automobile, corporate offices, factories, healthcare, residential, restaurants and retail."
      />
      <section className="section">
        <div className="container">
          <ClientPortfolio />
          <p className="portfolio-note fade-up">
            Client names and logos are reproduced from the supplied HFS client portfolio. They identify the listed businesses and do not imply a separate endorsement.
          </p>
        </div>
      </section>
      <div className="fade-up">
        <CTA />
      </div>
    </>
  );
}
