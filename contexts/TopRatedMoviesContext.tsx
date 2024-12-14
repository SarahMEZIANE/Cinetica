'use client';

import React, { createContext, useContext, ReactNode } from 'react';
import { useTopRatedMovies } from '@/hooks/useTopRatedMovies';
import { Movie } from '@/app/entites/Movie';

interface TopRatedMoviesContextType {
  movies: Movie[];
  loading: boolean;
  error: string | null;
  fetchMovies: (page?: number) => Promise<void>;
}

const TopRatedMoviesContext = createContext<TopRatedMoviesContextType | undefined>(undefined);

export function TopRatedMoviesProvider({ children }: { children: ReactNode }) {
  const { movies, loading, error, fetchMovies } = useTopRatedMovies();

  return (
    <TopRatedMoviesContext.Provider value={{ movies, loading, error, fetchMovies }}>
      {children}
    </TopRatedMoviesContext.Provider>
  );
}

export function useTopRatedMoviesContext() {
  const context = useContext(TopRatedMoviesContext);
  return context;
}