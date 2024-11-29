import Person from "./Person";

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
  }

export default Movie;