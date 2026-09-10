'use client';

import { Suspense, useState, useEffect, useMemo } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { Filter, Search, X } from 'lucide-react';

import {
  PRODUCTS,
  CATEGORIES,
  getGroupedProducts,
} from '@/lib/products';

import ProductCard from '@/components/ProductCard';

const ALL_GROUPED = getGroupedProducts();

function ShopInner() {
  const sp = useSearchParams();
  const router = useRouter();

  const [q, setQ] = useState(sp.get('q') || '');
  const [cat, setCat] = useState(sp.get('category') || 'all');
  const [sort, setSort] = useState('featured');
  const [maxPrice, setMaxPrice] = useState(2500);

  // Mobile filter drawer
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

  // Keep filters synced with URL
  useEffect(() => {
    setQ(sp.get('q') || '');
    setCat(sp.get('category') || 'all');
  }, [sp]);

  // ============================================================
  // FILTER PRODUCTS
  // ============================================================

  const filtered = useMemo(() => {
    let list = [...ALL_GROUPED];

    // Category
    if (cat !== 'all') {
      list = list.filter((p) => p.category === cat);
    }

    // Search
    if (q) {
      const ql = q.toLowerCase();

      list = list.filter(
        (p) =>
          p.name.toLowerCase().includes(ql) ||
          p.category.toLowerCase().includes(ql)
      );
    }

    // Maximum price
    list = list.filter(
      (p) => (p.min_price || p.price) <= maxPrice
    );

    // Sorting
    if (sort === 'price-asc') {
      list.sort(
        (a, b) =>
          (a.min_price || a.price) -
          (b.min_price || b.price)
      );
    }

    if (sort === 'price-desc') {
      list.sort(
        (a, b) =>
          (b.max_price || b.price) -
          (a.max_price || a.price)
      );
    }

    if (sort === 'rating') {
      list.sort((a, b) => b.rating - a.rating);
    }

    return list;
  }, [q, cat, sort, maxPrice]);

  // ============================================================
  // CATEGORY UPDATE
  // ============================================================

  const updateCat = (c) => {
    setCat(c);

    router.replace(
      `/shop${
        c !== 'all'
          ? `?category=${encodeURIComponent(c)}`
          : ''
      }`
    );
  };

  // ============================================================
  // RESET FILTERS
  // ============================================================

  const resetFilters = () => {
    setQ('');
    setCat('all');
    setMaxPrice(2500);
    setMobileFiltersOpen(false);

    router.replace('/shop');
  };

  return (
    <div className="bg-cream min-h-screen">

      {/* ======================================================
          SHOP BANNER
      ====================================================== */}

      <div className="relative h-56 md:h-72 overflow-hidden">

        <img
          src="https://images.unsplash.com/photo-1492496913980-501348b61469?w=2000&q=80"
          alt="Organic farm"
          className="w-full h-full object-cover"
        />

        <div className="absolute inset-0 bg-gradient-to-r from-forestDark/80 to-forestDark/30" />

        <div className="container relative h-full flex flex-col justify-center">

          <motion.div
            initial={{
              opacity: 0,
              y: 20,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
          >

            <div className="text-xs tracking-[0.3em] uppercase text-gold">
              Shop
            </div>

            <h1 className="font-display text-4xl md:text-6xl text-cream mt-2">
              {cat === 'all'
                ? 'All Organic Goodness'
                : cat}
            </h1>

            <p className="text-cream/70 mt-2">
              {filtered.length} products available • farm-fresh
            </p>

          </motion.div>

        </div>

      </div>


      {/* ======================================================
          MAIN SHOP AREA
      ====================================================== */}

      <div className="container py-10 grid lg:grid-cols-[260px_1fr] gap-8">


        {/* ====================================================
            DESKTOP FILTER SIDEBAR

            Hidden on mobile.
            Visible from lg breakpoint upwards.
        ==================================================== */}

        <aside className="hidden lg:block space-y-6 sticky top-28 self-start">

          {/* Search Filter */}

          <div className="bg-white border border-beige rounded-2xl p-5">

            <div className="flex items-center justify-between mb-3">

              <div className="font-display text-lg text-forest flex items-center gap-2">

                <Filter className="w-4 h-4" />

                Filters

              </div>

            </div>

            <div className="relative">

              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-moss" />

              <input
                value={q}
                onChange={(e) => setQ(e.target.value)}
                placeholder="Search products"
                className="w-full pl-9 pr-3 py-2 rounded-full border border-beige bg-cream text-sm focus:outline-none focus:border-olive"
              />

            </div>

          </div>


          {/* Categories */}

          <div className="bg-white border border-beige rounded-2xl p-5">

            <div className="font-display text-lg text-forest mb-3">
              Categories
            </div>

            <ul className="space-y-1.5 text-sm">

              {/* All Products */}

              <li>

                <button
                  onClick={() => updateCat('all')}
                  className={`text-left w-full px-3 py-1.5 rounded-full transition ${
                    cat === 'all'
                      ? 'bg-forest text-cream'
                      : 'hover:bg-beige/60 text-forest/80'
                  }`}
                >
                  All Products
                </button>

              </li>


              {/* Categories */}

              {CATEGORIES.map((c) => (

                <li key={c}>

                  <button
                    onClick={() => updateCat(c)}
                    className={`text-left w-full px-3 py-1.5 rounded-full transition ${
                      cat === c
                        ? 'bg-forest text-cream'
                        : 'hover:bg-beige/60 text-forest/80'
                    }`}
                  >
                    {c}
                  </button>

                </li>

              ))}

            </ul>

          </div>


          {/* Maximum Price */}

          <div className="bg-white border border-beige rounded-2xl p-5">

            <div className="font-display text-lg text-forest mb-3">
              Max Price
            </div>

            <input
              type="range"
              min={50}
              max={2500}
              step={50}
              value={maxPrice}
              onChange={(e) =>
                setMaxPrice(Number(e.target.value))
              }
              className="w-full accent-forest"
            />

            <div className="text-sm text-moss">
              Up to{' '}
              <b className="text-forest">
                ₹{maxPrice}
              </b>
            </div>

          </div>

        </aside>


        {/* ====================================================
            PRODUCTS AREA
        ==================================================== */}

        <div>


          {/* ==================================================
              MOBILE FILTER BUTTON
          ================================================== */}

          <div className="lg:hidden mb-5">

            <button
              onClick={() => setMobileFiltersOpen(true)}
              className="w-full flex items-center justify-between bg-white border border-beige rounded-2xl px-4 py-3.5 text-sm font-semibold text-forest shadow-sm"
            >

              <span className="flex items-center gap-2">

                <Filter className="w-4 h-4" />

                Filters & Categories

              </span>


              <span className="text-moss text-xs max-w-[45%] truncate">

                {cat === 'all'
                  ? 'All Products'
                  : cat}

              </span>

            </button>

          </div>


          {/* ==================================================
              MOBILE FILTER DRAWER
          ================================================== */}

          <AnimatePresence>

            {mobileFiltersOpen && (

              <div className="fixed inset-0 z-[100] lg:hidden">

                {/* Backdrop */}

                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="absolute inset-0 bg-forestDark/50"
                  onClick={() =>
                    setMobileFiltersOpen(false)
                  }
                />


                {/* Drawer */}

                <motion.div
                  initial={{ x: '100%' }}
                  animate={{ x: 0 }}
                  exit={{ x: '100%' }}
                  transition={{
                    duration: 0.25,
                    ease: 'easeOut',
                  }}
                  className="absolute right-0 top-0 h-full w-[88%] max-w-sm bg-cream shadow-2xl overflow-y-auto"
                >

                  {/* Drawer Header */}

                  <div className="sticky top-0 z-10 bg-cream border-b border-beige px-5 py-4 flex items-center justify-between">

                    <div className="font-display text-xl text-forest">
                      Filters
                    </div>

                    <button
                      onClick={() =>
                        setMobileFiltersOpen(false)
                      }
                      aria-label="Close filters"
                      className="w-9 h-9 rounded-full bg-white border border-beige flex items-center justify-center text-forest"
                    >

                      <X className="w-5 h-5" />

                    </button>

                  </div>


                  {/* Drawer Content */}

                  <div className="p-5 space-y-6">


                    {/* Search */}

                    <div className="bg-white border border-beige rounded-2xl p-5">

                      <div className="font-display text-lg text-forest mb-3">
                        Search
                      </div>

                      <div className="relative">

                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-moss" />

                        <input
                          value={q}
                          onChange={(e) =>
                            setQ(e.target.value)
                          }
                          placeholder="Search products"
                          className="w-full pl-9 pr-3 py-2.5 rounded-full border border-beige bg-cream text-sm focus:outline-none focus:border-olive"
                        />

                      </div>

                    </div>


                    {/* Categories */}

                    <div className="bg-white border border-beige rounded-2xl p-5">

                      <div className="font-display text-lg text-forest mb-3">
                        Categories
                      </div>

                      <div className="space-y-1.5">

                        {/* All Products */}

                        <button
                          onClick={() => {
                            updateCat('all');
                            setMobileFiltersOpen(false);
                          }}
                          className={`text-left w-full px-3 py-2 rounded-full text-sm transition ${
                            cat === 'all'
                              ? 'bg-forest text-cream'
                              : 'hover:bg-beige/60 text-forest/80'
                          }`}
                        >
                          All Products
                        </button>


                        {/* Categories */}

                        {CATEGORIES.map((c) => (

                          <button
                            key={c}
                            onClick={() => {
                              updateCat(c);
                              setMobileFiltersOpen(false);
                            }}
                            className={`text-left w-full px-3 py-2 rounded-full text-sm transition ${
                              cat === c
                                ? 'bg-forest text-cream'
                                : 'hover:bg-beige/60 text-forest/80'
                            }`}
                          >
                            {c}
                          </button>

                        ))}

                      </div>

                    </div>


                    {/* Max Price */}

                    <div className="bg-white border border-beige rounded-2xl p-5">

                      <div className="font-display text-lg text-forest mb-3">
                        Max Price
                      </div>

                      <input
                        type="range"
                        min={50}
                        max={2500}
                        step={50}
                        value={maxPrice}
                        onChange={(e) =>
                          setMaxPrice(
                            Number(e.target.value)
                          )
                        }
                        className="w-full accent-forest"
                      />

                      <div className="text-sm text-moss mt-2">
                        Up to{' '}
                        <b className="text-forest">
                          ₹{maxPrice}
                        </b>
                      </div>

                    </div>


                    {/* Reset */}

                    <button
                      onClick={resetFilters}
                      className="w-full py-3 rounded-full border border-forest text-forest font-semibold text-sm hover:bg-forest hover:text-cream transition"
                    >
                      Reset Filters
                    </button>

                  </div>

                </motion.div>

              </div>

            )}

          </AnimatePresence>


          {/* ==================================================
              TOP BAR
          ================================================== */}

          <div className="flex flex-wrap items-center justify-between gap-3 mb-6">

            <div className="text-sm text-moss">

              Showing{' '}

              <b className="text-forest">
                {filtered.length}
              </b>{' '}

              products

            </div>


            <select
              value={sort}
              onChange={(e) =>
                setSort(e.target.value)
              }
              className="rounded-full border border-beige bg-white px-4 py-2 text-sm focus:outline-none focus:border-olive"
            >

              <option value="featured">
                Sort: Featured
              </option>

              <option value="price-asc">
                Price: Low to High
              </option>

              <option value="price-desc">
                Price: High to Low
              </option>

              <option value="rating">
                Top Rated
              </option>

            </select>

          </div>


          {/* ==================================================
              PRODUCTS
          ================================================== */}

          {filtered.length === 0 ? (

            <div className="py-20 text-center text-moss">

              No products match.

              <button
                onClick={resetFilters}
                className="text-olive underline ml-2"
              >
                Reset filters
              </button>

            </div>

          ) : (

            <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-5">

              {filtered.map((p, i) => (

                <ProductCard
                  key={p.id}
                  p={p}
                  index={i}
                />

              ))}

            </div>

          )}

        </div>

      </div>

    </div>
  );
}


// ============================================================
// SHOP PAGE
// ============================================================

export default function ShopPage() {

  return (

    <Suspense
      fallback={
        <div className="py-20 text-center text-moss">
          Loading shop...
        </div>
      }
    >

      <ShopInner />

    </Suspense>

  );
}