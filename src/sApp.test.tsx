import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

test('renders login component', () => {
  render(<App />);
  const loginElement = screen.getByText(/login/i); // Adjust this to match actual text
  expect(loginElement).toBeInTheDocument();
});