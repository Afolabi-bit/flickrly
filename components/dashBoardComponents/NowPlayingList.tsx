import CarouselSetup from "../shared/CarouselSetup";

const NowPlayingList = async () => {
  const res = await fetch("https://api.themoviedb.org/3/movie/now_playing", {
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${process.env.TMDB_API_ACCESS_TOKEN}`,
    },
    cache: "no-store",
  });

  const data = await res.json();
  return (
    <div>
      <h2 className="text-4xl font-bold mb-5">Now Playing</h2>
      <CarouselSetup list={data.results} />
    </div>
  );
};

export default NowPlayingList;
