import { buttonVariants } from "../ui/button";
import { LoginLink } from "@kinde-oss/kinde-auth-nextjs";

export default function ClientLoginButton() {
  return (
    <LoginLink
      className={`${buttonVariants({
        variant: "secondary",
      })} px-[13px] py-[5px] text-[13px]  
    sm:px-4.5 sm:py-1.5 sm:text-[14]`}
    >
      Log In
    </LoginLink>
  );
}
