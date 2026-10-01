import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { MemoryRouter } from 'react-router-dom';
import { Breadcrumbs } from './Breadcrumbs';

describe('Breadcrumbs Component', () => {
  it('renders intermediate path and current page title correctly for nested routes', () => {
    render(
      <MemoryRouter initialEntries={['/movies/action/inception-movie']}>
        <Breadcrumbs />
      </MemoryRouter>,
    );

    expect(screen.getByRole('link', { name: /home/i })).toHaveAttribute(
      'href',
      '/',
    );

    const moviesLink = screen.getByRole('link', { name: /movies/i });
    expect(moviesLink).toBeInTheDocument();
    expect(moviesLink).toHaveAttribute('href', '/movies');

    const actionLink = screen.getByRole('link', { name: /action/i });
    expect(actionLink).toBeInTheDocument();
    expect(actionLink).toHaveAttribute('href', '/movies/action');

    const lastCrumb = screen.getByText('inception-movie');
    expect(lastCrumb).toBeInTheDocument();
    expect(lastCrumb.tagName).not.toBe('A');
  });

  it('decodes URI components correctly if path contains encoded characters', () => {
    render(
      <MemoryRouter initialEntries={['/movies/sci-fi%20thriller']}>
        <Breadcrumbs />
      </MemoryRouter>,
    );

    expect(screen.getByText('sci-fi thriller')).toBeInTheDocument();
  });
});
