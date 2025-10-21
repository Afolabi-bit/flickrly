import NowPlayingList from "./NowPlayingList";
import PopularMoviesList from "./PopularMoviesList";
import TopRatedList from "./TopRatedList";
import TrendingMovies from "./TrendingMoviesList";
import UpcomingMoviesList from "./UpcomingMoviesList";

export default function MovieCategoriesSection() {
  return (
    <section className="pt-[70px] pb-[120px] flex flex-col gap-[80px] ">
      <TrendingMovies />
      <NowPlayingList />
      <PopularMoviesList />
      <TopRatedList />
      <UpcomingMoviesList />
    </section>
  );
}
