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
  posterPath?: string;
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
      posterPath: movie.posterPath,
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
