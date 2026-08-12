import { auth } from '../firebase';

const API_BASE = import.meta.env.VITE_API_BASE_URL || 'https://secondshutter.onrender.com/api';

export async function fetchApi(endpoint, options = {}) {
  let token = null;
  if (auth.currentUser) {
    token = await auth.currentUser.getIdToken();
  }

  const headers = {
    'Content-Type': 'application/json',
    ...options.headers,
  };

  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  const response = await fetch(`${API_BASE}${endpoint}`, {
    ...options,
    headers,
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.error || `HTTP Error ${response.status}`);
  }

  if (response.status === 204) return null;

  return response.json();
}
