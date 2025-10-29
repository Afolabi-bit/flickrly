// contexts/FavoritesContext.tsx
"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { getUserFavoriteIds, getUserFavoriteMovies } from "@/app/utils/actions";
import { FavoriteFromDB } from "@/app/types/database";

interface FavoritesContextType {
  favoriteIds: Set<string>;
  favoriteMovies: FavoriteFromDB[];
  isFavorite: (movieId: string) => boolean;
  addFavorite: (movieId: string) => void;
  removeFavorite: (movieId: string) => void;
  refreshFavorites: () => Promise<void>;
  loading: boolean;
}

const FavoritesContext = createContext<FavoritesContextType | undefined>(
  undefined
);

export function FavoritesProvider({ children }: { children: React.ReactNode }) {
  const [favoriteIds, setFavoriteIds] = useState<Set<string>>(new Set());
  const [favoriteMovies, setFavoriteMovies] = useState<FavoriteFromDB[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadFavorites();
  }, []);

  const loadFavorites = async () => {
    try {
      const [ids, movies] = await Promise.all([
        getUserFavoriteIds(),
        getUserFavoriteMovies(),
      ]);
      setFavoriteIds(new Set(ids));
      setFavoriteMovies(movies);
    } catch (error) {
      console.error("Error loading favorites:", error);
    } finally {
      setLoading(false);
    }
  };

  const refreshFavorites = async () => {
    try {
      const [ids, movies] = await Promise.all([
        getUserFavoriteIds(),
        getUserFavoriteMovies(),
      ]);
      setFavoriteIds(new Set(ids));
      setFavoriteMovies(movies);
    } catch (error) {
      console.error("Error refreshing favorites:", error);
    }
  };

  const isFavorite = (movieId: string) => favoriteIds.has(movieId);

  const addFavorite = (movieId: string) => {
    setFavoriteIds((prev) => new Set([...prev, movieId]));
  };

  const removeFavorite = (movieId: string) => {
    setFavoriteIds((prev) => {
      const newSet = new Set(prev);
      newSet.delete(movieId);
      return newSet;
    });
    setFavoriteMovies((prev) => prev.filter((movie) => movie.id !== movieId));
  };

  return (
    <FavoritesContext.Provider
      value={{
        favoriteIds,
        favoriteMovies,
        isFavorite,
        addFavorite,
        removeFavorite,
        refreshFavorites,
        loading,
      }}
    >
      {children}
    </FavoritesContext.Provider>
  );
}

export function useFavorites() {
  const context = useContext(FavoritesContext);
  if (context === undefined) {
    throw new Error("useFavorites must be used within a FavoritesProvider");
  }
  return context;
}
