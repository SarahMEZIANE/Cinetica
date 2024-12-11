import React from 'react';
import { useSlider } from '@/hooks/useSlider';
import MovieCard from './MoviesCard';
import SliderNavButton from './SliderNavButton';
import { Movie } from '../../entites/Movie';

interface MovieSliderProps {
  title: string;
  movies: Movie[];
}

const MovieSlider: React.FC<MovieSliderProps> = ({ title, movies }) => {
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