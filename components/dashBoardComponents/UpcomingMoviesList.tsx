import CarouselSetup from "../shared/CarouselSetup";

const UpcomingMoviesList = async () => {
  const res = await fetch(
    "https://api.themoviedb.org/3/movie/upcoming?region=NG&language=en-US",
    {
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${process.env.TMDB_API_ACCESS_TOKEN}`,
      },
      cache: "no-store",
    }
  );

  const data = await res.json();
  return (
    <div>
      <h2 className="text-4xl font-bold mb-5">Upcoming </h2>
      <CarouselSetup list={data.results} />
    </div>
  );
};

export default UpcomingMoviesList;
