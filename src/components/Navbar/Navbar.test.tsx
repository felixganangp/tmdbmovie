import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { MemoryRouter } from 'react-router-dom';
import Navbar from './Navbar';

vi.mock('../SearchBar/SearchBar', () => ({
  default: () => <div data-testid="search-bar">Search Bar Mock</div>,
}));

vi.mock('lucide-react', async () => {
  const actual = await vi.importActual('lucide-react');
  return {
    ...actual,
    Film: () => <svg data-testid="film-icon" />,
  };
});

describe('Navbar Component', () => {
  it('renders brand logo and title correctly', () => {
    render(
      <MemoryRouter initialEntries={['/movies']}>
        <Navbar />
      </MemoryRouter>,
    );

    expect(screen.getByText('MYFLIX')).toBeInTheDocument();
    expect(screen.getByText('TMDB Movies')).toBeInTheDocument();
    expect(screen.getByTestId('film-icon')).toBeInTheDocument();
  });

  it('renders search bars when current path is /movies', () => {
    render(
      <MemoryRouter initialEntries={['/movies']}>
        <Navbar />
      </MemoryRouter>,
    );

    const searchBars = screen.getAllByTestId('search-bar');
    expect(searchBars.length).toBeGreaterThan(0);

    expect(
      screen.queryByRole('link', { name: /browse/i }),
    ).not.toBeInTheDocument();
  });

  it('renders Browse link and hides search bars when path is not /movies (e.g. detail page)', () => {
    render(
      <MemoryRouter initialEntries={['/movies/inception-1']}>
        <Navbar />
      </MemoryRouter>,
    );

    expect(screen.queryByTestId('search-bar')).not.toBeInTheDocument();

    const browseButton = screen.getByRole('link', { name: /browse/i });
    expect(browseButton).toBeInTheDocument();
    expect(browseButton).toHaveAttribute('href', '/movies');
  });

  it('logo link navigates back to /movies', () => {
    render(
      <MemoryRouter initialEntries={['/movies/inception-1']}>
        <Navbar />
      </MemoryRouter>,
    );

    const logoLink = screen.getByRole('link', { name: /myflix tmdb movies/i });
    expect(logoLink).toHaveAttribute('href', '/movies');
  });
});
