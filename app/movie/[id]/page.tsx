import Rating from "@/components/shared/Rating";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";

interface MoviePageProps {
  params: { id: string };
}

interface MovieVideo {
  id: string;
  key: string;
  name: string;
  site: string;
  type: string;
}

interface Movie {
  title: string;
  release_date: string;
  status: string;
  runtime: number;
  tagline: string;
  overview: string;
  budget: number;
  revenue: number;
  vote_average: number;
  homepage: string;
  production_companies: {
    id: number;
    logo_path: string | null;
    name: string;
    origin_country: string;
  }[];
  production_countries: { iso_3166_1: string; name: string }[];
  name: string;
  genres: { id: number; name: string }[];
  videos: {
    results?: MovieVideo[];
  };
}

export default async function MoviePage({ params }: MoviePageProps) {
  const res = await fetch(
    `https://api.themoviedb.org/3/movie/${params.id}?language=en-US&append_to_response=videos`,
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

  const movie: Movie = await res.json();

  console.log(movie);

  const trailer = movie.videos?.results?.find(
    (vid: MovieVideo) =>
      vid.type === "Trailer" && (vid.site === "YouTube" || vid.site === "Vimeo")
  );

  return (
    <main className="min-h-screen">
      <header className="px-[98px] h-[80px] flex items-center">
        <Link href={"/"} className="flex items-center gap-6 w-[187px]">
          <Image
            priority
            src="/assets/tv.png"
            alt="TV logo"
            width={50}
            height={50}
          />
          <h1 className="text-2xl font-bold leading-6 text-black">Flickerly</h1>
        </Link>
      </header>

      <section className="px-[98px] pt-6 pb-28">
        {trailer && (
          <div className="aspect-video w-full h-[449px] rounded-lg overflow-hidden shadow-lg">
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

        <div className="pt-6 flex justify-between items-center gap-20">
          <h2 className="text-wrap text-[25px] mb-4 text-black font-bold leading-0">
            {movie.title}
          </h2>

          <Button asChild variant="default" className="rounded-md">
            <Link href="/dashboard">See more</Link>
          </Button>
        </div>

        <div className="mt-2 space-y-4 max-w-3xl">
          <p className="text-xl italic font-semibold text-black-700 dark:text-gray-300">
            Tagline: “{movie.tagline}”
          </p>

          <div className="flex flex-wrap items-center gap-5">
            <h2 className="flex text-[14px] mb-4 text-black font-bold">
              {new Date(movie.release_date).getFullYear()}
            </h2>
            <span className="size-[5px] rounded-full bg-black translate-y-[-7px]"></span>

            <h2 className="flex text-[14px] mb-4 text-black font-bold">
              {movie.status}
            </h2>
            <span className="size-[5px] rounded-full bg-black translate-y-[-7px]"></span>

            <h2 className="flex text-[14px] mb-4 text-black font-bold">
              {Math.floor(movie.runtime / 60)}h {movie.runtime % 60}m
            </h2>
          </div>

          <p className="text-[17px] leading-relaxed text-gray-800 dark:text-gray-400">
            {movie.overview}
          </p>
        </div>

        <div className="mt-10 flex flex-col gap-2.5 max-w-3xl">
          <p className="flex gap-1 items-center text-[17px] leading-relaxed text-gray-800 dark:text-gray-400">
            <span className="font-bold">Rated:</span>{" "}
            <Rating rating={movie.vote_average} />
          </p>
          <p className="text-[17px] leading-relaxed text-gray-800 dark:text-gray-400">
            <span className="font-bold">Genres:</span>{" "}
            {movie.genres?.map((genre) => genre.name).join(", ")}
          </p>
          <p className="text-[17px] leading-relaxed text-gray-800 dark:text-gray-400">
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
          <p className="text-[17px] leading-relaxed text-gray-800 dark:text-gray-400">
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
            <p className="text-[17px] leading-relaxed text-gray-800 dark:text-gray-400">
              <span className="font-bold">Homepage:</span>{" "}
              <a href={movie.homepage} className="hover:underline">
                {movie.homepage}
              </a>
            </p>
          )}
        </div>

        <div className="mt-10">
          <p className="text-[17px] leading-relaxed text-gray-800 mb-4 dark:text-gray-400">
            <span className="font-bold">Production Countries:</span>{" "}
            {movie.production_countries
              ?.map((country) => country.name)
              .join(", ")}
          </p>
          <span className="font-bold">Production Companies:</span>
          <div className="flex flex-wrap gap-6 mt-2">
            {movie.production_companies?.map((company) => (
              <div
                key={company.id}
                className="flex flex-col items-center justify-start text-center w-[120px] "
              >
                <div className="mt-3">
                  {company.logo_path ? (
                    <Image
                      src={`https://image.tmdb.org/t/p/original${company.logo_path}`}
                      alt={company.name}
                      width={100}
                      height={60}
                      className="object-contain mb-2"
                    />
                  ) : (
                    <div className="flex items-center justify-center min-w-[120px] h-[70px] text-center bg-black text-white text-[12px] text-wrap font-bold rounded-[5px]">
                      {company.name}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
