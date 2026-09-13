"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import type { Collection } from "../data";

const INTERVAL_MS = 4500;

export function CollectionSlider({ collections }: { collections: Collection[] }) {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const t = setInterval(() => setActive((i) => (i + 1) % collections.length), INTERVAL_MS);
    return () => clearInterval(t);
  }, [paused, collections.length]);

  return (
    <section
      id="collections"
      aria-roledescription="carousel"
      aria-label="Collections"
      className="scroll-mt-16 px-4 py-3 sm:px-6"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocusCapture={() => setPaused(true)}
      onBlurCapture={() => setPaused(false)}
    >
      <div className="relative h-[70svh] min-h-[420px] overflow-hidden rounded-[var(--radius-panel)] bg-ink">
        {collections.map((c, i) => (
          <div
            key={c.title}
            className={`absolute inset-0 transition-opacity duration-1000 ${
              i === active ? "opacity-100" : "pointer-events-none opacity-0"
            }`}
            aria-hidden={i !== active}
          >
            <Image
              src={c.image}
              alt=""
              fill
              sizes="100vw"
              className={`object-cover transition-transform duration-[6000ms] ease-out ${
                i === active ? "scale-105" : "scale-100"
              }`}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
            <div className="absolute inset-x-0 bottom-14 flex flex-col items-center gap-3 text-center text-white">
              <h2 className="text-[clamp(28px,5vw,56px)] font-extrabold uppercase leading-none tracking-tight">
                {c.title}
              </h2>
              <Link
                href={c.href}
                tabIndex={i === active ? 0 : -1}
                className="text-[12px] font-semibold uppercase tracking-[0.12em] underline underline-offset-4 hover:opacity-70"
              >
                Shop now
              </Link>
            </div>
          </div>
        ))}

        <div className="absolute inset-x-0 bottom-5 flex justify-center gap-2">
          {collections.map((c, i) => (
            <button
              key={c.title}
              type="button"
              onClick={() => setActive(i)}
              aria-label={`Show ${c.title}`}
              aria-current={i === active}
              className={`h-1.5 rounded-full bg-white transition-all ${
                i === active ? "w-6" : "w-1.5 opacity-50 hover:opacity-80"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
