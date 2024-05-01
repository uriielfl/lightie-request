import { LightieError } from '../handlers/lightie-error';
import { Delete } from './delete';
import 'isomorphic-fetch';

global.fetch = jest.fn(() =>
  Promise.resolve(
    new Response(JSON.stringify({ message: 'Success' }), { status: 200 }),
  ),
);

describe('Delete method model', () => {
  let method: Delete;

  beforeEach(() => {
    (fetch as jest.Mock).mockClear();
    method = new Delete('http://localhost:3000', 'posts', {
      headers: { key: 'value' },
    });
  });

  it('should return status and message on successful delete request with custom headers', async () => {
    const response = await method.run();
    expect(response.status).toBe(200);
    expect(response.data).toEqual({ message: 'Success' });

    expect(fetch).toHaveBeenCalledWith('http://localhost:3000/posts', {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        key: 'value',
      },
    });
  });

  it('should return status and message on successful delete request without custom headers', async () => {
    const methodWithoutHeaders = new Delete('http://localhost:3000', 'posts');

    const response = await methodWithoutHeaders.run();
    expect(response.status).toBe(200);
    expect(response.data).toEqual({ message: 'Success' });

    expect(fetch).toHaveBeenCalledWith('http://localhost:3000/posts', {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    });
  });
  it('should handle error on delete request', async () => {
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
      new Response(JSON.stringify({ message: 'Bad Request' }), {
        status: 400,
        statusText: 'Bad Request',
      }),
    );

    try {
      await method.run();
    } catch (error) {
      expect(error).toEqual(
        new LightieError(400, 'Bad Request', { message: 'Bad Request' }),
      );
    }
  });
});
