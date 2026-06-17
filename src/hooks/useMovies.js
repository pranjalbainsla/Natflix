import { useEffect, useState } from 'react';
import { fetchMovies } from '../services/moviesApi.js';

export function useMovies() {
  const [searchQuery, setSearchQuery] = useState('');
  const [movies, setMovies] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const delay = searchQuery === '' ? 0 : 500;

    const timeoutId = setTimeout(async () => {
      setLoading(true);
      try {
        const data = await fetchMovies(searchQuery);
        setMovies(data.results);
        setErrorMessage(
          data.results.length === 0 ? 'Uh-oh, no movies found!' : ''
        );
      } catch {
        setErrorMessage(
          !navigator.onLine
            ? "You're offline. Check your internet connection."
            : 'Error loading movies!'
        );
      } finally {
        setLoading(false);
      }
    }, delay);

    return () => clearTimeout(timeoutId);
  }, [searchQuery]);

  return { searchQuery, setSearchQuery, movies, loading, errorMessage };
}
