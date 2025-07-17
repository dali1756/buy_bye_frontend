import type { Product, SortOption } from "../types/Product";

export const sortProducts = (products: Product[], sortOption: SortOption): Product[] => {
  switch (sortOption) {
    case "price-asc":
      return [...products].sort((a, b) => a.price - b.price);
    case "price-desc":
      return [...products].sort((a, b) => b.price - a.price);
    default:
      return products;
  }
};

export const filterProductsByCategory = (products: Product[], category: string): Product[] => {
  return products.filter(product => product.category === category);
};
