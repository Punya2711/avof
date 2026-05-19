'use client';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingCart, Search, Menu, X, Leaf, User, MapPin, LogOut, Package } from 'lucide-react';
import { useCart } from '@/lib/cart-context';
import { useAuth } from '@/lib/auth-context';

const LINKS = [
  { href: '/', label: 'Home' },
  { href: '/shop', label: 'Shop' },
  { href: '/shop?category=Traditional+Rice', label: 'Categories' },
  { href: '/about', label: 'About' },
  { href: '/#why', label: 'Why Avani' },
  { href: '/#contact', label: 'Contact' },
];

export default function Navbar() {
  const { count } = useCart();
  const { user, logout } = useAuth();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [userMenu, setUserMenu] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    onScroll(); window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);
  return (
    <>
      <div className="bg-forest text-cream text-xs py-2 px-4 text-center relative overflow-hidden">
        <div className="flex items-center justify-center gap-2 animate-pulse">
          <Leaf className="w-3 h-3" />
          <span>Free delivery on orders above ₹999 • 100% Organic • Direct from Karnataka farmers</span>
        </div>
      </div>
      <motion.header
        initial={{ y: -80 }} animate={{ y: 0 }}
        className={`sticky top-0 z-50 transition-all duration-500 ${scrolled ? 'glass shadow-lg py-2' : 'bg-cream py-4'}`}
      >
        <div className="container flex items-center justify-between gap-6">
          <Link href="/" className="flex items-center gap-2 group">
            <motion.div whileHover={{ rotate: 15, scale: 1.1 }} className="w-10 h-10 rounded-full bg-forest text-cream flex items-center justify-center">
              <Leaf className="w-5 h-5" />
            </motion.div>
            <div className="leading-none">
              <div className="font-display text-2xl font-bold text-forest tracking-tight">Avani</div>
              <div className="text-[10px] tracking-[0.3em] text-moss uppercase">Organics</div>
            </div>
          </Link>
          <nav className="hidden lg:flex items-center gap-7">
            {LINKS.map(l => (
              <Link key={l.label} href={l.href} className="relative text-sm font-medium text-forest/80 hover:text-forest transition group">
                {l.label}
                <span className="absolute -bottom-1 left-0 w-0 h-[2px] bg-olive group-hover:w-full transition-all duration-300" />
              </Link>
            ))}
          </nav>
          <div className="flex items-center gap-3">
            <button className="hidden md:flex items-center gap-1 text-xs text-forest/70 hover:text-forest">
              <MapPin className="w-4 h-4" /> <span>Hassan</span>
            </button>
            <button className="w-9 h-9 rounded-full hover:bg-beige/60 flex items-center justify-center transition"><Search className="w-4 h-4" /></button>
            <Link href="/cart" className="relative w-9 h-9 rounded-full hover:bg-beige/60 flex items-center justify-center transition">
              <ShoppingCart className="w-4 h-4" />
              {count > 0 && <motion.span initial={{ scale: 0 }} animate={{ scale: 1 }} className="absolute -top-1 -right-1 bg-terracotta text-cream text-[10px] font-bold rounded-full w-5 h-5 flex items-center justify-center">{count}</motion.span>}
            </Link>
            <div className="hidden md:block relative">
              {user ? (
                <>
                  <button onClick={() => setUserMenu(v => !v)} className="flex items-center gap-2 pl-1 pr-3 py-1 rounded-full hover:bg-beige/60 transition">
                    <span className="w-7 h-7 rounded-full bg-forest text-cream flex items-center justify-center text-xs font-bold">{user.name[0]?.toUpperCase()}</span>
                    <span className="text-xs font-medium text-forest hidden lg:block">{user.name.split(' ')[0]}</span>
                  </button>
                  <AnimatePresence>
                    {userMenu && (
                      <motion.div initial={{ opacity: 0, y: -5 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -5 }}
                        className="absolute right-0 top-full mt-2 w-56 bg-white border border-beige rounded-2xl shadow-xl p-2 z-50">
                        <div className="px-3 py-2 border-b border-beige mb-1">
                          <div className="font-semibold text-forest text-sm">{user.name}</div>
                          <div className="text-xs text-moss truncate">{user.email}</div>
                        </div>
                        <Link href="/account" onClick={() => setUserMenu(false)} className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-beige/60 text-sm text-forest"><Package className="w-4 h-4" /> My orders</Link>
                        <button onClick={async () => { setUserMenu(false); await logout(); }} className="w-full flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-terracotta/10 text-sm text-terracotta"><LogOut className="w-4 h-4" /> Logout</button>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </>
              ) : (
                <Link href="/login" className="text-xs font-semibold text-forest border border-forest/40 rounded-full px-3.5 py-1.5 hover:bg-forest hover:text-cream transition">Login</Link>
              )}
            </div>
            <button onClick={() => setOpen(true)} className="lg:hidden w-9 h-9 rounded-full hover:bg-beige/60 flex items-center justify-center"><Menu className="w-5 h-5" /></button>
          </div>
        </div>
      </motion.header>
      <AnimatePresence>
        {open && (
          <motion.div initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }} transition={{ type: 'tween' }} className="fixed inset-0 z-[60] bg-forest text-cream p-8">
            <button onClick={() => setOpen(false)} className="absolute top-6 right-6"><X className="w-6 h-6" /></button>
            <div className="mt-16 flex flex-col gap-6">
              {LINKS.map(l => (
                <Link key={l.label} href={l.href} onClick={() => setOpen(false)} className="font-display text-3xl hover:text-gold transition">{l.label}</Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
