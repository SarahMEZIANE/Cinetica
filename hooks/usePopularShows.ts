import { useState, useCallback } from 'react';
import { fetchPopularShows } from '@/app/repository/PopularShows';
import { TVShow } from '@/app/entites/TVShow';

export function usePopularShows() {
  const [shows, setShows] = useState<TVShow[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchShows = useCallback(async (page: number = 1) => {
    setLoading(true);
    setError(null);

    try {
      const showsData = await fetchPopularShows(page);
      setShows(showsData);
    } catch (err) {
      console.error('Error fetching shows:', err);
      setError('An error occurred while fetching the shows');
    } finally {
      setLoading(false);
    }
  }, []);

  return { shows, loading, error, fetchShows };
}
