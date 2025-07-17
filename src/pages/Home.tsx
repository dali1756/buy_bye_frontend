import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import NavBar from "../components/NavBar";
import Category from "../components/Category";
import SortDown from "../components/Sort";
import ProductGrid from "../components/ProductGrid";
import Footer from "../components/Footer";
import type { Product, SortOption } from "../types/Product";
import { sortProducts, filterProductsByCategory } from "../utils/productUtils";

function Home() {
  const { user } = useAuth();
  const [activeCategory, setActiveCategory] = useState("MEN");
  const [sortOption, setSortOption] = useState<SortOption>("default");

  const categories = ["MEN", "WOMEN"];
  
  // 假資料
  const products: Product[] = [
    {
      id: 1,
      name: "襯衫",
      price: 2890,
      image: "https://picsum.photos/200/300",
      category: "MEN"
    },
    {
      id: 2,
      name: "毛衣",
      price: 3490,
      image: "https://picsum.photos/200/300",
      category: "MEN"
    },
    {
      id: 3,
      name: "西裝外套",
      price: 5890,
      image: "https://picsum.photos/200/300",
      category: "MEN"
    },
    {
      id: 4,
      name: "西裝褲",
      price: 4290,
      image: "https://picsum.photos/200/300",
      category: "MEN"
    },
    {
      id: 5,
      name: "上衣",
      price: 2690,
      image: "https://picsum.photos/200/300",
      category: "MEN"
    },
    {
      id: 6,
      name: "西裝外套",
      price: 6290,
      image: "https://picsum.photos/200/300",
      category: "WOMEN"
    },
    {
      id: 7,
      name: "西裝褲",
      price: 1290,
      image: "https://picsum.photos/200/300",
      category: "WOMEN"
    },
    {
      id: 8,
      name: "長裙",
      price: 7290,
      image: "https://picsum.photos/200/300",
      category: "WOMEN"
    },
    {
      id: 9,
      name: "連身裙",
      price: 8290,
      image: "https://picsum.photos/200/300",
      category: "WOMEN"
    },
    {
      id: 10,
      name: "草帽",
      price: 9290,
      image: "https://picsum.photos/200/300",
      category: "WOMEN"
    },
    {
      id: 11,
      name: "短褲",
      price: 500,
      image: "https://picsum.photos/200/300",
      category: "MEN"
    },
  ];

  const handleCategoryChange = (category: string) => {
    setActiveCategory(category);
  };
  
  const handleSortChange = (option: SortOption) => {
    setSortOption(option);
  };
  
  // 加入購物車
  const handleAddToCart = (productId: number) => {
    
  };
  
  const filteredProducts = filterProductsByCategory(products, activeCategory);
  const sortedProducts = sortProducts(filteredProducts, sortOption);

  return (
    <div className="min-h-screen bg-gray-50">
      <NavBar />
      <Category categories={categories} activeCategory={activeCategory} onCategoryChange={handleCategoryChange}/>
      <SortDown sortOption={sortOption} onSortChange={handleSortChange}/>
      <ProductGrid products={sortedProducts} onAddToCart={handleAddToCart}/>
      <Footer />
    </div>
  );
}

export default Home;
