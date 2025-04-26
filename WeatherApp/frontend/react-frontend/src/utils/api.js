// src/utils/api.js
import { jwtDecode } from 'jwt-decode';

/**
 * authFetch – tekee fetch-kutsun vain, jos localStorage.token on kelvollinen JWT
 * @param {string} url – kutsuttava osoite
 * @param {object} options – fetch‐asetukset (headers, method, body…)
 * @returns {Promise<Response>}
 * @throws Error jos token puuttuu, vanhentunut tai virheellinen
 */
export async function authFetch(url, options = {}) {
  const token = localStorage.getItem('token');
  if (!token) {
    throw new Error('Token puuttuu');
  }

  let payload;
  try {
    payload = jwtDecode(token);
    if (Date.now() / 1000 >= payload.exp) {
      localStorage.removeItem('token');
      throw new Error('Token vanhentunut');
    }
  } catch {
    localStorage.removeItem('token');
    throw new Error('Virheellinen token');
  }

  const headers = {
    ...(options.headers || {}),
    Authorization: `Bearer ${token}`,
  };

  return fetch(url, { ...options, headers });
}
