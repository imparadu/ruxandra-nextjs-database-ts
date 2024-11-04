//C:\coding\ruxandraserbanoiu\ruxandra-nextjs-database-ts\app\(site)\portfolio\page.tsx
"use client";
import { useState, useEffect } from "react";
import { ProductCard } from "@/components/ProductCard";
import { PortfolioItem } from "@/app/api/addItem/data_types";
import { fetchPortfolio } from "@/app/api/functions/dbFunctions";
import { refreshAdminPanel } from "@/app/api/actions/actions";

export default function PortfolioPage() {
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

  const handleRefresh = async () => {
    await refreshAdminPanel();
    loadPortfolio(); // Reload the data after revalidation
  };

  if (loading) {
    return <p>Loading portfolio...</p>;
  }

  return (
    <>
      <div className="justify-center flex flex-col">
        {/* <button onClick={handleRefresh}>Refresh Data</button> */}
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
              onDelete={function (id: string): void {
                throw new Error("Function not implemented.");
              }}
            />
          ))}
        </div>
      </div>
    </>
  );
}
