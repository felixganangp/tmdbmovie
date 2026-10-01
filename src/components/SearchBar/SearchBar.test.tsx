import { render, screen, fireEvent } from '@testing-library/react';
// import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import SearchBar from './SearchBar';

const mockSetSearchQuery = vi.fn();

vi.mock('../../context/searchContext/searchContext', () => ({
  useSearch: () => ({
    setSearchQuery: mockSetSearchQuery,
  }),
}));

vi.mock('lucide-react', () => ({
  Search: () => <svg data-testid="search-icon" />,
}));

describe('SearchBar Component', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('renders input with placeholder and search icon correctly', () => {
    render(<SearchBar />);

    const inputElement = screen.getByPlaceholderText(/search movies.../i);

    expect(inputElement).toBeInTheDocument();
    expect(screen.getByTestId('search-icon')).toBeInTheDocument();
  });

  it('updates input value as the user types', async () => {
    // const user = userEvent.setup({ advanceTimers: vi.advanceTimersByTime });
    render(<SearchBar />);

    const inputElement = screen.getByPlaceholderText(/search movies.../i);

    // await user.type(inputElement, 'Inception');
    fireEvent.change(inputElement, { target: { value: 'Inception' } });
    expect(inputElement).toHaveValue('Inception');
  });

  // it('calls setSearchQuery with debounced value after delay', () => {
  //   render(<SearchBar />);
  //   vi.clearAllMocks();
  //   const inputElement = screen.getByPlaceholderText(/search movies.../i);

  //   fireEvent.change(inputElement, { target: { value: 'Batman' } });

  //   expect(mockSetSearchQuery).not.toHaveBeenCalled();

  //   vi.advanceTimersByTime(500);

  //   expect(mockSetSearchQuery).toHaveBeenCalled();
  //   expect(mockSetSearchQuery).toHaveBeenLastCalledWith('Batman');
  // });
});
