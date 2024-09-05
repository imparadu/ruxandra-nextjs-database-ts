"use client"
import Image from "next/image";
import { useState } from "react";

interface Picture {
  id: number;
  title: string;
  price: number;
  currency: string;
  imgUrl: string;
  width: number;
  height: number;
  alt: string;
}
interface Product {
  alt: string;
  imgUrl?: string;
  width: number;
  height: number;
}

interface ProductCardProps {
  product: Product;
}

const data: Picture[] = [
  {
    id: 1,
    title: "pic title",
    price: 20,
    currency: "eur",
    imgUrl: "https://picsum.photos/360/300",
    width: 360,
    height: 300,
    alt: "random words",
  },
  {
    id: 2,
    title: "pic title",
    price: 20,
    currency: "eur",
    imgUrl: "https://picsum.photos/500/340",
    width: 500,
    height: 340,
    alt: "random wording",
  },
  {
    id: 3,
    title: "pic title",
    price: 20,
    currency: "eur",
    imgUrl: "https://picsum.photos/400/400",
    width: 400,
    height: 400,
    alt: "random wording",
  },
  {
    id: 4,
    title: "pic title",
    price: 20,
    currency: "eur",
    imgUrl: "https://picsum.photos/500/350",
    width: 500,
    height: 350,
    alt: "random wording",
  },
  {
    id: 5,
    title: "pic title",
    price: 20,
    currency: "eur",
    imgUrl: "https://picsum.photos/540/400",
    width: 540,
    height: 400,
    alt: "random wording",
  },
  {
    id: 6,
    title: "pic title",
    price: 20,
    currency: "eur",
    imgUrl: "https://picsum.photos/400/390",
    width: 400,
    height: 390,
    alt: "random wording",
  },
  {
    id: 7,
    title: "pic title",
    price: 20,
    currency: "eur",
    imgUrl: "https://picsum.photos/500/340",
    width: 500,
    height: 340,
    alt: "random wording",
  },
  {
    id: 8,
    title: "pic title",
    price: 20,
    currency: "eur",
    imgUrl: "https://picsum.photos/480/390",
    width: 480,
    height: 390,
    alt: "random wording",
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
