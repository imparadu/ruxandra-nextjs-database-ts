import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useAuth } from "../context/AuthContext";

const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const { user } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!user) {
      router.push("/admin"); // Redirect to login page if not authenticated
    }
  }, [user, router]);

  return user ? <>{children}</> : null; // Render children if authenticated
};

export default ProtectedRoute;
