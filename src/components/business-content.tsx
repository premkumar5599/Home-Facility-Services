import Image from 'next/image';
import Link from 'next/link';
import { Eyebrow } from './ui';
const partners = [
  { name: 'K Kannan', image: '/assets/founders/kannan-enhanced.webp', email: 'kannan@homefacilityservices.in' },
  { name: 'T Srinivasan', image: '/assets/founders/srinivasan-enhanced.webp', email: 'srinivasan@homefacilityservices.in' },
  { name: 'R Mugunthan', image: '/assets/founders/mugunthan-enhanced.webp', email: 'mugunthan@homefacilityservices.in' },
  { name: 'K Sai Dhinesh', image: '/assets/founders/sai-dhinesh-enhanced.webp', email: 'dhinesh@homefacilityservices.in' },
];
export function CompanyPeople() {
  return <section className="section"><div className="container"><div className="section-heading"><div><Eyebrow>THE PEOPLE BEHIND HFS</Eyebrow><h2>Our founders &amp; partners</h2></div><p>Home Facility Services is a partnership. Meet the founders and partners who lead the company.</p></div><div className="partner-grid">{partners.map(partner => <article className="partner-card" key={partner.name}><div className="founder-photo"><Image src={partner.image} alt={partner.name} width={800} height={1000} sizes="(max-width: 750px) 45vw, 25vw" /></div><span>FOUNDER &amp; PARTNER</span><h3>{partner.name}</h3><a href={`mailto:${partner.email}`}>{partner.email}</a></article>)}</div><div className="company-record"><h3>Company information</h3><dl><div><dt>Business name</dt><dd>Home Facility Services</dd></div><div><dt>Business type</dt><dd>Service provider · Partnership</dd></div><div><dt>Registered office</dt><dd>No. 01, Perumal Kovil Street, Koyambedu, Chennai, Tamil Nadu – 600 107.</dd></div><div><dt>MSME registration</dt><dd>UDYAM-TN-02-0467029</dd></div></dl><p>Company details are drawn from the HFS profile. For service documentation or to confirm current information, <Link href="/contact/">contact the team directly</Link>.</p></div></div></section>;
}
export function IndustryContent() {
  return <section className="section soft-section"><div className="container"><Eyebrow>FACILITY CARE IN CONTEXT</Eyebrow><h2>Different spaces.<br />Different priorities.</h2><div className="value-grid">{[
    { title: 'Offices & retail spaces', text: 'When planning support, consider visitor-facing areas, staff workspaces and the hours when your premises are busiest.', link: '/services/housekeeping/', service: 'Explore housekeeping' },
    { title: 'Automotive & industrial sites', text: 'Describe vehicle movement, operational areas and the personnel you need. Discuss water wash and staffing as separate or combined requirements.', link: '/services/water-wash/', service: 'Explore water wash' },
    { title: 'Hospitality, healthcare & residential', text: 'Shared spaces have different access and hygiene needs. Explain your site procedures and service priorities when briefing the team.', link: '/services/staffing/', service: 'Explore facility staffing' },
  ].map(item => <article key={item.title}><h3>{item.title}</h3><p>{item.text}</p><Link className="text-link industry-link" href={item.link}>{item.service} ↗</Link></article>)}</div></div></section>;
}
