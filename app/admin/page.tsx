// components/Auth.tsx
"use client"; // Add this line
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { auth } from "../lib/firebaseConfig";
import { signInWithEmailAndPassword } from "firebase/auth";
import createTable from "../lib/postres";

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
