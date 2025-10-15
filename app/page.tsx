import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Image from "next/image";

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
      <div className="w-full h-[600px] relative">
        <Image
          src={`https://image.tmdb.org/t/p/original${bannerMovies[0].poster_path}`}
          alt={bannerMovies[0].title}
          fill
          priority
          className="absolute top-0 left-0 object-cover object-center h-full w-full -z-50"
        />
        <div className="absolute inset-0 bg-black/40 -z-40"></div>
        <div className="px-[98px] flex-col gap-[78px] ">
          <Header />
          <Hero
            title={bannerMovies[0].original_title}
            overview={bannerMovies[0].overview}
            rating={bannerMovies[0].vote_average}
          />
        </div>
      </div>
    </main>
  );
}
