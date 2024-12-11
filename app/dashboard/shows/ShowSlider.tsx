import React from 'react';
import { useSlider } from '@/hooks/useSlider';
import ShowCard from './ShowsCard';
import SliderNavButton from '../movies/SliderNavButton';
import TVShow from '@/app/entites/TVShow';

interface ShowSliderProps {
  title: string;
  shows: TVShow[];
}

const MovieSlider: React.FC<ShowSliderProps> = ({ title, shows }) => {
  const { sliderRef, scroll } = useSlider();

  return (
    <section className="">
      <h2 className="text-2xl font-bold mb-6 text-gray-800 dark:text-white">{title}</h2>
      
      <div className="relative group">
        <SliderNavButton direction="left" onClick={() => scroll('left')} />

        <div
          ref={sliderRef}
          className="flex gap-4 overflow-x-auto scrollbar-hide scroll-smooth pb-4"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {shows.map((show: TVShow) => (
            <div key={show.id} className="flex-none w-[160px]">
              <ShowCard
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

        <SliderNavButton direction="right" onClick={() => scroll('right')} />
      </div>
    </section>
  );
}

export default MovieSlider;