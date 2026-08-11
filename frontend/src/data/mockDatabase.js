/**
 * mockDatabase.js
 *
 * This is the single source of truth for all mock data.
 * The schema is designed to exactly mirror what a real REST API
 * (e.g. Express + PostgreSQL) would return, so swapping in real
 * endpoints later requires only changing the API layer, not the components.
 *
 * SCHEMA:
 *   products[]    → /api/products
 *   users[]       → /api/users/:id
 *   cart_items[]  → /api/cart?user_id=
 *   orders[]      → /api/orders?user_id=
 *
 * NOTE: Each listing is a single physical unit from an individual seller.
 * Quantity in cart_items is always 1 and is not user-editable.
 */

// ─── PRODUCTS ──────────────────────────────────────────────────────────────────
export const products = [
  {
    id: "prod_001",
    slug: "fujifilm-xt5-18-55mm",
    brand: "FUJIFILM",
    name: "X-T5 + 18-55mm",
    category: "mirrorless",
    condition: "LIKE NEW",
    condition_score: "9.5/10",
    condition_note: "Minor brassing on hot shoe only.",
    badge: "HOT",
    shutter_count: 8200,
    original_price: 159000,
    current_price: 112999,
    currency: "INR",
    rating: 4.8,
    review_count: 24,
    in_stock: true,
    images: [],
    image_count: 3,
    description: "Fujifilm X-T5 body with XF 18-55mm f/2.8-4 kit lens. Professionally inspected by our experts — completely clean sensor, no scratches on the glass.",
    specs: [
      { label: "Sensor", value: "40.2MP APS-C X-Trans CMOS 5 HR BSI" },
      { label: "Mount", value: "Fujifilm X Mount" },
      { label: "Shutter Count", value: "~8,200 (Verified)" },
      { label: "Video", value: "6.2K 30p / 4K 60p" },
      { label: "Stabilisation", value: "IBIS 7 stops" },
      { label: "Battery", value: "NP-W235 (~740 shots)" },
    ],
    included_items: ["Body", "XF 18-55mm Lens", "NP-W235 Battery", "USB-C Cable", "Original Box"],
    seller: { name: "Rohan M.", verified: true, rating: 4.9 },
    created_at: "2026-07-15T09:00:00Z",
  },
  {
    id: "prod_002",
    slug: "sony-a7-iii",
    brand: "SONY",
    name: "Alpha A7 III",
    category: "mirrorless",
    condition: "EXCELLENT",
    condition_score: "9/10",
    condition_note: "Light use. All accessories included.",
    badge: null,
    shutter_count: 21000,
    original_price: 184000,
    current_price: 133999,
    currency: "INR",
    rating: 4.9,
    review_count: 41,
    in_stock: true,
    images: [],
    image_count: 3,
    description: "Sony A7 III full-frame mirrorless. Light use, all accessories included. Sensor recently cleaned.",
    specs: [
      { label: "Sensor", value: "24.2MP Full-Frame BSI CMOS" },
      { label: "Mount", value: "Sony FE (E-mount)" },
      { label: "Shutter Count", value: "~21,000 (Verified)" },
      { label: "Video", value: "4K 30p / 1080p 120p" },
      { label: "Stabilisation", value: "5-axis IBIS" },
      { label: "Battery", value: "NP-FZ100 (~710 shots)" },
    ],
    included_items: ["Body", "NP-FZ100 Battery", "BC-QZ1 Charger", "Shoulder Strap", "Original Box"],
    seller: { name: "Priya S.", verified: true, rating: 5.0 },
    created_at: "2026-07-22T11:00:00Z",
  },
  {
    id: "prod_003",
    slug: "canon-eos-r5",
    brand: "CANON",
    name: "EOS R5",
    category: "mirrorless",
    condition: "MINT",
    condition_score: "10/10",
    condition_note: "Pristine. Still in original sealed packaging.",
    badge: "RARE",
    shutter_count: 3100,
    original_price: 326000,
    current_price: 267999,
    currency: "INR",
    rating: 5.0,
    review_count: 12,
    in_stock: true,
    images: [],
    image_count: 3,
    description: "Canon EOS R5 in near-perfect condition. Purchased and barely used — still in original box.",
    specs: [
      { label: "Sensor", value: "45MP Full-Frame CMOS" },
      { label: "Mount", value: "Canon RF Mount" },
      { label: "Shutter Count", value: "~3,100 (Verified)" },
      { label: "Video", value: "8K RAW / 4K 120p" },
      { label: "Stabilisation", value: "8-stop IBIS" },
      { label: "Battery", value: "LP-E6NH (~490 shots)" },
    ],
    included_items: ["Body", "LP-E6NH Battery", "LC-E6 Charger", "Body Cap", "Original Box"],
    seller: { name: "Arjun K.", verified: true, rating: 4.8 },
    created_at: "2026-08-01T08:30:00Z",
  },
  {
    id: "prod_004",
    slug: "leica-q2",
    brand: "LEICA",
    name: "Q2",
    category: "compact",
    condition: "GOOD",
    condition_score: "8/10",
    condition_note: "Visible wear on body but optics are completely flawless.",
    badge: "SALE",
    shutter_count: 45000,
    original_price: 418000,
    current_price: 284999,
    currency: "INR",
    rating: 4.7,
    review_count: 9,
    in_stock: true,
    images: [],
    image_count: 3,
    description: "Leica Q2 fixed lens compact. Visible wear on body but optics are flawless. A true photographer's companion.",
    specs: [
      { label: "Sensor", value: "47.3MP Full-Frame CMOS" },
      { label: "Lens", value: "Summilux 28mm f/1.7 ASPH (fixed)" },
      { label: "Shutter Count", value: "~45,000 (Verified)" },
      { label: "Video", value: "4K 30p" },
      { label: "Stabilisation", value: "OIS" },
      { label: "Battery", value: "BP-SCL4 (~370 shots)" },
    ],
    included_items: ["Body + Fixed Lens", "BP-SCL4 Battery", "Charger", "Neck Strap"],
    seller: { name: "Sneha T.", verified: false, rating: 4.6 },
    created_at: "2026-08-05T14:00:00Z",
  },
];

