'use client';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { ArrowUpRight, Menu, X, Phone } from 'lucide-react';
const links = [['/', 'Home'], ['/services/', 'Services'], ['/about/', 'About us'], ['/clients/', 'Our clients']] as const;
export function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  useEffect(() => { setOpen(false); }, [pathname]);
  useEffect(() => { const close = (e: KeyboardEvent) => { if (e.key === 'Escape') setOpen(false); }; window.addEventListener('keydown', close); return () => window.removeEventListener('keydown', close); }, []);
  return <><a href="#main" className="skip">Skip to content</a><div className="topbar"><div className="container"><span>People. Places. Peace of mind.</span><a href="tel:+918072007850"><Phone size={12} /> +91 80720 07850</a></div></div><header className="site-header"><div className="container nav-wrap"><Link className="brand" href="/" aria-label="Home Facility Services home"><Image src="/assets/profile-image1.jpeg" width={48} height={48} alt="HFS" priority /><span>HOME FACILITY<small>SERVICES</small></span></Link><button className="menu-toggle" aria-label={open ? 'Close navigation' : 'Open navigation'} aria-expanded={open} aria-controls="main-nav" onClick={() => setOpen(!open)}>{open ? <X /> : <Menu />}</button><nav id="main-nav" className={open ? 'navigation is-open' : 'navigation'} aria-label="Main navigation">{links.map(([href, label]) => { const active = href === '/' ? pathname === '/' : pathname.startsWith(href.slice(0, -1)); return <Link key={href} href={href} aria-current={active ? 'page' : undefined} className={active ? 'nav-link active' : 'nav-link'} onClick={() => setOpen(false)}>{label}</Link>; })}<Link href="/contact/" className="button nav-cta" aria-current={pathname.startsWith('/contact') ? 'page' : undefined} onClick={() => setOpen(false)}>Get in touch <ArrowUpRight size={17} /></Link></nav></div></header></>;
}
