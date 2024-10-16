import { Inter } from "next/font/google";
import { ReactNode } from "react";
import "../globals.css";
import Navbar from "../ui/navbar";
import { josefin } from "../ui/fonts";
import { Metadata } from "next";
import { AuthProvider } from "@/context/AuthContext";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Ruxandra's portfolio",
  description: "portfolio",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <AuthProvider>
      <html lang="en">
        <body className={`${josefin.className} antialiased`}>
          <Navbar />
          {children}
        </body>
      </html>
    </AuthProvider>
  );
}
