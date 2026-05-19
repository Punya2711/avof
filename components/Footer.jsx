'use client';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Leaf, MapPin, Phone, Mail, Facebook, Instagram, Twitter, Youtube, Send } from 'lucide-react';
import { useState } from 'react';
import { toast } from 'sonner';

export default function Footer() {
  const [email, setEmail] = useState('');
  const submit = async (e) => {
    e.preventDefault();
    if (!email) return;
    await fetch('/api/newsletter', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ email }) });
    toast.success('Thanks for subscribing! 🌿');
    setEmail('');
  };
  return (
    <footer id="contact" className="bg-forestDark text-cream relative overflow-hidden">
      <div className="absolute inset-0 grain opacity-30 pointer-events-none" />
      <div className="absolute -top-10 -left-10 w-72 h-72 bg-olive/20 rounded-full blur-3xl" />
      <div className="absolute -bottom-10 -right-10 w-96 h-96 bg-gold/10 rounded-full blur-3xl" />

      <div className="relative container py-16">
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-12">
          <h3 className="font-display text-4xl md:text-5xl mb-3">Join the Organic Revolution</h3>
          <p className="text-cream/70 mb-6 max-w-xl mx-auto">Get farm stories, recipes & 10% off your first order.</p>
          <form onSubmit={submit} className="flex max-w-md mx-auto gap-2">
            <input value={email} onChange={(e) => setEmail(e.target.value)} required type="email" placeholder="your@email.com" className="flex-1 rounded-full bg-cream/10 border border-cream/20 px-5 py-3 placeholder:text-cream/50 focus:outline-none focus:border-gold" />
            <button type="submit" className="rounded-full bg-gold text-forestDark font-semibold px-6 py-3 hover:bg-cream transition flex items-center gap-2"><Send className="w-4 h-4" /> Subscribe</button>
          </form>
        </motion.div>
        <div className="h-px bg-cream/10 mb-12" />
        <div className="grid md:grid-cols-4 gap-10">
          <div>
            <Link href="/" className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 rounded-full bg-cream text-forest flex items-center justify-center"><Leaf className="w-5 h-5" /></div>
              <div><div className="font-display text-2xl">Avani</div><div className="text-[10px] tracking-[0.3em] uppercase text-cream/70">Organics</div></div>
            </Link>
            <p className="text-sm text-cream/70 leading-relaxed">BHOOMI works with 11,000+ farmers across Karnataka, growing food grains organically. AVANI brings them straight to you — pure, traceable, and earth-friendly.</p>
          </div>
          <div>
            <div className="font-display text-xl mb-4 text-gold">Quick Links</div>
            <ul className="space-y-2 text-sm text-cream/80">
              <li><Link href="/" className="hover:text-gold">Home</Link></li>
              <li><Link href="/shop" className="hover:text-gold">Shop All</Link></li>
              <li><Link href="/about" className="hover:text-gold">About Us</Link></li>
              <li><Link href="/cart" className="hover:text-gold">Cart</Link></li>
              <li><Link href="/admin" className="hover:text-gold">Admin</Link></li>
            </ul>
          </div>
          <div>
            <div className="font-display text-xl mb-4 text-gold">Categories</div>
            <ul className="space-y-2 text-sm text-cream/80">
              <li><Link href="/shop?category=Traditional+Rice" className="hover:text-gold">Traditional Rice</Link></li>
              <li><Link href="/shop?category=Millets" className="hover:text-gold">Millets</Link></li>
              <li><Link href="/shop?category=Pulses" className="hover:text-gold">Pulses</Link></li>
              <li><Link href="/shop?category=Oils+%26+Oil+Seeds" className="hover:text-gold">Cold-Pressed Oils</Link></li>
              <li><Link href="/shop?category=Super+Foods" className="hover:text-gold">Super Foods</Link></li>
            </ul>
          </div>
          <div>
            <div className="font-display text-xl mb-4 text-gold">Get in Touch</div>
            <ul className="space-y-3 text-sm text-cream/80">
              <li className="flex gap-2"><MapPin className="w-4 h-4 flex-shrink-0 mt-0.5 text-gold" /> R C Road, Hassan — 573 201, Karnataka, India</li>
              <li className="flex gap-2"><Phone className="w-4 h-4 flex-shrink-0 mt-0.5 text-gold" /> +91 70 22 299 700 / 701</li>
              <li className="flex gap-2"><Phone className="w-4 h-4 flex-shrink-0 mt-0.5 text-gold" /> 08172 266565</li>
              <li className="flex gap-2"><Mail className="w-4 h-4 flex-shrink-0 mt-0.5 text-gold" /> info@avaniorganic.com</li>
            </ul>
            <div className="flex gap-3 mt-5">
              {[Facebook, Instagram, Twitter, Youtube].map((Icon, i) => (
                <a key={i} href="#" className="w-9 h-9 rounded-full border border-cream/20 flex items-center justify-center hover:bg-gold hover:text-forestDark transition"><Icon className="w-4 h-4" /></a>
              ))}
            </div>
          </div>
        </div>
        <div className="h-px bg-cream/10 mt-12 mb-6" />
        <div className="flex flex-col md:flex-row justify-between gap-3 text-xs text-cream/60">
          <div>© 2026 Avani Organics • BHOOMI Sustainable Development Society. All rights reserved.</div>
          <div className="flex gap-5"><a href="#">Privacy Policy</a><a href="#">Terms</a><a href="#">Shipping</a></div>
        </div>
      </div>
    </footer>
  );
}
