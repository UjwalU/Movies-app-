import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import MovieCard from './MovieCard';
import { MemoryRouter } from 'react-router-dom';

const movie = {
  id: 1,
  title: 'Inception',
  poster_path: '/inception.jpg',
  genre_ids: [1]
};

test('renders MovieCard component with movie title and image', () => {
  render(
    <MemoryRouter>
      <MovieCard movie={movie} />
    </MemoryRouter>
  );
  expect(screen.getByText(/Inception/i)).toBeInTheDocument();
  expect(screen.getByAltText(/Inception/i)).toBeInTheDocument();
});

test('button redirects to correct movie detail page', () => {
  render(
    <MemoryRouter>
      <MovieCard movie={movie} />
    </MemoryRouter>
  );
  const button = screen.getByText(/View Details/i);
  fireEvent.click(button);
  expect(window.location.pathname).toBe(`/movie/1`);
});

