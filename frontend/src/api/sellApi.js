import { fetchApi } from './config';

export async function createListing(productData) {
  return fetchApi('/products', {
    method: 'POST',
    body: JSON.stringify(productData)
  });
}
