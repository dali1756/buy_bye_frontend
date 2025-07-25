import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";
import { User, Lock, Save, Eye, EyeOff } from "lucide-react";

interface ProfileData {
  id: number;
  email: string;
  name: string;
  username: string;
  gender: string;
  created_at: string;
  updated_at: string;
}

interface ProfileFormData {
  name: string;
  username: string;
  gender: string;
}

interface PasswordFormData {
  current_password: string;
  new_password: string;
  confirm_password: string;
}

function ProfilePage() {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();  
  const [activeTab, setActiveTab] = useState<"profile" | "password">("profile");
  const [profileData, setProfileData] = useState<ProfileData | null>(null);
  const [profileForm, setProfileForm] = useState<ProfileFormData>({
    name: "",
    username: "",
    gender: ""
  });
  const [passwordForm, setPasswordForm] = useState<PasswordFormData>({
    current_password: "",
    new_password: "",
    confirm_password: ""
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [showPasswords, setShowPasswords] = useState({
    current: false,
    new: false,
    confirm: false
  });
  const PROFILE_URL = "http://localhost:8000/api/members";

  // 檢查登入狀態
  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login");
    }
  }, [isAuthenticated, navigate]);

  // 載入個人資料
  useEffect(() => {
    if (isAuthenticated) {
      fetchProfile();
    }
  }, [isAuthenticated]);

  const getAuthHeaders = () => {
    const token = localStorage.getItem("access_token");
    return {
      "Content-Type": "application/json",
      "Authorization": token ? `Bearer ${token}` : ""
    };
  };
  const fetchProfile = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${PROFILE_URL}/profile/`, {
        headers: getAuthHeaders()
      });
      if (!response.ok) {
        throw new Error("載入個人資料失敗。");
      }
      const data: ProfileData = await response.json();
      setProfileData(data);
      setProfileForm({
        name: data.name || "",
        username: data.username || "",
        gender: data.gender || ""
      });
    } catch (error) {
      setError(error instanceof Error ? error.message : "載入失敗。");
    } finally {
      setLoading(false);
    }
  };
  const handleProfileSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setError(null);
    setSuccess(null);
    try {
      const response = await fetch(`${PROFILE_URL}/profile/update/`, {
        method: "PATCH",
        headers: getAuthHeaders(),
        body: JSON.stringify(profileForm)
      });
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.detail || "更新失敗。");
      }
      setSuccess("個人資料更新成功。");
      // 重新載入資料
      await fetchProfile();
    } catch (error) {
      setError(error instanceof Error ? error.message : "更新失敗。");
    } finally {
      setSaving(false);
    }
  };
  const handlePasswordSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setError(null);
    setSuccess(null);
    try {
      const response = await fetch(`${PROFILE_URL}/profile/change-password/`, {
        method: "POST",
        headers: getAuthHeaders(),
        body: JSON.stringify(passwordForm)
      });
      if (!response.ok) {
        const errorData = await response.json();
        const errorMessage = typeof errorData === "object" ? Object.values(errorData).flat().join(", ") : "密碼修改失敗。";
        throw new Error(errorMessage);
      }
      setSuccess("密碼修改成功。");
      setPasswordForm({
        current_password: "",
        new_password: "",
        confirm_password: ""
      });
    } catch (error) {
      setError(error instanceof Error ? error.message : "密碼修改失敗。");
    } finally {
      setSaving(false);
    }
  };
  const togglePasswordVisibility = (field: keyof typeof showPasswords) => {
    setShowPasswords(prev => ({
      ...prev,
      [field]: !prev[field]
    }));
  };
  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <NavBar />
        <div className="container mx-auto px-4 py-8">
          <div className="flex justify-center items-center py-16">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500"></div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <NavBar />
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-800 mb-2">個人資料</h1>
          </div>
          <div className="bg-white rounded-lg shadow-sm border">
            <div className="border-b border-gray-200">
              <nav className="flex space-x-8 px-6">
                <button onClick={() => setActiveTab("profile")} className={`py-4 px-1 border-b-2 font-medium text-sm ${activeTab === "profile" ? "border-orange-500 text-orange-600" : "border-transparent text-gray-500 hover:text-gray-700"}`}><User className="inline-block w-4 h-4 mr-2" />基本資料</button>
                <button onClick={() => setActiveTab("password")} className={`py-4 px-1 border-b-2 font-medium text-sm ${activeTab === "password" ? "border-orange-500 text-orange-600" : "border-transparent text-gray-500 hover:text-gray-700"}`}><Lock className="inline-block w-4 h-4 mr-2" />修改密碼</button>
              </nav>
            </div>
            <div className="p-6">
              {error && (<div className="mb-4 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">{error}</div>)}
              {success && (<div className="mb-4 bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded">{success}</div>)}
              {activeTab === "profile" && (
                <form onSubmit={handleProfileSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">電子郵件</label>
                      <input type="email" value={profileData?.email || ""} className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-50 text-gray-500" disabled />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">用戶名</label>
                      <input type="text" value={profileForm.username} onChange={(e) => setProfileForm({ ...profileForm, username: e.target.value })} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500" required/>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">姓名</label>
                      <input type="text" value={profileForm.name} onChange={(e) => setProfileForm({ ...profileForm, name: e.target.value })} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500" required/>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">性別</label>
                      <select value={profileForm.gender} onChange={(e) => setProfileForm({ ...profileForm, gender: e.target.value })} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500">
                        <option value="">請選擇</option>
                        <option value="M">男性</option>
                        <option value="F">女性</option>
                      </select>
                    </div>
                  </div>
                  <div className="flex justify-end">
                    <button type="submit" disabled={saving} className="bg-orange-500 text-white px-6 py-2 rounded-lg hover:bg-orange-600 disabled:opacity-50 flex items-center">
                      <Save className="w-4 h-4 mr-2" />
                      {saving ? "儲存中" : "儲存變更"}
                    </button>
                  </div>
                </form>
              )}
              {/* 修改密碼 */}
              {activeTab === "password" && (
                <form onSubmit={handlePasswordSubmit} className="space-y-6">
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">目前密碼</label>
                      <div className="relative">
                        <input type={showPasswords.current ? "text" : "password"} value={passwordForm.current_password} onChange={(e) => setPasswordForm({ ...passwordForm, current_password: e.target.value })} className="w-full px-3 py-2 pr-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500" required/>
                        <button type="button" onClick={() => togglePasswordVisibility("current")} className="absolute inset-y-0 right-0 pr-3 flex items-center">
                          {showPasswords.current ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                        </button>
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">新密碼</label>
                      <div className="relative">
                        <input type={showPasswords.new ? "text" : "password"} value={passwordForm.new_password} onChange={(e) => setPasswordForm({ ...passwordForm, new_password: e.target.value })} className="w-full px-3 py-2 pr-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500" required/>
                        <button type="button" onClick={() => togglePasswordVisibility("new")} className="absolute inset-y-0 right-0 pr-3 flex items-center">
                          {showPasswords.new ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                        </button>
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">確認新密碼</label>
                      <div className="relative">
                        <input type={showPasswords.confirm ? "text" : "password"} value={passwordForm.confirm_password} onChange={(e) => setPasswordForm({ ...passwordForm, confirm_password: e.target.value })} className="w-full px-3 py-2 pr-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500" required/>
                        <button type="button" onClick={() => togglePasswordVisibility("confirm")} className="absolute inset-y-0 right-0 pr-3 flex items-center">
                          {showPasswords.confirm ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                        </button>
                      </div>
                    </div>
                  </div>
                  <div className="flex justify-end">
                    <button type="submit" disabled={saving} className="bg-orange-500 text-white px-6 py-2 rounded-lg hover:bg-orange-600 disabled:opacity-50 flex items-center">
                      <Lock className="w-4 h-4 mr-2" />
                      {saving ? "修改中" : "修改密碼"}
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
          {/* 帳號資訊 */}
          {profileData && (
            <div className="mt-8 bg-white rounded-lg shadow-sm border p-6">
              <h3 className="text-lg font-medium text-gray-800 mb-4">帳號資訊</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="text-gray-500">建立時間：</span>
                  <span className="ml-2">{new Date(profileData.created_at).toLocaleDateString("zh-TW")}</span>
                </div>
                <div>
                  <span className="text-gray-500">最後更新時間：</span>
                  <span className="ml-2">{new Date(profileData.updated_at).toLocaleDateString("zh-TW")}</span>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default ProfilePage;
