import { NextResponse } from 'next/server';
import { v4 as uuidv4 } from 'uuid';
import { cookies } from 'next/headers';
import { PRODUCTS, CATEGORIES, getProductById, getGroupedProducts, getVariants } from '@/lib/products';
import { getDb, hashPassword, comparePassword, signToken, verifyToken, setAuthCookie, clearAuthCookie, getCurrentUser, getCurrentAdmin, ensureSeedAdmin } from '@/lib/auth';
import { sendOrderEmails } from '@/lib/email';
import { createRzpOrder, verifySignature, RAZORPAY_ENABLED, RAZORPAY_KEY_ID } from '@/lib/razorpay';

function json(data, status = 200) { return NextResponse.json(data, { status }); }

// Seed admin on first import
ensureSeedAdmin().catch(e => console.error('seed admin err', e));

async function GET(request, { params }) {
  const path = (params?.path || []).join('/');
  try {
    if (path === '' || path === 'health') return json({ ok: true, service: 'avani-organics' });

    if (path === 'products') {
      const { searchParams } = new URL(request.url);
      const cat = searchParams.get('category');
      const q = (searchParams.get('q') || '').toLowerCase();
      const sort = searchParams.get('sort') || 'featured';
      const grouped = searchParams.get('grouped') !== 'false'; // default to grouped
      let list = grouped ? getGroupedProducts() : [...PRODUCTS];
      if (cat && cat !== 'all') list = list.filter(p => p.category === cat);
      if (q) list = list.filter(p => p.name.toLowerCase().includes(q) || p.category.toLowerCase().includes(q));
      if (sort === 'price-asc') list.sort((a,b) => a.price - b.price);
      if (sort === 'price-desc') list.sort((a,b) => b.price - a.price);
      if (sort === 'rating') list.sort((a,b) => b.rating - a.rating);
      return json({ products: list, total: list.length });
    }
    if (path === 'categories') return json({ categories: CATEGORIES });
    if (path.startsWith('product/')) {
      const pid = path.split('/')[1];
      const p = getProductById(pid);
      if (!p) return json({ error: 'Not found' }, 404);
      const variants = getVariants(p.name);
      const similar = PRODUCTS.filter(x => x.category === p.category && x.name !== p.name).slice(0, 8);
      // dedupe similar by name (one per group)
      const seenNames = new Set();
      const similarDedup = [];
      for (const s of similar) { if (!seenNames.has(s.name)) { seenNames.add(s.name); similarDedup.push(s); } }
      return json({ product: p, variants, similar: similarDedup });
    }
    if (path.startsWith('order/')) {
      const oid = path.split('/')[1];
      const db = await getDb();
      const o = await db.collection('orders').findOne({ order_id: oid });
      if (!o) return json({ error: 'Not found' }, 404);
      const { _id, ...rest } = o;
      return json({ order: rest });
    }

    // ===== USER AUTH =====
    if (path === 'auth/me') {
      const user = await getCurrentUser();
      return json({ user });
    }
    if (path === 'auth/orders') {
      const user = await getCurrentUser();
      if (!user) return json({ error: 'Unauthorized' }, 401);
      const db = await getDb();
      const orders = await db.collection('orders').find({ user_id: user.user_id }).sort({ created_at: -1 }).limit(100).toArray();
      return json({ orders: orders.map(({ _id, ...rest }) => rest) });
    }

    // ===== ADMIN AUTH =====
    if (path === 'admin/me') {
      const admin = await getCurrentAdmin();
      return json({ admin });
    }
    if (path === 'admin/orders') {
      const admin = await getCurrentAdmin();
      if (!admin) return json({ error: 'Unauthorized' }, 401);
      const db = await getDb();
      const orders = await db.collection('orders').find({}).sort({ created_at: -1 }).limit(500).toArray();
      return json({ orders: orders.map(({ _id, ...rest }) => rest) });
    }
    if (path === 'admin/users') {
      const admin = await getCurrentAdmin();
      if (!admin) return json({ error: 'Unauthorized' }, 401);
      const db = await getDb();
      const users = await db.collection('users').find({}, { projection: { password_hash: 0 } }).sort({ created_at: -1 }).limit(500).toArray();
      return json({ users: users.map(({ _id, ...rest }) => rest) });
    }
    if (path === 'admin/csv') {
      const admin = await getCurrentAdmin();
      if (!admin) return new Response('Unauthorized', { status: 401 });
      const db = await getDb();
      const orders = await db.collection('orders').find({}).sort({ created_at: -1 }).toArray();
      const head = 'order_id,date,customer_name,email,phone,address,city,pincode,product_name,variant,quantity,unit_price,line_total,payment_method,payment_status,razorpay_payment_id,order_status,order_total\n';
      const esc = v => `"${(v ?? '').toString().replace(/"/g,'""')}"`;
      const rows = orders.flatMap(o => {
        const addr = (o.address || '').replace(/,/g, ' ');
        const items = (o.items && o.items.length) ? o.items : [{ name: '-', weight: '-', qty: 0, price: 0 }];
        return items.map(i => [o.order_id, o.created_at, o.name, o.email, o.phone, addr, o.city, o.pincode, i.name, i.weight, i.qty, i.price, (i.price||0)*(i.qty||0), o.payment_method, o.payment_status, o.razorpay_payment_id || '', o.status, o.total].map(esc).join(','));
      }).join('\n');
      return new Response(head + rows, { headers: { 'Content-Type': 'text/csv', 'Content-Disposition': 'attachment; filename=avani-orders.csv' } });
    }

    return json({ error: 'Not found' }, 404);
  } catch (e) {
    console.error('API GET error:', e);
    return json({ error: e.message }, 500);
  }
}

