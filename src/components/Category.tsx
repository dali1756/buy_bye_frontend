interface CategoryProps {
  categories: string[];
  activeCategory: string;
  onCategoryChange: (category: string) => void;
}

function Category({ categories, activeCategory, onCategoryChange }: CategoryProps) {
  return (
    <div className="bg-white border-b">
      <div className="container mx-auto px-4">
        <div className="flex justify-center">
          {categories.map((category) => (
            <button key={category} onClick={() => onCategoryChange(category)} className={`px-8 py-4 text-lg font-medium transition-all duration-300 ${activeCategory === category ? "text-orange-500 border-b-2 border-orange-500 bg-gray-50" : "text-gray-600 hover:text-orange-500 hover:bg-gray-50"}`}>{category}</button>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Category;
