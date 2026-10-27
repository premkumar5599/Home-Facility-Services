'use client';
import Image from 'next/image';
import { clients } from '@/lib/data';

/** Infinite auto-scrolling client logo marquee */
export function LogoMarquee() {
  // Double the items for seamless infinite loop
  const items = [...clients, ...clients];
  return (
    <div className="logo-marquee">
      <div className="logo-track">
        {items.map((c, i) => (
          <div className="logo-marquee-item" key={`${c.name}-${i}`}>
            <Image src={`/assets/${c.image}`} alt={c.name} width={140} height={85} style={{ width: 'auto', height: 'auto' }} />
          </div>
        ))}
      </div>
    </div>
  );
}
