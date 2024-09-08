import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';
import { MemoryRouter } from 'react-router-dom';

test('renders App component without crashing', () => {
  render(
    <MemoryRouter>
      <App />
    </MemoryRouter>
  );
  const linkElement = screen.getByText(/Movie Streaming App/i);
  expect(linkElement).toBeInTheDocument();
});