// ─── USERS ─────────────────────────────────────────────────────────────────────
export const users = [
  {
    id: "user_001",
    email: "john.doe@example.com",
    first_name: "John",
    last_name: "Doe",
    phone: "+91 98765 43210",
    avatar_url: null,
    address: {
      street: "123 Main St",
      city: "Mumbai",
      state: "Maharashtra",
      zip: "400001",
    },
    created_at: "2025-03-10T10:00:00Z",
  },
];

// ─── TRADE-INS ─────────────────────────────────────────────────────────────────
// status: quote_requested | shipped | inspecting | completed | rejected
export let trade_ins = [
  {
    id: "trade_t509",
    user_id: "user_001",
    brand: "FUJIFILM",
    model: "X-T4",
    condition: "EXCELLENT",
    accessories: ["Battery & Charger", "Original Box"],
    cash_offer: 72000,
    credit_offer: 79200,
    status: "inspecting",
    // Steps in order. A real DB would track timestamps per step.
    steps: [
      { key: "quote",      label: "Quote",      completed: true  },
      { key: "shipped",    label: "Shipped",    completed: true  },
      { key: "inspecting", label: "Inspecting", completed: false },
      { key: "paid",       label: "Paid",       completed: false },
    ],
    submitted_at: "2026-08-01T10:00:00Z",
  },
];

// ─── CART ITEMS ────────────────────────────────────────────────────────────────
// Each listing is a single physical unit — quantity is always 1 and not user-editable.
// In a real DB this is a join table: user_id + product_id
export let cart_items = [
  {
    id: "cart_item_001",
    user_id: "user_001",
    product_id: "prod_001",
    added_at: "2026-08-11T10:00:00Z",
  },
  {
    id: "cart_item_002",
    user_id: "user_001",
    product_id: "prod_002",
    added_at: "2026-08-11T11:00:00Z",
  },
];

// ─── ORDERS ────────────────────────────────────────────────────────────────────
export const orders = [
  {
    id: "order_8992",
    user_id: "user_001",
    status: "delivered",  // pending | processing | shipped | delivered
    items: [
      { product_id: "prod_001", price_at_purchase: 112999 }
    ],
    shipping_address: {
      first_name: "John",
      last_name: "Doe",
      street: "123 Main St",
      city: "Austin",
      state: "TX",
      zip: "78701",
    },
    subtotal: 112999,
    shipping_cost: 0,
    tax: 7910,
    total: 120909,
    currency: "INR",
    placed_at: "2025-10-12T14:00:00Z",
    delivered_at: "2025-10-16T10:00:00Z",
  },
  {
    id: "order_8421",
    user_id: "user_001",
    status: "processing",
    items: [
      { product_id: "prod_003", price_at_purchase: 267999 }
    ],
    shipping_address: {
      first_name: "John",
      last_name: "Doe",
      street: "123 Main St",
      city: "Austin",
      state: "TX",
      zip: "78701",
    },
    subtotal: 267999,
    shipping_cost: 0,
    tax: 18760,
    total: 286759,
    currency: "INR",
    placed_at: "2025-11-04T09:00:00Z",
    delivered_at: null,
  },
];

// ─── SHIPPING RATES ────────────────────────────────────────────────────────────
export const shipping_rates = [
  { id: "ship_standard", label: "Standard Shipping", eta: "3–5 Business Days", price: 0 },
  { id: "ship_express",  label: "Express Shipping",  eta: "1–2 Business Days", price: 999 },
];

// ─── TAX / GST RATE ────────────────────────────────────────────────────────────
export const TAX_RATE = 0.07; // 7% GST

// ─── CURRENCY ──────────────────────────────────────────────────────────────────
export const CURRENCY = "INR";
export const CURRENCY_SYMBOL = "₹";
