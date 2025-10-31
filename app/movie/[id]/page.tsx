import {
  MovieDetailed,
  MoviePageProps,
  MovieVideo,
} from "@/app/types/otherTypes";
import TrackMovieView from "@/components/moviePage/TrackMovieViews";
import Rating from "@/components/shared/Rating";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";

export default async function MoviePage({ params }: MoviePageProps) {
  const { id } = await params;
  const res = await fetch(
    `https://api.themoviedb.org/3/movie/${id}?language=en-US&append_to_response=videos`,
    {
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${process.env.TMDB_API_ACCESS_TOKEN}`,
      },
      next: { revalidate: 3600 },
    }
  );

  if (!res.ok) {
    throw new Error("Failed to fetch movie data");
  }

  const movie: MovieDetailed = await res.json();

  const trailer = movie.videos?.results?.find(
    (vid: MovieVideo) =>
      vid.type === "Trailer" && (vid.site === "YouTube" || vid.site === "Vimeo")
  );

  const tempMovie = {
    id: movie.id.toString(),
    title: movie.title,
    poster_path: movie.poster_path,
  };

  return (
    <section className="pt-2 md:pt-4 lg:pt-6 pb-20 md:pb-28">
      <TrackMovieView movie={tempMovie} />
      {trailer && (
        <div className="aspect-video w-full h-[380px] sm:h-[449px] rounded-lg overflow-hidden shadow-lg">
          <iframe
            width="100%"
            height="100%"
            src={`https://www.youtube.com/embed/${trailer.key}`}
            title={trailer.name}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        </div>
      )}

      {!trailer && (
        <div className="aspect-video w-full h-[449px] rounded-lg shadow-lg flex items-center justify-center bg-black/20">
          <p className="">No trailer available!</p>
        </div>
      )}

      <div className="pt-6 flex justify-between items-center mb-4">
        <h2 className="text-wrap text-[13px] ps:text-[15px] md:text-[20px] lg:text-[25px]  text-black font-bold leading-0">
          {movie.title}
        </h2>

        <Button
          asChild
          variant="default"
          className="rounded-md px-[10px] text-[10px] py-[5px] ps:text-[12px]
    sm:px-4.5 sm:py-1.5 sm:text-[14] "
        >
          <Link href="/dashboard">See more</Link>
        </Button>
      </div>

      <div className="mt-2 space-y-2 lg:space-y-4 lg:max-w-3xl">
        <p className=" text-[12px] md:text-[15px] lg:text-xl italic font-semibold text-black-700 dark:text-gray-300">
          Tagline: “{movie.tagline}”
        </p>

        <div className="flex flex-wrap items-center gap-3 md:gap-5">
          <h2 className="flex text-[12px] md:text-[14px]  text-black font-bold">
            {movie.release_date
              ? new Date(movie.release_date).getFullYear()
              : "Undisclosed"}
          </h2>
          <span className="size-[5px] rounded-full bg-black translate-y-[0px]"></span>

          <h2 className="flex text-[12px] md:text-[14px]  text-black font-bold">
            {movie.status}
          </h2>
          <span className="size-[5px] rounded-full bg-black "></span>

          <h2 className="flex text-[12px] md:text-[14px]  text-black font-bold">
            {Math.floor(movie.runtime / 60)}h {movie.runtime % 60}m
          </h2>
        </div>

        <p className=" text-[12px] sm:text-[14px] md:text-[17px] leading-relaxed text-gray-800 dark:text-gray-400">
          {movie.overview}
        </p>
      </div>

      <div className="mt-10 flex flex-col gap-2.5 max-w-3xl">
        <p className="flex gap-1 items-center text-[12px] md:text-[14px] lg:text-[17px] leading-relaxed text-gray-800 dark:text-gray-400">
          <span className="font-bold">Rated:</span>{" "}
          <Rating rating={movie.vote_average} />
        </p>
        <p className="text-[12px] md:text-[14px] lg:text-[17px] leading-relaxed text-gray-800 dark:text-gray-400">
          <span className="font-bold">Genres:</span>{" "}
          {movie.genres?.map((genre) => genre.name).join(", ")}
        </p>
        <p className="text-[12px] md:text-[14px] lg:text-[17px] leading-relaxed text-gray-800 dark:text-gray-400">
          <span className="font-bold">Budget:</span>{" "}
          {movie.budget === 0
            ? "Undisclosed"
            : movie.budget.toLocaleString("en-US", {
                style: "currency",
                currency: "USD",
                minimumFractionDigits: 0,
                maximumFractionDigits: 0,
              })}
        </p>
        <p className="text-[12px] md:text-[14px] lg:text-[17px] leading-relaxed text-gray-800 dark:text-gray-400">
          <span className="font-bold">Revenue:</span>{" "}
          {movie.revenue === 0
            ? "Undisclosed"
            : movie.revenue.toLocaleString("en-US", {
                style: "currency",
                currency: "USD",
                minimumFractionDigits: 0,
                maximumFractionDigits: 0,
              })}
        </p>
        {movie.homepage && (
          <p className="text-[12px] md:text-[14px] lg:text-[17px] leading-relaxed text-gray-800 dark:text-gray-400">
            <span className="font-bold">Homepage:</span>{" "}
            <a href={movie.homepage} className="hover:underline">
              {movie.homepage}
            </a>
          </p>
        )}
      </div>

      <div className="mt-10">
        <p className="text-[12px] md:text-[14px] lg:text-[17px] leading-relaxed text-gray-800 mb-4 dark:text-gray-400">
          <span className="font-bold">Production Countries:</span>{" "}
          {movie.production_countries.length != 0
            ? movie.production_countries
                ?.map((country) => country.name)
                .join(", ")
            : "Undisclosed"}
        </p>
        <span className="text-[12px] md:text-[14px] lg:text-[17px] font-bold">
          Production Companies:
        </span>
        <div className="flex flex-wrap gap-6 mt-2">
          {movie.production_companies.length != 0
            ? movie.production_companies.map((company) => (
                <div
                  key={company.id}
                  className="flex flex-col items-center justify-start text-center w-[120px] "
                >
                  <div className="mt-3">
                    {company.logo_path ? (
                      <div className="relative w-[100px] h-[60px] mx-auto">
                        <Image
                          src={`https://image.tmdb.org/t/p/original${company.logo_path}`}
                          alt={company.name}
                          fill
                          className="object-contain mb-2"
                        />
                      </div>
                    ) : (
                      <div className="flex items-center justify-center min-w-[90px] h-[50px] lg:min-w-[120px] lg:h-[70px] text-center bg-black text-white text-[10px] lg:text-[12px] text-wrap font-bold rounded-[5px]">
                        {company.name}
                      </div>
                    )}
                  </div>
                </div>
              ))
            : "Undisclosed"}
        </div>
      </div>
    </section>
  );
}
