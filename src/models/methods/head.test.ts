import { LightieError } from '../handlers/lightie-error';
import { Head } from './head';
import 'isomorphic-fetch';

global.fetch = jest.fn(() =>
    Promise.resolve(
      new Response(null, { status: 204 }),
    ),
  );

describe('Head method model', () => {
  let method: Head;

  beforeEach(() => {
    (fetch as jest.Mock).mockClear();
    method = new Head('http://localhost:3000', 'posts', {
      headers: { key: 'value' },
    });
  });

  it('should return status on successful head request with custom headers', async () => {
    const response = await method.run();
    expect(response.status).toBe(204);

    expect(fetch).toHaveBeenCalledWith('http://localhost:3000/posts', {
      method: 'HEAD',
      headers: {
        'Content-Type': 'application/json',
        key: 'value',
      },
    });
  });

  it('should return status on successful head request without custom headers', async () => {
    const methodWithoutHeaders = new Head('http://localhost:3000', 'posts');

    const response = await methodWithoutHeaders.run();
    expect(response.status).toBe(204);

    expect(fetch).toHaveBeenCalledWith('http://localhost:3000/posts', {
      method: 'HEAD',
      headers: {
        'Content-Type': 'application/json',
      },
    });
  });

  it('should handle error on head request', async () => {
    (fetch as jest.Mock).mockImplementationOnce(() =>
      Promise.reject(new Error('Network error')),
    );

    try {
      await method.run();
    } catch (error) {
      expect(error).toEqual(new Error('Network error'));
    }
  });

  it('should throw an error when the response is not ok', async () => {
    (fetch as jest.Mock).mockResolvedValueOnce(
      new Response('', {
        status: 400,
        statusText: 'Bad Request',
      }),
    );
  
    try {
      await method.run();
    } catch (error:any) {
      const headersMap = error.message[Symbol('headers map')];
      const message = headersMap ? Object.fromEntries(headersMap) : {};
  
      const lightieError = new LightieError(error?.status, error?.statusText, message);
  
      expect(lightieError).toEqual(
        new LightieError(400, 'Bad Request', {}),
      );
    }
  });
  it('should handle json response', async () => {
    const jsonResponse = { key: 'value' };
    (fetch as jest.Mock).mockResolvedValueOnce(
      new Response(JSON.stringify(jsonResponse), {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      }),
    );
  
    const result = await new Head('http://example.com').run();
  
    expect(result.data).toEqual(jsonResponse);
  });
});