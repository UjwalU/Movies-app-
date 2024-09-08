import React from 'react';
import { render, screen } from '@testing-library/react';
import MovieDetail from './MovieDetail';
import { MemoryRouter } from 'react-router-dom';

const movie = {
  id: 1,
  title: 'Inception',
  overview: 'A mind-bending thriller...',
  vote_average: 8.6,
  poster_path: '/inception.jpg',
};

test('renders MovieDetail component with correct movie information', () => {
  render(
    <MemoryRouter>
      <MovieDetail movie={movie} />
    </MemoryRouter>
  );
  expect(screen.getByText(/Inception/i)).toBeInTheDocument();
  expect(screen.getByText(/A mind-bending thriller/i)).toBeInTheDocument();
  expect(screen.getByText(/IMDb Rating/i)).toBeInTheDocument();
  expect(screen.getByText(/Streamvibe Rating/i)).toBeInTheDocument();
});

