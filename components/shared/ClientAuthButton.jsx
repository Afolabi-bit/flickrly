import { buttonVariants } from "../ui/button";
import { LoginLink } from "@kinde-oss/kinde-auth-nextjs";

export default function ClientAuthButton() {
  return <LoginLink className={buttonVariants()}>Log In</LoginLink>;
}
