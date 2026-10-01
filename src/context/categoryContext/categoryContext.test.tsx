import { renderHook, act } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { CategoryProvider, useCategory } from './categoryContext';

describe('CategoryContext', () => {
  it('throws an error if useCategory is used outside of CategoryProvider', () => {
    const consoleErrorSpy = vi
      .spyOn(console, 'error')
      .mockImplementation(() => {});

    expect(() => {
      renderHook(() => useCategory());
    }).toThrow('useCategory must be used within a CategoryProvider');

    consoleErrorSpy.mockRestore();
  });

  it('provides default selectedCategory as "popular" and returns all categories', () => {
    const { result } = renderHook(() => useCategory(), {
      wrapper: CategoryProvider,
    });

    expect(result.current.selectedCategory).toBe('popular');

    expect(result.current.categories).toHaveLength(4);
    expect(result.current.categories[0].key).toBe('popular');
    expect(result.current.categories[1].key).toBe('now_playing');
    expect(result.current.categories[2].key).toBe('top_rated');
    expect(result.current.categories[3].key).toBe('upcoming');
  });

  it('updates selectedCategory correctly when setSelectedCategory is called', () => {
    const { result } = renderHook(() => useCategory(), {
      wrapper: CategoryProvider,
    });

    expect(result.current.selectedCategory).toBe('popular');

    act(() => {
      result.current.setSelectedCategory('top_rated');
    });

    expect(result.current.selectedCategory).toBe('top_rated');
  });
});
