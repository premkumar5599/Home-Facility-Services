'use client';
import { useEffect, useState, type FormEvent } from 'react';
import { ArrowUpRight, CheckCircle2 } from 'lucide-react';
import { company, services } from '@/lib/data';
export function EnquiryForm() {
  const [service, setService] = useState('');
  const [status, setStatus] = useState('');
  useEffect(() => { const value = new URLSearchParams(window.location.search).get('service'); if (value && services.some(s => s.slug === value)) setService(value); }, []);
  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const title = services.find(s => s.slug === service)?.title ?? 'Multiple services';
    const body = `Hello Home Facility Services,\n\nI would like to enquire about ${title}.\n\nName: ${data.get('name')}\nCompany: ${data.get('company')}\nEmail: ${data.get('email')}\nPhone: ${data.get('phone')}\nLocation: ${data.get('location')}\n\nRequirements:\n${data.get('message')}\n`;
    window.location.href = `mailto:${company.email}?subject=${encodeURIComponent('Facility service enquiry: ' + title)}&body=${encodeURIComponent(body)}`;
    setStatus(`Your email draft is ready to open. Please send it from your email app. If no app opens, email ${company.email} or call ${company.phone} / ${company.landline}.`);
  }
  return <form className="enquiry-form" onSubmit={submit}><span className="form-tag">LET’S GET STARTED</span><h2>Tell us what you need.</h2><p>Share a few details to help us understand your facility.</p><div className="form-grid"><label>Your name <span>*</span><input name="name" required autoComplete="name" placeholder="Full name" maxLength={100} /></label><label>Company<input name="company" autoComplete="organization" placeholder="Business name" maxLength={150} /></label><label>Email address <span>*</span><input name="email" type="email" required autoComplete="email" placeholder="you@company.com" maxLength={200} /></label><label>Phone number<input name="phone" type="tel" autoComplete="tel" placeholder="Your contact number" maxLength={30} /></label></div><label>Service required <span>*</span><select value={service} onChange={e => setService(e.target.value)} required name="service"><option value="">Choose a service</option>{services.map(s => <option value={s.slug} key={s.slug}>{s.title}</option>)}<option value="multiple">Multiple services</option></select></label><label>Facility location<input name="location" placeholder="City or area" maxLength={200} /></label><label>Your requirements <span>*</span><textarea name="message" required rows={4} placeholder="Tell us about your premises, staffing needs or service requirements…" maxLength={3000} /></label><button type="submit" className="button">Prepare email enquiry <ArrowUpRight size={18} /></button><p className="form-note">This opens your email app. You review and send the message yourself; this form does not store your details.</p>{status && <div className="form-status" role="status"><CheckCircle2 size={20} /><p>{status}</p></div>}</form>;
}
