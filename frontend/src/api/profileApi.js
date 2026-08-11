/**
 * profileApi.js — Mock API layer for user profile operations
 *
 * Mirrors real REST endpoints:
 *   GET  /api/users/:id            → getUser()
 *   PATCH /api/users/:id           → updateUser()
 *   GET  /api/orders?user_id=      → getOrders()
 *   GET  /api/trade-ins?user_id=   → getTradeIns()
 *
 * Swap function bodies with fetch() calls to connect a real backend.
 * Current user is hardcoded as "user_001" (replace with auth session later).
 */

import { users, orders, trade_ins, products } from '../data/mockDatabase';

const CURRENT_USER_ID = 'user_001';
const DELAY = (ms) => new Promise((r) => setTimeout(r, ms));

/**
 * GET /api/users/:id
 */
export async function getUser() {
  await DELAY(100);
  const user = users.find((u) => u.id === CURRENT_USER_ID);
  if (!user) throw new Error('User not found');
  return { ...user }; // return copy so mutations don't affect the source
}

/**
 * PATCH /api/users/:id
 * Accepts a partial user object — only provided fields are updated.
 */
export async function updateUser(fields) {
  await DELAY(150);
  const user = users.find((u) => u.id === CURRENT_USER_ID);
  if (!user) throw new Error('User not found');
  Object.assign(user, fields); // in real DB: UPDATE users SET ... WHERE id=?
  return { ...user };
}

/**
 * GET /api/orders?user_id=  (with product JOIN)
 */
export async function getOrders() {
  await DELAY(120);
  return orders
    .filter((o) => o.user_id === CURRENT_USER_ID)
    .map((order) => ({
      ...order,
      // Join product details onto each line item
      items: order.items.map((item) => {
        const product = products.find((p) => p.id === item.product_id);
        return {
          ...item,
          brand: product?.brand ?? 'Unknown',
          name: product?.name ?? 'Unknown',
          condition: product?.condition ?? '',
          slug: product?.slug ?? '',
        };
      }),
    }));
}

/**
 * GET /api/trade-ins?user_id=
 */
export async function getTradeIns() {
  await DELAY(100);
  return trade_ins.filter((t) => t.user_id === CURRENT_USER_ID);
}
