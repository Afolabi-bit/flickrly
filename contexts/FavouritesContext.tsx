// contexts/FavoritesContext.tsx
"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { getUserFavoriteIds } from "@/app/utils/actions";

interface FavoritesContextType {
  favoriteIds: Set<string>;
  isFavorite: (movieId: string) => boolean;
  addFavorite: (movieId: string) => void;
  removeFavorite: (movieId: string) => void;
  loading: boolean;
}

const FavoritesContext = createContext<FavoritesContextType | undefined>(
  undefined
);

export function FavoritesProvider({ children }: { children: React.ReactNode }) {
  const [favoriteIds, setFavoriteIds] = useState<Set<string>>(new Set());
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadFavorites();
  }, []);

  const loadFavorites = async () => {
    try {
      const ids = await getUserFavoriteIds();
      setFavoriteIds(new Set(ids));
    } catch (error) {
      console.error("Error loading favorites:", error);
    } finally {
      setLoading(false);
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
  };

  return (
    <FavoritesContext.Provider
      value={{ favoriteIds, isFavorite, addFavorite, removeFavorite, loading }}
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
