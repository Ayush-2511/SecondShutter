import { fetchApi } from './config';

export async function getCart() {
  return fetchApi('/cart');
}

export async function addToCart(productId) {
  return fetchApi('/cart', {
    method: 'POST',
    body: JSON.stringify({ product_id: productId })
  });
}

export async function removeFromCart(productId) {
  return fetchApi(`/cart/${productId}`, {
    method: 'DELETE'
  });
}

export async function checkoutCart(shippingAddress, shippingOption) {
  return fetchApi('/checkout', {
    method: 'POST',
    body: JSON.stringify({
      shipping_address: shippingAddress,
      shipping_option: shippingOption
    })
  });
}
