'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { Lock, Mail, Loader2, Shield } from 'lucide-react';
import { toast } from 'sonner';

export default function AdminLogin() {
  const router = useRouter();
  const [email, setEmail] = useState('admin@avaniorganic.com');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  useEffect(() => { fetch('/api/admin/me').then(r => r.json()).then(d => { if (d.admin) router.push('/admin'); }); }, [router]);
  const submit = async (e) => {
    e.preventDefault(); setLoading(true);
    const r = await fetch('/api/admin/login', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ email, password }) });
    const d = await r.json(); setLoading(false);
    if (d.ok) { toast.success('Admin logged in'); router.push('/admin'); }
    else toast.error(d.error || 'Invalid credentials');
  };
  return (
    <div className="min-h-[80vh] flex items-center justify-center p-4 bg-forest">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="w-full max-w-md bg-forestDark text-cream rounded-3xl shadow-2xl border border-cream/10 p-8 relative overflow-hidden">
        <div className="absolute inset-0 grain opacity-30" />
        <div className="relative">
          <div className="w-14 h-14 rounded-2xl bg-gold text-forestDark mx-auto flex items-center justify-center mb-4"><Shield className="w-7 h-7" /></div>
          <h1 className="font-display text-3xl text-center">Admin Console</h1>
          <p className="text-cream/60 text-center text-sm mt-1">Restricted access</p>
          <form onSubmit={submit} className="mt-7 space-y-4">
            <div className="relative"><Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-cream/60" /><input required type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Admin email" className="w-full pl-10 pr-4 py-3 rounded-xl bg-cream/10 border border-cream/20 placeholder:text-cream/50 focus:outline-none focus:border-gold" /></div>
            <div className="relative"><Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-cream/60" /><input required type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" className="w-full pl-10 pr-4 py-3 rounded-xl bg-cream/10 border border-cream/20 placeholder:text-cream/50 focus:outline-none focus:border-gold" /></div>
            <button disabled={loading} className="w-full bg-gold text-forestDark rounded-full py-3 font-bold hover:bg-cream transition flex items-center justify-center gap-2 disabled:opacity-60">
              {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : 'Login to Admin'}
            </button>
          </form>
          <div className="text-center text-xs text-cream/50 mt-4">Default: admin@avaniorganic.com / Avani@2025</div>
        </div>
      </motion.div>
    </div>
  );
}
