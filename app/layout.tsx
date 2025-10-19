import type { Metadata } from "next";
import { Open_Sans } from "next/font/google";
import "./globals.css";

const open_Sans = Open_Sans({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Flickerly",
  description: "Teasers and trailers",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${open_Sans.variable} bg-[#eeeeee07] antialiased`}>
        {children}
      </body>
    </html>
  );
}
