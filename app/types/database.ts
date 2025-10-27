import { TMDBMovie } from "./tmdb";

export interface Favorite {
  id: string;
  userId: string;
  movieId: string;
  movie: TMDBMovie;
  createdAt: Date;
}
