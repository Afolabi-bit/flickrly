import NowPlayingList from "../NowPlayingList";
import PopularMoviesList from "../PopularMoviesList";
import TopRatedList from "../TopRatedList";
import TrendingMovieList from "../TrendingMoviesList";
import UpcomingMoviesList from "../UpcomingMoviesList";

export interface Movie {
  id: number;
  title: string;
  original_title: string;
  overview: string;
  poster_path: string;
  vote_average: number;
  release_date: string;
}

interface SectionProps {
  trendingMovies: Movie[];
}

export default function MovieCategoriesSection({
  trendingMovies,
}: SectionProps) {
  return (
    <section
      style={{ userSelect: "none" }}
      className="pt-[70px] pb-[250px] px-[98px] flex flex-col gap-[70px] bg-[#eee]"
    >
      <NowPlayingList />
      <TrendingMovieList list={trendingMovies} />
      <PopularMoviesList />
      <TopRatedList />
      <UpcomingMoviesList />
    </section>
  );
}
