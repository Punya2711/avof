import { Resend } from 'resend';

const FROM = process.env.RESEND_FROM || 'Avani Organics <onboarding@resend.dev>';
const ADMIN_TO = process.env.ADMIN_EMAIL_TO || 'info@avaniorganic.com';

const resend = process.env.RESEND_API_KEY ? new Resend(process.env.RESEND_API_KEY) : null;

const forestGreen = '#1f3a2b';
const gold = '#c9a85c';
const cream = '#faf6ec';

function money(v) { return `₹${(v || 0).toLocaleString('en-IN')}`; }

function itemRows(items = []) {
  return items.map(i => `
    <tr>
      <td style="padding:10px 0;border-bottom:1px solid #ece2c8;"><b>${i.name}</b> <span style="color:#888;font-size:12px">— ${i.weight}</span></td>
      <td align="center" style="padding:10px 0;border-bottom:1px solid #ece2c8;">${i.qty}</td>
      <td align="right" style="padding:10px 0;border-bottom:1px solid #ece2c8;font-weight:600;">${money(i.price * i.qty)}</td>
    </tr>`).join('');
}

function itemRowsExt(items = []) {
  return items.map(i => `
    <tr>
      <td style="padding:10px 0;border-bottom:1px solid #ece2c8;"><b>${i.name}</b><br/><span style="color:#888;font-size:11px">Pack: ${i.weight}</span></td>
      <td align="center" style="padding:10px 0;border-bottom:1px solid #ece2c8;">${i.qty}</td>
      <td align="right" style="padding:10px 0;border-bottom:1px solid #ece2c8;color:#666;">${money(i.price)}</td>
      <td align="right" style="padding:10px 0;border-bottom:1px solid #ece2c8;font-weight:600;">${money(i.price * i.qty)}</td>
    </tr>`).join('');
}

