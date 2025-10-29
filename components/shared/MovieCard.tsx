// components/MovieCard.tsx
"use client";

import Image from "next/image";
import Link from "next/link";
import LikeButton from "./LikeButton";
import Rating from "./Rating";
import { MovieCardProps } from "@/app/types/otherTypes";
import { usePathname } from "next/navigation";

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
      } bg-white block max-w-[250px] h-[490px] rounded-sm`}
    >
      <Link
        href={`/movie/${movie.id}`}
        style={{ userSelect: "none" }}
        className="block"
      >
        <div className="overflow-hidden rounded-t-sm relative">
          <Image
            width={250}
            height={370}
            className="object-cover w-[250px] h-[370px] rounded-t-sm transform transition-transform duration-500 group-hover:scale-105"
            src={`https://image.tmdb.org/t/p/original${movie.poster_path}`}
            alt={movie.title}
          />
        </div>
      </Link>

      {/* Like Button positioned on top */}
      <div className="absolute top-2 right-2 z-10">
        <LikeButton movie={tempMovie} />
      </div>

      <div className="px-2.5 pt-0.5 pb-2.5">
        <p>
          <span className="text-[12px] font-bold mr-2">Release date:</span>
          <span className="text-[12px] font-bold text-[#9CA3AF]">
            {new Date(movie.release_date).toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </span>
        </p>
        <h2 className="text-[18px] font-bold text-[#111827] mb-1 truncate">
          {movie.title}
        </h2>
        <Rating rating={movie.vote_average} />
      </div>
    </div>
  );
};

export default MovieCard;
