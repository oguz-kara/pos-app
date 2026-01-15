"use client";

type Category = {
  id: string;
  name: string;
};

interface CategoryFilterProps {
  categories: Category[];
  selectedCategory: string | null;
  onCategoryChange: (categoryId: string | null) => void;
}

export function CategoryFilter({
  categories,
  selectedCategory,
  onCategoryChange,
}: CategoryFilterProps) {
  return (
    <div className="border-b bg-background px-6 py-4">
      <div className="flex gap-2 overflow-x-auto scrollbar-hide">
        {/* All Products Pill */}
        <button
          onClick={() => onCategoryChange(null)}
          className={`flex-shrink-0 px-4 py-2 rounded-full text-sm font-medium transition-all ${
            selectedCategory === null
              ? "bg-gray-900 text-white"
              : "border border-gray-200 text-gray-700 hover:bg-gray-50 bg-white"
          }`}
        >
          Tümü
        </button>

        {/* Category Pills */}
        {categories.map((category) => (
          <button
            key={category.id}
            onClick={() => onCategoryChange(category.id)}
            className={`flex-shrink-0 px-4 py-2 rounded-full text-sm font-medium transition-all ${
              selectedCategory === category.id
                ? "bg-gray-900 text-white"
                : "border border-gray-200 text-gray-700 hover:bg-gray-50 bg-white"
            }`}
          >
            {category.name}
          </button>
        ))}
      </div>
    </div>
  );
}
