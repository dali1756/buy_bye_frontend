import { useState } from 'react';
import { ChevronDown, User, Phone, Mail, MessageCircle } from 'lucide-react';
import NavBar from '../components/NavBar';
import Footer from '../components/Footer';

function ContactUs() {
  const [formData, setFormData] = useState({
    category: "",
    orderNumber: "",
    firstName: "",
    lastName: "",
    phone: "",
    email: "",
    confirmEmail: "",
    message: ""
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const categories = [
    { value: "", label: "請選擇" },
    { value: "order", label: "訂單問題" },
    { value: "product", label: "商品問題" },
    { value: "payment", label: "付款問題" },
    { value: "shipping", label: "配送問題" },
    { value: "return", label: "退換貨" },
    { value: "account", label: "帳號問題" },
    { value: "other", label: "其他" }
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    if (!formData.category || !formData.firstName || !formData.lastName || !formData.phone || !formData.email || !formData.message) {
      alert("請填寫所有必填欄位。");
      setIsSubmitting(false);
      return;
    }
    if (formData.email !== formData.confirmEmail) {
      alert("請確認 Email 是否正確。");
      setIsSubmitting(false);
      return;
    }
    try {
      const response = await fetch("/api/contacts/submit/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          category: formData.category,
          order_number: formData.orderNumber,
          first_name: formData.firstName,
          last_name: formData.lastName,
          phone: formData.phone,
          email: formData.email,
          message: formData.message
        })
      });

      const data = await response.json();
      if (data.success) {
        alert(data.message);
        setFormData({
          category: "",
          orderNumber: "",
          firstName: "",
          lastName: "",
          phone: "",
          email: "",
          confirmEmail: "",
          message: ""
        });
      } else {
        alert(data.message || "提交失敗，請重新檢查表單內容是否正確。");
        console.error("表單驗證錯誤：", data.errors);
      }
    } catch (error) {
      console.error("錯誤：", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <NavBar />
      <div className="bg-white shadow-sm">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center space-x-2 text-sm text-gray-600">
            <a href="http://localhost:5173/" className="hover:text-orange-500">首頁</a>
            <span>＞</span>
            <span className="text-orange-500">客戶服務</span>
            <span>＞</span>
            <span className="text-orange-500">聯絡我們</span>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-lg shadow-sm p-6 md:p-8">
            <div className="text-center mb-8">
              <h1 className="text-2xl font-bold text-gray-900 mb-2">聯絡我們</h1>
              <p className="text-gray-600">有任何問題或建議，請填寫以下表單，我們會盡快回覆您，謝謝。</p>
            </div>

            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  類別 
                  <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <select name="category" value={formData.category} onChange={handleInputChange} className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent appearance-none bg-white">
                    {categories.map(cat => (
                      <option key={cat.value} value={cat.value}>{cat.label}</option>
                    ))}
                  </select>
                  <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  訂單編號
                  <span className="text-red-500">*</span>
                </label>
                <input type="text" name="orderNumber" value={formData.orderNumber} onChange={handleInputChange} placeholder="如有相關訂單，請填寫訂單編號" className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent" />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    姓 
                    <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <input type="text" name="firstName" value={formData.firstName} onChange={handleInputChange} className="w-full p-3 pl-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent" />
                    <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    名 
                    <span className="text-red-500">*</span>
                  </label>
                  <input type="text" name="lastName" value={formData.lastName} onChange={handleInputChange} className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent" />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  電話號碼 
                  <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <input type="tel" name="phone" value={formData.phone} onChange={handleInputChange} placeholder="請輸入您的電話號碼" className="w-full p-3 pl-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent" />
                  <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    電子郵件 
                    <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <input type="email" name="email" value={formData.email} onChange={handleInputChange} placeholder="example@email.com" className="w-full p-3 pl-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent" />
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    再次確認電子郵件 
                    <span className="text-red-500">*</span>
                  </label>
                  <input type="email" name="confirmEmail" value={formData.confirmEmail} onChange={handleInputChange} placeholder="再次輸入電子郵件" className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent" />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  內容 
                  <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <textarea name="message" value={formData.message} onChange={handleInputChange} rows={6} placeholder="請詳細描述您的問題或建議..." className="w-full p-3 pl-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent resize-none" />
                  <MessageCircle className="absolute left-3 top-3 text-gray-400" size={20} />
                </div>
              </div>

              <div className="flex justify-center pt-6">
                <button onClick={handleSubmit} disabled={isSubmitting} className="bg-blue-500 hover:bg-blue-600 disabled:bg-gray-400 text-white font-medium py-3 px-8 rounded-lg transition-colors duration-200 flex items-center space-x-2">
                  {isSubmitting ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent"></div>
                      <span>提交中...</span>
                    </>
                  ) : (
                    <span>前往確認畫面</span>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default ContactUs;
