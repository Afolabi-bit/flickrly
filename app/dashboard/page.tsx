import MovieCategoriesSection from "@/components/dashBoardComponents/MovieCategoriesSection";
import { buttonVariants } from "@/components/ui/button";
import getSessionUser from "@/lib/auth";
import { HeartPlus, History } from "lucide-react";
import Link from "next/link";
import { redirect } from "next/navigation";
import React from "react";

const page = async () => {
  const user = await getSessionUser();

  if (!user?.given_name) redirect("/api/auth/register");

  const hours = new Date().getHours();
  const greeting =
    hours < 12
      ? "Good morning"
      : hours < 16
      ? "Good afternoon"
      : "Good evening";

  const navItems = [
    { name: "History", href: "/profile" },
    { name: "Favourites", href: "/profile" },
  ];

  return (
    <main className="py-0 lg:py-10">
      <div className="flex-col flex items-center md:items-start">
        <h1 className="text-wrap text-[25px] md:text-[40px] lg:text-[50px] font-bold">
          <span>
            {greeting}, {user.given_name}.
          </span>
        </h1>
        <p className="text-[15px] sm:text-lg md:text-2xl text-gray-900 pt-4">
          Here’s what’s lighting up the screens this season. <br /> Find
          something new to fall in love with.
        </p>
      </div>

      <nav className="mt-8 flex flex-wrap justify-center md:justify-start gap-4  pb-3">
        {navItems.map((item) => (
          <Link
            key={item.name}
            href={item.href}
            className={` text-sm md:text-base text-gray-400 hover:text-white transition-colors font-medium ${buttonVariants()}`}
          >
            <p className="text-white">
              {item.name === "History" ? <History /> : <HeartPlus />}
            </p>

            <p> {item.name}</p>
          </Link>
        ))}
      </nav>

      <MovieCategoriesSection />
    </main>
  );
};

export default page;
