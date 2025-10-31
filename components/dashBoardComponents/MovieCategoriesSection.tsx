import NowPlayingList from "./NowPlayingList";
import PopularMoviesList from "./PopularMoviesList";
import TopRatedList from "./TopRatedList";
import TrendingMovies from "./TrendingMoviesList";
import UpcomingMoviesList from "./UpcomingMoviesList";

export default function MovieCategoriesSection() {
  return (
    <section className="pt-[40px] lg:pt-[70px] pb-[30px] sm:pb-[60px] lg:pb-[120px] flex flex-col gap-[30px] ps:gap-[35px] sm:gap-[40px] md:gap-[50px] lg:gap-[80px] ">
      <TrendingMovies />
      <NowPlayingList />
      <PopularMoviesList />
      <TopRatedList />
      <UpcomingMoviesList />
    </section>
  );
}
