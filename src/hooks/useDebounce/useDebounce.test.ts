import { renderHook, waitFor } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { useDebounce } from './useDebounce';

describe('useDebounce Hook', () => {
  it('should return initial value immediately', () => {
    const { result } = renderHook(() => useDebounce('initial', 500));
    expect(result.current).toBe('initial');
  });

  it('should update value after specified delay', async () => {
    const { result, rerender } = renderHook(
      ({ value, delay }) => useDebounce(value, delay),
      { initialProps: { value: 'initial', delay: 200 } },
    );

    rerender({ value: 'updated', delay: 200 });

    expect(result.current).toBe('initial');

    await waitFor(
      () => {
        expect(result.current).toBe('updated');
      },
      { timeout: 400 },
    );
  });
});
