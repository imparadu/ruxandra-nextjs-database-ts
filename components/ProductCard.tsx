import { useState } from "react";
import Image from "next/image";
import { PortfolioItem } from "@/app/api/addItem/data_types";

interface ProductCardProps {
  product: PortfolioItem;
  onDelete?: (id: string) => void;
  onSelect?: (product: PortfolioItem) => void;
  isSelected?: boolean;
  isAdmin?: boolean;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  onDelete,
  onSelect,
  isSelected,
  isAdmin = false,
}) => {
  const handleDelete = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (
      window.confirm("Are you sure you want to delete this item?") &&
      onDelete
    ) {
      onDelete(product.id);
    }
  };
  return (
    <div
      className={`relative cursor-pointer transition-all mb-3 ${
        isSelected ? "ring-2 ring-blue-500" : ""
      }`}
      onClick={isAdmin ? () => onSelect!(product) : undefined}
    >
      <Image
        src={product.imgurl}
        placeholder="blur"
        blurDataURL={product.imgurl}
        alt={product.alt}
        width={product.width}
        height={product.height}
        className="w-full h-auto object-cover"
      />
      <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 text-white p-2">
        <p>{product.title}</p>
        <p className="text-sm">
          {product.price} {product.currency}
        </p>
      </div>
      {isSelected && (
        <button
          className="absolute top-2 right-2 bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600 transition-colors"
          onClick={handleDelete}
        >
          Delete
        </button>
      )}
    </div>
  );
};
