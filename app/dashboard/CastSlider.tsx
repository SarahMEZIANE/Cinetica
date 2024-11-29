import React, { RefObject } from 'react';
import { ChevronLeftIcon, ChevronRightIcon } from 'lucide-react';
import Person from '../entites/Person';

interface CastSliderProps {
  cast: Person[];
  scroll:  (direction: "left" | "right") => void;
  sliderRef: RefObject<HTMLDivElement>;
}

const CastSlider: React.FC<CastSliderProps> = ({ cast, scroll, sliderRef}) => {

  return (
    <div className="relative">
      <button
        onClick={() => scroll('left')}
        className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-black/30 hover:bg-black/50 text-white p-2 rounded-full"
      >
        <ChevronLeftIcon className="w-6 h-6" />
      </button>
      
      <div
        ref={sliderRef}
        className="flex gap-4 overflow-x-auto scrollbar-hide scroll-smooth py-4 px-8"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        {cast.map((actor) => (
          <div
            key={actor.id}
            className="flex-none w-[160px]"
          >
            <div className="bg-gray-200 dark:bg-gray-700 rounded-lg overflow-hidden">
              <img
                src={`https://image.tmdb.org/t/p/w185${actor.profile_path}`}
                alt={actor.name}
                className="w-full h-[200px] object-cover"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = 'https://via.placeholder.com/185x278?text=No+Image';
                }}
              />
            </div>
            <div className="mt-2 text-center">
              <p className="font-semibold text-sm">{actor.name}</p>
              <p className="text-gray-500 dark:text-gray-400 text-xs">{actor.character}</p>
            </div>
          </div>
        ))}
      </div>

      <button
        onClick={() => scroll('right')}
        className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-black/30 hover:bg-black/50 text-white p-2 rounded-full"
      >
        <ChevronRightIcon className="w-6 h-6" />
      </button>
    </div>
  );
}

export default CastSlider;