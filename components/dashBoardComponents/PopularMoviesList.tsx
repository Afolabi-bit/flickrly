import Image from "next/image";
import CarouselSetup from "../shared/CarouselSetup";

const PopularMoviesList = async () => {
  const res = await fetch("https://api.themoviedb.org/3/movie/popular", {
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${process.env.TMDB_API_ACCESS_TOKEN}`,
    },
    cache: "no-store",
  });

  const data = await res.json();
  return (
    <div>
      <div className="flex gap-2.5 items-center mb-4">
        <h2 className="text-4xl font-bold mb-5"> Popular </h2>
        <Image
          src={"/assets/popular.png"}
          alt="popular"
          className="object-cover translate-y-[-10px] "
          height={50}
          width={50}
        />
      </div>
      <CarouselSetup list={data.results} />
    </div>
  );
};

export default PopularMoviesList;
