import Image from "next/image";
import { useState } from "react";

export interface ProductCardProps {
  product: {
    id: number;
    title: string;
    price: number;
    currency: string;
    imgurl: string;
    width: number;
    height: number;
    alt: string;
  };
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const fallbackImage = "https://via.placeholder.com/320x480"; // Fallback image URL
  const [imgSrc, setImgSrc] = useState(
    product.imgurl?.startsWith("http") ? product.imgurl : fallbackImage,
  );

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
