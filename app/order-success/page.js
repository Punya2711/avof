'use client';
import { Suspense, useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { CheckCircle2, Mail, Truck, Leaf, Package, ShoppingBag } from 'lucide-react';

function Inner() {
  const sp = useSearchParams();
  const id = sp.get('id');
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    if (!id) { setLoading(false); return; }
    fetch(`/api/order/${id}`).then(r => r.json()).then(d => { setOrder(d.order || null); setLoading(false); });
  }, [id]);

  return (
    <div className="container py-12 max-w-3xl mx-auto">
      <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: 'spring', delay: 0.1 }} className="w-24 h-24 rounded-full bg-olive/20 mx-auto flex items-center justify-center">
        <CheckCircle2 className="w-12 h-12 text-olive" />
      </motion.div>
      <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="font-display text-4xl md:text-5xl text-forest mt-6 text-center">Thank you!</motion.h1>
      <p className="text-moss mt-3 text-center">Your organic order has been placed. We&apos;ll share farmer stories along with it.</p>

      {loading ? <div className="mt-8 text-center text-moss">Loading order...</div> : !order ? (
        <div className="bg-white border border-beige rounded-2xl p-6 mt-8 text-center">
          <div className="text-xs uppercase tracking-widest text-moss">Order ID</div>
          <div className="font-display text-3xl text-forest mt-1">{id}</div>
        </div>
      ) : (
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }} className="bg-white border border-beige rounded-2xl p-6 mt-8">
          <div className="grid sm:grid-cols-2 gap-4 pb-4 border-b border-beige">
            <div>
              <div className="text-xs uppercase tracking-widest text-moss">Order ID</div>
              <div className="font-display text-2xl text-forest">{order.order_id}</div>
            </div>
            <div className="sm:text-right">
              <div className="text-xs uppercase tracking-widest text-moss">Order date</div>
              <div className="font-semibold text-forest">{new Date(order.created_at).toLocaleString('en-IN')}</div>
            </div>
            <div>
              <div className="text-xs uppercase tracking-widest text-moss">Customer</div>
              <div className="font-semibold text-forest">{order.name}</div>
            </div>
            <div className="sm:text-right">
              <div className="text-xs uppercase tracking-widest text-moss">Payment</div>
              <div className="font-semibold text-forest">{order.payment_method} {order.payment_status === 'paid' && <span className="text-olive">✓ Paid</span>}</div>
            </div>
          </div>

          <h3 className="font-display text-xl text-forest mt-5 mb-3">Items ({(order.items || []).length})</h3>
          <div className="space-y-3">
            {(order.items || []).map((i, k) => (
              <div key={k} className="flex gap-3 items-center">
                <img src={i.image} className="w-14 h-14 rounded-xl object-cover border border-beige" />
                <div className="flex-1 min-w-0">
                  <div className="font-medium text-forest truncate">{i.name}</div>
                  <div className="text-xs text-moss">{i.weight} × {i.qty} · ₹{i.price} each</div>
                </div>
                <div className="font-bold text-forest">₹{i.price * i.qty}</div>
              </div>
            ))}
          </div>

          <div className="mt-5 pt-4 border-t border-beige space-y-1 text-sm">
            <div className="flex justify-between"><span className="text-moss">Subtotal</span><span>₹{order.subtotal}</span></div>
            <div className="flex justify-between"><span className="text-moss">Delivery</span><span>{order.delivery === 0 ? <span className="text-olive">FREE</span> : `₹${order.delivery}`}</span></div>
            <div className="flex justify-between items-end pt-2 mt-2 border-t border-beige">
              <span className="text-moss">Total paid</span>
              <span className="font-display text-3xl text-forest">₹{order.total}</span>
            </div>
          </div>

          <h3 className="font-display text-xl text-forest mt-6 mb-2">Delivery address</h3>
          <div className="text-sm text-moss leading-relaxed">
            {order.name}<br />
            {order.address}, {order.city} — {order.pincode}<br />
            {order.phone} {order.email && <>· {order.email}</>}
            {order.notes && <div className="mt-2 italic">Note: {order.notes}</div>}
          </div>
        </motion.div>
      )}

      <div className="grid grid-cols-3 gap-3 mt-6">
        {[{ i: Mail, t: 'Email confirmation sent' }, { i: Truck, t: 'Ships in 24-48h' }, { i: Leaf, t: 'Fresh & organic' }].map((s, i) => (
          <div key={i} className="bg-cream border border-beige rounded-2xl p-3 text-center"><s.i className="w-5 h-5 mx-auto text-olive" /><div className="text-xs text-forest mt-2 font-semibold">{s.t}</div></div>
        ))}
      </div>

      <div className="mt-8 flex flex-wrap gap-3 justify-center">
        <Link href="/shop" className="inline-flex items-center gap-2 bg-forest text-cream rounded-full px-7 py-3.5 hover:bg-olive transition btn-glow"><ShoppingBag className="w-4 h-4" /> Continue shopping</Link>
        <Link href="/account" className="inline-flex items-center gap-2 bg-gold text-forestDark rounded-full px-7 py-3.5 font-semibold hover:bg-cream transition"><Package className="w-4 h-4" /> View my orders</Link>
      </div>
    </div>
  );
}
export default function Page() { return <Suspense fallback={<div className="py-20 text-center">Loading...</div>}><Inner /></Suspense>; }
