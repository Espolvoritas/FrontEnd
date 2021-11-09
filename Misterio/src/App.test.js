import { render, screen } from '@testing-library/react';
import App from './App';

test('renders the main page', () => {
  render(<App />);
  const linkElement = screen.getByText(/Bienvenido a Misterio/i);
  expect(linkElement).toBeInTheDocument();
});
