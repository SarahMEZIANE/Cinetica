import React from 'react';
import { Movie } from '@/app/entites/Movie';
import { useTopRatedMovies } from '@/hooks/useTopRatedMovies';
import { useNowPlayingMovies } from '@/hooks/useNowPlayingMovies';
import { usePopularMovies } from '@/hooks/usePopularMovies';


export interface MovieCollection {
  title: string;
  items: Movie[];
  loading: boolean;
  error: string | null;
  viewAllPath: string;
}

export const useTopRatedMoviesCollection = (): MovieCollection => {
  const { movies, loading, error, fetchMovies } = useTopRatedMovies();

  React.useEffect(() => {
    fetchMovies();
  }, []);
  return {
    title: "Top Rated Movies",
    items: movies,
    loading,
    error,
    viewAllPath: "/movies/top-rated"
  };
};

export const useNowPlayingMoviesCollection = (): MovieCollection => {
  const { movies, loading, error, fetchMovies } = useNowPlayingMovies();

  React.useEffect(() => {
    fetchMovies();
  }, []);

  return {
    title: "Now Playing",
    items: movies,
    loading,
    error,
    viewAllPath: "/movies/now-playing"
  };
};

export const usePopularMoviesCollection = (): MovieCollection => {
  const { movies, loading, error, fetchMovies } = usePopularMovies();

  React.useEffect(() => {
    fetchMovies();
  }, []);

  return {
    title: "Popular Movies",
    items: movies,
    loading,
    error,
    viewAllPath: "/movies/popular"
  };
};

export const useMovieCollections = (): MovieCollection[] => {
  const topRatedCollection = useTopRatedMoviesCollection();
  const nowPlayingCollection = useNowPlayingMoviesCollection();
  const popularCollection = usePopularMoviesCollection();

  return [
    topRatedCollection,
    nowPlayingCollection,
    popularCollection
  ];
};