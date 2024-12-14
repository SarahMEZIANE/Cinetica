import { search, Video } from '@/app/entites/search';
import { Person } from '@/app/entites/Person';

export const fetchSearchResults = async (query: string): Promise<search[]> => {
  try {
    const response = await fetch(`/api/search?query=${encodeURIComponent(query)}`);
    const resultData = await response.json();

    if (resultData.error) {
      throw new Error(resultData.error);
    }

    const results = resultData.results.map((res: search) => ({
      id: res.id,
      title: res.media_type === 'movie' ? res.title : null,
      name: res.media_type === 'tv' ? res.name : null,
      overview: res.overview,
      release_date: res.media_type === 'movie' ? res.release_date : null,
      first_air_date: res.media_type === 'tv' ? res.first_air_date : null,
      poster_path: res.poster_path,
      media_type: res.media_type,
      backdrop_path: res.backdrop_path,
      vote_average: res.vote_average,
      cast: res.cast.map((person: Person) => ({
        id: person.id,
        name: person.name,
        profile_path: person.profile_path,
        job: person.job,
        character: person.character,
        order: person.order,
      })),
      director: null,
    }));

    const resultsWithTrailers = await Promise.all(
      results.map(async (res: search) => {
        let videos = null;
        if (res.media_type === 'movie') {
          videos = await fetch(`/api/movies/video?movieID=${res.id}`);
        } else {
          videos = await fetch(`/api/shows/video?movieID=${res.id}`);
        }
        const videoData = await videos.json();
        const trailer = videoData.results.find(
          (video: Video) =>
            video.type.toLowerCase() === 'trailer' && video.site.toLowerCase() === 'youtube'
        );
        return { ...res, trailer };
      })
    );

    return resultsWithTrailers;
  } catch (error) {
    throw new Error('Error fetching search results: ' + (error instanceof Error ? error.message : error));
  }
};
