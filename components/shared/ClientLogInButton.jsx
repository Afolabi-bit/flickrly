import { buttonVariants } from "../ui/button";
import { LoginLink } from "@kinde-oss/kinde-auth-nextjs";

export default function ClientLoginButton() {
  return (
    <LoginLink className={buttonVariants({ variant: "secondary" })}>
      Log In
    </LoginLink>
  );
}
