import CarouselSetup from "./shared/CarouselSetup";

const TopRatedList = async () => {
  const res = await fetch("https://api.themoviedb.org/3/movie/top_rated", {
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${process.env.TMDB_API_ACCESS_TOKEN}`,
    },
    cache: "no-store",
  });

  const data = await res.json();
  return (
    <div>
      <h2 className="text-4xl font-bold mb-5">Top Rated</h2>
      <CarouselSetup list={data.results} />
    </div>
  );
};

export default TopRatedList;
