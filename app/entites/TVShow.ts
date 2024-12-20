import Person from "./Person";

export interface ShowVideo{
  id: number;
  type: string;
  key: string;
  site: string;
}

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
    trailer: ShowVideo;
  }

export default TVShow;