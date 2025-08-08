export interface Product {
  id: number;
  name: string;
  price: number;
  category: string;
  stock?: number;
  description?: string;
  image: string;
}

export type SortOption = "default" | "price-asc" | "price-desc";
