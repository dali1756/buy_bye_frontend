import React, { useState, useEffect } from "react";
import { Plus, Edit, Trash2, Search, Filter, X, Save, Package } from "lucide-react";

interface MainCategory {
  id: number;
  name: string;
}
interface SubCategory {
  id: number;
  name: string;
  main_category: MainCategory;
}
interface Brand {
  id: number;
  name: string;
  country: string;
  is_active: boolean;
}
interface Product {
  id: number;
  name: string;
  price: string;
  stock: number;
  description: string;
  main_category: MainCategory | null;
  sub_category: SubCategory | null;
  brand: Brand | null;
  created_at: string;
  updated_at: string;
}
interface ProductFormData {
  name: string;
  price: string;
  stock: number;
  description: string;
  main_category: number | null;
  sub_category: number | null;
  brand: number | null;
}

const productService = {
  getProducts: async (params: Record<string, any> = {}) => {
    const queryString = new URLSearchParams(params).toString();
    const response = await fetch(`http://localhost:8000/api/products/?${queryString}`);
    if (!response.ok) throw new Error("無法取得產品資訊。");
    return response.json();
  },
  getMainCategories: async () => {
    const response = await fetch("http://localhost:8000/api/products/main-categories/");
    if (!response.ok) throw new Error("無法取得主分類資訊。");
    return response.json();
  },
  getSubCategories: async () => {
    const response = await fetch("http://localhost:8000/api/products/sub-categories/");
    if (!response.ok) throw new Error("無法取得子分類資訊。");
    return response.json();
  },
  getBrands: async () => {
    const response = await fetch("http://localhost:8000/api/products/brands/");
    if (!response.ok) throw new Error("無法取得品牌資訊。");
    return response.json();
  },
  createProduct: async (productData: ProductFormData) => {
    const response = await fetch("http://localhost:8000/api/products/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(productData),
    });
    if (!response.ok) {
      const errorData = await response.text();
      console.error("新增產品失敗：", errorData);
      throw new Error("新增產品失敗。");
    }
    return response.json();
  },
  updateProduct: async (id: number, productData: Partial<ProductFormData>) => {
    const response = await fetch(`http://localhost:8000/api/products/${id}/`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(productData),
    });
    if (!response.ok) {
      const errorData = await response.text();
      console.error("更新產品失敗：", errorData);
      throw new Error("更新產品失敗。");
    }
    return response.json();
  },
  deleteProduct: async (id: number) => {
    const response = await fetch(`http://localhost:8000/api/products/${id}/`, {
      method: "DELETE",
    });
    if (!response.ok) throw new Error("刪除產品失敗。");
  }
};

