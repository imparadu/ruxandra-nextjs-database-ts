// pages/index.tsx
"use client";
import { useState, useEffect } from "react";
import { ProductCard } from "@/components/ProductCard";
import AddPicForm from "@/components/AddPicForm";
import { AuthProvider } from "@/context/AuthContext";
import { PortfolioItem } from "@/app/api/add-pet/data_types";

export default function Page() {
  const [portfolioData, setPortfolioData] = useState<PortfolioItem[]>([]);
  const [loading, setLoading] = useState(true);
  const fallbackImage = "https://via.placeholder.com/320x480";

  useEffect(() => {
    fetchPortfolio();
  }, []);

  const fetchPortfolio = async () => {
    try {
      const response = await fetch(`/api/get-portfolio?t=${Date.now()}`);
      const data = await response.json();

      if (response.ok) {
        console.log("Fetched data:", data.portfolio.rows); // Debug log
        setPortfolioData(data.portfolio.rows);
      } else {
        console.error("Error fetching portfolio:", data.error);
      }
    } catch (error) {
      console.error("Error fetching portfolio:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      const response = await fetch(`/api/deleteItem/${id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        console.log("Item deleted successfully");
        await fetchPortfolio(); // Refetch data after successful deletion
      } else {
        console.error("Error deleting item:", await response.text());
      }
    } catch (error) {
      console.error("Error deleting item:", error);
    }
  };

  if (loading) {
    return <p>Loading portfolio...</p>;
  }

  console.log(portfolioData);
  return (
    <AuthProvider>
      <div className="justify-center flex flex-col max-w-screen-lg">
        <button onClick={fetchPortfolio}>Refresh Data</button>

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
              onDelete={handleDelete}
            />
          ))}
        </div>
      </div>
    </AuthProvider>
  );
}
