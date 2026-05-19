'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Download, Package, IndianRupee, ShoppingBag, RefreshCw, LogOut, Users, Shield } from 'lucide-react';

export default function AdminPage() {
  const router = useRouter();
  const [admin, setAdmin] = useState(null);
  const [orders, setOrders] = useState([]);
  const [users, setUsers] = useState([]);
  const [tab, setTab] = useState('orders');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      const me = await fetch('/api/admin/me').then(r => r.json());
      if (!me.admin) { router.push('/admin/login'); return; }
      setAdmin(me.admin);
      const [oRes, uRes] = await Promise.all([fetch('/api/admin/orders'), fetch('/api/admin/users')]);
      const od = await oRes.json(); const ud = await uRes.json();
      setOrders(od.orders || []); setUsers(ud.users || []);
      setLoading(false);
    })();
  }, [router]);

  const updateStatus = async (order_id, status) => {
    await fetch(`/api/admin/order/${order_id}/status`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ status }) });
    const r = await fetch('/api/admin/orders'); const d = await r.json(); setOrders(d.orders || []);
  };

  const logout = async () => { await fetch('/api/admin/logout', { method: 'POST' }); router.push('/admin/login'); };

  if (loading) return <div className="py-32 text-center text-moss">Loading...</div>;

  const totalRev = orders.reduce((s, o) => s + (o.total || 0), 0);
  const placed = orders.filter(o => o.status === 'placed').length;
  const shipped = orders.filter(o => o.status === 'shipped').length;

  return (
    <div className="container py-10">
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="flex flex-wrap items-center justify-between gap-4 mb-8">
        <div>
          <div className="flex items-center gap-2 text-xs tracking-[0.3em] uppercase text-olive"><Shield className="w-3.5 h-3.5" /> Admin Dashboard</div>
          <h1 className="font-display text-4xl text-forest">Welcome, {admin.email.split('@')[0]}</h1>
        </div>
        <div className="flex gap-2">
          <button onClick={() => location.reload()} className="flex items-center gap-2 bg-white border border-beige rounded-full px-4 py-2 hover:bg-beige/50"><RefreshCw className="w-4 h-4" /> Refresh</button>
          <a href="/api/admin/csv" className="flex items-center gap-2 bg-forest text-cream rounded-full px-4 py-2 hover:bg-olive"><Download className="w-4 h-4" /> CSV</a>
          <button onClick={logout} className="flex items-center gap-2 bg-white border border-beige rounded-full px-4 py-2 hover:bg-terracotta hover:text-cream"><LogOut className="w-4 h-4" /> Logout</button>
        </div>
      </motion.div>

      <div className="grid md:grid-cols-4 gap-4 mb-8">
        {[{ i: ShoppingBag, l: 'Total Orders', v: orders.length }, { i: IndianRupee, l: 'Revenue', v: `₹${totalRev.toLocaleString()}` }, { i: Package, l: 'New / Shipped', v: `${placed} / ${shipped}` }, { i: Users, l: 'Registered Users', v: users.length }].map((s, i) => (
          <motion.div key={i} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }} className="bg-white border border-beige rounded-2xl p-5 card-hover">
            <s.i className="w-6 h-6 text-olive" />
            <div className="text-2xl font-bold text-forest mt-3">{s.v}</div>
            <div className="text-xs text-moss">{s.l}</div>
          </motion.div>
        ))}
      </div>

      <div className="flex gap-1 mb-4 border-b border-beige">
        {[{ k: 'orders', l: `Orders (${orders.length})` }, { k: 'users', l: `Users (${users.length})` }].map(t => (
          <button key={t.k} onClick={() => setTab(t.k)} className={`px-5 py-2.5 text-sm font-semibold -mb-px ${tab === t.k ? 'text-forest border-b-2 border-forest' : 'text-moss/60 hover:text-forest'}`}>{t.l}</button>
        ))}
      </div>

      {tab === 'orders' && (
        <div className="bg-white border border-beige rounded-2xl overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-cream text-left text-xs uppercase text-moss">
              <tr><th className="p-3">Order</th><th>Customer</th><th>Items</th><th>Total</th><th>Status</th><th></th></tr>
            </thead>
            <tbody>
              {orders.length === 0 && <tr><td colSpan={6} className="p-8 text-center text-moss">No orders yet</td></tr>}
              {orders.map(o => (
                <tr key={o.order_id} className="border-t border-beige hover:bg-cream/40">
                  <td className="p-3"><div className="font-semibold text-forest">{o.order_id}</div><div className="text-xs text-moss">{new Date(o.created_at).toLocaleString()}</div></td>
                  <td><div className="font-medium">{o.name}</div><div className="text-xs text-moss">{o.phone}</div></td>
                  <td className="text-xs">{(o.items || []).length} items</td>
                  <td className="font-bold">₹{o.total}</td>
                  <td><span className={`text-xs px-2 py-1 rounded-full ${o.status === 'placed' ? 'bg-gold/20 text-warmbrown' : o.status === 'shipped' ? 'bg-olive/20 text-moss' : 'bg-olive text-cream'}`}>{o.status}</span></td>
                  <td className="p-3">
                    <select value={o.status} onChange={(e) => updateStatus(o.order_id, e.target.value)} className="text-xs rounded-full bg-cream border border-beige px-2 py-1">
                      <option value="placed">Placed</option><option value="confirmed">Confirmed</option><option value="shipped">Shipped</option><option value="delivered">Delivered</option><option value="cancelled">Cancelled</option>
                    </select>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {tab === 'users' && (
        <div className="bg-white border border-beige rounded-2xl overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-cream text-left text-xs uppercase text-moss"><tr><th className="p-3">Name</th><th>Email</th><th>Phone</th><th>Joined</th></tr></thead>
            <tbody>
              {users.length === 0 && <tr><td colSpan={4} className="p-8 text-center text-moss">No users registered yet</td></tr>}
              {users.map(u => (
                <tr key={u.user_id} className="border-t border-beige hover:bg-cream/40">
                  <td className="p-3 font-medium text-forest">{u.name}</td>
                  <td className="text-moss">{u.email}</td>
                  <td className="text-moss">{u.phone || '—'}</td>
                  <td className="text-xs text-moss">{new Date(u.created_at).toLocaleDateString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
