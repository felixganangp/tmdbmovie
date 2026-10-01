import { renderHook } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { useInfiniteScroll } from './useInfiniteScroll';

describe('useInfiniteScroll Hook', () => {
  const mockOnLoadMore = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();

    Object.defineProperty(window, 'innerHeight', {
      value: 500,
      configurable: true,
    });
    Object.defineProperty(window, 'scrollY', {
      value: 0,
      configurable: true,
      writable: true,
    });
    Object.defineProperty(document.documentElement, 'scrollHeight', {
      value: 2000,
      configurable: true,
    });
  });

  it('calls onLoadMore when scrolled near the bottom, not loading, and hasMore is true', () => {
    renderHook(() =>
      useInfiniteScroll({
        loading: false,
        hasMore: true,
        onLoadMore: mockOnLoadMore,
        threshold: 800, // Batas trigger: 2000 - 800 = 1200. (innerHeight 500 + scrollY 800 = 1300 >= 1200)
      }),
    );

    // posisi scroll mendekati bagian bawah halaman
    window.scrollY = 800;
    window.dispatchEvent(new Event('scroll'));

    expect(mockOnLoadMore).toHaveBeenCalledTimes(1);
  });

  it('does not call onLoadMore if loading is true', () => {
    renderHook(() =>
      useInfiniteScroll({
        loading: true,
        hasMore: true,
        onLoadMore: mockOnLoadMore,
        threshold: 800,
      }),
    );

    window.scrollY = 800;
    window.dispatchEvent(new Event('scroll'));

    expect(mockOnLoadMore).not.toHaveBeenCalled();
  });

  it('does not call onLoadMore if hasMore is false', () => {
    renderHook(() =>
      useInfiniteScroll({
        loading: false,
        hasMore: false,
        onLoadMore: mockOnLoadMore,
        threshold: 800,
      }),
    );

    window.scrollY = 800;
    window.dispatchEvent(new Event('scroll'));

    expect(mockOnLoadMore).not.toHaveBeenCalled();
  });

  it('does not call onLoadMore if scroll position is far from the bottom', () => {
    renderHook(() =>
      useInfiniteScroll({
        loading: false,
        hasMore: true,
        onLoadMore: mockOnLoadMore,
        threshold: 800,
      }),
    );

    window.scrollY = 100;
    window.dispatchEvent(new Event('scroll'));

    expect(mockOnLoadMore).not.toHaveBeenCalled();
  });

  it('cleans up scroll event listener on unmount', () => {
    const removeEventListenerSpy = vi.spyOn(window, 'removeEventListener');

    const { unmount } = renderHook(() =>
      useInfiniteScroll({
        loading: false,
        hasMore: true,
        onLoadMore: mockOnLoadMore,
      }),
    );

    // cleanup function useEffect
    unmount();

    expect(removeEventListenerSpy).toHaveBeenCalledWith(
      'scroll',
      expect.any(Function),
    );
    removeEventListenerSpy.mockRestore();
  });
});
