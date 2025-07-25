import { createContext, useContext, useState, useEffect, type ReactNode } from "react";
interface User {
  email: string;
  name: string;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  googleLogin: (token: string) => Promise<void>;
  logout: () => void;
  register: (name: string, email: string, password: string, passwordConfirmation: string) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const isAuthenticated = !!user;
  useEffect(() => {
    const initAuth = () => {
      try {
        const token = localStorage.getItem("access_token");
        const userData = localStorage.getItem("user_data");
        if (token && userData) {
          try {
            const parsedUser = JSON.parse(userData);
            setUser(parsedUser);
          } catch (parseError) {
            console.error("解析用戶資料失敗：", parseError);
            localStorage.removeItem("access_token");
            localStorage.removeItem("refresh_token");
            localStorage.removeItem("user_data");
          }
        } else {

        }
      } catch (error) {
        console.error("初始化認證失敗：", error);
        localStorage.removeItem("access_token");
        localStorage.removeItem("refresh_token");
        localStorage.removeItem("user_data");
      } finally {
        setIsLoading(false);
      }
    };
    initAuth();
  }, []);

  // 一般登入
  const login = async (email: string, password: string) => {
    try {
      const response = await fetch("http://localhost:8000/api/members/login/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });
      if (!response.ok) {
        const errorData = await response.json();
        console.error("登入 API 錯誤：", errorData);
        throw new Error(errorData.error || "登入失敗。");
      }
      const data = await response.json();
      // 儲存認證資料
      if (data.access_token) {
        localStorage.setItem("access_token", data.access_token);
      }
      if (data.refresh_token) {
        localStorage.setItem("refresh_token", data.refresh_token);
      }
      if (data.user) {
        localStorage.setItem("user_data", JSON.stringify(data.user));
        setUser(data.user);
      }
    } catch (error) {
      console.error("登入失敗：", error);
      throw error;
    }
  };
  // Google 登入
  const googleLogin = async (token: string) => {
    try {
      const response = await fetch("http://localhost:8000/api/members/google-login/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ token }),
      });
      if (!response.ok) {
        const errorData = await response.json();
        console.error("Google 登入 API 錯誤：", errorData);
        throw new Error(errorData.error || "Google 登入失敗。");
      }
      const data = await response.json();
      // 儲存認證資料
      if (data.access_token) {
        localStorage.setItem("access_token", data.access_token);
      }
      if (data.refresh_token) {
        localStorage.setItem("refresh_token", data.refresh_token);
      }
      if (data.user) {
        localStorage.setItem("user_data", JSON.stringify(data.user));
        setUser(data.user);
      }
    } catch (error) {
      console.error("Google 登入失敗：", error);
      throw error;
    }
  };
  const logout = () => {
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
    localStorage.removeItem("user_data");
    setUser(null);
  };
  const register = async (name: string, email: string, password: string, passwordConfirmation: string) => {
    try {
      const response = await fetch("http://localhost:8000/api/members/register/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email, password, passwordConfirmation }),
      });
      if (!response.ok) {
        const errorData = await response.json();
        console.error("註冊 API 錯誤：", errorData);
        throw new Error(errorData.error || "註冊失敗。");
      }
    } catch (error) {
      console.error("註冊失敗：", error);
      throw error;
    }
  };
  const value = {
    user,
    isAuthenticated,
    isLoading,
    login,
    googleLogin,
    logout,
    register,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}

export function getAuthHeaders() {
  const token = localStorage.getItem("access_token");
  
  const headers = {
    "Content-Type": "application/json",
    "Authorization": token ? `Bearer ${token}` : "",
  };
  
  return headers;
}
