import { render, screen, waitFor } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { MemoryRouter } from 'react-router-dom';
import DetailPage from './';
import { tmdbApi } from '../../api/tmdb';

vi.mock('../../api/tmdb', () => ({
  tmdbApi: {
    get: vi.fn(),
  },
  getImageUrl: (path: string) => `https://image.tmdb.org/t/p/original${path}`,
}));

vi.mock('../../components/Breadcrumbs', () => ({
  Breadcrumbs: () => <nav data-testid="breadcrumbs">Breadcrumbs Mock</nav>,
}));

vi.mock('../../components/Loader', () => ({
  Loader: () => <div data-testid="loader">Loading...</div>,
}));

vi.mock('../../utils/formatter', () => ({
  FormatDateIndo: () => '16 Juli 2010',
}));

const mockMovieDetail = {
  id: 1,
  title: 'Inception',
  overview:
    'A thief who steals corporate secrets through dream-sharing technology...',
  backdrop_path: '/inception_backdrop.jpg',
  release_date: '2010-07-16',
  vote_average: 8.8,
  vote_count: 32000,
  runtime: 148,
  genres: [
    { id: 18, name: 'Drama' },
    { id: 28, name: 'Action' },
  ],
};

const mockMovieCredits = {
  id: 1,
  crew: [{ id: 101, name: 'Christopher Nolan', job: 'Director' }],
  cast: [
    { id: 201, name: 'Leonardo DiCaprio' },
    { id: 202, name: 'Joseph Gordon-Levitt' },
  ],
};

describe('DetailPage Component', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders loading state initially', () => {
    vi.mocked(tmdbApi.get).mockImplementation(() => new Promise(() => {}));

    render(
      <MemoryRouter
        initialEntries={[{ pathname: '/movies/inception', state: { id: 1 } }]}>
        <DetailPage />
      </MemoryRouter>,
    );

    expect(screen.getByTestId('loader')).toBeInTheDocument();
  });

  it('renders movie details, genres, synopsis, director, and cast successfully after fetching', async () => {
    vi.mocked(tmdbApi.get).mockImplementation((url: string) => {
      if (url === '/movie/1') {
        return Promise.resolve({ data: mockMovieDetail });
      }
      if (url === '/movie/1/credits') {
        return Promise.resolve({ data: mockMovieCredits });
      }
      return Promise.reject(new Error('Not found'));
    });

    render(
      <MemoryRouter
        initialEntries={[{ pathname: '/movies/inception', state: { id: 1 } }]}>
        <DetailPage />
      </MemoryRouter>,
    );

    await waitFor(() => {
      expect(screen.queryByTestId('loader')).not.toBeInTheDocument();
    });

    expect(screen.getByText('Inception')).toBeInTheDocument();
    expect(
      screen.getByText(/A thief who steals corporate secrets/i),
    ).toBeInTheDocument();

    expect(screen.getByText('Drama')).toBeInTheDocument();
    expect(screen.getByText('Action')).toBeInTheDocument();

    expect(screen.getByText('8.8')).toBeInTheDocument();
    expect(screen.getByText('(32000)')).toBeInTheDocument();
    expect(screen.getByText('148 mins')).toBeInTheDocument();
    expect(screen.getByText('16 Juli 2010')).toBeInTheDocument();

    expect(screen.getByText('Christopher Nolan')).toBeInTheDocument();
    expect(screen.getByText('Leonardo DiCaprio')).toBeInTheDocument();
    expect(screen.getByText('Joseph Gordon-Levitt')).toBeInTheDocument();

    const posterImage = screen.getByRole('img', { name: /inception/i });
    expect(posterImage).toHaveAttribute(
      'src',
      'https://image.tmdb.org/t/p/original/inception_backdrop.jpg',
    );
  });
});
