import { useCart } from "../context/CartContext";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Minus, Plus, Trash2, ShoppingBag } from "lucide-react";
import NavBar from "../components/NavBar";

function CartPage() {
  const { cart, updateCartItem, removeFromCart, clearCart, isLoading } = useCart();
  const [updatingItems, setUpdatingItems] = useState<Set<number>>(new Set());
  const navigate = useNavigate();
  const handleCountChange = async (itemId: number, newCount: number) => {
    setUpdatingItems(prev => new Set(prev).add(itemId));
    try {
      await updateCartItem(itemId, newCount);
    } finally {
      setUpdatingItems(prev => {
        const next = new Set(prev);
        next.delete(itemId);
        return next;
      });
    }
  };
  const handleRemoveItem = async (itemId: number) => {
    setUpdatingItems(prev => new Set(prev).add(itemId));
    try {
      await removeFromCart(itemId);
    } finally {
      setUpdatingItems(prev => {
        const next = new Set(prev);
        next.delete(itemId);
        return next;
      });
    }
  };
  const handleClearCart = async () => {
    if (window.confirm("確定要清空購物車嗎？")) {
      await clearCart();
    }
  };
  const getProductImage = (productId: number) => {
    const imageId = (productId % 20) + 1;
    return `https://picsum.photos/400/300?random=${imageId}`;
  };
  const handleContinueShopping = () => {
    navigate("/");
  };
  const handleCheckout = () => {

  };
  if (isLoading) {
    return (
      <div>
        <NavBar />
        <div className="min-h-screen bg-gray-50 flex justify-center items-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-orange-500"></div>
        </div>
      </div>
    );
  }

  return (
    <div>
      <NavBar />
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="container mx-auto px-4">
          <div className="bg-white rounded-lg shadow-sm">
            <div className="p-6 border-b border-gray-200">
              <div className="flex justify-between items-center">
                <h1 className="text-2xl font-bold text-gray-900">購物車</h1>
                {cart && cart.items.length > 0 && (
                  <button onClick={handleClearCart} className="text-red-600 hover:text-red-800 text-sm font-medium">清空購物車</button>
                )}
              </div>
            </div>
            {!cart || cart.items.length === 0 ? (
              <div className="p-12 text-center">
                <ShoppingBag className="mx-auto h-16 w-16 text-gray-400 mb-4" />
                <h2 className="text-xl font-semibold text-gray-900 mb-2">購物車是空的</h2>
                <p className="text-gray-600 mb-6">尚無任何商品</p>
                <button onClick={handleContinueShopping} className="bg-orange-500 text-white px-6 py-3 rounded-lg hover:bg-orange-600 transition-colors">繼續購物</button>
              </div>
            ) : (
              <div className="p-6">
                <div className="space-y-4 mb-6">
                  {cart.items.map((item) => (
                    <div key={item.id} className="flex items-center space-x-4 bg-gray-50 p-4 rounded-lg">
                      <img src={getProductImage(item.product.id)} alt={item.product.name} className="w-16 h-16 object-cover rounded-md" />
                      <div className="flex-1">
                        <h3 className="text-lg font-semibold text-gray-900">{item.product.name}</h3>
                        <p className="text-gray-600">NT$ {item.product.price.toLocaleString()}</p>
                      </div>
                      <div className="flex items-center space-x-2">
                        <button onClick={() => handleCountChange(item.id, item.count - 1)} disabled={updatingItems.has(item.id) || item.count <= 1} className="p-1 rounded-md border border-gray-300 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed">
                          <Minus className="h-4 w-4" />
                        </button>
                        <span className="w-12 text-center font-medium">{item.count}</span>
                        <button onClick={() => handleCountChange(item.id, item.count + 1)} disabled={updatingItems.has(item.id) || (item.product.stock !== undefined && item.count >= item.product.stock)} className="p-1 rounded-md border border-gray-300 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed">
                          <Plus className="h-4 w-4" />
                        </button>
                      </div>
                      <div className="text-right">
                        <p className="text-lg font-semibold text-gray-900">NT$ {item.subtotal.toLocaleString()}</p>
                      </div>
                      <button onClick={() => handleRemoveItem(item.id)} disabled={updatingItems.has(item.id)} className="p-2 text-red-600 hover:text-red-800 hover:bg-red-50 rounded-md disabled:opacity-50 disabled:cursor-not-allowed"><Trash2 className="h-5 w-5" /></button>
                    </div>
                  ))}
                </div>
                <div className="border-t border-gray-200 pt-6">
                  <div className="flex justify-between items-center mb-6">
                    <div className="text-lg">
                      <span className="text-gray-600">總共 </span>
                      <span className="font-semibold">{cart.total_items} 件商品</span>
                    </div>
                    <div className="text-right">
                      <p className="text-2xl font-bold text-gray-900">NT$ {cart.total_price.toLocaleString()}</p>
                    </div>
                  </div>
                  <div className="flex space-x-4">
                    <button onClick={handleContinueShopping} className="flex-1 bg-gray-200 text-gray-900 py-3 px-6 rounded-lg hover:bg-gray-300 transition-colors font-medium">繼續購物</button>
                    <button onClick={handleCheckout} className="flex-1 bg-orange-500 text-white py-3 px-6 rounded-lg hover:bg-orange-600 transition-colors font-medium">結帳</button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default CartPage;
