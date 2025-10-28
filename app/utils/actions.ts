"use server";

import getSessionUser from "@/lib/auth";
import prisma from "./db";
import type { KindeUser } from "@kinde-oss/kinde-auth-nextjs";

export async function syncUserToDatabase(user: KindeUser) {
  try {
    const existingUser = await prisma.user.findUnique({
      where: { id: user.id },
    });

    if (!existingUser) {
      await prisma.user.create({
        data: {
          id: user.id,
          email: user.email,
          name: user.given_name + " " + user.family_name,
          image: user.picture,
        },
      });
    }
  } catch (error) {
    console.error("Error syncing user:", error);
  }
}

export async function toggleFavorite(movie: {
  id: string;
  title: string;
  poster_path?: string;
}) {
  const user = await getSessionUser();

  if (!user) throw new Error("User not authenticated");

  const existingFav = await prisma.favorite.findUnique({
    where: {
      userId_movieId: {
        userId: user.id,
        movieId: movie.id,
      },
    },
  });

  if (existingFav) {
    // Unlike → remove favorite
    await prisma.favorite.delete({
      where: { id: existingFav.id },
    });

    // Decrease fav count and optionally delete movie if none left
    const updatedMovie = await prisma.movie.update({
      where: { id: movie.id },
      data: { favCount: { decrement: 1 } },
      include: { favorites: true },
    });

    if (updatedMovie.favCount <= 0) {
      await prisma.movie.delete({ where: { id: movie.id } });
    }

    return { liked: false };
  }

  // Movie might not exist yet — create if needed
  await prisma.movie.upsert({
    where: { id: movie.id },
    create: {
      id: movie.id,
      title: movie.title,
      poster_path: movie.poster_path,
      favCount: 1,
    },
    update: { favCount: { increment: 1 } },
  });

  // Add favorite
  await prisma.favorite.create({
    data: {
      userId: user.id,
      movieId: movie.id,
    },
  });

  return { liked: true };
}

export async function getUserFavoriteIds(): Promise<string[]> {
  try {
    const user = await getSessionUser();

    if (!user) {
      return [];
    }

    const favorites = await prisma.favorite.findMany({
      where: { userId: user.id },
      select: { movieId: true },
    });

    return favorites.map((fav) => fav.movieId);
  } catch (error) {
    console.error("Error fetching user favorites:", error);
    return [];
  }
}

// NEW: Check if specific movies are favorited (batch check for efficiency)
export async function checkFavorites(
  movieIds: string[]
): Promise<Record<string, boolean>> {
  try {
    const user = await getSessionUser();

    if (!user || movieIds.length === 0) {
      return {};
    }

    const favorites = await prisma.favorite.findMany({
      where: {
        userId: user.id,
        movieId: { in: movieIds },
      },
      select: { movieId: true },
    });

    const favoriteMap: Record<string, boolean> = {};
    favorites.forEach((fav) => {
      favoriteMap[fav.movieId] = true;
    });

    return favoriteMap;
  } catch (error) {
    console.error("Error checking favorites:", error);
    return {};
  }
}

export async function getUserFavoriteMovies() {
  try {
    const user = await getSessionUser();

    if (!user) {
      return [];
    }

    const favorites = await prisma.favorite.findMany({
      where: { userId: user.id },
      include: {
        movie: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return favorites.map((fav) => ({
      id: fav.movie.id,
      title: fav.movie.title,
      poster_path: fav.movie.poster_path,
      favCount: fav.movie.favCount,
      addedAt: fav.createdAt,
    }));
  } catch (error) {
    console.error("Error fetching favorite movies:", error);
    return [];
  }
}

export async function trackMovieView(movie: {
  id: string;
  title: string;
  poster_path: string;
}) {
  const user = await getSessionUser();
  if (!user) return null;

  // Ensure the movie exists in DB first (since you only store favorites & viewed)
  await prisma.movie.upsert({
    where: { id: movie.id },
    update: {
      title: movie.title,
      poster_path: movie.poster_path,
      updatedAt: new Date(),
    },
    create: {
      id: movie.id,
      title: movie.title,
      poster_path: movie.poster_path,
    },
  });

  await prisma.viewHistory.create({
    data: {
      userId: user.id,
      movieId: movie.id,
    },
  });

  // Keep only the 20 most recent records
  const recentViews = await prisma.viewHistory.findMany({
    where: { userId: user.id },
    orderBy: { viewedAt: "desc" },
    skip: 20, // skip the 20 newest
  });

  // Delete anything older than the 20 most recent
  if (recentViews.length > 0) {
    await prisma.viewHistory.deleteMany({
      where: {
        id: { in: recentViews.map((v) => v.id) },
      },
    });
  }

  return { success: true };
}
