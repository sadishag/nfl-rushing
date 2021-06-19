import { render, screen } from '@testing-library/react';
import App from './App';

test('renders app coorectly', () => {
  render(<App />);

  const headerTitle = screen.getByText(/nfl-rushing/i);
  expect(headerTitle).toBeInTheDocument();
});
