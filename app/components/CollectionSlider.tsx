"use client";

import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import type { Collection } from "../data";
import { ArrowIcon } from "./Icons";

const INTERVAL_MS = 5000;
const SWIPE_THRESHOLD = 50;

const reducedMotion = () => window.matchMedia("(prefers-reduced-motion: reduce)").matches;

// Native scroll-snap carousel: touch swipe and trackpad scroll come for free,
// mouse users get drag + arrow buttons, keyboard users get ←/→.
export function CollectionSlider({ collections }: { collections: Collection[] }) {
  const track = useRef<HTMLDivElement>(null);
  const drag = useRef({ down: false, startX: 0, startLeft: 0, moved: false });
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const count = collections.length;

  // Scroll offset that brings slide i to the start edge (clamped for the last slides).
  const offsetOf = useCallback((i: number) => {
    const el = track.current!;
    const slides = el.children as HTMLCollectionOf<HTMLElement>;
    const max = el.scrollWidth - el.clientWidth;
    return Math.min(slides[i].offsetLeft - slides[0].offsetLeft, max);
  }, []);

  const nearest = useCallback(() => {
    const left = track.current!.scrollLeft;
    let best = 0;
    for (let i = 1; i < count; i++) {
      if (Math.abs(offsetOf(i) - left) < Math.abs(offsetOf(best) - left)) best = i;
    }
    return best;
  }, [count, offsetOf]);

  const goTo = useCallback(
    (i: number) => {
      const index = (i + count) % count;
      track.current?.scrollTo({ left: offsetOf(index), behavior: reducedMotion() ? "auto" : "smooth" });
    },
    [count, offsetOf],
  );

  // Keep the active dot in sync with wherever the user scrolled to.
  useEffect(() => {
    const el = track.current;
    if (!el) return;
    let raf = 0;
    const onScroll = () => {
      if (raf) return;
      raf = requestAnimationFrame(() => {
        raf = 0;
        setActive(nearest());
      });
    };
    el.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      el.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(raf);
    };
  }, [nearest]);

  // Autoplay; any manual move changes `active`, which restarts the countdown.
  useEffect(() => {
    if (paused || reducedMotion()) return;
    const t = setTimeout(() => goTo(active + 1), INTERVAL_MS);
    return () => clearTimeout(t);
  }, [active, paused, goTo]);

  const onPointerDown = (e: React.PointerEvent) => {
    if (e.pointerType !== "mouse" || e.button !== 0) return;
    const el = track.current!;
    drag.current = { down: true, startX: e.clientX, startLeft: el.scrollLeft, moved: false };
    el.style.scrollSnapType = "none";
  };

  const onPointerMove = (e: React.PointerEvent) => {
    const d = drag.current;
    if (!d.down) return;
    const dx = e.clientX - d.startX;
    if (!d.moved && Math.abs(dx) > 5) {
      d.moved = true;
      track.current!.setPointerCapture(e.pointerId);
    }
    track.current!.scrollLeft = d.startLeft - dx;
  };

  const endDrag = (e: React.PointerEvent) => {
    const d = drag.current;
    if (!d.down) return;
    d.down = false;
    const el = track.current!;
    const dx = e.clientX - d.startX;
    const from = active;
    const target = dx < -SWIPE_THRESHOLD ? from + 1 : dx > SWIPE_THRESHOLD ? from - 1 : nearest();
    goTo(Math.max(0, Math.min(count - 1, target)));
    const restore = () => (el.style.scrollSnapType = "");
    el.addEventListener("scrollend", restore, { once: true });
    setTimeout(restore, 800);
  };

  return (
    <section
      id="collections"
      aria-roledescription="carousel"
      aria-label="Collections"
      className="scroll-mt-16 py-6"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onTouchStart={() => setPaused(true)}
      onTouchEnd={() => setPaused(false)}
      onFocusCapture={() => setPaused(true)}
      onBlurCapture={() => setPaused(false)}
    >
      <div
        ref={track}
        tabIndex={0}
        aria-label="Collections — use arrow keys to browse"
        onKeyDown={(e) => {
          if (e.key === "ArrowRight") { e.preventDefault(); goTo(active + 1); }
          if (e.key === "ArrowLeft") { e.preventDefault(); goTo(active - 1); }
        }}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={endDrag}
        onPointerCancel={endDrag}
        onPointerLeave={endDrag}
        onClickCapture={(e) => {
          // A mouse drag shouldn't also count as a click on the slide's link.
          if (drag.current.moved) {
            e.preventDefault();
            e.stopPropagation();
            drag.current.moved = false;
          }
        }}
        className="rail flex select-none gap-3 overflow-x-auto overscroll-x-contain px-4 outline-none scroll-px-4 sm:gap-4 sm:px-6 sm:scroll-px-6 md:cursor-grab md:active:cursor-grabbing focus-visible:ring-2 focus-visible:ring-ink focus-visible:ring-offset-2"
      >
        {collections.map((c, i) => (
          <div
            key={c.title}
            role="group"
            aria-roledescription="slide"
            aria-label={`${i + 1} of ${count}: ${c.title}`}
            className="relative aspect-[4/5] w-[86%] shrink-0 snap-start overflow-hidden rounded-2xl bg-ink sm:aspect-[3/2] sm:w-[88%] sm:rounded-[var(--radius-panel)] lg:aspect-auto lg:h-[min(72svh,700px)] lg:w-full"
          >
            <Image
              src={c.image}
              alt=""
              fill
              draggable={false}
              sizes="(min-width: 1024px) 100vw, 88vw"
              className={`pointer-events-none object-cover transition-transform duration-[6000ms] ease-out ${
                i === active ? "scale-105" : "scale-100"
              }`}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-black/10 to-transparent" />
            <div className="absolute inset-x-0 bottom-0 flex flex-col items-center gap-3 px-5 pb-8 text-center text-white sm:pb-12">
              <h2 className="text-[clamp(26px,6vw,56px)] font-extrabold uppercase leading-none tracking-tight">
                {c.title}
              </h2>
              <Link
                href={c.href}
                draggable={false}
                className="inline-flex min-h-11 items-center text-[12px] font-semibold uppercase tracking-[0.12em] underline underline-offset-4 hover:opacity-70"
              >
                Shop now
              </Link>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-4 flex items-center justify-between px-4 sm:px-6">
        <div className="flex items-center gap-3">
          <span className="w-12 text-[12px] font-medium tabular-nums" aria-live="polite">
            {String(active + 1).padStart(2, "0")} / {String(count).padStart(2, "0")}
          </span>
          <div className="flex items-center">
            {collections.map((c, i) => (
              <button
                key={c.title}
                type="button"
                onClick={() => goTo(i)}
                aria-label={`Go to ${c.title}`}
                aria-current={i === active}
                className="group flex h-8 items-center px-1"
              >
                <span
                  className={`block h-1.5 rounded-full bg-ink transition-all duration-300 ${
                    i === active ? "w-6" : "w-1.5 opacity-25 group-hover:opacity-60"
                  }`}
                />
              </button>
            ))}
          </div>
        </div>

        <div className="flex gap-2">
          <button
            type="button"
            onClick={() => goTo(active - 1)}
            aria-label="Previous collection"
            className="flex h-11 w-11 items-center justify-center rounded-full bg-white transition-colors hover:bg-ink hover:text-white active:scale-95"
          >
            <ArrowIcon className="h-4 w-4 rotate-180" />
          </button>
          <button
            type="button"
            onClick={() => goTo(active + 1)}
            aria-label="Next collection"
            className="flex h-11 w-11 items-center justify-center rounded-full bg-white transition-colors hover:bg-ink hover:text-white active:scale-95"
          >
            <ArrowIcon className="h-4 w-4" />
          </button>
        </div>
      </div>
    </section>
  );
}
