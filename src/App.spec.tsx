import { render, screen } from '@testing-library/react';
import App from './App';

test('testing learn react', () => {
  render(<App />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
