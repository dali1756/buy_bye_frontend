import { createContext, useContext, useState, useEffect } from "react";
import type { ReactNode } from "react";
import { useAuth } from "./AuthContext";

export interface CartItem {
  id: number;
  product: {
    id: number;
    name: string;
    price: number;
    category: string;
    stock?: number;
  };
  count: number;
  subtotal: number;
}

export interface Cart {
  id: number;
  items: CartItem[];
  total_items: number;
  total_price: number;
}

interface CartContextType {
  cart: Cart | null;
  isLoading: boolean;
  addToCart: (productId: number, count?: number) => Promise<boolean>;
  updateCartItem: (itemId: number, count: number) => Promise<boolean>;
  removeFromCart: (itemId: number) => Promise<boolean>;
  clearCart: () => Promise<boolean>;
  refreshCart: () => Promise<void>;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

interface CartProviderProps {
  children: ReactNode;
}

export function CartProvider({ children }: CartProviderProps) {
  const [cart, setCart] = useState<Cart | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { isAuthenticated } = useAuth();
  const API_BASE = "/api/carts";
  const getAuthHeaders = () => {
    const token = localStorage.getItem("token");
    return {
      "Content-Type": "application/json",
      "Authorization": token ? `Bearer ${token}` : "",
    };
  };
  const refreshCart = async () => {
    if (!isAuthenticated) {
      setCart(null);
      return;
    }
    try {
      setIsLoading(true);
      const response = await fetch(`${API_BASE}/`, {
        headers: getAuthHeaders(),
      });
      if (response.ok) {
        const data = await response.json();
        setCart(data);
      } else {
        console.error("無法撈取購物車內容。");
        setCart(null);
      }
    } catch (error) {
      console.error("撈取購物車內容出錯：", error);
      setCart(null);
    } finally {
      setIsLoading(false);
    }
  };
  const addToCart = async (productId: number, count: number = 1): Promise<boolean> => {
    if (!isAuthenticated) return false;
    try {
      setIsLoading(true);
      const response = await fetch(`${API_BASE}/add_item/`, {
        method: "POST",
        headers: getAuthHeaders(),
        body: JSON.stringify({
          product_id: productId,
          count: count,
        }),
      });
      if (response.ok) {
        const data = await response.json();
        setCart(data.cart);
        return true;
      } else {
        const errorData = await response.json();
        console.error("無法加入購物車：", errorData.error);
        return false;
      }
    } catch (error) {
      console.error("加入購物車失敗：", error);
      return false;
    } finally {
      setIsLoading(false);
    }
  };
  const updateCartItem = async (itemId: number, count: number): Promise<boolean> => {
    if (!isAuthenticated) return false;
    try {
      setIsLoading(true);
      const response = await fetch(`${API_BASE}/update_item/`, {
        method: "PATCH",
        headers: getAuthHeaders(),
        body: JSON.stringify({
          item_id: itemId,
          count: count,
        }),
      });
      if (response.ok) {
        const data = await response.json();
        setCart(data.cart);
        return true;
      } else {
        const errorData = await response.json();
        console.error("無法更新購物車商品：", errorData.error);
        return false;
      }
    } catch (error) {
      console.error("更新購物車商品錯誤：", error);
      return false;
    } finally {
      setIsLoading(false);
    }
  };
  const removeFromCart = async (itemId: number): Promise<boolean> => {
    if (!isAuthenticated) return false;
    try {
      setIsLoading(true);
      const response = await fetch(`${API_BASE}/remove_item/`, {
        method: "DELETE",
        headers: getAuthHeaders(),
        body: JSON.stringify({
          item_id: itemId,
        }),
      });
      if (response.ok) {
        const data = await response.json();
        setCart(data.cart);
        return true;
      } else {
        const errorData = await response.json();
        console.error("無法移除購物車商品：", errorData.error);
        return false;
      }
    } catch (error) {
      console.error("從購物車移除商品錯誤：", error);
      return false;
    } finally {
      setIsLoading(false);
    }
  };
  const clearCart = async (): Promise<boolean> => {
    if (!isAuthenticated) return false;
    try {
      setIsLoading(true);
      const response = await fetch(`${API_BASE}/clear/`, {
        method: "DELETE",
        headers: getAuthHeaders(),
      });
      if (response.ok) {
        const data = await response.json();
        setCart(data.cart);
        return true;
      } else {
        const errorData = await response.json();
        console.error("清空購物車失敗：", errorData.error);
        return false;
      }
    } catch (error) {
      console.error("清空購物車錯誤：", error);
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  // 不同使用者使用自己的購物車內容
  useEffect(() => {
    if (isAuthenticated) {
      refreshCart();
    } else {
      setCart(null);
    }
  }, [isAuthenticated]);

  const value: CartContextType = {
    cart,
    isLoading,
    addToCart,
    updateCartItem,
    removeFromCart,
    clearCart,
    refreshCart,
  };

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error("useCart 必需在 CartProvider 使用。");
  }
  return context;
}
