import BannerSection from "@/components/homePageSections/BannerSection";
import Image from "next/image";
import Link from "next/link";
import Rating from "@/components/shared/Rating";

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
      <BannerSection bannerMovies={bannerMovies} />
      <div className=" px-[98px] pt-[70px] bg-[#eee]">
        <div className="flex justify-between mb-[20px]">
          <h2 className="text-4xl font-bold mb-5">Featured Movies</h2>
          <Link href={"/dashboard"}>See more</Link>
        </div>
        <div className="grid grid-cols-4 gap-5">
          {data.results.map((item) => (
            <Link
              key={item.id}
              href="/"
              className="group bg-white block max-w-[250px] h-[490px] rounded-sm shadow-md hover:shadow-[0_8px_30px_rgba(0,0,0,0.12)] transition-shadow duration-300"
            >
              <div className="overflow-hidden rounded-t-sm">
                <Image
                  width={250}
                  height={370}
                  className="object-cover w-[250px] h-[370px] rounded-t-sm transform transition-transform duration-500 group-hover:scale-105"
                  src={`https://image.tmdb.org/t/p/original${item.poster_path}`}
                  alt={item.title}
                />
              </div>
              <div className="px-2.5 pt-0.5 pb-2.5">
                <p>
                  <span className="text-[12px] font-bold mr-2">
                    Release date:
                  </span>
                  <span className="text-[12px] font-bold text-[#9CA3AF]">
                    {new Date(item.release_date).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </span>
                </p>
                <h2 className="text-[18px] font-bold text-[#111827] mb-1 truncate">
                  {item.title}
                </h2>
                <Rating rating={item.vote_average} />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}
