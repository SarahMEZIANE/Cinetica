'use client';

import React, { createContext, useContext, ReactNode } from 'react';
import { usePopularMovies } from '@/hooks/usePopularMovies';
import { Movie } from '@/app/entites/Movie';

interface PopularMoviesContextType {
  movies: Movie[];
  loading: boolean;
  error: string | null;
  fetchMovies: (page?: number) => Promise<void>;
}

const PopularMoviesContext = createContext<PopularMoviesContextType | undefined>(undefined);

export function PopularMoviesProvider({ children }: { children: ReactNode }) {
  const { movies, loading, error, fetchMovies } = usePopularMovies();

  return (
    <PopularMoviesContext.Provider value={{ movies, loading, error, fetchMovies }}>
      {children}
    </PopularMoviesContext.Provider>
  );
}

export function usePopularMoviesContext() {
  const context = useContext(PopularMoviesContext);
  if (context === undefined) {
    throw new Error('usePopularMoviesContext must be used within a PopularMoviesProvider');
  }
  return context;
}