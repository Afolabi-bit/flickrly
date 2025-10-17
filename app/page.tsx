import BannerSection from "@/components/homePageSections/BannerSection";
import MovieCategoriesSection from "@/components/homePageSections/MovieCategoriesSection";

export default async function Home() {
  const res = await fetch("https://api.themoviedb.org/3/trending/movie/day", {
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${process.env.TMDB_API_ACCESS_TOKEN}`,
    },
    cache: "no-store",
  });

  const data = await res.json();
  const bannerMovies = data.results.slice(-5);

  return (
    <main>
      <BannerSection bannerMovies={bannerMovies} />
      <MovieCategoriesSection trendingMovies={data.results} />
    </main>
  );
}
