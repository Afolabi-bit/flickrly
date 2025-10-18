import NowPlayingList from "../NowPlayingList";
import PopularMoviesList from "../PopularMoviesList";
import TopRatedList from "../TopRatedList";
import TrendingMovieList from "../TrendingMoviesList";
import UpcomingMoviesList from "../UpcomingMoviesList";

export default function MovieCategoriesSection() {
  return (
    <section
      style={{ userSelect: "none" }}
      className="pt-[70px] pb-[250px] px-[98px] flex flex-col gap-[70px] bg-[#eee]"
    >
      <NowPlayingList />
      <TrendingMovieList />
      <PopularMoviesList />
      <TopRatedList />
      <UpcomingMoviesList />
    </section>
  );
}
