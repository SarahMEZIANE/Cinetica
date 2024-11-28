import { TVShow } from '@/app/entites/TVShow';
import ShowsCard from './ShowsCard';

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
              <ShowsCard 
                key={show.id} 
                name={show.name} 
                posterPath={show.poster_path} 
                overview={show.overview} 
                rating={show.vote_average}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default ShowsGrid;
