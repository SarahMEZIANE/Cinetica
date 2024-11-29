import React, { useRef } from 'react';
import MovieCard from '../MoviesCard';
import { SliderControls } from './SliderControl';
import Movie from '@/app/entites/Movie';
interface MediaSliderProps {
  title: string;
  items: Movie[];
  onItemClick: (item: Movie) => void;
}
export const MediaSlider: React.FC<MediaSliderProps> = ({ title, items, onItemClick }) => {
  const sliderRef = useRef<HTMLDivElement>(null);
  
  const scroll = (direction: 'left' | 'right') => {
    if (sliderRef.current) {
      const container = sliderRef.current;
      const scrollAmount = container.clientWidth * 0.8;
      const newScrollPosition = direction === 'left' 
        ? container.scrollLeft - scrollAmount 
        : container.scrollLeft + scrollAmount;
      
      container.scrollTo({
        left: newScrollPosition,
        behavior: 'smooth'
      });
    }
  };

  return (
    <div className="relative py-4 max-w-[100vw] overflow-hidden">
      {title && (
        <h2 className="text-2xl font-bold mb-4 px-4 dark:text-white">{title}</h2>
      )}
      
      <div className="relative group">
        <SliderControls 
          onScrollLeft={() => scroll('left')}
          onScrollRight={() => scroll('right')}
        />

        <div
          ref={sliderRef}
          className="flex gap-4 overflow-x-auto snap-x snap-mandatory scrollbar-hide px-4"
          style={{ scrollbarWidth: 'none' }}
        >
          {items.map((item) => (
            <div 
              key={item.id} 
              className="flex-none w-[200px] snap-start cursor-pointer transform transition-transform duration-300 hover:scale-105"
              onClick={() => onItemClick(item)}
            >
              <MovieCard
                title={item.title}
                posterPath={item.poster_path}
                overview={item.overview}
                rating={item.vote_average}
                release_date={item.release_date}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};