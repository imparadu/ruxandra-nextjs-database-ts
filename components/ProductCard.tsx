// components/ProductCard.tsx
import { useState } from "react";
import Image from "next/image";

interface ProductCardProps {
  product: PortfolioItem;
  onDelete: (id: number) => void;
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
        className="w-full h-auto"
      />
      <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 text-white p-2">
        <p>{product.title}</p>
        <p>
          {product.price} {product.currency}
        </p>
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
