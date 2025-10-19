import MovieCategoriesSection from "@/components/dashBoardComponents/MovieCategoriesSection";
import getSessionUser from "@/lib/auth";
import { CloudSun, Moon, Sun, SunMoon } from "lucide-react";
import { redirect } from "next/navigation";
import React from "react";

const page = async () => {
  const user = await getSessionUser();

  if (!user?.given_name) redirect("/api/auth/login");

  const hours = new Date().getHours();
  const greeting =
    hours < 12
      ? "Good morning"
      : hours < 18
      ? "Good afternoon"
      : "Good evening";

  return (
    <main>
      <div>
        <h1 className="text-[40px] font-bold flex items-baseline gap-5">
          <span>
            {greeting}, {user.given_name}{" "}
          </span>
          <span className="translate-y-1">
            {" "}
            {hours < 12 ? (
              <CloudSun className="text-[#6bb6f3] size-14" />
            ) : hours < 16 ? (
              <Sun className="text-red-500 size-14" />
            ) : hours < 19 ? (
              <SunMoon className="text-orange-500 size-14" />
            ) : (
              <Moon className="text-[#58748b] size-14" />
            )}
          </span>
        </h1>
      </div>
      <MovieCategoriesSection />
    </main>
  );
};

export default page;
