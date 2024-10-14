import { ReactNode } from "react";
import { josefin } from "../ui/fonts";
import { AuthProvider } from "@/context/AuthContext";

export default function AdminLayout({ children }: { children: ReactNode }) {
  return (
    <AuthProvider>
      <html lang="en">
        <body className={`${josefin.className} antialiased`}>{children}</body>
      </html>
    </AuthProvider>
  );
}
