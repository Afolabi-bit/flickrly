// components/MovieCard.tsx
"use client";

import Image from "next/image";
import Link from "next/link";
import LikeButton from "./LikeButton";
import Rating from "./Rating";
import { MovieCardProps } from "@/app/types/otherTypes";
import { usePathname } from "next/navigation";
import ReleaseDate from "./ReleaseDate";

const MovieCard = ({ movie }: MovieCardProps) => {
  const pathName = usePathname();

  const tempMovie = {
    id: movie.id.toString(),
    title: movie.title,
    poster_path: movie.poster_path || "",
  };

  return (
    <div
      className={`relative ${
        pathName === "/" &&
        "shadow-md hover:shadow-[0_8px_30px_rgba(0,0,0,0.12)] transition-shadow duration-300"
      } bg-white block max-w-[220px] ps:max-w-[280px] sm:max-w-[320px] lg:max-w-[300px] lg:pb-6 h-[340px] lg:h-[380px] rounded-sm`}
    >
      <Link
        href={`/movie/${movie.id}`}
        style={{ userSelect: "none" }}
        className="block w-full"
      >
        <div className="overflow-hidden w-full h-[200px] lg:h-[250px] rounded-t-sm relative">
          <Image
            fill
            className="object-cover  rounded-t-sm transform transition-transform duration-500 group-hover:scale-105"
            src={`https://image.tmdb.org/t/p/original${movie.poster_path}`}
            alt={movie.title}
          />
        </div>
      </Link>

      {/* Like Button positioned on top */}
      <div className="absolute top-2 right-2 z-10">
        <LikeButton movie={tempMovie} />
      </div>

      <div className="px-2.5 pt-0.5 pb-3.5">
        <p className="mb-4.5">
          <span className="leading-0 text-[12px] font-bold mr-2">
            Release date:
          </span>
          <br className="sm:hidden" />
          <ReleaseDate date={movie.release_date} />
        </p>
        <h2 className="text-[16px] sm:text-[18px] font-bold text-[#111827] mb-1 truncate">
          {movie.title}
        </h2>
        <Rating rating={movie.vote_average} />
      </div>
    </div>
  );
};

export default MovieCard;
