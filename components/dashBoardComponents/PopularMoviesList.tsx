import Image from "next/image";
import CarouselSetup from "../shared/CarouselSetup";

const PopularMoviesList = async () => {
  const res = await fetch("https://api.themoviedb.org/3/movie/popular", {
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
          {" "}
          Popular{" "}
        </h2>
        <div className="relative size-[22px] sm:size-[25px] md:size-[30px] lg:size-[35px]">
          <Image
            src={"/assets/popular.png"}
            alt="trending"
            fill
            className="object-fill translate-y-[-10px] sm:translate-y-[-12px]"
          />
        </div>
      </div>
      <CarouselSetup list={data.results} />
    </div>
  );
};

export default PopularMoviesList;
