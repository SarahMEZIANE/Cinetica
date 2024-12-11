import Person from "./Person";

export interface Video{
  id: number;
  type: string;
  key: string;
  site: string;
}

export interface search {
    media_type: string;
    id: number;
    title: string;
    overview: string;
    vote_average: number;
    first_air_date: string;
    poster_path: string;
    release_date: string;
    name: string;
    cast:Person[];
    trailer: Video;
 }