'use client';
import { createContext, useContext, useEffect, useState } from 'react';
import { toast } from 'sonner';

const CartCtx = createContext(null);
export function CartProvider({ children }) {
  const [items, setItems] = useState([]);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    try { const s = localStorage.getItem('avani_cart'); if (s) setItems(JSON.parse(s)); } catch {}
    setHydrated(true);
  }, []);
  useEffect(() => { if (hydrated) localStorage.setItem('avani_cart', JSON.stringify(items)); }, [items, hydrated]);

  const add = (product, qty = 1) => {
    setItems(prev => {
      const ex = prev.find(i => i.id === product.id);
      if (ex) return prev.map(i => i.id === product.id ? { ...i, qty: i.qty + qty } : i);
      return [...prev, { id: product.id, name: product.name, price: product.price, weight: product.weight, image: product.image, category: product.category, qty }];
    });
    toast.success(`${product.name} added to cart`, { description: `${qty} × ${product.weight}` });
  };
  const remove = (id) => setItems(prev => prev.filter(i => i.id !== id));
  const updateQty = (id, qty) => setItems(prev => qty <= 0 ? prev.filter(i => i.id !== id) : prev.map(i => i.id === id ? { ...i, qty } : i));
  const clear = () => setItems([]);
  const count = items.reduce((s, i) => s + i.qty, 0);
  const subtotal = items.reduce((s, i) => s + i.price * i.qty, 0);
  return <CartCtx.Provider value={{ items, add, remove, updateQty, clear, count, subtotal, hydrated }}>{children}</CartCtx.Provider>;
}
export const useCart = () => useContext(CartCtx);
