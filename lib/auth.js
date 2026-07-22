import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { cookies } from 'next/headers';
import { MongoClient } from 'mongodb';
import { v4 as uuidv4 } from 'uuid';

const SECRET = process.env.JWT_SECRET || 'avani-secret-key-change-me';
const uri = process.env.MONGO_URL;
const dbName = process.env.DB_NAME || 'avani_organics';


let dbPromise;
export async function getDb() {
  if (!dbPromise) {
    const client = new MongoClient(uri);
    dbPromise = client.connect().then(c => c.db(dbName));
  }
  return dbPromise;
}

export async function hashPassword(p) { return bcrypt.hash(p, 10); }
export async function comparePassword(p, h) { return bcrypt.compare(p, h); }

export function signToken(payload, expiresIn = '30d') { return jwt.sign(payload, SECRET, { expiresIn }); }
export function verifyToken(token) { try { return jwt.verify(token, SECRET); } catch { return null; } }

export function setAuthCookie(token, key = 'avani_token') {
  cookies().set(key, token, { httpOnly: true, sameSite: 'lax', path: '/', maxAge: 60 * 60 * 24 * 30, secure: false });
}
export function clearAuthCookie(key = 'avani_token') { cookies().set(key, '', { path: '/', maxAge: 0 }); }

export async function getCurrentUser() {
  const token = cookies().get('avani_token')?.value;
  if (!token) return null;
  const payload = verifyToken(token);
  if (!payload || payload.role !== 'user') return null;
  const db = await getDb();
  const u = await db.collection('users').findOne({ user_id: payload.uid });
  if (!u) return null;
  return { user_id: u.user_id, name: u.name, email: u.email, phone: u.phone || '', created_at: u.created_at };
}

export async function getCurrentAdmin() {
  const token = cookies().get('avani_admin_token')?.value;
  if (!token) return null;
  const payload = verifyToken(token);
  if (!payload || payload.role !== 'admin') return null;
  return { email: payload.email };
}

export async function ensureSeedAdmin() {
  const db = await getDb();
  const adminEmail = (process.env.ADMIN_EMAIL || 'admin@avaniorganic.com').toLowerCase();
  const existing = await db.collection('admins').findOne({ email: adminEmail });
  if (!existing) {
    const password_hash = await hashPassword(process.env.ADMIN_PASSWORD_PLAIN || 'Avani@2025');
    await db.collection('admins').insertOne({ _id: uuidv4(), email: adminEmail, password_hash, created_at: new Date().toISOString() });
  }
}
