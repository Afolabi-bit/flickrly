import CarouselSetup from "./shared/CarouselSetup";

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
      <h2 className="text-4xl font-bold mb-5">Popular </h2>
      <CarouselSetup list={data.results} />
    </div>
  );
};

export default PopularMoviesList;
