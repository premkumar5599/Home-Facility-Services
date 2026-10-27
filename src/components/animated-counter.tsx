'use client';
import { useEffect, useRef } from 'react';

/**
 * High-performance animated counter.
 * Directly updates DOM node `textContent` during requestAnimationFrame
 * with zero React re-renders, guaranteeing smooth 60fps execution.
 */
export function AnimatedCounter({
  value,
  suffix = '',
  duration = 1000,
}: {
  value: number;
  suffix?: string;
  duration?: number;
}) {
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) {
      el.textContent = `${value}${suffix}`;
      return;
    }

    let started = false;
    let frameId: number;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started) {
          started = true;
          observer.disconnect();

          let startTime: number | null = null;
          const animate = (timestamp: number) => {
            if (!startTime) startTime = timestamp;
            const progress = Math.min((timestamp - startTime) / duration, 1);
            // Snappy ease-out quad for immediate, smooth feel
            const eased = 1 - (1 - progress) * (1 - progress);
            const current = Math.round(eased * value);

            if (el) {
              el.textContent = `${current}${suffix}`;
            }

            if (progress < 1) {
              frameId = requestAnimationFrame(animate);
            }
          };
          frameId = requestAnimationFrame(animate);
        }
      },
      { threshold: 0.1 }
    );

    observer.observe(el);

    return () => {
      observer.disconnect();
      if (frameId) cancelAnimationFrame(frameId);
    };
  }, [value, suffix, duration]);

  return <span ref={ref}>0{suffix}</span>;
}
