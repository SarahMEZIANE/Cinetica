'use client'

import React, { useState } from 'react';
import { MediaSection } from './MediaSection';
import { Movie } from '@/app/entites/Movie';
import MovieDetailsModal from '../MovieDetailsModal';
import { useMovieCollections } from './MovieCollections';

export const DiscoverPage: React.FC = () => {
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);
  const movieCollections = useMovieCollections();

  return (
    <div className="container mx-auto px-4 py-8">
      <MediaSection
        title="Movies"
        collections={movieCollections}
        onItemClick={setSelectedMovie}
      />
      
      <div className="my-12 border-t border-gray-200 dark:border-gray-700" />

      {selectedMovie && (
        <MovieDetailsModal
          title={selectedMovie.title}
          overview={selectedMovie.overview}
          release_date={selectedMovie.release_date}
          posterPath={selectedMovie.backdrop_path}
          rating={selectedMovie.vote_average}
          cast={selectedMovie.cast}
          onClose={() => setSelectedMovie(null)}
        />
      )}
    </div>
  );
};

export default DiscoverPage;