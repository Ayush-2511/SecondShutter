import { fetchApi } from './config';

export async function getProducts(filters = {}) {
  const params = new URLSearchParams();
  if (filters.category && filters.category !== 'all') {
    params.append('category', filters.category);
  }
  if (filters.brand && filters.brand !== 'all') {
    params.append('brand', filters.brand);
  }
  if (filters.sort) {
    params.append('sort', filters.sort);
  }
  if (filters.q) {
    params.append('q', filters.q);
  }

  const queryString = params.toString();
  return fetchApi(`/products${queryString ? `?${queryString}` : ''}`);
}

export async function getProductBySlug(slug) {
  return fetchApi(`/products/${slug}`);
}
