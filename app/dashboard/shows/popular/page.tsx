'use client'

import React, { useState, useEffect } from 'react';
import { usePopularShows } from '../../../../hooks/usePopularShows';
import MovieGrid from '../../MovieList';

const ShowsPage = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const { shows, loading, error, fetchShows } = usePopularShows();

  useEffect(() => {
    fetchShows(currentPage);
  }, [currentPage]);

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
  };

  return (
    <div>
      <h1 className="text-2xl text-center my-6">Popular TV SHOWS</h1>
      <MovieGrid fetchMovies={ fetchShows }  movies={shows} loading={loading} error={error} />

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

export default ShowsPage;
