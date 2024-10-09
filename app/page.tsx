import Image from "next/image";
import { AuthProvider } from "@/context/AuthContext";
import PortfolioPage from "./portfolio/page";

export default function Home() {
  return (
    <AuthProvider>
      <main>
        <PortfolioPage />
      </main>
    </AuthProvider>
  );
}
