'use client';
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Lock, Download, Package, IndianRupee, ShoppingBag, RefreshCw } from 'lucide-react';

export default function AdminPage() {
  const [pwd, setPwd] = useState('');
  const [authed, setAuthed] = useState(false);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState('');

  const load = async (password) => {
    setLoading(true); setErr('');
    try {
      const r = await fetch(`/api/admin/orders?password=${encodeURIComponent(password)}`);
      if (r.status === 401) { setErr('Wrong password'); setAuthed(false); return; }
      const d = await r.json();
      setOrders(d.orders || []); setAuthed(true);
      sessionStorage.setItem('admin_pwd', password);
    } catch (e) { setErr('Network error'); }
    setLoading(false);
  };

  useEffect(() => {
    const saved = sessionStorage.getItem('admin_pwd');
    if (saved) { setPwd(saved); load(saved); }
  }, []);

  const updateStatus = async (order_id, status) => {
    await fetch(`/api/admin/order/${order_id}/status`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ password: pwd, status }) });
    load(pwd);
  };

  const totalRev = orders.reduce((s, o) => s + (o.total || 0), 0);
  const placed = orders.filter(o => o.status === 'placed').length;
  const shipped = orders.filter(o => o.status === 'shipped').length;

  if (!authed) return (
    <div className="container py-24 max-w-sm">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-white border border-beige rounded-2xl p-7 text-center">
        <div className="w-14 h-14 rounded-2xl bg-forest/10 text-forest mx-auto flex items-center justify-center"><Lock className="w-6 h-6" /></div>
        <h1 className="font-display text-3xl text-forest mt-4">Admin Login</h1>
        <p className="text-sm text-moss mt-2">Enter password to view orders</p>
        <form onSubmit={(e) => { e.preventDefault(); load(pwd); }} className="mt-5">
          <input type="password" value={pwd} onChange={(e) => setPwd(e.target.value)} placeholder="Password" className="w-full px-4 py-3 rounded-xl border border-beige focus:outline-none focus:border-olive bg-cream" />
          {err && <div className="text-xs text-terracotta mt-2">{err}</div>}
          <button className="w-full mt-4 bg-forest text-cream rounded-full py-3 hover:bg-olive transition">Login</button>
          <div className="text-xs text-moss mt-3">Demo password: <code className="bg-cream px-1.5 py-0.5 rounded">avani2025</code></div>
        </form>
      </motion.div>
    </div>
  );

  return (
    <div className="container py-10">
      <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
        <div>
          <div className="text-xs tracking-[0.3em] uppercase text-olive">Admin Dashboard</div>
          <h1 className="font-display text-4xl text-forest">Orders</h1>
        </div>
        <div className="flex gap-2">
          <button onClick={() => load(pwd)} className="flex items-center gap-2 bg-white border border-beige rounded-full px-4 py-2 hover:bg-beige/50"><RefreshCw className="w-4 h-4" /> Refresh</button>
          <a href={`/api/admin/csv?password=${encodeURIComponent(pwd)}`} className="flex items-center gap-2 bg-forest text-cream rounded-full px-4 py-2 hover:bg-olive"><Download className="w-4 h-4" /> Export CSV</a>
        </div>
      </div>
      <div className="grid md:grid-cols-4 gap-4 mb-8">
        {[{ i: ShoppingBag, l: 'Total Orders', v: orders.length, c: 'forest' }, { i: IndianRupee, l: 'Revenue', v: `₹${totalRev}`, c: 'olive' }, { i: Package, l: 'New', v: placed, c: 'terracotta' }, { i: Package, l: 'Shipped', v: shipped, c: 'gold' }].map((s, i) => (
          <div key={i} className="bg-white border border-beige rounded-2xl p-5">
            <s.i className="w-6 h-6 text-olive" />
            <div className="text-2xl font-bold text-forest mt-3">{s.v}</div>
            <div className="text-xs text-moss">{s.l}</div>
          </div>
        ))}
      </div>
      <div className="bg-white border border-beige rounded-2xl overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-cream text-left text-xs uppercase text-moss">
            <tr><th className="p-3">Order</th><th>Customer</th><th>Items</th><th>Total</th><th>Status</th><th></th></tr>
          </thead>
          <tbody>
            {orders.length === 0 && <tr><td colSpan={6} className="p-8 text-center text-moss">{loading ? 'Loading...' : 'No orders yet'}</td></tr>}
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
    </div>
  );
}
