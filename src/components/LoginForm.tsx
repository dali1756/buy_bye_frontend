import { useState } from "react";
import type { FormEvent, ChangeEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import GoogleLogin from "./GoogleLogin";

function LoginForm() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useAuth();
  const navigate = useNavigate();
  const handleLogin = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const res = await fetch("http://localhost:8000/api/members/login/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: username,
          password,
        }),
        credentials: "include",
      });
      const data = await res.json();
      if (res.ok) {
        login(data.user);
        navigate("/");
      } else {
        alert(data.error || "登入失敗。");
      }
    } catch (error) {
      alert("發生錯誤，請稍後再試。");
      console.error(error);
    }
  };
  const handleInputChange = (setter: (value: string) => void) => (e: ChangeEvent<HTMLInputElement>) => setter(e.target.value);

  return (
    <div className="max-w-md mx-auto bg-white p-8 rounded-2xl shadow-md">
      <h1 className="text-2xl font-bold text-center mb-6 text-gray-700">登入系統</h1>
      <form onSubmit={handleLogin}>
        <div className="mb-4">
          <label htmlFor="username" className="block text-gray-700 text-xl font-bold mb-4">電子郵件：</label>
          <input type="email" id="username" required value={username} onChange={handleInputChange(setUsername)} className="w-full px-3 py-2 border border-gray-300 rounded-2xl focus:outline-none focus:ring-2 focus:ring-orange-500" />
        </div>

        <div className="mb-6">
          <label htmlFor="password" className="block text-gray-700 text-xl font-bold mb-4">密碼：</label>
          <input type="password" id="password" required value={password} onChange={handleInputChange(setPassword)} className="w-full px-3 py-2 border border-gray-300 rounded-2xl focus:outline-none focus:ring-2 focus:ring-orange-500" />
        </div>

        <div className="flex items-center justify-between">
          <button type="submit" className="w-full bg-orange-500 hover:bg-orange-600 text-white font-bold py-2 px-4 rounded-2xl focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-opacity-50">登入</button>
        </div>
      </form>
      <GoogleLogin />
      <div className="mt-6 text-center">
        <p className="text-gray-600">
          還沒有帳號？{" "}
          <Link to="/register" className="text-orange-500 hover:text-orange-600">註冊</Link>
        </p>
      </div>
    </div>
  );
}

export default LoginForm;
