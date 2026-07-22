import Razorpay from 'razorpay';
import crypto from 'crypto';

const KEY_ID = process.env.RAZORPAY_KEY_ID || '';
const KEY_SECRET = process.env.RAZORPAY_KEY_SECRET || '';
const ENABLED = !!(KEY_ID && KEY_SECRET);


let rzp = null;
if (ENABLED) rzp = new Razorpay({ key_id: KEY_ID, key_secret: KEY_SECRET });

export { ENABLED as RAZORPAY_ENABLED, KEY_ID as RAZORPAY_KEY_ID };

export async function createRzpOrder({ amountInr, receipt, notes = {} }) {
  if (!ENABLED) throw new Error('Razorpay not configured');
  return rzp.orders.create({
    amount: Math.round(amountInr * 100), // paise
    currency: 'INR',
    receipt,
    notes,
  });
}

export function verifySignature({ razorpay_order_id, razorpay_payment_id, razorpay_signature }) {
  if (!ENABLED) return false;
  const body = `${razorpay_order_id}|${razorpay_payment_id}`;
  const expected = crypto.createHmac('sha256', KEY_SECRET).update(body).digest('hex');
  try {
    return expected.length === razorpay_signature.length &&
      crypto.timingSafeEqual(Buffer.from(expected), Buffer.from(razorpay_signature));
  } catch { return false; }
}
