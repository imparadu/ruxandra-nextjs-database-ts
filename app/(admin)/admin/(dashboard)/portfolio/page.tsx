// C:\coding\ruxandraserbanoiu\ruxandra-nextjs-database-ts\app\(admin)\admin\(dashboard)\portfolio\page.tsx
"use client";
import { useState, useEffect } from "react";
import { ProductCard } from "@/components/ProductCard";
import { AuthProvider } from "@/context/AuthContext";
import { PortfolioItem } from "@/app/api/add-pet/data_types";
import { fetchPortfolio } from "@/app/api/functions/dbFunctions";
import AddPicForm from "@/components/AddPicForm";

export default function Page() {
  const [portfolioData, setPortfolioData] = useState<PortfolioItem[]>([]);
  const [loading, setLoading] = useState(true);
  const fallbackImage = "https://via.placeholder.com/320x480";

  const loadPortfolio = async () => {
    setLoading(true);
    const data = await fetchPortfolio();
    setPortfolioData(data);
    setLoading(false);
  };

  useEffect(() => {
    loadPortfolio();
  }, []);

  const handleDelete = async (id: string) => {
    try {
      const response = await fetch(`/api/deleteItem/${id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        console.log("Item deleted successfully");
        await loadPortfolio(); // Refetch data after successful deletion
      } else {
        const errorText = await response.text();
        console.error("Error deleting item:", errorText);
      }
    } catch (error) {
      console.error("Error deleting item:", error);
    }
  };

  const handleRefresh = async () => {
    // await refreshAdminPanel();
    loadPortfolio(); // Reload the data after revalidation
  };

  // if (loading) {
  //   return <p>Loading portfolio...</p>;
  // }

  return (
    <AuthProvider>
      <div className="justify-center flex flex-col bg-slate-300 max-w-3xl">
        <button onClick={handleRefresh}>Refresh Data</button>
        <div className="xxs:columns-1 xxs:mx-0 xs:columns-1 xs:mx-0 s:columns-2 md:columns-3 lg:columns-4 gap-0 mx-0">
          {portfolioData.map((product) => (
            <ProductCard
              key={product.id}
              product={{
                ...product,
                imgurl: product.imgurl?.startsWith("http")
                  ? product.imgurl
                  : fallbackImage,
              }}
              onDelete={() => handleDelete(product.id)}
            />
          ))}
        </div>
      </div>
      <AddPicForm onSave={handleRefresh} />
    </AuthProvider>
  );
}
