import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import NavBar from './NavBar';
import { MemoryRouter } from 'react-router-dom';

test('renders NavBar component with correct elements', () => {
  render(
    <MemoryRouter>
      <NavBar />
    </MemoryRouter>
  );
  expect(screen.getByText(/Movie Streaming App/i)).toBeInTheDocument();
  expect(screen.getByPlaceholderText(/Search.../i)).toBeInTheDocument();
});

test('search functionality works as expected', () => {
  render(
    <MemoryRouter>
      <NavBar />
    </MemoryRouter>
  );
  const searchInput = screen.getByPlaceholderText(/Search.../i);
  fireEvent.change(searchInput, { target: { value: 'Inception' } });
  fireEvent.keyPress(searchInput, { key: 'Enter', code: 'Enter' });
  expect(window.location.pathname).toBe(`/search/Inception`);
});

