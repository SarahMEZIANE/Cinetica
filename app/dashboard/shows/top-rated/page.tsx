'use client'

import React from 'react';
import { useTopRatedShows } from '../../../../hooks/useTopRatedShows';
import { usePage } from '../../../../hooks/usePage';

import ShowsGrid from '../ShowsList';
import { Tv } from 'lucide-react';

const ShowsPage = () => {
  const { shows, loading, error, fetchShows } = useTopRatedShows();
  const { currentPage, handlePageChange } = usePage(fetchShows);

  return (
    <div>
      <h1 className="text-2xl my-6 flex"> <Tv className="w-6 h-6 mr-5" /> Top rated TV SHOWS</h1>
      <ShowsGrid fetchShows={ fetchShows }  shows={shows} loading={loading} error={error} />

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
