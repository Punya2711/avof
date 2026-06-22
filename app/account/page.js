'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { LogOut, Package, Mail, Phone, ChevronDown, ChevronUp } from 'lucide-react';
import { useAuth } from '@/lib/auth-context';

const STATUS_STYLES = {
  placed: 'bg-gold/20 text-warmbrown',
  confirmed: 'bg-blue-100 text-blue-700',
  shipped: 'bg-olive/20 text-moss',
  delivered: 'bg-olive text-cream',
  cancelled: 'bg-terracotta/20 text-terracotta',
};

export default function Account() {
  const { user, loading, logout } = useAuth();
  const router = useRouter();
  const [orders, setOrders] = useState([]);
  const [expanded, setExpanded] = useState(null);

  useEffect(() => { if (!loading && !user) router.push('/login?next=/account'); }, [loading, user, router]);
  useEffect(() => {
    if (user) fetch('/api/auth/orders').then(r => r.json()).then(d => setOrders(d.orders || []));
  }, [user]);

  if (loading || !user) return <div className="py-32 text-center text-moss">Loading...</div>;
  return (
    <div className="container py-12">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="grid lg:grid-cols-[320px_1fr] gap-8">
        <aside className="bg-white border border-beige rounded-2xl p-6 h-fit lg:sticky lg:top-28">
          <div className="w-20 h-20 rounded-full bg-forest text-cream mx-auto flex items-center justify-center text-3xl font-display">{user.name[0]?.toUpperCase()}</div>
          <h2 className="font-display text-2xl text-forest text-center mt-3">{user.name}</h2>
          <div className="text-sm text-moss text-center break-all">{user.email}</div>
          <div className="mt-5 space-y-2 text-sm text-moss">
            <div className="flex items-center gap-2"><Mail className="w-3.5 h-3.5" /> {user.email}</div>
            {user.phone && <div className="flex items-center gap-2"><Phone className="w-3.5 h-3.5" /> {user.phone}</div>}
          </div>
          <button onClick={async () => { await logout(); router.push('/'); }} className="mt-5 w-full flex items-center justify-center gap-2 border border-beige rounded-full py-2.5 text-sm text-forest hover:bg-beige/40"><LogOut className="w-4 h-4" /> Logout</button>
        </aside>
        <div>
          <h1 className="font-display text-4xl text-forest">My Orders <span className="text-moss text-xl">({orders.length})</span></h1>
          <p className="text-moss mt-1">Track your past organic deliveries</p>
          <div className="mt-6 space-y-3">
            {orders.length === 0 && <div className="bg-white border border-beige rounded-2xl p-10 text-center"><Package className="w-10 h-10 mx-auto text-olive mb-3" /><div className="text-forest font-semibold">No orders yet</div><Link href="/shop" className="inline-block mt-3 text-olive underline">Start shopping →</Link></div>}
            {orders.map(o => {
              const isOpen = expanded === o.order_id;
              return (
                <motion.div key={o.order_id} initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="bg-white border border-beige rounded-2xl overflow-hidden">
                  <button onClick={() => setExpanded(isOpen ? null : o.order_id)} className="w-full p-5 text-left hover:bg-cream/40 transition">
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <div>
                        <div className="font-display text-xl text-forest">{o.order_id}</div>
                        <div className="text-xs text-moss">{new Date(o.created_at).toLocaleString('en-IN')}</div>
                      </div>
                      <span className={`text-xs px-3 py-1 rounded-full font-semibold ${STATUS_STYLES[o.status] || 'bg-cream'}`}>{o.status}</span>
                    </div>
                    <div className="mt-3 flex flex-wrap items-center gap-2">
                      {(o.items || []).slice(0, 6).map((i, k) => <img key={k} src={i.image} className="w-12 h-12 rounded-lg object-cover border border-beige" />)}
                      <div className="ml-auto text-right">
                        <div className="text-xs text-moss">{(o.items || []).length} items · {o.payment_method}</div>
                        <div className="font-display text-2xl text-forest">₹{o.total}</div>
                      </div>
                    </div>
                    <div className="mt-2 text-xs text-olive flex items-center gap-1">{isOpen ? <><ChevronUp className="w-3 h-3" /> Hide details</> : <><ChevronDown className="w-3 h-3" /> Show details</>}</div>
                  </button>
                  <AnimatePresence>
                    {isOpen && (
                      <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="border-t border-beige px-5 py-4 bg-cream/30">
                        <h4 className="text-xs uppercase tracking-widest text-moss mb-2">Items</h4>
                        <div className="space-y-2">
                          {(o.items || []).map((i, k) => (
                            <div key={k} className="flex gap-3 items-center text-sm">
                              <img src={i.image} className="w-10 h-10 rounded-lg object-cover" />
                              <div className="flex-1 min-w-0"><div className="font-medium text-forest truncate">{i.name}</div><div className="text-xs text-moss">{i.weight} × {i.qty}</div></div>
                              <div className="font-semibold">₹{i.price * i.qty}</div>
                            </div>
                          ))}
                        </div>
                        <h4 className="text-xs uppercase tracking-widest text-moss mt-4 mb-1">Delivery</h4>
                        <div className="text-sm text-forest">{o.address}, {o.city} — {o.pincode}<br/><span className="text-moss">{o.phone}</span></div>
                        <div className="mt-3 pt-3 border-t border-beige flex justify-between text-sm">
                          <span className="text-moss">Subtotal · Delivery</span>
                          <span>₹{o.subtotal} · {o.delivery === 0 ? 'FREE' : `₹${o.delivery}`}</span>
                        </div>
                        <div className="flex justify-between text-base font-semibold mt-1"><span>Total</span><span className="text-forest">₹{o.total}</span></div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              );
            })}
          </div>
        </div>
      </motion.div>
    </div>
  );
}
