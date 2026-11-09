"use client";
import Link from "next/link";
import { company } from "@/lib/data";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";
import { ArrowUpRight, Menu, X, Phone } from "lucide-react";

const links = [
  ["/", "Home"],
  ["/services/", "Services"],
  ["/about/", "About us"],
  ["/clients/", "Our clients"],
] as const;

export function Header() {
  const pathname = usePathname();
  const menu = useRef<HTMLDetailsElement>(null);
  const closeMenu = () => {
    if (menu.current) menu.current.open = false;
  };
  useEffect(closeMenu, [pathname]);
  useEffect(() => {
    const close = (event: KeyboardEvent) => {
      if (event.key === "Escape" && menu.current?.open) {
        closeMenu();
        menu.current.querySelector("summary")?.focus();
      }
    };
    window.addEventListener("keydown", close);
    return () => window.removeEventListener("keydown", close);
  }, []);
  function navigationLinks() {
    return (
      <>
        {links.map(([href, label]) => {
          const active =
            href === "/"
              ? pathname === "/"
              : pathname.startsWith(href.slice(0, -1));
          return (
            <Link
              prefetch={false}
              key={href}
              href={href}
              aria-current={active ? "page" : undefined}
              className={active ? "nav-link active" : "nav-link"}
              onClick={closeMenu}
            >
              {label}
            </Link>
          );
        })}
        <Link
          prefetch={false}
          href="/contact/"
          className="button nav-cta"
          aria-current={pathname.startsWith("/contact") ? "page" : undefined}
          onClick={closeMenu}
        >
          Get in touch <ArrowUpRight size={17} />
        </Link>
      </>
    );
  }
  return (
    <>
      <a href="#main" className="skip">
        Skip to content
      </a>
      <div className="topbar">
        <div className="container">
          <span>People. Places. Peace of mind.</span>
          <div className="header-contacts">
            <a href={`tel:${company.telephone}`}>
              <Phone size={12} />
              {company.phone}
            </a>
            <a href={`tel:${company.landlineTelephone}`}>
              Landline: {company.landline}
            </a>
          </div>
        </div>
      </div>
      <header className="site-header">
        <div className="container nav-wrap">
          <Link
            prefetch={false}
            className="brand"
            href="/"
            aria-label="Home Facility Services home"
          >
            <Image
              src="/assets/profile-image1.jpeg"
              width={213}
              height={200}
              sizes="48px"
              alt="HFS"
            />
            <span>HOME FACILITY SERVICES</span>
          </Link>
          <nav className="navigation" aria-label="Main navigation">
            {navigationLinks()}
          </nav>
          <details className="mobile-navigation" ref={menu}>
            <summary
              role="button"
              aria-label="Navigation menu"
              aria-controls="mobile-main-nav"
            >
              <Menu className="menu-icon" size={22} aria-hidden="true" />
              <X className="close-icon" size={22} aria-hidden="true" />
            </summary>
            <nav
              id="mobile-main-nav"
              className="mobile-links"
              aria-label="Main navigation"
            >
              {navigationLinks()}
            </nav>
          </details>
        </div>
      </header>
    </>
  );
}
