import React, { useState, useEffect } from 'react';
import { useTopRatedMovies } from '../../../../hooks/useTopRatedMovies';
import MovieGrid from '../MovieList';

const MoviesPage = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const { movies, loading, error, fetchMovies } = useTopRatedMovies();

  useEffect(() => {
    fetchMovies(currentPage);
  }, [currentPage]);

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
  };

  return (
    <div>
      <h1 className="text-2xl text-center my-6">Top Rated Movies</h1>
      <MovieGrid fetchMovies={ fetchMovies } movies={movies} loading={loading} error={error} />

      <div className="flex justify-center mt-6 space-x-4 p-4">
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="px-4 py-2 bg-gray-200 text-gray-600 rounded-lg hover:bg-gray-300 disabled:opacity-50"
        >
          Previous
        </button>
        <span className="text-lg font-semibold text-gray-700">
          Page {currentPage}
        </span>
        <button
          onClick={() => handlePageChange(currentPage + 1)}
          className="px-4 py-2 bg-gray-200 text-gray-600 rounded-lg hover:bg-gray-300"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default MoviesPage;
