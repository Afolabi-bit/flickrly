import Image from "next/image";
import CarouselSetup from "../shared/CarouselSetup";

const TrendingMovies = async () => {
  const res = await fetch("https://api.themoviedb.org/3/trending/movie/day", {
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${process.env.TMDB_API_ACCESS_TOKEN}`,
    },
    next: { revalidate: 3600 },
  });

  const data = await res.json();
  return (
    <div>
      <div className="flex gap-2.5 items-center mb-4">
        <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold mb-5">
          Trending Today{" "}
        </h2>
        <div className="relative size-[12px] sm:size-[12px] lg:size-[16px]">
          <Image
            src={"/assets/fire.png"}
            alt="trending"
            fill
            className="object-cover translate-y-[-7px]"
          />
        </div>
      </div>

      <CarouselSetup list={data.results} />
    </div>
  );
};

export default TrendingMovies;
