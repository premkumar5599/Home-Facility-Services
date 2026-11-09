import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight, Mail, MapPin, Phone } from "lucide-react";
import { company, services, serviceAreaLabel } from "@/lib/data";
export function Footer() {
  return (
    <footer className="footer">
      <div className="container footer-grid">
        <div>
          <Link prefetch={false} className="brand" href="/">
            <Image
              src="/assets/profile-image1.jpeg"
              alt="HFS"
              width={213}
              height={200}
              sizes="48px"
            />
            <span>HOME FACILITY SERVICES</span>
          </Link>
          <p>
            Taking care of spaces.
            <br />
            Supporting the people within them.
          </p>
          <span className="footer-badge">Chennai · Vellore · Hosur</span>
        </div>
        <div>
          <h3>Explore</h3>
          <Link prefetch={false} href="/about/">
            About HFS
          </Link>
          <Link prefetch={false} href="/services/">
            Our services
          </Link>
          <Link prefetch={false} href="/clients/">
            Our clients
          </Link>
          <Link prefetch={false} href="/facility-planning/">
            Enquiry checklist
          </Link>
          <Link prefetch={false} href="/contact/">
            Contact us <ArrowUpRight size={13} />
          </Link>
        </div>
        <div>
          <h3>Our expertise</h3>
          {services.map((s) => (
            <Link prefetch={false} href={`/services/${s.slug}/`} key={s.slug}>
              {s.title}
            </Link>
          ))}
        </div>
        <div>
          <h3>Let’s connect</h3>
          <a href={`tel:${company.telephone}`}>
            <Phone size={15} />
            {company.phone}
          </a>
          <a href={`tel:${company.landlineTelephone}`}>
            <Phone size={15} />
            {company.landline}
          </a>
          <a href={`mailto:${company.email}`}>
            <Mail size={15} />
            {company.email}
          </a>
          <p className="address">
            <MapPin size={20} />
            <span>{company.address}</span>
          </p>
        </div>
      </div>
      <div className="container footer-bottom">
        <span>© {new Date().getFullYear()} Home Facility Services.</span>
        <Link prefetch={false} href="/privacy/">
          Privacy notice
        </Link>
        <span>Services in {serviceAreaLabel}</span>
      </div>
    </footer>
  );
}
