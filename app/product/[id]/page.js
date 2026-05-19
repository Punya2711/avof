'use client';
import { useState, useMemo, use } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ShoppingCart, Heart, Star, Truck, ShieldCheck, RefreshCw, Plus, Minus, ChevronRight, Zap } from 'lucide-react';
import { getProductById, PRODUCTS } from '@/lib/products';
import { useCart } from '@/lib/cart-context';
import ProductCard from '@/components/ProductCard';

export default function ProductPage({ params }) {
  const { id } = use(params);
  const product = getProductById(id);
  const { add } = useCart();
  const router = useRouter();
  const [qty, setQty] = useState(1);
  const [tab, setTab] = useState('description');

  const similar = useMemo(() => product ? PRODUCTS.filter(x => x.category === product.category && x.id !== product.id).slice(0, 4) : [], [product]);

  if (!product) return <div className="py-32 text-center text-moss">Product not found. <Link href="/shop" className="text-olive underline">Back to shop</Link></div>;

  const buyNow = () => { add(product, qty); router.push('/checkout'); };

  return (
    <div className="bg-cream">
      <div className="container py-6 text-sm text-moss flex items-center gap-1.5">
        <Link href="/" className="hover:text-forest">Home</Link> <ChevronRight className="w-3 h-3" />
        <Link href="/shop" className="hover:text-forest">Shop</Link> <ChevronRight className="w-3 h-3" />
        <Link href={`/shop?category=${encodeURIComponent(product.category)}`} className="hover:text-forest">{product.category}</Link> <ChevronRight className="w-3 h-3" />
        <span className="text-forest">{product.name}</span>
      </div>
      <div className="container grid lg:grid-cols-2 gap-10 pb-10">
        <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} className="space-y-3">
          <div className="aspect-square rounded-3xl overflow-hidden bg-white shadow-lg relative group">
            <img src={product.image} alt={product.name} className="w-full h-full object-cover group-hover:scale-105 transition duration-700" />
            {product.badge && <span className="absolute top-4 left-4 bg-forest text-cream text-xs font-bold uppercase tracking-wider px-3 py-1.5 rounded-full">{product.badge}</span>}
            {product.discount > 0 && <span className="absolute top-4 right-4 bg-terracotta text-cream text-sm font-bold px-3 py-1.5 rounded-full">-{product.discount}%</span>}
          </div>
          <div className="grid grid-cols-4 gap-2">
            {[product.image, product.image, product.image, product.image].map((s, i) => (
              <div key={i} className="aspect-square rounded-xl overflow-hidden border border-beige hover:border-olive cursor-pointer"><img src={s} className="w-full h-full object-cover" /></div>
            ))}
          </div>
        </motion.div>
        <motion.div initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }}>
          <div className="text-xs uppercase tracking-widest text-olive mb-2">{product.category}</div>
          <h1 className="font-display text-4xl md:text-5xl text-forest leading-tight">{product.name}</h1>
          <div className="flex items-center gap-3 mt-3">
            <div className="flex gap-0.5">{[...Array(5)].map((_, i) => <Star key={i} className={`w-4 h-4 ${i < Math.floor(product.rating) ? 'fill-gold text-gold' : 'text-beige'}`} />)}</div>
            <span className="text-sm text-moss">{product.rating.toFixed(1)} • {product.reviews} reviews</span>
          </div>
          <div className="mt-5 flex items-baseline gap-3">
            <span className="font-display text-5xl text-forest">₹{product.price}</span>
            {product.mrp > product.price && <><span className="text-xl text-moss/60 line-through">₹{product.mrp}</span><span className="text-sm font-semibold text-terracotta">Save {product.discount}%</span></>}
          </div>
          <div className="mt-2 text-sm text-moss">Pack size: <b className="text-forest">{product.weight}</b> • inclusive of all taxes</div>
          <p className="mt-5 text-moss/80 leading-relaxed">{product.description}</p>
          <div className="mt-7 flex items-center gap-4">
            <div className="flex items-center gap-1 bg-white border border-beige rounded-full px-2">
              <button onClick={() => setQty(Math.max(1, qty - 1))} className="w-9 h-9 flex items-center justify-center hover:bg-beige/50 rounded-full"><Minus className="w-4 h-4" /></button>
              <span className="w-8 text-center font-semibold">{qty}</span>
              <button onClick={() => setQty(qty + 1)} className="w-9 h-9 flex items-center justify-center hover:bg-beige/50 rounded-full"><Plus className="w-4 h-4" /></button>
            </div>
            <button onClick={() => add(product, qty)} className="flex-1 bg-forest text-cream font-semibold rounded-full px-6 py-3.5 hover:bg-olive transition flex items-center justify-center gap-2 btn-glow">
              <ShoppingCart className="w-4 h-4" /> Add to Cart
            </button>
            <button onClick={buyNow} className="flex-1 bg-gold text-forestDark font-bold rounded-full px-6 py-3.5 hover:bg-cream transition flex items-center justify-center gap-2 btn-glow">
              <Zap className="w-4 h-4" /> Buy Now
            </button>
          </div>
          <div className="grid grid-cols-3 gap-3 mt-8">
            {[{ i: Truck, t: 'Free shipping', s: 'on ₹999+' }, { i: ShieldCheck, t: 'Quality tested', s: 'every batch' }, { i: RefreshCw, t: 'Easy returns', s: '7-day policy' }].map((b, k) => (
              <div key={k} className="bg-white border border-beige rounded-2xl p-3 text-center">
                <b.i className="w-5 h-5 mx-auto text-olive" />
                <div className="text-xs font-semibold mt-2 text-forest">{b.t}</div>
                <div className="text-[10px] text-moss">{b.s}</div>
              </div>
            ))}
          </div>
          <div className="mt-8 border-t border-beige pt-6">
            <div className="flex gap-6 text-sm border-b border-beige mb-4">
              {['description', 'details', 'storage'].map(t => (
                <button key={t} onClick={() => setTab(t)} className={`pb-2 -mb-px capitalize font-semibold ${tab === t ? 'text-forest border-b-2 border-forest' : 'text-moss/60'}`}>{t}</button>
              ))}
            </div>
            {tab === 'description' && <p className="text-moss/80 leading-relaxed">{product.description} This {product.name.toLowerCase()} is grown by partner farmers of BHOOMI Sustainable Development Society across 8 districts of Karnataka. Every grain is hand-selected, naturally processed, and stored without preservatives.</p>}
            {tab === 'details' && <ul className="text-sm text-moss/80 space-y-1.5"><li>• Category: {product.category}</li><li>• Pack size: {product.weight}</li><li>• 100% organic certified</li><li>• No pesticides, no chemical fertilizers</li><li>• Direct from BHOOMI farmer collective, Karnataka</li><li>• Stock available: {product.stock} units</li></ul>}
            {tab === 'storage' && <p className="text-moss/80 leading-relaxed">Store in a cool, dry place in an airtight container. Best consumed within 6 months of purchase. Once opened, refrigeration recommended for grains during monsoon.</p>}
          </div>
        </motion.div>
      </div>
      <section className="container py-16">
        <h2 className="font-display text-3xl text-forest mb-8">You may also <span className="italic">love</span></h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
          {similar.map((p, i) => <ProductCard key={p.id} p={p} index={i} />)}
        </div>
      </section>
    </div>
  );
}
