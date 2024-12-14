import { TVShow, ShowVideo } from '@/app/entites/TVShow';
import Person from '@/app/entites/Person';

export const fetchOnTheAirShows = async (page: number = 1): Promise<TVShow[]> => {
  try {
    const response = await fetch(`/api/shows/on-the-air?page=${page}`);
    const showsData = await response.json();

    if (showsData.error) {
      throw new Error(showsData.error);
    }

    const shows = showsData.results.map((show: TVShow) => ({
      id: show.id,
      name: show.name,
      overview: show.overview,
      first_air_date: show.first_air_date,
      poster_path: show.poster_path,
      vote_average: show.vote_average,
      popularity: show.popularity,
      backdrop_path: show.backdrop_path,
      cast: show.cast.map((person: Person) => ({
        id: person.id,
        name: person.name,
        profile_path: person.profile_path,
        job: person.job,
        character: person.character,
        order: person.order,
      })),
      director: null,
    }));

    const showsWithTrailers = await Promise.all(
      shows.map(async (show: TVShow) => {
        const videos = await fetch(`/api/shows/video?showID=${show.id}`);
        const videoData = await videos.json();
        const trailer = videoData.results.find(
          (video: ShowVideo) =>
            video.type.toLowerCase() === 'trailer' &&
            video.site.toLowerCase() === 'youtube'
        );
        return { ...show, trailer };
      })
    );

    return showsWithTrailers;
  } catch (err) {
    throw new Error('Error fetching shows: ' + (err instanceof Error ? err.message : err));
  }
};
