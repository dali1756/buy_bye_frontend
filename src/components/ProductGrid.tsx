import ProductCard from "./ProductCard";
import type { Product } from "../types/Product";

interface ProductGridProps {
  products: Product[];
  onAddToCart?: (productId: number) => void;
}

function ProductGrid({ products, onAddToCart }: ProductGridProps) {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} onAddToCart={onAddToCart} />
        ))}
      </div>
    </div>
  );
}

export default ProductGrid;
