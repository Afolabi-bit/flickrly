import ClientLogoutButton from "@/components/shared/ClientLogoutButton";
import getSessionUser from "@/lib/auth";
import Image from "next/image";
import { redirect } from "next/navigation";
import { getUserFavoriteMovies } from "../utils/actions";
import Link from "next/link";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import LikeButton from "@/components/shared/LikeButton";
import { div } from "framer-motion/client";

const page = async () => {
  const user = await getSessionUser();

  if (!user?.given_name) redirect("/api/auth/register");

  const favoriteMovies = await getUserFavoriteMovies();

  return (
    <main>
      <section className="flex gap-20">
        <Image
          src={user.picture || ""}
          alt={user.given_name}
          width={120}
          height={120}
          className="rounded-full object-cover"
        />
        <div className="gap-1.5 flex flex-col">
          <h1 className="text-4xl font-bold">
            {user.given_name} {user.family_name}
          </h1>
          <p className="font-semibold text-black/60">{user.email}</p>
          <div>
            <ClientLogoutButton />
          </div>
        </div>
      </section>

      <section className="mt-15">
        <h2 className="text-2xl font-bold mb-4">Favorites</h2>
        <div className="flex gap-3">
          {favoriteMovies.length === 0 && (
            <div className="w-full h-[250px] flex flex-col items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 rounded-lg border border-gray-200 shadow-sm text-center">
              <div className="flex flex-col items-center gap-3">
                <div className="w-16 h-16 flex items-center justify-center rounded-full bg-white border border-gray-300 shadow-inner">
                  <span className="text-4xl text-gray-400">💔</span>
                </div>
                <h2 className="text-gray-600 font-semibold text-lg">
                  You haven’t added any favorites yet
                </h2>
                <p className="text-gray-400 text-sm max-w-sm">
                  Add movies to your favorites so you can easily find them
                  later.
                </p>
                <Link
                  href="/dashboard"
                  className="mt-3 px-5 py-2 bg-red-500 text-white font-semibold rounded-md hover:bg-red-600 transition-all duration-200 shadow-sm"
                >
                  + Add Favorite Movies
                </Link>
              </div>
            </div>
          )}

          {favoriteMovies.length != 0 && (
            <Carousel className="  rounded-xl h-fit w-full">
              <CarouselContent className="flex flex-nowrap">
                {favoriteMovies.map((movie) => (
                  <CarouselItem
                    key={movie.id}
                    className="basis-[320px] flex-shrink-0  h- overflow-y-visible"
                  >
                    <Link href={`/movie/${movie.id}`} className="relative">
                      <div className="absolute top-2 right-2 z-10">
                        <LikeButton movie={movie} />
                      </div>
                      <div className="overflow-hidden rounded-t-sm relative mb-3">
                        <Image
                          width={320}
                          height={150}
                          className="object-cover w-[320px] h-[150px] rounded-sm transform transition-transform duration-500 group-hover:scale-105"
                          src={`https://image.tmdb.org/t/p/original${movie.poster_path}`}
                          alt={movie.title}
                        />
                      </div>
                      <div>
                        <h3 className="text-[20px] font-bold text-wrap truncate">
                          {movie.title}
                        </h3>
                      </div>
                    </Link>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselNext />
              <CarouselPrevious />
            </Carousel>
          )}
        </div>
      </section>
    </main>
  );
};

export default page;
