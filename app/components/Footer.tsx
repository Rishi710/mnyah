import Image from "next/image";
import { CONTACT, SOCIALS } from "../data";
import {
  ArrowIcon,
  FacebookIcon,
  InstagramIcon,
  LinkedInIcon,
  MailIcon,
  MapPinIcon,
  PhoneIcon,
  WhatsAppIcon,
  YouTubeIcon,
} from "./Icons";
import { NewsletterForm } from "./NewsletterForm";

const COLUMNS = {
  Shop: ["New in", "Kurtie's", "Fleece & Knits", "Summerwear", "Winterwear"],
  Help: [
    "Make a return/Exchange",
    "Refund/Exchange policy",
    "Track your order",
    "Shipping policy",
    "FAQ's",
  ],
  Company: ["Our story", "Collaborations", "Careers", "Media", "Blogs"],
};

const LEGAL = ["Privacy policy", "Terms", "Cookies"];

const SOCIAL_ICONS = {
  Instagram: InstagramIcon,
  WhatsApp: WhatsAppIcon,
  YouTube: YouTubeIcon,
  LinkedIn: LinkedInIcon,
  Facebook: FacebookIcon,
};

function ColumnLabel({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="mb-5 flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.16em] text-leaf">
      <span className="h-1.5 w-1.5 rounded-full bg-lotus" aria-hidden />
      {children}
    </h2>
  );
}

export function Footer() {
  return (
    <footer className="mt-10 px-2 sm:px-4 lg:px-6">
      <div className="relative isolate overflow-hidden rounded-t-[var(--radius-panel)] bg-gradient-to-b from-white via-white to-blush px-6 sm:px-10 lg:px-14">
        {/* Oversized lotus watermark, bleeding off the bottom-right corner */}
        <Image
          src="/mnyah-lotus.png"
          alt=""
          width={426}
          height={310}
          sizes="640px"
          className="pointer-events-none absolute -bottom-24 -right-20 -z-10 w-[420px] opacity-[0.07] sm:w-[560px] lg:-bottom-32 lg:w-[680px]"
        />

        {/* Newsletter band */}
        <div className="grid items-end gap-8 border-b border-line py-12 lg:grid-cols-[1.2fr_1fr] lg:gap-20 lg:py-16">
          <div>
            <p className="mb-4 text-[11px] font-semibold uppercase tracking-[0.16em] text-leaf">The Mnyah circle</p>
            <p className="text-[clamp(30px,4.4vw,56px)] font-semibold leading-[1.02] tracking-[-0.03em]">
              Rooted in calm,
              <br />
              <span className="text-muted">made to last.</span>
            </p>
          </div>
          <div className="min-w-0 lg:pb-1">
            <p className="mb-4 max-w-md text-[14px] leading-relaxed text-[#555]">
              Early access to new drops, restocks and quiet edits — straight to your inbox. No noise.
            </p>
            <NewsletterForm />
          </div>
        </div>

        {/* Brand, links and contact */}
        <div className="grid grid-cols-2 gap-x-6 gap-y-12 py-12 sm:grid-cols-3 lg:grid-cols-[1.5fr_1fr_1.1fr_1fr_1.4fr] lg:gap-x-10 lg:py-16">
          <div className="col-span-2 flex flex-col items-center text-center sm:col-span-3 sm:items-start sm:text-left lg:col-span-1">
            <Image
              src="/mnyah-logo-transparent.png"
              alt="Mnyah"
              width={1086}
              height={675}
              sizes="240px"
              className="w-[190px] sm:w-[220px]"
            />
            <p className="mt-5 max-w-[260px] text-[13px] leading-relaxed text-[#555]">
              Curated essentials for an intentional wardrobe designed in India.
            </p>
            <ul className="mt-6 flex flex-wrap justify-center gap-2 sm:justify-start" aria-label="Social media">
              {SOCIALS.map(({ name, href }) => {
                const Icon = SOCIAL_ICONS[name];
                return (
                  <li key={name}>
                    <a
                      href={href}
                      aria-label={name}
                      className="flex h-10 w-10 items-center justify-center rounded-full border border-line bg-white transition-colors hover:border-lotus hover:bg-lotus hover:text-white"
                    >
                      <Icon className="h-[17px] w-[17px]" />
                    </a>
                  </li>
                );
              })}
            </ul>
          </div>

          {Object.entries(COLUMNS).map(([title, links]) => (
            <nav key={title} aria-label={title}>
              <ColumnLabel>{title}</ColumnLabel>
              <ul className="space-y-3">
                {links.map((l) => (
                  <li key={l}>
                    <a href="#" className="text-[14px] text-[#444] transition-colors hover:text-leaf">
                      {l}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          ))}

          <div className="sm:col-span-3 lg:col-span-1">
            <ColumnLabel>Get in touch</ColumnLabel>
            <address className="flex flex-col gap-4 text-[14px] not-italic leading-relaxed text-[#444] sm:flex-row sm:flex-wrap sm:gap-x-10 lg:flex-col lg:gap-4">
              <p className="flex max-w-[280px] items-start gap-3">
                <MapPinIcon className="mt-1 h-4 w-4 shrink-0 text-leaf" />
                <span>{CONTACT.address}</span>
              </p>
              <a href={`mailto:${CONTACT.email}`} className="flex items-center gap-3 hover:text-leaf">
                <MailIcon className="h-4 w-4 shrink-0 text-leaf" />
                {CONTACT.email}
              </a>
              <a href={`tel:${CONTACT.phone.replace(/\s/g, "")}`} className="flex items-center gap-3 hover:text-leaf">
                <PhoneIcon className="h-4 w-4 shrink-0 text-leaf" />
                {CONTACT.phone}
              </a>
            </address>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="flex flex-col items-center gap-4 border-t border-line py-6 text-[12px] text-muted sm:flex-row sm:justify-between">
          <p>© {new Date().getFullYear()} Mnyah. All rights reserved.</p>
          <ul className="flex gap-5">
            {LEGAL.map((l) => (
              <li key={l}>
                <a href="#" className="hover:text-ink">
                  {l}
                </a>
              </li>
            ))}
          </ul>
          <a
            href="#"
            className="group flex items-center gap-2 rounded-full border border-line bg-white px-4 py-2 text-ink transition-colors hover:bg-ink hover:text-white"
          >
            Back to top
            <ArrowIcon className="h-3.5 w-3.5 -rotate-90 transition-transform group-hover:-translate-y-0.5" />
          </a>
        </div>
      </div>
    </footer>
  );
}
