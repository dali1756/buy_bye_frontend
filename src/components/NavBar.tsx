import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

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

  return (
    <nav className="flex justify-between items-center p-4 bg-gray-100 border-b border-gray-200">
      <div className="flex items-center">
        <h1 className="text-xl font-bold text-gray-800">BuyBye</h1>
      </div>
      <div className="flex items-center gap-4">
        {isAuthenticated ? (
          <>
            <div className="flex items-center gap-2">
              <span className="text-gray-800 font-medium">
                {user?.name || user?.email}
              </span>
            </div>
            <button onClick={handleLogout} className="bg-orange-500 text-white px-4 py-2 rounded-lg hover:bg-orange-600 transition-colors font-medium">登出</button>
          </>
        ) : (
          <button onClick={handleLogin} className="bg-orange-500 text-white px-4 py-2 rounded-lg hover:bg-orange-600 transition-colors font-medium">登入</button>
        )}
      </div>
    </nav>
  );
}

export default NavBar;