function customerEmailHtml(order) {
  return `<!doctype html><html><body style="font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;background:#faf6ec;padding:24px;margin:0;">
  <table cellpadding="0" cellspacing="0" width="100%" style="max-width:640px;margin:0 auto;background:#fff;border-radius:16px;overflow:hidden;border:1px solid #ece2c8;">
    <tr><td style="background:${forestGreen};padding:32px 24px;text-align:center;">
      <div style="color:${gold};letter-spacing:4px;font-size:11px;text-transform:uppercase;">Avani Organics</div>
      <h1 style="margin:8px 0 0;color:#fff;font-size:32px;font-weight:400;">Order confirmed ✨</h1>
      <p style="margin:6px 0 0;color:#cbd5b5;font-size:14px;">Order ${order.order_id}</p>
    </td></tr>
    <tr><td style="padding:32px 24px;">
      <p style="font-size:16px;color:${forestGreen};margin:0 0 12px;">Hi ${order.name || 'there'},</p>
      <p style="color:#555;line-height:1.6;margin:0 0 20px;">Thank you for choosing organic. We've received your order and our farmers are getting it ready for you. <b>Expected processing: within 24–48 hours.</b> We'll email you again with tracking details once it's on the way.</p>

      <table width="100%" cellpadding="0" cellspacing="0" style="margin:20px 0;background:#faf6ec;border-radius:8px;">
        <tr><td style="padding:14px 16px;">
          <table width="100%" cellpadding="0" cellspacing="0" style="font-size:12px;color:#555;">
            <tr><td style="padding:3px 0;width:50%"><b style="color:#888;text-transform:uppercase;letter-spacing:1px;font-size:10px;">Order ID</b><br/><span style="color:${forestGreen};font-weight:600">${order.order_id}</span></td><td style="padding:3px 0"><b style="color:#888;text-transform:uppercase;letter-spacing:1px;font-size:10px;">Order date</b><br/><span style="color:${forestGreen};font-weight:600">${new Date(order.created_at).toLocaleString('en-IN', { dateStyle: 'long', timeStyle: 'short' })}</span></td></tr>
            <tr><td style="padding:8px 0 3px"><b style="color:#888;text-transform:uppercase;letter-spacing:1px;font-size:10px;">Payment</b><br/><span style="color:${forestGreen};font-weight:600">${order.payment_method}${order.payment_status === 'paid' ? ' · Paid ✓' : ''}</span></td><td style="padding:8px 0 3px"><b style="color:#888;text-transform:uppercase;letter-spacing:1px;font-size:10px;">Customer</b><br/><span style="color:${forestGreen};font-weight:600">${order.name}<br/><span style="font-weight:400;font-size:11px">${order.phone}</span></span></td></tr>
          </table>
        </td></tr>
      </table>

      <h2 style="font-size:16px;color:${forestGreen};border-bottom:2px solid ${gold};padding-bottom:6px;display:inline-block;margin:24px 0 12px;">Order summary</h2>
      <table width="100%" cellpadding="0" cellspacing="0" style="font-size:14px;color:#333;">
        <thead><tr><th align="left" style="padding-bottom:6px;font-weight:600;color:#888;">Item</th><th align="center" style="padding-bottom:6px;font-weight:600;color:#888;">Qty</th><th align="right" style="padding-bottom:6px;font-weight:600;color:#888;">Unit</th><th align="right" style="padding-bottom:6px;font-weight:600;color:#888;">Amount</th></tr></thead>
        <tbody>${itemRowsExt(order.items)}</tbody>
      </table>
      <table width="100%" cellpadding="0" cellspacing="0" style="margin-top:16px;font-size:14px;">
        <tr><td align="right" style="padding:4px 0;color:#666">Subtotal</td><td align="right" style="padding:4px 0;width:120px">${money(order.subtotal)}</td></tr>
        <tr><td align="right" style="padding:4px 0;color:#666">Delivery</td><td align="right" style="padding:4px 0">${order.delivery === 0 ? '<span style="color:#6b7e3a;font-weight:600">FREE</span>' : money(order.delivery)}</td></tr>
        <tr><td align="right" style="padding:10px 0;border-top:1px solid #ece2c8;font-weight:600;font-size:16px;">Total</td><td align="right" style="padding:10px 0;border-top:1px solid #ece2c8;font-weight:700;font-size:18px;color:${gold};">${money(order.total)}</td></tr>
      </table>
      <h3 style="font-size:14px;color:${forestGreen};margin:24px 0 6px;">Delivery address</h3>
      <p style="font-size:13px;color:#555;line-height:1.5;margin:0;"><b>${order.name}</b><br/>${order.address || ''}<br/>${order.city || ''} — ${order.pincode || ''}<br/>📞 ${order.phone || ''}</p>
      ${order.notes ? `<p style="font-size:12px;color:#888;font-style:italic;margin-top:8px;">Delivery note: ${order.notes}</p>` : ''}
      <p style="margin:24px 0 0;font-size:12px;color:#888;">Questions? Reply to this email or write to <a href="mailto:info@avaniorganic.com" style="color:${forestGreen}">info@avaniorganic.com</a>.</p>
    </td></tr>
    <tr><td style="background:#f5efe0;padding:18px;text-align:center;font-size:11px;color:#888;">
      🌿 BHOOMI Sustainable Development Society • R C Road, Hassan, Karnataka — 573201<br/>© ${new Date().getFullYear()} Avani Organics. All rights reserved.
    </td></tr>
  </table></body></html>`;
}

