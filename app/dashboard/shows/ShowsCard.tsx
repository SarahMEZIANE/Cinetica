import React from 'react';
import { useCard } from "@/hooks/useCard";
import { StarIcon } from 'lucide-react';
import Person from '@/app/entites/Person';
import ShowsDetailsModal from './ShowsDetailsModal';
import { ShowVideo } from '@/app/entites/TVShow';

interface ShowCardProps {
  name: string;
  overview: string;
  first_air_date: string;
  posterPath: string;
  rating: number;
  cast: Person[];
  trailer: ShowVideo;
}

const ShowsCard: React.FC<ShowCardProps> = ({
  name,
  overview,
  first_air_date,
  posterPath,
  rating,
  cast = [],
  trailer
}) => {
  const {isModalOpen, setIsModalOpen} = useCard();
  const imageUrl = `https://image.tmdb.org/t/p/w500${posterPath}`;
  return (
    <>
      <div 
        onClick={() => setIsModalOpen(true)}
        className="relative group cursor-pointer transition-transform duration-300 hover:scale-105"
      >
        <div className="relative aspect-[2/3] rounded-lg overflow-hidden">
          <img
            src={imageUrl}
            alt={name}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <div className="absolute bottom-0 left-0 right-0 p-4">
              <h3 className="text-white text-sm font-semibold mb-1 line-clamp-1">{name}</h3>
              <div className="flex items-center text-white/90 text-xs">
                <StarIcon className="w-4 h-4 text-yellow-500 mr-1" />
                {rating.toFixed(1)}
              </div>
            </div>
          </div>
        </div>
      </div>

      {isModalOpen && (
        <ShowsDetailsModal
          name={name}
          overview={overview}
          first_air_date={first_air_date}
          posterPath={posterPath}
          rating={rating}
          cast={cast}
          trailer={trailer}
          onClose={() => setIsModalOpen(false)}
        />
      )}
    </>
  );
};

export default ShowsCard;