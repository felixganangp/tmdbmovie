import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { MemoryRouter } from 'react-router-dom';
import MovieList from './MovieList';
import type { Movie } from '../../types/movie';

vi.mock('../MovieCard/MovieCard', () => ({
  default: ({ movie }: { movie: Movie }) => (
    <div data-testid="movie-card">{movie.title}</div>
  ),
}));

vi.mock('../../utils/formatter', () => ({
  StringToSlug: (title: string) => title.toLowerCase().replace(/\s+/g, '-'),
}));

const mockMovies: Movie[] = [
  {
    id: 1,
    title: 'Inception',
    overview: 'A thief who steals corporate secrets...',
    poster_path: '/path1.jpg',
    backdrop_path: '/backdrop1.jpg',
    release_date: '2010-07-16',
    vote_average: 8.8,
    vote_count: 2000,
  },
  {
    id: 2,
    title: 'The Dark Knight',
    overview: 'When the menace known as the Joker...',
    poster_path: '/path2.jpg',
    backdrop_path: '/backdrop2.jpg',
    release_date: '2008-07-18',
    vote_average: 9.0,
    vote_count: 2000,
  },
];

describe('MovieList Component', () => {
  it('renders a list of movie cards correctly based on provided movies prop', () => {
    render(
      <MemoryRouter>
        <MovieList movies={mockMovies} />
      </MemoryRouter>,
    );
    const movieCards = screen.getAllByTestId('movie-card');

    expect(screen.getByText('Inception')).toBeInTheDocument();
    expect(screen.getByText('The Dark Knight')).toBeInTheDocument();
    expect(movieCards).toHaveLength(2);
  });

  it('renders links with correct slug URLs and state for each movie', () => {
    render(
      <MemoryRouter>
        <MovieList movies={mockMovies} />
      </MemoryRouter>,
    );

    const links = screen.getAllByRole('link');

    expect(links).toHaveLength(2);
    expect(links[0]).toHaveAttribute('href', '/movies/inception');
    expect(links[1]).toHaveAttribute('href', '/movies/the-dark-knight');
  });

  it('renders nothing inside grid if movies array is empty', () => {
    render(
      <MemoryRouter>
        <MovieList movies={[]} />
      </MemoryRouter>,
    );

    const movieCards = screen.queryAllByTestId('movie-card');

    expect(movieCards).toHaveLength(0);
  });
});
