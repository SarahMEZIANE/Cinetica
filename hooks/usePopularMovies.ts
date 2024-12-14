import { useState, useCallback } from 'react';
import { fetchPopularMovies } from '@/app/repository/PopularMovies';
import { Movie } from '@/app/entites/Movie';

export function usePopularMovies() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchMovies = useCallback(async (page: number = 1) => {
    setLoading(true);
    setError(null);

    try {
      const moviesData = await fetchPopularMovies(page);
      setMovies(moviesData);
    } catch (err) {
      console.error('Error fetching movies:', err);
      setError('An error occurred while fetching the movies');
    } finally {
      setLoading(false);
    }
  }, []);

  return { movies, loading, error, fetchMovies };
}
