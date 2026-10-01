import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import MovieCard from './MovieCard';
import type { Movie } from '../../types/movie';

const mockMovie: Movie = {
  id: 1,
  title: 'Inception',
  overview: 'A thief who steals corporate secrets...',
  poster_path: '/path.jpg',
  backdrop_path: '/backdrop.jpg',
  release_date: '2010-07-16',
  vote_average: 8.886,
  vote_count: 2000,
};

describe('MovieCard Component', () => {
  it('renders movie data correctly', () => {
    render(<MovieCard movie={mockMovie} index={1} />);
    const ratingElement = screen.getByText(/8\.9/i);
    const posterImage = screen.getByRole('img', { name: /inception/i });

    expect(screen.getByText('Inception')).toBeInTheDocument();
    expect(screen.getByText('2010')).toBeInTheDocument();
    expect(ratingElement).toBeInTheDocument();
    expect(posterImage).toBeInTheDocument();
    expect(posterImage).toHaveAttribute(
      'src',
      expect.stringContaining('/path.jpg'),
    );
    expect(posterImage).toHaveAttribute('alt', 'Inception');
  });
});
