import { useState } from 'react';
import { ShowVideo, TVShow } from '@/app/entites/TVShow';
import Person from '@/app/entites/Person';

export function useTopRatedShows() {
  const [shows, setShows] = useState<TVShow[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchShows = async (page: number = 1) => {
    setLoading(true);
    try {
      const response = await fetch(`/api/shows/top-rated?page=${page}`);
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
      const showsWithTrailers = await Promise.all(
        tmpShows.map(async (show: TVShow) => {
          const videos = await fetch(`/api/shows/video?showID=${show.id}`);
          const v= await videos.json();
          const trailer = v.results.find(
            (video:ShowVideo) => video.type.toLowerCase() === 'trailer' && 
            video.site.toLowerCase() === 'youtube'
          );
          return { ...show, trailer };
        })
      );
      setShows(showsWithTrailers);
    } catch (err) {
      console.error('Error fetching movies:', err);
      setError('An error occurred while fetching the movies');
    } finally {
      setLoading(false);
    }
  };

  return { shows, loading, error, fetchShows };
}