function adminEmailHtml(order) {
  return `<!doctype html><html><body style="font-family:-apple-system,sans-serif;background:#f5efe0;padding:20px;margin:0;">
  <table cellpadding="0" cellspacing="0" width="100%" style="max-width:640px;margin:0 auto;background:#fff;border-radius:12px;overflow:hidden;border:1px solid #ddd;">
    <tr><td style="background:${forestGreen};padding:20px;color:#fff;">
      <div style="color:${gold};letter-spacing:3px;font-size:10px;text-transform:uppercase;">New Order — Avani Admin</div>
      <h2 style="margin:6px 0 0;font-size:22px;font-weight:500;">${order.order_id}</h2>
      <p style="margin:4px 0 0;font-size:12px;color:#cbd5b5;">Placed ${new Date(order.created_at).toLocaleString('en-IN')}</p>
    </td></tr>
    <tr><td style="padding:20px;">
      <table width="100%" cellpadding="0" cellspacing="0" style="font-size:13px;">
        <tr><td style="width:30%;color:#888">Customer</td><td><b>${order.name}</b></td></tr>
        <tr><td style="color:#888;padding-top:6px">Phone</td><td style="padding-top:6px"><a href="tel:${order.phone}" style="color:${forestGreen}">${order.phone}</a></td></tr>
        <tr><td style="color:#888;padding-top:6px">Email</td><td style="padding-top:6px">${order.email}</td></tr>
        <tr><td style="color:#888;padding-top:6px;vertical-align:top">Address</td><td style="padding-top:6px">${order.address}, ${order.city} — ${order.pincode}</td></tr>
        ${order.notes ? `<tr><td style="color:#888;padding-top:6px">Notes</td><td style="padding-top:6px;font-style:italic">${order.notes}</td></tr>` : ''}
        <tr><td style="color:#888;padding-top:6px">Payment</td><td style="padding-top:6px"><b>${order.payment_method}</b> — ${order.payment_status}</td></tr>
      </table>
      <h3 style="font-size:14px;color:${forestGreen};margin:20px 0 8px;border-bottom:1px solid #ece2c8;padding-bottom:6px;">Items (${(order.items||[]).length})</h3>
      <table width="100%" cellpadding="0" cellspacing="0" style="font-size:13px;">
        <thead><tr><th align="left" style="color:#888;padding-bottom:4px;font-weight:600">Item</th><th align="center" style="color:#888;padding-bottom:4px;font-weight:600">Qty</th><th align="right" style="color:#888;padding-bottom:4px;font-weight:600">Amount</th></tr></thead>
        <tbody>${itemRows(order.items)}</tbody>
      </table>
      <table width="100%" cellpadding="0" cellspacing="0" style="margin-top:14px;font-size:13px;">
        <tr><td align="right" style="color:#666">Subtotal</td><td align="right" style="width:100px">${money(order.subtotal)}</td></tr>
        <tr><td align="right" style="color:#666">Delivery</td><td align="right">${money(order.delivery)}</td></tr>
        <tr><td align="right" style="padding-top:8px;border-top:1px solid #ece2c8;font-weight:700">Total</td><td align="right" style="padding-top:8px;border-top:1px solid #ece2c8;font-weight:700;color:${gold};font-size:16px">${money(order.total)}</td></tr>
      </table>
      <p style="margin:20px 0 0;font-size:12px;color:#888;">Open in admin dashboard: <a href="${process.env.NEXT_PUBLIC_BASE_URL || ''}/admin" style="color:${forestGreen}">${process.env.NEXT_PUBLIC_BASE_URL || ''}/admin</a></p>
    </td></tr>
  </table></body></html>`;
}

export async function sendOrderEmails(order) {
  if (!resend) { console.log('[email] RESEND_API_KEY not set, skipping'); return { skipped: true }; }
  try {
    const res = await Promise.allSettled([
      resend.emails.send({ from: FROM, to: order.email, subject: `🌿 Your Avani Organics order ${order.order_id}`, html: customerEmailHtml(order) }),
      resend.emails.send({ from: FROM, to: ADMIN_TO, subject: `New order ${order.order_id} — ${order.name} — ₹${order.total}`, html: adminEmailHtml(order) }),
    ]);
    return { customer: res[0], admin: res[1] };
  } catch (e) { console.error('[email] send error', e); return { error: e.message }; }
}
