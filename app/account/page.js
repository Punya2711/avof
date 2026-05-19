'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { User, LogOut, Package, Mail, Phone, MapPin } from 'lucide-react';
import { useAuth } from '@/lib/auth-context';

export default function Account() {
  const { user, loading, logout } = useAuth();
  const router = useRouter();
  const [orders, setOrders] = useState([]);

  useEffect(() => { if (!loading && !user) router.push('/login?next=/account'); }, [loading, user, router]);
  useEffect(() => {
    if (user) fetch('/api/auth/orders').then(r => r.json()).then(d => setOrders(d.orders || []));
  }, [user]);

  if (loading || !user) return <div className="py-32 text-center text-moss">Loading...</div>;
  return (
    <div className="container py-12">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="grid lg:grid-cols-[320px_1fr] gap-8">
        <aside className="bg-white border border-beige rounded-2xl p-6 h-fit sticky top-28">
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
            {orders.map(o => (
              <motion.div key={o.order_id} initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="bg-white border border-beige rounded-2xl p-5">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div><div className="font-display text-xl text-forest">{o.order_id}</div><div className="text-xs text-moss">{new Date(o.created_at).toLocaleString()}</div></div>
                  <span className={`text-xs px-3 py-1 rounded-full font-semibold ${o.status === 'placed' ? 'bg-gold/20 text-warmbrown' : o.status === 'shipped' ? 'bg-olive/20 text-moss' : o.status === 'delivered' ? 'bg-olive text-cream' : 'bg-cream'}`}>{o.status}</span>
                </div>
                <div className="mt-3 flex flex-wrap gap-2">
                  {(o.items || []).slice(0, 6).map((i, k) => <img key={k} src={i.image} className="w-12 h-12 rounded-lg object-cover border border-beige" />)}
                </div>
                <div className="flex justify-between items-end mt-3">
                  <div className="text-xs text-moss">{(o.items || []).length} items • {o.payment_method}</div>
                  <div className="font-display text-2xl text-forest">₹{o.total}</div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>
    </div>
  );
}
