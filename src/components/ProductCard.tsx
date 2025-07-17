import type { Product } from "../types/Product";

interface ProductCardProps {
  product: Product;
  onAddToCart?: (productId: number) => void;
}

function ProductCard({ product, onAddToCart }: ProductCardProps) {
  const handleAddToCart = () => {
    if (onAddToCart) {
      onAddToCart(product.id);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300 group">
      <div className="relative overflow-hidden">
        <img src={product.image} alt={product.name} className="w-full h-80 object-cover group-hover:scale-105 transition-transform duration-300"/>
      </div>
      <div className="p-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-2">{product.name}</h3>
        <div className="flex items-center justify-between">
          <span className="text-xl font-bold text-orange-500">NT$ {product.price.toLocaleString()}</span>
          <button onClick={handleAddToCart} className="bg-orange-500 text-white px-4 py-2 rounded-lg hover:bg-orange-600 transition-colors">加入購物車</button>
        </div>
      </div>
    </div>
  );
}

export default ProductCard;
