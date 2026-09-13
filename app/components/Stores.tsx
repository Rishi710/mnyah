import Image from "next/image";
import type { Store } from "../data";
import { ArrowIcon } from "./Icons";

export function Stores({ stores }: { stores: Store[] }) {
  return (
    <section
      id="stores"
      className="mt-10 scroll-mt-16 rounded-t-[var(--radius-panel)] bg-white px-4 pb-12 pt-6 sm:px-6"
    >
      <h2 className="mb-5 text-[12px] text-muted">Stores across India</h2>
      <div className="rail flex gap-4 overflow-x-auto">
        {stores.map((s) => (
          <article key={s.city} className="w-[78%] shrink-0 snap-start sm:w-[45%] lg:w-[31.5%]">
            <div className="relative aspect-[5/6] overflow-hidden bg-canvas">
              <Image src={s.image} alt={`${s.city} store`} fill sizes="(min-width: 1024px) 33vw, 80vw" className="object-cover" />
            </div>
            <div className="pt-3">
              <p className={`text-[11px] font-medium ${s.open ? "text-open" : "text-muted"}`}>
                {s.open ? "Open now" : "Opening soon"}
              </p>
              <div className="mt-1 flex items-baseline justify-between gap-4">
                <h3 className="text-[15px] font-semibold">
                  {s.city} <span className="font-normal text-muted">({s.area})</span>
                </h3>
                {s.open && (
                  <a href="#" className="flex shrink-0 items-center gap-1 text-[11px] font-medium hover:opacity-60">
                    Get direction <ArrowIcon className="h-3 w-3" />
                  </a>
                )}
              </div>
              <p className="mt-1 max-w-sm text-[12px] leading-relaxed text-muted">{s.address}</p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
