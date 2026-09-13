"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { NAV } from "../data";
import { BagIcon, BookmarkIcon, CloseIcon, PinIcon, SearchIcon, UserIcon } from "./Icons";

export function Header() {
  const [solid, setSolid] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setSolid(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setMenuOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [menuOpen]);

  const light = !solid && !menuOpen;

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-40 transition-colors duration-300 ${
          light ? "bg-transparent text-white" : "bg-white text-ink"
        }`}
      >
        <div className="grid h-14 grid-cols-[1fr_auto_1fr] items-center px-4 sm:px-6">
          <nav className="hidden items-center gap-6 text-[13px] md:flex" aria-label="Primary">
            <Link href="#latest-drop" className="hover:opacity-60">New in</Link>
            <Link href="#collections" className="hover:opacity-60">Collections</Link>
          </nav>
          <div className="md:hidden">
            <button type="button" aria-label="Search" className="flex hover:opacity-60">
              <SearchIcon />
            </button>
          </div>

          <Link
            href="/"
            className="text-[22px] font-extrabold uppercase leading-none tracking-[0.18em]"
            aria-label="Mnyah home"
          >
            Mnyah
          </Link>

          <div className="flex items-center justify-end gap-4 sm:gap-5">
            <Link href="#stores" aria-label="Stores" className="hidden hover:opacity-60 sm:block">
              <PinIcon />
            </Link>
            <button type="button" aria-label="Search" className="hidden hover:opacity-60 md:block">
              <SearchIcon />
            </button>
            <button type="button" aria-label="Account" className="hidden hover:opacity-60 sm:block">
              <UserIcon />
            </button>
            <button type="button" aria-label="Wishlist" className="hidden hover:opacity-60 sm:block">
              <BookmarkIcon />
            </button>
            <button type="button" aria-label="Bag, 0 items" className="relative hover:opacity-60">
              <BagIcon />
              <span className="absolute -right-1.5 -top-1 text-[9px] font-semibold">0</span>
            </button>
            <button
              type="button"
              onClick={() => setMenuOpen((o) => !o)}
              aria-expanded={menuOpen}
              aria-controls="site-menu"
              aria-label={menuOpen ? "Close menu" : "Open menu"}
              className={`flex h-7 w-11 items-center justify-center rounded-full transition-colors ${
                light ? "bg-white/90 text-ink" : "bg-canvas text-ink"
              }`}
            >
              {menuOpen ? (
                <CloseIcon className="h-4 w-4" />
              ) : (
                <span className="flex flex-col gap-[3px]" aria-hidden>
                  <span className="block h-[1.5px] w-4 bg-current" />
                  <span className="block h-[1.5px] w-4 bg-current" />
                </span>
              )}
            </button>
          </div>
        </div>
      </header>

      <div
        id="site-menu"
        className={`fixed inset-0 z-30 bg-white pt-14 transition-[opacity,visibility] duration-300 ${
          menuOpen ? "visible opacity-100" : "invisible opacity-0"
        }`}
        aria-hidden={!menuOpen}
      >
        <div className="mx-auto grid max-w-6xl grid-cols-2 gap-x-6 gap-y-10 overflow-y-auto px-6 py-10 md:grid-cols-4">
          {Object.entries(NAV).map(([group, items]) => (
            <div key={group}>
              <p className="mb-4 text-[12px] text-muted">{group}</p>
              <ul className="space-y-2.5">
                {items.map((item) => (
                  <li key={item}>
                    <Link
                      href="#essentials"
                      onClick={() => setMenuOpen(false)}
                      className="text-[22px] font-semibold tracking-tight hover:opacity-50 md:text-[26px]"
                      tabIndex={menuOpen ? 0 : -1}
                    >
                      {item}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
