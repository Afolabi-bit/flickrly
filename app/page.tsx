import BannerSection from "@/components/homePageSections/BannerSection";
import Image from "next/image";
import Link from "next/link";
import Rating from "@/components/shared/Rating";
import getSessionUser from "@/lib/auth";
import { Button } from "@/components/ui/button";
import { Movie } from "./types/otherTypes";
import MovieCard from "@/components/shared/MovieCard";

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

      <div className="px-[98px] pt-[70px]">
        <div className="flex justify-between mb-[20px]">
          <h2 className="text-4xl font-bold mb-5">Featured Movies</h2>
          <Button asChild variant="default" className="rounded-md">
            <Link href="/dashboard">See more</Link>
          </Button>
        </div>

        <div className="grid grid-cols-4 gap-5">
          {data.results.map((item) => (
            <MovieCard key={item.id} movie={item} />
          ))}
        </div>
      </div>
    </main>
  );
}
