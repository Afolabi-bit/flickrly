import MovieCategoriesSection from "@/components/dashBoardComponents/MovieCategoriesSection";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import Link from "next/link";
import { redirect } from "next/navigation";
import React from "react";

const page = async () => {
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  if (!user?.given_name) redirect("/api/auth/login");
  console.log(user);

  return (
    <main>
      <Link
        href="/api/auth/logout"
        className="inline-block mt-4 px-4 py-2 bg-red-500 text-white rounded"
      >
        Logout
      </Link>
      <MovieCategoriesSection />
    </main>
  );
};

export default page;
