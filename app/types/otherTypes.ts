export interface User {
  id?: string;
  given_name?: string | null;
  family_name?: string | null;
  email?: string | null;
  picture?: string | null;
}

export interface MoviePageProps {
  params: { id: string };
}

export interface MovieVideo {
  id: string;
  key: string;
  name: string;
  site: string;
  type: string;
}

export interface MovieDetailed {
  title: string;
  release_date: string;
  status: string;
  runtime: number;
  tagline: string;
  overview: string;
  budget: number;
  revenue: number;
  vote_average: number;
  homepage: string;
  production_companies: {
    id: number;
    logo_path: string | null;
    name: string;
    origin_country: string;
  }[];
  production_countries: { iso_3166_1: string; name: string }[];
  name: string;
  genres: { id: number; name: string }[];
  videos: {
    results?: MovieVideo[];
  };
}

export interface BannerSectionProps {
  bannerMovies: Movie[];
  user?: User | null;
}

export interface HeroProps {
  title: string;
  overview: string;
  rating: number;
  id: number;
}

export interface HeroBtnGroupProps {
  movieSelector: number;
  setMovieSelector: (index: number) => void;
}

export interface MovieItem {
  id: number;
  title: string;
  poster_path: string;
  release_date: string;
  vote_average: number;
}

export interface CarouselSetupProps {
  list: MovieItem[];
}
export interface HeaderProps {
  user?: User | null;
  theme?: "light" | "dark";
}

export interface RatingProps {
  rating: number; // expected 0.0 - 10.0, can be .5
}

export interface Movie {
  id: number;
  title: string;
  release_date: string;
  poster_path?: string;
  overview?: string;
  vote_average: number;
}

export interface MovieCardProps {
  movie: Movie;
}

export interface SearchBarProps {
  theme?: "light" | "dark";
  onMovieSelect?: (movie: Movie) => void;
}
