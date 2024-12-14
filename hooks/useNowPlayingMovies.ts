import { useState, useCallback } from 'react';
import { fetchNowPlayingMovies } from '@/app/repository/NowPlayingMovies'; 
import { Movie } from '@/app/entites/Movie';

export function useNowPlayingMovies() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchMovies = useCallback(async (page: number = 1) => {
    setLoading(true);
    setError(null);

    try {
      const moviesData = await fetchNowPlayingMovies(page);
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
