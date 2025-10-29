"use client";

import Image from "next/image";
import Link from "next/link";
import SearchBar from "./SearchBar";

import ClientLoginButton from "./ClientLogInButton";
import { HeaderProps } from "@/app/types/otherTypes";

export default function Header({ user, theme = "dark" }: HeaderProps) {
  return (
    <header className="h-fit py-[30px] lg:h-[80px] w-full z-50 flex flex-col gap-5 justify-between items-center">
      <div className="size-full flex justify-between items-center">
        <Link href={"/"} className="gap-2.5 flex items-center lg:gap-6 ">
          <div className="relative size-[35px]  sm:size-10  md:w-12.5 md:h-12.5">
            <Image
              priority
              src="/assets/tv.png"
              alt="TV logo"
              fill
              className="object-contain"
            />
          </div>
          <h2
            className={`text-[18px] lg:text-2xl font-bold leading-6 ${
              theme === "light" ? "text-white" : "text-black"
            }`}
          >
            Flickerly
          </h2>
        </Link>

        <div className="hidden sm:inline-block w-fit">
          <SearchBar theme={theme} />
        </div>

        <div>
          {user ? (
            <Link href="/profile" className="flex gap-2 items-center group">
              <Image
                src={user.picture ?? "/assets/user.png"}
                alt="user"
                width={40}
                height={40}
                priority
                className="rounded-full shadow-2xl border-2 border-white/5 active:border-blue-600 transition-colors duration-200"
              />
            </Link>
          ) : (
            <ClientLoginButton />
          )}
        </div>
      </div>
      <div className="w-full sm:hidden">
        <SearchBar theme={theme} />
      </div>
    </header>
  );
}
