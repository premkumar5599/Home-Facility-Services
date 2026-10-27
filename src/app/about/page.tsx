import { CompanyPeople } from '@/components/business-content';
import { pageMetadata } from '@/lib/seo';
import type { Metadata } from 'next';
import { HeartHandshake, BadgeCheck, Users, Leaf } from 'lucide-react';
import { CTA, Eyebrow, PageHero } from '@/components/ui';
import { ScrollReveal } from '@/components/scroll-reveal';
import { AnimatedCounter } from '@/components/animated-counter';

export const metadata: Metadata = pageMetadata(
  'About HFS: Chennai Facility Services',
  'Meet Home Facility Services, its partners and its approach to facility support. Find company details and the registered office in Koyambedu, Chennai.',
  '/about/'
);

export default function About() {
  return (
    <>
      <PageHero
        label="About HFS"
        title="A Chennai facility services partner, built around people."
        description="We're a Chennai-based facility services partner with a simple focus: taking care of your premises and the people who use them."
      />
      <ScrollReveal>
        <section className="section">
          <div className="container about-story">
            <div className="story-panel fade-up">
              <span>HOME FACILITY SERVICES</span>
              <HeartHandshake size={70} strokeWidth={1} />
              <h2>Care is at<br />the heart of<br /><em>what we do.</em></h2>
              <span>PEOPLE · PROFESSIONALISM · PURPOSE</span>
            </div>
            <div className="fade-up">
              <Eyebrow>OUR STORY &amp; APPROACH</Eyebrow>
              <h2>A partner in your<br />everyday operations.</h2>
              <p className="section-intro">
                Home Facility Services brings together housekeeping, security, water wash, plumbing, electrical maintenance and outsourcing services.
              </p>
              <p className="muted">
                Our teams work closely with customers to understand on-site demands. Supported by management and technical personnel, we focus on practical solutions that help businesses save time and effort while maintaining a welcoming working environment.
              </p>
              <div className="about-stats">
                <div>
                  <strong><AnimatedCounter value={350} suffix="+" /></strong>
                  <span>Approximate workforce*</span>
                </div>
                <div>
                  <strong><AnimatedCounter value={6} suffix="" duration={800} /></strong>
                  <span>Core service areas</span>
                </div>
                <div>
                  <strong>Chennai</strong>
                  <span>Our home base</span>
                </div>
              </div>
              <p className="stat-footnote">*As stated in the supplied company profile.</p>
            </div>
          </div>
        </section>
      </ScrollReveal>

      <ScrollReveal>
        <section className="section soft-section">
          <div className="container">
            <Eyebrow>THE PRINCIPLES WE WORK BY</Eyebrow>
            <h2>Care you can see.<br />Values you can feel.</h2>
            <div className="value-grid">
              {[
                {
                  icon: BadgeCheck,
                  title: 'Professional excellence',
                  text: 'Attention to service quality, on-site coordination and a consistent approach to client requirements.',
                },
                {
                  icon: Users,
                  title: 'People with purpose',
                  text: 'Training and development that help our personnel understand their role and grow with the business.',
                },
                {
                  icon: Leaf,
                  title: 'Practical, flexible care',
                  text: 'Cost-effective solutions shaped around your premises, with an emphasis on quality and hygiene.',
                },
              ].map((v, i) => (
                <article key={v.title} className="fade-up" style={{ transitionDelay: `${i * 50}ms` }}>
                  <v.icon size={28} strokeWidth={1.5} />
                  <h3>{v.title}</h3>
                  <p>{v.text}</p>
                </article>
              ))}
            </div>
            <div className="registration fade-up">
              <BadgeCheck />
              <div>
                <strong>MSME registered partnership</strong>
                <span>UDYAM-TN-02-0467029</span>
              </div>
              <p>Registered office: Koyambedu, Chennai.</p>
            </div>
          </div>
        </section>
      </ScrollReveal>

      <div className="fade-up">
        <CompanyPeople />
      </div>
      <div className="fade-up">
        <CTA />
      </div>
    </>
  );
}
