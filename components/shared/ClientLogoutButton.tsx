"use client";
import { buttonVariants } from "../ui/button";
import { LogoutLink } from "@kinde-oss/kinde-auth-nextjs";

export default function ClientLogoutButton() {
  return (
    <LogoutLink className={`${buttonVariants()} inline-block`}>
      Log Out
    </LogoutLink>
  );
}
