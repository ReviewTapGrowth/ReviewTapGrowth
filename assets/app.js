import {
  storeSettings,
  contact,
  openingHours,
  socialLinks,
  products as baseProducts,
  customizationOptions,
  designTemplates,
  faqs,
  businessTypes,
  testimonials,
  orderStatuses,
  shippingMethods as baseShippingMethods,
  discountCodes as baseDiscountCodes,
  policySummaries,
  whyChooseBenefits
} from "./data.js";

const app = document.querySelector("#app");
const storageKeys = {
  cart: "reviewtap_cart_v1",
  orders: "reviewtap_orders_v1",
  messages: "reviewtap_messages_v1",
  productOverrides: "reviewtap_product_overrides_v1",
  customProducts: "reviewtap_custom_products_v1",
  discounts: "reviewtap_discounts_v1",
  shipping: "reviewtap_shipping_v1",
  content: "reviewtap_content_v1",
  cookie: "reviewtap_cookie_consent_v1"
};

const routeAliases = {
  card: "nfc-card",
  "nfc-card": "nfc-card",
  stand: "counter-stand",
  "counter-stand": "counter-stand",
  sticker: "nfc-sticker",
  "nfc-sticker": "nfc-sticker",
  keychain: "keychain",
  bundle: "business-bundle",
  "business-bundle": "business-bundle"
};

const seedOrder = {
  id: "RT-2026-1048",
  createdAt: "2026-07-09T11:30:00.000Z",
  status: "awaiting-approval",
  approvalStatus: "pending",
  customer: {
    fullName: "Alex Example",
    businessName: "Example Studio",
    email: "demo@reviewtap.se",
    phone: "+46 70 000 00 00",
    address: "Example Street 12",
    postalCode: "111 22",
    city: "Stockholm",
    country: "Sweden"
  },
  items: [
    {
      id: "seed-item",
      productId: "counter-stand",
      productName: "ReviewTap Counter Stand",
      image: "product-stand.webp",
      unitPrice: 249,
      quantity: 1,
      customization: {
        templateId: "clean-white-blue",
        businessName: "Example Studio",
        headline: "How was your visit?",
        colorId: "google-blue",
        orientation: "portrait",
        qrEnabled: true,
        logoEnabled: true,
        reviewLink: "https://g.page/r/example/review"
      }
    }
  ],
  subtotal: 249,
  discount: 0,
  shipping: 49,
  total: 298,
  shippingMethod: "standard-tracked",
  estimatedDelivery: "2–5 business days after production",
  history: [
    { status: "received", date: "2026-07-09T11:30:00.000Z" },
    { status: "design-preparation", date: "2026-07-09T14:15:00.000Z" },
    { status: "awaiting-approval", date: "2026-07-10T09:10:00.000Z" }
  ],
  designPreview: "assets/images/product-stand.webp",
  comments: [
    {
      author: "ReviewTap design team",
      role: "admin",
      text: "Your first digital preview is ready. Please check the business name, colours and layout.",
      date: "2026-07-10T09:10:00.000Z"
    }
  ],
  internalNotes: []
};

const state = {
  cart: readStorage(storageKeys.cart, []),
  orders: readStorage(storageKeys.orders, [seedOrder]),
  messages: readStorage(storageKeys.messages, []),
  productOverrides: readStorage(storageKeys.productOverrides, {}),
  customProducts: readStorage(storageKeys.customProducts, []),
  discounts: readStorage(storageKeys.discounts, baseDiscountCodes),
  shippingMethods: readStorage(storageKeys.shipping, baseShippingMethods),
  siteContent: readStorage(storageKeys.content, {
    heroHeadline: "Get More Google Reviews With One Simple Tap",
    heroDescription:
      "ReviewTap helps your customers leave a Google review in seconds. No searching, no typing and no complicated instructions—just tap or scan.",
    heroImage: "assets/images/hero-reviewtap.webp",
    email: contact.email,
    phoneDisplay: contact.phoneDisplay,
    phoneHref: contact.phoneHref
  }),
  appliedDiscountCode: "",
  checkoutShippingId: "standard-tracked",
  customize: null,
  customizeEditingItemId: null,
  currentRoute: "/",
  adminTab: "overview",
  adminOrderId: null,
  trackResultId: null
};

function readStorage(key, fallback) {
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : structuredClone(fallback);
  } catch {
    return structuredClone(fallback);
  }
}

function writeStorage(key, value) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
    return true;
  } catch {
    if (document.querySelector("#toast-region")) {
      showToast(
        "Device storage is full",
        "Your current session still works, but this change may not persist after reload.",
        "error"
      );
    }
    return false;
  }
}

