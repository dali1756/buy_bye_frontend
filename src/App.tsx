import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import type { ReactNode } from "react";
import { useAuth } from "./context/AuthContext";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ContactUs from "./pages/ContactUs";
import ReturnAndRefunds from "./pages/ReturnAndRefunds"
import ShoppingInfos from "./pages/ShoppingInfo";
import ProductCares from "./pages/ProductCare";
import SizeInfos from "./pages/Size";
import Shops from "./pages/Shop";
import CategoryPage from "./pages/CategoryPage";

interface RouteProps {
  children: ReactNode;
}

function ProtectedRoute({ children }: RouteProps) {
  const { isAuthenticated, isLoading } = useAuth();
  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-orange-500"></div>
      </div>
    );
  }
  return isAuthenticated ? <>{children}</> : <Navigate to="/login" replace />;
}

function PublicRoute({ children }: RouteProps) {
  const { isAuthenticated, isLoading } = useAuth();
  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-orange-500"></div>
      </div>
    );
  }
  return !isAuthenticated ? <>{children}</> : <Navigate to="/" replace />;
}

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          } 
        />
        
        <Route path="/login" element={
            <PublicRoute>
              <Login />
            </PublicRoute>
          } 
        />
        
        <Route path="/register" element={
            <PublicRoute>
              <Register />
            </PublicRoute>
          } 
        />

        <Route path="/contacts" element={<ContactUs />} />

        <Route path="/returns" element={<ReturnAndRefunds />} />

        <Route path="/shoppings" element={<ShoppingInfos />} />

        <Route path="/cares" element={<ProductCares />} />

        <Route path="/sizes" element={<SizeInfos />} />

        <Route path="/shops" element={<Shops />} />

        <Route path="/category/:gender/:type" element={<CategoryPage />} />
        <Route path="/category/:type" element={<CategoryPage />} />

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}

export default App;
