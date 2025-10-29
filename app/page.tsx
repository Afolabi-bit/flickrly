import BannerSection from "@/components/homePageSections/BannerSection";
import Link from "next/link";
import getSessionUser from "@/lib/auth";
import { Button } from "@/components/ui/button";
import { Movie } from "./types/otherTypes";
import MovieCard from "@/components/shared/MovieCard";
import { ChevronRight } from "lucide-react";

export default async function Home() {
  // Fetch trending movies
  const res = await fetch("https://api.themoviedb.org/3/trending/movie/day", {
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${process.env.TMDB_API_ACCESS_TOKEN}`,
    },
    next: { revalidate: 3600 },
  });

  if (!res.ok) {
    throw new Error("Failed to fetch movies from TMDB API");
  }

  const data: { results: Movie[] } = await res.json();
  const bannerMovies = data.results.slice(-5);

  // Get authenticated user (may return null)
  const user = await getSessionUser();

  return (
    <main className="mb-[70px]">
      <BannerSection bannerMovies={bannerMovies} user={user} />

      <div className="px-[20px] sm:px-10 lg:px-[98px] pt-[70px] 2xl:w-[1440px] 2xl:mx-auto">
        <div className="flex justify-between mb-[20px]">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-5">
            Featured Movies
          </h2>
          <Button
            asChild
            variant="default"
            className="rounded-md px-[13px] py-[5px] text-[13px]  
    sm:px-4.5 sm:py-1.5 sm:text-[14] "
          >
            <Link href="/dashboard">
              See more <ChevronRight className="text-white" />
            </Link>
          </Button>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-[22px] ">
          {data.results.map((item) => (
            <MovieCard key={item.id} movie={item} />
          ))}
        </div>
      </div>
    </main>
  );
}
