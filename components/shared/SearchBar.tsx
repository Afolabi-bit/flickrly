"use client";

import { Movie, SearchBarProps } from "@/app/types/otherTypes";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState, useRef } from "react";

export default function SearchBar({
  theme = "dark",
  onMovieSelect,
}: SearchBarProps) {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    const fetchMovies = async () => {
      if (!query.trim()) {
        setResults([]);
        setIsOpen(false);
        return;
      }

      setLoading(true);
      setError(null);

      try {
        const res = await fetch(
          `https://api.themoviedb.org/3/search/movie?query=${encodeURIComponent(
            query
          )}&include_adult=false&language=en-US&page=1`,
          {
            headers: {
              Authorization: `Bearer ${process.env.NEXT_PUBLIC_TMDB_API_ACCESS_TOKEN}`,
              accept: "application/json",
            },
          }
        );

        if (!res.ok) {
          throw new Error(`API error: ${res.status}`);
        }

        const data = await res.json();
        setResults(data.results || []);
        setIsOpen(true);
      } catch (err) {
        console.error("Search error:", err);
        setError("Failed to search movies. Please try again.");
        setResults([]);
      } finally {
        setLoading(false);
      }
    };

    const debounce = setTimeout(fetchMovies, 400);
    return () => clearTimeout(debounce);
  }, [query]);

  const handleMovieClick = (movie: Movie) => {
    onMovieSelect?.(movie);
    setQuery("");
    setIsOpen(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Escape") {
      setIsOpen(false);
    }
  };

  return (
    <div ref={dropdownRef} className="relative w-full max-w-[525px] fade-in">
      <form
        onSubmit={(e) => e.preventDefault()}
        className="w-full h-[36px] relative rounded-[6px] form fade-in"
      >
        <input
          name="search"
          type="text"
          placeholder="What do you want to watch?"
          autoComplete="off"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={handleKeyDown}
          onFocus={() => query && setIsOpen(true)}
          className={`w-full h-full px-[10px]  py-[6px] pr-[36px] border rounded-[6px] transition-colors ${
            theme === "light"
              ? "outline-white placeholder:text-white/70 text-white border-white focus:border-white/80"
              : "outline-black placeholder:text-black/80 text-black border-black focus:border-black/80"
          } bg-transparent`}
          aria-controls="search-results"
        />
        <button
          type="submit"
          className="absolute top-[50%] translate-y-[-50%] right-[10px] pointer-events-none"
          aria-label="Search"
        >
          <Image
            src={
              theme === "light"
                ? "/assets/Search.png"
                : "/assets/blackSearch.png"
            }
            alt=""
            width={16}
            height={16}
            priority
          />
        </button>
      </form>

      {isOpen && query && (
        <div
          id="search-results"
          className="absolute w-full mt-2 bg-white rounded-lg shadow-lg max-h-[400px] overflow-y-auto z-50 border border-gray-200"
          role="listbox"
        >
          {loading ? (
            <div className="p-4 flex items-center justify-center">
              <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-gray-900"></div>
              <span className="ml-2 text-gray-600">Searching...</span>
            </div>
          ) : error ? (
            <p className="p-4 text-red-500 text-center">{error}</p>
          ) : results.length > 0 ? (
            <ul className="divide-y divide-gray-200">
              {results.slice(0, 10).map((movie) => (
                <li key={movie.id}>
                  <Link
                    href={`/movie/${movie.id}`}
                    onClick={() => handleMovieClick(movie)}
                    className="p-3 hover:bg-gray-50 cursor-pointer transition-colors flex items-start gap-3 "
                  >
                    {movie.poster_path && (
                      <Image
                        src={`https://image.tmdb.org/t/p/w92${movie.poster_path}`}
                        alt={`${movie.title} poster`}
                        width={40}
                        height={60}
                        className="rounded object-cover flex-shrink-0"
                      />
                    )}
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-gray-900 truncate">
                        {movie.title}
                      </p>
                      {movie.release_date && (
                        <p className="text-sm text-gray-500">
                          {new Date(movie.release_date).getFullYear()}
                        </p>
                      )}
                      {movie.overview && (
                        <p className="text-xs text-gray-600 line-clamp-2 mt-1">
                          {movie.overview}
                        </p>
                      )}
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
          ) : (
            <p className="p-4 text-gray-500 text-center">
              No results found for {query}
            </p>
          )}
        </div>
      )}
    </div>
  );
}
