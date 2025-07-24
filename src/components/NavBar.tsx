import { useAuth } from "../context/AuthContext";
import { useNavigate, useLocation } from "react-router-dom";
import { Search, User, ShoppingCart, ChevronDown, X } from "lucide-react";
import { useState, useCallback, useRef, useEffect } from "react";
import { RiShirtFill } from "react-icons/ri";
import { FaTshirt } from "react-icons/fa";
import { GiSleevelessJacket, GiLabCoat, GiDress, GiTie } from "react-icons/gi";
import { CiLogout } from "react-icons/ci";
import { PiPantsDuotone } from "react-icons/pi";
import { FaShoppingBag } from "react-icons/fa";
import { PiSneakerFill } from "react-icons/pi";

interface NavBarProps {
  onSearch?: (query: string) => void;
  onCategoryFilter?: (mainCategory: string, subCategory?: string) => void;
}

const NavBar: React.FC<NavBarProps> = ({ onSearch, onCategoryFilter }) => {
  const { user, logout, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [isProductMenuOpen, setIsProductMenuOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<keyof typeof productCategories>("MEN");
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const searchInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isSearchOpen && searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [isSearchOpen]);
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchInputRef.current && !searchInputRef.current.parentElement?.contains(event.target as Node)) {
        if (isSearchOpen && !searchQuery) {
          setIsSearchOpen(false);
        }
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isSearchOpen, searchQuery]);
  const handleLogout = () => {
    logout();
    navigate("/login");
  };
  const handleLogin = () => navigate("/login");
  const handleShop = () => navigate("/shops");
  const debounceSearch = useCallback(
    debounce((query: string) => {
      if (onSearch) {
        onSearch(query);
      }
    }, 500),
    [onSearch]
  );
  const handleSearchInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    setSearchQuery(query);
    debounceSearch(query);
  };
  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (onSearch) {
      onSearch(searchQuery);
    }
  };
  const handleSearchIconClick = () => {
    if (!isSearchOpen) {
      setIsSearchOpen(true);
    } else if (searchQuery) {
      if (onSearch) {
        onSearch(searchQuery);
      }
    }
  };
  const handleCloseSearch = () => {
    setIsSearchOpen(false);
    setSearchQuery("");
    if (onSearch) {
      onSearch("");
    }
  };
  const productCategories = {
    MEN: [
      { name: "襯衫・罩衫", icon: <RiShirtFill />, items: ["西裝襯衫", "休閒襯衫", "罩衫", "Polo衫"] },
      { name: "T恤・剪裁上衣", icon: <FaTshirt />, items: ["基本T恤", "圖案T恤", "長袖上衣", "背心", "毛衣", "針織衫", "帽T", "外套"] },
      { name: "外套", icon: <GiSleevelessJacket />, items: ["夾克", "大衣", "風衣", "羽絨外套", "牛仔外套", "皮夾克", "棒球外套"] },
      { name: "大衣", icon: <GiLabCoat />, items: ["羊毛大衣", "長版大衣"] },
      { name: "西裝・領帶", icon: <GiTie />, items: ["西裝外套", "西裝褲", "領帶"] },
      { name: "包包", icon: <FaShoppingBag />, items: ["手提包", "後背包", "側背包", "錢包"] },
      { name: "鞋子", icon: <PiSneakerFill />, items: ["平底鞋", "靴子", "運動鞋"] },
      { name: "褲子", icon: <PiPantsDuotone />, items: ["牛仔褲", "休閒褲", "西裝褲", "運動褲", "短褲"] },
    ],
    WOMEN: [
      { name: "襯衫・罩衫", icon: <RiShirtFill />, items: ["西裝襯衫", "休閒襯衫", "罩衫", "Polo衫"] },
      { name: "T恤・剪裁上衣", icon: <FaTshirt />, items: ["基本T恤", "圖案T恤", "長袖上衣", "背心", "毛衣", "針織衫", "帽T", "外套"] },
      { name: "外套", icon: <GiSleevelessJacket />, items: ["夾克", "大衣", "風衣", "羽絨外套", "牛仔外套", "皮夾克", "棒球外套"] },
      { name: "大衣", icon: <GiLabCoat />, items: ["羊毛大衣", "長版大衣"] },
      { name: "西裝・領帶", icon: <GiTie />, items: ["西裝外套", "西裝褲", "領帶"] },
      { name: "包包", icon: <FaShoppingBag />, items: ["手提包", "後背包", "側背包", "錢包"] },
      { name: "鞋子", icon: <PiSneakerFill />, items: ["高跟鞋", "平底鞋", "靴子", "運動鞋"] },
      { name: "褲子", icon: <PiPantsDuotone />, items: ["牛仔褲", "休閒褲", "西裝褲", "運動褲", "短褲"] },
      { name: "裙子", icon: <GiDress />, items: ["連身裙", "裙子"] },
    ]
  };
  const mainCategories: Array<keyof typeof productCategories> = ["MEN", "WOMEN"];
  const handleCategoryClick = (category: keyof typeof productCategories, item: (typeof productCategories)[keyof typeof productCategories][number]) => {
    if (location.pathname === "/" && onCategoryFilter) {
      onCategoryFilter(category, item.name);
      setIsProductMenuOpen(false);
      return;
    }
    const gender = category.toLowerCase();
    const type = item.name.replace(/・/g, "-").replace(/\s+/g, "-");
    const categoryPath = `/category/${gender}/${encodeURIComponent(type)}`;
    navigate(categoryPath);
    setIsProductMenuOpen(false);
  };

  return (
    <nav className="bg-white shadow-sm relative">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center py-4">
          <button onClick={() => navigate("/")} className="text-3xl font-bold text-orange-500 hover:text-orange-600">BuyBye</button>
          <div className="hidden md:flex items-center space-x-8">
            <div className="relative group" onMouseEnter={() => setIsProductMenuOpen(true)} onMouseLeave={() => setIsProductMenuOpen(false)}>
              <button className="flex items-center space-x-1 hover:text-orange-500 py-2">
                <span>商品</span>
                <ChevronDown size={16} className={`transform transition-transform duration-200 ${isProductMenuOpen ? "rotate-180" : ""}`} />
              </button>
              <div className={`absolute left-1/2 transform -translate-x-1/2 top-full mt-2 bg-white rounded-lg shadow-xl border z-50 transition-opacity duration-200 ${isProductMenuOpen ? "opacity-100 visible" : "opacity-0 invisible"}`} style={{ width: "1000px" }}>
                <div className="bg-gray-50 px-8 py-4 rounded-t-lg">
                  <div className="flex justify-center space-x-16">
                    {mainCategories.map((category) => (
                      <h3 key={category} onClick={() => setSelectedCategory(category)} className={`text-xl font-bold tracking-wider cursor-pointer ${selectedCategory === category ? "text-orange-500" : "text-gray-700"}`}>{category}</h3>
                    ))}
                  </div>
                </div>
                <div className="p-6">
                  <div className="grid grid-cols-5 gap-4">
                    {productCategories[selectedCategory].map((item, index) => (
                      <button key={index} onClick={() => handleCategoryClick(selectedCategory, item)} className="flex items-center space-x-2 p-2 hover:bg-orange-50 rounded-lg text-left group w-full">
                        <span className="text-lg group-hover:scale-110 transition-transform">{item.icon}</span>
                        <span className="text-sm font-medium text-gray-700">{item.name}</span>
                      </button>
                    ))}
                  </div>
                  <div className="mt-6 pt-4 border-t border-gray-200 text-center">
                    <button onClick={() => {navigate("/products"); setIsProductMenuOpen(false);}} className="text-orange-500 hover:text-orange-600 font-medium">查看所有商品 →</button>
                  </div>
                </div>
              </div>
            </div>
            <button onClick={handleShop} className="hover:text-orange-500 py-2">店舖</button>
            <button onClick={() => navigate("/brands")} className="text-gray-700 hover:text-orange-500 py-2">品牌</button>
          </div>
          <div className="flex items-center space-x-3">
            {/* 搜尋功能 */}
            <div className="relative">
              <div className={`flex items-center transition-all duration-300 ease-in-out ${
                isSearchOpen ? "w-64" : "w-10"
              }`}>
                {isSearchOpen ? (
                  <form onSubmit={handleSearchSubmit} className="w-full">
                    <div className="relative">
                      <input ref={searchInputRef} type="text" value={searchQuery} onChange={handleSearchInput} placeholder="搜尋產品..." className="w-full pl-10 pr-10 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all duration-200"/>
                      <button type="button" onClick={handleSearchIconClick} className="absolute inset-y-0 left-0 pl-3 flex items-center hover:text-orange-500 transition-colors"><Search className="h-5 w-5 text-gray-400" /></button>
                      {searchQuery && (
                        <button type="button" onClick={handleCloseSearch} className="absolute inset-y-0 right-0 pr-3 flex items-center hover:text-orange-500 transition-colors"><X className="h-4 w-4 text-gray-400" /></button>
                      )}
                    </div>
                  </form>
                ) : (
                  <button onClick={handleSearchIconClick} className="p-2 text-gray-600 hover:text-orange-500 rounded-full hover:bg-orange-50 transition-all duration-200"><Search className="h-5 w-5" /></button>
                )}
              </div>
            </div>
            {isAuthenticated ? (
              <>
                <button onClick={() => navigate("/cart")} className="p-2 text-gray-600 hover:text-orange-500 relative rounded-full hover:bg-orange-50">
                  <ShoppingCart size={20} />
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center min-w-[20px]">99</span>
                </button>
                <div className="relative group">
                  <button className="flex items-center space-x-2 p-2 text-gray-600 hover:text-orange-500 rounded-lg hover:bg-orange-50">
                    <User size={20} />
                    <span className="hidden lg:block text-sm max-w-24 truncate">{user?.name || user?.email || "使用者"}</span>
                    <ChevronDown size={12} className="transform group-hover:rotate-180 transition-transform hidden lg:block" />
                  </button>
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border py-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                    <button onClick={() => navigate("/profile")} className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"><User size={16} className="mr-3" />個人資料</button>
                    <button onClick={() => navigate("/orders")} className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"><ShoppingCart size={16} className="mr-3" />訂單記錄</button>
                    <button onClick={() => navigate("/favorites")} className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-50">收藏清單</button>
                    <hr className="my-2" />
                    <button onClick={handleLogout} className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"><span className="mr-3"><CiLogout /></span>登出</button>
                  </div>
                </div>
              </>
            ) : (
              <button onClick={handleLogin} className="flex items-center space-x-2 bg-orange-500 text-white px-4 py-2 rounded-lg hover:bg-orange-600 font-medium">
                <User size={16} />
                <span>登入</span>
              </button>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};
function debounce(func: Function, wait: number) {
  let timeout: ReturnType<typeof setTimeout>;
  return function executedFunction(...args: any[]) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

export default NavBar;
