// components/Auth.tsx
"use client"; // Add this lin
import React, { useState } from "react";
import { auth } from "../lib/firebaseConfig";
import { signInWithEmailAndPassword } from "firebase/auth";

const Auth: React.FC = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const handleSignIn = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      console.log("User signed in");
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
