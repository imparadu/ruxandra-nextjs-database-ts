"use client";
import Image from "next/image";
import { useState } from "react";
import { Picture, Product } from "../api/add-pet/data_types";

interface ProductCardProps {
  product: Product;
}

const data: Picture[] = [
  {
    id: "1", // Changed from number to string
    title: "pic title",
    price: 20,
    currency: "eur",
    imgUrl: "https://picsum.photos/360/300", // Ensure this URL is less than 255 characters
    width: 360,
    height: 300,
    alt: "random words",
    created_at: new Date(), // Added created_at
    updated_at: new Date(), // Added updated_at
  },
  {
    id: "2",
    title: "pic title",
    price: 20,
    currency: "eur",
    imgUrl: "https://picsum.photos/500/340",
    width: 500,
    height: 340,
    alt: "random wording",
    created_at: new Date(),
    updated_at: new Date(),
  },
  {
    id: "3",
    title: "pic title",
    price: 20,
    currency: "eur",
    imgUrl: "https://picsum.photos/400/400",
    width: 400,
    height: 400,
    alt: "random wording",
    created_at: new Date(),
    updated_at: new Date(),
  },
  {
    id: "4",
    title: "pic title",
    price: 20,
    currency: "eur",
    imgUrl: "https://picsum.photos/500/350",
    width: 500,
    height: 350,
    alt: "random wording",
    created_at: new Date(),
    updated_at: new Date(),
  },
  {
    id: "5",
    title: "pic title",
    price: 20,
    currency: "eur",
    imgUrl: "https://picsum.photos/540/400",
    width: 540,
    height: 400,
    alt: "random wording",
    created_at: new Date(),
    updated_at: new Date(),
  },
  {
    id: "6",
    title: "pic title",
    price: 20,
    currency: "eur",
    imgUrl: "https://picsum.photos/400/390",
    width: 400,
    height: 390,
    alt: "random wording",
    created_at: new Date(),
    updated_at: new Date(),
  },
  {
    id: "7",
    title: "pic title",
    price: 20,
    currency: "eur",
    imgUrl: "https://picsum.photos/500/340",
    width: 500,
    height: 340,
    alt: "random wording",
    created_at: new Date(),
    updated_at: new Date(),
  },
  {
    id: "8",
    title: "pic title",
    price: 20,
    currency: "eur",
    imgUrl: "https://picsum.photos/480/390",
    width: 480,
    height: 390,
    alt: "random wording",
    created_at: new Date(),
    updated_at: new Date(),
  },
];

export default function Page() {
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

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
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
