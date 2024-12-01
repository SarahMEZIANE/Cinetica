import React from 'react';
import { StarIcon } from '@heroicons/react/24/solid';

interface MovieCardProps {
    title: string;
    overview: string;
    release_date: string;
    posterPath: string;
    rating: number;
}

const MovieCard: React.FC<MovieCardProps> = ({ title, posterPath, rating }) => {
  
  const posterUrl = `https://image.tmdb.org/t/p/w500${posterPath}`;

  return (
    <div className="relative group cursor-pointer w-full max-w-xs mx-auto rounded-lg overflow-hidden shadow-lg">
      <img 
        src={posterUrl} 
        alt={title} 
        className="w-full h-auto rounded-lg transition-transform transform group-hover:scale-105"
      />

      <div className="absolute top-2 right-2 flex items-center bg-yellow-500 text-white text-sm font-bold px-2 py-1 rounded-full shadow-lg">
        <StarIcon className="w-4 h-4 mr-1" />
        {rating.toFixed(1)}
      </div>

      <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-0 group-hover:opacity-100 transition-opacity p-4 flex flex-col justify-end">
        <h3 className="text-white font-semibold text-lg truncate">{title}</h3>
      </div>
    </div>
  );
};

export default MovieCard;
