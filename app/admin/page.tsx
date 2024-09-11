// components/Auth.tsx
"use client"; // Add this line
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { auth } from "../lib/firebaseConfig";
import { signInWithEmailAndPassword } from "firebase/auth";
import { firebaseConfig } from "../lib/firebaseConfig";

const Auth: React.FC = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const router = useRouter(); // Initialize useRouter

  const handleSignIn = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      console.log("User signed in");

      // Redirect to /admin/dashboard after successful login
      router.push("/admin/dashboard");
    } catch (error) {
      console.error("Error signing in:", error);
    }
  };

  return (
    <div>
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
      />
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
      />
      <button onClick={handleSignIn}>Sign In</button>
    </div>
  );
};

export default Auth;

// export default function AuthPage() {
//   return (
//     <div className="flex justify-center min-h-screen">
//       <form className="flex flex-col space-y-4 p-6 bg-white shadow-md rounded-md">
//         <input
//           type="email"
//           className="px-4 py-2 border rounded-md"
//           placeholder="Email"
//         />
//         <input
//           type="password"
//           className="px-4 py-2 border rounded-md"
//           placeholder="Password"
//         />
//         <button
//           type="submit"
//           className="px-4 py-2 bg-blue-500 text-white rounded-md"
//         >
//           Login
//         </button>
//       </form>
//     </div>
//   );
// }
