import { http, HttpResponse } from 'msw';
import { setupServer } from 'msw/node';

export const server = setupServer(
  http.get('https://example.com/api', () => {
    return HttpResponse.json({
      name: 'fake thing 1',
    });
  }),
  http.post('https://example.com/api', async ({ request }) => {
    const body = await request.json();

    return HttpResponse.json(
      {
        message: 'Resource created',
        receivedMethod: request.method,
        receivedUrl: request.url,
        receivedBody: body,
      },
      { status: 201 }
    );
  }),
  http.patch('https://example.com/api', async ({ request }) => {
    const body = await request.json();

    return HttpResponse.json({
      message: 'Resource updated',
      receivedMethod: request.method,
      receivedUrl: request.url,
      receivedBody: body,
    });
  }),
  http.delete('https://example.com/api', () => {
    return new HttpResponse(null, { status: 204 });
  })
);
