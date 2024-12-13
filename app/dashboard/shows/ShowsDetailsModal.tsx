import { StarIcon, X } from 'lucide-react';
import React from 'react';
import CastSlider from '../CastSlider';
import Person from '../../entites/Person';
import useCastSlider from '@/hooks/useCastSlider';
import { ShowVideo } from '@/app/entites/TVShow';

interface ShowsDetailsModalProps {
  name: string;
  overview: string;
  first_air_date: string;
  posterPath: string;
  rating: number;
  cast: Person[];
  trailer: ShowVideo;
  onClose: () => void;
}

const ShowsDetailsModal: React.FC<ShowsDetailsModalProps> = ({
  name,
  posterPath,
  overview,
  first_air_date,
  rating,
  onClose,
  cast = [],
  trailer,
}) => {
  const bannerUrl = `https://image.tmdb.org/t/p/original${posterPath}`;
  const {scroll, sliderRef} = useCastSlider();
  
  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 flex justify-center items-start z-40 overflow-y-auto p-4">
      <div className="bg-white dark:dark:bg-[#494949] rounded-lg overflow-hidden max-w-4xl w-full relative shadow-xl my-8">
        <button
          onClick={onClose}
          className="absolute z-50 top-4 right-4 bg-black/50 hover:bg-black/70 text-white rounded-full p-2 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="relative h-[400px]">
          {trailer ? (
            <div className="relative h-full">
              <iframe 
                className="absolute inset-0 w-full h-full"
                src={`https://www.youtube.com/embed/${trailer.key}?autoplay=1`}
                allow="autoplay; fullscreen;"
                title={name}
              />
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6">
                <h2 className="text-white text-3xl font-bold mb-2">{name}</h2>
                <div className="flex items-center gap-4">
                  <span className="text-white/90">{first_air_date}</span>
                  <div className="flex items-center bg-yellow-500 text-white text-sm font-bold px-3 py-1 rounded-full">
                    <StarIcon className="w-4 h-4 mr-1" />
                    {rating.toFixed(1)}
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="relative h-full">
              <img
                src={bannerUrl}
                alt={name}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent flex flex-col justify-end p-6">
                <h2 className="text-white text-3xl font-bold mb-2">{name}</h2>
                <div className="flex items-center gap-4">
                  <span className="text-white/90">{first_air_date}</span>
                  <div className="flex items-center bg-yellow-500 text-white text-sm font-bold px-3 py-1 rounded-full">
                    <StarIcon className="w-4 h-4 mr-1" />
                    {rating.toFixed(1)}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="p-6 space-y-6">
          <div>
            <h3 className="text-xl font-semibold mb-3 dark:text-white">Overview</h3>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">{overview}</p>
          </div>

          <div>
            <h3 className="text-xl font-semibold mb-4 dark:text-white">Cast</h3>
            <CastSlider cast={cast} scroll={scroll} sliderRef={sliderRef} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShowsDetailsModal;