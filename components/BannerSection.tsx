"use client";

import { useState } from "react";
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
  const [selectedIndex, setSelectedIndex] = useState<number>(2); // Default to movie 3
  const selectedMovie = bannerMovies[selectedIndex];

  return (
    <div className="w-full h-[600px] relative overflow-hidden">
      {/* Smooth crossfade background */}
      <div className="absolute top-0 left-0 w-full h-full -z-50">
        <AnimatePresence initial={false}>
          <motion.div
            key={selectedMovie.id}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{
              duration: 1.2,
              ease: "easeInOut",
            }}
            className="absolute top-0 left-0 w-full h-full"
          >
            <Image
              src={`https://image.tmdb.org/t/p/original${selectedMovie.poster_path}`}
              alt={selectedMovie.title}
              fill
              priority
              sizes="100vw"
              className="object-cover object-center h-full w-full"
            />
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black/60 -z-40" />

      {/* Animated Text & Buttons */}

      <div className="px-[98px] flex-col gap-[78px]">
        <Header />

        <motion.div
          key={`text-${selectedMovie.id}`}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{
            duration: 0.6,
            ease: "easeOut",
          }}
        >
          <Hero
            title={selectedMovie.original_title}
            overview={selectedMovie.overview}
            rating={selectedMovie.vote_average}
          />
        </motion.div>
      </div>
      <HeroBtnGroup
        movieSelector={selectedIndex}
        setMovieSelector={setSelectedIndex}
      />
    </div>
  );
}
