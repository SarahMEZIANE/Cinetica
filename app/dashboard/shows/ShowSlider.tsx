import React from 'react';
import { useSlider } from '@/hooks/useSlider';
import ShowCard from './ShowsCard';
import SliderNavButton from '../movies/SliderNavButton';
import TVShow from '@/app/entites/TVShow';
import { useRouter } from 'next/navigation';

interface ShowSliderProps {
  title: string;
  route: string;
  shows: TVShow[];
}

const MovieSlider: React.FC<ShowSliderProps> = ({ title, route, shows }) => {
  const { sliderRef, scroll } = useSlider();
  const router = useRouter();

  const navigate = (path: string) => {
      router.push(path);
  };
  return (
    <section className="">
      <div className='flex'>
        <h2 className="flex-1 float-right text-2xl font-bold mb-6 text-gray-800 dark:text-white">{title}</h2>
        <a onClick={() =>{navigate(route);}} className='flex-2 hover:underline text-blue-700 hover:cursor-pointer' >View All</a>
      </div>
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