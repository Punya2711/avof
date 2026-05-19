'use client';
import { createContext, useContext, useEffect, useState, useCallback } from 'react';

const AuthCtx = createContext(null);
export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const refresh = useCallback(async () => {
    try { const r = await fetch('/api/auth/me'); const d = await r.json(); setUser(d.user); } catch { setUser(null); }
    setLoading(false);
  }, []);
  useEffect(() => { refresh(); }, [refresh]);
  const logout = async () => { await fetch('/api/auth/logout', { method: 'POST' }); setUser(null); };
  return <AuthCtx.Provider value={{ user, loading, refresh, logout }}>{children}</AuthCtx.Provider>;
}
export const useAuth = () => useContext(AuthCtx);