function ProductController() {
  const [products, setProducts] = useState<Product[]>([]);
  const [mainCategories, setMainCategories] = useState<MainCategory[]>([]);
  const [subCategories, setSubCategories] = useState<SubCategory[]>([]);
  const [brands, setBrands] = useState<Brand[]>([]);
  const [filteredSubCategories, setFilteredSubCategories] = useState<SubCategory[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [searchInput, setSearchInput] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [filterCategory, setFilterCategory] = useState("");
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState<ProductFormData>({
    name: "",
    price: "",
    stock: 0,
    description: "",
    main_category: null,
    sub_category: null,
    brand: null
  });
  const loadProducts = async () => {
    setLoading(true);
    try {
      const params: Record<string, any> = {};
      if (searchQuery) params.search = searchQuery;
      if (filterCategory) params.category_name = filterCategory;
      const data = await productService.getProducts(params);
      setProducts(Array.isArray(data) ? data : (data.results || []));
    } catch (error) {
      console.error("載入產品失敗：", error);
      alert("載入產品失敗，請稍後再試。");
    } finally {
      setLoading(false);
    }
  };
  const loadCategories = async () => {
    try {
      const [mainCatData, subCatData, brandData] = await Promise.all([
        productService.getMainCategories(),
        productService.getSubCategories(),
        productService.getBrands()
      ]);
      setMainCategories(Array.isArray(mainCatData) ? mainCatData : (mainCatData.results || []));
      setSubCategories(Array.isArray(subCatData) ? subCatData : (subCatData.results || []));
      setBrands(Array.isArray(brandData) ? brandData : (brandData.results || []));
    } catch (error) {
      console.error("載入分類資料失敗：", error);
    }
  };
  useEffect(() => {
    loadProducts();
    loadCategories();
  }, [searchQuery, filterCategory]);
  useEffect(() => {
    if (formData.main_category) {
      const filtered = subCategories.filter(sub => sub.main_category.id === formData.main_category);
      setFilteredSubCategories(filtered);
      setFormData(prev => ({ ...prev, sub_category: null }));
    } else {
      setFilteredSubCategories([]);
    }
  }, [formData.main_category, subCategories]);
  // 搜尋
  const handleSearch = () => {
    setSearchQuery(searchInput.trim());
  };
  const handleSearchKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };
  const handleClearSearch = () => {
    setSearchInput("");
    setSearchQuery("");
  };
  // 新增
  const handleCreateProduct = () => {
    setEditingProduct(null);
    setFormData({
      name: "",
      price: "",
      stock: 0,
      description: "",
      main_category: null,
      sub_category: null,
      brand: null
    });
    setShowModal(true);
  };
  // 編輯
  const handleEdit = (product: Product) => {
    setEditingProduct(product);
    setFormData({
      name: product.name,
      price: product.price,
      stock: product.stock,
      description: product.description,
      main_category: product.main_category?.id || null,
      sub_category: product.sub_category?.id || null,
      brand: product.brand?.id || null
    });
    setShowModal(true);
  };
  // 儲存
  const handleSaveProduct = async () => {
    setLoading(true);
    try {
      if (editingProduct) {
        await productService.updateProduct(editingProduct.id, formData);
      } else {
        await productService.createProduct(formData);
      }
      setShowModal(false);
      setEditingProduct(null);
      loadProducts();
      alert(editingProduct ? "產品更新成功。" : "產品新增成功。");
    } catch (error) {
      console.error("儲存產品失敗：", error);
      alert("儲存產品失敗，請稍後再試。");
    } finally {
      setLoading(false);
    }
  };
  // 刪除
  const handleDelete = async (product: Product) => {
    if (!confirm(`確定要刪除產品「${product.name}」嗎？此操作無法復原。`)) {
      return;
    }
    try {
      await productService.deleteProduct(product.id);
      loadProducts();
      alert("產品刪除成功。");
    } catch (error) {
      console.error("刪除產品失敗：", error);
      alert("刪除產品失敗，請稍後再試。");
    }
  };
  const resetForm = () => {
    setFormData({
      name: "",
      price: "",
      stock: 0,
      description: "",
      main_category: null,
      sub_category: null,
      brand: null
    });
    setEditingProduct(null);
    setShowModal(false);
  };
  const filteredProducts = products.filter(product => {
    const matchesSearch = searchQuery === "" || product.name.toLowerCase().includes(searchQuery.toLowerCase()) || product.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = !filterCategory || product.main_category?.name === filterCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">產品管理後台</h1>
        </div>
        <button onClick={handleCreateProduct} className="bg-orange-600 hover:bg-orange-700 text-white px-4 py-2 rounded-lg flex items-center"><Plus className="w-5 h-5 mr-2" />新增產品</button>
      </div>
      {/* 搜尋 and 篩選 */}
      <div className="bg-white rounded-lg p-6 mb-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
          <div className="flex items-center space-x-2 flex-1 max-w-md">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input type="text" placeholder="搜尋產品名稱或描述" value={searchInput} onChange={(e) => setSearchInput(e.target.value)} onKeyPress={handleSearchKeyPress} className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500" />
            </div>
            <button onClick={handleSearch} className="px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 flex items-center"><Search className="w-4 h-4 mr-1" />搜尋</button>
            {searchQuery && (
              <button onClick={handleClearSearch} className="px-3 py-2 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50">清除</button>
            )}
          </div>
          <div className="flex items-center space-x-4">
            <div className="relative">
              <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
              <select value={filterCategory} onChange={(e) => setFilterCategory(e.target.value)} className="pl-10 pr-8 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 appearance-none bg-white min-w-48">
                <option value="">所有分類</option>
                {mainCategories.map(category => (
                  <option key={category.id} value={category.name}>{category.name}</option>
                ))}
              </select>
            </div>
            <div className="text-sm text-gray-600">共 {filteredProducts.length} 個產品{searchQuery && (<span className="ml-2 text-orange-600">(搜尋："{searchQuery}")</span>)}</div>
          </div>
        </div>
      </div>
      {/* 產品列表 */}
      {loading ? (
        <div className="flex justify-center items-center h-64">
          <div className="text-lg text-gray-600">載入中...</div>
        </div>
      ) : filteredProducts.length === 0 ? (
        <div className="text-center py-12">
          <Package className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">沒有找到產品</h3>
          {searchQuery && (
            <p className="text-gray-600">搜尋「{searchQuery}」沒有結果</p>
          )}
        </div>
      ) : (
        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">產品名稱</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">價格</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">庫存</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">分類</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">品牌</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">建立時間</th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">操作</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredProducts.map((product) => (
                  <tr key={product.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div>
                        <div className="text-sm font-medium text-gray-900">{product.name}</div>
                        <div className="text-sm text-gray-500 truncate max-w-xs">{product.description}</div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">NT$ {product.price}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${product.stock > 10 ? "bg-green-100 text-green-800" : product.stock > 0 ? "bg-yellow-100 text-yellow-800" : "bg-red-100 text-red-800"}`}>{product.stock}</span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      <div>
                        <div>{product.main_category?.name || "-"}</div>
                        {product.sub_category && (
                          <div className="text-xs text-gray-500">{product.sub_category.name}</div>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{product.brand?.name || "-"}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{new Date(product.created_at).toLocaleDateString("zh-TW")}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <button onClick={() => handleEdit(product)} className="p-2 text-orange-600 hover:bg-orange-50 rounded-lg mr-2" title="編輯產品"><Edit size={16} /></button>
                      <button onClick={() => handleDelete(product)} className="p-2 text-red-600 hover:bg-red-50 rounded-lg" title="刪除產品"><Trash2 size={16} /></button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* 新增 or 編輯產品 */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center p-6 border-b">
              <h2 className="text-xl font-semibold">{editingProduct ? "編輯產品" : "新增產品"}</h2>
              <button onClick={resetForm} className="text-gray-400 hover:text-gray-600"><X size={24} /></button>
            </div>
            <div className="p-6">
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">產品名稱 *</label>
                  <input type="text" value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500" placeholder="請輸入產品名稱" required />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">價格 *</label>
                    <input type="number" step="0.01" value={formData.price} onChange={(e) => setFormData({...formData, price: e.target.value})} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500" placeholder="0.00" required />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">庫存數量 *</label>
                    <input type="number" min="0" value={formData.stock} onChange={(e) => setFormData({...formData, stock: parseInt(e.target.value) || 0})} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500" placeholder="0" required />
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">主分類</label>
                    <select value={formData.main_category || ""} onChange={(e) => setFormData({...formData, main_category: e.target.value ? parseInt(e.target.value) : null})} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500">
                      <option value="">請選擇主分類</option>
                      {mainCategories.map(category => (
                        <option key={category.id} value={category.id}>{category.name}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">子分類</label>
                    <select value={formData.sub_category || ""} onChange={(e) => setFormData({...formData, sub_category: e.target.value ? parseInt(e.target.value) : null})} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500" disabled={!formData.main_category}>
                      <option value="">請選擇子分類</option>
                      {filteredSubCategories.map(category => (
                        <option key={category.id} value={category.id}>{category.name}</option>
                      ))}
                    </select>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">品牌</label>
                  <select value={formData.brand || ""} onChange={(e) => setFormData({...formData, brand: e.target.value ? parseInt(e.target.value) : null})} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500">
                    <option value="">請選擇品牌</option>
                    {brands.map(brand => (
                      <option key={brand.id} value={brand.id}>{brand.name}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">產品描述</label>
                  <textarea rows={4} value={formData.description} onChange={(e) => setFormData({...formData, description: e.target.value})} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500" placeholder="請輸入產品描述" />
                </div>
                <div className="flex justify-end space-x-4 pt-6 border-t">
                  <button type="button" onClick={resetForm} className="px-4 py-2 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50">取消</button>
                  <button type="button" onClick={handleSaveProduct} disabled={loading} className="px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 disabled:opacity-50 flex items-center">
                    <Save className="w-4 h-4 mr-2" />
                    {loading ? "儲存中..." : (editingProduct ? "更新" : "新增")}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default ProductController;
