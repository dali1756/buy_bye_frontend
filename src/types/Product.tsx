export interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
  category: string;
}

export type SortOption = "default" | "price-asc" | "price-desc";
