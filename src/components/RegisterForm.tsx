import { useState } from "react";
import type { FormEvent, ChangeEvent } from "react";
import { Link, useNavigate } from "react-router-dom";

function RegisterForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  const navigate = useNavigate();
  const handleRegister = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const res = await fetch("http://localhost:8000/api/members/register/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          email,
          password,
          passwordConfirmation,
        }),
        credentials: "include",
      });
      const data = await res.json();
      if (res.ok) {
        alert("註冊成功。");
        navigate("/login");
      } else {
        alert(data.error || "註冊失敗。");
      }
    } catch (error) {
      alert("發生錯誤，請稍後再試。");
      console.error(error);
    }
  };
  const handleInputChange = (setter: (value: string) => void) => (e: ChangeEvent<HTMLInputElement>) => setter(e.target.value);

  return (
    <div className="max-w-md mx-auto bg-white p-8 rounded-2xl shadow-md">
      <h1 className="text-2xl font-bold text-center mb-6 text-gray-800">註冊</h1>
      <form onSubmit={handleRegister}>
        <div className="mb-4">
          <label htmlFor="name" className="block text-gray-700 text-xl font-bold mb-2">姓名：</label>
          <input type="text" id="name" required value={name} onChange={handleInputChange(setName)} className="w-full px-3 py-2 border border-gray-300 rounded-2xl focus:outline-none focus:ring-2 focus:ring-orange-500" />
        </div>

        <div className="mb-4">
          <label htmlFor="email" className="block text-gray-700 text-xl font-bold mb-2">電子郵件：</label>
          <input type="email" id="email" required value={email} onChange={handleInputChange(setEmail)} className="w-full px-3 py-2 border border-gray-300 rounded-2xl focus:outline-none focus:ring-2 focus:ring-orange-500" />
        </div>

        <div className="mb-4">
          <label htmlFor="password" className="block text-gray-700 text-xl font-bold mb-2">密碼：</label>
          <input type="password" id="password" required value={password} onChange={handleInputChange(setPassword)} className="w-full px-3 py-2 border border-gray-300 rounded-2xl focus:outline-none focus:ring-2 focus:ring-orange-500" />
        </div>

        <div className="mb-6">
          <label htmlFor="password_confirmation" className="block text-gray-700 text-xl font-bold mb-2">確認密碼：</label>
          <input type="password" id="password_confirmation" required value={passwordConfirmation} onChange={handleInputChange(setPasswordConfirmation)} className="w-full px-3 py-2 border border-gray-300 rounded-2xl focus:outline-none focus:ring-2 focus:ring-orange-500" />
        </div>

        <div className="flex items-center justify-between">
          <button type="submit" className="w-full bg-orange-500 hover:bg-orange-600 text-white font-bold py-2 px-4 rounded-2xl focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-opacity-50">註冊</button>
        </div>
      </form>

      <div className="mt-6 text-center">
        <p className="text-gray-600">
          已有帳號？{" "}
          <Link to="/login" className="text-orange-500 hover:text-orange-600">登入</Link>
        </p>
      </div>
    </div>
  );
}

export default RegisterForm;