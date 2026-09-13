"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { formatPrice, type Product } from "../data";
import { BookmarkIcon } from "./Icons";

export function ProductCard({ product, className = "" }: { product: Product; className?: string }) {
  const [saved, setSaved] = useState(false);

  return (
    <article className={`group relative ${className}`}>
      <Link href="#" className="block">
        <div className="relative aspect-[3/4] overflow-hidden bg-[#e4e4e4]">
          <Image
            src={product.image}
            alt={product.name}
            fill
            sizes="(min-width: 1024px) 25vw, 50vw"
            className={`object-cover transition-transform duration-700 group-hover:scale-[1.04] ${
              product.soldOut ? "opacity-60" : ""
            }`}
          />
          <div className="absolute left-3 top-3 flex gap-1.5">
            {product.isNew && (
              <span className="rounded-full bg-white px-2.5 py-1 text-[10px] font-medium">New</span>
            )}
            {product.soldOut && (
              <span className="rounded-full bg-ink px-2.5 py-1 text-[10px] font-medium text-white">
                Sold out
              </span>
            )}
          </div>
        </div>
        <div className="flex flex-col gap-0.5 pt-3 pr-8">
          <h3 className="text-[13px] font-medium leading-snug">{product.name}</h3>
          <p className="text-[12px] text-muted">
            <span className="sr-only">Regular price </span>
            {formatPrice(product.price)}
          </p>
        </div>
      </Link>
      <button
        type="button"
        onClick={() => setSaved((s) => !s)}
        aria-pressed={saved}
        aria-label={saved ? `Remove ${product.name} from wishlist` : `Save ${product.name} to wishlist`}
        className="absolute bottom-1 right-0 p-1 hover:opacity-60"
      >
        <BookmarkIcon filled={saved} className="h-4 w-4" />
      </button>
    </article>
  );
}
