import prisma from "./db";

export async function syncUserToDatabase(user: any) {
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
    } else {
      // Optionally update name/image if changed
      await prisma.user.update({
        where: { id: user.id },
        data: {
          name: user.given_name + " " + user.family_name,
          image: user.picture,
        },
      });
    }
  } catch (error) {
    console.error("Error syncing user:", error);
  }
}
