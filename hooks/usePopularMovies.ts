import { useState } from 'react';
import { Movie, MovieVideo} from '@/app/entites/Movie';
import Person from '@/app/entites/Person';

export function usePopularMovies() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchMovies = async (page: number = 1) => {
    setLoading(true);
    try {
      const response = await fetch(`/api/movies/popular?page=${page}`);
      const moviesData = await response.json();

      if (moviesData.error) {
        setError(moviesData.error);
        return;
      }

      const movies = moviesData.results.map((movie: Movie) => (
        {
        id: movie.id,
        title: movie.title,
        overview: movie.overview,
        release_date: movie.release_date,
        poster_path: movie.poster_path,
        backdrop_path: movie.backdrop_path,
        vote_average: movie.vote_average,
        popularity: movie.popularity,
        cast: movie.cast.map((person: Person): Person => ({
          id: person.id,
          name: person.name,
          profile_path: person.profile_path,
          job: person.job,
          character: person.character,
          order: person.order,
        })),
        director: null,
      }));

      const moviesWithTrailers = await Promise.all(
        movies.map(async (movie: Movie) => {
          const videos = await fetch(`/api/movies/video?movieID=${movie.id}`);
          const v= await videos.json();
          const trailer = v.results.find(
            (video:MovieVideo) => video.type.toLowerCase() === 'trailer' && 
            video.site.toLowerCase() === 'youtube'
          );
          return { ...movie, trailer };
        })
      );
      console.log(moviesWithTrailers);
      setMovies(moviesWithTrailers);
    } catch (err) {
      console.error('Error fetching movies:', err);
      setError('An error occurred while fetching the movies');
    } finally {
      setLoading(false);
    }
  };

  return { movies, loading, error, fetchMovies };
}
