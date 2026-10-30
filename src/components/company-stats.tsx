import { company, serviceAreaLabel } from '@/lib/data';

export function CompanyStats({ variant = 'section' }: { variant?: 'section' | 'hero' }) {
  const isHero = variant === 'hero';
  return (
    <section className={`company-numbers${isHero ? ' company-numbers-hero' : ''}`} aria-label="Company figures">
      <div className={isHero ? undefined : 'container'}>
        <div className="company-numbers-grid">
          <div><strong>{company.manpower}+</strong><span>Manpower</span></div>
          <div><strong>{company.locations}+</strong><span>Locations</span></div>
          <div><strong>{company.clientCount}+</strong><span>Clients</span></div>
        </div>
        {!isHero && <p>Our services: <strong>{serviceAreaLabel}</strong></p>}
      </div>
    </section>
  );
}
