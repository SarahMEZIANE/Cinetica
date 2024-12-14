import { useState, useCallback } from 'react';
import { fetchOnTheAirShows } from '@/app/repository/OnTheAirShows';
import { TVShow } from '@/app/entites/TVShow';

export function useOnTheAirShows() {
  const [shows, setShows] = useState<TVShow[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchShows = useCallback(async (page: number = 1) => {
    setLoading(true);
    setError(null);

    try {
      const showsData = await fetchOnTheAirShows(page);
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
