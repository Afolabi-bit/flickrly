"use client";

import { trackMovieView } from "@/app/utils/actions";
import { useEffect } from "react";

interface TrackMovieViewProps {
  movie: {
    id: string;
    title: string;
    poster_path: string;
  };
}

export default function TrackMovieView({ movie }: TrackMovieViewProps) {
  useEffect(() => {
    // Fire and forget (no re-render or state needed)
    trackMovieView(movie).catch((err) =>
      console.error("Failed to track view:", err)
    );
  }, [movie]);

  return null;
}
