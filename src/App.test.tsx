import { render, screen } from '@testing-library/react';
import App from './App';

describe('App', () => {
  it('renderiza el titulo principal de la tienda', () => {
    render(<App />);
    expect(
      screen.getByRole('heading', { name: /TechStore Pro/i }),
    ).toBeInTheDocument();
  });
});
