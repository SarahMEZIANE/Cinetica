import { Movie, MovieVideo } from '@/app/entites/Movie';
import Person from '@/app/entites/Person';

export const fetchPopularMovies = async (page: number = 1): Promise<Movie[]> => {
  try {
    const response = await fetch(`/api/movies/popular?page=${page}`);
    const moviesData = await response.json();

    if (moviesData.error) {
      throw new Error(moviesData.error);
    }

    const movies = moviesData.results.map((movie: Movie) => ({
      id: movie.id,
      title: movie.title,
      overview: movie.overview,
      release_date: movie.release_date,
      poster_path: movie.poster_path,
      backdrop_path: movie.backdrop_path,
      vote_average: movie.vote_average,
      popularity: movie.popularity,
      cast: movie.cast.map((person: Person) => ({
        id: person.id,
        name: person.name,
        profile_path: person.profile_path,
        job: person.job,
        character: person.character,
        order: person.order,
      })),
      director: null,
    }));

    const moviesWithTrailers = await Promise.all(
      movies.map(async (movie: Movie) => {
        const videos = await fetch(`/api/movies/video?movieID=${movie.id}`);
        const videoData = await videos.json();
        const trailer = videoData.results.find(
          (video: MovieVideo) =>
            video.type.toLowerCase() === 'trailer' &&
            video.site.toLowerCase() === 'youtube'
        );
        return { ...movie, trailer };
      })
    );

    return moviesWithTrailers;
  } catch (err) {
    throw new Error('Error fetching movies: ' + (err instanceof Error ? err.message : err));
  }
};
