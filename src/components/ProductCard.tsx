import type { Product } from "../types/Product";
import { useCart } from "../context/CartContext";
import { useState } from "react";

interface ProductCardProps {
  product: Product;
  onAddToCart?: (productId: number) => void;
}

function ProductCard({ product, onAddToCart }: ProductCardProps) {
  const { addToCart, isLoading } = useCart();
  const [isAdding, setIsAdding] = useState(false);

  const handleAddToCart = async () => {
    setIsAdding(true);
    try {
      const success = await addToCart(product.id);
      if (success) {
        if (onAddToCart) {
          onAddToCart(product.id);
        }
      }
    } catch (error) {
      console.error("添加到購物車時發生錯誤：", error);
    } finally {
      setIsAdding(false);
    }
  };
  const isOutOfStock = product.stock !== undefined && product.stock <= 0;
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300 group">
      <div className="relative overflow-hidden">
        <img src={product.image} alt={product.name} className="w-full h-40 object-cover group-hover:scale-105 transition-transform duration-300"/>
      </div>
      <div className="p-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-2">{product.name}</h3>
        {product.stock !== undefined && (
          <p className="text-sm text-gray-500 mb-2">庫存：{product.stock > 0 ? product.stock : "缺貨"}</p>
        )}
        <div className="flex items-center justify-between">
          <span className="text-xl font-bold text-orange-500">NT$ {product.price.toLocaleString()}</span>
          <button onClick={handleAddToCart} disabled={isAdding || isLoading || isOutOfStock} className={`px-4 py-2 rounded-lg transition-colors ${isOutOfStock ? "bg-gray-300 text-gray-500 cursor-not-allowed" : isAdding || isLoading ? "bg-gray-400 text-white cursor-not-allowed" : "bg-orange-500 text-white hover:bg-orange-600"}`}>
            {isOutOfStock ? "缺貨" : isAdding ? "添加中..." : "加入購物車"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProductCard;
