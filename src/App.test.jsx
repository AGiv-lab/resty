import { render, screen, fireEvent } from '@testing-library/react';
import { test, expect } from 'vitest';
import App from './App';

test('submitting a GET request displays mock API results', () => {
  render(<App />);

  const urlInput = screen.getByRole('textbox');
  fireEvent.change(urlInput, {
    target: { value: 'https://example.com/api' },
  });

  fireEvent.click(screen.getByRole('button', { name: 'GO!' }));

  expect(screen.getByText('Request Method: GET')).toBeTruthy();
  expect(screen.getByText('URL: https://example.com/api')).toBeTruthy();
  expect(screen.getByText(/fake thing 1/)).toBeTruthy();
});