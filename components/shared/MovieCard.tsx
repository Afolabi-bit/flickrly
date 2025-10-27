"use client";

import Image from "next/image";
import Link from "next/link";
import LikeButton from "./LikeButton";
import Rating from "./Rating";
import { MovieCardProps } from "@/app/types/otherTypes";
import { usePathname } from "next/navigation";

const MovieCard = ({ movie }: MovieCardProps) => {
  const pathName = usePathname();

  return (
    <Link
      href={`/movie/${movie.id}`}
      style={{ userSelect: "none" }}
      className={`${
        pathName == "/" &&
        " shadow-md hover:shadow-[0_8px_30px_rgba(0,0,0,0.12)] transition-shadow duration-300"
      }
           "group bg-white block  max-w-[250px] h-[490px] rounded-sm "`}
    >
      <div className="overflow-hidden rounded-t-sm relative">
        <Image
          width={250}
          height={370}
          className="object-cover w-[250px] h-[370px] rounded-t-sm transform transition-transform duration-500 group-hover:scale-105"
          src={`https://image.tmdb.org/t/p/original${movie.poster_path}`}
          alt={movie.title}
        />
        <div className="absolute top-2 right-2">
          <LikeButton movieId={movie.id} />
        </div>
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
    </Link>
  );
};

export default MovieCard;
