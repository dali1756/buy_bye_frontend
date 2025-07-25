import { useState } from "react";
import type { FormEvent, ChangeEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import GoogleLogin from "./GoogleLogin";

function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const { login } = useAuth();
  const navigate = useNavigate();
  const handleLogin = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      await login(email, password);
      navigate("/");
    } catch (error) {
      console.error("登入失敗：", error);
      const errorMessage = error instanceof Error ? error.message : "登入失敗，請稍後再試。";
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };
  const handleInputChange = (setter: (value: string) => void) => 
    (e: ChangeEvent<HTMLInputElement>) => setter(e.target.value);

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div className="bg-white p-8 rounded-2xl shadow-md">
          <h1 className="text-2xl font-bold text-center mb-6 text-gray-700">登入系統</h1>
          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <label htmlFor="email" className="block text-gray-700 text-sm font-medium mb-2">電子郵件：</label>
              <input type="email" id="email" value={email} onChange={handleInputChange(setEmail)} className="w-full px-3 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500" placeholder="請輸入您的電子郵件" required />
            </div>
            <div>
              <label htmlFor="password" className="block text-gray-700 text-sm font-medium mb-2">密碼：</label>
              <input type="password" id="password" value={password} onChange={handleInputChange(setPassword)} className="w-full px-3 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500" placeholder="請輸入您的密碼" required />
            </div>
            {error && (<div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">{error}</div>)}
            <div className="pt-2">
              <button type="submit" disabled={loading} className="w-full bg-orange-500 hover:bg-orange-600 text-white font-medium py-3 px-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-opacity-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors">
                {loading ? "登入中..." : "登入"}
              </button>
            </div>
          </form>
          {/* 一般登入和 google 登入中間分隔線 */}
          <div className="relative my-8">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-200"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-4 bg-white text-gray-500 font-medium">或</span>
            </div>
          </div>
          {/* Google 登入 */}
          <div className="mt-6">
            <GoogleLogin 
              onSuccess={() => {
                navigate("/");
              }}
              onError={(error) => {
                console.error("Google 登入錯誤：", error);
                setError(error);
              }}
            />
          </div>
          <div className="mt-8 text-center">
            <p className="text-gray-600 text-sm">
              還沒有帳號？{" "}
              <Link to="/register" className="text-orange-500 hover:text-orange-600 font-medium transition-colors">註冊</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginForm;
