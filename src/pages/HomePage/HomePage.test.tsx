import { render, screen, waitFor } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { MemoryRouter } from 'react-router-dom';
import HomePage from './';
import { tmdbApi } from '../../api/tmdb';

vi.mock('../../api/tmdb', () => ({
  tmdbApi: {
    get: vi.fn(),
  },
}));

vi.mock('../../hooks/useInfiniteScroll', () => ({
  useInfiniteScroll: vi.fn(),
}));

const mockSetSelectedCategory = vi.fn();
const mockClearSearch = vi.fn();

vi.mock('../../context/categoryContext/categoryContext', () => ({
  useCategory: () => ({
    categories: [
      { key: 'popular', label: 'Popular', icon: () => null },
      { key: 'top_rated', label: 'Top Rated', icon: () => null },
    ],
    selectedCategory: 'popular',
    setSelectedCategory: mockSetSelectedCategory,
  }),
}));

const mockSearchQuery = { current: '' };
vi.mock('../../context/searchContext/searchContext', () => ({
  useSearch: () => ({
    searchQuery: mockSearchQuery.current,
    clearSearch: mockClearSearch,
  }),
}));

// vi.mock('../../components/Filter/Filter', () => ({
//   default: () => <div data-testid="filter-component">Filter Mock</div>,
// }));

vi.mock('../../components/MovieList/MovieList', () => ({
  default: ({ movies }: { movies: any[] }) => (
    <div data-testid="movie-list">
      {movies.map(movie => (
        <div key={movie.id} data-testid="movie-item">
          {movie.title}
        </div>
      ))}
    </div>
  ),
}));

vi.mock('../../components/Loader', () => ({
  Loader: () => <div data-testid="loader">Loading...</div>,
}));

const mockMoviesData = {
  results: [
    { id: 1, title: 'Inception', vote_average: 8.8 },
    { id: 2, title: 'The Dark Knight', vote_average: 9.0 },
  ],
  total_pages: 3,
};

describe('HomePage Component', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mockSearchQuery.current = '';
  });

  it('renders loader initially while fetching movies', () => {
    vi.mocked(tmdbApi.get).mockImplementation(() => new Promise(() => {}));

    render(
      <MemoryRouter>
        <HomePage />
      </MemoryRouter>,
    );

    // expect(screen.getByTestId('filter-component')).toBeInTheDocument();
    expect(screen.getByTestId('loader')).toBeInTheDocument();
  });

  it('fetches and displays movies successfully from selected category endpoint', async () => {
    vi.mocked(tmdbApi.get).mockResolvedValueOnce({ data: mockMoviesData });

    render(
      <MemoryRouter>
        <HomePage />
      </MemoryRouter>,
    );

    await waitFor(() => {
      expect(screen.queryByTestId('loader')).not.toBeInTheDocument();
    });

    expect(tmdbApi.get).toHaveBeenCalledWith(
      '/movie/popular',
      expect.objectContaining({ params: { page: 1 } }),
    );

    expect(screen.getByTestId('movie-list')).toBeInTheDocument();
    expect(screen.getByText('Inception')).toBeInTheDocument();
    expect(screen.getByText('The Dark Knight')).toBeInTheDocument();
  });

  it('fetches movies from search endpoint when search query is active', async () => {
    mockSearchQuery.current = 'Batman';

    vi.mocked(tmdbApi.get).mockResolvedValueOnce({
      data: {
        results: [{ id: 3, title: 'Batman Begins', vote_average: 8.2 }],
        total_pages: 1,
      },
    });

    render(
      <MemoryRouter>
        <HomePage />
      </MemoryRouter>,
    );

    await waitFor(() => {
      expect(screen.queryByTestId('loader')).not.toBeInTheDocument();
    });

    expect(tmdbApi.get).toHaveBeenCalledWith(
      '/search/movie',
      expect.objectContaining({ params: { page: 1, query: 'Batman' } }),
    );

    expect(screen.getByText('Batman Begins')).toBeInTheDocument();
  });

  it('renders "No movies found" message when results array is empty', async () => {
    vi.mocked(tmdbApi.get).mockResolvedValueOnce({
      data: { results: [], total_pages: 0 },
    });

    render(
      <MemoryRouter>
        <HomePage />
      </MemoryRouter>,
    );

    await waitFor(() => {
      expect(screen.queryByTestId('loader')).not.toBeInTheDocument();
    });

    expect(screen.getByText('No movies found.')).toBeInTheDocument();
  });
});
