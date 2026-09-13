import type { Product } from "../data";
import { ProductCard } from "./ProductCard";
import { SectionHeading } from "./SectionHeading";

export function ProductRail({ id, title, products }: { id: string; title: string; products: Product[] }) {
  return (
    <section id={id} className="scroll-mt-16 py-10">
      <SectionHeading title={title} href={`#${id}`} />
      <div className="rail flex scroll-px-4 gap-0.5 overflow-x-auto px-4 sm:scroll-px-6 sm:px-6">
        {products.map((p) => (
          <ProductCard
            key={p.id}
            product={p}
            className="w-[46%] shrink-0 snap-start sm:w-[31%] lg:w-[24.2%]"
          />
        ))}
      </div>
    </section>
  );
}
