import { useState, useEffect } from "react";
import { Plus, Edit, Trash2, Search, Eye, EyeOff, Save, X, MapPin, Package } from "lucide-react";

interface Brand {
  id: number;
  name: string;
  description: string;
  country: string;
  is_active: boolean;
  sort_order: number;
  created_at: string;
  updated_at: string;
}
interface BrandFormData {
  name: string;
  description: string;
  country: string;
  is_active: boolean;
  sort_order: number;
}
interface BrandFormProps {
  brand: Brand | null;
  onSave: (formData: BrandFormData) => void;
  onCancel: () => void;
  isLoading: boolean;
}
interface BrandCardProps {
  brand: Brand;
  onEdit: (brand: Brand) => void;
  onDelete: (brand: Brand) => void;
  onToggleStatus: (brand: Brand) => void;
}

const brandService = {
  getBrands: async (params: Record<string, any> = {}) => {
    const queryString = new URLSearchParams(params).toString();
    const response = await fetch(`http://localhost:8000/api/products/brands/?${queryString}`);
    if (!response.ok) throw new Error("無法取得品牌資訊。");
    return response.json();
  },
  createBrand: async (brandData: BrandFormData) => {
    const formData = new FormData();
    Object.keys(brandData).forEach(key => {
      const value = brandData[key as keyof BrandFormData];
      if (value !== null && value !== undefined) {
        formData.append(key, value as string | Blob);
      }
    });
    const response = await fetch("http://localhost:8000/api/products/brands/", {
      method: "POST",
      body: formData,
    });
    if (!response.ok) throw new Error("新增品牌失敗。");
    return response.json();
  },
  updateBrand: async (id: number, brandData: Partial<BrandFormData>) => {
    const response = await fetch(`http://localhost:8000/api/products/brands/${id}/`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(brandData),
    });
    if (!response.ok) {
      const errorData = await response.text();
      console.error("更新品牌失敗：", errorData);
      throw new Error("更新品牌失敗。");
    }
    return response.json();
  },
  deleteBrand: async (id: number) => {
    const response = await fetch(`http://localhost:8000/api/products/brands/${id}/`, {
      method: "DELETE",
    });
    if (!response.ok) throw new Error("刪除品牌失敗。");
  }
};
const BrandForm = ({ brand, onSave, onCancel, isLoading }: BrandFormProps) => {
  const [formData, setFormData] = useState<BrandFormData>({
    name: "",
    description: "",
    country: "",
    is_active: true,
    sort_order: 0,
  });
  useEffect(() => {
    if (brand) {
      setFormData({
        name: brand.name || "",
        description: brand.description || "",
        country: brand.country || "",
        is_active: brand.is_active !== undefined ? brand.is_active : true,
        sort_order: brand.sort_order || 0,
      });
    }
  }, [brand]);
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    const checked = (e.target as HTMLInputElement).checked;
    setFormData(prev => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value
    }));
  };
  const handleSubmit = () => {
    onSave(formData);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">{brand ? "編輯品牌" : "新增品牌"}</h2>
          <button onClick={onCancel} className="text-gray-500 hover:text-gray-700"><X className="w-6 h-6" /></button>
        </div>
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">品牌名稱 *</label>
            <input type="text" name="name" value={formData.name} onChange={handleInputChange} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500" placeholder="請輸入品牌名稱" required />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">品牌描述</label>
            <textarea name="description" value={formData.description} onChange={handleInputChange} rows={4} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500" placeholder="請輸入品牌描述" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">品牌國家</label>
              <input type="text" name="country" value={formData.country} onChange={handleInputChange} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500" placeholder="例：台灣、日本、美國" />
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">排序順序</label>
              <input type="number" name="sort_order" value={formData.sort_order} onChange={handleInputChange} min="0" className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500" />
            </div>
            <div className="flex items-center space-x-2 pt-6">
              <input type="checkbox" name="is_active" id="is_active" checked={formData.is_active} onChange={handleInputChange} className="rounded" />
              <label htmlFor="is_active" className="text-sm font-medium text-gray-700">啟用品牌</label>
            </div>
          </div>
          <div className="flex justify-end space-x-4 pt-6">
            <button type="button" onClick={onCancel} className="px-4 py-2 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50">取消</button>
            <button type="button" onClick={handleSubmit} disabled={isLoading} className="px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 disabled:opacity-50 flex items-center">
              <Save className="w-4 h-4 mr-2" />
              {isLoading ? "儲存中" : "儲存"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const BrandCard = ({ brand, onEdit, onDelete, onToggleStatus }: BrandCardProps) => {
  return (
    <div className="bg-white border rounded-lg p-6 hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div>
            <h3 className="font-semibold text-lg">{brand.name}</h3>
            <div className="flex items-center space-x-4 text-sm text-gray-600">
              {brand.country && (
                <div className="flex items-center">
                  <MapPin className="w-4 h-4 mr-1" />
                  {brand.country}
                </div>
              )}
            </div>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <button onClick={() => onToggleStatus(brand)} className={`p-2 rounded-lg ${brand.is_active ? "text-green-600 hover:bg-green-50" : "text-gray-400 hover:bg-gray-50"}`} title={brand.is_active ? "點擊停用" : "點擊啟用"}>
            {brand.is_active ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
          </button>
          <button onClick={() => onEdit(brand)} className="p-2 text-orange-600 hover:bg-orange-50 rounded-lg">
            <Edit className="w-4 h-4" />
          </button>
          <button onClick={() => onDelete(brand)} className="p-2 text-red-600 hover:bg-red-50 rounded-lg">
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </div>
      {brand.description && (<p className="text-gray-600 text-sm mb-3 line-clamp-2">{brand.description}</p>)}
      <div className="flex justify-between items-center text-sm text-gray-500">
        <span>排序：{brand.sort_order}</span>
        <span className={`px-2 py-1 rounded-full text-xs ${brand.is_active ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-800"}`}>
          {brand.is_active ? "已啟用" : "已停用"}
        </span>
      </div>
    </div>
  );
};

const BrandController = () => {
  const [brands, setBrands] = useState<Brand[]>([]);
  const [loading, setLoading] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [editingBrand, setEditingBrand] = useState<Brand | null>(null);
  const [searchInput, setSearchInput] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const loadBrands = async (searchTerm: string = searchQuery) => {
    setLoading(true);
    try {
      const params: Record<string, any> = {
        show_inactive: "true",
        ...(searchTerm && { search: searchTerm }),
        ...(filterStatus !== "all" && { is_active: filterStatus === "active" })
      };
      const data = await brandService.getBrands(params);
      setBrands(data.results || data);
    } catch (error) {
      console.error("載入品牌失敗：", error);
      alert("載入品牌失敗，請稍後再試。");
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    loadBrands();
  }, [searchQuery, filterStatus]);
  const handleSearch = () => {
    setSearchQuery(searchInput.trim());
  };
  // 搜尋時需要點擊 Enter 才會觸發
  const handleSearchKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };
  // 清除搜尋
  const handleClearSearch = () => {
    setSearchInput("");
    setSearchQuery("");
  };
  // 新增品牌
  const handleCreateBrand = () => {
    setEditingBrand(null);
    setShowForm(true);
  };
  // 編輯品牌
  const handleEditBrand = (brand: Brand) => {
    setEditingBrand(brand);
    setShowForm(true);
  };
  // 儲存品牌
  const handleSaveBrand = async (formData: BrandFormData) => {
    setLoading(true);
    try {
      if (editingBrand) {
        await brandService.updateBrand(editingBrand.id, formData);
      } else {
        await brandService.createBrand(formData);
      }
      setShowForm(false);
      setEditingBrand(null);
      loadBrands();
      alert(editingBrand ? "品牌更新成功。" : "品牌新增成功。");
    } catch (error) {
      console.error("儲存品牌失敗：", error);
      alert("儲存品牌失敗，請稍後再試。");
    } finally {
      setLoading(false);
    }
  };
  // 刪除品牌
  const handleDeleteBrand = async (brand: Brand) => {
    if (!confirm(`確定要刪除品牌「${brand.name}」嗎？此操作無法復原。`)) {
      return;
    }
    try {
      await brandService.deleteBrand(brand.id);
      loadBrands();
      alert("品牌刪除成功。");
    } catch (error) {
      console.error("刪除品牌失敗：", error);
      alert("刪除品牌失敗，請稍後再試。");
    }
  };
  // 品牌啟用/停用
  const handleToggleStatus = async (brand: Brand) => {
    try {
      await brandService.updateBrand(brand.id, {
        is_active: !brand.is_active
      });
      loadBrands();
    } catch (error) {
      console.error("更新品牌狀態失敗：", error);
      alert("更新品牌狀態失敗，請稍後再試。");
    }
  };
  const filteredBrands = brands.filter(brand => {
    const matchesStatus = filterStatus === "all" || (filterStatus === "active" && brand.is_active) || (filterStatus === "inactive" && !brand.is_active);
    return matchesStatus;
  });

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">品牌管理後台</h1>
        </div>
        <button onClick={handleCreateBrand} className="bg-orange-500 text-white px-4 py-2 rounded-lg hover:bg-orange-600 flex items-center">
          <Plus className="w-5 h-5 mr-2" />
          新增品牌
        </button>
      </div>
      {/* 搜尋 */}
      <div className="bg-white rounded-lg p-6 mb-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
          <div className="flex items-center space-x-2 flex-1 max-w-md">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input type="text" placeholder="搜尋品牌名稱或國家" value={searchInput} onChange={(e) => setSearchInput(e.target.value)} onKeyPress={handleSearchKeyPress} className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500" />
            </div>
            <button onClick={handleSearch} className="px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 flex items-center">
              <Search className="w-4 h-4 mr-1" />
              搜尋
            </button>
            {searchQuery && (
              <button onClick={handleClearSearch} className="px-3 py-2 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50">清除</button>
            )}
          </div>
          <div className="flex items-center space-x-4">
            <select value={filterStatus} onChange={(e) => setFilterStatus(e.target.value)} className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500">
              <option value="all">所有狀態</option>
              <option value="active">已啟用</option>
              <option value="inactive">已停用</option>
            </select>
            <div className="text-sm text-gray-600">
              共 {filteredBrands.length} 個品牌
              {searchQuery && (<span className="ml-2 text-orange-600">(搜尋："{searchQuery}")</span>)}
            </div>
          </div>
        </div>
      </div>
      {/* 品牌列表 */}
      {loading ? (
        <div className="flex justify-center items-center h-64">
          <div className="text-lg text-gray-600">載入中</div>
        </div>
      ) : filteredBrands.length === 0 ? (
        <div className="text-center py-12">
          <Package className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">沒有找到品牌</h3>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredBrands.map(brand => (
            <BrandCard key={brand.id} brand={brand} onEdit={handleEditBrand} onDelete={handleDeleteBrand} onToggleStatus={handleToggleStatus} />
          ))}
        </div>
      )}
      {/* 品牌表單 */}
      {showForm && (
        <BrandForm brand={editingBrand} onSave={handleSaveBrand} 
          onCancel={() => {
            setShowForm(false); 
            setEditingBrand(null);
          }}
          isLoading={loading}
        />
      )}
    </div>
  );
};

export default BrandController;
