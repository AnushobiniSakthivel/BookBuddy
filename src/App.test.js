import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Home from './pages/Home';

test('renders welcome message on Home page', () => {
  render(
    <BrowserRouter>
      <Home />
    </BrowserRouter>
  );
  const headingElement = screen.getByText(/Welcome to BookBuddy!/i);
  expect(headingElement).toBeInTheDocument();
});