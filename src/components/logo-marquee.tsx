"use client";
import Image from "next/image";
import { useState } from "react";
import { imageDimensions } from "@/lib/image-dimensions";
import { clients } from "@/lib/data";

/** Infinite auto-scrolling client logo marquee */
export function LogoMarquee() {
  const [paused, setPaused] = useState(false);
  // Double the items for seamless infinite loop
  const items = [...clients, ...clients];
  return (
    <div>
      <button
        type="button"
        className="marquee-control"
        aria-pressed={paused}
        aria-controls="client-logo-track"
        onClick={() => setPaused(!paused)}
      >
        {paused ? "Resume client logos" : "Pause client logos"}
      </button>
      <div className="logo-marquee">
        <div
          id="client-logo-track"
          className="logo-track"
          style={{ animationPlayState: paused ? "paused" : undefined }}
        >
          {items.map((c, i) => (
            <div
              className="logo-marquee-item"
              key={`${c.name}-${i}`}
              aria-hidden={i >= clients.length ? true : undefined}
            >
              <Image
                src={`/assets/${c.image}`}
                alt={c.name}
                {...imageDimensions(`/assets/${c.image}`)}
                sizes="140px"
                style={{ width: "auto", height: "auto" }}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
