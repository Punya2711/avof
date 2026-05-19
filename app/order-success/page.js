'use client';
import { Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { CheckCircle2, Mail, Truck, Leaf } from 'lucide-react';

function Inner() {
  const sp = useSearchParams();
  const id = sp.get('id');
  return (
    <div className="container py-20 text-center max-w-xl mx-auto">
      <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: 'spring', delay: 0.1 }}
        className="w-24 h-24 rounded-full bg-olive/20 mx-auto flex items-center justify-center">
        <CheckCircle2 className="w-12 h-12 text-olive" />
      </motion.div>
      <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="font-display text-4xl md:text-5xl text-forest mt-6">Thank you!</motion.h1>
      <p className="text-moss mt-3">Your organic order has been placed. We'll share farmer stories along with it.</p>
      <div className="bg-white border border-beige rounded-2xl p-6 mt-8">
        <div className="text-xs uppercase tracking-widest text-moss">Order ID</div>
        <div className="font-display text-3xl text-forest mt-1">{id}</div>
      </div>
      <div className="grid grid-cols-3 gap-3 mt-6">
        {[{ i: Mail, t: 'Email confirmation' }, { i: Truck, t: 'Ships in 24h' }, { i: Leaf, t: 'Fresh & organic' }].map((s, i) => (
          <div key={i} className="bg-cream border border-beige rounded-2xl p-3"><s.i className="w-5 h-5 mx-auto text-olive" /><div className="text-xs text-forest mt-2 font-semibold">{s.t}</div></div>
        ))}
      </div>
      <Link href="/shop" className="inline-block mt-10 bg-forest text-cream rounded-full px-7 py-3.5 hover:bg-olive transition">Continue shopping</Link>
    </div>
  );
}
export default function Page() { return <Suspense fallback={<div className="py-20 text-center">Loading...</div>}><Inner /></Suspense>; }
