'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Script from 'next/script';
import { motion } from 'framer-motion';
import { Lock, ChevronRight, Loader2 } from 'lucide-react';
import { useCart } from '@/lib/cart-context';
import { useAuth } from '@/lib/auth-context';
import { toast } from 'sonner';

export default function CheckoutPage() {
  const { items, subtotal, clear, hydrated } = useCart();
  const { user } = useAuth();
  const router = useRouter();
  const delivery = subtotal > 999 ? 0 : 60;
  const total = subtotal + delivery;
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({ name: '', phone: '', email: '', address: '', city: '', pincode: '', notes: '', payment_method: 'COD' });
  const upd = (k, v) => setForm(s => ({ ...s, [k]: v }));

  useEffect(() => {
    if (user) setForm(s => ({ ...s, name: s.name || user.name, email: s.email || user.email, phone: s.phone || user.phone || '' }));
  }, [user]);

  const validate = () => {
    const errors = [];
    if (!form.name || form.name.trim().length < 2) errors.push('Please enter your full name');
    if (!/^[6-9]\d{9}$/.test(form.phone.replace(/\s/g, ''))) errors.push('Enter a valid 10-digit Indian phone number');
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) errors.push('Enter a valid email address');
    if (!form.address || form.address.trim().length < 10) errors.push('Address must be at least 10 characters');
    if (!form.city || form.city.trim().length < 2) errors.push('Please enter your city');
    if (!/^\d{6}$/.test(form.pincode)) errors.push('Pincode must be exactly 6 digits');
    return errors;
  };

  const submit = async (e) => {
    e.preventDefault();
    if (items.length === 0) { toast.error('Your cart is empty'); return; }
    const errors = validate();
    if (errors.length) { errors.forEach(err => toast.error(err)); return; }
    if (loading) return; // prevent double submit
    setLoading(true);
    try {
      if (form.payment_method === 'RAZORPAY') {
        // 1) Create razorpay order on server
        const r = await fetch('/api/razorpay/order', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ amount: total, receipt: 'avn_' + Date.now() }) });
        const d = await r.json();
        if (!d.ok) { toast.error(d.error || 'Payment setup failed'); setLoading(false); return; }
        // 2) Open Razorpay checkout
        const options = {
          key: d.key_id, amount: d.amount, currency: d.currency, order_id: d.order_id,
          name: 'Avani Organics', description: `Order from ${form.name || 'Avani customer'}`,
          image: '/leaf-icon.png',
          prefill: { name: form.name, email: form.email, contact: form.phone },
          notes: { address: `${form.address}, ${form.city} - ${form.pincode}` },
          theme: { color: '#1f3a2b' },
          handler: async (resp) => {
            // 3) Verify signature on server and persist order
            const v = await fetch('/api/razorpay/verify', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({
              razorpay_order_id: resp.razorpay_order_id,
              razorpay_payment_id: resp.razorpay_payment_id,
              razorpay_signature: resp.razorpay_signature,
              order_payload: { ...form, items, subtotal, delivery, total },
            }) });
            const vd = await v.json();
            if (vd.ok) { clear(); router.push(`/order-success?id=${vd.order_id}`); }
            else toast.error('Payment verification failed');
            setLoading(false);
          },
          modal: { ondismiss: () => { toast.info('Payment cancelled'); setLoading(false); } },
        };
        const rzp = new window.Razorpay(options);
        rzp.on('payment.failed', (resp) => { toast.error('Payment failed: ' + (resp.error?.description || '')); setLoading(false); });
        rzp.open();
        return;
      }
      // COD flow (existing)
      const res = await fetch('/api/orders', {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, items, subtotal, delivery, total }),
      });
      const data = await res.json();
      if (data.ok) { clear(); router.push(`/order-success?id=${data.order_id}`); }
      else toast.error(data.error || 'Failed to place order');
    } catch (err) { toast.error('Network error'); console.error(err); } finally { setLoading(false); }
  };

  if (!hydrated) return <div className="py-32 text-center text-moss">Loading...</div>;
  if (items.length === 0) return (
    <div className="container py-32 text-center"><h1 className="font-display text-3xl text-forest">Your cart is empty</h1><Link href="/shop" className="inline-block mt-6 text-olive underline">Browse shop</Link></div>
  );

  return (
    <div className="container py-12">
      <h1 className="font-display text-4xl md:text-5xl text-forest">Checkout</h1>
      <form onSubmit={submit} className="grid lg:grid-cols-[1fr_380px] gap-8 mt-8">
        <div className="space-y-6">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-white border border-beige rounded-2xl p-6">
            <div className="font-display text-2xl text-forest mb-5">1. Delivery Details</div>
            <div className="grid md:grid-cols-2 gap-4">
              {[
                ['name', 'Full Name *', 'text', true],
                ['phone', 'Phone *', 'tel', true],
                ['email', 'Email *', 'email', true],
                ['pincode', 'Pincode *', 'text', true],
              ].map(([k, l, t, req]) => (
                <div key={k}>
                  <label className="text-xs text-moss uppercase tracking-wider">{l}</label>
                  <input value={form[k]} onChange={(e) => upd(k, e.target.value)} required={req} type={t} className="w-full mt-1 px-4 py-2.5 rounded-xl border border-beige focus:outline-none focus:border-olive bg-cream" />
                </div>
              ))}
              <div className="md:col-span-2">
                <label className="text-xs text-moss uppercase tracking-wider">Address *</label>
                <textarea value={form.address} onChange={(e) => upd('address', e.target.value)} required rows={2} className="w-full mt-1 px-4 py-2.5 rounded-xl border border-beige focus:outline-none focus:border-olive bg-cream" />
              </div>
              <div>
                <label className="text-xs text-moss uppercase tracking-wider">City *</label>
                <input value={form.city} onChange={(e) => upd('city', e.target.value)} required className="w-full mt-1 px-4 py-2.5 rounded-xl border border-beige focus:outline-none focus:border-olive bg-cream" />
              </div>
              <div>
                <label className="text-xs text-moss uppercase tracking-wider">Delivery Notes</label>
                <input value={form.notes} onChange={(e) => upd('notes', e.target.value)} placeholder="Optional" className="w-full mt-1 px-4 py-2.5 rounded-xl border border-beige focus:outline-none focus:border-olive bg-cream" />
              </div>
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="bg-white border border-beige rounded-2xl p-6">
            <div className="font-display text-2xl text-forest mb-5">2. Payment Method</div>
            <div className="grid md:grid-cols-2 gap-3">
              {[{ k: 'COD', l: 'Cash on Delivery', d: 'Pay when you receive' }, { k: 'RAZORPAY', l: 'UPI / Card / Netbanking', d: 'Secure Razorpay payment — instant confirmation' }].map(m => (
                <label key={m.k} className={`block cursor-pointer rounded-xl border-2 p-4 transition ${form.payment_method === m.k ? 'border-forest bg-cream' : 'border-beige hover:border-olive'}`}>
                  <input type="radio" name="pm" checked={form.payment_method === m.k} onChange={() => upd('payment_method', m.k)} className="sr-only" />
                  <div className="font-semibold text-forest">{m.l}</div>
                  <div className="text-xs text-moss mt-0.5">{m.d}</div>
                </label>
              ))}
            </div>
            <div className="flex items-center gap-2 text-xs text-moss mt-4"><Lock className="w-3 h-3" /> Your payment info is secured & encrypted</div>
          </motion.div>
        </div>
        <aside className="bg-white border border-beige rounded-2xl p-6 h-fit sticky top-28">
          <div className="font-display text-2xl text-forest mb-5">Order Summary</div>
          <div className="space-y-2 max-h-64 overflow-y-auto pr-1">
            {items.map(i => (
              <div key={i.id} className="flex gap-3 text-sm">
                <img src={i.image} className="w-12 h-12 rounded-lg object-cover" />
                <div className="flex-1"><div className="font-medium text-forest line-clamp-1">{i.name}</div><div className="text-xs text-moss">{i.weight} × {i.qty}</div></div>
                <div className="font-semibold">₹{i.price * i.qty}</div>
              </div>
            ))}
          </div>
          <div className="h-px bg-beige my-4" />
          <div className="space-y-2 text-sm">
            <div className="flex justify-between"><span className="text-moss">Subtotal</span><span>₹{subtotal}</span></div>
            <div className="flex justify-between"><span className="text-moss">Delivery</span><span>{delivery === 0 ? <span className="text-olive">FREE</span> : `₹${delivery}`}</span></div>
          </div>
          <div className="h-px bg-beige my-4" />
          <div className="flex justify-between items-end mb-5"><span className="text-moss">Total</span><span className="font-display text-3xl text-forest">₹{total}</span></div>
          <button disabled={loading} className="w-full bg-gold text-forestDark font-bold rounded-full py-3.5 hover:bg-cream transition flex items-center justify-center gap-2 btn-glow disabled:opacity-60">
            {loading ? <><Loader2 className="w-4 h-4 animate-spin" /> Placing order...</> : <>Place Order <ChevronRight className="w-4 h-4" /></>}
          </button>
        </aside>
      </form>
    </div>
  );
}
