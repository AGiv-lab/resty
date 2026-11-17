import { http, HttpResponse } from 'msw';
import { setupServer } from 'msw/node';

export const server = setupServer(
  http.get('https://example.com/api', () => {
    return HttpResponse.json({
      name: 'fake thing 1',
    });
  })
);