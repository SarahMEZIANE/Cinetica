'use client'

import React from 'react';
import { usePage } from '../../../../hooks/usePage';
import { useNowPlayingMovies } from '../../../../hooks/useNowPlayingMovies';

import MovieGrid from '../MoviesList';
import { Film } from 'lucide-react';

const MoviesPage = () => {
  const { movies, loading, error, fetchMovies } = useNowPlayingMovies();
  const { currentPage, handlePageChange } = usePage(fetchMovies);

  return (
    <div>
      <h1 className="text-2xl text-center my-6 flex"> <Film className="w-6 h-6 mr-5" /> Now Playing Movies</h1>
      <MovieGrid fetchMovies={ fetchMovies }  movies={movies} loading={loading} error={error} />

      <div className="flex justify-center mt-6 space-x-4 p-4">
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="px-4 py-2 bg-gray-200 text-gray-600 rounded-lg dark:bg-white dark:text-black hover:bg-gray-300 disabled:opacity-50"
        >
          Previous
        </button>
        <span className="text-lg font-semibold text-gray-700 dark:text-white">
          Page {currentPage}
        </span>
        <button
          onClick={() => handlePageChange(currentPage + 1)}
          className="px-4 py-2 bg-gray-200 dark:bg-white dark:text-black text-gray-600 rounded-lg hover:bg-gray-300"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default MoviesPage;
