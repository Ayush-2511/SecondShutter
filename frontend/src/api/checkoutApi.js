import { fetchApi } from './config';

export async function processCheckout(checkoutData) {
  return fetchApi('/checkout', {
    method: 'POST',
    body: JSON.stringify(checkoutData)
  });
}
