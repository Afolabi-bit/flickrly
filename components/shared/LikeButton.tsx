"use client";

import { toggleFavorite } from "@/app/utils/actions";
import { useState, useTransition } from "react";

interface LikeButtonProps {
  movie: {
    id: number;
    title: string;
    poster_path?: string;
  };
  initialLiked?: boolean;
}

const LikeButton = ({ movie, initialLiked = false }: LikeButtonProps) => {
  const [liked, setLiked] = useState(initialLiked);
  const [isPending, startTransition] = useTransition();

  const handleToggle = () => {
    startTransition(async () => {
      try {
        const res = await toggleFavorite({
          id: movie.id.toString(),
          title: movie.title,
          posterPath: movie.poster_path,
        });

        setLiked(res.liked);
      } catch (err) {
        console.error("Error toggling favorite:", err);
      }
    });
  };

  return (
    <button
      onClick={handleToggle}
      disabled={isPending}
      className={`p-2 bg-white rounded-full shadow-md transition-all ${
        isPending ? "opacity-50 cursor-not-allowed" : "hover:scale-105"
      }`}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill={liked ? "red" : "none"}
        stroke="red"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
      </svg>
    </button>
  );
};

export default LikeButton;
