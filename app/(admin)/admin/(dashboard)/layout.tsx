"use client";

import AdminNav from "@/components/AdminNav";
import React, { useState, useEffect } from "react";
import ProtectedRoute from "@/components/ProtectedRoute";
import AddPicForm from "@/components/AddPicForm";
import { fetchPortfolio } from "@/app/api/functions/dbFunctions";

type SpecialLayoutProps = {
  children: React.ReactNode;
};

export default function SpecialLayout({ children }: SpecialLayoutProps) {
  const [portfolioData, setPortfolioData] = useState([]);

  const loadPortfolio = async () => {
    const data = await fetchPortfolio();
    setPortfolioData(data);
  };

  useEffect(() => {
    loadPortfolio(); // Load portfolio data on mount
  }, []);

  return (
    <ProtectedRoute>
      <div className="flex flex-row justify-between">
        <AdminNav />
        {children}
        <AddPicForm onSave={loadPortfolio} />{" "}
        {/* Pass the loadPortfolio function */}
      </div>
    </ProtectedRoute>
  );
}
