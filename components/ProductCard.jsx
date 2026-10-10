
'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { ShoppingCart, Star } from 'lucide-react';
import { useCart } from '@/lib/cart-context';

export default function ProductCard({ p, index = 0 }) {
  const { add } = useCart();

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{
        duration: 0.45,
        delay: (index % 8) * 0.04,
      }}
      className="group card-hover overflow-hidden rounded-2xl border border-beige/60 bg-white"
    >
      {/* Product image */}
      <Link
        href={`/product/${p.id}`}
        className="relative block aspect-square overflow-hidden bg-[#f8f6ef]"
      >
        <div className="flex h-full w-full items-center justify-center">
          <img
            src={p.image}
            alt={p.name}
            loading="lazy"
            className="h-full w-full object-contain transition-transform duration-500 ease-out group-hover:scale-[1.03]"
          />
        </div>

        {/* Product badge */}
        {p.badge && (
          <span className="absolute left-3 top-3 rounded-full bg-forest px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-cream">
            {p.badge}
          </span>
        )}

        {/* Discount badge */}
        {p.discount > 0 && (
          <span className="absolute right-3 top-3 rounded-full bg-terracotta px-2.5 py-1 text-xs font-bold text-cream">
            -{p.discount}%
          </span>
        )}

        {/* Quick view */}
        <div className="absolute inset-x-3 bottom-3 translate-y-3 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
          <div className="glass flex items-center justify-between gap-2 rounded-xl px-3 py-2">
            <span className="text-xs font-semibold text-forest">
              View product
            </span>
            <span className="text-xs text-moss">→</span>
          </div>
        </div>
      </Link>

      {/* Product information */}
      <div className="p-4">
        <div className="mb-1 text-[10px] uppercase tracking-widest text-moss/70">
          {p.category}
        </div>

        <Link
          href={`/product/${p.id}`}
          className="block min-h-[3rem] line-clamp-2 font-medium text-forest transition hover:text-olive"
        >
          {p.name}
        </Link>

        {/* Rating and weight */}
        <div className="mt-2 flex items-center gap-1 text-xs text-moss">
          <Star className="h-3 w-3 fill-gold text-gold" />
          <span>{p.rating.toFixed(1)}</span>

          <span className="text-moss/60">
            ({p.reviews})
          </span>

          <span className="ml-auto whitespace-nowrap text-moss/70">
            {p.weight}
          </span>
        </div>

        {/* Variants */}
        {p.variant_count > 1 && (
          <div className="mt-1.5 text-[10px] font-semibold uppercase tracking-wider text-olive">
            Available in {p.variant_count} sizes
          </div>
        )}

        {/* Price and action */}
        <div className="mt-3 flex items-end justify-between gap-2">
          <div className="min-w-0">
            <div className="text-xl font-bold text-forest">
              {p.variant_count > 1 &&
              p.min_price !== p.max_price ? (
                <>From ₹{p.min_price}</>
              ) : (
                <>₹{p.price}</>
              )}
            </div>

            {p.mrp > p.price && (
              <div className="text-xs text-moss/60 line-through">
                ₹{p.mrp}
              </div>
            )}
          </div>

          {p.variant_count > 1 ? (
            <Link
              href={`/product/${p.id}`}
              className="flex h-10 shrink-0 items-center justify-center rounded-full bg-forest px-3 text-xs font-semibold text-cream transition hover:bg-olive"
            >
              Select size
            </Link>
          ) : (
            <button
              type="button"
              aria-label={`Add ${p.name} to cart`}
              onClick={() => add(p, 1)}
              className="group/btn flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-forest text-cream transition hover:bg-olive"
            >
              <ShoppingCart className="h-4 w-4 transition-transform group-hover/btn:scale-110" />
            </button>
          )}
        </div>
      </div>
    </motion.div>
  );
}
