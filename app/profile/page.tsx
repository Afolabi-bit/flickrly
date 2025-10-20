import getSessionUser from "@/lib/auth";
import { redirect } from "next/navigation";

const page = async () => {
  const user = await getSessionUser();

  if (!user?.given_name) redirect("/api/auth/register");

  return <div>{user?.given_name}</div>;
};

export default page;
