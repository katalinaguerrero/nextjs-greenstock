import type { Metadata } from "next";
import { Space_Mono } from "next/font/google";
import "./globals.css";

const space_mono = Space_Mono({
  subsets: ["latin"],
  weight: "400",
});


export const metadata: Metadata = {
  title: "Vivero Life",
  description: "Created by Katalina Guerrero",
  icons: {
    icon: "/logo.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${space_mono.className} `}>
      <body>

         <main className="flex-1 p-6">{children}</main>
      </body>
    </html>
  );
}
