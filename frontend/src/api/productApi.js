/**
 * productApi.js — Mock API layer for product operations
 *
 * Searches both mockDatabase (curated full-spec products) and
 * mockData (generated Browse catalogue) so every Browse card resolves.
 * Replace function bodies with real fetch() calls to go live.
 */

import { products as curatedProducts } from '../data/mockDatabase';
import { productsData as generatedProducts } from '../data/mockData';

// Combined pool — curated products take priority (they appear first)
const allProducts = [...curatedProducts, ...generatedProducts];

const SIMULATED_DELAY_MS = 100;
const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

/**
 * GET /api/products/:slug
 */
export async function getProductBySlug(slug) {
  await delay(SIMULATED_DELAY_MS);
  const product = allProducts.find((p) => p.slug === slug);
  if (!product) throw new Error(`Product not found: ${slug}`);
  return product;
}

/**
 * GET /api/products/:id
 */
export async function getProductById(id) {
  await delay(SIMULATED_DELAY_MS);
  const product = allProducts.find((p) => p.id === id);
  if (!product) throw new Error(`Product not found: ${id}`);
  return product;
}

/**
 * GET /api/products  (with optional filters)
 */
export async function getProducts({ category, limit } = {}) {
  await delay(SIMULATED_DELAY_MS);
  let result = [...allProducts];
  if (category) result = result.filter((p) => p.category === category);
  if (limit) result = result.slice(0, limit);
  return result;
}

