"use client";

import Image from "next/image";
import Link from "next/link";
import SearchBar from "./SearchBar";

import ClientAuthButton from "./ClientAuthButton";

interface User {
  id?: string;
  given_name?: string | null;
  family_name?: string | null;
  email?: string | null;
  picture?: string | null;
}

interface HeaderProps {
  user?: User | null;
  theme?: "light" | "dark";
}

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
        <h1
          className={`text-2xl font-bold leading-6 ${
            theme === "light" ? "text-white" : "text-black"
          }`}
        >
          Flickerly
        </h1>
      </Link>

      <SearchBar theme={theme} />

      <div>
        {user ? (
          <Link href="/profile" className="flex gap-2 items-center">
            <Image
              src={user.picture ?? "/assets/user.png"}
              alt="user"
              width={40}
              height={40}
              priority
              className="rounded-full shadow-2xl"
            />
          </Link>
        ) : (
          <ClientAuthButton />
        )}
      </div>
    </header>
  );
}
