import type { Product } from "../data";
import { ProductCard } from "./ProductCard";
import { SectionHeading } from "./SectionHeading";

export function ProductGrid({ id, title, products }: { id: string; title: string; products: Product[] }) {
  return (
    <section id={id} className="scroll-mt-16 py-10">
      <SectionHeading title={title} href={`#${id}`} />
      <div className="grid grid-cols-2 gap-x-0.5 gap-y-8 px-4 sm:px-6 lg:grid-cols-4">
        {products.map((p) => (
          <ProductCard key={p.id} product={p} />
        ))}
      </div>
    </section>
  );
}
