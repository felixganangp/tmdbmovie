import { useSearch } from '../../context/searchContext';
import { useCategory } from '../../context/categoryContext';
import type { Category } from '../../types/movie';

const Filter = () => {
  const { clearSearch } = useSearch();
  const { categories, selectedCategory, setSelectedCategory } = useCategory();

  const onSelectCategory = (category: Category) => {
    clearSearch();
    setSelectedCategory(category);
  };

  return (
    <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 pb-4 border-b border-slate-800/80">
      <div className="flex items-center gap-2 overflow-x-auto w-full md:w-auto pb-2 md:pb-0 scrollbar-none">
        {categories.map(cat => {
          const Icon = cat.icon;
          return (
            <button
              key={cat.key}
              onClick={() => onSelectCategory(cat.key)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold whitespace-nowrap transition-all cursor-pointer ${
                selectedCategory === cat.key
                  ? 'bg-linear-to-r from-rose-600 to-pink-600 shadow-lg shadow-rose-600/25'
                  : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
              }`}>
              <Icon className="w-4 h-4" />
              {cat.label}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default Filter;
