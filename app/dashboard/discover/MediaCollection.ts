import { Movie } from '@/app/entites/Movie';

export type MediaItem = Movie;

export interface MediaCollection {
  title: string;
  items: MediaItem[];
  loading: boolean;
  error: string | null;
  viewAllPath: string;
}