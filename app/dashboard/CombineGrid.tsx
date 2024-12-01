import React, { useState } from "react";
import MovieCard from "./MoviesCard";
import ShowsCard from "./ShowsCard";
import MovieDetailsModal from "./MovieDetailsModal";
import { Movie } from "@/app/entites/Movie";
import { TVShow } from "@/app/entites/TVShow";
import { useSearch } from "@/hooks/useSearch";
import SearchBar from "./SearchBar";

interface CombinedGridProps {
  movies: Movie[];
  shows: TVShow[];
  loading: boolean;
  error: string | null;
}

const CombinedGrid: React.FC<CombinedGridProps> = ({ movies, shows, loading, error }) => {
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);
  const { searchResults, loading: searchLoading, error: searchError, search } = useSearch();

  const handleMovieClick = (movie: Movie) => {
    setSelectedMovie(movie);
  };

  const handleCloseModal = () => {
    setSelectedMovie(null);
  };

  const displayMovies = searchResults.length > 0 ? searchResults.filter((result): result is Movie => 'title' in result) : movies;
  const displayShows = searchResults.length > 0 ? searchResults.filter((result): result is TVShow => 'name' in result) : shows;

  return (
    <div className="relative p-4">
      <SearchBar search={search} />
      {loading || searchLoading ? (
        <div className="flex items-center justify-center h-64">
          <div className="w-10 h-10 border-4 border-yellow-500 border-t-transparent rounded-full animate-spin"></div>
        </div>
      ) : error || searchError ? (
        <div className="flex items-center justify-center h-64">
          <p className="text-red-500 font-semibold">{error || searchError}</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h3 className="text-xl font-semibold mb-4">Movies</h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {displayMovies.map((movie) => (
                <div key={movie.id} onClick={() => handleMovieClick(movie)}>
                  <MovieCard
                    title={movie.title || "Unknown Title"}
                    posterPath={movie.poster_path || ""}
                    overview={movie.overview || "No overview available"}
                    rating={movie.vote_average || 0}
                    release_date={movie.release_date || "Unknown Release Date"}
                  />
                </div>
              ))}
            </div>
          </div>
          <div>
            <h3 className="text-xl font-semibold mb-4">TV Shows</h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {displayShows.map((show) => (
                <ShowsCard
                  key={show.id}
                  name={show.name || "Unknown Name"}
                  posterPath={show.poster_path || ""}
                  overview={show.overview || "No overview available"}
                  rating={show.vote_average || 0}
                />
              ))}
            </div>
          </div>
        </div>
      )}
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