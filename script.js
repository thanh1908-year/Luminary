/* ============================================================
   LUMINARY — interactions & mini checkout
   ============================================================ */

(() => {
  'use strict';

  const PRODUCTS = [
    { id: 1,  name: 'Bánh Dâu Tươi Luminary',      category: 'cake',    categoryName: 'Bánh kem',              price: 289000, oldPrice: 329000, rating: 4.9, reviews: 128, image: 'cake-strawberry',   w: 1920, h: 1371, badge: 'Bán chạy', badgeClass: 'product-card__badge--pink',  desc: 'Kem tươi béo nhẹ, dâu đỏ ngọt mát, nền bông xốp mềm như mây.' },
    { id: 2,  name: 'Mousse Socola Đen Cao Cấp',    category: 'mousse',  categoryName: 'Bánh mousse',           price: 319000, oldPrice: 359000, rating: 4.9, reviews: 96,  image: 'cake-chocolate',    w: 1920, h: 1306, badge: 'Yêu thích', badgeClass: '',                            desc: 'Socola 70% tan mịn trong miệng, vị đắng thanh quyện kem béo.' },
    { id: 3,  name: 'Matcha Tiramisu Nhật Bản',    category: 'cake',    categoryName: 'Bánh kem',              price: 299000, oldPrice: null,   rating: 4.8, reviews: 74,  image: 'cake-matcha',       w: 1920, h: 2560, badge: 'Mới',      badgeClass: 'product-card__badge--sage',  desc: 'Matcha Uji thơm nhẹ, lớp kem mascarpone mướt mịn, ngọt dịu.' },
    { id: 4,  name: 'Croissant Bơ Pháp Giòn Tan',  category: 'pastry',  categoryName: 'Pastry',                price: 89000,  oldPrice: 109000, rating: 4.9, reviews: 213, image: 'pastry-croissant',  w: 1920, h: 1440, badge: '',         badgeClass: '',                            desc: '54 lớp bơ Pháp xếp tay, vỏ giòn tan, ruột mềm và thơm lừng.' },
    { id: 5,  name: 'Cheesecake Viết Quất',        category: 'cake',    categoryName: 'Bánh kem',              price: 279000, oldPrice: null,   rating: 4.8, reviews: 88,  image: 'cake-cheesecake',   w: 1920, h: 1440, badge: '',         badgeClass: '',                            desc: 'Phô mai New York chua nhẹ, sốt viết quất tự nấu, đế bánh quy giòn.' },
    { id: 6,  name: 'Bánh Cuộn Dâu Swiss Roll',    category: 'cake',    categoryName: 'Bánh kem',              price: 239000, oldPrice: 269000, rating: 4.7, reviews: 65,  image: 'cake-swiss-roll',    w: 1920, h: 1086, badge: '',         badgeClass: '',                            desc: 'Cuộn bông mềm, kem dâu tươi chua ngọt vừa phải, cắt lát rất xinh.' },
    { id: 7,  name: 'Tiramisu Ý Classic',          category: 'cake',    categoryName: 'Bánh kem',              price: 259000, oldPrice: null,   rating: 4.9, reviews: 142, image: 'cake-tiramisu',     w: 1000, h: 647,  badge: 'Bán chạy', badgeClass: 'product-card__badge--pink',  desc: 'Cà phê espresso đậm đà, mascarpone béo ngậy, rắc bột ca cao thơm lừng.' },
    { id: 8,  name: 'Mousse Mâm Xôi Chua Ngọt',    category: 'mousse',  categoryName: 'Bánh mousse',           price: 309000, oldPrice: null,   rating: 4.8, reviews: 57,  image: 'mousse-raspberry',   w: 1200, h: 1600, badge: 'Mới',      badgeClass: 'product-card__badge--sage',  desc: 'Mousse mâm xôi tươi mát, điểm thêm chút socola trắng béo nhẹ.' },
    { id: 9,  name: 'Panna Cotta Mousse Socola',   category: 'mousse',  categoryName: 'Bánh mousse',           price: 269000, oldPrice: 299000, rating: 4.7, reviews: 49,  image: 'mousse-panna-cotta', w: 643,  h: 1000, badge: '',         badgeClass: '',                            desc: 'Panna cotta mướt mát quyện mousse socola, vị ngọt thanh không gắt.' },
    { id: 10, name: 'Cinnamon Roll Quế Ấm',       category: 'pastry',  categoryName: 'Pastry',                price: 99000,  oldPrice: null,   rating: 4.8, reviews: 91,  image: 'pastry-cinnamon',   w: 1920, h: 1446, badge: '',         badgeClass: '',                            desc: 'Bột bông xoắn quế, phủ kem phô mai chảy nhẹ, ăn ấm là ngon nhất.' },
    { id: 11, name: 'Tart Trái Cây Tươi',          category: 'pastry',  categoryName: 'Pastry',                price: 189000, oldPrice: 219000, rating: 4.9, reviews: 103, image: 'pastry-fruit-tart',  w: 1920, h: 994,  badge: 'Yêu thích', badgeClass: '',                            desc: 'Đế tart giòn, kem custard mịn, điểm trái cây tươi theo mùa.' },
    { id: 12, name: 'Hộp Macaron 6 Vị Pastel',     category: 'macaron', categoryName: 'Macaron',               price: 199000, oldPrice: 239000, rating: 4.9, reviews: 187, image: 'macaron-box',        w: 1920, h: 1440, badge: 'Bán chạy', badgeClass: 'product-card__badge--pink',  desc: 'Sáu vị pastel nhẹ nhàng: dâu, vani, matcha, socola, chanh, hồng trà.' },
    { id: 13, name: 'Macaron Vani Đơn Vị',         category: 'macaron', categoryName: 'Macaron',               price: 45000,  oldPrice: null,   rating: 4.7, reviews: 64,  image: 'macaron-vanilla',    w: 1920, h: 1691, badge: '',         badgeClass: '',                            desc: 'Vỏ giòn tan, ganache vani Madagascar thơm dịu, nhỏ xinh đáng yêu.' },
    { id: 14, name: 'Brownie Socola Đậm Đà',       category: 'cookie',  categoryName: 'Bánh quy và brownie',   price: 79000,  oldPrice: 99000,  rating: 4.8, reviews: 119, image: 'cookie-brownie',     w: 1200, h: 1800, badge: '',         badgeClass: '',                            desc: 'Brownie ẩm mịn, socola đen đậm đà, đầu lưỡi hơi giòn, trong mềm.' },
    { id: 15, name: 'Cookie Socola Chip',          category: 'cookie',  categoryName: 'Bánh quy và brownie',   price: 59000,  oldPrice: null,   rating: 4.7, reviews: 156, image: 'cookie-choc-chip',   w: 1200, h: 1501, badge: '',         badgeClass: '',                            desc: 'Bơ thật, nhiều hạt socola, nướng vàng ruộm – ăn kèm trà là nhất.' }
  ];

  // Chỉ dùng các kích thước WebP thực tế có trong images/webp/.
  // optimize_images.py cố tình không upscale ảnh gốc nhỏ (vd: panna-cotta 643px).
  const IMAGE_WIDTHS = {
    'cake-strawberry': [480, 800, 1200, 1600],
    'cake-chocolate': [480, 800, 1200, 1600],
    'cake-matcha': [480, 800, 1200, 1600],
    'cake-cheesecake': [480, 800, 1200, 1600],
    'cake-swiss-roll': [480, 800, 1200, 1600],
    'cake-tiramisu': [480, 800],
    'mousse-raspberry': [480, 800, 1200],
    'mousse-panna-cotta': [480],
    'pastry-cinnamon': [480, 800, 1200, 1600],
    'pastry-croissant': [480, 800, 1200, 1600],
    'pastry-fruit-tart': [480, 800, 1200, 1600],
    'macaron-box': [480, 800, 1200, 1600],
    'macaron-vanilla': [480, 800],
    'cookie-brownie': [480, 800, 1200],
    'cookie-choc-chip': [480, 800, 1200]
  };
  PRODUCTS.forEach((product) => { product.widths = IMAGE_WIDTHS[product.image] || [480, 800]; });

  const FREE_SHIP = 300000;
  const SHIP_FEE = 30000;
  const MAX_QTY = 99;
  const KEYS = {
    cart: 'luminary-cart',
    favorites: 'luminary-favorites',
    orders: 'luminary-orders',
    theme: 'luminary-theme',
    users: 'luminary-users',
    session: 'luminary-session'
  };
  const FOCUSABLE = 'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])';

  const $ = (id) => document.getElementById(id);
  const money = (value) => Math.round(value).toLocaleString('vi-VN') + 'đ';
  const escapeHtml = (value) => String(value).replace(/[&<>"']/g, (ch) => ({
    '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'
  })[ch]);
  const normalize = (value) => String(value).normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase();
  const productById = (id) => PRODUCTS.find((p) => p.id === Number(id));

  function readStorage(key, fallback) {
    try {
      const raw = localStorage.getItem(key);
      return raw === null ? fallback : JSON.parse(raw);
    } catch { return fallback; }
  }
  function writeStorage(key, value) {
    try { localStorage.setItem(key, JSON.stringify(value)); } catch { /* private mode */ }
  }

  function loadCart() {
    const raw = readStorage(KEYS.cart, {});
    const clean = {};
    if (raw && typeof raw === 'object' && !Array.isArray(raw)) {
      Object.entries(raw).forEach(([id, qty]) => {
        const product = productById(id);
        const amount = Number(qty);
        if (product && Number.isFinite(amount) && amount > 0) {
          clean[product.id] = Math.min(MAX_QTY, Math.floor(amount));
        }
      });
    }
    return clean;
  }
  function loadFavorites() {
    const raw = readStorage(KEYS.favorites, []);
    const ids = Array.isArray(raw) ? raw : [];
    return new Set(ids.map(Number).filter((id) => productById(id)));
  }
  function loadOrders() {
    const raw = readStorage(KEYS.orders, []);
    return Array.isArray(raw)
      ? raw.filter((order) => order && typeof order.code === 'string' && Array.isArray(order.items)
          && order.customer && typeof order.customer === 'object')
      : [];
  }

  let cart = loadCart();
  let favorites = loadFavorites();
  let orders = loadOrders();
  let currentFilter = 'all';
  let currentSort = 'popular';
  let searchTerm = '';
  let searchNorm = '';
  let quickProduct = null;
  let quickQty = 1;
  let promoApplied = false;
  let openOverlays = [];
  let lastFocusedBeforeOverlay = null;
  const overlayTimers = new WeakMap();
  const mediaMatches = (query) => (typeof window.matchMedia === 'function' ? window.matchMedia(query).matches : false);
  const prefersReducedMotion = mediaMatches('(prefers-reduced-motion: reduce)');
  const canHover = mediaMatches('(hover: hover) and (pointer: fine)');

  const dom = {
    header: $('siteHeader'),
    nav: $('mainNav'),
    menuToggle: $('menuToggle'),
    productGrid: $('productGrid'),
    menuResult: $('menuResult'),
    sortSelect: $('sortSelect'),
    cartOverlay: $('cartOverlay'),
    cartItems: $('cartItems'),
    cartCount: $('cartCount'),
    cartTotal: $('cartTotal'),
    drawerCount: $('drawerCount'),
    shippingProgress: $('shippingProgress'),
    freeShipText: $('freeShipText'),
    freeShipBar: $('freeShipBar'),
    checkoutBtn: $('checkoutBtn'),
    quickView: $('quickViewModal'),
    checkout: $('checkoutModal'),
    checkoutFormWrap: $('checkoutFormWrap'),
    checkoutForm: $('checkoutForm'),
    checkoutItems: $('checkoutItems'),
    checkoutSubtotal: $('checkoutSubtotal'),
    checkoutShipping: $('checkoutShipping'),
    discountRow: $('discountRow'),
    checkoutDiscount: $('checkoutDiscount'),
    checkoutTotal: $('checkoutTotal'),
    placeOrderBtn: $('placeOrderBtn'),
    promoCode: $('promoCode'),
    promoMsg: $('promoMsg'),
    removePromo: $('removePromo'),
    checkoutSuccess: $('checkoutSuccess'),
    successCode: $('successCode'),
    successInfo: $('successInfo'),
    ordersModal: $('ordersModal'),
    ordersList: $('ordersList'),
    favOverlay: $('favoritesModal'),
    favList: $('favList'),
    favCount: $('favCount'),
    infoOverlay: $('infoModal'),
    mobileCartBar: $('mobileCartBar'),
    mobileBarCount: $('mobileBarCount'),
    mobileBarTotal: $('mobileBarTotal'),
    toast: $('toast'),
    accountModal: $('accountModal'),
    accountBtn: $('accountBtn'),
    accountDot: $('accountDot'),
    footerAccountBtn: $('footerAccountBtn'),
    authTabs: $('authTabs'),
    loginForm: $('loginForm'),
    loginError: $('loginError'),
    registerForm: $('registerForm'),
    registerError: $('registerError'),
    accountProfile: $('accountProfile'),
    accountTitle: $('accountTitle'),
    accountInitials: $('accountInitials'),
    accountGreeting: $('accountGreeting'),
    accountEmail: $('accountEmail'),
    logoutBtn: $('logoutBtn')
  };

  /* ---------- Intro (chỉ chạy lần đầu trong phiên) ---------- */
  const intro = $('intro');
  let introSeen = false;
  try { introSeen = sessionStorage.getItem('luminary-intro-seen') === '1'; } catch { /* private mode */ }

  if (intro && !prefersReducedMotion && !introSeen) {
    document.body.classList.add('is-intro');
    const introPercent = $('introPercent');
    let introDone = false;
    let introFrame = 0;
    const finishIntro = () => {
      if (introDone) return;
      introDone = true;
      cancelAnimationFrame(introFrame);
      if (introPercent) introPercent.textContent = '100%';
      document.body.classList.remove('is-intro');
      document.body.classList.add('intro-skipped');
      intro.classList.add('is-done');
      try { sessionStorage.setItem('luminary-intro-seen', '1'); } catch { /* private mode */ }
    };
    const startIntro = performance.now();
    const tickIntro = (now) => {
      const progress = Math.min(1, (now - startIntro) / 1900);
      if (introPercent) introPercent.textContent = `${Math.round(progress * 100)}%`;
      if (progress < 1 && !introDone) introFrame = requestAnimationFrame(tickIntro);
    };
    introFrame = requestAnimationFrame(tickIntro);
    setTimeout(finishIntro, 2900);
    window.addEventListener('load', () => setTimeout(finishIntro, 2500), { once: true });
    intro.addEventListener('click', finishIntro);
    window.addEventListener('keydown', finishIntro, { once: true });
  } else if (intro) {
    intro.classList.add('is-done');
    document.body.classList.add('intro-skipped');
  }

  /* ---------- Image helper ---------- */
  function picture(base, alt, sizes, widths = [480, 800], attrs = '') {
    const srcset = widths.map((w) => `images/webp/${base}-${w}.webp ${w}w`).join(', ');
    return `<picture><source type="image/webp" srcset="${srcset}" sizes="${sizes}" />`
      + `<img src="images/${base}.jpg" alt="${escapeHtml(alt)}" decoding="async" ${attrs} /></picture>`;
  }

  /* ---------- Toast ---------- */
  let toastTimer;
  function showToast(message) {
    dom.toast.textContent = message;
    dom.toast.classList.add('is-show');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => dom.toast.classList.remove('is-show'), 2600);
  }

  /* ---------- Theme sáng / tối (pastel, lưu localStorage) ---------- */
  function applyTheme(mode) {
    const dark = mode === 'dark';
    document.documentElement.classList.toggle('dark', dark);
    const btn = $('themeBtn');
    if (btn) {
      btn.setAttribute('aria-label', dark ? 'Chuyển sang giao diện sáng' : 'Chuyển sang giao diện tối');
      btn.setAttribute('aria-pressed', String(dark));
    }
    const label = $('themeLabel');
    if (label) label.textContent = dark ? 'Tối' : 'Sáng';
  }

  let savedTheme = null;
  try { savedTheme = localStorage.getItem(KEYS.theme); } catch { /* private mode */ }
  const systemDark = !savedTheme && mediaMatches('(prefers-color-scheme: dark)');
  applyTheme(savedTheme === 'dark' || systemDark ? 'dark' : 'light');

  function toggleTheme() {
    const dark = !document.documentElement.classList.contains('dark');
    applyTheme(dark ? 'dark' : 'light');
    try { localStorage.setItem(KEYS.theme, dark ? 'dark' : 'light'); } catch { /* private mode */ }
    showToast(dark ? 'Đã chuyển sang giao diện Tối 🌙' : 'Đã chuyển sang giao diện Sáng ☀️');
  }
  if ($('themeBtn')) $('themeBtn').addEventListener('click', toggleTheme);
  if ($('footerThemeBtn')) $('footerThemeBtn').addEventListener('click', toggleTheme);

  /* ---------- Account demo: localStorage, không có backend/đăng nhập thật ---------- */
  const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

  function loadUsers() {
    const raw = readStorage(KEYS.users, {});
    const clean = {};
    if (raw && typeof raw === 'object' && !Array.isArray(raw)) {
      Object.entries(raw).forEach(([email, user]) => {
        const key = String(email).trim().toLowerCase();
        if (!EMAIL_RE.test(key) || !user || typeof user !== 'object') return;
        const name = String(user.name || '').trim();
        const password = String(user.password || '');
        if (name.length >= 2 && password.length >= 6) clean[key] = { name, password };
      });
    }
    return clean;
  }

  let users = loadUsers();

  function currentUser() {
    let email = null;
    try { email = localStorage.getItem(KEYS.session); } catch { /* private mode */ }
    const key = typeof email === 'string' ? email.trim().toLowerCase() : '';
    if (!users[key]) {
      if (key) { try { localStorage.removeItem(KEYS.session); } catch { /* private mode */ } }
      return null;
    }
    return { email: key, name: users[key].name };
  }

  function writeSession(email) {
    try {
      if (email) localStorage.setItem(KEYS.session, String(email).toLowerCase());
      else localStorage.removeItem(KEYS.session);
    } catch { /* private mode */ }
  }

  function initialsFor(name, email) {
    const parts = String(name || '').trim().split(/\s+/).filter(Boolean);
    if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
    if (parts.length > 1) return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
    return String(email || 'LM').slice(0, 2).toUpperCase();
  }

  function setAuthTab(tab) {
    const register = tab === 'register';
    dom.authTabs.querySelectorAll('[data-auth-tab]').forEach((button) => {
      const active = (button.dataset.authTab === 'register') === register;
      button.classList.toggle('is-active', active);
      button.setAttribute('aria-selected', String(active));
    });
    dom.loginForm.hidden = register;
    dom.registerForm.hidden = !register;
    dom.loginError.textContent = '';
    dom.registerError.textContent = '';
  }

  function showAccountProfile(user) {
    if (!user) return;
    dom.accountInitials.textContent = initialsFor(user.name, user.email);
    dom.accountGreeting.textContent = `Chào ${user.name},`;
    dom.accountEmail.textContent = user.email;
  }

  function renderAccountUI() {
    const user = currentUser();
    const logged = Boolean(user);
    dom.accountDot.hidden = !logged;
    dom.accountBtn.setAttribute('aria-label', logged ? `Tài khoản của ${user.name}` : 'Đăng nhập tài khoản');
    dom.accountBtn.setAttribute('title', logged ? user.name : 'Tài khoản');
    dom.footerAccountBtn.textContent = logged ? `Tài khoản: ${user.name}` : 'Tài khoản của tôi';
    dom.accountTitle.textContent = logged ? 'Tài khoản của bạn' : 'Chào bạn đến Luminary';
    dom.authTabs.hidden = logged;
    dom.loginForm.hidden = logged;
    dom.registerForm.hidden = logged;
    dom.accountProfile.hidden = !logged;
    if (logged) showAccountProfile(user);
    else setAuthTab('login');
  }

  function focusAccountPrimary() {
    const target = dom.accountProfile.hidden ? $('loginEmail') : dom.logoutBtn;
    if (target) setTimeout(() => target.focus(), 90);
  }

  function openAccount(trigger) {
    renderAccountUI();
    openOverlay(dom.accountModal, trigger || dom.accountBtn);
  }

  function clearAuthForms() {
    $('loginPassword').value = '';
    $('registerPassword').value = '';
    dom.loginError.textContent = '';
    dom.registerError.textContent = '';
  }

  // Chỉ điền ô còn trống: không ghi đè thông tin người dùng đã gõ tay.
  function syncCheckoutWithUser() {
    const user = currentUser();
    if (!user) return;
    [['fullName', user.name], ['email', user.email]].forEach(([id, value]) => {
      const field = $(id);
      if (field && !field.value.trim()) field.value = value;
    });
  }

  if (dom.accountBtn) dom.accountBtn.addEventListener('click', (event) => openAccount(event.currentTarget));
  if (dom.footerAccountBtn) dom.footerAccountBtn.addEventListener('click', (event) => openAccount(event.currentTarget));

  if (dom.authTabs) {
    dom.authTabs.addEventListener('click', (event) => {
      const tab = event.target.closest('[data-auth-tab]');
      if (tab) setAuthTab(tab.dataset.authTab);
    });
  }

  dom.loginForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const email = $('loginEmail').value.trim().toLowerCase();
    const password = $('loginPassword').value;
    if (!EMAIL_RE.test(email) || password.length < 6) {
      dom.loginError.textContent = 'Nhập đúng email và mật khẩu (ít nhất 6 ký tự).';
      return;
    }
    const user = users[email];
    if (!user || user.password !== password) {
      dom.loginError.textContent = 'Email hoặc mật khẩu chưa đúng. Thử lại nhé.';
      $('loginPassword').value = '';
      $('loginPassword').focus();
      return;
    }
    writeSession(email);
    clearAuthForms();
    renderAccountUI();
    focusAccountPrimary();
    showToast(`Chào ${user.name}, đăng nhập thành công 💕`);
  });

  dom.registerForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const name = $('registerName').value.trim();
    const email = $('registerEmail').value.trim().toLowerCase();
    const password = $('registerPassword').value;
    if (name.length < 2) {
      dom.registerError.textContent = 'Vui lòng nhập họ tên (ít nhất 2 ký tự).';
      return;
    }
    if (!EMAIL_RE.test(email)) {
      dom.registerError.textContent = 'Email chưa đúng định dạng.';
      return;
    }
    if (password.length < 6) {
      dom.registerError.textContent = 'Mật khẩu cần ít nhất 6 ký tự.';
      return;
    }
    if (users[email]) {
      dom.registerError.textContent = 'Email này đã có tài khoản. Hãy đăng nhập nhé.';
      return;
    }
    users[email] = { name, password };
    writeStorage(KEYS.users, users);
    writeSession(email);
    clearAuthForms();
    renderAccountUI();
    focusAccountPrimary();
    showToast('Tạo tài khoản thành công, chào bạn đến Luminary!');
  });

  if (dom.logoutBtn) {
    dom.logoutBtn.addEventListener('click', () => {
      writeSession(null);
      clearAuthForms();
      renderAccountUI();
      focusAccountPrimary();
      showToast('Đã đăng xuất. Hẹn gặp lại bạn!');
    });
  }

  renderAccountUI();

  /* ---------- AURA-style split text: tách tiêu đề thành từ trượt lên ---------- */
  function splitWords() {
    if (prefersReducedMotion) return;
    let index = 0;
    const walk = (node) => {
      if (node.nodeType === 3) {
        if (!node.nodeValue || !node.nodeValue.trim()) return;
        const frag = document.createDocumentFragment();
        node.nodeValue.split(/(\s+)/).forEach((part) => {
          if (!part) return;
          if (/^\s+$/.test(part)) {
            frag.appendChild(document.createTextNode(' '));
            return;
          }
          const wrapper = document.createElement('span');
          wrapper.className = 'w';
          const word = document.createElement('i');
          word.textContent = part;
          word.style.setProperty('--wd', `${(0.08 + index++ * 0.06).toFixed(2)}s`);
          wrapper.appendChild(word);
          frag.appendChild(wrapper);
        });
        if (node.parentNode) node.parentNode.replaceChild(frag, node);
      } else if (node.nodeType === 1 && node.tagName !== 'BR') {
        Array.from(node.childNodes).forEach(walk);
      }
    };
    document.querySelectorAll('[data-split]').forEach(walk);
  }
  splitWords();

  /* ---------- Playful feedback ---------- */
  function replayClass(el, className) {
    if (!el || prefersReducedMotion) return;
    el.classList.remove(className);
    void el.offsetWidth;
    el.classList.add(className);
  }

  function bumpCart() {
    if (prefersReducedMotion) return;
    replayClass(dom.cartCount, 'is-bumping');
    const cartBtn = $('cartBtn');
    replayClass(cartBtn, 'is-bumping');
    replayClass(dom.mobileCartBar, 'is-bumping');
  }

  function flyToCart(sourceEl) {
    if (prefersReducedMotion || !sourceEl) return;
    const target = $('cartBtn');
    if (!target) return;
    const from = sourceEl.getBoundingClientRect();
    const to = target.getBoundingClientRect();
    if (!from.width || !to.width) return;
    const startX = from.left + from.width / 2;
    const startY = from.top + from.height / 2;
    const dot = document.createElement('span');
    dot.className = 'fly-dot';
    dot.setAttribute('aria-hidden', 'true');
    dot.style.left = `${startX}px`;
    dot.style.top = `${startY}px`;
    dot.style.setProperty('--dx', `${to.left + to.width / 2 - startX}px`);
    dot.style.setProperty('--dy', `${to.top + to.height / 2 - startY}px`);
    dot.addEventListener('animationend', () => dot.remove(), { once: true });
    document.body.appendChild(dot);
  }

  function burstHeart(id) {
    if (prefersReducedMotion) return;
    const heart = document.querySelector(`.product-card__heart[data-id="${id}"]`);
    replayClass(heart, 'is-bursting');
  }

  /* ---------- Overlay management ---------- */
  function isVisible(el) {
    return el.offsetParent !== null || el.getClientRects().length > 0;
  }
  function setExpanded(trigger, open) {
    if (trigger && typeof trigger.hasAttribute === 'function' && trigger.hasAttribute('aria-haspopup')) {
      trigger.setAttribute('aria-expanded', String(open));
    }
  }
  function openOverlay(el, trigger) {
    if (openOverlays.includes(el)) return;
    clearTimeout(overlayTimers.get(el));
    if (!openOverlays.length) lastFocusedBeforeOverlay = trigger || document.activeElement;
    el.__trigger = trigger || document.activeElement;
    setExpanded(el.__trigger, true);
    openOverlays.push(el);
    el.hidden = false;
    document.body.classList.add('no-scroll');
    requestAnimationFrame(() => el.classList.add('is-open'));
    updateMobileBar();
    setTimeout(() => {
      const focusables = [...el.querySelectorAll(FOCUSABLE)].filter(isVisible);
      const target = focusables.find((item) => item.hasAttribute('data-autofocus')) || focusables[0];
      if (target) target.focus();
    }, 80);
  }
  // immediate=true dùng khi chuyển thẳng sang overlay khác (giỏ → thanh toán).
  function closeOverlay(el, immediate = false) {
    if (!openOverlays.includes(el)) return;
    clearTimeout(overlayTimers.get(el));
    el.classList.remove('is-open');
    const finalize = () => {
      el.hidden = true;
      openOverlays = openOverlays.filter((item) => item !== el);
      setExpanded(el.__trigger, false);
      el.__trigger = null;
      if (!openOverlays.length) {
        document.body.classList.remove('no-scroll');
        if (lastFocusedBeforeOverlay && isVisible(lastFocusedBeforeOverlay)) {
          lastFocusedBeforeOverlay.focus();
        }
        lastFocusedBeforeOverlay = null;
      }
      updateMobileBar();
    };
    if (immediate) finalize();
    else overlayTimers.set(el, setTimeout(finalize, 320));
  }
  function closeTopOverlay() {
    if (openOverlays.length) closeOverlay(openOverlays[openOverlays.length - 1]);
  }

  document.addEventListener('click', (event) => {
    const closer = event.target.closest('[data-close]');
    if (!closer) return;
    const overlay = closer.closest('.modal');
    if (overlay) closeOverlay(overlay);
  });

  document.addEventListener('keydown', (event) => {
    const target = event.target;
    const typing = target && (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA' || target.isContentEditable);
    // Phím "/" mở nhanh thanh tìm kiếm, giống thói quen trên nhiều web hiện đại.
    if (event.key === '/' && !typing && !openOverlays.length) {
      event.preventDefault();
      openSearch();
      return;
    }
    if (event.key === 'Escape') {
      closeTopOverlay();
      closeMenu();
      closeSearch();
      return;
    }
    if (event.key !== 'Tab' || !openOverlays.length) return;
    const active = openOverlays[openOverlays.length - 1];
    const focusables = [...active.querySelectorAll(FOCUSABLE)].filter(isVisible);
    if (!focusables.length) return;
    const first = focusables[0];
    const last = focusables[focusables.length - 1];
    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault();
      last.focus();
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault();
      first.focus();
    }
  });

  /* ---------- Products ---------- */
  function getVisibleProducts() {
    const list = PRODUCTS.filter((product) => {
      const matchFilter = currentFilter === 'all' || product.category === currentFilter;
      const haystack = normalize(`${product.name} ${product.categoryName} ${product.desc}`);
      return matchFilter && (!searchNorm || haystack.includes(searchNorm));
    });
    return list.sort((a, b) => {
      if (currentSort === 'price-asc') return a.price - b.price;
      if (currentSort === 'price-desc') return b.price - a.price;
      if (currentSort === 'name') return a.name.localeCompare(b.name, 'vi');
      return b.reviews - a.reviews;
    });
  }

  function renderProducts() {
    const list = getVisibleProducts();
    dom.menuResult.innerHTML = searchTerm
      ? `Tìm thấy <strong>${list.length}</strong> kết quả cho “${escapeHtml(searchTerm)}”`
      : `Hiển thị <strong>${list.length}</strong> món bánh`;

    if (!list.length) {
      dom.productGrid.innerHTML = `<div class="empty-state"><span>🧁</span><p>Không tìm thấy bánh phù hợp. Thử từ khóa khác nhé!</p></div>`;
      return;
    }

    dom.productGrid.innerHTML = list.map((product, index) => {
      const liked = favorites.has(product.id);
      const discount = product.oldPrice ? Math.round((1 - product.price / product.oldPrice) * 100) : 0;
      const badge = discount
        ? `<span class="product-card__badge product-card__badge--sale">−${discount}%</span>`
        : (product.badge ? `<span class="product-card__badge ${product.badgeClass}">${product.badge}</span>` : '');
      return `
        <article class="product-card" style="animation-delay:${Math.min(index * 50, 350)}ms">
          <div class="product-card__media">
            ${picture(product.image, product.name, '(max-width: 600px) 92vw, (max-width: 1100px) 45vw, 30vw', product.widths, `width="${product.w}" height="${product.h}" loading="lazy"`)}
            ${badge}
            <button class="product-card__heart ${liked ? 'is-liked' : ''}" data-action="favorite" data-id="${product.id}"
                    aria-label="${liked ? 'Bỏ yêu thích' : 'Yêu thích'} ${escapeHtml(product.name)}" aria-pressed="${liked}">${liked ? '♥' : '♡'}</button>
            <button class="product-card__view" data-action="view" data-id="${product.id}">Xem nhanh</button>
          </div>
          <div class="product-card__body">
            <span class="product-card__cat">${product.categoryName}</span>
            <h3 class="product-card__title"><button data-action="view" data-id="${product.id}">${product.name}</button></h3>
            <div class="product-card__rating" role="img" aria-label="Đánh giá ${product.rating} trên 5">★★★★★ <span>${product.rating} (${product.reviews})</span></div>
            <p class="product-card__desc">${product.desc}</p>
            <div class="product-card__foot">
              <div class="price">${money(product.price)}${product.oldPrice ? `<small>${money(product.oldPrice)}</small>` : ''}</div>
              <button class="add-btn" data-action="add" data-id="${product.id}" aria-label="Thêm ${escapeHtml(product.name)} vào giỏ hàng">+</button>
            </div>
          </div>
        </article>`;
    }).join('');
  }

  dom.productGrid.addEventListener('click', (event) => {
    const button = event.target.closest('[data-action]');
    if (!button) return;
    const id = Number(button.dataset.id);
    if (button.dataset.action === 'add') addToCart(id, 1, false, button);
    if (button.dataset.action === 'favorite') toggleFavorite(id);
    if (button.dataset.action === 'view') openQuickView(id);
  });

  const FILTERS = [
    { key: 'all', label: 'Tất cả', icon: '✳' },
    { key: 'cake', label: 'Bánh kem', icon: '🎂' },
    { key: 'mousse', label: 'Mousse', icon: '🍫' },
    { key: 'pastry', label: 'Pastry', icon: '🥐' },
    { key: 'macaron', label: 'Macaron', icon: '🌸' },
    { key: 'cookie', label: 'Quy & brownie', icon: '🍪' }
  ];

  function renderFilterChips() {
    const row = $('filterChips');
    if (!row) return;
    row.innerHTML = FILTERS.map(({ key, label, icon }) => {
      const count = key === 'all' ? PRODUCTS.length : PRODUCTS.filter((p) => p.category === key).length;
      return `<button type="button" class="chip" data-filter="${key}" aria-pressed="false">${icon} ${label} <small>${count}</small></button>`;
    }).join('');
  }

  function syncFilterUI(filter) {
    document.querySelectorAll('.menu-cat').forEach((button) => {
      const active = button.dataset.filter === filter;
      button.classList.toggle('active', active);
      button.setAttribute('aria-pressed', String(active));
    });
    document.querySelectorAll('.chip').forEach((button) => {
      const active = button.dataset.filter === filter;
      button.classList.toggle('is-active', active);
      button.setAttribute('aria-pressed', String(active));
    });
    document.querySelectorAll('.category-card').forEach((card) => {
      card.classList.toggle('is-selected', card.dataset.filter === filter);
    });
  }

  function setFilter(filter) {
    currentFilter = filter;
    syncFilterUI(filter);
    renderProducts();
  }

  const chipRow = $('filterChips');
  if (chipRow) {
    chipRow.addEventListener('click', (event) => {
      const chip = event.target.closest('.chip');
      if (chip) setFilter(chip.dataset.filter);
    });
  }

  document.querySelectorAll('.menu-cat').forEach((button) => {
    button.addEventListener('click', () => setFilter(button.dataset.filter));
  });
  document.querySelectorAll('.category-card').forEach((card) => {
    card.addEventListener('click', () => {
      setFilter(card.dataset.filter);
      $('products').scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  });
  dom.sortSelect.addEventListener('change', () => {
    currentSort = dom.sortSelect.value;
    renderProducts();
  });
  document.querySelectorAll('.menu-cat').forEach((button) => {
    const key = button.dataset.filter;
    const count = key === 'all' ? PRODUCTS.length : PRODUCTS.filter((p) => p.category === key).length;
    const badge = button.querySelector('b');
    if (badge) badge.textContent = count;
  });

  function renderFavBadge() {
    if (!dom.favCount) return;
    dom.favCount.textContent = favorites.size > 99 ? '99+' : String(favorites.size);
    dom.favCount.hidden = favorites.size === 0;
  }

  function renderFavorites() {
    if (!dom.favList) return;
    const liked = PRODUCTS.filter((product) => favorites.has(product.id));
    dom.favList.innerHTML = liked.length
      ? liked.map((product) => `
          <div class="fav-item">
            <picture><source type="image/webp" srcset="${product.widths.map((w) => `images/webp/${product.image}-${w}.webp ${w}w`).join(', ')}" sizes="64px" /><img src="images/${product.image}.jpg" alt="${escapeHtml(product.name)}" width="${product.w}" height="${product.h}" loading="lazy" /></picture>
            <div class="fav-item__info">
              <strong>${escapeHtml(product.name)}</strong>
              <small>${money(product.price)}</small>
            </div>
            <div class="fav-item__actions">
              <button type="button" class="btn btn--outline btn--small" data-fav-view="${product.id}">Xem</button>
              <button type="button" class="btn btn--primary btn--small" data-fav-add="${product.id}">Thêm</button>
              <button type="button" class="fav-item__remove" data-fav-remove="${product.id}" aria-label="Bỏ ${escapeHtml(product.name)} khỏi yêu thích">✕</button>
            </div>
          </div>`).join('')
      : `<div class="empty-state"><span>♡</span><p>Chưa có món nào trong danh sách yêu thích.</p><small>Bấm vào trái tim trên món bánh bạn thích nhé!</small></div>`;
    const titleCount = $('favoritesCount');
    if (titleCount) titleCount.textContent = `(${liked.length})`;
  }

  function openFavorites(trigger) {
    renderFavorites();
    openOverlay(dom.favOverlay, trigger);
  }

  function toggleFavorite(id) {
    const product = productById(id);
    if (!product) return;
    const wasLiked = favorites.has(id);
    if (wasLiked) {
      favorites.delete(id);
      showToast('Đã bỏ khỏi danh sách yêu thích');
    } else {
      favorites.add(id);
      showToast('Đã thêm vào danh sách yêu thích ♥');
      replayClass($('favBtn'), 'is-bumping');
    }
    writeStorage(KEYS.favorites, [...favorites]);

    // Cập nhật đúng nút được bấm, không render lại toàn bộ grid (giữ focus).
    const heart = document.querySelector(`.product-card__heart[data-id="${id}"]`);
    if (heart) {
      const liked = !wasLiked;
      heart.classList.toggle('is-liked', liked);
      heart.setAttribute('aria-pressed', String(liked));
      heart.setAttribute('aria-label', `${liked ? 'Bỏ yêu thích' : 'Yêu thích'} ${product.name}`);
      heart.textContent = liked ? '♥' : '♡';
    }
    renderFavBadge();
    if (!dom.favOverlay.hidden) renderFavorites();
    if (!wasLiked) burstHeart(id);
  }

  if (dom.favList) {
    dom.favList.addEventListener('click', (event) => {
      const view = event.target.closest('[data-fav-view]');
      if (view) {
        closeOverlay(dom.favOverlay, true);
        openQuickView(Number(view.dataset.favView), $('favBtn'));
        return;
      }
      const add = event.target.closest('[data-fav-add]');
      if (add) {
        addToCart(Number(add.dataset.favAdd), 1, false, add);
        closeOverlay(dom.favOverlay, true);
        openCart($('favBtn'));
        return;
      }
      const remove = event.target.closest('[data-fav-remove]');
      if (remove) toggleFavorite(Number(remove.dataset.favRemove));
    });
  }
  if ($('favBtn')) $('favBtn').addEventListener('click', (event) => openFavorites(event.currentTarget));

  /* ---------- Cart ---------- */
  function cartEntries() {
    return Object.entries(cart)
      .map(([id, qty]) => ({ product: productById(id), qty }))
      .filter((entry) => entry.product && entry.qty > 0);
  }
  function cartCount() {
    return cartEntries().reduce((sum, entry) => sum + entry.qty, 0);
  }
  function cartSubtotal() {
    return cartEntries().reduce((sum, entry) => sum + entry.product.price * entry.qty, 0);
  }
  function saveCart() { writeStorage(KEYS.cart, cart); }

  function addToCart(id, amount = 1, silent = false, sourceEl = null) {
    const product = productById(id);
    if (!product) return;
    cart[product.id] = Math.min(MAX_QTY, (cart[product.id] || 0) + amount);
    saveCart();
    renderCart();
    renderCheckout();
    if (!silent) {
      showToast(`Đã thêm ${product.name} vào giỏ 🧁`);
      bumpCart();
      flyToCart(sourceEl);
    }
  }
  function changeQty(id, delta) {
    const next = (cart[id] || 0) + delta;
    if (next <= 0) delete cart[id];
    else cart[id] = Math.min(MAX_QTY, next);
    saveCart();
    renderCart();
    renderCheckout();
  }
  function removeFromCart(id) {
    delete cart[id];
    saveCart();
    renderCart();
    renderCheckout();
    showToast('Đã xóa sản phẩm khỏi giỏ');
  }

  function renderCart() {
    const entries = cartEntries();
    const count = cartCount();
    const subtotal = cartSubtotal();
    const remaining = FREE_SHIP - subtotal;

    dom.cartCount.textContent = count > 99 ? '99+' : count;
    dom.drawerCount.textContent = `(${count})`;
    dom.cartTotal.textContent = money(subtotal);

    if (subtotal > 0) {
      dom.shippingProgress.hidden = false;
      dom.freeShipText.textContent = remaining > 0
        ? `Mua thêm ${money(remaining)} để được miễn phí giao hàng 🎁`
        : '🎉 Tuyệt! Đơn của bạn đã được miễn phí giao hàng.';
      dom.freeShipBar.style.width = `${Math.min(100, (subtotal / FREE_SHIP) * 100)}%`;
    } else {
      dom.shippingProgress.hidden = true;
    }

    if (!entries.length) {
      dom.cartItems.innerHTML = `
        <div class="cart-empty">
          <span aria-hidden="true">🧁</span>
          <p>Giỏ hàng còn trống</p>
          <small>Thêm một chút ngọt ngào vào nhé!</small>
          <button type="button" class="btn btn--outline btn--small" data-close>Quay lại thực đơn</button>
        </div>`;
    } else {
      dom.cartItems.innerHTML = entries.map(({ product, qty }) => `
        <div class="cart-item">
          <picture>
            <source type="image/webp" srcset="images/webp/${product.image}-480.webp" />
            <img src="images/${product.image}.jpg" alt="${escapeHtml(product.name)}" width="76" height="76" loading="lazy" />
          </picture>
          <div class="cart-item__info">
            <strong>${product.name}</strong>
            <small>${money(product.price * qty)}</small>
            <div class="qty" role="group" aria-label="Số lượng ${escapeHtml(product.name)}">
              <button data-cart-action="minus" data-id="${product.id}" aria-label="Giảm số lượng">−</button>
              <span>${qty}</span>
              <button data-cart-action="plus" data-id="${product.id}" aria-label="Tăng số lượng">+</button>
            </div>
          </div>
          <button class="cart-remove" data-cart-action="remove" data-id="${product.id}" aria-label="Xóa ${escapeHtml(product.name)}">✕</button>
        </div>`).join('');
    }
    updateMobileBar();
  }

  dom.cartItems.addEventListener('click', (event) => {
    const button = event.target.closest('[data-cart-action]');
    if (!button) return;
    const id = Number(button.dataset.id);
    if (button.dataset.cartAction === 'plus') changeQty(id, 1);
    if (button.dataset.cartAction === 'minus') changeQty(id, -1);
    if (button.dataset.cartAction === 'remove') removeFromCart(id);
  });

  function openCart(trigger) { openOverlay(dom.cartOverlay, trigger); }

  $('cartBtn').addEventListener('click', (event) => openCart(event.currentTarget));
  $('mobileBarBtn').addEventListener('click', (event) => openCart(event.currentTarget));
  dom.checkoutBtn.addEventListener('click', (event) => openCheckout(event.currentTarget));

  /* ---------- Quick view ---------- */
  const PAIRINGS = {
    1: [12, 15], 2: [10, 15], 3: [13, 10], 4: [13, 15], 5: [15, 12],
    6: [12, 15], 7: [15, 10], 8: [13, 12], 9: [15, 13], 10: [2, 13],
    11: [13, 12], 12: [15, 10], 13: [11, 15], 14: [13, 10], 15: [12, 10]
  };

  function renderQuickPairing(product) {
    const box = $('quickPairing');
    const list = $('quickPairingList');
    if (!box || !list) return;
    const picks = (PAIRINGS[product.id] || [])
      .map(productById)
      .filter((item) => item && item.id !== product.id)
      .slice(0, 2);
    if (!picks.length) {
      box.hidden = true;
      list.innerHTML = '';
      return;
    }
    box.hidden = false;
    list.innerHTML = picks.map((item) => `
      <div class="pair-item">
        <img src="images/${item.image}.jpg" alt="" width="34" height="34" loading="lazy" />
        <strong>${escapeHtml(item.name)}</strong>
        <button type="button" data-pair="${item.id}" aria-label="Thêm ${escapeHtml(item.name)} vào giỏ">+</button>
      </div>`).join('');
  }

  if ($('quickPairingList')) {
    $('quickPairingList').addEventListener('click', (event) => {
      const button = event.target.closest('[data-pair]');
      if (!button) return;
      addToCart(Number(button.dataset.pair), 1, false, button);
    });
  }

  function openQuickView(id, trigger) {
    const product = productById(id);
    if (!product) return;
    quickProduct = product;
    quickQty = 1;
    $('quickMedia').innerHTML = picture(product.image, product.name, '(max-width: 900px) 90vw, 380px', product.widths, `width="${product.w}" height="${product.h}" loading="eager"`);
    $('quickCategory').textContent = product.categoryName;
    $('quickTitle').textContent = product.name;
    $('quickRating').innerHTML = `★★★★★ <span>${product.rating} (${product.reviews} đánh giá)</span>`;
    $('quickRating').setAttribute('role', 'img');
    $('quickRating').setAttribute('aria-label', `Đánh giá ${product.rating} trên 5`);
    $('quickDesc').textContent = product.desc;
    $('quickPrice').innerHTML = `${money(product.price)}${product.oldPrice ? `<small>${money(product.oldPrice)}</small>` : ''}`;
    renderQuickPairing(product);
    $('quickQtyValue').textContent = quickQty;
    openOverlay(dom.quickView, trigger || document.activeElement);
  }
  $('quickMinus').addEventListener('click', () => {
    quickQty = Math.max(1, quickQty - 1);
    $('quickQtyValue').textContent = quickQty;
  });
  $('quickPlus').addEventListener('click', () => {
    quickQty = Math.min(MAX_QTY, quickQty + 1);
    $('quickQtyValue').textContent = quickQty;
  });
  $('quickAddBtn').addEventListener('click', () => {
    if (!quickProduct) return;
    addToCart(quickProduct.id, quickQty, false, $('quickAddBtn'));
    closeOverlay(dom.quickView, true);
    openCart($('cartBtn'));
  });

  /* ---------- Mood matcher ---------- */
  const MOODS = {
    celebrate: { id: 1, label: 'Dành cho ngày vui', reason: 'Dâu tươi và kem béo nhẹ, cắt miếng bánh là có ngay lý do để cười.' },
    cozy: { id: 10, label: 'Dành cho chiều yên tĩnh', reason: 'Quế ấm quyện kem phô mai chảy nhẹ — ăn cùng ly trà là ngon nhất.' },
    treat: { id: 2, label: 'Dành cho bạn', reason: 'Socola 70% đắng thanh, tan mịn trong miệng. Ngọt đúng kiểu người lớn.' },
    gift: { id: 12, label: 'Dành để tặng', reason: 'Sáu sắc pastel xinh xắn, đóng hộp gọn gàng — đưa ai cũng vui.' }
  };
  const moodModal = $('moodModal');
  const moodIntro = $('moodIntro');
  const moodResult = $('moodResult');

  function resetMood() {
    if (!moodIntro || !moodResult) return;
    moodIntro.hidden = false;
    moodResult.hidden = true;
  }

  function showMoodResult(key) {
    const mood = MOODS[key];
    const product = mood && productById(mood.id);
    if (!mood || !product || !moodResult) return;
    moodResult.innerHTML = `
      <div class="mood__result-media">
        ${picture(product.image, product.name, '180px', product.widths, `width="${product.w}" height="${product.h}" loading="lazy"`)}
      </div>
      <div>
        <small>${escapeHtml(mood.label)}</small>
        <h4>${escapeHtml(product.name)}</h4>
        <p>${escapeHtml(mood.reason)}</p>
        <span class="price">${money(product.price)}</span>
        <div class="mood__actions">
          <button type="button" class="btn btn--primary btn--small" data-mood-add="${product.id}">Thêm vào giỏ <span aria-hidden="true">→</span></button>
          <button type="button" class="text-btn" data-mood-again>Chọn tâm trạng khác</button>
        </div>
      </div>`;
    moodIntro.hidden = true;
    moodResult.hidden = false;
    setTimeout(() => {
      const first = moodResult.querySelector('[data-mood-add]');
      if (first) first.focus();
    }, 80);
  }

  if (moodModal) {
    const moodFab = $('moodFab');
    if (moodFab) {
      moodFab.addEventListener('click', (event) => {
        resetMood();
        openOverlay(moodModal, event.currentTarget);
      });
    }
    document.querySelectorAll('.mood__option').forEach((button) => {
      button.addEventListener('click', () => showMoodResult(button.dataset.mood));
    });
    if (moodResult) moodResult.addEventListener('click', (event) => {
      if (event.target.closest('[data-mood-again]')) {
        resetMood();
        const first = moodIntro && moodIntro.querySelector('.mood__option');
        if (first) first.focus();
        return;
      }
      const add = event.target.closest('[data-mood-add]');
      if (!add) return;
      addToCart(Number(add.dataset.moodAdd), 1, false, add);
      closeOverlay(moodModal);
    });
  }

  /* ---------- Journal: mẹo nhỏ từ bếp (layout tin tức kiểu AURA) ---------- */
  const JOURNAL = [
    {
      slug: 'giu-dau-tuoi',
      topic: 'MẸO BẾP',
      title: 'Giữ dâu tươi lâu hơn cho mẻ bánh cuối tuần',
      date: '12.11.2026',
      read: '3 phút đọc',
      image: 'cake-strawberry',
      w: 1920,
      h: 1371,
      excerpt: 'Chọn dâu và bảo quản đúng cách để lớp kem trên bánh luôn đỏ au, không ra nước.',
      body: [
        'Dâu rất dễ mất nước sau khi rửa, vì vậy chúng tôi chỉ rửa trái cây ngay trước khi trang trí. Nếu rửa sớm, hãy để dâu ráo hoàn toàn trên khăn sạch rồi mới cất vào hộp có lót giấy thấm.',
        'Chọn quả còn cuống xanh, bề mặt bóng và không có vết mềm. Dâu chín quá ngọt nhưng nhanh ra nước, làm lớp kem tươi bị loãng và bánh dễ trượt lớp trang trí.',
        'Với bánh kem nhà làm, xếp dâu lên ngay trước khi giao cho khách. Phết một lớp kem mỏng dưới mỗi lát dâu để tạo lớp rào giữ ẩm — mẹo nhỏ nhưng bánh đẹp lâu hơn đáng kể.'
      ]
    },
    {
      slug: 'bo-that',
      topic: 'NGUYÊN LIỆU',
      title: 'Vì sao bơ thật tạo nên lớp bánh mềm?',
      date: '28.10.2026',
      read: '4 phút đọc',
      image: 'pastry-croissant',
      w: 1920,
      h: 1440,
      excerpt: 'Không có bơ thực vật, không chất bảo quản — chỉ là bơ thật được nhào đúng nhiệt độ.',
      body: [
        'Bơ thật bắt đầu chảy ở nhiệt độ phòng, nên khi nhào bột chúng tôi giữ bơ lạnh và nhào nhanh tay. Những mảnh bơ còn nguyên sẽ tạo lớp hơi trong lúc nướng, giúp bánh xốp mà vẫn ẩm.',
        'Bơ thực vật có thể rẻ hơn và dễ tạo hình, nhưng hương vị thì không thay được. Bơ sữa tươi khi đánh tan tỏa mùi béo nhẹ, quyện cùng trứng và đường tạo nên mùi thơm đặc trưng của bánh nhà làm.',
        'Nếu bạn thử nướng ở nhà, đừng làm chảy bơ trước khi đưa bột vào lò. Làm lạnh khay bột khoảng 20 phút là bước đơn giản giúp lớp bánh bông đều và giòn bên ngoài.'
      ]
    },
    {
      slug: 'tra-uong-kem',
      topic: 'PHỐI HỢP',
      title: 'Gợi ý ly trà uống kèm từng chiếc bánh',
      date: '09.10.2026',
      read: '2 phút đọc',
      image: 'macaron-box',
      w: 1920,
      h: 1440,
      excerpt: 'Một chút đắng thanh của trà giúp vị ngọt của bánh trở nên rõ ràng và nhẹ nhàng hơn.',
      body: [
        'Bánh kem dâu hoặc mousse mâm xôi hợp trà xanh nhẹ, pha loãng và uống ấm. Vị chát nhẹ của trà cân bằng phần kem béo, làm dâu và mâm xôi ngỡ như tươi hơn.',
        'Socola đen và brownie lại hợp trà đen hoặc trà hồng trà ít đường. Uống một ngụm trà giữa hai miếng bánh để đầu lưỡi được "reset", vì thế miếng sau vẫn ngon như miếng đầu.',
        'Macaron pastel và bánh quy bơ thì hợp trà iced không đường. Với hộp quà, chúng tôi thường kèm một gói trà nhỏ để người nhận có ngay một buổi chiều ngọt ngào đúng điệu.'
      ]
    }
  ];

  function renderJournal() {
    const grid = $('journalGrid');
    if (!grid) return;
    grid.innerHTML = JOURNAL.map((post, index) => `
      <button type="button" class="journal-card reveal" data-journal="${post.slug}" style="--delay:${index * 90}ms"
              aria-label="Đọc bài: ${escapeHtml(post.title)}">
        <span class="journal-card__media">
          ${picture(post.image, post.title, '(max-width: 600px) 92vw, (max-width: 900px) 45vw, 30vw', IMAGE_WIDTHS[post.image], `width="${post.w}" height="${post.h}" loading="lazy"`)}
          <span class="journal-card__topic">${post.topic}</span>
        </span>
        <span class="journal-card__body">
          <span class="journal-card__meta">${post.date} · ${post.read}</span>
          <span class="journal-card__title">${escapeHtml(post.title)}</span>
          <span class="journal-card__excerpt">${escapeHtml(post.excerpt)}</span>
          <span class="journal-card__more">Đọc bài viết →</span>
        </span>
      </button>`).join('');
  }

  function openJournal(slug, trigger) {
    const post = JOURNAL.find((item) => item.slug === slug);
    const modal = $('journalModal');
    if (!post || !modal) return;
    $('journalTopic').textContent = post.topic;
    $('journalTitle').textContent = post.title;
    $('journalMeta').textContent = `${post.date} · ${post.read} · Bếp Luminary`;
    $('journalCover').innerHTML = picture(post.image, post.title, '(max-width: 900px) 90vw, 640px', IMAGE_WIDTHS[post.image], `width="${post.w}" height="${post.h}" loading="eager"`);
    $('journalBody').innerHTML = post.body.map((paragraph) => `<p>${escapeHtml(paragraph)}</p>`).join('');
    openOverlay(modal, trigger || document.activeElement);
    const dialog = modal.querySelector('.article-dialog');
    if (dialog) replayClass(dialog, 'anim');
  }

  const journalGrid = $('journalGrid');
  if (journalGrid) {
    journalGrid.addEventListener('click', (event) => {
      const card = event.target.closest('[data-journal]');
      if (card) openJournal(card.dataset.journal, card);
    });
  }

  /* ---------- Shop info & image credits ---------- */
  const CREDITS = [
    ['hero.jpg', 'Shixart1985', 'CC BY 2.0', 'https://commons.wikimedia.org/wiki/File:A_beautifully_arranged_dessert_table_set_outside_showcases_a_pastel-colored_cake_adorned_with_flowers.jpg'],
    ['cake-strawberry.jpg', 'Karl Thomas Moore', 'CC BY-SA 4.0', 'https://commons.wikimedia.org/wiki/File:Strawberry_Cake_I.jpg'],
    ['cake-chocolate.jpg', 'Daria Yakovleva', 'CC0', 'https://commons.wikimedia.org/wiki/File:Piece_of_chocolate_cake_on_a_white_plate_decorated_with_chocolate_sauce.jpg'],
    ['cake-matcha.jpg', 'MichaellaaRubio', 'CC BY 4.0', 'https://commons.wikimedia.org/wiki/File:Matcha_Tiramisu_Cake.jpg'],
    ['pastry-croissant.jpg', 'SKopp', 'CC BY-SA 3.0', 'https://commons.wikimedia.org/wiki/File:Croissant,_cross_section.jpg'],
    ['about-baker.jpg', 'Karen Zhou', 'CC BY-SA 4.0', 'https://commons.wikimedia.org/wiki/File:Pastry_chef,_Frida_Backe.jpg'],
    ['cake-cheesecake.jpg', 'Peachyeung316', 'CC BY-SA 4.0', 'https://commons.wikimedia.org/wiki/File:A_little_cheesecake_with_blueberry.jpg'],
    ['cake-swiss-roll.jpg', 'Evan-Amos', 'CC0', 'https://commons.wikimedia.org/wiki/File:LD-Swiss-Cake-Rolls.jpg'],
    ['cake-tiramisu.jpg', 'Sharon Chen', 'CC BY 2.0', 'https://commons.wikimedia.org/wiki/File:Classic_Italian_Tiramisu-3_(29989504485).jpg'],
    ['mousse-raspberry.jpg', 'Unsplash', 'Unsplash License', 'https://images.unsplash.com/photo-1621303837174-89787a7d4729'],
    ['mousse-panna-cotta.jpg', 'Insatiable Munchies', 'CC BY 2.0', 'https://commons.wikimedia.org/wiki/File:Panna_cotta_with_chocolate_mousse.jpg'],
    ['pastry-cinnamon.jpg', 'Andy Li', 'CC0', 'https://commons.wikimedia.org/wiki/File:Cinnamon_bun_-_Milfey_Patisserie_2026-08-31.jpg'],
    ['pastry-fruit-tart.jpg', 'Prayitno', 'CC BY 2.0', 'https://commons.wikimedia.org/wiki/File:Fruit_Tart_(14863357020).jpg'],
    ['macaron-box.jpg', 'AlphaLemur', 'CC BY-SA 4.0', 'https://commons.wikimedia.org/wiki/File:Box_of_Macarons.jpg'],
    ['macaron-vanilla.jpg', 'Michelle Naherny', 'CC BY-SA 4.0', 'https://commons.wikimedia.org/wiki/File:VanillaMacaron.jpg'],
    ['cookie-brownie.jpg', 'Unsplash', 'Unsplash License', 'https://images.unsplash.com/photo-1606313564200-e75d5e30476c'],
    ['cookie-choc-chip.jpg', 'Unsplash', 'Unsplash License', 'https://images.unsplash.com/photo-1499636136210-6f4ee915583e']
  ];

  function renderCredits() {
    const list = $('creditList');
    if (!list) return;
    list.innerHTML = CREDITS.map(([file, author, license, url]) => `
      <li>${escapeHtml(file)} — ${escapeHtml(author)} · <a href="${escapeHtml(url)}" target="_blank" rel="noopener noreferrer">${escapeHtml(license)}</a></li>`).join('');
  }

  function openInfo(key, trigger) {
    document.querySelectorAll('[data-info-panel]').forEach((panel) => {
      panel.hidden = panel.dataset.infoPanel !== key;
    });
    if (key === 'credits') renderCredits();
    if (dom.infoOverlay) openOverlay(dom.infoOverlay, trigger);
  }
  document.querySelectorAll('[data-info]').forEach((button) => {
    button.addEventListener('click', (event) => openInfo(button.dataset.info, event.currentTarget));
  });
  document.querySelectorAll('[data-social]').forEach((link) => {
    link.addEventListener('click', (event) => {
      event.preventDefault();
      showToast(`Kênh ${link.dataset.social} đang được cập nhật nhé`);
    });
  });

  /* ---------- Checkout ---------- */
  function deliveryMethod() {
    return document.querySelector('input[name="deliveryMethod"]:checked')?.value || 'express';
  }
  function shippingFee(subtotal, method) {
    return method === 'pickup' ? 0 : (subtotal >= FREE_SHIP ? 0 : SHIP_FEE);
  }
  function discountAmount(subtotal) {
    return promoApplied ? Math.round(subtotal * 0.1) : 0;
  }
  function syncPickupFields() {
    const pickup = deliveryMethod() === 'pickup';
    ['district', 'address'].forEach((id) => {
      const field = $(id).closest('.field');
      field.classList.toggle('field--optional', pickup);
      const star = field.querySelector('span');
      if (star) star.hidden = pickup;
    });
  }
  function renderCheckout() {
    const entries = cartEntries();
    const subtotal = cartSubtotal();
    const fee = shippingFee(subtotal, deliveryMethod());
    const discount = discountAmount(subtotal);

    dom.checkoutItems.innerHTML = entries.length
      ? entries.map(({ product, qty }) => `
          <div class="checkout-item">
            <picture>
              <source type="image/webp" srcset="images/webp/${product.image}-480.webp" />
              <img src="images/${product.image}.jpg" alt="" width="46" height="46" loading="lazy" />
            </picture>
            <div><strong>${product.name}</strong><small>Số lượng: ${qty}</small></div>
            <b>${money(product.price * qty)}</b>
          </div>`).join('')
      : '<p class="cart-note">Giỏ hàng của bạn đang trống.</p>';

    dom.checkoutSubtotal.textContent = money(subtotal);
    dom.checkoutShipping.textContent = fee ? money(fee) : 'Miễn phí';
    dom.discountRow.hidden = !promoApplied;
    dom.checkoutDiscount.textContent = `−${money(discount)}`;
    dom.checkoutTotal.textContent = money(Math.max(0, subtotal - discount + fee));
    dom.placeOrderBtn.disabled = !entries.length;
    syncPickupFields();
    $('expressFeeLabel').textContent = subtotal >= FREE_SHIP
      ? 'Miễn phí giao hàng cho đơn này 🎉'
      : `${money(SHIP_FEE)} · Miễn phí từ ${money(FREE_SHIP)}`;
  }

  function openCheckout(trigger) {
    if (!cartCount()) {
      showToast('Giỏ hàng của bạn đang trống 🧁');
      return;
    }
    dom.checkoutFormWrap.hidden = false;
    dom.checkoutSuccess.hidden = true;
    clearErrors();
    syncCheckoutWithUser();
    renderCheckout();
    const finalTrigger = openOverlays.includes(dom.cartOverlay) ? $('cartBtn') : trigger;
    closeOverlay(dom.cartOverlay, true);
    openOverlay(dom.checkout, finalTrigger);
  }

  document.querySelectorAll('input[name="deliveryMethod"]').forEach((radio) => {
    radio.addEventListener('change', renderCheckout);
  });

  $('applyPromo').addEventListener('click', () => {
    const code = dom.promoCode.value.trim().toUpperCase();
    if (!code) {
      dom.promoMsg.textContent = 'Nhập mã giảm giá trước nhé.';
      dom.promoMsg.style.color = 'var(--danger)';
      return;
    }
    if (code !== 'GIAM10') {
      dom.promoMsg.textContent = 'Mã không hợp lệ. Gõ GIAM10 để được giảm 10%.';
      dom.promoMsg.style.color = 'var(--danger)';
      return;
    }
    if (promoApplied) {
      dom.promoMsg.textContent = 'Mã này đã được áp dụng rồi.';
      dom.promoMsg.style.color = 'var(--success)';
      return;
    }
    promoApplied = true;
    dom.promoMsg.textContent = 'Áp dụng thành công! Bạn được giảm 10% 🎉';
    dom.promoMsg.style.color = 'var(--success)';
    dom.promoCode.disabled = true;
    $('applyPromo').disabled = true;
    if (dom.removePromo) dom.removePromo.hidden = false;
    renderCheckout();
  });

  if (dom.removePromo) {
    dom.removePromo.addEventListener('click', () => {
      promoApplied = false;
      dom.promoCode.disabled = false;
      dom.promoCode.value = '';
      $('applyPromo').disabled = false;
      dom.removePromo.hidden = true;
      dom.promoMsg.textContent = 'Đã bỏ mã giảm giá.';
      dom.promoMsg.style.color = 'var(--text-muted)';
      renderCheckout();
    });
  }

  function clearErrors() {
    document.querySelectorAll('.field__error').forEach((el) => { el.textContent = ''; });
    document.querySelectorAll('.field').forEach((el) => el.classList.remove('invalid'));
  }
  function setError(id, message) {
    const input = $(id);
    const field = input.closest('.field');
    if (field) field.classList.add('invalid');
    const error = document.querySelector(`[data-error-for="${id}"]`);
    if (error) error.textContent = message;
  }
  function validateCheckout() {
    clearErrors();
    const pickup = deliveryMethod() === 'pickup';
    const value = (id) => $(id).value.trim();
    const phone = value('phone').replace(/[\s.\-()]/g, '');
    const rules = [
      ['fullName', value('fullName').length >= 2 || 'Vui lòng nhập họ tên (ít nhất 2 ký tự).'],
      ['phone', /^(0|\+84)[3-9]\d{8}$/.test(phone) || 'Số điện thoại không hợp lệ.'],
      ['email', /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(value('email')) || 'Email không hợp lệ.'],
      ['city', Boolean(value('city')) || 'Vui lòng chọn tỉnh / thành phố.'],
      ['district', pickup || Boolean(value('district')) || 'Vui lòng nhập quận / huyện.'],
      ['address', pickup || Boolean(value('address')) || 'Vui lòng nhập địa chỉ nhận bánh.']
    ];
    const invalid = rules.filter(([, result]) => result !== true);
    invalid.forEach(([id, message]) => setError(id, message));
    if (invalid.length) {
      $(invalid[0][0]).focus();
      showToast('Vui lòng kiểm tra lại thông tin đặt hàng.');
      return false;
    }
    return true;
  }

  function makeOrderCode() {
    const now = new Date();
    const date = `${String(now.getFullYear()).slice(-2)}${String(now.getMonth() + 1).padStart(2, '0')}${String(now.getDate()).padStart(2, '0')}`;
    const rand = Math.floor(1000 + Math.random() * 9000);
    return `LM${date}-${rand}`;
  }

  /* Gửi đơn về máy chủ, không chờ phản hồi để giữ luồng đặt hàng mượt.
     Nếu mở bằng file:// hoặc chạy test jsdom thì chỉ lưu tại trình duyệt. */
  function syncOrderToServer(order) {
    if (typeof fetch !== 'function' || typeof window === 'undefined') return;
    if (!/^https?:$/.test(window.location.protocol)) return;
    if (/jsdom/i.test(window.navigator.userAgent || '')) return;

    try {
      fetch('/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(order),
        keepalive: true
      })
        .then((response) => (response.ok ? response.json() : Promise.reject(new Error('Máy chủ từ chối đơn'))))
        .then((result) => {
          if (!result || !result.ok) return;
          const saved = orders.find((item) => item.code === order.code);
          if (saved) {
            saved.synced = true;
            writeStorage(KEYS.orders, orders);
          }
        })
        .catch(() => { /* vẫn giữ đơn trong lịch sử của trình duyệt */ });
    } catch { /* trình duyệt cũ không hỗ trợ fetch */ }
  }

  dom.checkoutForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const entries = cartEntries();
    if (!entries.length) {
      showToast('Giỏ hàng của bạn đang trống 🧁');
      return;
    }
    if (!validateCheckout()) return;

    const method = deliveryMethod();
    const subtotal = cartSubtotal();
    const fee = shippingFee(subtotal, method);
    const discount = discountAmount(subtotal);
    const total = Math.max(0, subtotal - discount + fee);
    const phone = $('phone').value.trim();

    const order = {
      code: makeOrderCode(),
      createdAt: new Date().toISOString(),
      items: entries.map(({ product, qty }) => ({ id: product.id, name: product.name, price: product.price, qty })),
      subtotal,
      shipping: fee,
      discount,
      total,
      customer: {
        fullName: $('fullName').value.trim(),
        phone,
        email: $('email').value.trim(),
        city: $('city').value,
        district: $('district').value.trim(),
        address: $('address').value.trim(),
        note: $('note').value.trim()
      },
      delivery: method,
      payment: document.querySelector('input[name="paymentMethod"]:checked')?.value || 'cod'
    };

    orders.unshift(order);
    orders = orders.slice(0, 20);
    writeStorage(KEYS.orders, orders);

    cart = {};
    promoApplied = false;
    dom.promoCode.value = '';
    dom.promoCode.disabled = false;
    $('applyPromo').disabled = false;
    if (dom.removePromo) dom.removePromo.hidden = true;
    dom.promoMsg.textContent = '';
    saveCart();
    renderCart();
    renderCheckout();
    renderOrders();

    dom.successCode.textContent = order.code;
    const destination = method === 'pickup' ? 'tại tiệm 128 Nguyễn Huệ, Quận 1' : `${order.customer.address}, ${order.customer.district}, ${order.customer.city}`;
    dom.successInfo.textContent = `Tổng đơn ${money(total)} · Giao ${destination}. Chúng tôi sẽ gọi ${phone} để xác nhận sớm nhất nhé!`;
    dom.checkoutForm.reset();
    clearErrors();
    dom.checkoutFormWrap.hidden = true;
    dom.checkoutSuccess.hidden = false;
    showToast('Đặt hàng thành công! Mã đơn đã được lưu 💕');
    syncOrderToServer(order);
  });

  $('successViewOrders').addEventListener('click', () => {
    closeOverlay(dom.checkout, true);
    openOrders($('ordersLink'));
  });

  /* ---------- Order history ---------- */
  function renderOrders() {
    const clearBtn = $('clearOrders');
    if (clearBtn) clearBtn.hidden = !orders.length;
    if (!orders.length) {
      dom.ordersList.innerHTML = `<div class="empty-state"><span>📦</span><p>Bạn chưa có đơn hàng nào. Chọn một món bánh ngon nhé!</p></div>`;
      return;
    }
    dom.ordersList.innerHTML = orders.map((order, index) => {
      const date = new Date(order.createdAt);
      const dateText = Number.isNaN(date.getTime()) ? '' : date.toLocaleString('vi-VN', { dateStyle: 'medium', timeStyle: 'short' });
      const items = order.items.map((item) => `${item.name} ×${item.qty}`).join(', ');
      const place = order.delivery === 'pickup'
        ? 'Tự nhận tại tiệm'
        : `${String(order.customer.district || '')}, ${String(order.customer.city || '')}`;
      return `
        <article class="order-card" style="--delay:${Math.min(index * 70, 420)}ms">
          <div class="order-card__top">
            <div><strong>${escapeHtml(order.code)}</strong><br /><small>${dateText}</small></div>
            <span class="order-card__status">Đang chuẩn bị</span>
          </div>
          <p class="order-card__items">${escapeHtml(items)}</p>
          <div class="order-card__foot">
            <div><small>${escapeHtml(place)}</small><br /><strong>${money(Number(order.total) || 0)}</strong></div>
            <button type="button" class="btn btn--outline btn--small" data-reorder="${escapeHtml(order.code)}">Đặt lại</button>
          </div>
        </article>`;
    }).join('');
  }

  function openOrders(trigger) {
    renderOrders();
    openOverlay(dom.ordersModal, trigger || document.activeElement);
  }
  $('ordersLink').addEventListener('click', (event) => openOrders(event.currentTarget));
  if ($('clearOrders')) {
    $('clearOrders').addEventListener('click', () => {
      if (!orders.length) return;
      orders = [];
      writeStorage(KEYS.orders, orders);
      renderOrders();
      showToast('Đã xóa lịch sử đơn hàng 🧾');
    });
  }
  $('drawerOrdersBtn').addEventListener('click', () => {
    closeOverlay(dom.cartOverlay, true);
    openOrders($('ordersLink'));
  });

  dom.ordersList.addEventListener('click', (event) => {
    const button = event.target.closest('[data-reorder]');
    if (!button) return;
    const order = orders.find((item) => item.code === button.dataset.reorder);
    if (!order) return;
    order.items.forEach((item) => {
      if (productById(item.id)) {
        cart[item.id] = Math.min(MAX_QTY, (cart[item.id] || 0) + item.qty);
      }
    });
    saveCart();
    renderCart();
    renderCheckout();
    closeOverlay(dom.ordersModal, true);
    openCart($('cartBtn'));
    bumpCart();
    showToast('Đã thêm lại các món vào giỏ hàng 🧁');
  });

  /* ---------- Mobile bar ---------- */
  function updateMobileBar() {
    const count = cartCount();
    dom.mobileCartBar.hidden = count === 0 || openOverlays.length > 0;
    dom.mobileBarCount.textContent = `${count} món`;
    dom.mobileBarTotal.textContent = money(cartSubtotal());
  }

  /* ---------- Mobile menu ---------- */
  function closeMenu() {
    dom.nav.classList.remove('is-open');
    dom.menuToggle.setAttribute('aria-expanded', 'false');
  }
  dom.menuToggle.addEventListener('click', () => {
    const open = dom.nav.classList.toggle('is-open');
    dom.menuToggle.setAttribute('aria-expanded', String(open));
  });
  dom.nav.querySelectorAll('.nav__link').forEach((link) => link.addEventListener('click', closeMenu));

  /* ---------- Search ---------- */
  const searchPanel = document.createElement('div');
  searchPanel.className = 'search-panel';
  searchPanel.innerHTML = `
    <div class="search-panel__inner">
      <span aria-hidden="true">🔍</span>
      <label class="sr-only" for="searchInput">Tìm kiếm sản phẩm</label>
      <input type="search" id="searchInput" placeholder="Tìm bánh bạn thích..." autocomplete="off" />
      <button type="button" id="closeSearch" aria-label="Đóng tìm kiếm">✕</button>
      <small id="searchHint">Gõ để tìm trong ${PRODUCTS.length} món</small>
    </div>`;
  dom.header.appendChild(searchPanel);
  const searchInput = $('searchInput');
  const searchHint = $('searchHint');

  function openSearch() {
    searchPanel.classList.add('is-open');
    setTimeout(() => searchInput.focus(), 100);
  }
  let searchTimer = 0;
  function closeSearch() {
    clearTimeout(searchTimer);
    if (!searchPanel.classList.contains('is-open')) return;
    searchPanel.classList.remove('is-open');
    searchInput.value = '';
    searchTerm = '';
    searchNorm = '';
    searchHint.textContent = `Gõ để tìm trong ${PRODUCTS.length} món`;
    renderProducts();
  }
  $('searchBtn').addEventListener('click', () => {
    searchPanel.classList.contains('is-open') ? closeSearch() : openSearch();
  });
  $('closeSearch').addEventListener('click', closeSearch);
  searchInput.addEventListener('input', () => {
    clearTimeout(searchTimer);
    searchTerm = searchInput.value.trim();
    searchNorm = normalize(searchTerm);
    searchTimer = setTimeout(() => {
      const count = getVisibleProducts().length;
      searchHint.textContent = searchTerm ? `${count} món phù hợp` : `Gõ để tìm trong ${PRODUCTS.length} món`;
      renderProducts();
      if (searchTerm) $('products').scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 180);
  });

  /* ---------- Newsletter ---------- */
  $('newsletterForm').addEventListener('submit', (event) => {
    event.preventDefault();
    const email = $('newsletterEmail').value.trim();
    const msg = $('newsletterMsg');
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email)) {
      msg.textContent = 'Vui lòng nhập địa chỉ email hợp lệ nhé.';
      msg.style.color = 'var(--danger)';
      return;
    }
    msg.textContent = 'Đã ghi nhận đăng ký cho bản demo 💌 (chưa gửi email thật). Mã GIAM10 dùng được ở bước thanh toán.';
    msg.style.color = 'var(--success)';
    event.target.reset();
  });

  /* ---------- Scroll progress + parallax ---------- */
  const scrollProgress = $('scrollProgress');
  const toTop = $('toTop');
  const parallaxEls = Array.from(document.querySelectorAll('[data-parallax]'))
    .map((el) => ({ el, speed: parseFloat(el.dataset.parallax) || 0 }))
    .filter((item) => item.speed !== 0);
  let scrollTicking = false;

  function updateScrollEffects() {
    const y = window.scrollY;
    const max = document.documentElement.scrollHeight - window.innerHeight;
    dom.header.classList.toggle('is-scrolled', y > 12);
    if (toTop) toTop.hidden = y < 600;

    if (scrollProgress && scrollProgress.firstElementChild) {
      const percent = max > 0 ? Math.min(100, Math.max(0, (y / max) * 100)) : 0;
      scrollProgress.firstElementChild.style.width = `${percent.toFixed(2)}%`;
    }

    if (!prefersReducedMotion && parallaxEls.length) {
      parallaxEls.forEach(({ el, speed }) => {
        const rect = (el.parentElement || el).getBoundingClientRect();
        if (rect.bottom < -120 || rect.top > window.innerHeight + 120) return;
        const offset = (rect.top + rect.height / 2 - window.innerHeight / 2) * -speed;
        el.style.transform = `translate3d(0, ${offset.toFixed(1)}px, 0)`;
      });
    }
    scrollTicking = false;
  }

  function queueScrollUpdate() {
    if (scrollTicking) return;
    scrollTicking = true;
    requestAnimationFrame(updateScrollEffects);
  }

  window.addEventListener('scroll', queueScrollUpdate, { passive: true });
  window.addEventListener('resize', queueScrollUpdate, { passive: true });
  if (toTop) {
    toTop.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: prefersReducedMotion ? 'auto' : 'smooth' });
    });
  }

  /* ---------- Count-up stats ---------- */
  function animateCount(el) {
    const target = parseFloat(el.dataset.count);
    if (!Number.isFinite(target)) return;
    const decimals = parseInt(el.dataset.decimals || '0', 10);
    const suffix = el.dataset.suffix || '';
    const group = el.dataset.group !== 'false';
    const format = (value) => {
      if (decimals > 0) return value.toFixed(decimals) + suffix;
      const rounded = Math.round(value);
      return (group ? rounded.toLocaleString('vi-VN') : String(rounded)) + suffix;
    };

    if (prefersReducedMotion) {
      el.textContent = format(target);
      return;
    }
    const duration = 1400;
    const start = performance.now();
    el.classList.add('is-counting');
    const step = (now) => {
      const progress = Math.min(1, (now - start) / duration);
      const eased = 1 - Math.pow(1 - progress, 3);
      el.textContent = format(target * eased);
      if (progress < 1) requestAnimationFrame(step);
      else {
        el.textContent = format(target);
        el.classList.remove('is-counting');
      }
    };
    requestAnimationFrame(step);
  }

  /* ---------- Reveal + count observers (quét cả nội dung render động) ---------- */
  const observedReveals = new WeakSet();
  let revealObserver = null;
  if ('IntersectionObserver' in window) {
    revealObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          revealObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
  }

  function observeReveals(root = document) {
    const elements = [];
    if (root.nodeType === 1 && root.matches && root.matches('.reveal')) elements.push(root);
    if (root.querySelectorAll) root.querySelectorAll('.reveal').forEach((el) => elements.push(el));
    elements.forEach((el) => {
      if (observedReveals.has(el) || el.classList.contains('is-visible')) return;
      observedReveals.add(el);
      if (revealObserver) revealObserver.observe(el);
      else el.classList.add('is-visible');
    });
  }
  observeReveals(document);

  // AURA pattern: nội dung thêm vào sau khi tải (journal, giỏ hàng...) vẫn được reveal.
  if ('MutationObserver' in window) {
    new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        Array.from(mutation.addedNodes || []).forEach((node) => {
          if (node.nodeType === 1) observeReveals(node);
        });
      });
    }).observe(document.body, { childList: true, subtree: true });
  }

  if ('IntersectionObserver' in window) {
    const countObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        animateCount(entry.target);
        countObserver.unobserve(entry.target);
      });
    }, { threshold: 0.6 });
    document.querySelectorAll('[data-count]').forEach((el) => countObserver.observe(el));

    const sectionIds = ['home', 'categories', 'products', 'about', 'reviews', 'journal', 'contact'];
    const navObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        document.querySelectorAll('.nav__link').forEach((link) => {
          const active = link.getAttribute('href') === `#${entry.target.id}`;
          link.classList.toggle('active', active);
          if (active) link.setAttribute('aria-current', 'true');
          else link.removeAttribute('aria-current');
        });
      });
    }, { rootMargin: '-45% 0px -50% 0px' });
    sectionIds.forEach((id) => {
      const section = $(id);
      if (section) navObserver.observe(section);
    });
  } else {
    document.querySelectorAll('[data-count]').forEach(animateCount);
  }

  /* ---------- Directional reveals ---------- */
  const aboutVisual = document.querySelector('.about__visual');
  const aboutContent = document.querySelector('.about__content');
  const newsletterInner = document.querySelector('.newsletter__inner');
  if (aboutVisual) aboutVisual.classList.add('reveal--left');
  if (aboutContent) aboutContent.classList.add('reveal--right');
  if (newsletterInner) newsletterInner.classList.add('reveal--scale');

  /* ---------- Magnetic buttons ---------- */
  if (!prefersReducedMotion && canHover) {
    document.querySelectorAll('.magnetic').forEach((button) => {
      button.addEventListener('pointermove', (event) => {
        const rect = button.getBoundingClientRect();
        const x = (event.clientX - rect.left - rect.width / 2) * 0.18;
        const y = (event.clientY - rect.top - rect.height / 2) * 0.24;
        button.style.transform = `translate3d(${x.toFixed(1)}px, ${y.toFixed(1)}px, 0)`;
      });
      button.addEventListener('pointerleave', () => { button.style.transform = ''; });
    });
  }

  /* ---------- Product tilt + cursor shine ---------- */
  if (!prefersReducedMotion && canHover) {
    dom.productGrid.addEventListener('pointermove', (event) => {
      const card = event.target.closest('.product-card');
      if (!card) return;
      const rect = card.getBoundingClientRect();
      const px = (event.clientX - rect.left) / rect.width;
      const py = (event.clientY - rect.top) / rect.height;
      card.style.setProperty('--rx', `${((0.5 - py) * 5).toFixed(2)}deg`);
      card.style.setProperty('--ry', `${((px - 0.5) * 6).toFixed(2)}deg`);
      const media = card.querySelector('.product-card__media');
      if (media) {
        media.style.setProperty('--mx', `${(px * 100).toFixed(1)}%`);
        media.style.setProperty('--my', `${(py * 100).toFixed(1)}%`);
      }
    });
    dom.productGrid.addEventListener('pointerout', (event) => {
      const card = event.target.closest('.product-card');
      if (!card || card.contains(event.relatedTarget)) return;
      card.style.removeProperty('--rx');
      card.style.removeProperty('--ry');
    });
  }

  /* ---------- Category cursor glow ---------- */
  if (!prefersReducedMotion && canHover) {
    const categoryGrid = document.querySelector('.category-grid');
    if (categoryGrid) {
      categoryGrid.addEventListener('pointermove', (event) => {
        const card = event.target.closest('.category-card');
        if (!card) return;
        const rect = card.getBoundingClientRect();
        card.style.setProperty('--mx', `${(((event.clientX - rect.left) / rect.width) * 100).toFixed(1)}%`);
        card.style.setProperty('--my', `${(((event.clientY - rect.top) / rect.height) * 100).toFixed(1)}%`);
      });
    }
  }

  /* ---------- Init ---------- */
  $('fullName').setAttribute('data-autofocus', '');
  renderFilterChips();
  syncFilterUI(currentFilter);
  renderJournal();
  observeReveals($('journalGrid'));
  renderProducts();
  renderCart();
  renderCheckout();
  renderOrders();
  renderFavBadge();
  updateScrollEffects();

  /* Cài đặt PWA để mở trang như ứng dụng và dùng lại shell khi mất mạng. */
  if ('serviceWorker' in navigator && /^https?:$/.test(window.location.protocol)
      && !/jsdom/i.test(window.navigator.userAgent || '')) {
    const registerSW = () => navigator.serviceWorker.register('./sw.js').catch(() => {});
    if (document.readyState === 'complete') registerSW();
    else window.addEventListener('load', registerSW, { once: true });
  }
})();
