import { renderHook, act } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { SearchProvider, useSearch } from './searchContext';

describe('SearchContext', () => {
  it('throws an error if useSearch is used outside of SearchProvider', () => {
    const consoleErrorSpy = vi
      .spyOn(console, 'error')
      .mockImplementation(() => {});

    expect(() => {
      renderHook(() => useSearch());
    }).toThrow('useSearch must be used within a SearchProvider');

    consoleErrorSpy.mockRestore();
  });

  it('provides default searchQuery as an empty string', () => {
    const { result } = renderHook(() => useSearch(), {
      wrapper: SearchProvider,
    });

    expect(result.current.searchQuery).toBe('');
  });

  it('updates searchQuery correctly when setSearchQuery is called', () => {
    const { result } = renderHook(() => useSearch(), {
      wrapper: SearchProvider,
    });

    act(() => {
      result.current.setSearchQuery('Inception');
    });

    expect(result.current.searchQuery).toBe('Inception');
  });

  it('resets searchQuery back to empty string when clearSearch is called', () => {
    const { result } = renderHook(() => useSearch(), {
      wrapper: SearchProvider,
    });

    act(() => {
      result.current.setSearchQuery('Batman');
    });
    expect(result.current.searchQuery).toBe('Batman');

    act(() => {
      result.current.clearSearch();
    });

    expect(result.current.searchQuery).toBe('');
  });
});
