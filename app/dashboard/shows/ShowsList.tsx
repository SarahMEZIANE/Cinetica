import React from 'react';
import ShowsCard from './ShowsCard';
import { TVShow } from '@/app/entites/TVShow';

interface ShowsGridProps {
  shows: TVShow[];
  loading: boolean;
  error: string | null;
  fetchShows: (page: number) => void;
}

const ShowsGrid: React.FC<ShowsGridProps> = ({ shows, loading, error }) => {

  return (
    <div className="relative">
      {loading ? (
        <div className="flex items-center justify-center min-h-[200px]">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-yellow-500 " />
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
              >
                <ShowsCard 
                  name={show.name} 
                  posterPath={show.poster_path} 
                  overview={show.overview} 
                  rating={show.vote_average}
                  first_air_date={show.first_air_date}
                  trailer={show.trailer}
                  cast={show.cast}
                />
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default ShowsGrid;
