"use server";

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
