// components/ProductCard.tsx
import { useState } from "react";
import Image from "next/image";
import { PortfolioItem } from "@/app/api/add-pet/data_types";

interface ProductCardProps {
  product: PortfolioItem;
  onDelete: (id: string) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  onDelete,
}) => {
  const [isSelected, setIsSelected] = useState(false);

  const handleClick = () => {
    setIsSelected(!isSelected);
  };

  const handleDelete = () => {
    if (window.confirm("Are you sure you want to delete this item?")) {
      onDelete(product.id);
    }
  };
  console.log(product.width, product.height)

  return (
    <div
      className={`relative mb-4 ${isSelected ? "ring-2 ring-blue-500" : ""}`}
      onClick={handleClick}
    >
      <Image
        src={product.imgurl}
        alt={product.alt}
        width={product.width}
        height={product.height}
        // className="w-full h-full"
      />
      <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 text-white p-2">
        <p>{product.id}</p>
      </div>
      {isSelected && (
        <button
          className="absolute top-2 right-2 bg-red-500 text-white px-2 py-1 rounded"
          onClick={handleDelete}
        >
          Delete
        </button>
      )}
    </div>
  );
};
