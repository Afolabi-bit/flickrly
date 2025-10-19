"use client";

import { LoginLink } from "@kinde-oss/kinde-auth-nextjs";
import Image from "next/image";
import Link from "next/link";
import React from "react";

interface User {
  given_name: string;
  picture: string;
  email: string;
}

interface DashboardHeaderProps {
  user: User | null;
}
const DashboardHeader = ({ user }: DashboardHeaderProps) => {
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
        <h1 className="text-2xl font-bold leading-6 text-black">Flickerly</h1>
      </Link>
      <form className="form w-[525px] h-[36px] relative">
        <input
          type="text"
          placeholder="What do you want to watch?"
          className="w-full h-full px-[10px] py-[6px] outline-black rounded-[6px] placeholder:text-black border border-black"
        />
        <button type="submit" className="absolute top-[6px] right-[10px]">
          <Image
            src="/assets/Search.png"
            alt="search icon"
            width={16}
            height={16}
            priority
          />
        </button>
      </form>
      <div>
        {user ? (
          <Link href={"/profile"} className="flex gap-2 items-center">
            <span className="text-white font-semibold">{user.given_name}</span>
            <Image
              src={user.picture}
              alt="user"
              width={40}
              height={40}
              priority
              className="rounded-full shadow-2xl"
            />
          </Link>
        ) : (
          <LoginLink className="bg-[#B81D24] inline-flex rounded-sm justify-center items-center w-[114px] h-[36px] text-white">
            <span className="text-sm font-semibold">Log In</span>
          </LoginLink>
        )}
      </div>
    </header>
  );
};

export default DashboardHeader;
