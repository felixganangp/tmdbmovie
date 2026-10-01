import React, { createContext, useContext, useState } from 'react';
import type { Category, Categories } from '../types/movie';
import { TrendingUp, Calendar, Play, Award } from 'lucide-react';

interface CategoryContextType {
  categories: Categories[];
  selectedCategory: Category;
  setSelectedCategory: (cat: Category) => void;
}

const categories: Categories[] = [
  { key: 'popular', label: 'Popular', icon: TrendingUp },
  { key: 'now_playing', label: 'Now Playing', icon: Play },
  { key: 'top_rated', label: 'Top Rated', icon: Award },
  { key: 'upcoming', label: 'Upcoming', icon: Calendar },
];

const CategoryContext = createContext<CategoryContextType | undefined>(
  undefined,
);

export const CategoryProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<Category>('popular');

  return (
    <CategoryContext.Provider
      value={{ categories, selectedCategory, setSelectedCategory }}>
      {children}
    </CategoryContext.Provider>
  );
};

export const useCategory = () => {
  const context = useContext(CategoryContext);
  if (!context) {
    throw new Error('useCategory must be used within a SearchProvider');
  }
  return context;
};
