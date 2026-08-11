/**
 * cartApi.js  — Mock API layer for cart operations
 *
 * Every function returns a Promise just like a real fetch() call would.
 * To switch to a real backend, replace the bodies of these functions with
 * actual fetch('/api/cart/...') calls — no changes needed in components.
 *
 * Each listing is a SINGLE physical unit. There is no quantity field.
 * Current user is hardcoded as "user_001" (replace with auth session later).
 */

import { products as curatedProducts, cart_items, TAX_RATE, shipping_rates, CURRENCY_SYMBOL } from '../data/mockDatabase';
import { productsData as generatedProducts } from '../data/mockData';

const CURRENT_USER_ID = 'user_001';
const SIMULATED_DELAY_MS = 120;

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

// Combined product pool — same pattern as productApi.js
const allProducts = [...curatedProducts, ...generatedProducts];

// Helper: join cart_items with products (mirrors a SQL JOIN)
function buildCartResponse(items) {
  return items
    .filter((ci) => ci.user_id === CURRENT_USER_ID)
    .map((ci) => {
      const product = allProducts.find((p) => p.id === ci.product_id);
      if (!product) return null; // guard: product was deleted from DB
      return {
        cart_item_id: ci.id,
        product_id: ci.product_id,
        added_at: ci.added_at,
        // Flattened product fields
        brand: product.brand,
        name: product.name,
        condition: product.condition,
        current_price: product.current_price,
        original_price: product.original_price,
        currency: product.currency,
        currency_symbol: CURRENCY_SYMBOL,
        slug: product.slug,
        in_stock: product.in_stock,
      };
    })
    .filter(Boolean); // remove any nulls from missing products
}

/**
 * GET /api/cart
 */
export async function getCart() {
  await delay(SIMULATED_DELAY_MS);
  return buildCartResponse(cart_items);
}

/**
 * POST /api/cart  { product_id }
 * Adds a product. Ignored if already in cart (one unit per listing).
 */
export async function addToCart(productId) {
  await delay(SIMULATED_DELAY_MS);
  const already = cart_items.find(
    (ci) => ci.user_id === CURRENT_USER_ID && ci.product_id === productId
  );
  if (!already) {
    cart_items.push({
      id: `cart_item_${Date.now()}`,
      user_id: CURRENT_USER_ID,
      product_id: productId,
      added_at: new Date().toISOString(),
    });
  }
  return buildCartResponse(cart_items);
}

/**
 * DELETE /api/cart/:cart_item_id
 */
export async function removeFromCart(cartItemId) {
  await delay(SIMULATED_DELAY_MS);
  const idx = cart_items.findIndex((ci) => ci.id === cartItemId);
  if (idx !== -1) cart_items.splice(idx, 1);
  return buildCartResponse(cart_items);
}

/**
 * GET /api/cart/summary
 * Returns subtotal, shipping options, GST, and total in INR.
 */
export async function getCartSummary(shippingRateId = 'ship_standard') {
  await delay(SIMULATED_DELAY_MS);
  const items = buildCartResponse(cart_items);
  const subtotal = items.reduce((acc, item) => acc + item.current_price, 0);
  const selectedRate = shipping_rates.find((r) => r.id === shippingRateId) || shipping_rates[0];
  const tax = Math.round(subtotal * TAX_RATE);
  const total = subtotal + selectedRate.price + tax;

  return {
    items,
    item_count: items.length,
    subtotal,
    shipping: selectedRate,
    shipping_rates,
    tax,
    total,
    currency: 'INR',
    currency_symbol: CURRENCY_SYMBOL,
  };
}
