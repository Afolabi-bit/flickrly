import { Movie } from "./otherTypes";

export interface Favorite {
  id: string;
  userId: string;
  movieId: string;
  movie: Movie;
  createdAt: Date;
}
