"use client";

import Image from "next/image";
import Link from "next/link";
import SearchBar from "./SearchBar";

import ClientLoginButton from "./ClientLogInButton";
import { HeaderProps } from "@/app/types/otherTypes";

export default function Header({ user, theme = "dark" }: HeaderProps) {
  return (
    <header className="h-[80px] w-full z-50 flex justify-between items-center">
      <Link href={"/"} className="flex items-center gap-6 w-[187px]">
        <Image
          priority
          src="/assets/tv.png"
          alt="TV logo"
          width={50}
          height={50}
        />
        <h2
          className={`text-2xl font-bold leading-6 ${
            theme === "light" ? "text-white" : "text-black"
          }`}
        >
          Flickerly
        </h2>
      </Link>

      <SearchBar theme={theme} />

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
    </header>
  );
}
