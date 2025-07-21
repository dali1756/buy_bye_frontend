import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { Search, User, ShoppingCart } from "lucide-react";

function NavBar() {
  const { user, logout, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const handleLogout = () => {
    logout();
    navigate("/login");
  };
  const handleLogin = () => {
    navigate("/login");
  };
  const handleShop = () => {
    navigate("/shops");
  };

  return (
    <nav className="bg-white shadow-sm">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center py-4">
          <a href="http://localhost:5173/" className="text-3xl font-bold text-orange-500">BuyBye</a>
          <div className="hidden md:flex items-center space-x-8">
            <a href="http://localhost:5173/" className="hover:text-orange-500 transition-colors">商品</a>
            <button onClick={handleShop} className="hover:text-orange-500 transition-colors">店舖</button>
            <a href="#" className="text-gray-700 hover:text-orange-500 transition-colors">品牌</a>
          </div>
          <div className="flex items-center space-x-4">
            <button className="p-2 text-gray-600 hover:text-orange-500 transition-colors"><Search size={20} /></button>
            {isAuthenticated ? (
              <>
                <button className="p-2 text-gray-600 hover:text-orange-500 transition-colors">
                  <ShoppingCart size={20} />
                </button>
                <div className="relative group">
                  <button className="flex items-center space-x-2 p-2 text-gray-600 hover:text-orange-500 transition-colors">
                    <User size={20} />
                    <span className="hidden md:block text-sm">{user?.name || user?.email}</span>
                  </button>
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border py-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                    <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50">個人資料</a>
                    <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50">訂單記錄</a>
                    <hr className="my-1" />
                    <button onClick={handleLogout} className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50">登出</button>
                  </div>
                </div>
              </>
            ) : (
              <button onClick={handleLogin} className="flex items-center space-x-2 bg-orange-500 text-white px-4 py-2 rounded-lg hover:bg-orange-600 transition-colors">
                <User size={16} />
                <span>登入</span>
              </button>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}

export default NavBar;
