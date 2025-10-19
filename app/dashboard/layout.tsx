import DashboardHeader from "@/components/dashBoardComponents/DashboardHeader";
import getSessionUser from "@/lib/auth";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await getSessionUser();

  return (
    <div className="min-h-screen flex flex-col px-[98px] bg-[#eeeeee07]">
      <DashboardHeader user={user} />
      <main className="flex-1 py-8">{children}</main>
    </div>
  );
}
