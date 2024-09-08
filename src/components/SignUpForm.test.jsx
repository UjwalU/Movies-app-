import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import SignupForm from './SignupForm';

test('renders SignupForm component with correct form elements', () => {
  render(<SignupForm />);
  expect(screen.getByLabelText(/Email/i)).toBeInTheDocument();
  expect(screen.getByLabelText(/Password/i)).toBeInTheDocument();
  expect(screen.getByLabelText(/Confirm Password/i)).toBeInTheDocument();
});

test('form validation works as expected', () => {
  render(<SignupForm />);
  const emailInput = screen.getByLabelText(/Email/i);
  const passwordInput = screen.getByLabelText(/Password/i);
  const confirmPasswordInput = screen.getByLabelText(/Confirm Password/i);
  const submitButton = screen.getByText(/Sign Up/i);

  fireEvent.change(emailInput, { target: { value: 'invalidemail' } });
  fireEvent.click(submitButton);
  expect(screen.getByText(/Invalid email address/i)).toBeInTheDocument();

  fireEvent.change(emailInput, { target: { value: 'user@example.com' } });
  fireEvent.change(passwordInput, { target: { value: 'password' } });
  fireEvent.change(confirmPasswordInput, { target: { value: 'differentpassword' } });
  fireEvent.click(submitButton);
  expect(screen.getByText(/Passwords do not match/i)).toBeInTheDocument();
});

test('form submission works and displays success message', () => {
  render(<SignupForm />);
  const emailInput = screen.getByLabelText(/Email/i);
  const passwordInput = screen.getByLabelText(/Password/i);
  const confirmPasswordInput = screen.getByLabelText(/Confirm Password/i);
  const submitButton = screen.getByText(/Sign Up/i);

  fireEvent.change(emailInput, { target: { value: 'user@example.com' } });
  fireEvent.change(passwordInput, { target: { value: 'password' } });
  fireEvent.change(confirmPasswordInput, { target: { value: 'password' } });
  fireEvent.click(submitButton);
  expect(screen.getByText(/Sign up successful/i)).toBeInTheDocument();
});
