"use client";
import { useState, useEffect } from "react";
import { ProductCard } from "@/components/ProductCard";

export default function PortfolioPage() {
  const [portfolioData, setPortfolioData] = useState<PortfolioItem[]>([]); // Initialize as an empty array
  const [loading, setLoading] = useState(true); // Loading state
  const fallbackImage = "https://via.placeholder.com/320x480";
  useEffect(() => {
    const fetchPortfolio = async () => {
      try {
        const response = await fetch("/api/get-portfolio");
        const data = await response.json();

        console.log("Response data:", data); // Debug log to inspect the structure

        if (response.ok) {
          setPortfolioData(data.portfolio.rows); // Access the `rows` array
        } else {
          console.error("Error fetching portfolio:", data.error);
        }
      } catch (error) {
        console.error("Error fetching portfolio:", error);
      } finally {
        setLoading(false); // Ensure loading state is turned off
      }
    };

    fetchPortfolio();
  }, []);

  if (loading) {
    return <p>Loading portfolio...</p>; // Loading message
  }

  return (
    <>
      <div className="justify-center flex flex-col">
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
            />
          ))}
        </div>
      </div>
    </>
  );
}

// export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
//   const fallbackImage = "https://via.placeholder.com/320x480"; // Fallback image URL
//   const [imgSrc, setImgSrc] = useState(product.imgUrl || fallbackImage);

//   const handleImageError = () => {
//     setImgSrc(fallbackImage);
//   };

//   return (
//     <div className="">
//       <Image
//         alt={product.alt}
//         src={imgSrc}
//         width={product.width}
//         height={product.height}
//         className="p-2"
//         onError={handleImageError} // Error handler to replace broken image
//       />
//     </div>
//   );
// };
