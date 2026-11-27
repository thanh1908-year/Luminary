/* ============================================================
   LUMINARY — máy chủ web thật
   Chạy: node server.js   (hoặc: npm start)
   Không cần cài dependency.
   ============================================================ */

'use strict';

const http = require('node:http');
const fs = require('node:fs');
const path = require('node:path');

const ROOT = __dirname;
const DATA_DIR = path.join(ROOT, 'data');
const ORDERS_FILE = path.join(DATA_DIR, 'orders.json');
const PORT = Number(process.env.PORT) || 3000;
const HOST = process.env.HOST || '0.0.0.0';
const ADMIN_TOKEN = process.env.ADMIN_TOKEN || 'luminary2026';
const MAX_BODY = 64 * 1024;
const VALID_STATUS = new Set(['Đang chuẩn bị', 'Đã xác nhận', 'Đang giao', 'Hoàn tất', 'Đã hủy']);

const MIME = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.webmanifest': 'application/manifest+json; charset=utf-8',
  '.svg': 'image/svg+xml',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.png': 'image/png',
  '.webp': 'image/webp',
  '.ico': 'image/x-icon',
  '.txt': 'text/plain; charset=utf-8',
  '.xml': 'application/xml; charset=utf-8',
  '.map': 'application/json; charset=utf-8'
};

/* ---------- Dữ liệu ---------- */
function ensureData() {
  fs.mkdirSync(DATA_DIR, { recursive: true });
  if (!fs.existsSync(ORDERS_FILE)) {
    fs.writeFileSync(ORDERS_FILE, JSON.stringify({ orders: [] }, null, 2), 'utf8');
  }
}

function readOrders() {
  try {
    const data = JSON.parse(fs.readFileSync(ORDERS_FILE, 'utf8'));
    return Array.isArray(data.orders) ? data.orders : [];
  } catch {
    return [];
  }
}

function writeOrders(list) {
  const tmp = `${ORDERS_FILE}.tmp`;
  fs.writeFileSync(tmp, JSON.stringify({ orders: list }, null, 2), 'utf8');
  fs.renameSync(tmp, ORDERS_FILE);
}

/* ---------- Tiện ích ---------- */
function sendJson(res, status, payload) {
  const body = JSON.stringify(payload);
  res.writeHead(status, {
    'Content-Type': 'application/json; charset=utf-8',
    'Content-Length': Buffer.byteLength(body),
    'Cache-Control': 'no-store',
    'X-Content-Type-Options': 'nosniff'
  });
  res.end(body);
}

function readBody(req) {
  return new Promise((resolve, reject) => {
    let size = 0;
    const chunks = [];
    req.on('data', (chunk) => {
      size += chunk.length;
      if (size > MAX_BODY) {
        reject(new Error('Nội dung quá lớn'));
        req.destroy();
        return;
      }
      chunks.push(chunk);
    });
    req.on('end', () => {
      try { resolve(JSON.parse(Buffer.concat(chunks).toString('utf8') || '{}')); }
      catch { reject(new Error('JSON không hợp lệ')); }
    });
    req.on('error', reject);
  });
}

function isAuthorized(req, url) {
  const header = String(req.headers['x-admin-token'] || '');
  const query = String(url.searchParams.get('token') || '');
  return header === ADMIN_TOKEN || query === ADMIN_TOKEN;
}

function text(value, min, max) {
  return typeof value === 'string' && value.trim().length >= min && value.trim().length <= max;
}

function validateOrder(body) {
  const errors = [];
  const c = body && body.customer ? body.customer : {};
  const items = body && Array.isArray(body.items) ? body.items : [];

  if (!text(c.fullName, 2, 100)) errors.push('Họ tên không hợp lệ');
  if (!text(c.phone, 8, 20) || !/^[0-9+\-\s()]+$/.test(c.phone)) errors.push('Số điện thoại không hợp lệ');
  if (!text(c.email, 5, 120) || !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(c.email)) errors.push('Email không hợp lệ');
  if (body.delivery !== 'pickup' && !text(c.address, 5, 200)) errors.push('Địa chỉ giao hàng không hợp lệ');
  if (body.delivery !== 'pickup' && !text(c.district, 2, 100)) errors.push('Quận hoặc huyện không hợp lệ');
  if (!['express', 'delivery', 'pickup'].includes(body.delivery)) errors.push('Phương thức giao hàng không hợp lệ');
  if (!items.length || items.length > 50) errors.push('Giỏ hàng phải có từ 1 đến 50 món');

  items.forEach((item, i) => {
    if (!Number.isInteger(item.id) || item.id <= 0) errors.push(`Món thứ ${i + 1}: id không hợp lệ`);
    if (!text(item.name, 2, 150)) errors.push(`Món thứ ${i + 1}: tên không hợp lệ`);
    if (!Number.isFinite(Number(item.price)) || Number(item.price) < 0) errors.push(`Món thứ ${i + 1}: giá không hợp lệ`);
    if (!Number.isInteger(item.qty) || item.qty < 1 || item.qty > 20) errors.push(`Món thứ ${i + 1}: số lượng không hợp lệ`);
  });

  ['subtotal', 'shipping', 'discount', 'total'].forEach((key) => {
    if (!Number.isFinite(Number(body[key])) || Number(body[key]) < 0) errors.push(`${key} không hợp lệ`);
  });

  return errors;
}

