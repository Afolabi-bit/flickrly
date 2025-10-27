import Header from "@/components/shared/Header";
import getSessionUser from "@/lib/auth";

export default async function MovieLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await getSessionUser();

  return (
    <div className="min-h-screen flex flex-col px-[98px] bg-[#eee]">
      <Header user={user} theme="dark" />
      <main className="flex-1 py-8">{children}</main>
    </div>
  );
}
