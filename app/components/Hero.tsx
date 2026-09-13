"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef } from "react";

// Full-bleed hero that eases into an inset, rounded card as you scroll.
export function Hero() {
  const frame = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = frame.current;
    if (!el || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let raf = 0;
    const update = () => {
      raf = 0;
      const p = Math.min(window.scrollY / (window.innerHeight * 0.6), 1);
      el.style.setProperty("--inset", `${p * 12}px`);
      el.style.setProperty("--radius", `${p * 24}px`);
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <section aria-label="New season" className="relative h-svh min-h-[520px]">
      <div
        ref={frame}
        className="absolute inset-0 px-[var(--inset,0px)] pt-[calc(var(--inset,0px)*4.5)]"
      >
        <div className="relative h-full w-full overflow-hidden rounded-[var(--radius,0px)] bg-[#0e0e0e]">
          {/* The wordmark is baked into the photo, so show it whole on narrow screens */}
          <Image
            src="/mnyah-hero.jpg"
            alt="Mnyah — curated essentials"
            fill
            preload
            sizes="100vw"
            className="object-contain md:object-cover"
          />
          <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-black/50 to-transparent" />
          <Link
            href="#latest-drop"
            className="absolute bottom-10 left-1/2 -translate-x-1/2 text-[15px] font-medium text-white underline underline-offset-4 hover:opacity-70"
          >
            Shop now
          </Link>
        </div>
      </div>
    </section>
  );
}
