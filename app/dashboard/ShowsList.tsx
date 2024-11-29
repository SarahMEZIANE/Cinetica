import React, { useState } from 'react';
import ShowsCard from './ShowsCard';
import { TVShow } from '@/app/entites/TVShow';
import ShowsDetailsModal from './ShowsDetailsModal';

interface ShowsGridProps {
  shows: TVShow[];
  loading: boolean;
  error: string | null;
  fetchShows: (page: number) => void;
}

const ShowsGrid: React.FC<ShowsGridProps> = ({ shows, loading, error }) => {
  const [selectedShow, setselectedShow] = useState<TVShow | null>(null);

  const handleCardClick = (show: TVShow) => {
    setselectedShow(show);
  };

  const handleCloseModal = () => {
    setselectedShow(null);
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
            {shows.map((show) => (
              <div 
                key={show.id} 
                onClick={() => handleCardClick(show)}
              >
                <ShowsCard 
                  name={show.name} 
                  posterPath={show.poster_path} 
                  overview={show.overview} 
                  rating={show.vote_average}
                  first_air_date={show.first_air_date}
                />
              </div>
            ))}
          </div>

          {/* Render the modal if a movie is selected */}
          {selectedShow && (
            <ShowsDetailsModal
              name={selectedShow.name}
              posterPath={selectedShow.backdrop_path}
              overview={selectedShow.overview}
              onClose={handleCloseModal}
              rating={selectedShow.vote_average}
              first_air_date={selectedShow.first_air_date}
              cast={selectedShow.cast}
            />
          )}
        </>
      )}
    </div>
  );
};

export default ShowsGrid;
