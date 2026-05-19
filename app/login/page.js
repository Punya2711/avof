'use client';
import { useState } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { Suspense } from 'react';
import { motion } from 'framer-motion';
import { Leaf, Mail, Lock, Loader2 } from 'lucide-react';
import { useAuth } from '@/lib/auth-context';
import { toast } from 'sonner';

function LoginInner() {
  const router = useRouter();
  const sp = useSearchParams();
  const next = sp.get('next') || '/account';
  const { refresh } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const submit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const r = await fetch('/api/auth/login', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ email, password }) });
    const d = await r.json();
    setLoading(false);
    if (d.ok) { toast.success(`Welcome back, ${d.user.name}!`); await refresh(); router.push(next); }
    else toast.error(d.error || 'Login failed');
  };
  return (
    <div className="min-h-[80vh] flex items-center justify-center p-4 bg-gradient-to-br from-cream via-beige/30 to-cream">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="w-full max-w-md bg-white rounded-3xl shadow-2xl border border-beige p-8 relative overflow-hidden">
        <div className="absolute -top-12 -right-12 w-40 h-40 bg-olive/20 rounded-full blur-3xl" />
        <div className="relative">
          <div className="w-14 h-14 rounded-2xl bg-forest text-cream mx-auto flex items-center justify-center mb-4"><Leaf className="w-7 h-7" /></div>
          <h1 className="font-display text-3xl text-forest text-center">Welcome back</h1>
          <p className="text-moss text-center text-sm mt-1">Login to continue your organic journey</p>
          <form onSubmit={submit} className="mt-7 space-y-4">
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-moss" />
              <input required type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" className="w-full pl-10 pr-4 py-3 rounded-xl border border-beige focus:outline-none focus:border-olive bg-cream" />
            </div>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-moss" />
              <input required type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" className="w-full pl-10 pr-4 py-3 rounded-xl border border-beige focus:outline-none focus:border-olive bg-cream" />
            </div>
            <button disabled={loading} className="w-full bg-forest text-cream rounded-full py-3 font-semibold hover:bg-olive transition flex items-center justify-center gap-2 disabled:opacity-60 btn-glow">
              {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : 'Login'}
            </button>
          </form>
          <div className="text-center text-sm text-moss mt-6">New here? <Link href={`/signup${next !== '/account' ? `?next=${encodeURIComponent(next)}` : ''}`} className="text-forest font-semibold hover:text-olive">Create an account</Link></div>
        </div>
      </motion.div>
    </div>
  );
}
export default function Page() { return <Suspense fallback={<div className="py-20 text-center">Loading...</div>}><LoginInner /></Suspense>; }
