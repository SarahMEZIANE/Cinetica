import { useState } from 'react';
import { Movie } from '@/app/entites/Movie';
import Person from '@/app/entites/Person';

export function useTopRatedMovies() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchMovies = async (page: number = 1) => {
    setLoading(true);
    try {
      const response = await fetch(`/api/movies/top-rated?page=${page}`);
      const moviesData = await response.json();

      if (moviesData.error) {
        setError(moviesData.error);
        return;
      }

      
      const movies = moviesData.results.map((movie: Movie) => ({
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

      setMovies(movies);
    } catch (err) {
      console.error('Error fetching movies:', err);
      setError('An error occurred while fetching the movies');
    } finally {
      setLoading(false);
    }
  };

  return { movies, loading, error, fetchMovies };
}
