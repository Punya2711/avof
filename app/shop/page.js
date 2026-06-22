'use client';
import { Suspense, useState, useEffect, useMemo } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { Filter, Search, X } from 'lucide-react';
import { PRODUCTS, CATEGORIES, getGroupedProducts } from '@/lib/products';
import ProductCard from '@/components/ProductCard';

const ALL_GROUPED = getGroupedProducts();

function ShopInner() {
  const sp = useSearchParams();
  const router = useRouter();
  const [q, setQ] = useState(sp.get('q') || '');
  const [cat, setCat] = useState(sp.get('category') || 'all');
  const [sort, setSort] = useState('featured');
  const [maxPrice, setMaxPrice] = useState(2500);

  useEffect(() => { setQ(sp.get('q') || ''); setCat(sp.get('category') || 'all'); }, [sp]);

  const filtered = useMemo(() => {
    let list = [...ALL_GROUPED];
    if (cat !== 'all') list = list.filter(p => p.category === cat);
    if (q) { const ql = q.toLowerCase(); list = list.filter(p => p.name.toLowerCase().includes(ql) || p.category.toLowerCase().includes(ql)); }
    list = list.filter(p => (p.min_price || p.price) <= maxPrice);
    if (sort === 'price-asc') list.sort((a, b) => (a.min_price || a.price) - (b.min_price || b.price));
    if (sort === 'price-desc') list.sort((a, b) => (b.max_price || b.price) - (a.max_price || a.price));
    if (sort === 'rating') list.sort((a, b) => b.rating - a.rating);
    return list;
  }, [q, cat, sort, maxPrice]);

  const updateCat = (c) => { setCat(c); router.replace(`/shop${c !== 'all' ? `?category=${encodeURIComponent(c)}` : ''}`); };

  return (
    <div className="bg-cream">
      {/* Banner */}
      <div className="relative h-56 md:h-72 overflow-hidden">
        <img src="https://images.unsplash.com/photo-1492496913980-501348b61469?w=2000&q=80" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-r from-forestDark/80 to-forestDark/30" />
        <div className="container relative h-full flex flex-col justify-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <div className="text-xs tracking-[0.3em] uppercase text-gold">Shop</div>
            <h1 className="font-display text-4xl md:text-6xl text-cream mt-2">{cat === 'all' ? 'All Organic Goodness' : cat}</h1>
            <p className="text-cream/70 mt-2">{filtered.length} products available • farm-fresh</p>
          </motion.div>
        </div>
      </div>

      <div className="container py-10 grid lg:grid-cols-[260px_1fr] gap-8">
        {/* Filter sidebar */}
        <aside className="space-y-6 sticky top-28 self-start">
          <div className="bg-white border border-beige rounded-2xl p-5">
            <div className="flex items-center justify-between mb-3"><div className="font-display text-lg text-forest flex items-center gap-2"><Filter className="w-4 h-4" /> Filters</div></div>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-moss" />
              <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search products" className="w-full pl-9 pr-3 py-2 rounded-full border border-beige bg-cream text-sm focus:outline-none focus:border-olive" />
            </div>
          </div>
          <div className="bg-white border border-beige rounded-2xl p-5">
            <div className="font-display text-lg text-forest mb-3">Categories</div>
            <ul className="space-y-1.5 text-sm">
              <li><button onClick={() => updateCat('all')} className={`text-left w-full px-3 py-1.5 rounded-full ${cat === 'all' ? 'bg-forest text-cream' : 'hover:bg-beige/60 text-forest/80'}`}>All Products</button></li>
              {CATEGORIES.map(c => <li key={c}><button onClick={() => updateCat(c)} className={`text-left w-full px-3 py-1.5 rounded-full transition ${cat === c ? 'bg-forest text-cream' : 'hover:bg-beige/60 text-forest/80'}`}>{c}</button></li>)}
            </ul>
          </div>
          <div className="bg-white border border-beige rounded-2xl p-5">
            <div className="font-display text-lg text-forest mb-3">Max Price</div>
            <input type="range" min={50} max={2500} step={50} value={maxPrice} onChange={(e) => setMaxPrice(+e.target.value)} className="w-full accent-forest" />
            <div className="text-sm text-moss">Up to <b className="text-forest">₹{maxPrice}</b></div>
          </div>
        </aside>

        <div>
          {/* Top bar */}
          <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
            <div className="text-sm text-moss">Showing <b className="text-forest">{filtered.length}</b> products</div>
            <select value={sort} onChange={(e) => setSort(e.target.value)} className="rounded-full border border-beige bg-white px-4 py-2 text-sm focus:outline-none focus:border-olive">
              <option value="featured">Sort: Featured</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
              <option value="rating">Top Rated</option>
            </select>
          </div>

          {filtered.length === 0 ? (
            <div className="py-20 text-center text-moss">No products match. <button onClick={() => { setQ(''); updateCat('all'); setMaxPrice(2500); }} className="text-olive underline ml-2">Reset filters</button></div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-5">
              {filtered.map((p, i) => <ProductCard key={p.id} p={p} index={i} />)}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default function ShopPage() {
  return <Suspense fallback={<div className="py-20 text-center text-moss">Loading shop...</div>}><ShopInner /></Suspense>;
}
