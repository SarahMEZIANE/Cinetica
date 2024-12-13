'use client'

import React, { useEffect } from 'react';
import { usePopularMovies } from '@/hooks/usePopularMovies';
import MovieSlider from './movies/MovieSlider';
import { useTopRatedMovies } from '@/hooks/useTopRatedMovies';
import { useNowPlayingMovies } from '@/hooks/useNowPlayingMovies';
import { useOnTheAirShows } from '@/hooks/useOnTheAirShows';
import ShowSlider from './shows/ShowSlider';
import { useTopRatedShows } from '@/hooks/useTopRatedShows';
import { usePopularShows } from '@/hooks/usePopularShows';

export default function Page() {
  const { movies:popularMovies, loading:loadingPopularMovies, error:errorPopularMovies, fetchMovies:fetchPopularMovies } = usePopularMovies();
  const { movies:topRatedMovies,  error:errorTopRatedMovies, fetchMovies:fetchTopRatedMovies } = useTopRatedMovies();
  const { movies:nowPlayingMovies, error:errorNowPlayingMovies, fetchMovies:fetchNowPlayingMovies } = useNowPlayingMovies();
  const { shows:onTheAirShow, error:errorOnTheAirShow, fetchShows:fetchOnTheAirShow } = useOnTheAirShows();
  const { shows:topRatedShow,  error:errorTopRatedShow, fetchShows:fetchTopRatedShow } = useTopRatedShows();
  const { shows:popularShow, error:errorPopularShow, fetchShows:fetchPopularShow } = usePopularShows();


  useEffect(() => {
    fetchPopularMovies(1);
  }, []);

  useEffect(() => {
    fetchTopRatedMovies(1);
  }, []);

  useEffect(() => {
    fetchNowPlayingMovies(1);
  }, []);

  useEffect(() => {
    fetchOnTheAirShow(1);
  }, []);

  useEffect(() => {
    fetchTopRatedShow(1);
  }, []);

  useEffect(() => {
    fetchPopularShow(1);
  }, []);

  if (loadingPopularMovies) {
    return (
      <div className="flex items-center justify-center min-h-[200px]">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-yellow-500 " />
      </div>
    );
  }

  if (errorPopularMovies || errorTopRatedMovies || errorNowPlayingMovies || errorOnTheAirShow || errorTopRatedShow || errorPopularShow) {
    return (
      <div className="text-red-500 text-center py-8">
        <p>Error occured while fetching</p>
      </div>
    );
  }

  return (
    <div className="space-y-8 pt-2">
      <section>
        <MovieSlider title='Popular movies' movies={popularMovies} />
        <MovieSlider title='Top rated movies' movies={topRatedMovies} />
        <MovieSlider title='Now Playing movies' movies={nowPlayingMovies} />
        <ShowSlider title='On the air shows' shows={ onTheAirShow } />
        <ShowSlider title='Top rated shows' shows={ topRatedShow } />
        <ShowSlider title='Popular shows' shows={ popularShow } />

      </section>
    </div>
  );
}