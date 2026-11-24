import { render, screen, fireEvent, waitFor, within } from '@testing-library/react';
import { test, expect, vi } from 'vitest';
import { http, HttpResponse } from 'msw';
import { server } from './mocks/server';
import App from './App';

test('submitting a GET request displays mock API results', async () => {
  render(<App />);

  const urlInput = screen.getByRole('textbox');
  fireEvent.change(urlInput, {
    target: { value: 'https://example.com/api' },
  });

  fireEvent.click(screen.getByRole('button', { name: 'GO!' }));

  expect(screen.getByText('Request Method: GET')).toBeTruthy();
  expect(screen.getByText('URL: https://example.com/api')).toBeTruthy();
  expect(await screen.findByText(/fake thing 1/)).toBeTruthy();
});

test('submitting a POST request sends JSON and displays the response', async () => {
  render(<App />);

  fireEvent.change(screen.getByRole('textbox'), {
    target: { value: 'https://example.com/api' },
  });
  fireEvent.click(screen.getByText('POST', { selector: 'span' }));
  fireEvent.change(screen.getByRole('textbox', { name: 'JSON Body:' }), {
    target: { value: JSON.stringify({ name: 'created item' }) },
  });
  fireEvent.click(screen.getByRole('button', { name: 'GO!' }));

  expect(screen.getByText('Request Method: POST')).toBeTruthy();
  expect(screen.getByText('URL: https://example.com/api')).toBeTruthy();
  await screen.findByText(/Resource created/);

  const results = within(
    screen.getByRole('region', { name: 'Response Results' })
  );
  expect(results.getByText(/^"?message"?:$/)).toBeTruthy();
  expect(results.getByText(/Resource created/)).toBeTruthy();
  expect(results.getByText(/^"?receivedMethod"?:$/)).toBeTruthy();
  expect(results.getByText(/^"?POST"?$/)).toBeTruthy();
  expect(results.getByText(/^"?receivedUrl"?:$/)).toBeTruthy();
  expect(results.getByText(/https:\/\/example\.com\/api/)).toBeTruthy();
  expect(results.getByText(/^"?receivedBody"?:$/)).toBeTruthy();
  expect(results.getByText(/^"?name"?:$/)).toBeTruthy();
  expect(results.getByText(/created item/)).toBeTruthy();
});

test('submitting a PATCH request sends JSON and displays the response', async () => {
  render(<App />);

  fireEvent.change(screen.getByRole('textbox'), {
    target: { value: 'https://example.com/api' },
  });
  fireEvent.click(screen.getByText('PATCH', { selector: 'span' }));
  fireEvent.change(screen.getByRole('textbox', { name: 'JSON Body:' }), {
    target: { value: JSON.stringify({ name: 'updated item' }) },
  });
  fireEvent.click(screen.getByRole('button', { name: 'GO!' }));

  expect(screen.getByText('Request Method: PATCH')).toBeTruthy();
  expect(screen.getByText('URL: https://example.com/api')).toBeTruthy();
  await screen.findByText(/Resource updated/);

  const results = within(
    screen.getByRole('region', { name: 'Response Results' })
  );
  expect(results.getByText(/^"?message"?:$/)).toBeTruthy();
  expect(results.getByText(/Resource updated/)).toBeTruthy();
  expect(results.getByText(/^"?receivedMethod"?:$/)).toBeTruthy();
  expect(results.getByText(/^"?PATCH"?$/)).toBeTruthy();
  expect(results.getByText(/^"?receivedUrl"?:$/)).toBeTruthy();
  expect(results.getByText(/https:\/\/example\.com\/api/)).toBeTruthy();
  expect(results.getByText(/^"?receivedBody"?:$/)).toBeTruthy();
  expect(results.getByText(/^"?name"?:$/)).toBeTruthy();
  expect(results.getByText(/updated item/)).toBeTruthy();
});

test('submitting a DELETE request handles HTTP 204 without a JSON parsing error', async () => {
  const observeRequest = vi.fn();
  server.use(
    http.delete('https://example.com/api', ({ request }) => {
      const response = new HttpResponse(null, { status: 204 });
      observeRequest({
        method: request.method,
        url: request.url,
        status: response.status,
      });
      return response;
    })
  );
  render(<App />);

  fireEvent.change(screen.getByRole('textbox'), {
    target: { value: 'https://example.com/api' },
  });
  fireEvent.click(screen.getByText('DELETE', { selector: 'span' }));
  fireEvent.click(screen.getByRole('button', { name: 'GO!' }));

  expect(screen.getByText('Request Method: DELETE')).toBeTruthy();
  expect(screen.getByText('URL: https://example.com/api')).toBeTruthy();
  await waitFor(() => {
    expect(observeRequest).toHaveBeenCalledExactlyOnceWith({
      method: 'DELETE',
      url: 'https://example.com/api',
      status: 204,
    });
    const results = within(
      screen.getByRole('region', { name: 'Response Results' })
    );
    expect(results.getByText(/^"?results"?:$/)).toBeTruthy();
    expect(results.getByText('null')).toBeTruthy();
    expect(results.queryByText(/^"?error"?:$/)).toBeNull();
    expect(screen.queryByText('Loading...')).toBeNull();
  });
});
