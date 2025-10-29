"use client";

import { toggleFavorite } from "@/app/utils/actions";
import { useFavorites } from "@/contexts/FavouritesContext";
import { useTransition } from "react";

interface LikeButtonProps {
  movie: {
    id: string;
    title: string;
    poster_path: string;
  };
}

const LikeButton = ({ movie }: LikeButtonProps) => {
  const movieId = movie.id;
  const { isFavorite, addFavorite, removeFavorite, refreshFavorites } =
    useFavorites();
  const liked = isFavorite(movieId);
  const [isPending, startTransition] = useTransition();

  const handleToggle = (e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();

    // Optimistic update
    if (liked) {
      removeFavorite(movieId);
    } else {
      addFavorite(movieId);
    }

    startTransition(async () => {
      try {
        await toggleFavorite({
          id: movieId,
          title: movie.title,
          poster_path: movie.poster_path,
        });

        // Re-sync with server
        await refreshFavorites();
      } catch (err) {
        console.error("Error toggling favorite:", err);

        // Revert optimistic update on error
        if (liked) {
          addFavorite(movieId);
        } else {
          removeFavorite(movieId);
        }
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
      aria-label={liked ? "Remove from favorites" : "Add to favorites"}
    >
      <svg
        xmlns="[http://www.w3.org/2000/svg](http://www.w3.org/2000/svg)"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill={liked ? "red" : "none"}
        stroke="red"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        {" "}
        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>{" "}
      </svg>{" "}
    </button>
  );
};

export default LikeButton;
