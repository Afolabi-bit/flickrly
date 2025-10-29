import { Movie } from "./otherTypes";

export interface Favorite {
  id: string;
  userId: string;
  movieId: string;
  movie: Movie;
  createdAt: Date;
}
export interface FavoriteFromDB {
  id: string;
  title: string;
  poster_path: string | null;
  favCount: number;
  addedAt: Date;
}

export interface ViewHistoryItem {
  id: string;
  title: string;
  poster_path: string | null;
  viewedAt: Date | string;
}
