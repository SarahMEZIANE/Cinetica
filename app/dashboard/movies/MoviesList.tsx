import React, { useState } from 'react';
import MovieCard from './MoviesCard';
import MovieDetailsModal from './MovieDetailsModal';
import { Movie } from '@/app/entites/Movie';

interface MovieGridProps {
  movies: Movie[];
  loading: boolean;
  error: string | null;
  fetchMovies: (page: number) => void;
}

const MovieGrid: React.FC<MovieGridProps> = ({ movies, loading, error }) => {
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);

  const handleCardClick = (movie: Movie) => {
    setSelectedMovie(movie);
  };

  const handleCloseModal = () => {
    setSelectedMovie(null);
  };

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
                onClick={() => handleCardClick(movie)}
              >
                <MovieCard 
                  title={movie.title} 
                  posterPath={movie.poster_path} 
                  overview={movie.overview} 
                  rating={movie.vote_average}
                  release_date={movie.release_date}
                />
              </div>
            ))}
          </div>

          {/* Render the modal if a movie is selected */}
          {selectedMovie && (
            <MovieDetailsModal
              title={selectedMovie.title}
              posterPath={selectedMovie.backdrop_path}
              overview={selectedMovie.overview}
              onClose={handleCloseModal}
              rating={selectedMovie.vote_average}
              release_date={selectedMovie.release_date}
              cast={selectedMovie.cast}
              trailer={selectedMovie.trailer}
            />
          )}
        </>
      )}
    </div>
  );
};

export default MovieGrid;
