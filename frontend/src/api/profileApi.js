import { fetchApi } from './config';

export async function getUser() {
  return fetchApi('/users/me');
}

export async function updateUser(userData) {
  return fetchApi('/users/me', {
    method: 'PATCH',
    body: JSON.stringify(userData)
  });
}

export async function getOrders() {
  return fetchApi('/users/me/orders');
}

export async function getListings() {
  return fetchApi('/users/me/listings');
}
