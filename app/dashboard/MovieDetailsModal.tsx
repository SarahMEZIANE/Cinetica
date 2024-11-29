import { StarIcon, X } from 'lucide-react';
import React from 'react';
import Person from '../entites/Person';
import CastSlider from './CastSlider';

interface MovieDetailsModalProps {
  title: string;
  overview: string;
  release_date: string;
  posterPath: string;
  rating: number;
  cast: Person[];
  onClose: () => void;
}

const MovieDetailsModal: React.FC<MovieDetailsModalProps> = ({
  title,
  posterPath,
  overview,
  release_date,
  rating,
  onClose,
  cast = [],
}) => {
  const bannerUrl = `https://image.tmdb.org/t/p/original${posterPath}`;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 flex justify-center items-start z-40 overflow-y-auto p-4">
      <div className="bg-white dark:bg-gray-800 rounded-lg overflow-hidden max-w-4xl w-full relative shadow-xl my-8">
        <button
          onClick={onClose}
          className="absolute z-50 top-4 right-4 bg-black/50 hover:bg-black/70 text-white rounded-full p-2 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="relative h-[400px]">
          <img
            src={bannerUrl}
            alt={title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent flex flex-col justify-end p-6">
            <h2 className="text-white text-3xl font-bold mb-2">{title}</h2>
            <div className="flex items-center gap-4">
              <span className="text-white/90">{release_date}</span>
              <div className="flex items-center bg-yellow-500 text-white text-sm font-bold px-3 py-1 rounded-full">
                <StarIcon className="w-4 h-4 mr-1" />
                {rating.toFixed(1)}
              </div>
            </div>
          </div>
        </div>

        <div className="p-6 space-y-6">
          <div>
            <h3 className="text-xl font-semibold mb-3 dark:text-white">Overview</h3>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">{overview}</p>
          </div>

          <div>
            <h3 className="text-xl font-semibold mb-4 dark:text-white">Cast</h3>
            <CastSlider cast={cast} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieDetailsModal;