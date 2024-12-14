'use client';

import React, { createContext, useContext, ReactNode } from 'react';
import { useNowPlayingMovies } from '@/hooks/useNowPlayingMovies';
import { Movie } from '@/app/entites/Movie';

interface NowPlayingMoviesContextType {
  movies: Movie[];
  loading: boolean;
  error: string | null;
  fetchMovies: (page?: number) => Promise<void>;
}

const NowPlayingMoviesContext = createContext<NowPlayingMoviesContextType | undefined>(undefined);

export function NowPlayingMoviesProvider({ children }: { children: ReactNode }) {
  const { movies, loading, error, fetchMovies } = useNowPlayingMovies();

  return (
    <NowPlayingMoviesContext.Provider value={{ movies, loading, error, fetchMovies }}>
      {children}
    </NowPlayingMoviesContext.Provider>
  );
}

export function useNowPlayingMoviesContext() {
  const context = useContext(NowPlayingMoviesContext);
  if (context === undefined) {
    throw new Error('useNowPlayingMoviesContext must be used within a NowPlayingMoviesProvider');
  }
  return context;
}