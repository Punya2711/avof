'use client';
import { useState, Suspense } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { motion } from 'framer-motion';
import { Leaf, User, Mail, Phone, Lock, Loader2 } from 'lucide-react';
import { useAuth } from '@/lib/auth-context';
import { toast } from 'sonner';

function SignupInner() {
  const router = useRouter();
  const sp = useSearchParams();
  const next = sp.get('next') || '/account';
  const { refresh } = useAuth();
  const [form, setForm] = useState({ name: '', email: '', phone: '', password: '' });
  const [loading, setLoading] = useState(false);
  const upd = (k, v) => setForm(s => ({ ...s, [k]: v }));
  const submit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const r = await fetch('/api/auth/signup', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(form) });
    const d = await r.json();
    setLoading(false);
    if (d.ok) { toast.success(`Welcome to Avani, ${d.user.name}! 🌿`); await refresh(); router.push(next); }
    else toast.error(d.error || 'Signup failed');
  };
  return (
    <div className="min-h-[80vh] flex items-center justify-center p-4 bg-gradient-to-br from-cream via-beige/30 to-cream">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="w-full max-w-md bg-white rounded-3xl shadow-2xl border border-beige p-8 relative overflow-hidden">
        <div className="absolute -top-12 -left-12 w-40 h-40 bg-gold/20 rounded-full blur-3xl" />
        <div className="relative">
          <div className="w-14 h-14 rounded-2xl bg-forest text-cream mx-auto flex items-center justify-center mb-4"><Leaf className="w-7 h-7" /></div>
          <h1 className="font-display text-3xl text-forest text-center">Join Avani</h1>
          <p className="text-moss text-center text-sm mt-1">Become part of the organic family</p>
          <form onSubmit={submit} className="mt-7 space-y-3">
            <div className="relative"><User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-moss" /><input required value={form.name} onChange={(e) => upd('name', e.target.value)} placeholder="Full name" className="w-full pl-10 pr-4 py-3 rounded-xl border border-beige focus:outline-none focus:border-olive bg-cream" /></div>
            <div className="relative"><Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-moss" /><input required type="email" value={form.email} onChange={(e) => upd('email', e.target.value)} placeholder="Email" className="w-full pl-10 pr-4 py-3 rounded-xl border border-beige focus:outline-none focus:border-olive bg-cream" /></div>
            <div className="relative"><Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-moss" /><input value={form.phone} onChange={(e) => upd('phone', e.target.value)} placeholder="Phone (optional)" className="w-full pl-10 pr-4 py-3 rounded-xl border border-beige focus:outline-none focus:border-olive bg-cream" /></div>
            <div className="relative"><Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-moss" /><input required type="password" minLength={6} value={form.password} onChange={(e) => upd('password', e.target.value)} placeholder="Password (min 6 chars)" className="w-full pl-10 pr-4 py-3 rounded-xl border border-beige focus:outline-none focus:border-olive bg-cream" /></div>
            <button disabled={loading} className="w-full bg-gold text-forestDark rounded-full py-3 font-bold hover:bg-cream transition flex items-center justify-center gap-2 disabled:opacity-60 btn-glow">
              {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : 'Create account'}
            </button>
          </form>
          <div className="text-center text-sm text-moss mt-5">Already a member? <Link href={`/login${next !== '/account' ? `?next=${encodeURIComponent(next)}` : ''}`} className="text-forest font-semibold hover:text-olive">Login</Link></div>
        </div>
      </motion.div>
    </div>
  );
}
export default function Page() { return <Suspense fallback={<div className="py-20 text-center">Loading...</div>}><SignupInner /></Suspense>; }
