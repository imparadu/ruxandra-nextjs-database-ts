"use client";
import AdminNav from '@/components/AdminNav';
import React from 'react';
import ProtectedRoute from "@/components/ProtectedRoute";


type SpecialLayoutProps = {
  children: React.ReactNode;
};

export default function SpecialLayout({ children }: SpecialLayoutProps) {
  return (
    <ProtectedRoute>
    <>

    <AdminNav />
      {children}

    </>

    </ProtectedRoute>
  );
}