function normalizeOrder(body, ip) {
  const now = new Date();
  const stamp = `${String(now.getFullYear()).slice(-2)}${String(now.getMonth() + 1).padStart(2, '0')}${String(now.getDate()).padStart(2, '0')}`;
  const code = /^LM\d{6}-\d{4}$/.test(String(body.code || ''))
    ? String(body.code)
    : `LM${stamp}-${String(Math.floor(1000 + Math.random() * 9000))}`;

  return {
    code,
    createdAt: Number.isFinite(Date.parse(body.createdAt)) ? body.createdAt : now.toISOString(),
    status: VALID_STATUS.has(body.status) ? body.status : 'Đang chuẩn bị',
    items: body.items.map((item) => ({
      id: Number(item.id),
      name: String(item.name).trim(),
      price: Number(item.price),
      qty: Number(item.qty)
    })),
    subtotal: Number(body.subtotal),
    shipping: Number(body.shipping),
    discount: Number(body.discount),
    total: Number(body.total),
    customer: {
      fullName: String(body.customer.fullName).trim(),
      phone: String(body.customer.phone).trim(),
      email: String(body.customer.email).trim(),
      city: String(body.customer.city || '').slice(0, 100),
      district: String(body.customer.district || '').trim().slice(0, 100),
      address: String(body.customer.address || '').trim().slice(0, 200),
      note: String(body.customer.note || '').trim().slice(0, 500)
    },
    delivery: ['express', 'delivery', 'pickup'].includes(body.delivery) ? body.delivery : 'express',
    payment: ['cod', 'transfer', 'banking', 'online'].includes(body.payment) ? body.payment : 'cod',
    source: 'website',
    ip: String(ip || '').slice(0, 45)
  };
}

/* ---------- Giới hạn gửi đơn ---------- */
const recentPosts = new Map();
function allowPost(ip) {
  const now = Date.now();
  const list = (recentPosts.get(ip) || []).filter((t) => now - t < 60_000);
  if (list.length >= 10) { recentPosts.set(ip, list); return false; }
  list.push(now);
  recentPosts.set(ip, list);
  return true;
}

/* ---------- API ---------- */
async function handleApi(req, res, url) {
  const route = url.pathname;
  const method = req.method;
  const ip = req.socket.remoteAddress || '';

  if (route === '/api/health' && method === 'GET') {
    return sendJson(res, 200, { ok: true, service: 'luminary', version: '2.1.0', orders: readOrders().length, time: new Date().toISOString() });
  }

  if (route === '/api/orders' && method === 'POST') {
    if (!allowPost(ip)) return sendJson(res, 429, { ok: false, error: 'Gửi quá nhiều đơn trong một phút. Vui lòng thử lại sau.' });
    let body;
    try { body = await readBody(req); }
    catch (error) { return sendJson(res, 400, { ok: false, error: error.message }); }

    const errors = validateOrder(body);
    if (errors.length) return sendJson(res, 400, { ok: false, errors });

    const order = normalizeOrder(body, ip);
    const orders = readOrders();
    if (orders.some((item) => item.code === order.code)) {
      return sendJson(res, 200, { ok: true, code: order.code, duplicate: true, message: 'Đơn này đã tồn tại trên hệ thống.' });
    }
    orders.unshift(order);
    writeOrders(orders.slice(0, 500));
    return sendJson(res, 201, { ok: true, code: order.code, message: 'Đã gửi đơn hàng về tiệm.' });
  }

  if (route === '/api/orders' && method === 'GET') {
    if (!isAuthorized(req, url)) return sendJson(res, 401, { ok: false, error: 'Chưa xác thực quản lý.' });
    return sendJson(res, 200, { ok: true, orders: readOrders() });
  }

  const match = route.match(/^\/api\/orders\/([A-Za-z0-9-]+)$/);
  if (match) {
    if (!isAuthorized(req, url)) return sendJson(res, 401, { ok: false, error: 'Chưa xác thực quản lý.' });
    const code = match[1];
    const orders = readOrders();
    const index = orders.findIndex((item) => item.code === code);
    if (index < 0) return sendJson(res, 404, { ok: false, error: 'Không tìm thấy đơn hàng.' });

    if (method === 'PATCH') {
      let body;
      try { body = await readBody(req); }
      catch (error) { return sendJson(res, 400, { ok: false, error: error.message }); }
      if (!VALID_STATUS.has(body.status)) return sendJson(res, 400, { ok: false, error: 'Trạng thái không hợp lệ.' });
      orders[index].status = body.status;
      orders[index].updatedAt = new Date().toISOString();
      writeOrders(orders);
      return sendJson(res, 200, { ok: true, order: orders[index] });
    }

    if (method === 'DELETE') {
      const [removed] = orders.splice(index, 1);
      writeOrders(orders);
      return sendJson(res, 200, { ok: true, removed: removed.code });
    }
  }

  return sendJson(res, 404, { ok: false, error: 'API không tồn tại.' });
}

