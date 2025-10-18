"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import HeroBtnGroup from "@/components/HeroBtnGroup";

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
}

export default function BannerSection({ bannerMovies }: BannerSectionProps) {
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
      {/* Background crossfade */}
      <div className="absolute top-0 left-0 w-full h-full -z-50">
        <AnimatePresence mode="wait">
          <motion.div
            key={selectedMovie.id}
            initial={{ opacity: 0, scale: 1.05 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.05 }}
            transition={{
              duration: 1.2,
              ease: [0.45, 0, 0.55, 1],
            }}
            className="absolute top-0 left-0 w-full h-full"
          >
            <Image
              src={`https://image.tmdb.org/t/p/original${selectedMovie.poster_path}`}
              alt={selectedMovie.title}
              fill
              priority
              sizes="100vw"
              className="object-cover object-center brightness-75"
            />
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Gradient overlay for readability */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent -z-40" />

      {/* Foreground content */}
      <div className="relative z-10 px-[98px] flex flex-col">
        <Header />

        <AnimatePresence mode="wait">
          <motion.div
            key={`text-${selectedMovie.id}`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{
              duration: 1,
              delay: 0.3, // ⏱ 300 ms delay after image fade
              ease: "easeOut",
            }}
          >
            <Hero
              title={selectedMovie.original_title}
              overview={selectedMovie.overview}
              rating={selectedMovie.vote_average}
            />
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Manual controls (dots/arrows) */}
      <HeroBtnGroup
        movieSelector={selectedIndex}
        setMovieSelector={handleManualSelect}
      />
    </div>
  );
}
