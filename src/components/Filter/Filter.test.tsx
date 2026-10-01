import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import Filter from './Filter';

const mockClearSearch = vi.fn();
const mockSetSelectedCategory = vi.fn();

const mockCategories = [
  {
    key: 'popular',
    label: 'Popular',
    icon: () => <svg data-testid="icon-popular" />,
  },
  {
    key: 'top_rated',
    label: 'Top Rated',
    icon: () => <svg data-testid="icon-top-rated" />,
  },
];

vi.mock('../../context/searchContext/searchContext', () => ({
  useSearch: () => ({
    clearSearch: mockClearSearch,
  }),
}));

vi.mock('../../context/categoryContext/categoryContext', () => ({
  useCategory: () => ({
    categories: mockCategories,
    selectedCategory: 'popular',
    setSelectedCategory: mockSetSelectedCategory,
  }),
}));

describe('Filter Component', () => {
  it('renders all category buttons and labels correctly', () => {
    render(<Filter />);
    expect(
      screen.getByRole('button', { name: /popular/i }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: /top rated/i }),
    ).toBeInTheDocument();

    expect(screen.getByTestId('icon-popular')).toBeInTheDocument();
    expect(screen.getByTestId('icon-top-rated')).toBeInTheDocument();
  });

  it('calls clearSearch and setSelectedCategory when a category button is clicked', () => {
    render(<Filter />);

    const topRatedButton = screen.getByRole('button', { name: /top rated/i });
    fireEvent.click(topRatedButton);

    expect(mockClearSearch).toHaveBeenCalledTimes(1);
    expect(mockSetSelectedCategory).toHaveBeenCalledTimes(1);
    expect(mockSetSelectedCategory).toHaveBeenCalledWith('top_rated');
  });

  it('applies active styling classes to the currently selected category', () => {
    render(<Filter />);

    const popularButton = screen.getByRole('button', { name: /popular/i });
    const topRatedButton = screen.getByRole('button', { name: /top rated/i });

    expect(popularButton.className).toContain('from-rose-600');
    expect(topRatedButton.className).toContain('bg-gray-800');
  });
});