/* ---------- File tĩnh ---------- */
function serveStatic(req, res, url) {
  let pathname;
  try { pathname = decodeURIComponent(url.pathname); }
  catch { res.writeHead(400); return res.end('Đường dẫn không hợp lệ'); }

  if (pathname.includes('\0')) { res.writeHead(400); return res.end('Đường dẫn không hợp lệ'); }
  if (pathname === '/') pathname = '/index.html';

  const lowerPath = pathname.toLowerCase().replace(/\\/g, '/');
  const privatePaths = ['/server.js', '/package.json', '/deploy.md', '/.gitignore', '/dockerfile', '/procfile'];
  if (privatePaths.includes(lowerPath) || lowerPath.startsWith('/data/')
      || lowerPath.startsWith('/tools/') || lowerPath.startsWith('/node_modules/')) {
    res.writeHead(404, { 'Content-Type': 'text/html; charset=utf-8' });
    return res.end('<!doctype html><html lang="vi"><meta charset="utf-8"><title>Không tìm thấy trang</title><body style="font-family:sans-serif;text-align:center;padding:80px"><h1>🧁 404</h1><p>Trang bạn tìm không tồn tại.</p><a href="/">Về trang chủ</a></body></html>');
  }

  const resolved = path.resolve(ROOT, `.${pathname}`);
  if (resolved !== ROOT && !resolved.startsWith(ROOT + path.sep)) {
    res.writeHead(403); return res.end('Không được truy cập');
  }

  fs.stat(resolved, (error, stats) => {
    if (error || !stats.isFile()) {
      res.writeHead(404, { 'Content-Type': 'text/html; charset=utf-8' });
      return res.end('<!doctype html><html lang="vi"><meta charset="utf-8"><title>Không tìm thấy trang</title><body style="font-family:sans-serif;text-align:center;padding:80px"><h1>🧁 404</h1><p>Trang bạn tìm không tồn tại.</p><a href="/">Về trang chủ</a></body></html>');
    }

    const ext = path.extname(resolved).toLowerCase();
    const type = MIME[ext] || 'application/octet-stream';
    const cache = ext === '.html' || ext === '.json' ? 'no-cache' : 'public, max-age=86400';
    res.writeHead(200, {
      'Content-Type': type,
      'Content-Length': stats.size,
      'Cache-Control': cache,
      'X-Content-Type-Options': 'nosniff',
      'Referrer-Policy': 'strict-origin-when-cross-origin'
    });
    if (req.method === 'HEAD') return res.end();
    fs.createReadStream(resolved).pipe(res);
  });
}

/* ---------- Khởi động ---------- */
ensureData();

const server = http.createServer((req, res) => {
  const url = new URL(req.url || '/', `http://${req.headers.host || 'localhost'}`);
  if (url.pathname.startsWith('/api/')) {
    handleApi(req, res, url).catch((error) => sendJson(res, 500, { ok: false, error: error.message }));
    return;
  }
  serveStatic(req, res, url);
});

server.listen(PORT, HOST, () => {
  console.log(`\n  🧁 Luminary đang chạy:`);
  console.log(`  → Website:  http://localhost:${PORT}`);
  console.log(`  → Quản lý:  http://localhost:${PORT}/admin.html`);
  console.log(`  → API:      http://localhost:${PORT}/api/health`);
  console.log(`  → Token quản lý mặc định: ${ADMIN_TOKEN} (đổi qua biến môi trường ADMIN_TOKEN)\n`);
});

process.on('SIGINT', () => server.close(() => process.exit(0)));
