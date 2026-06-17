import { API_BASE_URL } from '../constants/config.js';

export async function fetchMovies(query = '') {
  const url = query
    ? `${API_BASE_URL}/getMovies?query=${encodeURIComponent(query)}`
    : `${API_BASE_URL}/getMovies`;

  const res = await fetch(url);

  if (!res.ok) {
    throw new Error('Failed to load movies');
  }

  return res.json();
}
