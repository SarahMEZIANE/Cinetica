import React from 'react';
import { useSlider } from '@/hooks/useSlider';
import MovieCard from './MoviesCard';
import SliderNavButton from './SliderNavButton';
import { Movie } from '../../entites/Movie';
import { useRouter } from 'next/navigation';

interface MovieSliderProps {
  title: string;
  route: string;
  movies: Movie[];
}

const MovieSlider: React.FC<MovieSliderProps> = ({ title, route, movies }) => {
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
          {movies.map((movie) => (
            <div key={movie.id} className="flex-none w-[160px]">
              <MovieCard
                title={movie.title}
                overview={movie.overview}
                release_date={movie.release_date}
                posterPath={movie.poster_path}
                rating={movie.vote_average}
                cast={movie.cast}
                trailer={movie.trailer}
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