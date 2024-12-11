import Person from "./Person";

export interface MovieVideo{
  id: number;
  type: string;
  key: string;
  site: string;
}

export interface Movie {
    id: number;
    title: string;
    overview: string;
    release_date: string;
    poster_path: string;
    vote_average: number;
    popularity: number;
    backdrop_path: string;
    cast:Person[];
    trailer: MovieVideo;
  }

export default Movie;