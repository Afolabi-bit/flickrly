import type { Metadata } from "next";
import { Open_Sans } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "@/components/shared/AuthProvider";
import getSessionUser from "@/lib/auth";
import { syncUserToDatabase } from "./utils/actions";
import type { KindeUser } from "@kinde-oss/kinde-auth-nextjs/types";
import Image from "next/image";

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
    <html lang="en">
      <body className={`${openSans.variable} bg-[#eeeeee07] antialiased`}>
        <AuthProvider>
          {children}
          <footer className=" border-t border-gray-800 bg-[#0d0d0d] text-gray-400 py-8">
            <div className="max-w-5xl mx-auto flex flex-col items-center gap-4 text-center">
              {/* Brand & Tagline */}
              <div>
                <h3 className="text-white font-semibold text-xl">Flickerly</h3>
                <p className="text-sm mt-1 text-gray-500">
                  Where stories come alive — built with ❤️ and popcorn 🍿
                </p>
              </div>

              {/* Social Links */}
              <div className="flex justify-center gap-5 text-lg mt-2">
                <a
                  href="https://x.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Twitter"
                  className="bg-white transition-colors rounded-sm"
                >
                  <Image
                    src="/assets/twitter.png"
                    alt="twitter"
                    width={30}
                    height={30}
                    className="object-cover"
                  />{" "}
                </a>

                <a
                  href="https://github.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="GitHub"
                  className="hover:text-white transition-colors"
                >
                  <Image
                    src="/assets/github.png"
                    alt="github"
                    width={30}
                    height={30}
                    className="object-cover"
                  />{" "}
                </a>
                <a
                  href="mailto:maverickoluwatomisin@gmail.com"
                  aria-label="Email"
                  className="hover:text-white transition-colors"
                >
                  <Image
                    src="/assets/gmail.png"
                    alt="gmail"
                    width={30}
                    height={30}
                    className="object-cover"
                  />{" "}
                </a>
              </div>

              {/* Copyright */}
              <div className="mt-4 text-xs text-gray-600">
                &copy; {new Date().getFullYear()}{" "}
                <span className="text-gray-400 font-medium">Flickerly</span> by{" "}
                <a
                  href="https://afolabijoseph.vercel.app"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline text-gray-400 hover:text-white transition-colors"
                >
                  Fenigma
                </a>
                . All rights reserved. v1.0.0
              </div>
            </div>
          </footer>
        </AuthProvider>
      </body>
    </html>
  );
}
