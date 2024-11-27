import { useState } from 'react';
import { TVShow } from '@/app/entites/TVShow';

export function useOnTheAirShows() {
  const [shows, setShows] = useState<TVShow[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchShows = async (page: number = 1) => {
    setLoading(true);
    try {
      const response = await fetch(`/api/shows/on-the-air?page=${page}`);
      const showsData = await response.json();

      if (showsData.error) {
        setError(showsData.error);
        return;
      }

      setShows(
        showsData.results.map((show: TVShow) => ({
          id: show.id,
          title: show.title,
          overview: show.overview,
          release_date: show.release_date,
          poster_path: show.poster_path,
          vote_average: show.vote_average,
          popularity: show.popularity,
        }))
      );
    } catch (err) {
      console.error('Error fetching movies:', err);
      setError('An error occurred while fetching the movies');
    } finally {
      setLoading(false);
    }
  };

  return { shows, loading, error, fetchShows };
}
