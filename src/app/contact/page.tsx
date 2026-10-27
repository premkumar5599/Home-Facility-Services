import { FAQ } from '@/components/faq';
import { generalFAQs } from '@/lib/service-content';
import { pageMetadata } from '@/lib/seo';
import type { Metadata } from 'next';
import { Phone, Mail, MapPin, ArrowUpRight } from 'lucide-react';
import { EnquiryForm } from '@/components/enquiry-form';
import { PageHero } from '@/components/ui';
import { company } from '@/lib/data';
export const metadata: Metadata = pageMetadata('Contact HFS in Chennai', 'Call +91 80720 07850 or email HFS to discuss housekeeping, security, maintenance and staffing. Find our registered office and prepare a service enquiry.', "/contact/");
export default function Contact() { return <><PageHero label="Contact us" title="Contact Home Facility Services in Chennai." description="Tell us about your premises and what you need. We’ll help you explore the right services and staffing." /><section className="section"><div className="container contact-layout"><div className="contact-details"><h2>A real conversation.<br />A practical next step.</h2><p>Speak with our team directly, or prepare an enquiry with the form.</p><a className="contact-card" href={`tel:${company.telephone}`}><span className="icon-box"><Phone /></span><div><small>GIVE US A CALL</small><strong>{company.phone}</strong></div><ArrowUpRight size={18} /></a><a className="contact-card" href={`mailto:${company.email}`}><span className="icon-box"><Mail /></span><div><small>WRITE TO OUR TEAM</small><strong>{company.email}</strong></div><ArrowUpRight size={18} /></a><div className="contact-card"><span className="icon-box"><MapPin /></span><div><small>REGISTERED OFFICE</small><address>{company.address}</address></div></div><div className="contact-tip"><h3>A little detail goes a long way.</h3><p>Include your facility location, service requirements and any staffing needs so our team has the context to help.</p></div></div><EnquiryForm /></div></section><FAQ title="Before you send an enquiry" items={generalFAQs.slice(2)} /></>; }
