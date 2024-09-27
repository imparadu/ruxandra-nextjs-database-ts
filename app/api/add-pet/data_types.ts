export interface Picture {
  id: string; // UUID is represented as a string in TypeScript
  title: string;
  price: number;
  currency: string;
  imgUrl: string;
  width: number;
  height: number;
  alt: string;
  created_at: Date;
  updated_at: Date;
}

export type NewPicture = Omit<Picture, "id" | "created_at" | "updated_at">;

export interface Product {
  alt: string;
  imgUrl?: string;
  width: number;
  height: number;
}

export interface ProductCardProps {
  product: Product;
}

export const data: Picture[] = [
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

