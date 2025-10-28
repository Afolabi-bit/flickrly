import ClientLogoutButton from "@/components/shared/ClientLogoutButton";
import getSessionUser from "@/lib/auth";
import Image from "next/image";
import { redirect } from "next/navigation";

const page = async () => {
  const user = await getSessionUser();

  if (!user?.given_name) redirect("/api/auth/register");

  return (
    <main>
      <section className="flex gap-20">
        <Image
          src={user.picture || ""}
          alt={user.given_name}
          width={120}
          height={120}
          className="rounded-full object-cover"
        />
        <div className="gap-1.5 flex flex-col">
          <h1 className="text-4xl font-bold">
            {user.given_name} {user.family_name}
          </h1>
          <p className="font-semibold text-black/60">{user.email}</p>
          <div>
            <ClientLogoutButton />
          </div>
        </div>
      </section>
    </main>
  );
};

export default page;
