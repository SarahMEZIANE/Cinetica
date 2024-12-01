import React, { useState } from "react";
import MovieCard from "./MoviesCard";
import ShowsCard from "./ShowsCard";
import MovieDetailsModal from "./MovieDetailsModal";
import { Movie } from "@/app/entites/Movie";
import { TVShow } from "@/app/entites/TVShow";

interface CombinedGridProps {
  movies: Movie[];
  shows: TVShow[];
  loading: boolean;
  error: string | null;
}

const CombinedGrid: React.FC<CombinedGridProps> = ({ movies, shows, loading, error }) => {
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);

  const handleMovieClick = (movie: Movie) => {
    setSelectedMovie(movie);
  };

  const handleCloseModal = () => {
    setSelectedMovie(null);
  };

  return (
    <div className="relative p-4">
      {loading ? (
        <div className="flex items-center justify-center h-64">
          <div className="w-10 h-10 border-4 border-yellow-500 border-t-transparent rounded-full animate-spin"></div>
        </div>
      ) : error ? (
        <div className="flex items-center justify-center h-64">
          <p className="text-red-500 font-semibold">{error}</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Movies Column */}
          <div>
            <h3 className="text-xl font-semibold mb-4">Movies</h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {movies.map((movie) => (
                <div key={movie.id} onClick={() => handleMovieClick(movie)}>
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
          </div>

          {/* TV Shows Column */}
          <div>
            <h3 className="text-xl font-semibold mb-4">TV Shows</h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {shows.map((show) => (
                <ShowsCard
                  key={show.id}
                  name={show.name}
                  posterPath={show.poster_path}
                  overview={show.overview}
                  rating={show.vote_average}
                />
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Render the modal if a movie is selected */}
      {selectedMovie && (
        <MovieDetailsModal
          title={selectedMovie.title}
          posterPath={selectedMovie.backdrop_path}
          overview={selectedMovie.overview}
          onClose={handleCloseModal}
          rating={selectedMovie.vote_average}
          release_date={selectedMovie.release_date}
        />
      )}
    </div>
  );
};

export default CombinedGrid;
