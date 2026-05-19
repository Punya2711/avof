import { NextResponse } from 'next/server';
import { MongoClient } from 'mongodb';
import { v4 as uuidv4 } from 'uuid';
import { PRODUCTS, CATEGORIES, getProductById } from '@/lib/products';

const uri = process.env.MONGO_URL;
const dbName = process.env.DB_NAME || 'avani_organics';
let client; let dbPromise;
async function getDb() {
  if (!dbPromise) {
    client = new MongoClient(uri);
    dbPromise = client.connect().then(c => c.db(dbName));
  }
  return dbPromise;
}

function json(data, status = 200) { return NextResponse.json(data, { status }); }

async function GET(request, { params }) {
  const path = (params?.path || []).join('/');
  try {
    if (path === '' || path === 'health') return json({ ok: true, service: 'avani-organics' });
    if (path === 'products') {
      const { searchParams } = new URL(request.url);
      const cat = searchParams.get('category');
      const q = (searchParams.get('q') || '').toLowerCase();
      const sort = searchParams.get('sort') || 'featured';
      let list = [...PRODUCTS];
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
      const similar = PRODUCTS.filter(x => x.category === p.category && x.id !== p.id).slice(0, 8);
      return json({ product: p, similar });
    }
    if (path === 'admin/orders') {
      const { searchParams } = new URL(request.url);
      if (searchParams.get('password') !== (process.env.ADMIN_PASSWORD || 'avani2025')) return json({ error: 'Unauthorized' }, 401);
      const db = await getDb();
      const orders = await db.collection('orders').find({}).sort({ created_at: -1 }).limit(200).toArray();
      return json({ orders: orders.map(({ _id, ...rest }) => rest) });
    }
    if (path === 'admin/csv') {
      const { searchParams } = new URL(request.url);
      if (searchParams.get('password') !== (process.env.ADMIN_PASSWORD || 'avani2025')) return new Response('Unauthorized', { status: 401 });
      const db = await getDb();
      const orders = await db.collection('orders').find({}).sort({ created_at: -1 }).toArray();
      const head = 'order_id,date,customer,phone,email,address,products,total,status\n';
      const rows = orders.map(o => {
        const items = (o.items || []).map(i => `${i.name} x${i.qty} (${i.weight})`).join(' | ');
        const addr = `${o.address || ''} ${o.city || ''} ${o.pincode || ''}`.replace(/,/g, ' ');
        return [o.order_id, o.created_at, o.name, o.phone, o.email, addr, items, o.total, o.status].map(v => `"${(v ?? '').toString().replace(/"/g,'""')}"`).join(',');
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
    if (path === 'orders') {
      const order_id = 'AVN-' + Date.now().toString(36).toUpperCase() + '-' + Math.random().toString(36).slice(2, 6).toUpperCase();
      const order = {
        order_id,
        name: body.name, phone: body.phone, email: body.email,
        address: body.address, city: body.city, pincode: body.pincode, notes: body.notes || '',
        items: body.items || [], subtotal: body.subtotal, delivery: body.delivery,
        discount: body.discount || 0, total: body.total,
        payment_method: body.payment_method || 'COD',
        payment_status: 'pending', status: 'placed',
        created_at: new Date().toISOString(),
        _id: uuidv4(),
      };
      const db = await getDb();
      await db.collection('orders').insertOne(order);
      return json({ ok: true, order_id, order });
    }
    if (path === 'newsletter') {
      const db = await getDb();
      await db.collection('newsletter').insertOne({ _id: uuidv4(), email: body.email, created_at: new Date().toISOString() });
      return json({ ok: true });
    }
    if (path === 'admin/login') {
      const ok = body.password === (process.env.ADMIN_PASSWORD || 'avani2025');
      return json({ ok });
    }
    if (path?.startsWith('admin/order/') && path.endsWith('/status')) {
      const order_id = path.split('/')[2];
      if (body.password !== (process.env.ADMIN_PASSWORD || 'avani2025')) return json({ error: 'Unauthorized' }, 401);
      const db = await getDb();
      await db.collection('orders').updateOne({ order_id }, { $set: { status: body.status } });
      return json({ ok: true });
    }
    return json({ error: 'Not found' }, 404);
  } catch (e) {
    console.error('API POST error:', e);
    return json({ error: e.message }, 500);
  }
}

export { GET, POST };
