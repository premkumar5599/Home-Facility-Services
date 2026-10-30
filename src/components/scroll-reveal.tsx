'use client';
import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

/**
 * High-performance global scroll-reveal observer.
 * Uses a single lightweight IntersectionObserver without layout reflows.
 */
export function ScrollAnimationProvider() {
  const pathname = usePathname();

  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const targets = document.querySelectorAll<HTMLElement>('.fade-up:not(.in-view), .fade-in:not(.in-view), .home-reveal:not(.in-view)');

    if (prefersReduced) {
      targets.forEach(el => el.classList.add('in-view'));
      return;
    }

    if (!targets.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        for (let i = 0; i < entries.length; i++) {
          const entry = entries[i];
          if (entry.isIntersecting) {
            entry.target.classList.add('in-view');
            observer.unobserve(entry.target);
          }
        }
      },
      {
        threshold: 0.05,
        rootMargin: '0px 0px -20px 0px',
      }
    );

    targets.forEach(el => observer.observe(el));

    return () => observer.disconnect();
  }, [pathname]);

  return null;
}

/** Lightweight passthrough wrapper to prevent duplicate observers */
export function ScrollReveal({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  return <div className={className}>{children}</div>;
}

export function useScrollReveal() {
  return { current: null };
}
