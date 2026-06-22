'use client';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ShoppingCart, Star, Zap } from 'lucide-react';
import { useCart } from '@/lib/cart-context';

export default function ProductCard({ p, index = 0 }) {
  const { add } = useCart();
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.5, delay: (index % 8) * 0.05 }}
      className="group card-hover bg-white rounded-2xl overflow-hidden border border-beige/60"
    >
      <Link href={`/product/${p.id}`} className="block relative overflow-hidden aspect-square bg-beige">
        <img src={p.image} alt={p.name} loading="lazy" className="w-full h-full object-cover group-hover:scale-110 transition duration-700" />
        {p.badge && <span className="absolute top-3 left-3 bg-forest text-cream text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full">{p.badge}</span>}
        {p.discount > 0 && <span className="absolute top-3 right-3 bg-terracotta text-cream text-xs font-bold px-2.5 py-1 rounded-full">-{p.discount}%</span>}
        <div className="absolute inset-x-0 bottom-0 p-3 translate-y-full group-hover:translate-y-0 transition">
          <div className="glass rounded-xl px-3 py-2 flex items-center justify-between gap-2">
            <span className="text-xs text-forest font-semibold">Quick view</span>
            <span className="text-xs text-moss">→</span>
          </div>
        </div>
      </Link>
      <div className="p-4">
        <div className="text-[10px] uppercase tracking-widest text-moss/70 mb-1">{p.category}</div>
        <Link href={`/product/${p.id}`} className="font-medium text-forest line-clamp-2 hover:text-olive transition min-h-[3rem] block">{p.name}</Link>
        <div className="flex items-center gap-1 mt-2 text-xs text-moss">
          <Star className="w-3 h-3 fill-gold text-gold" /> {p.rating.toFixed(1)}
          <span className="text-moss/60">({p.reviews})</span>
          <span className="ml-auto text-moss/70">{p.weight}</span>
        </div>
        {p.variant_count > 1 && (
          <div className="mt-1.5 text-[10px] text-olive font-semibold uppercase tracking-wider">Available in {p.variant_count} sizes</div>
        )}
        <div className="flex items-end justify-between mt-3">
          <div>
            <div className="text-xl font-bold text-forest">
              {p.variant_count > 1 && p.min_price !== p.max_price ? <>From ₹{p.min_price}</> : <>₹{p.price}</>}
            </div>
            {p.mrp > p.price && <div className="text-xs text-moss/60 line-through">₹{p.mrp}</div>}
          </div>
          {p.variant_count > 1 ? (
            <Link href={`/product/${p.id}`} onClick={(e) => e.stopPropagation()} className="px-3 h-10 rounded-full bg-forest text-cream hover:bg-olive transition flex items-center text-xs font-semibold">
              Select size
            </Link>
          ) : (
            <button onClick={(e) => { e.preventDefault(); add(p, 1); }} className="w-10 h-10 rounded-full bg-forest text-cream hover:bg-olive transition flex items-center justify-center group/btn">
              <ShoppingCart className="w-4 h-4 group-hover/btn:scale-125 transition" />
            </button>
          )}
        </div>
      </div>
    </motion.div>
  );
}
