import { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import NavBar from "../components/NavBar";
import Category from "../components/Category";
import SortDown from "../components/Sort";
import ProductGrid from "../components/ProductGrid";
import Footer from "../components/Footer";
import type { Product, SortOption } from "../types/Product";

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

interface ApiCategory {
  id: number;
  name: string;
}

function Home() {
  const { } = useAuth();
  const [activeCategory, setActiveCategory] = useState("MEN");
  const [activeSubCategory, setActiveSubCategory] = useState("");
  const [sortOption, setSortOption] = useState<SortOption>("default");
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const Products_URL = "http://localhost:8000/api/products";
  const buildQueryParams = () => {
    const params = new URLSearchParams();
    if (searchQuery) {
      params.append("search", searchQuery);
    }
    if (activeCategory && activeCategory !== "ALL") {
      params.append("category_name", activeCategory);
    }
    if (activeSubCategory) {
      params.append("sub_category_name", activeSubCategory);
    }
    if (sortOption && sortOption !== "default") {
      let ordering = "";
      switch (sortOption) {
        case "price-asc":
          ordering = "price";
          break;
        case "price-desc":  
          ordering = "-price";
          break;
        default:
          ordering = sortOption;
      }
      params.append("ordering", ordering);
    }
    return params.toString();
  };
  const fetchCategories = async () => {
    try {
      const response = await fetch(`${Products_URL}/categories/`);
      if (!response.ok) {
        if (response.status === 404) {
          console.warn("分類 API 路徑錯誤，目前使用預設分類。");
          const productsResponse = await fetch(`${Products_URL}/`);
          if (productsResponse.ok) {
            const products: ApiProduct[] = await productsResponse.json();
            const uniqueCategories = [...new Set(
              products.map((p) => p.category?.name).filter((name): name is string => name !== undefined && name !== null)
            )];
            setCategories(uniqueCategories.length > 0 ? uniqueCategories : ["MEN", "WOMEN"]);
            return;
          }
        }
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data: ApiCategory[] = await response.json();
      setCategories(data.map((cat) => cat.name));
    } catch (error) {
      console.error("撈取分類資料失敗：", error);
      setError("撈取分類資料失敗，目前使用預設分類。");
      setCategories(["MEN", "WOMEN"]);
    }
  };
  // 撈取產品資料
  const fetchProducts = async () => {
    try {
      setLoading(true);
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
      setError(null);
    } catch (error) {
      console.error("撈取產品資料失敗：", error);
      setError("撈取產品資料失敗。");
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchCategories();
  }, []);
  useEffect(() => {
    fetchProducts();
  }, [searchQuery, activeCategory, activeSubCategory, sortOption]);
  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };
  const handleCategoryFilter = (mainCategory: string, subCategory?: string) => {
    setActiveCategory(mainCategory);
    setActiveSubCategory(subCategory || "");
  };
  const handleCategoryChange = (category: string) => {
    setActiveCategory(category);
  };
  const handleSortChange = (option: SortOption) => {
    setSortOption(option);
  };
  // 加入購物車
  const handleAddToCart = (productId: number) => {
    alert(`產品 ${productId} 已加入購物車。`);
  };
  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <NavBar onSearch={handleSearch} />
        <div className="flex justify-center items-center h-64">
          <div className="text-xl text-gray-600">載入中...</div>
        </div>
        <Footer />
      </div>
    );
  }
  if (error && products.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50">
        <NavBar onSearch={handleSearch} />
        <div className="flex justify-center items-center h-64">
          <div className="text-xl text-red-600">{error}</div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <NavBar onSearch={handleSearch} onCategoryFilter={handleCategoryFilter} />
      {error && (
        <div className="bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700 p-4 mb-4">
          <p className="font-bold">警告</p>
          <p>{error}</p>
        </div>
      )}
      {activeSubCategory && (
        <div className="bg-blue-50 border-l-4 border-blue-500 text-blue-700 p-4 mb-4">
          <p>目前篩選：{activeCategory} &gt; {activeSubCategory}</p>
          <button onClick={() => setActiveSubCategory("")} className="text-blue-600 hover:text-blue-800 underline ml-2">清除篩選</button>
        </div>
      )}
      <Category categories={categories} activeCategory={activeCategory} onCategoryChange={handleCategoryChange}/>
      <SortDown sortOption={sortOption} onSortChange={handleSortChange}/>
      <ProductGrid products={products} onAddToCart={handleAddToCart}/>
      <Footer />
    </div>
  );
}

export default Home;
