'use client';
import { Fragment, useState, useEffect, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { Download, Package, IndianRupee, ShoppingBag, RefreshCw, LogOut, Users, Shield, Search, ChevronDown, ChevronUp } from 'lucide-react';

const STATUSES = ['placed', 'confirmed', 'shipped', 'delivered', 'cancelled'];
const STATUS_STYLES = {
  placed: 'bg-gold/20 text-warmbrown',
  confirmed: 'bg-blue-100 text-blue-700',
  shipped: 'bg-olive/20 text-moss',
  delivered: 'bg-olive text-cream',
  cancelled: 'bg-terracotta/20 text-terracotta',
};

export default function AdminPage() {
  const router = useRouter();
  const [admin, setAdmin] = useState(null);
  const [orders, setOrders] = useState([]);
  const [users, setUsers] = useState([]);
  const [tab, setTab] = useState('orders');
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [expanded, setExpanded] = useState(null);

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

  const reload = async () => {
    const r = await fetch('/api/admin/orders'); const d = await r.json(); setOrders(d.orders || []);
  };

  const updateStatus = async (order_id, status) => {
    await fetch(`/api/admin/order/${order_id}/status`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ status }) });
    reload();
  };

  const logout = async () => { await fetch('/api/admin/logout', { method: 'POST' }); router.push('/admin/login'); };

  const filteredOrders = useMemo(() => {
    let list = [...orders];
    if (statusFilter !== 'all') list = list.filter(o => o.status === statusFilter);
    if (search.trim()) {
      const q = search.trim().toLowerCase();
      list = list.filter(o =>
        o.order_id?.toLowerCase().includes(q) ||
        o.name?.toLowerCase().includes(q) ||
        o.phone?.toLowerCase().includes(q) ||
        o.email?.toLowerCase().includes(q)
      );
    }
    return list;
  }, [orders, search, statusFilter]);

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
        <div className="flex gap-2 flex-wrap">
          <button onClick={() => location.reload()} className="flex items-center gap-2 bg-white border border-beige rounded-full px-4 py-2 hover:bg-beige/50"><RefreshCw className="w-4 h-4" /> Refresh</button>
          <a href="/api/admin/csv" className="flex items-center gap-2 bg-forest text-cream rounded-full px-4 py-2 hover:bg-olive"><Download className="w-4 h-4" /> CSV</a>
          <button onClick={logout} className="flex items-center gap-2 bg-white border border-beige rounded-full px-4 py-2 hover:bg-terracotta hover:text-cream"><LogOut className="w-4 h-4" /> Logout</button>
        </div>
      </motion.div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
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
        <>
          {/* Search + filters */}
          <div className="flex flex-wrap gap-3 mb-4">
            <div className="relative flex-1 min-w-[240px]">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-moss" />
              <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search by order ID, customer name, phone, or email…" className="w-full pl-10 pr-4 py-2 rounded-full border border-beige bg-white focus:outline-none focus:border-olive text-sm" />
            </div>
            <div className="flex gap-1.5 flex-wrap">
              {['all', ...STATUSES].map(s => (
                <button key={s} onClick={() => setStatusFilter(s)} className={`px-3 py-1.5 rounded-full text-xs font-semibold capitalize transition ${statusFilter === s ? 'bg-forest text-cream' : 'bg-white border border-beige text-forest hover:bg-beige/40'}`}>{s}</button>
              ))}
            </div>
          </div>

          <div className="text-xs text-moss mb-2">Showing <b className="text-forest">{filteredOrders.length}</b> of {orders.length} orders</div>

          {/* Desktop table */}
          <div className="hidden md:block bg-white border border-beige rounded-2xl overflow-hidden">
            <table className="w-full text-sm">
              <thead className="bg-cream text-left text-xs uppercase text-moss">
                <tr><th className="p-3">Order</th><th>Customer</th><th>Phone</th><th>Payment</th><th>Total</th><th>Status</th><th></th></tr>
              </thead>
              <tbody>
                {filteredOrders.length === 0 && <tr><td colSpan={7} className="p-8 text-center text-moss">No orders match these filters</td></tr>}
                {filteredOrders.map(o => {
                  const isOpen = expanded === o.order_id;
                  return (
                    <Fragment key={o.order_id}>
                      <tr className="border-t border-beige hover:bg-cream/40 cursor-pointer" onClick={() => setExpanded(isOpen ? null : o.order_id)}>
                        <td className="p-3"><div className="font-semibold text-forest">{o.order_id}</div><div className="text-xs text-moss">{new Date(o.created_at).toLocaleString('en-IN')}</div></td>
                        <td><div className="font-medium">{o.name}</div><div className="text-xs text-moss">{o.email}</div></td>
                        <td className="text-xs"><a href={`tel:${o.phone}`} onClick={(e) => e.stopPropagation()} className="text-forest hover:underline">{o.phone}</a></td>
                        <td className="text-xs"><div>{o.payment_method}</div><div className={`text-[10px] ${o.payment_status === 'paid' ? 'text-olive' : 'text-moss/60'}`}>{o.payment_status}</div></td>
                        <td className="font-bold">₹{o.total}</td>
                        <td><span className={`text-xs px-2 py-1 rounded-full font-semibold capitalize ${STATUS_STYLES[o.status] || 'bg-cream'}`}>{o.status}</span></td>
                        <td className="p-3" onClick={(e) => e.stopPropagation()}>
                          <div className="flex items-center gap-2">
                            <select value={o.status} onChange={(e) => updateStatus(o.order_id, e.target.value)} className="text-xs rounded-full bg-cream border border-beige px-2 py-1">
                              {STATUSES.map(s => <option key={s} value={s}>{s}</option>)}
                            </select>
                            {isOpen ? <ChevronUp className="w-4 h-4 text-moss" /> : <ChevronDown className="w-4 h-4 text-moss" />}
                          </div>
                        </td>
                      </tr>
                      <AnimatePresence>
                        {isOpen && (
                          <tr key={o.order_id + '-detail'} className="bg-cream/30">
                            <td colSpan={7} className="p-5 border-t border-beige">
                              <div className="grid md:grid-cols-2 gap-6 text-sm">
                                <div>
                                  <h4 className="text-xs uppercase tracking-widest text-moss mb-2">Items</h4>
                                  <div className="space-y-1.5">
                                    {(o.items || []).map((i, k) => (
                                      <div key={k} className="flex items-center gap-2">
                                        <img src={i.image} className="w-9 h-9 rounded-md object-cover border border-beige" />
                                        <div className="flex-1 min-w-0"><b className="text-forest">{i.name}</b> <span className="text-moss">({i.weight})</span> × <b>{i.qty}</b></div>
                                        <div className="font-semibold">₹{i.price * i.qty}</div>
                                      </div>
                                    ))}
                                  </div>
                                </div>
                                <div>
                                  <h4 className="text-xs uppercase tracking-widest text-moss mb-2">Delivery</h4>
                                  <div className="text-forest">{o.name}<br/>{o.address}, {o.city} — {o.pincode}<br/><span className="text-moss">{o.phone} · {o.email}</span></div>
                                  {o.notes && <div className="mt-2 italic text-moss">Note: {o.notes}</div>}
                                  {o.razorpay_payment_id && <div className="mt-2 text-xs">Razorpay Payment ID: <code className="bg-beige/40 px-1.5 py-0.5 rounded">{o.razorpay_payment_id}</code></div>}
                                </div>
                              </div>
                            </td>
                          </tr>
                        )}
                      </AnimatePresence>
                    </Fragment>
                  );
                })}
              </tbody>
            </table>
          </div>

          {/* Mobile card list */}
          <div className="md:hidden space-y-3">
            {filteredOrders.length === 0 && <div className="bg-white border border-beige rounded-2xl p-8 text-center text-moss">No orders match</div>}
            {filteredOrders.map(o => {
              const isOpen = expanded === o.order_id;
              return (
                <div key={o.order_id} className="bg-white border border-beige rounded-2xl overflow-hidden">
                  <button onClick={() => setExpanded(isOpen ? null : o.order_id)} className="w-full p-4 text-left">
                    <div className="flex justify-between items-start gap-2">
                      <div className="min-w-0">
                        <div className="font-semibold text-forest text-sm">{o.order_id}</div>
                        <div className="text-xs text-moss truncate">{o.name} · {o.phone}</div>
                        <div className="text-xs text-moss">{new Date(o.created_at).toLocaleDateString('en-IN')} · {o.payment_method}</div>
                      </div>
                      <div className="text-right shrink-0">
                        <div className="font-bold text-forest">₹{o.total}</div>
                        <span className={`text-[10px] px-2 py-0.5 rounded-full font-semibold capitalize ${STATUS_STYLES[o.status] || 'bg-cream'}`}>{o.status}</span>
                      </div>
                    </div>
                  </button>
                  {isOpen && (
                    <div className="border-t border-beige p-4 bg-cream/30 text-sm">
                      <div className="space-y-1.5 mb-3">
                        {(o.items || []).map((i, k) => <div key={k} className="flex justify-between"><span className="truncate"><b>{i.name}</b> <span className="text-moss">({i.weight})</span> × {i.qty}</span><span className="font-semibold ml-2">₹{i.price * i.qty}</span></div>)}
                      </div>
                      <div className="text-forest text-xs"><b>Delivery:</b> {o.address}, {o.city} — {o.pincode}</div>
                      <select value={o.status} onChange={(e) => updateStatus(o.order_id, e.target.value)} className="mt-3 w-full text-xs rounded-full bg-white border border-beige px-3 py-2">
                        {STATUSES.map(s => <option key={s} value={s}>{s}</option>)}
                      </select>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </>
      )}

      {tab === 'users' && (
        <div className="bg-white border border-beige rounded-2xl overflow-x-auto">
          <table className="w-full text-sm min-w-[600px]">
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
