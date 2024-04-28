import { Get } from "./get";
import 'isomorphic-fetch';

global.fetch = jest.fn(() =>
  Promise.resolve(new Response(JSON.stringify({ message: 'Success' }), { status: 200 }))
);

describe('Get method model', () => {
  let method: Get;

  beforeEach(() => {
    (fetch as jest.Mock).mockClear();
    method = new Get('http://localhost:3000', 'posts', { headers: { key: 'value' } });
  });

  it('should return status and message on successful get request with custom headers', async () => {
    const response = await method.run();
    expect(response.status).toBe(200);
    expect(response.data).toEqual({ message: 'Success' });

    // Verificar se fetch foi chamado com os argumentos corretos
    expect(fetch).toHaveBeenCalledWith('http://localhost:3000/posts', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        key: 'value',
      },
    });
  });

  it('should return status and message on successful get request without custom headers', async () => {
    // Criar uma nova instância de Post sem passar options
    const methodWithoutHeaders = new Get('http://localhost:3000', 'posts');

    const response = await methodWithoutHeaders.run();
    expect(response.status).toBe(200);
    expect(response.data).toEqual({ message: 'Success' });

    // Verificar se fetch foi chamado com os argumentos corretos
    expect(fetch).toHaveBeenCalledWith('http://localhost:3000/posts', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
  });

  it('should handle error on get request', async () => {
    (fetch as jest.Mock).mockImplementationOnce(() => Promise.reject(new Error('Network error')));

    try {
      await method.run();
    } catch (error) {
      expect(error).toEqual(new Error('Network error'));
    }
  });

  it('should throw an error when the response is not ok', async () => {
    (fetch as jest.Mock).mockResolvedValueOnce(
      new Response(JSON.stringify({ message: 'Bad Request' }), { status: 400 })
    );

    try {
      await method.run();
    } catch (error) {
      expect(error).toEqual(new Error('HTTP error:\n400'));
    }
  });
});