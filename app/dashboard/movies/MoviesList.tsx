import React from 'react';
import MovieCard from './MoviesCard';
import { Movie } from '@/app/entites/Movie';

interface MovieGridProps {
  movies: Movie[];
  loading: boolean;
  error: string | null;
  fetchMovies: (page: number) => void;
}

const MovieGrid: React.FC<MovieGridProps> = ({ movies, loading, error }) => {
  return (
    <div className="relative">
      {loading ? (
        <div className="flex items-center justify-center h-64">
          <div className="w-10 h-10 border-4 border-yellow-500 border-t-transparent rounded-full animate-spin"></div>
        </div>
      ) : error ? (
        <div className="flex items-center justify-center h-64">
          <p className="text-red-500 font-semibold">{error}</p>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6 p-4 mx-auto">
            {movies.map((movie) => (
              <div 
                key={movie.id} 
              >
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
