"use client";
import Image from "next/image";
import { useState } from "react";
import {
  Picture,
  Product,
  data,
  ProductCardProps,
} from "../../api/add-pet/data_types";

export default function PortfolioPage() {
  return (
    <>
      <div className="justify-center flex flex-col ">
        <div className="xxs:columns-1 xxs:mx-0 xs:columns-1 xs:mx-0 s:columns-2 md:columns-3 lg:columns-4 gap-0 mx-0">
          {data.map((product) => {
            return <ProductCard key={product.id} product={product} />;
          })}
        </div>
        {/* <BackToTopButton /> */}
      </div>
    </>
  );
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const fallbackImage = "https://via.placeholder.com/320x480"; // Fallback image URL
  const [imgSrc, setImgSrc] = useState(product.imgUrl || fallbackImage);

  const handleImageError = () => {
    setImgSrc(fallbackImage);
  };

  return (
    <div className="">
      <Image
        alt={product.alt}
        src={imgSrc}
        width={product.width}
        height={product.height}
        className="p-2"
        onError={handleImageError} // Error handler to replace broken image
      />
    </div>
  );
};
