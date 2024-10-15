"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { auth } from "@/app/lib/firebaseConfig";
import { signInWithEmailAndPassword } from "firebase/auth";

const Auth: React.FC = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const router = useRouter(); // Initialize useRouter

  const handleSignIn = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      console.log("User signed in");

      // Redirect to /admin/dashboard after successful login
      router.push("/admin/portfolio");
    } catch (error) {
      console.error("Error signing in:", error);
    }
  };

  return (
    <>
    <div className="flex flex-col w-full max-w-sm mx-auto p-6 bg-white shadow-md rounded-md space-y-4 ">
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
      />
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
      />
      <button
        onClick={handleSignIn}
        className="w-full px-4 py-2 bg-indigo-600 text-white font-semibold rounded-md hover:bg-indigo-700 transition duration-300"
      >
        Sign In
      </button>
    </div>
    </>
  );
};

export default Auth;
