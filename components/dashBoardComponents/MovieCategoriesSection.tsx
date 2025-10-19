import NowPlayingList from "./NowPlayingList";
import PopularMoviesList from "./PopularMoviesList";
import TopRatedList from "./TopRatedList";
import TrendingMovies from "./TrendingMoviesList";
import UpcomingMoviesList from "./UpcomingMoviesList";

export default function MovieCategoriesSection() {
  return (
    <section
      style={{ userSelect: "none" }}
      className="pt-[70px] pb-[250px] flex flex-col gap-[70px] "
    >
      <TrendingMovies />
      <NowPlayingList />
      <PopularMoviesList />
      <TopRatedList />
      <UpcomingMoviesList />
    </section>
  );
}
