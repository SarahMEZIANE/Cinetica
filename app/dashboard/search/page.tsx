"use client";

import React, { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import MovieCard from "@/app/dashboard/MoviesCard";
import ShowsCard from "@/app/dashboard/ShowsCard";
import MovieDetailsModal from "@/app/dashboard/MovieDetailsModal";
import { Movie } from "@/app/entites/Movie";
import { TVShow } from "@/app/entites/TVShow";
import SearchBar from "@/app/dashboard/SearchBar";

const DashboardPage = () => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [shows, setShows] = useState<TVShow[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);
  const searchParams = useSearchParams();

  const fetchSearchResults = async (query: string) => {
    setLoading(true);
    setError(null);

    try {
      console.log("fetching search results");
      const response = await fetch(`/api/search?query=${query}`);
      if (!response.ok) {
        throw new Error("Error fetching search results");
      }

      const data = await response.json();
      setMovies(data.results.filter((result: any): result is Movie => result.media_type === "movie"));
      setShows(data.results.filter((result: any): result is TVShow => result.media_type === "tv"));
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("An unknown error occurred");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleMovieClick = (movie: Movie) => {
    setSelectedMovie(movie);
  };

  const handleCloseModal = () => {
    setSelectedMovie(null);
  };

  useEffect(() => {
    const query = searchParams.get("query");
    if (query) {
      fetchSearchResults(query);
    }
  }, [searchParams]);

  return (
    <div className="relative p-4">
      <SearchBar search={fetchSearchResults} />
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
          <div>
            <h3 className="text-xl font-semibold mb-4">Movies</h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {movies.map((movie) => (
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

export default DashboardPage;