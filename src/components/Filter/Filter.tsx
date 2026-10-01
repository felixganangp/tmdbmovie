import { useSearch } from '../../context/searchContext/searchContext';
import { useCategory } from '../../context/categoryContext/categoryContext';
import type { Category } from '../../types/movie';
import Button from '../Button/Button';

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
            <Button
              key={cat.key}
              label={cat.label}
              icon={<Icon className="w-4 h-4" />}
              active={selectedCategory === cat.key}
              onClick={() => onSelectCategory(cat.key)}
            />
          );
        })}
      </div>
    </div>
  );
};

export default Filter;
