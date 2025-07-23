import type { SortOption } from "../types/Product";

interface Sort {
  sortOption: SortOption;
  onSortChange: (option: SortOption) => void;
}

function SortDown({ sortOption, onSortChange }: Sort) {
  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    onSortChange(e.target.value as SortOption);
  };

  return (
    <div className="bg-white border-b">
      <div className="container mx-auto px-4 py-3">
        <div className="flex justify-end items-center">
          <label className="text-sm text-gray-600 mr-2">排序方式：</label>
          <select value={sortOption} onChange={handleChange} className="border border-gray-300 rounded px-3 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500">
            <option value="default">預設排序</option>
            <option value="price-asc">價格：低到高</option>
            <option value="price-desc">價格：高到低</option>
          </select>
        </div>
      </div>
    </div>
  );
}

export default SortDown;
