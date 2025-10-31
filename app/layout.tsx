import type { Metadata } from "next";
import { Open_Sans } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "@/components/shared/AuthProvider";
import getSessionUser from "@/lib/auth";
import { syncUserToDatabase } from "./utils/actions";
import type { KindeUser } from "@kinde-oss/kinde-auth-nextjs/types";
import Image from "next/image";
import { FavoritesProvider } from "@/contexts/FavouritesContext";
import Footer from "@/components/shared/Footer";

const openSans = Open_Sans({
  variable: "--font-open-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Flickerly",
  description: "Teasers and trailers",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const user = (await getSessionUser()) as KindeUser | null;

  if (user) {
    await syncUserToDatabase(user);
  }

  return (
    <html className={openSans.className} lang="en">
      <body className={` bg-[#eeeeee07] antialiased`}>
        <AuthProvider>
          <FavoritesProvider>{children}</FavoritesProvider>
          <Footer />
        </AuthProvider>
      </body>
    </html>
  );
}
