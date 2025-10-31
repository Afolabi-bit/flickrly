"use client";

import ClientLogoutButton from "@/components/shared/ClientLogoutButton";
import Image from "next/image";
import Link from "next/link";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import LikeButton from "@/components/shared/LikeButton";
import LastViewedTime from "@/components/moviePage/LastViewedTime";
import { useEffect, useState } from "react";
import { getUserHistory } from "../utils/actions";
import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";
import { useFavorites } from "@/contexts/FavouritesContext";
import { ViewHistoryItem } from "../types/database";

const ProfilePage = () => {
  const { user } = useKindeBrowserClient();
  const { favoriteMovies, loading: favLoading } = useFavorites();
  const [viewHistory, setViewHistory] = useState<ViewHistoryItem[]>([]);
  const [historyLoading, setHistoryLoading] = useState(true);

  useEffect(() => {
    loadHistory();
  }, []);

  const loadHistory = async () => {
    try {
      const history = await getUserHistory();
      setViewHistory(history);
    } catch (error) {
      console.error("Error loading history:", error);
    } finally {
      setHistoryLoading(false);
    }
  };

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <section className="flex gap-5 lg:gap-20">
        <div className="relative w-[50px] h-[50px] sm:w-[70px] sm:h-[70px] lg:w-[120px] lg:h-[120px] rounded-full ">
          <Image
            src={user.picture || ""}
            alt={user.given_name || "User"}
            fill
            className="rounded-full object-cover"
          />
        </div>
        <div className="gap-1.5 flex flex-col">
          <h1 className="text-[15px] sm:text-[18px] md:text-2xl lg:text-4xl font-bold">
            {user.given_name} {user.family_name}
          </h1>
          <p className="text-[12px] lg:text-base font-semibold text-black/60">
            {user.email}
          </p>
          <div>
            <ClientLogoutButton />
          </div>
        </div>
      </section>

      <section className="mt-15">
        <h2 className="text-[16px] sm:text-xl lg:text-2xl font-bold mb-4">
          Favorites
        </h2>
        <div className="flex gap-3">
          {favLoading ? (
            <div
              role="status"
              className="w-full h-[200px] flex flex-col items-center justify-center"
            >
              <svg
                aria-hidden="true"
                className="inline w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-red-600"
                viewBox="0 0 100 101"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                  fill="currentColor"
                />
                <path
                  d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                  fill="currentFill"
                />
              </svg>
              <span className="sr-only">Loading...</span>
            </div>
          ) : favoriteMovies.length === 0 ? (
            <div className="w-full h-[250px] flex flex-col items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 rounded-lg border border-gray-200 shadow-sm text-center">
              <div className="flex flex-col items-center gap-3">
                <div className="w-16 h-16 flex items-center justify-center rounded-full bg-white border border-gray-300 shadow-inner">
                  <span className="text-4xl text-gray-400">💔</span>
                </div>
                <h2 className="text-gray-600 font-semibold text-lg">
                  You haven&apos;t added any favorites yet
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
          ) : (
            <Carousel className="rounded-xl h-fit w-full">
              <CarouselContent className="flex flex-nowrap">
                {favoriteMovies.map((movie) => (
                  <CarouselItem
                    key={movie.id}
                    className="basis-[200px] sm:basis-[260px] lg:basis-[320px] flex-shrink-0 overflow-y-visible"
                  >
                    <Link href={`/movie/${movie.id}`} className="relative">
                      <div className="absolute top-2 right-2 z-10">
                        <LikeButton
                          movie={{
                            id: movie.id,
                            title: movie.title,
                            poster_path: movie.poster_path || "",
                          }}
                        />
                      </div>
                      <div className="overflow-hidden rounded-t-sm relative mb-3">
                        <div className="w-full h-[120px] sm:h-[150px] relative">
                          <Image
                            fill
                            className="object-cover rounded-sm transform transition-transform duration-500 group-hover:scale-105"
                            src={`https://image.tmdb.org/t/p/original${movie.poster_path}`}
                            alt={movie.title}
                          />
                        </div>
                      </div>
                      <div>
                        <h3 className="text-[15px] sm:text-base lg:text-[20px] font-bold truncate">
                          {movie.title}
                        </h3>
                      </div>
                    </Link>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselNext className="hidden lg:inline-flex" />
              <CarouselPrevious className="hidden lg:inline-flex" />
            </Carousel>
          )}
        </div>
      </section>

      <section className="mt-15">
        <h2 className="text-[16px] sm:text-xl lg:text-2xl font-bold mb-4">
          History
        </h2>
        <div className="flex gap-3">
          {historyLoading ? (
            <div
              role="status"
              className="w-full h-[200px] flex flex-col items-center justify-center"
            >
              <svg
                aria-hidden="true"
                className="inline w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-red-600"
                viewBox="0 0 100 101"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                  fill="currentColor"
                />
                <path
                  d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                  fill="currentFill"
                />
              </svg>
              <span className="sr-only">Loading...</span>
            </div>
          ) : viewHistory.length === 0 ? (
            <div className="w-full h-[250px] flex flex-col items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 rounded-lg border border-gray-200 shadow-sm text-center">
              <div className="flex flex-col items-center gap-3">
                <div className="w-16 h-16 flex items-center justify-center rounded-full bg-white border border-gray-300 shadow-inner">
                  <span className="text-4xl text-gray-400">🎬</span>
                </div>
                <h2 className="text-gray-600 font-semibold text-lg">
                  No viewing history yet
                </h2>
                <p className="text-gray-400 text-sm max-w-sm">
                  Watch some movie trailers to see them here.
                </p>
                <Link
                  href="/dashboard"
                  className="mt-3 px-5 py-2 bg-red-500 text-white font-semibold rounded-md hover:bg-red-600 transition-all duration-200 shadow-sm"
                >
                  Browse Movies
                </Link>
              </div>
            </div>
          ) : (
            <Carousel className="rounded-xl h-fit w-full">
              <CarouselContent className="flex flex-nowrap">
                {viewHistory.map((movie) => (
                  <CarouselItem
                    key={movie.id}
                    className="basis-[200px] sm:basis-[260px] lg:basis-[320px] flex-shrink-0 overflow-y-visible"
                  >
                    <Link href={`/movie/${movie.id}`} className="relative">
                      <div className="overflow-hidden rounded-t-sm relative mb-3">
                        <div className="w-full h-[120px] sm:h-[150px] relative">
                          <Image
                            fill
                            className="object-cover rounded-sm transform transition-transform duration-500 group-hover:scale-105"
                            src={`https://image.tmdb.org/t/p/original${movie.poster_path}`}
                            alt={movie.title}
                          />
                        </div>
                      </div>
                      <div>
                        <h3 className="text-[15px] sm:text-base lg:text-[20px] font-bold truncate">
                          {movie.title}
                        </h3>
                        <LastViewedTime date={movie.viewedAt} />
                      </div>
                    </Link>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselNext className="hidden lg:inline-flex" />
              <CarouselPrevious className="hidden lg:inline-flex" />
            </Carousel>
          )}
        </div>
      </section>
    </>
  );
};

export default ProfilePage;
