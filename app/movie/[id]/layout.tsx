import Header from "@/components/shared/Header";
import getSessionUser from "@/lib/auth";

export default async function MovieLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await getSessionUser();

  return (
    <div className="px-[20px] sm:px-10 min-h-screen flex flex-col  lg:px-[98px] bg-[#eee] ">
      <div className="w-full 2xl:w-[1440px] 2xl:mx-auto">
        <Header user={user} theme="dark" />
        <main className="flex-1 py-8 min-h-screen">{children}</main>
      </div>
    </div>
  );
}
