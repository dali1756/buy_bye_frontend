import { useParams } from "react-router-dom";
import NavBar from "../components/NavBar";
import { useState, useEffect } from "react";
import Footer from "../components/Footer";
import type { Product } from "../types/Product";

interface ApiProduct {
  id: number;
  name: string;
  price: string;
  stock: number;
  description: string;
  category: {
    id: number;
    name: string;
  } | null;
  created_at: string;
  updated_at: string;
}

function CategoryPage() {
  const { gender, type } = useParams();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const displayGender = gender?.toUpperCase();
  const displayType = type ? decodeURIComponent(type).replace(/-/g, "・") : "";
  const Products_URL = "http://localhost:8000/api/products";
  const buildQueryParams = () => {
    const params = new URLSearchParams();
    if (searchQuery) {
      params.append("search", searchQuery);
    }
    if (gender && gender !== "ALL") {
      params.append("category_name", gender.toUpperCase());
    }
    if (displayType) {
      params.append("sub_category_name", displayType);
    }
    return params.toString();
  };
  const fetchProducts = async () => {
    try {
      setLoading(true);
      setError(null);
      const queryParams = buildQueryParams();
      const url = queryParams ? `${Products_URL}/?${queryParams}` : `${Products_URL}/`;
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data: ApiProduct[] = await response.json();
      const transformedProducts: Product[] = data.map((apiProduct) => ({
        id: apiProduct.id,
        name: apiProduct.name,
        price: parseFloat(apiProduct.price),
        image: `https://picsum.photos/200/300?random=${apiProduct.id}`,
        category: apiProduct.category?.name || "UNCATEGORIZED"
      }));
      setProducts(transformedProducts);
    } catch (error) {
      setError("載入產品資料失敗，請稍後再試。");
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    if (gender && type) {
      fetchProducts();
    }
  }, [gender, type, searchQuery]);
  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };
  // 加入購物車
  const handleAddToCart = (productId: number) => {
    alert(`產品 ${productId} 已加入購物車。`);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <NavBar onSearch={handleSearch} />
        <div className="container mx-auto px-4 py-8">
          <div className="flex justify-center items-center py-16">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500"></div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <NavBar onSearch={handleSearch} />
      <div className="container mx-auto px-4 py-8">
        <nav className="text-sm breadcrumbs mb-6">
          <ol className="flex space-x-2 text-gray-600">
            <li><a href="/" className="hover:text-orange-500">首頁</a></li>
            <li className="before:content-['>'] before:mx-2">{displayGender}</li>
            <li className="before:content-['>'] before:mx-2 text-orange-500">{displayType}</li>
          </ol>
        </nav>
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">{displayGender} - {displayType}</h1>
        </div>
        {error && (
          <div className="bg-red-50 border-l-4 border-red-500 text-red-700 p-4 mb-6">
            <p className="font-bold">載入失敗</p>
            <p>{error}</p>
            <button onClick={() => fetchProducts()} className="mt-2 text-red-600 hover:text-red-800 underline">重試</button>
          </div>
        )}
        <div className="mb-6 flex justify-between items-center">
          <p className="text-gray-600">找到 {products.length} 個商品</p>
          {searchQuery && (
            <div className="text-sm text-gray-500">
              搜尋："{searchQuery}"
              <button onClick={() => setSearchQuery("")} className="ml-2 text-orange-500 hover:text-orange-600">清除</button>
            </div>
          )}
        </div>
        {products.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {products.map((product) => (
              <div key={product.id} className="bg-white rounded-lg shadow-sm border hover:shadow-md transition-shadow">
                <div className="aspect-square bg-gray-200 rounded-t-lg overflow-hidden">
                  <img src={product.image} alt={product.name} className="w-full h-full object-cover hover:scale-105 transition-transform duration-300" onError={(e) => {e.currentTarget.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="200" height="300" viewBox="0 0 200 300"%3E%3Crect width="200" height="300" fill="%23f3f4f6"/%3E%3Ctext x="50%25" y="50%25" dominant-baseline="middle" text-anchor="middle" fill="%236b7280"%3E商品圖片%3C/text%3E%3C/svg%3E';}}/>
                </div>
                <div className="p-4">
                  <h3 className="font-medium text-gray-800 mb-2 line-clamp-2">{product.name}</h3>
                  <p className="text-orange-500 font-semibold mb-3">NT$ {product.price.toLocaleString()}</p>
                  <button onClick={() => handleAddToCart(product.id)} className="w-full bg-orange-500 text-white py-2 rounded-lg hover:bg-orange-600 transition-colors">加入購物車</button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <h3 className="text-xl font-medium text-gray-600 mb-2">{error ? "載入失敗" : "暫無商品"}</h3>
            <p className="text-gray-500 mb-4">{error ? "無法載入商品資料，請檢查網路連線或稍後再試" : "此分類目前沒有可用的商品"}</p>
            {error && (
              <button onClick={() => fetchProducts()} className="bg-orange-500 text-white px-6 py-2 rounded-lg hover:bg-orange-600 transition-colors">重新載入</button>
            )}
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
}

export default CategoryPage;
