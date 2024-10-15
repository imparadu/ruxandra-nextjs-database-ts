"use client";

import AdminNav from "@/components/AdminNav";
import React from "react";
import ProtectedRoute from "@/components/ProtectedRoute";
import AddPicForm from "@/components/AddPicForm";

type SpecialLayoutProps = {
  children: React.ReactNode;
};

export default function SpecialLayout({ children }: SpecialLayoutProps) {
  return (
    <ProtectedRoute>
      <>
      <div className="flex flex-row">
        <AdminNav />
        {children}
        <AddPicForm />
      </div>
      </>
    </ProtectedRoute>
  );
}
