// components/MovieGrid.tsx
import React from 'react';
import MovieCard from './MoviesCard';
import { usePopularMoviesContext } from '@/contexts/PopularMoviesContext';

const MovieGrid: React.FC = () => {
  const { movies, loading, error } = usePopularMoviesContext();

  return (
    <div className="relative">
      {loading ? (
        <div className="flex items-center justify-center min-h-[200px]">
          <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-yellow-500 " />
        </div>
      ) : error ? (
        <div className="flex items-center justify-center h-64">
          <p className="text-red-500 font-semibold">{error}</p>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6 p-4 mx-auto">
            {movies.map((movie) => (
              <div key={movie.id}>
                <MovieCard
                  title={movie.title}
                  posterPath={movie.poster_path}
                  overview={movie.overview}
                  rating={movie.vote_average}
                  release_date={movie.release_date}
                  cast={movie.cast}
                  trailer={movie.trailer}
                />
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default MovieGrid;
