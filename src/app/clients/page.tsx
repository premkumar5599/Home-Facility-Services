import { pageMetadata } from '@/lib/seo';
import type { Metadata } from 'next';
import { ClientPortfolio } from '@/components/client-portfolio';
import { CTA, PageHero } from '@/components/ui';

export const metadata: Metadata = pageMetadata(
  'Client Portfolio Across Industries',
  'Explore the HFS client portfolio across automotive, healthcare, manufacturing, hospitality and residential facilities, with filters by industry.',
  '/clients/'
);

export default function Clients() {
  return (
    <>
      <PageHero
        label="Our clients"
        title="Different industries. A shared standard of care."
        description="Explore a selection from the HFS client portfolio, from automotive and healthcare to hospitality and residential communities."
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
