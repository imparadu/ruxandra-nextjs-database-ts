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
  product: PortfolioItem;
  onDelete: () => void; // Ensure this is present
}

export interface PortfolioItem {
  id: string;
  title: string;
  price: number;
  currency: string;
  imgurl: string;
  width: number;
  height: number;
  alt: string;
  onDelete: () => void; // Ensure this is present
}