async function POST(request, { params }) {
  const path = (params?.path || []).join('/');
  try {
    const body = await request.json().catch(() => ({}));

    // ===== USER AUTH =====
    if (path === 'auth/signup') {
      const { name, email, password, phone } = body;
      if (!name || !email || !password) return json({ error: 'Name, email & password required' }, 400);
      if (password.length < 6) return json({ error: 'Password must be at least 6 characters' }, 400);
      const db = await getDb();
      const lower = email.toLowerCase();
      const exists = await db.collection('users').findOne({ email: lower });
      if (exists) return json({ error: 'Email already registered' }, 400);
      const user_id = uuidv4();
      const password_hash = await hashPassword(password);
      await db.collection('users').insertOne({ _id: uuidv4(), user_id, name, email: lower, phone: phone || '', password_hash, created_at: new Date().toISOString() });
      const token = signToken({ uid: user_id, role: 'user' });
      setAuthCookie(token);
      return json({ ok: true, user: { user_id, name, email: lower, phone: phone || '' } });
    }
    if (path === 'auth/login') {
      const { email, password } = body;
      if (!email || !password) return json({ error: 'Email & password required' }, 400);
      const db = await getDb();
      const u = await db.collection('users').findOne({ email: email.toLowerCase() });
      if (!u) return json({ error: 'Invalid credentials' }, 401);
      const ok = await comparePassword(password, u.password_hash);
      if (!ok) return json({ error: 'Invalid credentials' }, 401);
      const token = signToken({ uid: u.user_id, role: 'user' });
      setAuthCookie(token);
      return json({ ok: true, user: { user_id: u.user_id, name: u.name, email: u.email, phone: u.phone || '' } });
    }
    if (path === 'auth/logout') {
      clearAuthCookie('avani_token');
      return json({ ok: true });
    }

    // ===== ADMIN AUTH =====
    if (path === 'admin/login') {
      const { email, password } = body;
      const db = await getDb();
      const a = await db.collection('admins').findOne({ email: (email || '').toLowerCase() });
      if (!a) return json({ error: 'Invalid credentials' }, 401);
      const ok = await comparePassword(password, a.password_hash);
      if (!ok) return json({ error: 'Invalid credentials' }, 401);
      const token = signToken({ email: a.email, role: 'admin' });
      setAuthCookie(token, 'avani_admin_token');
      return json({ ok: true, admin: { email: a.email } });
    }
    if (path === 'admin/logout') {
      clearAuthCookie('avani_admin_token');
      return json({ ok: true });
    }
    if (path?.startsWith('admin/order/') && path.endsWith('/status')) {
      const admin = await getCurrentAdmin();
      if (!admin) return json({ error: 'Unauthorized' }, 401);
      const order_id = path.split('/')[2];
      const db = await getDb();
      await db.collection('orders').updateOne({ order_id }, { $set: { status: body.status } });
      return json({ ok: true });
    }

    // ===== ORDERS =====
    if (path === 'orders') {
      const user = await getCurrentUser();
      const order_id = 'AVN-' + Date.now().toString(36).toUpperCase() + '-' + Math.random().toString(36).slice(2, 6).toUpperCase();
      const order = {
        order_id,
        user_id: user ? user.user_id : null,
        name: body.name, phone: body.phone, email: body.email,
        address: body.address, city: body.city, pincode: body.pincode, notes: body.notes || '',
        items: body.items || [], subtotal: body.subtotal, delivery: body.delivery,
        discount: body.discount || 0, total: body.total,
        payment_method: body.payment_method || 'COD',
        payment_status: body.payment_method === 'COD' ? 'cod' : 'pending',
        status: 'placed',
        razorpay_order_id: body.razorpay_order_id || null,
        razorpay_payment_id: body.razorpay_payment_id || null,
        created_at: new Date().toISOString(),
        _id: uuidv4(),
      };
      const db = await getDb();
      await db.collection('orders').insertOne(order);
      // Fire and forget email — don't block order on email failures
      sendOrderEmails(order).catch(e => console.error('[email] fail', e));
      return json({ ok: true, order_id, order });
    }

    // ===== RAZORPAY =====
    if (path === 'razorpay/order') {
      if (!RAZORPAY_ENABLED) return json({ error: 'Razorpay not configured. Please set RAZORPAY_KEY_ID and RAZORPAY_KEY_SECRET.' }, 503);
      const { amount, receipt } = body;
      if (!amount || amount < 1) return json({ error: 'Invalid amount' }, 400);
      const rzpOrder = await createRzpOrder({ amountInr: amount, receipt: receipt || `avn_${Date.now()}`, notes: { source: 'avani-checkout' } });
      return json({ ok: true, order_id: rzpOrder.id, amount: rzpOrder.amount, currency: rzpOrder.currency, key_id: RAZORPAY_KEY_ID });
    }
    if (path === 'razorpay/verify') {
      const { razorpay_order_id, razorpay_payment_id, razorpay_signature, order_payload } = body;
      if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) return json({ error: 'Missing fields' }, 400);
      const ok = verifySignature({ razorpay_order_id, razorpay_payment_id, razorpay_signature });
      if (!ok) {
        console.error('[razorpay] signature verification FAILED for', razorpay_payment_id);
        return json({ ok: false, error: 'Signature verification failed' }, 400);
      }
      const db = await getDb();
      // Idempotency: if an order already exists for this payment_id, return it without creating a duplicate
      const existing = await db.collection('orders').findOne({ razorpay_payment_id });
      if (existing) {
        console.log('[razorpay] duplicate verify for payment', razorpay_payment_id, '— returning existing order', existing.order_id);
        return json({ ok: true, order_id: existing.order_id, duplicate: true });
      }
      const user = await getCurrentUser();
      const order_id = 'AVN-' + Date.now().toString(36).toUpperCase() + '-' + Math.random().toString(36).slice(2, 6).toUpperCase();
      const order = {
        order_id,
        user_id: user ? user.user_id : null,
        name: order_payload.name, phone: order_payload.phone, email: order_payload.email,
        address: order_payload.address, city: order_payload.city, pincode: order_payload.pincode, notes: order_payload.notes || '',
        items: order_payload.items || [], subtotal: order_payload.subtotal, delivery: order_payload.delivery,
        discount: order_payload.discount || 0, total: order_payload.total,
        payment_method: 'RAZORPAY', payment_status: 'paid', status: 'placed',
        razorpay_order_id, razorpay_payment_id, razorpay_signature,
        created_at: new Date().toISOString(),
        _id: uuidv4(),
      };
      await db.collection('orders').insertOne(order);
      console.log('[razorpay] payment verified & order saved:', order_id, 'payment:', razorpay_payment_id, '₹' + order.total);
      sendOrderEmails(order).catch(e => console.error('[email] fail', e));
      return json({ ok: true, order_id });
    }
    if (path === 'newsletter') {
      const db = await getDb();
      await db.collection('newsletter').insertOne({ _id: uuidv4(), email: body.email, created_at: new Date().toISOString() });
      return json({ ok: true });
    }
    return json({ error: 'Not found' }, 404);
  } catch (e) {
    console.error('API POST error:', e);
    return json({ error: e.message }, 500);
  }
}

export { GET, POST };
