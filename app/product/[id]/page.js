
'use client';

import { useState, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { motion } from 'framer-motion';
import {
  ShoppingCart,
  Star,
  Truck,
  ShieldCheck,
  RefreshCw,
  Plus,
  Minus,
  ChevronRight,
  Zap,
  Check,
} from 'lucide-react';

import {
  getProductById,
  PRODUCTS,
  getVariants,
} from '@/lib/products';

import { useCart } from '@/lib/cart-context';
import ProductCard from '@/components/ProductCard';

export default function ProductPage({ params }) {
  const { id } = params;
  const baseProduct = getProductById(id);
  const { add } = useCart();
  const router = useRouter();

  const variants = useMemo(
    () => (baseProduct ? getVariants(baseProduct.name) : []),
    [baseProduct]
  );

  const [selectedId, setSelectedId] = useState(id);
  const [qty, setQty] = useState(1);
  const [tab, setTab] = useState('description');

  const selected = useMemo(
    () =>
      variants.find((v) => v.id === selectedId) ||
      baseProduct,
    [variants, selectedId, baseProduct]
  );

  const similar = useMemo(() => {
    if (!baseProduct) return [];

    const seen = new Set();
    const out = [];

    for (const item of PRODUCTS) {
      if (
        item.category === baseProduct.category &&
        item.name !== baseProduct.name &&
        !seen.has(item.name)
      ) {
        seen.add(item.name);
        out.push(item);

        if (out.length >= 4) break;
      }
    }

    return out;
  }, [baseProduct]);

  if (!baseProduct) {
    return (
      <div className="py-32 text-center text-moss">
        Product not found.{' '}
        <Link
          href="/shop"
          className="text-olive underline"
        >
          Back to shop
        </Link>
      </div>
    );
  }

  const product = selected;

  const buyNow = () => {
    add(product, qty);
    router.push('/checkout');
  };

  const gallery = product.gallery?.length
    ? product.gallery
    : [product.image];

  return (
    <div className="min-h-screen bg-cream">
      {/* Breadcrumbs */}
      <div className="container flex flex-wrap items-center gap-1.5 py-6 text-sm text-moss">
        <Link href="/" className="transition hover:text-forest">
          Home
        </Link>

        <ChevronRight className="h-3 w-3" />

        <Link
          href="/shop"
          className="transition hover:text-forest"
        >
          Shop
        </Link>

        <ChevronRight className="h-3 w-3" />

        <Link
          href={`/shop?category=${encodeURIComponent(
            product.category
          )}`}
          className="transition hover:text-forest"
        >
          {product.category}
        </Link>

        <ChevronRight className="h-3 w-3" />

        <span className="text-forest">
          {product.name}
        </span>
      </div>

      {/* Product section */}
      <div className="container grid grid-cols-1 items-start gap-8 pb-12 lg:grid-cols-2 lg:gap-12">
        {/* LEFT: Product images */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="mx-auto w-full max-w-[560px] space-y-4"
        >
          {/* Main image */}
          <div className="relative flex aspect-[4/5] w-full items-center justify-center overflow-hidden rounded-3xl border border-beige/60 bg-white p-2 shadow-sm sm:p-3">
            <img
              src={product.image}
              alt={product.name}
              className="h-full w-full object-contain"
            />

            {product.badge && (
              <span className="absolute left-4 top-4 rounded-full bg-forest px-3 py-1.5 text-xs font-bold uppercase tracking-wider text-cream">
                {product.badge}
              </span>
            )}

            {product.discount > 0 && (
              <span className="absolute right-4 top-4 rounded-full bg-terracotta px-3 py-1.5 text-sm font-bold text-cream">
                -{product.discount}%
              </span>
            )}
          </div>

          {/* Image thumbnails */}
          <div className="grid grid-cols-4 gap-3">
            {gallery.map((src, index) => (
              <div
                key={`${src}-${index}`}
                className="flex aspect-square items-center justify-center overflow-hidden rounded-xl border border-beige bg-white p-1 transition hover:border-olive sm:p-2"
              >
                <img
                  src={src}
                  alt={`${product.name} image ${index + 1}`}
                  className="h-full w-full object-contain"
                  loading="lazy"
                />
              </div>
            ))}
          </div>
        </motion.div>

        {/* RIGHT: Product information */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="min-w-0"
        >
          <div className="mb-2 text-xs uppercase tracking-widest text-olive">
            {product.category}
          </div>

          <h1 className="font-display text-4xl leading-tight text-forest md:text-5xl">
            {product.name}
          </h1>

          {/* Rating */}
          <div className="mt-3 flex flex-wrap items-center gap-3">
            <div className="flex gap-0.5">
              {[...Array(5)].map((_, index) => (
                <Star
                  key={index}
                  className={`h-4 w-4 ${
                    index < Math.floor(product.rating)
                      ? 'fill-gold text-gold'
                      : 'text-beige'
                  }`}
                />
              ))}
            </div>

            <span className="text-sm text-moss">
              {product.rating.toFixed(1)} · {product.reviews} reviews
            </span>
          </div>

          {/* Price */}
          <div className="mt-5 flex flex-wrap items-baseline gap-3">
            <span className="font-display text-5xl text-forest">
              ₹{product.price}
            </span>

            {product.mrp > product.price && (
              <>
                <span className="text-xl text-moss/60 line-through">
                  ₹{product.mrp}
                </span>

                <span className="text-sm font-semibold text-terracotta">
                  Save {product.discount}%
                </span>
              </>
            )}
          </div>

          <div className="mt-2 text-sm text-moss">
            Inclusive of all taxes
          </div>

          {/* Variant selector */}
          {variants.length > 1 && (
            <div className="mt-6">
              <div className="mb-2 text-xs uppercase tracking-widest text-olive">
                Select pack size
              </div>

              <div className="flex flex-wrap gap-2">
                {variants.map((variant) => {
                  const isSelected =
                    variant.id === product.id;

                  return (
                    <button
                      key={variant.id}
                      type="button"
                      onClick={() => {
                        setSelectedId(variant.id);
                      }}
                      className={`rounded-xl border-2 px-4 py-2.5 text-sm transition ${
                        isSelected
                          ? 'border-forest bg-forest text-cream'
                          : 'border-beige bg-white text-forest hover:border-olive'
                      }`}
                    >
                      <div className="flex items-center gap-1.5 font-semibold">
                        {isSelected && (
                          <Check className="h-3.5 w-3.5" />
                        )}

                        {variant.weight}
                      </div>

                      <div
                        className={`mt-0.5 text-xs ${
                          isSelected
                            ? 'text-cream/80'
                            : 'text-moss'
                        }`}
                      >
                        ₹{variant.price}

                        {variant.mrp > variant.price && (
                          <span className="ml-1 line-through opacity-60">
                            ₹{variant.mrp}
                          </span>
                        )}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {variants.length === 1 && (
            <div className="mt-4 text-sm text-moss">
              Pack size:{' '}
              <b className="text-forest">
                {product.weight}
              </b>
            </div>
          )}

          {/* Short description */}
          <p className="mt-5 leading-relaxed text-moss/80">
            {product.description}
          </p>

          {/* Quantity and actions */}
          <div className="mt-7 flex flex-wrap items-center gap-3">
            <div className="flex items-center gap-1 rounded-full border border-beige bg-white px-2">
              <button
                type="button"
                aria-label="Decrease quantity"
                onClick={() =>
                  setQty((current) => Math.max(1, current - 1))
                }
                className="flex h-9 w-9 items-center justify-center rounded-full transition hover:bg-beige/50"
              >
                <Minus className="h-4 w-4" />
              </button>

              <span className="w-8 text-center font-semibold">
                {qty}
              </span>

              <button
                type="button"
                aria-label="Increase quantity"
                onClick={() =>
                  setQty((current) => current + 1)
                }
                className="flex h-9 w-9 items-center justify-center rounded-full transition hover:bg-beige/50"
              >
                <Plus className="h-4 w-4" />
              </button>
            </div>

            <button
              type="button"
              onClick={() => add(product, qty)}
              className="btn-glow flex min-w-[150px] flex-1 items-center justify-center gap-2 rounded-full bg-forest px-6 py-3.5 font-semibold text-cream transition hover:bg-olive"
            >
              <ShoppingCart className="h-4 w-4" />
              Add to Cart
            </button>

            <button
              type="button"
              onClick={buyNow}
              className="btn-glow flex min-w-[150px] flex-1 items-center justify-center gap-2 rounded-full bg-gold px-6 py-3.5 font-bold text-forestDark transition hover:bg-cream"
            >
              <Zap className="h-4 w-4" />
              Buy Now
            </button>
          </div>

          {/* Service benefits */}
          <div className="mt-8 grid grid-cols-3 gap-2 sm:gap-3">
            {[
              {
                icon: Truck,
                title: 'Free shipping',
                subtitle: 'on ₹999+',
              },
              {
                icon: ShieldCheck,
                title: 'Quality tested',
                subtitle: 'every batch',
              },
              {
                icon: RefreshCw,
                title: 'Easy returns',
                subtitle: '7-day policy',
              },
            ].map((benefit) => {
              const Icon = benefit.icon;

              return (
                <div
                  key={benefit.title}
                  className="rounded-2xl border border-beige bg-white p-2.5 text-center sm:p-3"
                >
                  <Icon className="mx-auto h-5 w-5 text-olive" />

                  <div className="mt-2 text-xs font-semibold text-forest">
                    {benefit.title}
                  </div>

                  <div className="text-[10px] text-moss">
                    {benefit.subtitle}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Information tabs */}
          <div className="mt-8 border-t border-beige pt-6">
            <div className="mb-4 flex gap-6 border-b border-beige text-sm">
              {['description', 'details', 'storage'].map(
                (tabName) => (
                  <button
                    key={tabName}
                    type="button"
                    onClick={() => setTab(tabName)}
                    className={`-mb-px border-b-2 pb-2 font-semibold capitalize transition ${
                      tab === tabName
                        ? 'border-forest text-forest'
                        : 'border-transparent text-moss/60 hover:text-forest'
                    }`}
                  >
                    {tabName}
                  </button>
                )
              )}
            </div>

            {tab === 'description' && (
              <p className="leading-relaxed text-moss/80">
                {product.description} This{' '}
                {product.name.toLowerCase()} is grown by
                partner farmers of BHOOMI Sustainable Development
                Society across 8 districts of Karnataka. Every
                grain is hand-selected, naturally processed, and
                stored without preservatives.
              </p>
            )}

            {tab === 'details' && (
              <ul className="space-y-1.5 text-sm text-moss/80">
                <li>• Category: {product.category}</li>
                <li>• Pack size: {product.weight}</li>
                <li>• 100% organic certified</li>
                <li>• No pesticides, no chemical fertilizers</li>
                <li>
                  • Direct from BHOOMI farmer collective, Karnataka
                </li>
                <li>
                  • Stock available:{' '}
                  {product.stock_quantity ?? product.stock} units
                </li>
              </ul>
            )}

            {tab === 'storage' && (
              <p className="leading-relaxed text-moss/80">
                Store in a cool, dry place in an airtight
                container. Best consumed within 6 months of
                purchase. Once opened, refrigeration recommended
                for grains during monsoon.
              </p>
            )}
          </div>
        </motion.div>
      </div>

      {/* Related products */}
      <section className="container py-16">
        <h2 className="mb-8 font-display text-3xl text-forest">
          You may also <span className="italic">love</span>
        </h2>

        <div className="grid grid-cols-2 gap-5 md:grid-cols-4">
          {similar.map((item, index) => (
            <ProductCard
              key={item.id}
              p={item}
              index={index}
            />
          ))}
        </div>
      </section>
    </div>
  );
}