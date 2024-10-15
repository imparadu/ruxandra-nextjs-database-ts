"use client";

import React from "react";
import { AuthProvider } from "@/context/AuthContext";
import Auth from "../../../components/Auth";

const LoginPage: React.FC = () => {
  return (
    <AuthProvider>
      <div className="flex items-center justify-center h-screen bg-black">
        <Auth />
      </div>
    </AuthProvider>
  );
};

export default LoginPage;
