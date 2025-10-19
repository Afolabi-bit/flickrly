import MovieCategoriesSection from "@/components/dashBoardComponents/MovieCategoriesSection";
import getSessionUser from "@/lib/auth";
import { CloudSun, Moon, Sun, SunMoon } from "lucide-react";
import Image from "next/image";
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
        <h1 className="text-[50px] font-bold flex items-baseline gap-5">
          <span>
            {greeting}, {user.given_name}{" "}
          </span>
          <span className="translate-y-">
            {" "}
            {hours < 12 ? (
              <Image
                src={"/assets/dawn.png"}
                alt="trending"
                className="object-cover translate-y-[-10px]"
                height={50}
                width={50}
              />
            ) : hours < 16 ? (
              <Image
                src={"/assets/sun.png"}
                alt="trending"
                className="object-cover translate-y-[-10px]"
                height={50}
                width={50}
              />
            ) : hours < 19 ? (
              <Image
                src={"/assets/eveningSun.png"}
                alt="trending"
                className="object-cover translate-y-[-10px]"
                height={50}
                width={50}
              />
            ) : (
              <Image
                src={"/assets/night.png"}
                alt="trending"
                className="object-cover translate-y-[-10px]"
                height={50}
                width={50}
              />
            )}
          </span>
        </h1>
        <p className="text-2xl leading-1.5 pt-4.5">
          Here’s what’s lighting up the screens this season. Find something new
          to fall in love with.
        </p>
      </div>
      <MovieCategoriesSection />
    </main>
  );
};

export default page;
