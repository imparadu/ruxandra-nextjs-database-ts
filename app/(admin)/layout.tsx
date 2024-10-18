import { ReactNode } from "react";
import { josefin } from "../ui/fonts";
import { AuthProvider } from "@/context/AuthContext";
import "../globals.css";

export default function AdminLayout({ children }: { children: ReactNode }) {
  return (
    <AuthProvider>
      <html lang="en">
        <body className={`${josefin.className} antialiased w-full`}>{children}</body>
      </html>
    </AuthProvider>
  );
}
