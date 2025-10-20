"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import Hero from "@/components/homePageSections/Hero";
import HeroBtnGroup from "@/components/homePageSections/HeroBtnGroup";
import Header from "./Header";

export interface Movie {
  id: number;
  title: string;
  original_title: string;
  overview: string;
  poster_path: string;
  vote_average: number;
}

interface BannerSectionProps {
  bannerMovies: Movie[];
  user: {
    given_name?: string | null;
    email?: string | null;
  } | null;
}

export default function BannerSection({
  bannerMovies,
  user,
}: BannerSectionProps) {
  const [selectedIndex, setSelectedIndex] = useState<number>(0);
  const [isPaused, setIsPaused] = useState<boolean>(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const resumeTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const selectedMovie = bannerMovies[selectedIndex];

  // 🎥 Auto-rotation (Netflix pacing)
  useEffect(() => {
    if (!isPaused) {
      intervalRef.current = setInterval(() => {
        setSelectedIndex((prev) =>
          prev === bannerMovies.length - 1 ? 0 : prev + 1
        );
      }, 6000); // ≈6 s per slide
    }

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [isPaused, bannerMovies.length]);

  // 🧠 Pause when user interacts, resume after 8 s
  const handleManualSelect = (index: number) => {
    setSelectedIndex(index);
    setIsPaused(true);

    if (intervalRef.current) clearInterval(intervalRef.current);
    if (resumeTimeoutRef.current) clearTimeout(resumeTimeoutRef.current);

    resumeTimeoutRef.current = setTimeout(() => setIsPaused(false), 8000);
  };

  return (
    <div className="relative w-full h-[600px] overflow-hidden">
      {/* Background crossfade - render all images, control opacity */}
      <div className="absolute top-0 left-0 w-full h-full -z-50">
        {bannerMovies.map((movie, index) => (
          <motion.div
            key={movie.id}
            initial={false}
            animate={{
              opacity: index === selectedIndex ? 1 : 0,
            }}
            transition={{
              duration: 0.8,
              ease: "easeInOut",
            }}
            className="absolute top-0 left-0 w-full h-full"
          >
            <Image
              src={`https://image.tmdb.org/t/p/original${movie.poster_path}`}
              alt={movie.title}
              fill
              priority={index === 0}
              sizes="100vw"
              className="object-cover object-center brightness-75"
            />
          </motion.div>
        ))}
      </div>

      {/* Gradient overlay for readability */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent -z-40" />

      {/* Foreground content */}
      <div className="relative z-10 px-[98px] flex flex-col">
        <Header user={user} />

        <motion.div
          key={`text-${selectedMovie.id}`}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.6,
            ease: "easeOut",
          }}
        >
          <Hero
            title={selectedMovie.original_title}
            overview={selectedMovie.overview}
            rating={selectedMovie.vote_average}
            id={selectedMovie.id}
          />
        </motion.div>
      </div>

      {/* Manual controls (dots/arrows) */}
      <HeroBtnGroup
        movieSelector={selectedIndex}
        setMovieSelector={handleManualSelect}
      />
    </div>
  );
}
