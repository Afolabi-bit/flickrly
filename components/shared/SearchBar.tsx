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
    <div
      ref={dropdownRef}
      className="relative w-full sm:w-[280px] md:w-[350px] lg:w-[450px] fade-in"
    >
      <form
        onSubmit={(e) => e.preventDefault()}
        className="w-full  h-[36px] relative rounded-[6px] form fade-in"
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
          className="absolute w-full sm:w-[calc(100%+70px)] sm:translate-x-[-35px] mt-2 bg-white rounded-lg shadow-lg max-h-[400px] overflow-y-auto z-[50] border border-gray-200"
          role="listbox"
        >
          {loading ? (
            <div className="p-4 flex items-center justify-center">
              <div role="status">
                <svg
                  aria-hidden="true"
                  className="inline w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-red-600"
                  viewBox="0 0 100 101"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                    fill="currentColor"
                  />
                  <path
                    d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                    fill="currentFill"
                  />
                </svg>
                <span className="sr-only">Loading...</span>
              </div>
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
