"use client";
import { buttonVariants } from "../ui/button";
import { LogoutLink } from "@kinde-oss/kinde-auth-nextjs";

export default function ClientLogoutButton() {
  return (
    <LogoutLink
      className={`${buttonVariants()} inline-block px-[13px] py-[5px] text-[13px]  
    sm:px-4.5 sm:py-1.5 sm:text-[14]`}
    >
      Log Out
    </LogoutLink>
  );
}
