import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "./ui/navbar";
import { josefin } from "./ui/fonts";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Ruxandra's portfolio",
  description: "portfolio",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${josefin.className} antialiased`}>
        <Navbar />
        {children}
      </body>
    </html>
  );
}
