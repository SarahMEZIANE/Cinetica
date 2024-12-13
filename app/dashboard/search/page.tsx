'use client'
import { useSearch } from '@/hooks/useSearch';
import MovieCard from '../movies/MoviesCard';
import ShowsCard from '../shows/ShowsCard';

export default function SearchResults() {
  const { result, loading, error } = useSearch();

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[200px]">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-yellow-500 " />
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-red-500 text-center py-8">
        <p>{error}</p>
      </div>
    );
  }

  const movies = result.filter(item => item.media_type === 'movie');
  const shows = result.filter(item => item.media_type === 'tv');

  return (
    <div className="container mx-auto px-4 py-8">
      {movies.length > 0 && (
        <div className="mb-8">
          <h2 className="text-2xl font-bold mb-4">Movies</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
            {movies.map((movie) => (
              <MovieCard
                key={movie.id}
                title={movie.title || ''}
                overview={movie.overview}
                release_date={movie.release_date || ''}
                posterPath={movie.poster_path}
                rating={movie.vote_average}
                cast={movie.cast}
                trailer={movie.trailer}
              />
            ))}
          </div>
        </div>
      )}

      {shows.length > 0 && (
        <div>
          <h2 className="text-2xl font-bold mb-4">TV Shows</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
            {shows.map((show) => (
              <ShowsCard
                key={show.id}
                name={show.name || ''}
                overview={show.overview}
                first_air_date={show.first_air_date || ''}
                posterPath={show.poster_path}
                rating={show.vote_average}
                cast={show.cast}
                trailer={show.trailer}
              />
            ))}
          </div>
        </div>
      )}

      {result.length === 0 && (
        <div className="text-center py-8">
          <p className="text-gray-500">No results found</p>
        </div>
      )}
    </div>
  );
}