function escapeHtml(value = "") {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function money(value) {
  return new Intl.NumberFormat("sv-SE", {
    style: "currency",
    currency: "SEK",
    maximumFractionDigits: 0
  }).format(Number(value) || 0);
}

function formatDate(value, withTime = false) {
  if (!value) return "—";
  return new Intl.DateTimeFormat("en-GB", {
    dateStyle: "medium",
    ...(withTime ? { timeStyle: "short" } : {})
  }).format(new Date(value));
}

function uid(prefix = "id") {
  return `${prefix}-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 7)}`;
}

function icon(name, className = "") {
  const paths = {
    check: '<path d="m5 12 4 4L19 6" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"/>',
    arrow: '<path d="M5 12h14m-5-5 5 5-5 5" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>',
    tap: '<path d="M8 11a4 4 0 0 1 4-4m-6 4a6 6 0 0 1 6-6m1 7V9.5a1.5 1.5 0 0 0-3 0V15l-1.6-1.4a1.45 1.45 0 0 0-2.1 2l4 4a3 3 0 0 0 2.1.9H16a3 3 0 0 0 3-3V13a1.5 1.5 0 0 0-3 0v-1a1.5 1.5 0 0 0-3 0Z" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"/>',
    choose: '<rect x="4" y="5" width="16" height="14" rx="3" fill="none" stroke="currentColor" stroke-width="1.8"/><path d="M8 9h8M8 13h5" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/>',
    design: '<path d="m12 3 2.1 4.9L19 10l-4.9 2.1L12 17l-2.1-4.9L5 10l4.9-2.1L12 3Z" fill="none" stroke="currentColor" stroke-width="1.7"/><path d="m18.5 16 .8 1.7 1.7.8-1.7.8-.8 1.7-.8-1.7-1.7-.8 1.7-.8.8-1.7Z" fill="currentColor"/>',
    review: '<path d="M4 5.5A2.5 2.5 0 0 1 6.5 3h11A2.5 2.5 0 0 1 20 5.5v8a2.5 2.5 0 0 1-2.5 2.5H11l-4.8 4v-4A2.4 2.4 0 0 1 4 13.5v-8Z" fill="none" stroke="currentColor" stroke-width="1.8"/><path d="m12 6.6.8 1.6 1.8.3-1.3 1.3.3 1.8-1.6-.9-1.6.9.3-1.8-1.3-1.3 1.8-.3.8-1.6Z" fill="currentColor"/>',
    shield: '<path d="M12 3 20 6v5c0 5-3.4 8.6-8 10-4.6-1.4-8-5-8-10V6l8-3Z" fill="none" stroke="currentColor" stroke-width="1.8"/><path d="m8.5 12 2.2 2.2 4.8-5" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/>',
    cart: '<path d="M3 4h2l2.1 9.5a2 2 0 0 0 2 1.6h7.7a2 2 0 0 0 2-1.6L20 8H6m3 12h.01M17 20h.01" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round"/>',
    plus: '<path d="M12 5v14M5 12h14" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>',
    upload: '<path d="M12 16V4m-4 4 4-4 4 4M5 14v5h14v-5" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/>',
    lock: '<rect x="5" y="10" width="14" height="11" rx="2.5" fill="none" stroke="currentColor" stroke-width="1.8"/><path d="M8 10V7a4 4 0 0 1 8 0v3" fill="none" stroke="currentColor" stroke-width="1.8"/>',
    mail: '<rect x="3" y="5" width="18" height="14" rx="2.5" fill="none" stroke="currentColor" stroke-width="1.8"/><path d="m4 7 8 6 8-6" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"/>',
    phone: '<path d="M7 3H5a2 2 0 0 0-2 2c0 8.8 7.2 16 16 16a2 2 0 0 0 2-2v-2l-4.6-1.2-1 2.4a13.7 13.7 0 0 1-9.6-9.6l2.4-1L7 3Z" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"/>',
    clock: '<circle cx="12" cy="12" r="9" fill="none" stroke="currentColor" stroke-width="1.8"/><path d="M12 7v5l3 2" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/>',
    search: '<circle cx="10.5" cy="10.5" r="6.5" fill="none" stroke="currentColor" stroke-width="1.8"/><path d="m16 16 4 4" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/>',
    box: '<path d="m4 7 8-4 8 4-8 4-8-4Zm0 0v10l8 4 8-4V7M12 11v10" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linejoin="round"/>',
    download: '<path d="M12 3v12m-4-4 4 4 4-4M5 20h14" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/>',
    settings: '<circle cx="12" cy="12" r="3" fill="none" stroke="currentColor" stroke-width="1.8"/><path d="M19 13.5v-3l-2-.6a7 7 0 0 0-.7-1.6l1-1.8-2.1-2.1-1.8 1a7 7 0 0 0-1.6-.7L10.5 3h-3l-.6 2a7 7 0 0 0-1.6.7l-1.8-1L1.4 6.8l1 1.8a7 7 0 0 0-.7 1.6L0 10.5v3l2 .6a7 7 0 0 0 .7 1.6l-1 1.8 2.1 2.1 1.8-1a7 7 0 0 0 1.6.7l.6 2h3l.6-2a7 7 0 0 0 1.6-.7l1.8 1 2.1-2.1-1-1.8a7 7 0 0 0 .7-1.6l2.4-.6Z" fill="none" stroke="currentColor" stroke-width="1.4" transform="translate(2) scale(.83)"/>',
    user: '<circle cx="12" cy="8" r="4" fill="none" stroke="currentColor" stroke-width="1.8"/><path d="M4 21a8 8 0 0 1 16 0" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/>',
    dashboard: '<rect x="3" y="3" width="8" height="8" rx="2" fill="none" stroke="currentColor" stroke-width="1.7"/><rect x="13" y="3" width="8" height="5" rx="2" fill="none" stroke="currentColor" stroke-width="1.7"/><rect x="13" y="10" width="8" height="11" rx="2" fill="none" stroke="currentColor" stroke-width="1.7"/><rect x="3" y="13" width="8" height="8" rx="2" fill="none" stroke="currentColor" stroke-width="1.7"/>',
    message: '<path d="M4 4h16v12H8l-4 4V4Z" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"/>',
    tag: '<path d="m4 4 7 .3 9 9-6.7 6.7-9-9L4 4Z" fill="none" stroke="currentColor" stroke-width="1.8"/><circle cx="8.5" cy="8.5" r="1.3" fill="currentColor"/>',
    edit: '<path d="m4 20 4.5-1 10-10-3.5-3.5-10 10L4 20Zm9-12 3.5 3.5" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"/>',
    alert: '<path d="M12 3 2.5 20h19L12 3Z" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"/><path d="M12 9v5m0 3h.01" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>'
  };
  return `<svg class="${escapeHtml(className)}" viewBox="0 0 24 24" aria-hidden="true">${paths[name] || paths.check}</svg>`;
}

function getProducts() {
  const edited = [...baseProducts, ...state.customProducts].map((product) => ({
    ...product,
    ...(state.productOverrides[product.id] || {})
  }));
  return edited.filter((product) => product.active !== false);
}

function findProduct(id) {
  const normalized = routeAliases[id] || id;
  return getProducts().find((product) => product.id === normalized) || getProducts()[0];
}

function productRouteId(productId) {
  return {
    "nfc-card": "card",
    "counter-stand": "stand",
    "nfc-sticker": "sticker",
    keychain: "keychain",
    "business-bundle": "bundle"
  }[productId] || productId;
}

function imagePath(product) {
  return `assets/images/${product.image}`;
}

function cartCount() {
  return state.cart.reduce((total, item) => total + item.quantity, 0);
}

function updateCartBadges() {
  const count = cartCount();
  document.querySelector("#cart-count").textContent = count;
  document.querySelector("#mobile-cart-label").textContent = `(${count})`;
}

function saveCart() {
  writeStorage(storageKeys.cart, state.cart);
  updateCartBadges();
}

function saveOrders() {
  writeStorage(storageKeys.orders, state.orders);
}

function getDiscount(code) {
  return state.discounts.find(
    (discount) => discount.active && discount.code.toUpperCase() === String(code).trim().toUpperCase()
  );
}

function cartTotals(shippingId = state.checkoutShippingId) {
  const subtotal = state.cart.reduce(
    (sum, item) => sum + Number(item.unitPrice) * Number(item.quantity),
    0
  );
  const code = getDiscount(state.appliedDiscountCode);
  let discount = 0;
  if (code && subtotal >= (code.minimumSubtotalSek || 0)) {
    const eligibleSubtotal = state.cart
      .filter((item) => !code.eligibleProductIds?.length || code.eligibleProductIds.includes(item.productId))
      .reduce((sum, item) => sum + item.unitPrice * item.quantity, 0);
    discount = code.type === "percentage" ? eligibleSubtotal * (code.value / 100) : code.value;
  }
  const method =
    state.shippingMethods.find((item) => item.id === shippingId && item.active) ||
    state.shippingMethods.find((item) => item.active);
  const shipping =
    method && method.freeAboveSek && subtotal >= method.freeAboveSek
      ? 0
      : Number(method?.priceSek || 0);
  return {
    subtotal,
    discount: Math.round(discount),
    shipping,
    total: Math.max(0, subtotal - discount + shipping),
    method
  };
}

function showToast(title, message = "", type = "success") {
  const region = document.querySelector("#toast-region");
  const toast = document.createElement("div");
  toast.className = `toast ${type}`;
  toast.innerHTML = `
    <span class="toast-icon">${type === "error" ? "!" : "✓"}</span>
    <span><strong>${escapeHtml(title)}</strong><span>${escapeHtml(message)}</span></span>
  `;
  region.append(toast);
  window.setTimeout(() => toast.remove(), 4200);
}

function setLoading() {
  app.innerHTML = `
    <div class="page-loading container" role="status">
      <span class="spinner" aria-hidden="true"></span>
      <span>Loading page…</span>
    </div>`;
}

function parseRoute() {
  const raw = location.hash.slice(1) || "/";
  const [pathPart, queryString = ""] = raw.split("?");
  const path = pathPart.startsWith("/") ? pathPart : `/${pathPart}`;
  const segments = path.split("/").filter(Boolean);
  return { path, segments, query: new URLSearchParams(queryString) };
}

function setMeta(route) {
  const labels = {
    "/": ["NFC review cards for local businesses", "Custom NFC and QR review products that make honest customer feedback easier."],
    "/products": ["Products", "Browse ReviewTap NFC cards, stands, stickers, keychains and bundles."],
    "/how-it-works": ["How it works", "Choose, customize and start using your ReviewTap in three simple steps."],
    "/pricing": ["Pricing", "Simple one-time pricing for ReviewTap NFC review products."],
    "/reviews": ["Customer examples", "See example ReviewTap customer stories and our honest-review policy."],
    "/faq": ["Frequently asked questions", "Answers about NFC, compatibility, customization, approval and delivery."],
    "/contact": ["Contact", "Contact ReviewTap for product, order or Google Review link help."],
    "/track": ["Track order", "Check your ReviewTap order and design approval status."],
    "/cart": ["Your cart", "Review your ReviewTap products and customizations."],
    "/checkout": ["Checkout", "Enter your delivery details and prepare your ReviewTap order."]
  };
  let entry = labels[route];
  if (!entry && route.startsWith("/customize/")) entry = ["Customize your product", "Customize a ReviewTap NFC review product with your branding, wording and Google Review link."];
  if (!entry && route.startsWith("/confirmation/")) entry = ["Order confirmation", "ReviewTap demo order confirmation and delivery estimate."];
  if (!entry && route.startsWith("/policy/")) entry = ["Store policy", "ReviewTap store, privacy and customer policy information."];
  if (!entry && route === "/approval") entry = ["Design approval", "Review and approve your ReviewTap product design before production."];
  if (!entry && route === "/admin") entry = ["Store administration", "ReviewTap store administration demo."];
  entry ||= ["ReviewTap", storeSettings.seo.defaultDescription];
  document.title = `${entry[0]} | ReviewTap`;
  document.querySelector('meta[name="description"]').setAttribute("content", entry[1]);
}

function updateActiveNav(path) {
  document.querySelectorAll("[data-nav]").forEach((link) => {
    const key = link.dataset.nav;
    const active = (key === "home" && path === "/") || path.startsWith(`/${key}`);
    if (active) link.setAttribute("aria-current", "page");
    else link.removeAttribute("aria-current");
  });
}

function breadcrumb(current) {
  return `<nav class="breadcrumbs" aria-label="Breadcrumb"><a href="#/">Home</a><span>/</span><span aria-current="page">${escapeHtml(current)}</span></nav>`;
}

function innerHero({ eyebrow, title, description, aside = "" }) {
  return `
    <section class="inner-hero">
      <div class="container ${aside ? "inner-hero-grid" : ""}">
        <div>
          ${breadcrumb(title)}
          <span class="eyebrow">${escapeHtml(eyebrow)}</span>
          <h1>${title}</h1>
          <p>${description}</p>
        </div>
        ${aside}
      </div>
    </section>`;
}

function checkItem(text) {
  return `<span class="trust-item"><span class="check-icon">${icon("check")}</span>${escapeHtml(text)}</span>`;
}

function renderHero() {
  return `
    <section class="hero">
      <div class="container hero-grid">
        <div class="hero-copy">
          <span class="eyebrow">NFC + QR review products</span>
          <h1>${escapeHtml(state.siteContent.heroHeadline)}</h1>
          <p>${escapeHtml(state.siteContent.heroDescription)}</p>
          <div class="hero-actions">
            <a class="button button-primary" href="#/customize/card">Order Your ReviewTap ${icon("arrow")}</a>
            <a class="button button-secondary" href="#/how-it-works">${icon("tap")} See How It Works</a>
          </div>
          <div class="hero-trust" aria-label="Product benefits">
            ${checkItem("No app required")}
            ${checkItem("Works with most smartphones")}
            ${checkItem("Custom-made for your business")}
            ${checkItem("Fast and simple setup")}
          </div>
        </div>
        <div class="hero-visual">
          <div class="hero-image-wrap">
            <img src="${escapeHtml(state.siteContent.heroImage || "assets/images/hero-reviewtap.webp")}" width="1800" height="1200" alt="A customer holding a phone beside an NFC review counter stand" fetchpriority="high" />
          </div>
          <div class="hero-badge">
            <span class="hero-badge-icon">${icon("check")}</span>
            <span><strong>Ready in seconds</strong><span>Tap or scan — no app needed</span></span>
          </div>
        </div>
      </div>
    </section>
    <div class="brand-strip" aria-label="Suitable business types">
      <div class="container brand-strip-inner">
        <span>Built for local business</span>
        <div class="brand-strip-list"><span>Salons</span><span>Restaurants</span><span>Retail</span><span>Clinics</span><span>Services</span><span>Hospitality</span></div>
      </div>
    </div>`;
}

function renderHowSteps() {
  const steps = [
    {
      iconName: "choose",
      title: "1. Choose Your Product",
      description: "Select an NFC card, counter stand, sticker, keychain, or bundle."
    },
    {
      iconName: "design",
      title: "2. Customize It",
      description: "Add your business name, logo, preferred design, and Google Review link."
    },
    {
      iconName: "review",
      title: "3. Start Getting Reviews",
      description: "Place the product at your counter and let customers tap or scan to leave a review."
    }
  ];
  return `
    <div class="step-grid">
      ${steps
        .map(
          (step, index) => `
          <article class="step-card">
            <span class="step-number">0${index + 1}</span>
            <span class="step-icon">${icon(step.iconName)}</span>
            <h3>${step.title}</h3>
            <p>${step.description}</p>
          </article>`
        )
        .join("")}
    </div>`;
}

function productCard(product, featured = false) {
  const lowStock = product.stock < 25;
  const inStock = product.stock > 0;
  return `
    <article class="product-card ${featured ? "featured" : ""}" itemscope itemtype="https://schema.org/Product">
      <div class="product-media">
        <img src="${imagePath(product)}" width="1000" height="1000" alt="${escapeHtml(product.imageAlt)}" loading="lazy" itemprop="image" />
        ${product.badge ? `<span class="product-tag">${escapeHtml(product.badge)}</span>` : ""}
        <span class="stock-badge ${lowStock ? "low" : ""}">${inStock ? (lowStock ? `Only ${product.stock} left` : "In stock") : "Out of stock"}</span>
      </div>
      <div class="product-body">
        <div class="rating" aria-label="${product.rating} out of 5 stars">
          <span class="stars" aria-hidden="true">★★★★★</span>
          <span>${product.rating} · ${product.reviewCount} examples</span>
        </div>
        <h3 itemprop="name">${escapeHtml(product.name)}</h3>
        <p class="product-description" itemprop="description">${escapeHtml(product.description)}</p>
        <div class="product-price" itemprop="offers" itemscope itemtype="https://schema.org/Offer">
          <span><span class="price-prefix">Starting from</span><span class="price-main" itemprop="price" content="${product.startingPriceSek}">${money(product.startingPriceSek)}</span></span>
          <meta itemprop="priceCurrency" content="SEK" /><link itemprop="availability" href="${inStock ? "https://schema.org/InStock" : "https://schema.org/OutOfStock"}" />
        </div>
        <div class="product-actions">
          <a class="button button-secondary" href="#/customize/${productRouteId(product.id)}">Customize</a>
          <button class="button button-primary" data-action="quick-add" data-product-id="${product.id}" ${inStock ? "" : "disabled"}>${icon("cart")} ${inStock ? "Add to Cart" : "Out of stock"}</button>
        </div>
      </div>
    </article>`;
}

function renderProductsGrid(limit = 0) {
  const list = limit ? getProducts().slice(0, limit) : getProducts();
  return `<div class="product-grid">${list.map((product, index) => productCard(product, limit === 5 && index === 4)).join("")}</div>`;
}

function renderBenefits() {
  return `
    <div class="benefit-grid">
      ${whyChooseBenefits
        .map(
          (benefit) => `
          <article class="benefit-card">
            ${icon(benefit.id === "nfc-qr" ? "tap" : benefit.id === "simple-setup" ? "check" : benefit.id === "customized" ? "design" : "review")}
            <h3>${escapeHtml(benefit.title)}</h3>
            <p>${escapeHtml(benefit.description)}</p>
          </article>`
        )
        .join("")}
    </div>`;
}

function renderPolicyNotice() {
  return `
    <aside class="policy-notice">
      <span class="policy-notice-icon">${icon("shield")}</span>
      <div>
        <h3>Honest feedback comes first</h3>
        <p><strong>ReviewTap helps customers access a business’s review page.</strong> Businesses should not offer rewards only for positive reviews, block negative feedback, or mislead customers. All customers should be allowed to leave honest feedback.</p>
      </div>
    </aside>`;
}

function renderBusinesses() {
  return `
    <div class="business-grid">
      ${businessTypes
        .map(
          (business) => `
          <div class="business-chip">
            <span class="business-chip-icon">${icon(["barbershops", "hair-salons"].includes(business.id) ? "design" : business.id === "mobile-businesses" ? "tap" : "check")}</span>
            <span>${escapeHtml(business.name)}</span>
          </div>`
        )
        .join("")}
    </div>`;
}

function renderTestimonials() {
  return `
    <div class="testimonial-grid">
      ${testimonials
        .map(
          (item) => `
          <article class="testimonial-card">
            <span class="example-badge">Example testimonial</span>
            <span class="quote-mark" aria-hidden="true">“</span>
            <div class="stars" aria-label="${item.rating} out of 5 stars">★★★★★</div>
            <blockquote>${escapeHtml(item.quote)}</blockquote>
            <div class="testimonial-person">
              <span class="avatar" aria-hidden="true">${item.customerName.split(" ").map((part) => part[0]).join("")}</span>
              <span><strong>${escapeHtml(item.customerName)}</strong><span>${escapeHtml(item.businessName)}</span></span>
            </div>
          </article>`
        )
        .join("")}
    </div>`;
}

function renderFaqList(items = faqs) {
  return `
    <div class="faq-list">
      ${items
        .map(
          (item, index) => `
          <article class="faq-item">
            <h3>
              <button class="faq-question" data-action="toggle-faq" aria-expanded="${index === 0 ? "true" : "false"}" aria-controls="faq-${item.id}">
                <span>${escapeHtml(item.question)}</span>${icon("plus")}
              </button>
            </h3>
            <div class="faq-answer" id="faq-${item.id}" ${index === 0 ? "" : "hidden"}>
              <p>${escapeHtml(item.answer)}</p>
            </div>
          </article>`
        )
        .join("")}
    </div>`;
}

function renderCta() {
  return `
    <div class="cta-panel">
      <div><span class="eyebrow">Ready when you are</span><h2>Turn a great customer moment into honest feedback.</h2><p>Choose a product, make it yours and approve the design before anything goes into production.</p></div>
      <a class="button button-primary" href="#/customize/card">Start customizing ${icon("arrow")}</a>
    </div>`;
}

function renderHome() {
  return `
    ${renderHero()}
    <section class="section" id="how-it-works">
      <div class="container">
        <div class="section-heading center"><span class="eyebrow">Three simple steps</span><h2>From your idea to your counter</h2><p>No technical setup. We prepare the link, create the design and wait for your approval.</p></div>
        ${renderHowSteps()}
      </div>
    </section>
    <section class="section section-grey" id="products">
      <div class="container">
        <div class="split section-heading"><div><span class="eyebrow">Shop ReviewTap</span><h2>Choose your review touchpoint</h2><p>One-time purchase. Custom design. NFC tap with a QR backup.</p></div><a class="button button-secondary" href="#/products">View all products ${icon("arrow")}</a></div>
        ${renderProductsGrid(5)}
      </div>
    </section>
    <section class="section">
      <div class="container">
        <div class="section-heading center"><span class="eyebrow">Why ReviewTap</span><h2>Small product. Easier feedback.</h2><p>Everything you need to make the journey to your review page clear and convenient.</p></div>
        ${renderBenefits()}
      </div>
    </section>
    <section class="section-sm"><div class="container">${renderPolicyNotice()}</div></section>
    <section class="section section-grey">
      <div class="container">
        <div class="section-heading center"><span class="eyebrow">Made for local business</span><h2>Useful wherever customers finish a visit</h2><p>At the counter, on a table or in your pocket—choose the format that fits how you work.</p></div>
        ${renderBusinesses()}
      </div>
    </section>
    <section class="section">
      <div class="container">
        <div class="section-heading center"><span class="eyebrow">Customer stories</span><h2>What the experience could look like</h2><p>These cards are clearly marked examples until verified customer reviews are available.</p></div>
        ${renderTestimonials()}
      </div>
    </section>
    <section class="section section-grey">
      <div class="narrow">
        <div class="section-heading center"><span class="eyebrow">Quick answers</span><h2>Frequently asked questions</h2><p>Everything from phone compatibility to design approval.</p></div>
        ${renderFaqList(faqs.slice(0, 5))}
        <p class="text-center" style="margin-top:24px"><a class="button button-secondary" href="#/faq">View all FAQs</a></p>
      </div>
    </section>
    <section class="section"><div class="container">${renderCta()}</div></section>`;
}

function renderProductsPage() {
  return `
    ${innerHero({
      eyebrow: "Products",
      title: "A ReviewTap for every customer moment",
      description: "Choose the format that suits your counter, team and customer journey. Every product can be customized before production.",
      aside: `<div class="hero-stat-grid"><div class="hero-stat"><strong>5</strong><span>Product formats</span></div><div class="hero-stat"><strong>NFC + QR</strong><span>Two ways to connect</span></div><div class="hero-stat"><strong>1×</strong><span>One-time purchase</span></div><div class="hero-stat"><strong>100%</strong><span>Design approval first</span></div></div>`
    })}
    <section class="section"><div class="container">${renderProductsGrid()}</div></section>
    <section class="section-sm section-grey"><div class="container">${renderPolicyNotice()}</div></section>
    <section class="section"><div class="container">${renderCta()}</div></section>`;
}

function renderHowPage() {
  return `
    ${innerHero({
      eyebrow: "How it works",
      title: "From link to live in three clear steps",
      description: "Choose a product, personalize it, approve your preview and place it where customers can reach it naturally.",
      aside: `<div class="hero-stat-grid"><div class="hero-stat"><strong>1–2 days</strong><span>Typical first proof</span></div><div class="hero-stat"><strong>No app</strong><span>Needed by customers</span></div><div class="hero-stat"><strong>Tap</strong><span>With QR backup</span></div><div class="hero-stat"><strong>You approve</strong><span>Before production</span></div></div>`
    })}
    <section class="section"><div class="container">${renderHowSteps()}</div></section>
    <section class="section section-grey">
      <div class="narrow">
        <div class="section-heading"><span class="eyebrow">Your Google Review link</span><h2>Finding the right link is easy</h2><p>Paste the direct link into the customizer. If you need help, send your exact business name and address and we’ll help locate the correct page.</p></div>
        <div class="panel stack">
          <div class="cluster"><span class="form-step">1</span><div><strong>Open your Google Business Profile</strong><div class="muted">Sign in to the account that manages your listing.</div></div></div>
          <div class="cluster"><span class="form-step">2</span><div><strong>Choose “Ask for reviews”</strong><div class="muted">Copy the review link Google provides.</div></div></div>
          <div class="cluster"><span class="form-step">3</span><div><strong>Paste and test it</strong><div class="muted">Use our “Test My Review Link” button before ordering.</div></div></div>
        </div>
      </div>
    </section>
    <section class="section"><div class="container">${renderCta()}</div></section>`;
}

function renderPricingPage() {
  return `
    ${innerHero({
      eyebrow: "Simple pricing",
      title: "One-time products. No monthly fee.",
      description: "Start with one product or save with multiple quantities and the Business Bundle. Final pricing updates live as you customize.",
      aside: `<div class="hero-stat-grid"><div class="hero-stat"><strong>99 SEK</strong><span>Lowest starting price</span></div><div class="hero-stat"><strong>0 SEK</strong><span>Monthly subscription</span></div><div class="hero-stat"><strong>5–15%</strong><span>Quantity savings</span></div><div class="hero-stat"><strong>49 SEK</strong><span>Standard shipping</span></div></div>`
    })}
    <section class="section">
      <div class="container">
        <div class="section-heading"><span class="eyebrow">Product pricing</span><h2>Pick your format</h2><p>All starting prices are editable in the admin demo and central data file.</p></div>
        <div class="pricing-table"><table><thead><tr><th>Product</th><th>Best for</th><th>Starting price</th><th>Stock</th><th></th></tr></thead><tbody>
          ${getProducts().map((product) => `<tr><td>${escapeHtml(product.name)}</td><td>${escapeHtml(product.description)}</td><td><strong>${money(product.startingPriceSek)}</strong></td><td>${product.stock}</td><td><a class="button button-small button-primary" href="#/customize/${productRouteId(product.id)}">Customize</a></td></tr>`).join("")}
        </tbody></table></div>
      </div>
    </section>
    <section class="section section-grey">
      <div class="container">
        <div class="section-heading center"><span class="eyebrow">Quantity discounts</span><h2>More touchpoints, better value</h2><p>Automatic volume savings apply to eligible custom products.</p></div>
        <div class="quantity-discount">
          ${customizationOptions.quantity.bulkDiscounts.map((tier) => `<div class="discount-tier"><strong>${tier.percentOff}% off</strong><span>${tier.label}</span></div>`).join("")}
        </div>
      </div>
    </section>
    <section class="section-sm"><div class="container">${renderPolicyNotice()}</div></section>
    <section class="section"><div class="container">${renderCta()}</div></section>`;
}

function renderReviewsPage() {
  return `
    ${innerHero({
      eyebrow: "Customer examples",
      title: "A smoother way to ask for honest feedback",
      description: "ReviewTap reduces the friction between a good customer experience and the place where a customer can choose to share it. Example testimonials below are placeholders until verified reviews are added."
    })}
    <section class="section"><div class="container">${renderTestimonials()}</div></section>
    <section class="section section-grey"><div class="container">${renderPolicyNotice()}</div></section>
    <section class="section">
      <div class="container">
        <div class="section-heading center"><span class="eyebrow">Good practice</span><h2>Invite feedback fairly</h2><p>ReviewTap is a link-access tool—not a promise of positive reviews or higher search rankings.</p></div>
        <div class="step-grid">
          <article class="step-card"><span class="step-icon">${icon("review")}</span><h3>Ask every customer</h3><p>Give all customers the same opportunity to leave honest feedback.</p></article>
          <article class="step-card"><span class="step-icon">${icon("shield")}</span><h3>Never gate reviews</h3><p>Do not block, divert or discourage criticism while only sending happy customers to public reviews.</p></article>
          <article class="step-card"><span class="step-icon">${icon("check")}</span><h3>Keep claims honest</h3><p>Do not offer rewards only for positive feedback or imply that a review must be five stars.</p></article>
        </div>
      </div>
    </section>
    <section class="section"><div class="container">${renderCta()}</div></section>`;
}

function renderFaqPage() {
  return `
    ${innerHero({ eyebrow: "Support", title: "Frequently asked questions", description: "Clear answers about NFC, device compatibility, links, proof approval, ordering and delivery." })}
    <section class="section section-grey"><div class="narrow">${renderFaqList()}</div></section>
    <section class="section"><div class="container">${renderCta()}</div></section>`;
}

function defaultCustomize(productId) {
  const product = findProduct(productId);
  const template = designTemplates[0];
  return {
    productId: product.id,
    quantity: 1,
    colorId: "white",
    styleId: "light",
    orientation: "portrait",
    qrEnabled: true,
    logoEnabled: true,
    headline: template.defaultHeadline,
    businessName: "",
    reviewLink: "",
    socialLink: "",
    instructions: "",
    templateId: template.id,
    logoData: "",
    logoName: ""
  };
}

function customizationPrice(config = state.customize) {
  const product = findProduct(config.productId);
  const color = customizationOptions.colors.find((item) => item.id === config.colorId);
  const style = customizationOptions.designStyles.find((item) => item.id === config.styleId);
  const unitBeforeDiscount =
    Number(product.startingPriceSek) +
    Number(color?.priceAdjustmentSek || 0) +
    Number(style?.priceAdjustmentSek || 0);
  const tier = [...customizationOptions.quantity.bulkDiscounts]
    .reverse()
    .find((item) => config.quantity >= item.minimumQuantity);
  const percent = tier?.percentOff || 0;
  const unit = Math.round(unitBeforeDiscount * (1 - percent / 100));
  return { unit, total: unit * config.quantity, percent };
}

function renderCustomizer(productId, editItemId = "") {
  const product = findProduct(productId);
  const editingItem = editItemId ? state.cart.find((item) => item.id === editItemId) : null;
  if (editingItem && state.customizeEditingItemId !== editingItem.id) {
    state.customize = {
      ...defaultCustomize(editingItem.productId),
      ...structuredClone(editingItem.customization || {}),
      productId: editingItem.productId,
      quantity: editingItem.quantity
    };
    state.customizeEditingItemId = editingItem.id;
  } else if (!editingItem && (!state.customize || state.customize.productId !== product.id || state.customizeEditingItemId)) {
    state.customize = defaultCustomize(product.id);
    state.customizeEditingItemId = null;
  }
  const c = state.customize;
  const price = customizationPrice(c);
  return `
    ${innerHero({
      eyebrow: "Make it yours",
      title: `Customize your ${escapeHtml(product.shortName)}`,
      description: "Choose the details, paste your Google Review link and watch the preview update as you go."
    })}
    <section class="section section-grey">
      <div class="container customizer-shell">
        <form class="form-card" id="customizer-form" novalidate>
          <div class="form-section">
            <div class="form-section-heading"><span class="form-step">1</span><div><h2>Product and quantity</h2><p>Choose the format and number you need.</p></div></div>
            <div class="field-grid">
              <div class="field"><label class="required" for="custom-product">Product type</label><select class="select" id="custom-product" name="productId" required>
                ${getProducts().map((item) => `<option value="${item.id}" ${item.id === c.productId ? "selected" : ""}>${escapeHtml(item.name)} — ${money(item.startingPriceSek)}</option>`).join("")}
              </select></div>
              <div class="field"><label class="required" for="custom-quantity">Quantity</label><input class="input" id="custom-quantity" name="quantity" type="number" min="1" max="${Math.max(1, Math.min(100, product.stock))}" value="${c.quantity}" required /><small>${product.stock} available · automatic discounts from 5 items.</small></div>
            </div>
          </div>
          <div class="form-section">
            <div class="form-section-heading"><span class="form-step">2</span><div><h2>Look and layout</h2><p>Select a color, design style and orientation.</p></div></div>
            <div class="field-grid">
              <div class="field full"><span>Product color</span><div class="color-options">
                ${customizationOptions.colors.map((color) => `<label class="color-option" style="background:${color.hex};color:${["white", "gold"].includes(color.id) ? "#0b1f3a" : "white"}" title="${escapeHtml(color.label)}"><input type="radio" name="colorId" value="${color.id}" aria-label="${escapeHtml(color.label)}" ${color.id === c.colorId ? "checked" : ""}/></label>`).join("")}
              </div>
              <div class="field"><label for="design-style">Design style</label><select class="select" id="design-style" name="styleId">${customizationOptions.designStyles.map((style) => `<option value="${style.id}" ${style.id === c.styleId ? "selected" : ""}>${escapeHtml(style.label)}${style.priceAdjustmentSek ? ` (+${money(style.priceAdjustmentSek)})` : ""}</option>`).join("")}</select></div>
              <div class="field"><label for="orientation">Card orientation</label><select class="select" id="orientation" name="orientation">${customizationOptions.orientations.map((item) => `<option value="${item.id}" ${item.id === c.orientation ? "selected" : ""}>${item.label}</option>`).join("")}</select></div>
              <div class="field"><label for="qr-option">QR code</label><select class="select" id="qr-option" name="qrEnabled"><option value="true" ${c.qrEnabled ? "selected" : ""}>Include QR code</option><option value="false" ${!c.qrEnabled ? "selected" : ""}>No QR code</option></select></div>
              <div class="field"><label for="logo-option">Business logo</label><select class="select" id="logo-option" name="logoEnabled"><option value="true" ${c.logoEnabled ? "selected" : ""}>Include my logo</option><option value="false" ${!c.logoEnabled ? "selected" : ""}>No business logo</option></select></div>
            </div>
          </div>
          <div class="form-section">
            <div class="form-section-heading"><span class="form-step">3</span><div><h2>Choose a template</h2><p>Every template can still use your text and colors.</p></div></div>
            <div class="template-grid">
              ${designTemplates.map((template) => `<label class="template-card" style="--template-accent:${template.primaryColor}"><input type="radio" name="templateId" value="${template.id}" ${template.id === c.templateId ? "checked" : ""}/><strong>${escapeHtml(template.name)}</strong></label>`).join("")}
            </div>
          </div>
          <div class="form-section">
            <div class="form-section-heading"><span class="form-step">4</span><div><h2>Your business details</h2><p>These details appear in the preview and production brief.</p></div></div>
            <div class="field-grid">
              <div class="field full"><label class="required" for="business-name">Business name</label><input class="input" id="business-name" name="businessName" maxlength="60" value="${escapeHtml(c.businessName)}" required/><span class="field-error"></span></div>
              <div class="field full"><label for="custom-headline">Custom headline</label><input class="input" id="custom-headline" name="headline" maxlength="48" value="${escapeHtml(c.headline)}"/><small>Examples: “How was your visit?” or “Tap to review us”.</small></div>
              <div class="field full"><label class="required" for="review-link">Paste your Google Review link here</label><div class="input-group"><input class="input" id="review-link" name="reviewLink" type="url" placeholder="https://g.page/r/…/review" value="${escapeHtml(c.reviewLink)}" required/><button class="button button-secondary" type="button" data-action="test-review-link">Test My Review Link</button></div><span class="field-error"></span></div>
              <div class="field full"><details><summary class="inline-link" style="cursor:pointer">How do I find my Google Review link?</summary><div class="field-help" style="margin-top:10px">Open your Google Business Profile, choose <strong>Ask for reviews</strong>, then copy the link. If you need help, add your exact business name and address in the special instructions.</div></details></div>
              <div class="field full"><label for="social-link">Optional social media link</label><input class="input" id="social-link" name="socialLink" type="url" placeholder="https://instagram.com/yourbusiness" value="${escapeHtml(c.socialLink)}"/></div>
            </div>
          </div>
          <div class="form-section" id="logo-section">
            <div class="form-section-heading"><span class="form-step">5</span><div><h2>Upload your logo</h2><p>PNG, JPG, JPEG or SVG · maximum ${customizationOptions.logoUpload.maximumFileSizeMb} MB in this browser demo.</p></div></div>
            <label class="upload-zone" id="logo-upload-zone">
              <input id="logo-upload" name="logoFile" type="file" accept=".png,.jpg,.jpeg,.svg,image/png,image/jpeg,image/svg+xml" />
              ${icon("upload")}
              <strong>Choose a logo file</strong><small>or drag it here</small>
            </label>
            <div id="logo-upload-result">${c.logoData ? `<div class="upload-result"><img src="${c.logoData}" alt="Uploaded logo preview"/><span>${escapeHtml(c.logoName)}</span></div>` : ""}</div>
          </div>
          <div class="form-section">
            <div class="form-section-heading"><span class="form-step">6</span><div><h2>Special instructions</h2><p>Tell the design team anything else they should know.</p></div></div>
            <div class="field"><label for="instructions">Optional notes</label><textarea class="textarea" id="instructions" name="instructions" maxlength="800" placeholder="Placement, branding notes, help finding your review link…">${escapeHtml(c.instructions)}</textarea></div>
          </div>
        </form>
        <aside class="preview-column">
          <div class="preview-card">
            <div class="preview-head"><h2>Live product preview</h2><span class="live-pill">Live</span></div>
            <div class="preview-stage"><div id="product-preview"></div></div>
            <p class="preview-note">${escapeHtml(customizationOptions.previewNotice)}</p>
          </div>
          <div class="price-box">
            <span><span>Customized total</span><strong id="custom-total">${money(price.total)}</strong><span id="custom-unit">${money(price.unit)} each${price.percent ? ` · ${price.percent}% quantity saving` : ""}</span></span>
            <button class="button button-primary" type="button" data-action="add-custom-to-cart">${icon("cart")} ${state.customizeEditingItemId ? "Update cart" : "Add to cart"}</button>
          </div>
        </aside>
      </div>
    </section>`;
}

function updateCustomizerFromForm() {
  const form = document.querySelector("#customizer-form");
  if (!form) return;
  const data = new FormData(form);
  const selectedProduct = findProduct(data.get("productId"));
  state.customize = {
    ...state.customize,
    productId: data.get("productId"),
    quantity: Math.max(1, Math.min(100, selectedProduct.stock, Number(data.get("quantity")) || 1)),
    colorId: data.get("colorId") || "white",
    styleId: data.get("styleId") || "light",
    orientation: data.get("orientation") || "portrait",
    qrEnabled: data.get("qrEnabled") !== "false",
    logoEnabled: data.get("logoEnabled") !== "false",
    headline: data.get("headline") || "",
    businessName: data.get("businessName") || "",
    reviewLink: data.get("reviewLink") || "",
    socialLink: data.get("socialLink") || "",
    instructions: data.get("instructions") || "",
    templateId: data.get("templateId") || designTemplates[0].id
  };
  updateLivePreview();
}

function updateLivePreview() {
  const target = document.querySelector("#product-preview");
  if (!target || !state.customize) return;
  const c = state.customize;
  const product = findProduct(c.productId);
  const template = designTemplates.find((item) => item.id === c.templateId) || designTemplates[0];
  const color = customizationOptions.colors.find((item) => item.id === c.colorId);
  const background = c.colorId === "white" ? template.backgroundColor : color?.hex || template.backgroundColor;
  const dark = ["navy", "black"].includes(c.colorId) || ["modern-black", "premium-gold", "gym-fitness"].includes(c.templateId);
  const shapeClass =
    product.id === "nfc-sticker"
      ? "round"
      : product.id === "keychain"
        ? "keychain-shape"
        : product.id === "counter-stand"
          ? "stand-shape"
          : "";
  const orientationClass = c.orientation === "landscape" ? "landscape" : "";
  target.innerHTML = `
    <div class="product-preview ${orientationClass} ${shapeClass}" style="background:${background};color:${dark ? "#fff" : template.textColor};--preview-accent:${template.primaryColor}">
      <div class="preview-logo" ${c.logoEnabled ? "" : "hidden"}>${c.logoData ? `<img src="${c.logoData}" alt="Your uploaded logo"/>` : escapeHtml((c.businessName || "RT").slice(0, 2).toUpperCase())}</div>
      <div class="preview-nfc">${icon("tap")}</div>
      <div class="preview-headline">${escapeHtml(c.headline || template.defaultHeadline)}</div>
      <div class="preview-business">${escapeHtml(c.businessName || "Your Business")}</div>
      <div class="preview-stars" aria-label="Five review stars">★★★★★</div>
      ${c.qrEnabled ? '<div class="fake-qr" aria-label="QR code position preview"></div>' : ""}
      <div class="preview-accent"></div>
    </div>`;
  const price = customizationPrice(c);
  document.querySelector("#custom-total").textContent = money(price.total);
  document.querySelector("#custom-unit").textContent = `${money(price.unit)} each${price.percent ? ` · ${price.percent}% quantity saving` : ""}`;
  const logoSection = document.querySelector("#logo-section");
  if (logoSection) logoSection.hidden = !c.logoEnabled;
}

function validateReviewUrl(value) {
  try {
    const url = new URL(value);
    return url.protocol === "https:" || url.protocol === "http:";
  } catch {
    return false;
  }
}

function addCustomToCart() {
  updateCustomizerFromForm();
  const form = document.querySelector("#customizer-form");
  const businessInput = form.querySelector('[name="businessName"]');
  const reviewInput = form.querySelector('[name="reviewLink"]');
  let valid = true;
  if (!state.customize.businessName.trim()) {
    setFieldError(businessInput, "Please enter your business name.");
    valid = false;
  } else setFieldError(businessInput, "");
  if (!validateReviewUrl(state.customize.reviewLink)) {
    setFieldError(reviewInput, "Enter a complete link beginning with https://.");
    valid = false;
  } else setFieldError(reviewInput, "");
  if (!valid) {
    form.querySelector('[aria-invalid="true"]')?.focus();
    showToast("Check your details", "Business name and a working review link are required.", "error");
    return;
  }
  const product = findProduct(state.customize.productId);
  if (product.stock < state.customize.quantity) {
    showToast("Quantity unavailable", `Only ${product.stock} item${product.stock === 1 ? "" : "s"} currently available.`, "error");
    document.querySelector("#custom-quantity")?.focus();
    return;
  }
  const price = customizationPrice(state.customize);
  const cartEntry = {
    id: uid("cart"),
    productId: product.id,
    productName: product.name,
    image: product.image,
    unitPrice: price.unit,
    quantity: state.customize.quantity,
    customization: structuredClone(state.customize),
    requiresCustomization: false
  };
  const editingIndex = state.customizeEditingItemId
    ? state.cart.findIndex((item) => item.id === state.customizeEditingItemId)
    : -1;
  if (editingIndex >= 0) {
    cartEntry.id = state.cart[editingIndex].id;
    state.cart[editingIndex] = cartEntry;
  } else {
    state.cart.push(cartEntry);
  }
  state.customizeEditingItemId = null;
  saveCart();
  showToast(editingIndex >= 0 ? "Cart updated" : "Added to cart", `${product.name} is ready for checkout.`);
  location.hash = "#/cart";
}

function setFieldError(input, message) {
  if (!input) return;
  input.setAttribute("aria-invalid", message ? "true" : "false");
  const field = input.closest(".field");
  const error = field?.querySelector(".field-error");
  if (error) error.textContent = message;
}

function quickAdd(productId) {
  const product = findProduct(productId);
  if (product.stock < 1) {
    showToast("Out of stock", "Choose another ReviewTap product.", "error");
    return;
  }
  const config = defaultCustomize(product.id);
  state.cart.push({
    id: uid("cart"),
    productId: product.id,
    productName: product.name,
    image: product.image,
    unitPrice: product.startingPriceSek,
    quantity: 1,
    customization: config,
    requiresCustomization: true
  });
  saveCart();
  showToast("Added to cart", "You can customize this item before checkout.");
}

function cartItemMarkup(item) {
  const c = item.customization || {};
  const template = designTemplates.find((entry) => entry.id === c.templateId);
  return `
    <article class="cart-item">
      <div class="cart-item-image"><img src="assets/images/${item.image}" alt="${escapeHtml(item.productName)}" /></div>
      <div>
        <h3>${escapeHtml(item.productName)}</h3>
        <div class="cart-meta">
          <span>${escapeHtml(c.businessName || "Customization required")}</span>
          <span>${escapeHtml(template?.name || "Standard design")}</span>
          <span>${c.qrEnabled === false ? "No QR" : "QR included"}</span>
          <span>${escapeHtml(c.orientation || "portrait")}</span>
        </div>
        <div class="cart-item-actions">
          <div class="quantity-control" aria-label="Quantity">
            <button type="button" data-action="cart-decrease" data-item-id="${item.id}" aria-label="Decrease quantity">−</button>
            <span>${item.quantity}</span>
            <button type="button" data-action="cart-increase" data-item-id="${item.id}" aria-label="Increase quantity">+</button>
          </div>
          <a class="inline-link" href="#/customize/${productRouteId(item.productId)}?edit=${encodeURIComponent(item.id)}">${item.requiresCustomization ? "Finish customization" : "Edit design"}</a>
          <button class="remove-link" type="button" data-action="cart-remove" data-item-id="${item.id}">Remove</button>
        </div>
      </div>
      <div class="cart-item-price"><strong>${money(item.unitPrice * item.quantity)}</strong><span>${money(item.unitPrice)} each</span></div>
    </article>`;
}

function summaryMarkup(totals, checkout = false) {
  const incompleteItem = state.cart.find(
    (item) =>
      item.requiresCustomization ||
      !item.customization?.businessName ||
      !validateReviewUrl(item.customization?.reviewLink)
  );
  const customerAction = incompleteItem
    ? `<a class="button button-primary full-width" href="#/customize/${productRouteId(incompleteItem.productId)}?edit=${encodeURIComponent(incompleteItem.id)}">Finish customization ${icon("arrow")}</a>`
    : `<a class="button button-primary full-width" href="#/checkout">Continue to checkout ${icon("arrow")}</a>`;
  return `
    <aside class="order-summary">
      <div class="summary-card">
        <h2>Order summary</h2>
        <div class="summary-line"><span>Subtotal</span><strong>${money(totals.subtotal)}</strong></div>
        ${totals.discount ? `<div class="summary-line discount"><span>Discount</span><strong>−${money(totals.discount)}</strong></div>` : ""}
        <div class="summary-line"><span>Shipping</span><strong>${totals.shipping ? money(totals.shipping) : "Free"}</strong></div>
        <div class="summary-line total"><span>Total</span><strong>${money(totals.total)}</strong></div>
        ${checkout ? "" : `<form class="discount-form" id="discount-form"><label class="hidden" for="discount-code">Discount code</label><input class="input" id="discount-code" name="discountCode" placeholder="Discount code" value="${escapeHtml(state.appliedDiscountCode)}"/><button class="button button-secondary" type="submit">Apply</button></form>`}
        ${checkout ? `<button class="button button-primary full-width" type="submit" form="checkout-form">Place demo order ${icon("arrow")}</button>` : customerAction}
        ${!checkout && incompleteItem ? '<p class="field-help text-danger">Add your business name and review link before checkout.</p>' : ""}
        <div class="secure-row">${icon("lock")}<span>${checkout ? "No real payment details are collected. Connect a secure provider before launch." : "Your cart is saved on this device. A design proof is sent before production."}</span></div>
      </div>
    </aside>`;
}

function renderCart() {
  if (!state.cart.length) {
    return `
      ${innerHero({ eyebrow: "Your cart", title: "Your cart is waiting", description: "Add a ReviewTap product, then customize it for your business." })}
      <section class="section"><div class="container"><div class="empty-state"><div><span class="empty-state-icon">${icon("cart")}</span><h2>Nothing here yet</h2><p>Choose a card, stand, sticker, keychain or bundle to start your order.</p><a class="button button-primary" href="#/products">Browse products ${icon("arrow")}</a></div></div></div></section>`;
  }
  const totals = cartTotals();
  return `
    ${innerHero({ eyebrow: "Your cart", title: `Review your ${cartCount()} ${cartCount() === 1 ? "item" : "items"}`, description: "Check quantities and customization details before continuing to checkout." })}
    <section class="section section-grey">
      <div class="container cart-layout">
        <div class="stack">
          <div class="cart-list">${state.cart.map(cartItemMarkup).join("")}</div>
          <div><a class="button button-secondary" href="#/products">← Continue shopping</a></div>
        </div>
        ${summaryMarkup(totals)}
      </div>
    </section>`;
}

function renderCheckout() {
  const incompleteItem = state.cart.find(
    (item) =>
      item.requiresCustomization ||
      !item.customization?.businessName ||
      !validateReviewUrl(item.customization?.reviewLink)
  );
  if (!state.cart.length || incompleteItem) {
    location.hash = "#/cart";
    return "";
  }
  const totals = cartTotals();
  return `
    ${innerHero({ eyebrow: "Secure checkout preparation", title: "Delivery and order details", description: "Complete your details to create a demo order. No real payment information is requested or stored." })}
    <section class="section section-grey">
      <div class="container">
        <div class="checkout-steps" aria-label="Checkout progress"><span class="checkout-step active" data-step="1"><span>Details</span></span><span class="checkout-step-line"></span><span class="checkout-step active" data-step="2"><span>Delivery</span></span><span class="checkout-step-line"></span><span class="checkout-step active" data-step="3"><span>Confirmation</span></span></div>
        <div class="checkout-layout">
          <form class="form-card" id="checkout-form" novalidate>
            <div class="form-section">
              <div class="form-section-heading"><span class="form-step">1</span><div><h2>Contact information</h2><p>Used for your order confirmation and design approval.</p></div></div>
              <div class="field-grid">
                <div class="field"><label class="required" for="full-name">Full name</label><input class="input" id="full-name" name="fullName" autocomplete="name" required/><span class="field-error"></span></div>
                <div class="field"><label class="required" for="checkout-business">Business name</label><input class="input" id="checkout-business" name="businessName" autocomplete="organization" required/><span class="field-error"></span></div>
                <div class="field"><label class="required" for="checkout-email">Email address</label><input class="input" id="checkout-email" name="email" type="email" autocomplete="email" required/><span class="field-error"></span></div>
                <div class="field"><label class="required" for="checkout-phone">Phone number</label><input class="input" id="checkout-phone" name="phone" type="tel" autocomplete="tel" required/><span class="field-error"></span></div>
              </div>
            </div>
            <div class="form-section">
              <div class="form-section-heading"><span class="form-step">2</span><div><h2>Delivery address</h2><p>Where the finished order should be delivered.</p></div></div>
              <div class="field-grid">
                <div class="field full"><label class="required" for="address">Delivery address</label><input class="input" id="address" name="address" autocomplete="street-address" required/><span class="field-error"></span></div>
                <div class="field"><label class="required" for="postal-code">Postal code</label><input class="input" id="postal-code" name="postalCode" autocomplete="postal-code" required/><span class="field-error"></span></div>
                <div class="field"><label class="required" for="city">City</label><input class="input" id="city" name="city" autocomplete="address-level2" required/><span class="field-error"></span></div>
                <div class="field full"><label class="required" for="country">Country</label><select class="select" id="country" name="country" autocomplete="country-name" required><option value="Sweden">Sweden</option><option value="Denmark">Denmark (shipping quote required)</option><option value="Norway">Norway (shipping quote required)</option><option value="Finland">Finland (shipping quote required)</option><option value="Other">Other (shipping quote required)</option></select><span class="field-error"></span></div>
                <div class="field full"><label for="order-notes">Order notes</label><textarea class="textarea" id="order-notes" name="orderNotes" placeholder="Delivery or order notes…"></textarea></div>
              </div>
            </div>
            <div class="form-section">
              <div class="form-section-heading"><span class="form-step">3</span><div><h2>Billing address</h2><p>Only billing contact details—no payment details.</p></div></div>
              <label class="toggle-row"><span><strong>Billing address is the same as delivery</strong><small>Turn off to enter a separate billing address.</small></span><input type="checkbox" name="billingSame" checked data-action="toggle-billing"/></label>
              <div class="field-grid" id="billing-fields" hidden>
                <div class="field full"><label for="billing-address">Billing address</label><input class="input" id="billing-address" name="billingAddress"/><span class="field-error"></span></div>
                <div class="field"><label for="billing-postal">Postal code</label><input class="input" id="billing-postal" name="billingPostal"/><span class="field-error"></span></div>
                <div class="field"><label for="billing-city">City</label><input class="input" id="billing-city" name="billingCity"/><span class="field-error"></span></div>
              </div>
            </div>
            <div class="form-section">
              <div class="form-section-heading"><span class="form-step">4</span><div><h2>Shipping method</h2><p>Delivery timing begins after design approval and production.</p></div></div>
              <div class="stack-sm">
                ${state.shippingMethods.filter((method) => method.active).map((method) => `<label class="radio-card"><input type="radio" name="shippingMethod" value="${method.id}" ${method.id === state.checkoutShippingId ? "checked" : ""}/><span><strong>${escapeHtml(method.name)} — ${money(method.priceSek)}</strong><small>${escapeHtml(method.estimatedDelivery)} · ${escapeHtml(method.description)}</small></span></label>`).join("")}
              </div>
            </div>
            <div class="form-section">
              <div class="form-section-heading"><span class="form-step">5</span><div><h2>Payment method</h2><p>Prepared for a secure hosted payment integration.</p></div></div>
              <div class="payment-placeholder">
                <strong>${icon("lock")} Demo order — no payment collected</strong>
                <p>${escapeHtml(storeSettings.paymentStatusMessage)}</p>
                <div class="payment-logos" aria-label="Supported future providers"><span class="payment-logo">Stripe</span><span class="payment-logo">Klarna</span><span class="payment-logo">PayPal</span><span class="payment-logo">Apple Pay</span><span class="payment-logo">Google Pay</span><span class="payment-logo">Shopify Payments</span></div>
              </div>
              <label class="toggle-row"><span><strong>I understand this is a demo order</strong><small>No payment will be taken and no production will begin.</small></span><input type="checkbox" name="demoConsent" required/></label>
              <span class="field-error" id="demo-consent-error"></span>
            </div>
          </form>
          ${summaryMarkup(totals, true)}
        </div>
      </div>
    </section>`;
}

function validateCheckout(form) {
  const required = ["fullName", "businessName", "email", "phone", "address", "postalCode", "city"];
  let valid = true;
  required.forEach((name) => {
    const input = form.elements[name];
    const value = input.value.trim();
    let message = value ? "" : "This field is required.";
    if (name === "email" && value && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) message = "Enter a valid email address.";
    setFieldError(input, message);
    if (message) valid = false;
  });
  const country = form.elements.country;
  const countryMessage =
    country.value === "Sweden"
      ? ""
      : "Contact ReviewTap for a shipping quote before ordering outside Sweden.";
  setFieldError(country, countryMessage);
  if (countryMessage) valid = false;
  if (!form.elements.billingSame.checked) {
    ["billingAddress", "billingPostal", "billingCity"].forEach((name) => {
      const input = form.elements[name];
      const message = input.value.trim() ? "" : "This billing field is required.";
      setFieldError(input, message);
      if (message) valid = false;
    });
  }
  const demoConsent = form.elements.demoConsent;
  document.querySelector("#demo-consent-error").textContent = demoConsent.checked ? "" : "Please confirm that this is a demo order.";
  if (!demoConsent.checked) valid = false;
  return valid;
}

function placeOrder(form) {
  const invalidItem = state.cart.find(
    (item) =>
      item.requiresCustomization ||
      !item.customization?.businessName ||
      !validateReviewUrl(item.customization?.reviewLink) ||
      item.quantity > findProduct(item.productId).stock
  );
  if (invalidItem) {
    showToast(
      "Finish your product details",
      "Every item needs a business name, working review link and available quantity.",
      "error"
    );
    location.hash = "#/cart";
    return;
  }
  if (!validateCheckout(form)) {
    form.querySelector('[aria-invalid="true"]')?.focus();
    showToast("Check your checkout details", "Complete each required field before placing the demo order.", "error");
    return;
  }
  const data = new FormData(form);
  const totals = cartTotals(data.get("shippingMethod"));
  const id = `RT-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`;
  const order = {
    id,
    createdAt: new Date().toISOString(),
    status: "received",
    approvalStatus: "not-sent",
    customer: {
      fullName: data.get("fullName"),
      businessName: data.get("businessName"),
      email: data.get("email"),
      phone: data.get("phone"),
      address: data.get("address"),
      postalCode: data.get("postalCode"),
      city: data.get("city"),
      country: data.get("country"),
      billingAddress: data.get("billingSame") ? "Same as delivery" : data.get("billingAddress"),
      billingPostal: data.get("billingSame") ? data.get("postalCode") : data.get("billingPostal"),
      billingCity: data.get("billingSame") ? data.get("city") : data.get("billingCity")
    },
    orderNotes: data.get("orderNotes"),
    items: structuredClone(state.cart),
    subtotal: totals.subtotal,
    discount: totals.discount,
    shipping: totals.shipping,
    total: totals.total,
    shippingMethod: totals.method?.id,
    estimatedDelivery: totals.method?.estimatedDelivery || storeSettings.estimatedDeliveryTime,
    history: [{ status: "received", date: new Date().toISOString() }],
    designPreview: "",
    comments: [],
    internalNotes: []
  };
  state.orders.unshift(order);
  saveOrders();
  state.cart = [];
  state.appliedDiscountCode = "";
  saveCart();
  location.hash = `#/confirmation/${id}`;
}

function renderConfirmation(orderId) {
  const order = state.orders.find((item) => item.id === orderId);
  if (!order) return renderNotFound("Order not found", "We could not find that confirmation on this device.");
  return `
    <section class="section section-grey">
      <div class="narrow">
        <article class="confirmation-card">
          <span class="success-icon">${icon("check")}</span>
          <span class="eyebrow">Demo order confirmed</span>
          <h1>Thank you, ${escapeHtml(order.customer.fullName.split(" ")[0])}.</h1>
          <p>Your demo order has been created. No payment was collected and no real production or confirmation email has been triggered.</p>
          <div class="confirmation-details">
            <div class="summary-line"><span>Order number</span><strong>${order.id}</strong></div>
            <div class="summary-line"><span>Customer email</span><strong>${escapeHtml(order.customer.email)}</strong></div>
            <div class="summary-line"><span>Estimated delivery</span><strong>${escapeHtml(order.estimatedDelivery)}</strong></div>
            <div class="summary-line total"><span>Demo total</span><strong>${money(order.total)}</strong></div>
            <div class="confirmation-products"><strong>Products ordered</strong>${order.items.map((item) => `<div class="summary-line"><span>${item.quantity} × ${escapeHtml(item.productName)}</span><span>${money(item.quantity * item.unitPrice)}</span></div>`).join("")}</div>
          </div>
          <div class="cluster" style="justify-content:center">
            <a class="button button-primary" href="#/track?order=${encodeURIComponent(order.id)}&email=${encodeURIComponent(order.customer.email)}">Track Order ${icon("arrow")}</a>
            <a class="button button-secondary" href="#/products">Continue shopping</a>
          </div>
          <div class="secure-row" style="justify-content:center;margin-top:26px">${icon("mail")}<span>An order confirmation email will be sent when a real email service is connected.</span></div>
        </article>
      </div>
    </section>`;
}

function findOrder(id, email) {
  return state.orders.find(
    (order) =>
      order.id.toLowerCase() === String(id).trim().toLowerCase() &&
      order.customer.email.toLowerCase() === String(email).trim().toLowerCase()
  );
}

function trackResultMarkup(order) {
  const currentIndex = orderStatuses.findIndex((status) => status.id === order.status);
  const current = orderStatuses[currentIndex] || orderStatuses[0];
  return `
    <div class="track-result">
      <div class="status-header">
        <div><span class="eyebrow">Order ${escapeHtml(order.id)}</span><h2>${escapeHtml(order.customer.businessName)}</h2><p class="muted">Placed ${formatDate(order.createdAt)} · ${order.items.length} product ${order.items.length === 1 ? "type" : "types"}</p></div>
        <span class="status-pill">${escapeHtml(current.label)}</span>
      </div>
      <div class="panel">
        <div class="status-timeline">
          ${orderStatuses.map((status, index) => {
            const history = order.history?.find((entry) => entry.status === status.id);
            const className = index < currentIndex ? "complete" : index === currentIndex ? "active" : "";
            return `<div class="status-row ${className}"><span class="status-dot">${index < currentIndex ? "✓" : ""}</span><div><h3>${escapeHtml(status.label)}</h3><p>${escapeHtml(status.description)}</p>${status.id === "awaiting-approval" && order.status === "awaiting-approval" ? `<a class="inline-link" href="#/approval?order=${encodeURIComponent(order.id)}&email=${encodeURIComponent(order.customer.email)}">Review your design preview</a>` : ""}</div><time>${history ? formatDate(history.date, true) : ""}</time></div>`;
          }).join("")}
        </div>
      </div>
    </div>`;
}

function renderTrack(query) {
  let order = null;
  const id = query.get("order") || "";
  const email = query.get("email") || "";
  if (id && email) order = findOrder(id, email);
  if (!order && !id && !email && state.trackResultId) {
    order = state.orders.find((item) => item.id === state.trackResultId);
  }
  return `
    ${innerHero({ eyebrow: "Order tracking", title: "Follow your ReviewTap order", description: "Enter the order number and email used at checkout to view design, production and delivery progress." })}
    <section class="section section-grey">
      <div class="container">
        <form class="track-form" id="track-form">
          <div class="field"><label class="required" for="track-order">Order number</label><input class="input" id="track-order" name="orderNumber" placeholder="RT-2026-1048" value="${escapeHtml(id)}" required/></div>
          <div class="field"><label class="required" for="track-email">Email address</label><input class="input" id="track-email" name="email" type="email" placeholder="you@business.se" value="${escapeHtml(email)}" required/></div>
          <button class="button button-primary" type="submit">Track order</button>
          <div class="field-help" style="grid-column:1/-1">Try the working demo: <strong>RT-2026-1048</strong> with <strong>demo@reviewtap.se</strong>.</div>
        </form>
        <div id="track-result">${order ? trackResultMarkup(order) : ""}</div>
      </div>
    </section>`;
}

function renderApproval(query) {
  const id = query.get("order") || "RT-2026-1048";
  const email = query.get("email") || (id === "RT-2026-1048" ? "demo@reviewtap.se" : "");
  const order = email ? findOrder(id, email) : null;
  if (!order) {
    return `
      ${innerHero({ eyebrow: "Design approval", title: "Open your design preview", description: "Enter the order details from your approval email. Production only begins after approval." })}
      <section class="section section-grey"><div class="narrow"><form class="form-card" id="approval-search-form"><div class="field-grid"><div class="field"><label class="required" for="approval-order">Order number</label><input class="input" id="approval-order" name="orderNumber" required/></div><div class="field"><label class="required" for="approval-email">Email</label><input class="input" id="approval-email" name="email" type="email" required/></div><div class="field full"><button class="button button-primary" type="submit">Open preview</button></div></div></form></div></section>`;
  }
  const hasPreview = Boolean(order.designPreview);
  const preview = order.designPreview;
  return `
    ${innerHero({ eyebrow: `Order ${order.id}`, title: "Review and approve your design", description: "Check the text, colors, logo, layout and QR position carefully. Production stays locked until you approve." })}
    <section class="section section-grey">
      <div class="container approval-layout">
        <div class="approval-preview">${hasPreview ? `<img src="${preview}" alt="Digital design preview for ${escapeHtml(order.customer.businessName)}"/>` : `<div class="approval-preview-placeholder"><div><span class="empty-state-icon">${icon("design")}</span><h2>Preview not ready yet</h2><p class="muted">The design team must upload your digital proof before approval becomes available.</p></div></div>`}</div>
        <div class="form-card">
          <div class="split"><div><span class="eyebrow">Approval status</span><h2>${!hasPreview ? "Design being prepared" : order.approvalStatus === "approved" ? "Design approved" : order.approvalStatus === "changes-requested" ? "Changes requested" : "Waiting for your decision"}</h2></div><span class="status-pill">${escapeHtml(orderStatuses.find((status) => status.id === order.status)?.label || "Order received")}</span></div>
          <div class="detail-list">
            <div class="detail-row"><span>Business</span><strong>${escapeHtml(order.customer.businessName)}</strong></div>
            <div class="detail-row"><span>Products</span><span>${order.items.map((item) => `${item.quantity} × ${item.productName}`).join(", ")}</span></div>
            <div class="detail-row"><span>Review link</span><span>${escapeHtml(order.items[0]?.customization?.reviewLink || "To be confirmed")}</span></div>
          </div>
          <div class="comment-thread">${(order.comments || []).map((comment) => `<article class="comment ${comment.role === "admin" ? "admin" : ""}"><strong>${escapeHtml(comment.author)}</strong><time>${formatDate(comment.date, true)}</time><p>${escapeHtml(comment.text)}</p></article>`).join("") || '<p class="muted">No comments yet.</p>'}</div>
          ${hasPreview ? `<div class="field"><label for="approval-comment">Comment for the design team</label><textarea class="textarea" id="approval-comment" placeholder="Describe any change clearly…"></textarea></div><div class="approval-actions" style="margin-top:16px"><button class="button button-success" data-action="approve-design" data-order-id="${order.id}" ${order.approvalStatus === "approved" ? "disabled" : ""}>${icon("check")} Approve design</button><button class="button button-secondary" data-action="request-changes" data-order-id="${order.id}">${icon("edit")} Request changes</button></div>` : '<div class="editable-notice">Approval controls will appear after the ReviewTap team uploads and sends your design proof.</div>'}
          <p class="field-help" style="margin-top:14px">Approving confirms the visible text, colors, logo and layout. In this demo, no real production is triggered.</p>
        </div>
      </div>
    </section>`;
}

function renderContact() {
  return `
    ${innerHero({ eyebrow: "Contact", title: "How can we help?", description: "Questions about products, an order or finding your Google Review link? Send us a message." })}
    <section class="section section-grey">
      <div class="container contact-grid">
        <aside>
          <div class="section-heading"><span class="eyebrow">Get in touch</span><h2>Talk to ReviewTap</h2><p>Example contact details are shown until final business information is supplied.</p></div>
          <div class="contact-details">
            <div class="contact-item"><span class="contact-item-icon">${icon("mail")}</span><div><strong>Email</strong><a href="mailto:${escapeHtml(state.siteContent.email)}">${escapeHtml(state.siteContent.email)}</a><span>${escapeHtml(contact.responseTime)}</span></div></div>
            <div class="contact-item"><span class="contact-item-icon">${icon("phone")}</span><div><strong>Phone</strong><a href="tel:${escapeHtml(state.siteContent.phoneHref)}">${escapeHtml(state.siteContent.phoneDisplay)}</a><span>Example number</span></div></div>
            <div class="contact-item"><span class="contact-item-icon">${icon("clock")}</span><div><strong>Opening hours</strong>${openingHours.map((item) => `<span>${escapeHtml(item.days)}: ${escapeHtml(item.hours)}</span>`).join("")}</div></div>
            <div class="contact-item"><span class="contact-item-icon">${icon("message")}</span><div><strong>Social</strong>${socialLinks.map((item) => `<a href="${item.url}" target="_blank" rel="noreferrer">${escapeHtml(item.platform)} · ${escapeHtml(item.handle)}</a>`).join("")}</div></div>
          </div>
          <p style="margin-top:20px"><a class="inline-link" href="#/faq">Browse frequently asked questions →</a></p>
        </aside>
        <form class="form-card" id="contact-form" novalidate>
          <div class="field-grid">
            <div class="field"><label class="required" for="contact-name">Name</label><input class="input" id="contact-name" name="name" required/><span class="field-error"></span></div>
            <div class="field"><label class="required" for="contact-email">Email</label><input class="input" id="contact-email" name="email" type="email" required/><span class="field-error"></span></div>
            <div class="field"><label for="contact-phone">Phone number</label><input class="input" id="contact-phone" name="phone" type="tel"/></div>
            <div class="field"><label for="contact-order">Order number</label><input class="input" id="contact-order" name="orderNumber" placeholder="RT-2026-…"/></div>
            <div class="field full"><label class="required" for="contact-reason">Reason for contacting</label><select class="select" id="contact-reason" name="reason" required><option value="">Select a reason</option><option>Product question</option><option>Order help</option><option>Find my Google Review link</option><option>Design change</option><option>Shipping or delivery</option><option>Partnership</option><option>Other</option></select><span class="field-error"></span></div>
            <div class="field full"><label class="required" for="contact-message">Message</label><textarea class="textarea" id="contact-message" name="message" required></textarea><span class="field-error"></span></div>
            <div class="field full"><label for="contact-file">Optional file</label><input class="input" id="contact-file" name="file" type="file" accept=".png,.jpg,.jpeg,.svg,.pdf,image/png,image/jpeg,image/svg+xml,application/pdf"/><small>PNG, JPG, SVG or PDF · maximum 8 MB. Production storage must add server-side scanning.</small><span class="field-error"></span></div>
            <div class="field full"><button class="button button-primary" type="submit">Send message ${icon("arrow")}</button></div>
          </div>
        </form>
      </div>
    </section>`;
}

function policyBody(id) {
  const bodies = {
    shipping: `
      <p>Orders are produced after the customer approves the digital design. Delivery estimates begin when production is complete, not when the order is first placed.</p>
      <h2>Estimated timing</h2><ul><li>First proof: ${storeSettings.estimatedProofTime}</li><li>Production: ${storeSettings.estimatedProductionTime}</li><li>Delivery: ${storeSettings.estimatedDeliveryTime}</li></ul>
      <h2>Tracking and delays</h2><p>Tracking is shared when the selected carrier provides it. Weather, customs, carrier capacity and incomplete addresses may affect timing. Contact support with your order number if a parcel appears delayed.</p>`,
    returns: `
      <p>ReviewTap products are customized for one business. As a result, ordinary change-of-mind returns may be limited once a proof is approved and production begins.</p>
      <h2>Damaged or incorrect items</h2><p>Contact support promptly with your order number and clear photos if an item arrives damaged, defective or different from the approved proof. Eligible problems will be reviewed for replacement, correction or another suitable remedy.</p>
      <h2>Before approval</h2><p>Use the design approval stage to request corrections. Production does not begin until the design is approved.</p>`,
    privacy: `
      <p>Customer information is used to prepare, fulfil and support orders. This demo stores sample information only in the current browser and does not send it to a ReviewTap server.</p>
      <h2>Information used for orders</h2><p>Typical information includes contact details, delivery and billing addresses, customization details, uploaded logos, approval comments and support messages.</p>
      <h2>Payments and providers</h2><p>Real payment information must be collected by a secure payment provider. ReviewTap should never store full card details in this storefront.</p>
      <h2>Your choices</h2><p>A production policy should explain access, correction, deletion, retention, legal basis and regulator contact rights for the countries where ReviewTap operates.</p>`,
    cookies: `
      <p>Essential browser storage keeps the cart, checkout draft and consent choice working. Optional analytics should load only after the required consent.</p>
      <h2>Current demo behavior</h2><p>No third-party analytics or advertising scripts are connected. The analytics switch is a privacy-friendly placeholder for a future provider.</p>
      <h2>Changing your choice</h2><p>Open Cookie Settings in the footer at any time to update the stored preference.</p>`,
    terms: `
      <p>These placeholder terms describe the intended ordering flow and must be reviewed for ReviewTap’s legal entity, selling markets and consumer obligations before launch.</p>
      <h2>Customization and approval</h2><p>The customer is responsible for checking names, links, logos, colors and layout in the proof. Production begins only after approval.</p>
      <h2>Payments, pricing and delivery</h2><p>Final prices, tax treatment, shipping costs and accepted payment methods are confirmed during secure checkout once a provider is connected.</p>
      <h2>Review use</h2><p>Customers must use ReviewTap in a way that permits honest feedback and complies with the policies of the review platform.</p>`
  };
  return bodies[id] || `<p>This editable policy page is ready for final ReviewTap business and legal content.</p>`;
}

function renderPolicy(id) {
  const policy = policySummaries.find((item) => item.id === id) || policySummaries.find((item) => item.id === "terms");
  return `
    ${innerHero({ eyebrow: "Legal and store information", title: escapeHtml(policy.title), description: escapeHtml(policy.summary) })}
    <section class="section"><article class="narrow policy-content"><div class="editable-notice">${icon("alert")} This is launch-ready placeholder copy, not legal advice. Add verified ReviewTap company details and obtain appropriate legal review before accepting real orders.</div>${policyBody(policy.id)}<h2>Contact</h2><p>Questions about this policy can be sent to <a class="inline-link" href="mailto:${escapeHtml(state.siteContent.email)}">${escapeHtml(state.siteContent.email)}</a>.</p><p><em>Last updated: 12 July 2026</em></p></article></section>`;
}

function renderAdminLogin() {
  return `
    <section class="admin-shell admin-login">
      <form class="login-card" id="admin-login-form">
        <span class="brand"><span class="brand-mark">${icon("tap")}</span><span>Review<span>Tap</span></span></span>
        <span class="eyebrow" style="margin-top:24px">Store administration</span>
        <h1 style="font-size:2rem">Sign in</h1>
        <p class="muted">Access orders, products, approvals and store settings.</p>
        <div class="demo-notice"><strong>Interactive demo only.</strong><br/>Email: admin@reviewtap.se<br/>Password: ReviewTapDemo!<br/><br/>Replace this browser-only gate with server-side authentication and role-based access before launch.</div>
        <div class="stack-sm">
          <div class="field"><label for="admin-email">Email</label><input class="input" id="admin-email" name="email" type="email" autocomplete="username" required/></div>
          <div class="field"><label for="admin-password">Password</label><input class="input" id="admin-password" name="password" type="password" autocomplete="current-password" required/></div>
          <span class="field-error" id="admin-login-error"></span>
          <button class="button button-primary full-width" type="submit">${icon("lock")} Sign in to demo</button>
          <a class="button button-ghost" href="#/">Return to store</a>
        </div>
      </form>
    </section>`;
}

function adminOrdersTable(limit = 0) {
  const orders = limit ? state.orders.slice(0, limit) : state.orders;
  return `
    <div class="data-table-wrap"><table class="data-table"><thead><tr><th>Order</th><th>Customer</th><th>Date</th><th>Status</th><th>Approval</th><th>Total</th><th></th></tr></thead><tbody>
      ${orders.map((order) => `<tr data-order-row data-search="${escapeHtml(`${order.id} ${order.customer.fullName} ${order.customer.businessName} ${order.customer.email}`.toLowerCase())}"><td><strong>${order.id}</strong></td><td><strong>${escapeHtml(order.customer.businessName)}</strong><br/>${escapeHtml(order.customer.fullName)}</td><td>${formatDate(order.createdAt)}</td><td><select class="compact-select status-select" data-action="admin-status" data-order-id="${order.id}" aria-label="Status for order ${order.id}">${orderStatuses.map((status) => `<option value="${status.id}" ${status.id === order.status ? "selected" : ""}>${escapeHtml(status.label)}</option>`).join("")}</select></td><td>${escapeHtml(order.approvalStatus)}</td><td><strong>${money(order.total)}</strong></td><td><button class="button button-small button-secondary" data-action="open-order" data-order-id="${order.id}" aria-label="Open order ${order.id}">Open</button></td></tr>`).join("") || '<tr><td colspan="7">No orders yet.</td></tr>'}
    </tbody></table></div>`;
}

function renderAdminOverview() {
  const revenue = state.orders.reduce((sum, order) => sum + order.total, 0);
  const awaiting = state.orders.filter((order) => order.status === "awaiting-approval").length;
  const messages = state.messages.filter((message) => !message.read).length;
  return `
    <div class="admin-header"><div><h1>Dashboard</h1><p>Store activity and actions that need attention.</p></div><button class="button button-secondary" data-action="admin-export">${icon("download")} Export orders CSV</button></div>
    <div class="admin-stats"><div class="admin-stat"><span>Total demo orders</span><strong>${state.orders.length}</strong></div><div class="admin-stat"><span>Demo order value</span><strong>${money(revenue)}</strong></div><div class="admin-stat"><span>Awaiting approval</span><strong>${awaiting}</strong></div><div class="admin-stat"><span>Unread messages</span><strong>${messages}</strong></div></div>
    <div class="panel"><div class="split"><div><span class="eyebrow">Recent orders</span><h2 style="font-size:1.35rem">Latest activity</h2></div><button class="button button-small button-ghost" data-action="admin-tab" data-tab="orders">View all</button></div>${adminOrdersTable(5)}</div>`;
}

function renderAdminOrders() {
  return `
    <div class="admin-header"><div><h1>Orders</h1><p>Search, update status, inspect customizations and send proofs.</p></div><button class="button button-secondary" data-action="admin-export">${icon("download")} Export CSV</button></div>
    <div class="admin-toolbar"><label class="search-field">${icon("search")}<span class="hidden">Search orders</span><input class="input" id="admin-order-search" placeholder="Search order, customer or email…"/></label><span class="muted">${state.orders.length} orders</span></div>
    ${adminOrdersTable()}`;
}

function renderAdminProducts() {
  return `
    <div class="admin-header"><div><h1>Products</h1><p>Edit prices, stock and availability. Changes update the storefront on this device.</p></div></div>
    <div class="panel">
      <form id="admin-products-form">
        ${getProducts().map((product) => `<div class="admin-form-row" data-product-admin-row="${product.id}"><div class="table-product"><img src="${imagePath(product)}" alt=""/><div><strong>${escapeHtml(product.name)}</strong><div class="muted">${product.id}</div></div></div><div class="field"><label for="price-${product.id}">Price SEK</label><input class="input" id="price-${product.id}" name="price-${product.id}" type="number" min="0" value="${product.startingPriceSek}"/></div><div class="field"><label for="stock-${product.id}">Stock</label><input class="input" id="stock-${product.id}" name="stock-${product.id}" type="number" min="0" value="${product.stock}"/></div><label class="toggle-row"><span><strong>Active</strong></span><input type="checkbox" name="active-${product.id}" ${product.active !== false ? "checked" : ""}/></label></div>`).join("")}
        <p style="margin-top:20px"><button class="button button-primary" type="submit">Save product changes</button></p>
      </form>
    </div>
    <div class="panel" style="margin-top:20px"><span class="eyebrow">New product</span><h2 style="font-size:1.35rem">Add a simple catalog product</h2><form id="admin-add-product-form" class="field-grid"><div class="field"><label class="required" for="new-product-name">Name</label><input class="input" id="new-product-name" name="name" required/></div><div class="field"><label class="required" for="new-product-price">Starting price SEK</label><input class="input" id="new-product-price" name="price" type="number" min="0" required/></div><div class="field"><label for="new-product-stock">Stock</label><input class="input" id="new-product-stock" name="stock" type="number" min="0" value="10"/></div><div class="field"><label for="new-product-image">Use image</label><select class="select" id="new-product-image" name="image">${getProducts().slice(0,5).map((p) => `<option value="${p.image}">${p.shortName} image</option>`).join("")}</select></div><div class="field full"><label for="new-product-description">Description</label><input class="input" id="new-product-description" name="description" required/></div><div class="field full"><button class="button button-secondary" type="submit">Add product</button></div></form></div>`;
}

function renderAdminDiscounts() {
  return `
    <div class="admin-header"><div><h1>Discount codes</h1><p>Create and remove storefront discount codes.</p></div></div>
    <div class="admin-grid">
      <div class="panel"><span class="eyebrow">Active codes</span><div class="stack-sm">${state.discounts.map((discount) => `<div class="split" style="padding:12px 0;border-bottom:1px solid var(--grey-200)"><div><strong>${escapeHtml(discount.code)}</strong><div class="muted">${discount.value}${discount.type === "percentage" ? "%" : " SEK"} off · minimum ${money(discount.minimumSubtotalSek)}</div></div><button class="button button-small button-danger" data-action="delete-discount" data-code="${escapeHtml(discount.code)}">Remove</button></div>`).join("") || '<p class="muted">No discount codes.</p>'}</div></div>
      <form class="panel" id="admin-discount-form"><span class="eyebrow">Create code</span><h2 style="font-size:1.35rem">New discount</h2><div class="stack-sm"><div class="field"><label class="required" for="discount-new-code">Code</label><input class="input" id="discount-new-code" name="code" required/></div><div class="field"><label for="discount-type">Type</label><select class="select" id="discount-type" name="type"><option value="percentage">Percentage</option><option value="fixed">Fixed SEK</option></select></div><div class="field"><label class="required" for="discount-value">Value</label><input class="input" id="discount-value" name="value" type="number" min="1" required/></div><div class="field"><label for="discount-min">Minimum subtotal</label><input class="input" id="discount-min" name="minimum" type="number" min="0" value="0"/></div><button class="button button-primary" type="submit">Create discount</button></div></form>
    </div>`;
}

function renderAdminShipping() {
  return `
    <div class="admin-header"><div><h1>Shipping</h1><p>Edit shipping prices, estimates and availability.</p></div></div>
    <form class="panel" id="admin-shipping-form">
      ${state.shippingMethods.map((method) => `<div class="admin-form-row"><div><strong>${escapeHtml(method.name)}</strong><div class="muted">${escapeHtml(method.description)}</div></div><div class="field"><label for="ship-price-${method.id}">Price SEK</label><input class="input" id="ship-price-${method.id}" name="price-${method.id}" type="number" min="0" value="${method.priceSek}"/></div><div class="field"><label for="ship-free-${method.id}">Free above</label><input class="input" id="ship-free-${method.id}" name="free-${method.id}" type="number" min="0" value="${method.freeAboveSek || 0}"/></div><label class="toggle-row"><span><strong>Active</strong></span><input type="checkbox" name="active-${method.id}" ${method.active ? "checked" : ""}/></label></div>`).join("")}
      <p style="margin-top:20px"><button class="button button-primary" type="submit">Save shipping</button></p>
    </form>`;
}

function renderAdminContent() {
  return `
    <div class="admin-header"><div><h1>Website content</h1><p>Edit the main hero and displayed contact details.</p></div></div>
    <form class="panel" id="admin-content-form"><div class="field-grid"><div class="field full"><label for="content-headline">Hero headline</label><input class="input" id="content-headline" name="heroHeadline" value="${escapeHtml(state.siteContent.heroHeadline)}"/></div><div class="field full"><label for="content-description">Hero description</label><textarea class="textarea" id="content-description" name="heroDescription">${escapeHtml(state.siteContent.heroDescription)}</textarea></div><div class="field full"><label for="content-hero-image">Hero image path or URL</label><input class="input" id="content-hero-image" name="heroImage" value="${escapeHtml(state.siteContent.heroImage || "assets/images/hero-reviewtap.webp")}"/><small>Use a project-relative optimized image path for best performance.</small></div><div class="field"><label for="content-email">Business email</label><input class="input" id="content-email" name="email" type="email" value="${escapeHtml(state.siteContent.email)}"/></div><div class="field"><label for="content-phone">Phone display</label><input class="input" id="content-phone" name="phoneDisplay" value="${escapeHtml(state.siteContent.phoneDisplay)}"/></div><div class="field full"><label for="content-phone-href">Phone dialing value</label><input class="input" id="content-phone-href" name="phoneHref" value="${escapeHtml(state.siteContent.phoneHref)}"/></div><div class="field full"><button class="button button-primary" type="submit">Save website content</button></div></div></form>`;
}

function renderAdminMessages() {
  return `
    <div class="admin-header"><div><h1>Contact messages</h1><p>Messages submitted through the storefront on this device.</p></div></div>
    ${state.messages.length ? `<div class="data-table-wrap"><table class="data-table"><thead><tr><th>Date</th><th>Name</th><th>Reason</th><th>Order</th><th>Message</th><th>File</th></tr></thead><tbody>${state.messages.map((message) => `<tr><td>${formatDate(message.date)}</td><td><strong>${escapeHtml(message.name)}</strong><br/>${escapeHtml(message.email)}</td><td>${escapeHtml(message.reason)}</td><td>${escapeHtml(message.orderNumber || "—")}</td><td>${escapeHtml(message.message)}</td><td>${escapeHtml(message.fileName || "—")}</td></tr>`).join("")}</tbody></table></div>` : '<div class="empty-state"><div><span class="empty-state-icon">'+icon("message")+'</span><h2>No messages yet</h2><p>Contact form messages will appear here.</p></div></div>'}`;
}

function renderAdminSettings() {
  return `
    <div class="admin-header"><div><h1>Store settings</h1><p>Production connections and security checklist.</p></div></div>
    <div class="admin-grid">
      <div class="panel"><span class="eyebrow">Demo environment</span><h2 style="font-size:1.35rem">Connection status</h2><div class="detail-list"><div class="detail-row"><span>Payments</span><strong class="text-danger">Not connected</strong></div><div class="detail-row"><span>Email</span><strong class="text-danger">Not connected</strong></div><div class="detail-row"><span>Database</span><strong class="text-danger">Browser demo only</strong></div><div class="detail-row"><span>Analytics</span><strong>Placeholder, off by default</strong></div></div></div>
      <div class="panel"><span class="eyebrow">Before launch</span><h2 style="font-size:1.35rem">Security requirements</h2><ul class="muted"><li>Server-side authentication with role-based access</li><li>Secure database and audit logging</li><li>Server-side upload validation, private storage and malware scanning</li><li>Payment provider hosted checkout and verified webhooks</li><li>Email service and verified sender domain</li><li>Final legal policies and business details</li></ul></div>
    </div>`;
}

function renderOrderDrawer(orderId) {
  const order = state.orders.find((item) => item.id === orderId);
  if (!order) return "";
  const logo = order.items.find((item) => item.customization?.logoData)?.customization;
  return `
    <div class="order-drawer" id="order-drawer" role="dialog" aria-modal="true" aria-labelledby="drawer-title">
      <aside class="order-drawer-panel">
        <div class="order-drawer-head"><div><span class="eyebrow">Order details</span><h2 id="drawer-title">${order.id}</h2></div><button class="icon-button" data-action="close-order" aria-label="Close order details">×</button></div>
        <div class="detail-list"><div class="detail-row"><span>Customer</span><strong>${escapeHtml(order.customer.fullName)} · ${escapeHtml(order.customer.businessName)}</strong></div><div class="detail-row"><span>Email</span><a class="inline-link" href="mailto:${escapeHtml(order.customer.email)}">${escapeHtml(order.customer.email)}</a></div><div class="detail-row"><span>Phone</span><span>${escapeHtml(order.customer.phone)}</span></div><div class="detail-row"><span>Delivery</span><span>${escapeHtml(`${order.customer.address}, ${order.customer.postalCode} ${order.customer.city}, ${order.customer.country}`)}</span></div><div class="detail-row"><span>Total</span><strong>${money(order.total)}</strong></div></div>
        <div class="form-section"><h3>Product customizations</h3>${order.items.map((item) => `<div class="panel" style="padding:15px;margin-top:10px"><strong>${item.quantity} × ${escapeHtml(item.productName)}</strong><div class="detail-list"><div class="detail-row"><span>Business</span><span>${escapeHtml(item.customization?.businessName || "Pending")}</span></div><div class="detail-row"><span>Headline</span><span>${escapeHtml(item.customization?.headline || "Default")}</span></div><div class="detail-row"><span>Review link</span><span>${escapeHtml(item.customization?.reviewLink || "Pending")}</span></div><div class="detail-row"><span>Template</span><span>${escapeHtml(item.customization?.templateId || "Default")}</span></div></div></div>`).join("")}</div>
        <div class="form-section"><h3>Design preview</h3><div class="field"><label for="admin-preview-upload">Upload preview (PNG, JPG or SVG)</label><input class="input" id="admin-preview-upload" type="file" accept=".png,.jpg,.jpeg,.svg,image/png,image/jpeg,image/svg+xml" data-order-id="${order.id}"/><small>Maximum 1 MB in this browser demo.</small></div>${order.designPreview ? `<img src="${order.designPreview}" alt="Current design preview" style="margin-top:12px;border-radius:12px"/>` : '<p class="muted">No preview uploaded.</p>'}<div class="cluster" style="margin-top:12px"><button class="button button-primary button-small" data-action="send-approval" data-order-id="${order.id}">Send for approval</button>${logo ? `<button class="button button-secondary button-small" data-action="download-logo" data-order-id="${order.id}">${icon("download")} Download logo</button>` : ""}</div></div>
        <div class="form-section"><h3>Internal notes</h3><div class="stack-sm">${(order.internalNotes || []).map((note) => `<div class="comment"><strong>Admin</strong><time>${formatDate(note.date, true)}</time><p>${escapeHtml(note.text)}</p></div>`).join("") || '<p class="muted">No internal notes.</p>'}</div><div class="field" style="margin-top:12px"><label for="internal-note">Add note</label><textarea class="textarea" id="internal-note"></textarea></div><button class="button button-secondary button-small" style="margin-top:10px" data-action="add-internal-note" data-order-id="${order.id}">Add internal note</button></div>
      </aside>
    </div>`;
}

function adminContent() {
  return {
    overview: renderAdminOverview,
    orders: renderAdminOrders,
    products: renderAdminProducts,
    discounts: renderAdminDiscounts,
    shipping: renderAdminShipping,
    content: renderAdminContent,
    messages: renderAdminMessages,
    settings: renderAdminSettings
  }[state.adminTab]?.() || renderAdminOverview();
}

function renderAdmin() {
  if (sessionStorage.getItem("reviewtap_admin_demo") !== "true") return renderAdminLogin();
  const tabs = [
    ["overview", "dashboard", "Overview"],
    ["orders", "box", "Orders"],
    ["products", "tag", "Products"],
    ["discounts", "tag", "Discounts"],
    ["shipping", "box", "Shipping"],
    ["content", "edit", "Website content"],
    ["messages", "message", "Messages"],
    ["settings", "settings", "Settings"]
  ];
  return `
    <section class="admin-shell">
      <div class="admin-layout">
        <aside class="admin-sidebar"><h2>ReviewTap Admin</h2><nav class="admin-nav" aria-label="Admin navigation">${tabs.map(([id, iconName, label]) => `<button class="${state.adminTab === id ? "active" : ""}" data-action="admin-tab" data-tab="${id}">${icon(iconName)} ${label}</button>`).join("")}<button data-action="admin-logout">${icon("user")} Sign out</button></nav></aside>
        <div class="admin-content">${adminContent()}</div>
      </div>
      ${state.adminOrderId ? renderOrderDrawer(state.adminOrderId) : ""}
    </section>`;
}

function renderNotFound(title = "Page not found", description = "The page you’re looking for may have moved or never existed.") {
  return `
    <section class="section section-grey"><div class="narrow"><div class="empty-state"><div><span class="eyebrow">404</span><h1 style="font-size:3rem">${escapeHtml(title)}</h1><p>${escapeHtml(description)}</p><div class="cluster" style="justify-content:center"><a class="button button-primary" href="#/">Return home</a><a class="button button-secondary" href="#/products">Browse products</a></div></div></div></div></section>`;
}

async function renderRoute() {
  const route = parseRoute();
  state.currentRoute = route.path;
  closeMobileMenu();
  setLoading();
  await new Promise((resolve) => window.setTimeout(resolve, 45));
  let html = "";
  const [first, second] = route.segments;
  if (route.path === "/") html = renderHome();
  else if (route.path === "/products") html = renderProductsPage();
  else if (route.path === "/how-it-works") html = renderHowPage();
  else if (route.path === "/pricing") html = renderPricingPage();
  else if (route.path === "/reviews") html = renderReviewsPage();
  else if (route.path === "/faq") html = renderFaqPage();
  else if (route.path === "/cart") html = renderCart();
  else if (route.path === "/checkout") html = renderCheckout();
  else if (first === "confirmation") html = renderConfirmation(second);
  else if (route.path === "/track") html = renderTrack(route.query);
  else if (route.path === "/approval") html = renderApproval(route.query);
  else if (route.path === "/contact") html = renderContact();
  else if (first === "policy") html = renderPolicy(second);
  else if (first === "customize") html = renderCustomizer(second || "card", route.query.get("edit") || "");
  else if (route.path === "/admin") html = renderAdmin();
  else html = renderNotFound();
  app.innerHTML = html;
  setMeta(route.path);
  updateActiveNav(route.path);
  updateCartBadges();
  updateFooter();
  if (first === "customize") updateLivePreview();
  const routeFocus = state.adminOrderId
    ? document.querySelector('[data-action="close-order"]')
    : document.querySelector("#main-content");
  routeFocus?.focus({ preventScroll: true });
  window.scrollTo({ top: 0, behavior: "instant" });
}

function updateFooter() {
  document.querySelector("#copyright-year").textContent = new Date().getFullYear();
  const email = document.querySelector("#footer-email");
  const phone = document.querySelector("#footer-phone");
  email.textContent = state.siteContent.email;
  email.href = `mailto:${state.siteContent.email}`;
  phone.textContent = state.siteContent.phoneDisplay;
  phone.href = `tel:${state.siteContent.phoneHref}`;
  document.querySelector("#footer-hours").textContent = "Mon–Fri, 09:00–17:00 CET";
}

function closeMobileMenu() {
  const menu = document.querySelector("#mobile-menu");
  const toggle = document.querySelector("#menu-toggle");
  menu.hidden = true;
  toggle.setAttribute("aria-expanded", "false");
  toggle.setAttribute("aria-label", "Open menu");
  document.body.classList.remove("menu-open");
}

function openMobileMenu() {
  const menu = document.querySelector("#mobile-menu");
  const toggle = document.querySelector("#menu-toggle");
  menu.hidden = false;
  toggle.setAttribute("aria-expanded", "true");
  toggle.setAttribute("aria-label", "Close menu");
  document.body.classList.add("menu-open");
}

function validateFile(file, allowedTypes, maxMb = 8) {
  if (!file) return { valid: true };
  if (!allowedTypes.includes(file.type)) return { valid: false, message: "This file type is not allowed." };
  if (file.size > maxMb * 1024 * 1024) return { valid: false, message: `File must be smaller than ${maxMb} MB.` };
  return { valid: true };
}

function readImageFile(file, callback) {
  const reader = new FileReader();
  reader.onload = () => callback(reader.result);
  reader.readAsDataURL(file);
}

function handleLogoUpload(input) {
  const file = input.files?.[0];
  if (!file) return;
  const result = validateFile(file, customizationOptions.logoUpload.acceptedMimeTypes, customizationOptions.logoUpload.maximumFileSizeMb);
  if (!result.valid) {
    input.value = "";
    showToast("Logo not accepted", result.message, "error");
    return;
  }
  readImageFile(file, (dataUrl) => {
    state.customize.logoData = dataUrl;
    state.customize.logoName = file.name;
    document.querySelector("#logo-upload-result").innerHTML = `<div class="upload-result"><img src="${dataUrl}" alt="Uploaded logo preview"/><span>${escapeHtml(file.name)}</span></div>`;
    updateLivePreview();
    showToast("Logo uploaded", "The preview has been updated.");
  });
}

function updateCartItem(itemId, amount) {
  const item = state.cart.find((entry) => entry.id === itemId);
  if (!item) return;
  const product = findProduct(item.productId);
  item.quantity = Math.max(1, Math.min(100, product.stock, item.quantity + amount));
  item.customization = { ...(item.customization || {}), quantity: item.quantity };
  item.unitPrice = customizationPrice(item.customization).unit;
  saveCart();
  renderRoute();
}

function removeCartItem(itemId) {
  state.cart = state.cart.filter((entry) => entry.id !== itemId);
  saveCart();
  showToast("Item removed", "Your cart has been updated.");
  renderRoute();
}

function handleDiscount(form) {
  const code = new FormData(form).get("discountCode").trim().toUpperCase();
  const discount = getDiscount(code);
  if (!discount) {
    state.appliedDiscountCode = "";
    showToast("Code not recognized", "Check the code and try again.", "error");
    renderRoute();
    return;
  }
  const subtotal = state.cart.reduce((sum, item) => sum + item.unitPrice * item.quantity, 0);
  if (subtotal < discount.minimumSubtotalSek) {
    showToast("Minimum not reached", `This code requires a subtotal of ${money(discount.minimumSubtotalSek)}.`, "error");
    return;
  }
  state.appliedDiscountCode = code;
  showToast("Discount applied", discount.description);
  renderRoute();
}

function trackOrder(form) {
  const data = new FormData(form);
  const order = findOrder(data.get("orderNumber"), data.get("email"));
  const result = document.querySelector("#track-result");
  if (!order) {
    result.innerHTML = `<div class="narrow editable-notice">${icon("alert")} We could not match that order number and email. Check both details or try the demo credentials shown above.</div>`;
    showToast("Order not found", "Check the order number and email address.", "error");
    return;
  }
  state.trackResultId = order.id;
  result.innerHTML = trackResultMarkup(order);
  result.scrollIntoView({ behavior: "smooth", block: "start" });
}

function updateOrder(order) {
  const index = state.orders.findIndex((item) => item.id === order.id);
  if (index >= 0) state.orders[index] = order;
  saveOrders();
}

function approveDesign(orderId) {
  const order = state.orders.find((item) => item.id === orderId);
  if (!order) return;
  if (!order.designPreview || order.status !== "awaiting-approval") {
    showToast(
      "Preview approval is not available",
      "Wait until the design team uploads and sends your proof.",
      "error"
    );
    return;
  }
  const comment = document.querySelector("#approval-comment")?.value.trim();
  if (comment) order.comments.push({ author: order.customer.fullName, role: "customer", text: comment, date: new Date().toISOString() });
  order.approvalStatus = "approved";
  order.status = "production";
  order.history = (order.history || []).filter((item) => item.status !== "production");
  order.history.push({ status: "production", date: new Date().toISOString() });
  updateOrder(order);
  showToast("Design approved", "The demo order is now marked as in production.");
  renderRoute();
}

function requestChanges(orderId) {
  const order = state.orders.find((item) => item.id === orderId);
  if (!order?.designPreview || order.status !== "awaiting-approval") {
    showToast(
      "Preview changes are not available",
      "Wait until the design team uploads and sends your proof.",
      "error"
    );
    return;
  }
  const comment = document.querySelector("#approval-comment")?.value.trim();
  if (!comment) {
    showToast("Add a comment", "Tell the design team what you would like changed.", "error");
    document.querySelector("#approval-comment")?.focus();
    return;
  }
  order.comments.push({ author: order.customer.fullName, role: "customer", text: comment, date: new Date().toISOString() });
  order.approvalStatus = "changes-requested";
  order.status = "awaiting-approval";
  updateOrder(order);
  showToast("Changes requested", "Your comment has been added to the demo order.");
  renderRoute();
}

function handleContactSubmit(form) {
  const data = new FormData(form);
  let valid = true;
  ["name", "email", "reason", "message"].forEach((name) => {
    const input = form.elements[name];
    let message = input.value.trim() ? "" : "This field is required.";
    if (name === "email" && input.value && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(input.value)) message = "Enter a valid email address.";
    setFieldError(input, message);
    if (message) valid = false;
  });
  const file = form.elements.file.files?.[0];
  const fileResult = validateFile(file, ["image/png", "image/jpeg", "image/svg+xml", "application/pdf"], 8);
  if (!fileResult.valid) {
    setFieldError(form.elements.file, fileResult.message);
    valid = false;
  } else setFieldError(form.elements.file, "");
  if (!valid) {
    showToast("Check the form", "Correct the highlighted fields before sending.", "error");
    return;
  }
  state.messages.unshift({
    id: uid("message"),
    date: new Date().toISOString(),
    name: data.get("name"),
    email: data.get("email"),
    phone: data.get("phone"),
    orderNumber: data.get("orderNumber"),
    reason: data.get("reason"),
    message: data.get("message"),
    fileName: file?.name || "",
    read: false
  });
  writeStorage(storageKeys.messages, state.messages);
  form.innerHTML = `<div class="empty-state" style="min-height:420px"><div><span class="success-icon">${icon("check")}</span><h2>Message saved</h2><p>This demo stored your message on this device. Connect a secure form/email service before launch to deliver real enquiries.</p><button class="button button-secondary" type="button" data-action="contact-again">Send another message</button></div></div>`;
  showToast("Message saved", "No real email was sent in demo mode.");
}

function handleAdminLogin(form) {
  const data = new FormData(form);
  if (data.get("email") === "admin@reviewtap.se" && data.get("password") === "ReviewTapDemo!") {
    sessionStorage.setItem("reviewtap_admin_demo", "true");
    showToast("Signed in", "Interactive admin demo unlocked.");
    renderRoute();
  } else {
    document.querySelector("#admin-login-error").textContent = "Use the demo credentials shown above.";
  }
}

function adminUpdateStatus(select) {
  const order = state.orders.find((item) => item.id === select.dataset.orderId);
  const target = select.value;
  const targetIndex = orderStatuses.findIndex((item) => item.id === target);
  const productionIndex = orderStatuses.findIndex((item) => item.id === "production");
  if (target === "awaiting-approval" && !order.designPreview) {
    showToast("Upload a preview first", "A customer cannot approve an order without a design proof.", "error");
    select.value = order.status;
    return;
  }
  if (targetIndex >= productionIndex && order.approvalStatus !== "approved") {
    showToast("Approval required", "This order cannot enter production until the customer approves the design.", "error");
    select.value = order.status;
    return;
  }
  order.status = target;
  if (!(order.history || []).some((item) => item.status === target)) {
    order.history = [...(order.history || []), { status: target, date: new Date().toISOString() }];
  }
  updateOrder(order);
  showToast("Order updated", `${order.id} is now ${orderStatuses.find((item) => item.id === target)?.label}.`);
}

function exportOrdersCsv() {
  const rows = [
    ["Order", "Created", "Status", "Approval", "Customer", "Business", "Email", "Products", "Total SEK"],
    ...state.orders.map((order) => [
      order.id,
      order.createdAt,
      order.status,
      order.approvalStatus,
      order.customer.fullName,
      order.customer.businessName,
      order.customer.email,
      order.items.map((item) => `${item.quantity}x ${item.productName}`).join("; "),
      order.total
    ])
  ];
  const csv = rows.map((row) => row.map((cell) => `"${String(cell).replaceAll('"', '""')}"`).join(",")).join("\n");
  const url = URL.createObjectURL(new Blob([csv], { type: "text/csv;charset=utf-8" }));
  const link = document.createElement("a");
  link.href = url;
  link.download = `reviewtap-orders-${new Date().toISOString().slice(0, 10)}.csv`;
  link.click();
  URL.revokeObjectURL(url);
  showToast("CSV exported", `${state.orders.length} orders included.`);
}

function saveAdminProducts(form) {
  getProducts().forEach((product) => {
    state.productOverrides[product.id] = {
      ...(state.productOverrides[product.id] || {}),
      startingPriceSek: Number(form.elements[`price-${product.id}`]?.value || product.startingPriceSek),
      stock: Number(form.elements[`stock-${product.id}`]?.value || 0),
      active: Boolean(form.elements[`active-${product.id}`]?.checked)
    };
  });
  writeStorage(storageKeys.productOverrides, state.productOverrides);
  showToast("Products saved", "Storefront prices and stock are updated.");
  renderRoute();
}

function addAdminProduct(form) {
  const data = new FormData(form);
  const id = `custom-${data.get("name").toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "")}-${Date.now().toString(36)}`;
  state.customProducts.push({
    id,
    slug: id,
    name: data.get("name"),
    shortName: data.get("name"),
    description: data.get("description"),
    startingPriceSek: Number(data.get("price")),
    stock: Number(data.get("stock")),
    rating: 5,
    reviewCount: 0,
    ratingIsExample: true,
    image: data.get("image"),
    imageAlt: data.get("name"),
    badge: "New",
    customizable: true,
    active: true
  });
  writeStorage(storageKeys.customProducts, state.customProducts);
  showToast("Product added", "The new product is now in the catalog.");
  renderRoute();
}

function createDiscount(form) {
  const data = new FormData(form);
  const code = data.get("code").trim().toUpperCase();
  if (getDiscount(code)) {
    showToast("Code already exists", "Choose a different discount code.", "error");
    return;
  }
  state.discounts.push({
    code,
    type: data.get("type"),
    value: Number(data.get("value")),
    description: `${data.get("value")}${data.get("type") === "percentage" ? "%" : " SEK"} off`,
    minimumSubtotalSek: Number(data.get("minimum")),
    eligibleProductIds: [],
    active: true
  });
  writeStorage(storageKeys.discounts, state.discounts);
  showToast("Discount created", `${code} is active.`);
  renderRoute();
}

function saveShipping(form) {
  state.shippingMethods = state.shippingMethods.map((method) => ({
    ...method,
    priceSek: Number(form.elements[`price-${method.id}`].value),
    freeAboveSek: Number(form.elements[`free-${method.id}`].value),
    active: form.elements[`active-${method.id}`].checked
  }));
  writeStorage(storageKeys.shipping, state.shippingMethods);
  showToast("Shipping saved", "Checkout shipping options are updated.");
  renderRoute();
}

function saveContent(form) {
  const data = new FormData(form);
  state.siteContent = {
    heroHeadline: data.get("heroHeadline"),
    heroDescription: data.get("heroDescription"),
    heroImage: data.get("heroImage") || "assets/images/hero-reviewtap.webp",
    email: data.get("email"),
    phoneDisplay: data.get("phoneDisplay"),
    phoneHref: data.get("phoneHref")
  };
  writeStorage(storageKeys.content, state.siteContent);
  showToast("Content saved", "The storefront is updated on this device.");
  updateFooter();
}

function updateCheckoutTotalsView() {
  const totals = cartTotals(state.checkoutShippingId);
  document.querySelectorAll(".order-summary .summary-line").forEach((line) => {
    const label = line.querySelector("span")?.textContent.trim();
    const value = line.querySelector("strong");
    if (!value) return;
    if (label === "Shipping") value.textContent = totals.shipping ? money(totals.shipping) : "Free";
    if (label === "Total") value.textContent = money(totals.total);
  });
}

function uploadDesignPreview(input) {
  const file = input.files?.[0];
  const result = validateFile(file, ["image/png", "image/jpeg", "image/svg+xml"], 1);
  if (!result.valid) {
    showToast("Preview not accepted", result.message, "error");
    return;
  }
  readImageFile(file, (dataUrl) => {
    const order = state.orders.find((item) => item.id === input.dataset.orderId);
    order.designPreview = dataUrl;
    updateOrder(order);
    showToast("Preview uploaded", "It is ready to send for customer approval.");
    state.adminOrderId = order.id;
    renderRoute();
  });
}

function sendApproval(orderId) {
  const order = state.orders.find((item) => item.id === orderId);
  if (!order.designPreview) {
    showToast("Upload a preview first", "Add a design preview before sending approval.", "error");
    return;
  }
  order.status = "awaiting-approval";
  order.approvalStatus = "pending";
  order.history = (order.history || []).filter((item) => item.status !== "awaiting-approval");
  order.history.push({ status: "awaiting-approval", date: new Date().toISOString() });
  order.comments = [
    ...(order.comments || []),
    { author: "ReviewTap design team", role: "admin", text: "Your digital preview is ready for approval.", date: new Date().toISOString() }
  ];
  updateOrder(order);
  showToast("Approval ready", "Demo status updated. Connect email to send a real approval link.");
  renderRoute();
}

function addInternalNote(orderId) {
  const input = document.querySelector("#internal-note");
  const text = input?.value.trim();
  if (!text) return showToast("Write a note first", "", "error");
  const order = state.orders.find((item) => item.id === orderId);
  order.internalNotes = [...(order.internalNotes || []), { text, date: new Date().toISOString() }];
  updateOrder(order);
  showToast("Internal note added");
  renderRoute();
}

function downloadLogo(orderId) {
  const order = state.orders.find((item) => item.id === orderId);
  const config = order.items.find((item) => item.customization?.logoData)?.customization;
  if (!config) return showToast("No logo available", "", "error");
  const link = document.createElement("a");
  link.href = config.logoData;
  link.download = config.logoName || `${order.id}-logo`;
  link.click();
}

function cookieChoice(choice) {
  writeStorage(storageKeys.cookie, choice);
  document.querySelector("#cookie-banner").hidden = true;
  document.querySelector("#cookie-dialog")?.close();
  showToast("Privacy choice saved", choice.analytics ? "Analytics permitted when a provider is connected." : "Only essential storage will be used.");
}

function initializeCookies() {
  const choice = readStorage(storageKeys.cookie, null);
  document.querySelector("#cookie-banner").hidden = Boolean(choice);
}

document.addEventListener("click", (event) => {
  const toggle = event.target.closest("#menu-toggle");
  if (toggle) {
    toggle.getAttribute("aria-expanded") === "true" ? closeMobileMenu() : openMobileMenu();
    return;
  }
  const actionTarget = event.target.closest("[data-action]");
  if (!actionTarget) return;
  const action = actionTarget.dataset.action;
  if (action === "toggle-faq") {
    const expanded = actionTarget.getAttribute("aria-expanded") === "true";
    actionTarget.setAttribute("aria-expanded", String(!expanded));
    document.querySelector(`#${actionTarget.getAttribute("aria-controls")}`).hidden = expanded;
  } else if (action === "quick-add") quickAdd(actionTarget.dataset.productId);
  else if (action === "test-review-link") {
    updateCustomizerFromForm();
    if (!validateReviewUrl(state.customize.reviewLink)) {
      showToast("Enter a complete link", "Paste a link beginning with https:// before testing.", "error");
      document.querySelector("#review-link")?.focus();
    } else window.open(state.customize.reviewLink, "_blank", "noopener,noreferrer");
  } else if (action === "add-custom-to-cart") addCustomToCart();
  else if (action === "cart-decrease") updateCartItem(actionTarget.dataset.itemId, -1);
  else if (action === "cart-increase") updateCartItem(actionTarget.dataset.itemId, 1);
  else if (action === "cart-remove") removeCartItem(actionTarget.dataset.itemId);
  else if (action === "toggle-billing") document.querySelector("#billing-fields").hidden = actionTarget.checked;
  else if (action === "approve-design") approveDesign(actionTarget.dataset.orderId);
  else if (action === "request-changes") requestChanges(actionTarget.dataset.orderId);
  else if (action === "contact-again") renderRoute();
  else if (action === "admin-tab") {
    state.adminTab = actionTarget.dataset.tab;
    state.adminOrderId = null;
    renderRoute();
  } else if (action === "admin-logout") {
    sessionStorage.removeItem("reviewtap_admin_demo");
    state.adminTab = "overview";
    renderRoute();
  } else if (action === "admin-export") exportOrdersCsv();
  else if (action === "open-order") {
    state.adminOrderId = actionTarget.dataset.orderId;
    renderRoute();
  } else if (action === "close-order") {
    const closedOrderId = state.adminOrderId;
    state.adminOrderId = null;
    renderRoute().then(() =>
      document
        .querySelector(`[data-action="open-order"][data-order-id="${closedOrderId}"]`)
        ?.focus()
    );
  } else if (action === "delete-discount") {
    state.discounts = state.discounts.filter((discount) => discount.code !== actionTarget.dataset.code);
    writeStorage(storageKeys.discounts, state.discounts);
    showToast("Discount removed");
    renderRoute();
  } else if (action === "send-approval") sendApproval(actionTarget.dataset.orderId);
  else if (action === "add-internal-note") addInternalNote(actionTarget.dataset.orderId);
  else if (action === "download-logo") downloadLogo(actionTarget.dataset.orderId);
  else if (action === "cookie-essential") cookieChoice({ essential: true, analytics: false });
  else if (action === "cookie-accept") cookieChoice({ essential: true, analytics: true });
  else if (action === "cookie-settings") {
    const dialog = document.querySelector("#cookie-dialog");
    const existing = readStorage(storageKeys.cookie, { analytics: false });
    dialog.querySelector("#analytics-consent").checked = Boolean(existing.analytics);
    dialog.showModal();
  } else if (action === "cookie-save") {
    event.preventDefault();
    cookieChoice({ essential: true, analytics: document.querySelector("#analytics-consent").checked });
  }
});

document.addEventListener("input", (event) => {
  if (event.target.closest("#customizer-form") && event.target.type !== "file") updateCustomizerFromForm();
  if (event.target.id === "admin-order-search") {
    const query = event.target.value.trim().toLowerCase();
    document.querySelectorAll("[data-order-row]").forEach((row) => {
      row.hidden = !row.dataset.search.includes(query);
    });
  }
});

document.addEventListener("change", (event) => {
  if (event.target.closest("#customizer-form") && event.target.type !== "file") {
    updateCustomizerFromForm();
    if (event.target.name === "productId") {
      const newId = productRouteId(event.target.value);
      history.replaceState(null, "", `#/customize/${newId}`);
    }
  }
  if (event.target.id === "logo-upload") handleLogoUpload(event.target);
  if (event.target.name === "shippingMethod") {
    state.checkoutShippingId = event.target.value;
    updateCheckoutTotalsView();
  }
  if (event.target.matches('[data-action="admin-status"]')) adminUpdateStatus(event.target);
  if (event.target.id === "admin-preview-upload") uploadDesignPreview(event.target);
});

document.addEventListener("submit", (event) => {
  event.preventDefault();
  const form = event.target;
  if (form.id === "discount-form") handleDiscount(form);
  else if (form.id === "checkout-form") placeOrder(form);
  else if (form.id === "track-form") trackOrder(form);
  else if (form.id === "approval-search-form") {
    const data = new FormData(form);
    location.hash = `#/approval?order=${encodeURIComponent(data.get("orderNumber"))}&email=${encodeURIComponent(data.get("email"))}`;
  } else if (form.id === "contact-form") handleContactSubmit(form);
  else if (form.id === "admin-login-form") handleAdminLogin(form);
  else if (form.id === "admin-products-form") saveAdminProducts(form);
  else if (form.id === "admin-add-product-form") addAdminProduct(form);
  else if (form.id === "admin-discount-form") createDiscount(form);
  else if (form.id === "admin-shipping-form") saveShipping(form);
  else if (form.id === "admin-content-form") saveContent(form);
});

document.addEventListener("dragover", (event) => {
  const zone = event.target.closest("#logo-upload-zone");
  if (!zone) return;
  event.preventDefault();
  zone.classList.add("dragover");
});

document.addEventListener("dragleave", (event) => {
  event.target.closest("#logo-upload-zone")?.classList.remove("dragover");
});

document.addEventListener("drop", (event) => {
  const zone = event.target.closest("#logo-upload-zone");
  if (!zone) return;
  event.preventDefault();
  zone.classList.remove("dragover");
  const input = zone.querySelector("input");
  if (event.dataTransfer.files?.length) {
    const transfer = new DataTransfer();
    transfer.items.add(event.dataTransfer.files[0]);
    input.files = transfer.files;
    handleLogoUpload(input);
  }
});

document.querySelector("#mobile-menu").addEventListener("click", (event) => {
  if (event.target.closest("a")) closeMobileMenu();
});

window.addEventListener("hashchange", renderRoute);
window.addEventListener("keydown", (event) => {
  const drawer = document.querySelector("#order-drawer");
  if (event.key === "Tab" && drawer) {
    const focusable = [
      ...drawer.querySelectorAll(
        'button:not([disabled]), input:not([disabled]), textarea:not([disabled]), select:not([disabled]), a[href]'
      )
    ].filter((element) => element.getClientRects().length);
    const first = focusable[0];
    const last = focusable[focusable.length - 1];
    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault();
      last?.focus();
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault();
      first?.focus();
    }
  }
  if (event.key === "Escape" && state.adminOrderId) {
    state.adminOrderId = null;
    renderRoute();
  }
});

updateCartBadges();
updateFooter();
initializeCookies();
renderRoute();
