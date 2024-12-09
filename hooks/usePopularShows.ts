import { useState } from 'react';
import { TVShow } from '@/app/entites/TVShow';
import Person from '@/app/entites/Person';

export function usePopularShows() {
  const [shows, setShows] = useState<TVShow[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchShows = async (page: number = 1) => {
    setLoading(true);
    try {
      const response = await fetch(`/api/shows/popular?page=${page}`);
      const showsData = await response.json();

      if (showsData.error) {
        setError(showsData.error);
        return;
      }

      
      const tmpShows=showsData.results.map((show: TVShow) => ({
          id: show.id,
          name: show.name,
          overview: show.overview,
          first_air_date: show.first_air_date,
          poster_path: show.poster_path,
          vote_average: show.vote_average,
          popularity: show.popularity,
          backdrop_path: show.backdrop_path,
          cast: show.cast.map((person: Person): Person => ({
            id: person.id,
            name: person.name,
            profile_path: person.profile_path,
            job: person.job,
            character: person.character,
            order: person.order,
          })),
          director: null,
        }));
        setShows(tmpShows);
      
    } catch (err) {
      console.error('Error fetching movies:', err);
      setError('An error occurred while fetching the movies');
    } finally {
      setLoading(false);
    }
  };

  return { shows, loading, error, fetchShows };
}
