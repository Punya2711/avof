'use client';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { Minus, Plus, X, ShoppingBag, ArrowRight, Leaf } from 'lucide-react';
import { useCart } from '@/lib/cart-context';

export default function CartPage() {
  const { items, remove, updateQty, subtotal, hydrated } = useCart();
  const delivery = subtotal > 999 || subtotal === 0 ? 0 : 60;
  const total = subtotal + delivery;

  if (!hydrated) return <div className="py-32 text-center text-moss">Loading...</div>;

  if (items.length === 0) return (
    <div className="container py-24 text-center">
      <motion.div animate={{ y: [0, -15, 0] }} transition={{ duration: 3, repeat: Infinity }} className="text-7xl mb-6">🌿</motion.div>
      <h1 className="font-display text-4xl text-forest">Your basket is empty</h1>
      <p className="text-moss mt-2">Start shopping for organic goodness!</p>
      <Link href="/shop" className="inline-flex items-center gap-2 mt-8 bg-forest text-cream rounded-full px-7 py-3.5 hover:bg-olive transition">Explore Shop <ArrowRight className="w-4 h-4" /></Link>
    </div>
  );
  return (
    <div className="container py-12">
      <h1 className="font-display text-4xl md:text-5xl text-forest">Your Basket <span className="text-moss text-2xl">({items.length})</span></h1>
      <div className="grid lg:grid-cols-[1fr_360px] gap-8 mt-8">
        <div className="space-y-3">
          <AnimatePresence>
            {items.map(it => (
              <motion.div key={it.id} layout initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, x: -100 }}
                className="bg-white border border-beige rounded-2xl p-4 flex gap-4 items-center">
                <img src={it.image} className="w-20 h-20 rounded-xl object-cover" />
                <div className="flex-1 min-w-0">
                  <div className="text-[10px] uppercase tracking-widest text-moss">{it.category}</div>
                  <Link href={`/product/${it.id}`} className="font-medium text-forest hover:text-olive truncate block">{it.name}</Link>
                  <div className="text-xs text-moss">{it.weight}</div>
                </div>
                <div className="flex items-center gap-1 bg-cream border border-beige rounded-full px-1.5">
                  <button onClick={() => updateQty(it.id, it.qty - 1)} className="w-7 h-7 flex items-center justify-center hover:bg-beige rounded-full"><Minus className="w-3 h-3" /></button>
                  <span className="w-7 text-center text-sm font-semibold">{it.qty}</span>
                  <button onClick={() => updateQty(it.id, it.qty + 1)} className="w-7 h-7 flex items-center justify-center hover:bg-beige rounded-full"><Plus className="w-3 h-3" /></button>
                </div>
                <div className="text-right"><div className="font-bold text-forest">₹{it.price * it.qty}</div><div className="text-xs text-moss">₹{it.price} ea</div></div>
                <button onClick={() => remove(it.id)} className="w-8 h-8 rounded-full hover:bg-beige flex items-center justify-center text-moss"><X className="w-4 h-4" /></button>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
        <aside className="bg-white border border-beige rounded-2xl p-6 h-fit sticky top-28">
          <div className="font-display text-2xl text-forest mb-5">Order Summary</div>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between"><span className="text-moss">Subtotal</span><span className="font-semibold">₹{subtotal}</span></div>
            <div className="flex justify-between"><span className="text-moss">Delivery</span><span className="font-semibold">{delivery === 0 ? <span className="text-olive">FREE</span> : `₹${delivery}`}</span></div>
            {subtotal < 999 && subtotal > 0 && <div className="text-xs text-terracotta bg-terracotta/10 rounded-lg p-2">Add ₹{999 - subtotal} more for FREE shipping!</div>}
          </div>
          <div className="h-px bg-beige my-4" />
          <div className="flex justify-between items-end mb-5"><span className="text-moss">Total</span><span className="font-display text-3xl text-forest">₹{total}</span></div>
          <Link href="/checkout" className="w-full bg-forest text-cream rounded-full py-3.5 font-semibold hover:bg-olive transition flex items-center justify-center gap-2 btn-glow">Proceed to Checkout <ArrowRight className="w-4 h-4" /></Link>
          <Link href="/shop" className="w-full text-center mt-3 block text-sm text-moss hover:text-forest">← Continue shopping</Link>
          <div className="flex items-center justify-center gap-1.5 mt-5 text-xs text-moss"><Leaf className="w-3 h-3 text-olive" /> 100% organic, freshly packed</div>
        </aside>
      </div>
    </div>
  );
}
