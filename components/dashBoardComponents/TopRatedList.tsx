import Image from "next/image";
import CarouselSetup from "../shared/CarouselSetup";

const TopRatedList = async () => {
  const res = await fetch("https://api.themoviedb.org/3/movie/top_rated", {
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
          Top Rated{" "}
        </h2>
        <div className="relative size-[22px] sm:size-[25px] md:size-[30px] lg:size-[35px]">
          <Image
            src={"/assets/ranking.png"}
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

export default TopRatedList;
