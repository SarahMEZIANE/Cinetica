import React, { useState } from 'react';
import { StarIcon } from 'lucide-react';
import MovieDetailsModal from './MovieDetailsModal';
import { MovieVideo } from '@/app/entites/Movie';
import Person from '@/app/entites/Person';

interface MovieCardProps {
  title: string;
  overview: string;
  release_date: string;
  posterPath: string;
  rating: number;
  cast: Person[];
  trailer: MovieVideo;
}

const MovieCard: React.FC<MovieCardProps> = ({
  title,
  overview,
  release_date,
  posterPath,
  rating,
  cast = [],
  trailer
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
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
            alt={title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <div className="absolute bottom-0 left-0 right-0 p-4">
              <h3 className="text-white text-sm font-semibold mb-1 line-clamp-1">{title}</h3>
              <div className="flex items-center text-white/90 text-xs">
                <StarIcon className="w-4 h-4 text-yellow-500 mr-1" />
                {rating.toFixed(1)}
              </div>
            </div>
          </div>
        </div>
      </div>

      {isModalOpen && (
        <MovieDetailsModal
          title={title}
          overview={overview}
          release_date={release_date}
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

export default MovieCard;