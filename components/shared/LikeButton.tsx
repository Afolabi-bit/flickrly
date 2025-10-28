// components/LikeButton.tsx
"use client";

import { toggleFavorite } from "@/app/utils/actions";
import { useFavorites } from "@/contexts/FavouritesContext";
import { useTransition } from "react";

interface LikeButtonProps {
  movie: {
    id: number;
    title: string;
    poster_path?: string;
  };
}

const LikeButton = ({ movie }: LikeButtonProps) => {
  const movieId = movie.id.toString();
  const { isFavorite, addFavorite, removeFavorite, loading } = useFavorites();
  const [isPending, startTransition] = useTransition();

  // Get initial state from context
  const liked = isFavorite(movieId);

  const handleToggle = () => {
    // Optimistic update
    if (liked) {
      removeFavorite(movieId);
    } else {
      addFavorite(movieId);
    }

    startTransition(async () => {
      try {
        const res = await toggleFavorite({
          id: movieId,
          title: movie.title,
          posterPath: movie.poster_path,
        });

        // If server response differs from optimistic update, correct it
        if (res.liked !== !liked) {
          if (res.liked) {
            addFavorite(movieId);
          } else {
            removeFavorite(movieId);
          }
        }
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

  // Show loading state while favorites are being fetched
  if (loading) {
    return (
      <button
        disabled
        className="p-2 bg-white rounded-full shadow-md opacity-50 cursor-not-allowed"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="gray"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
        </svg>
      </button>
    );
  }

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
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill={liked ? "red" : "none"}
        stroke="red"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="transition-all duration-200"
      >
        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
      </svg>
    </button>
  );
};

export default LikeButton;
