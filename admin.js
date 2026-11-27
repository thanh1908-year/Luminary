/* Luminary — trang quản lý đơn hàng nói chuyện với /api/orders. */

(() => {
  'use strict';

  const $ = (id) => document.getElementById(id);
  const TOKEN_KEY = 'luminary-admin-token';
  const STATUSES = ['Đang chuẩn bị', 'Đã xác nhận', 'Đang giao', 'Hoàn tất', 'Đã hủy'];
  const STATUS_CLASS = {
    'Đang chuẩn bị': 'prep',
    'Đã xác nhận': 'confirmed',
    'Đang giao': 'shipping',
    'Hoàn tất': 'done',
    'Đã hủy': 'cancelled'
  };
  const DELIVERY_LABEL = { express: 'Giao nhanh', delivery: 'Giao hàng', pickup: 'Tự nhận tại tiệm' };
  const PAYMENT_LABEL = { cod: 'Thanh toán khi nhận hàng', transfer: 'Chuyển khoản', banking: 'Chuyển khoản', online: 'Chuyển khoản' };

  let token = '';
  let orders = [];
  let toastTimer;

  try {
    token = new URLSearchParams(window.location.search).get('token') || sessionStorage.getItem(TOKEN_KEY) || '';
    if (new URLSearchParams(window.location.search).has('token')) {
      sessionStorage.setItem(TOKEN_KEY, token);
      window.history.replaceState(null, '', window.location.pathname);
    }
  } catch { /* trình duyệt chặn sessionStorage */ }

  const money = (value) => `${Number(value || 0).toLocaleString('vi-VN')}đ`;
  const escapeHtml = (value) => String(value ?? '').replace(/[&<>"']/g, (ch) => ({
    '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'
  })[ch]);
  const formatDate = (value) => {
    const date = new Date(value);
    return Number.isNaN(date.getTime()) ? '—' : date.toLocaleString('vi-VN', { dateStyle: 'medium', timeStyle: 'short' });
  };
  const notice = (message) => { $('adminMsg').textContent = message || ''; };
  const toast = (message) => {
    const el = $('adminToast');
    el.textContent = message;
    el.classList.add('is-show');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => el.classList.remove('is-show'), 2400);
  };

  async function api(path, options = {}) {
    const response = await fetch(path, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        'x-admin-token': token,
        ...(options.headers || {})
      }
    });

    if (response.status === 401) {
      showLogin('Mã quản lý không đúng hoặc đã hết phiên. Vui lòng nhập lại.');
      throw new Error('Chưa xác thực');
    }

    const data = await response.json().catch(() => ({ ok: false, error: 'Máy chủ trả về dữ liệu không hợp lệ.' }));
    if (!response.ok || !data.ok) {
      throw new Error(data.error || (data.errors || []).join(', ') || 'Có lỗi xảy ra.');
    }
    return data;
  }

  function showLogin(message) {
    $('dashboard').hidden = true;
    $('loginView').hidden = false;
    notice(message);
    if (message) $('tokenInput').focus();
  }

  function showDashboard() {
    $('loginView').hidden = true;
    $('dashboard').hidden = false;
    notice('');
  }

  async function loadOrders() {
    const data = await api('/api/orders');
    orders = Array.isArray(data.orders) ? data.orders : [];
    renderStats();
    renderOrders();
  }

  function renderStats() {
    const today = new Date().toDateString();
    const revenue = orders
      .filter((order) => order.status !== 'Đã hủy')
      .reduce((sum, order) => sum + Number(order.total || 0), 0);

    $('statTotal').textContent = orders.length;
    $('statRevenue').textContent = money(revenue);
    $('statPending').textContent = orders.filter((order) => ['Đang chuẩn bị', 'Đã xác nhận'].includes(order.status)).length;
    $('statToday').textContent = orders.filter((order) => new Date(order.createdAt).toDateString() === today).length;
  }

  function filteredOrders() {
    const query = $('searchInput').value.trim().toLowerCase();
    const status = $('statusFilter').value;
    return orders
      .filter((order) => status === 'all' || order.status === status)
      .filter((order) => {
        if (!query) return true;
        const haystack = [
          order.code, order.customer?.fullName, order.customer?.phone,
          order.customer?.email, order.customer?.address, order.items?.map((i) => i.name).join(' ')
        ].join(' ').toLowerCase();
        return haystack.includes(query);
      })
      .slice()
      .sort((a, b) => Date.parse(b.createdAt) - Date.parse(a.createdAt));
  }

  function renderOrders() {
    const list = filteredOrders();
    const container = $('ordersList');

    if (!list.length) {
      container.innerHTML = `<div class="empty"><span>📦</span><p>${orders.length ? 'Không có đơn nào khớp bộ lọc.' : 'Chưa có đơn hàng nào. Đơn mới sẽ hiện ở đây.'}</p></div>`;
      return;
    }

    container.innerHTML = list.map((order) => {
      const customer = order.customer || {};
      const items = (order.items || []).map((item) => `
        <li>${escapeHtml(item.name)} <span class="muted">×${item.qty} · ${money(item.price)}</span></li>
      `).join('');
      const address = order.delivery === 'pickup'
        ? 'Tự nhận tại tiệm 128 Nguyễn Huệ, Quận 1'
        : `${customer.address || ''}${customer.district ? ', ' + customer.district : ''}${customer.city ? ', ' + customer.city : ''}`;
      const status = STATUSES.includes(order.status) ? order.status : 'Đang chuẩn bị';
      const options = STATUSES.map((value) => `<option value="${value}"${value === status ? ' selected' : ''}>${value}</option>`).join('');

      return `
        <article class="order-card" data-code="${escapeHtml(order.code)}">
          <header class="order-card__head">
            <div>
              <small>#${escapeHtml(order.code)}</small>
              <h2>${escapeHtml(customer.fullName || 'Khách hàng')}</h2>
              <time datetime="${escapeHtml(order.createdAt)}">${formatDate(order.createdAt)}</time>
            </div>
            <span class="status status--${STATUS_CLASS[status]}">${status}</span>
          </header>
          <div class="order-card__grid">
            <section>
              <h3>Món bánh</h3>
              <ul>${items}</ul>
            </section>
            <section>
              <h3>Giao hàng</h3>
              <p><strong>${DELIVERY_LABEL[order.delivery] || order.delivery || 'Giao hàng'}</strong></p>
              <p>${escapeHtml(address)}</p>
              <p class="muted">${escapeHtml(customer.phone || '')}</p>
            </section>
            <section>
              <h3>Thanh toán</h3>
              <p><strong>${money(order.total)}</strong></p>
              <p class="muted">${PAYMENT_LABEL[order.payment] || 'Thanh toán khi nhận hàng'}</p>
              <p class="muted">Tạm tính ${money(order.subtotal)} · Giao ${money(order.shipping)} · Giảm ${money(order.discount)}</p>
              ${customer.note ? `<p class="muted">Ghi chú: ${escapeHtml(customer.note)}</p>` : ''}
            </section>
          </div>
          <footer class="order-card__foot">
            <label>
              Cập nhật:
              <select data-action="status" aria-label="Trạng thái đơn ${escapeHtml(order.code)}">${options}</select>
            </label>
            <div class="order-card__actions">
              <button class="btn btn--ghost btn--small" type="button" data-action="copy" title="Sao chép mã đơn">Copy mã</button>
              <button class="btn btn--danger btn--small" type="button" data-action="delete">Xóa đơn</button>
            </div>
          </footer>
        </article>
      `;
    }).join('');
  }

  $('loginForm').addEventListener('submit', async (event) => {
    event.preventDefault();
    token = $('tokenInput').value.trim();
    if (!token) return;
    try {
      sessionStorage.setItem(TOKEN_KEY, token);
      await loadOrders();
      showDashboard();
      toast('Đã vào bảng quản lý');
    } catch (error) {
      notice(error.message);
    }
  });

  $('refreshBtn').addEventListener('click', async () => {
    try {
      await loadOrders();
      toast('Đã làm mới danh sách đơn');
    } catch (error) {
      notice(error.message);
    }
  });

  $('logoutBtn').addEventListener('click', () => {
    token = '';
    orders = [];
    try { sessionStorage.removeItem(TOKEN_KEY); } catch { /* bỏ qua */ }
    showLogin('');
  });

  $('searchInput').addEventListener('input', renderOrders);
  $('statusFilter').addEventListener('change', renderOrders);

  $('ordersList').addEventListener('change', async (event) => {
    const select = event.target.closest('[data-action="status"]');
    if (!select) return;
    const code = select.closest('.order-card').dataset.code;
    try {
      await api(`/api/orders/${encodeURIComponent(code)}`, {
        method: 'PATCH',
        body: JSON.stringify({ status: select.value })
      });
      await loadOrders();
      toast(`Đơn ${code} đã chuyển sang “${select.value}”`);
    } catch (error) {
      notice(error.message);
      await loadOrders();
    }
  });

  $('ordersList').addEventListener('click', async (event) => {
    const button = event.target.closest('[data-action]');
    if (!button || button.dataset.action === 'status') return;
    const code = button.closest('.order-card').dataset.code;

    if (button.dataset.action === 'copy') {
      try {
        await navigator.clipboard.writeText(code);
        toast(`Đã copy mã ${code}`);
      } catch {
        notice(`Mã đơn: ${code}`);
      }
      return;
    }

    if (button.dataset.action === 'delete' && window.confirm(`Xóa đơn ${code}? Hành động này không thể hoàn tác.`)) {
      try {
        await api(`/api/orders/${encodeURIComponent(code)}`, { method: 'DELETE' });
        await loadOrders();
        toast(`Đã xóa đơn ${code}`);
      } catch (error) {
        notice(error.message);
      }
    }
  });

  if (token) {
    loadOrders().then(showDashboard).catch((error) => {
      if ($('dashboard').hidden) showLogin(error.message);
    });
  } else {
    showLogin();
  }
})();
