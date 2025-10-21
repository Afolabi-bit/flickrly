import Image from "next/image";
import CarouselSetup from "../shared/CarouselSetup";

const NowPlayingList = async () => {
  const res = await fetch("https://api.themoviedb.org/3/movie/now_playing", {
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${process.env.TMDB_API_ACCESS_TOKEN}`,
    },
    next: { revalidate: 3600 },
  });

  const data = await res.json();
  return (
    <div>
      <div className="flex gap-3.5 items-center mb-4">
        <h2 className="text-4xl font-bold mb-5">Now Playing </h2>
        <Image
          src={"/assets/video-camera.png"}
          alt="trending"
          className="object-cover translate-y-[-7px]"
          height={35}
          width={35}
        />
      </div>
      <CarouselSetup list={data.results} />
    </div>
  );
};

export default NowPlayingList;
