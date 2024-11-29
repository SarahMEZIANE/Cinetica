import Person from "./Person";

export interface TVShow {
    id: number;
    name: string;
    overview: string;
    first_air_date: string;
    poster_path: string;
    vote_average: number;
    popularity: number;
    backdrop_path: string;
    cast:Person[];
  }

export default TVShow;