import { LightieError } from "../handlers/lightie-error";
import { Put } from "./put";
import 'isomorphic-fetch';

const MOCK_DATA = {
  key: 'value'
}

global.fetch = jest.fn(() =>
  Promise.resolve(new Response(JSON.stringify({ message: 'Success' }), { status: 200 }))
);

describe('Put method model', () => {
  let method: Put;

  beforeEach(() => {
    (fetch as jest.Mock).mockClear();
    method = new Put('http://localhost:3000', 'posts', { headers: { 'key': 'value' }, body: MOCK_DATA});
  });

  it('should return status and message on successful put request with custom headers', async () => {
    const response = await method.run();
    expect(response.status).toBe(200);
    expect(response.data).toEqual({ message: 'Success' });

    // Verificar se fetch foi chamado com os argumentos corretos
    expect(fetch).toHaveBeenCalledWith('http://localhost:3000/posts', {
      method: 'PUT',
      body: JSON.stringify(MOCK_DATA),
      headers: {
        'Content-Type': 'application/json',
        key: 'value',
      },
    });
  });

  it('should return status and message on successful put request without custom headers', async () => {
    // Criar uma nova instância de Post sem passar options
    const methodWithoutHeaders = new Put('http://localhost:3000', 'posts');

    const response = await methodWithoutHeaders.run();
    expect(response.status).toBe(200);
    expect(response.data).toEqual({ message: 'Success' });

    // Verificar se fetch foi chamado com os argumentos corretos
    expect(fetch).toHaveBeenCalledWith('http://localhost:3000/posts', {
      method: 'PUT',
      body: JSON.stringify(undefined), // body será undefined, pois não passamos options
      headers: {
        'Content-Type': 'application/json',
      },
    });
  });
  
  it('should handle error on put request', async () => {
    (fetch as jest.Mock).mockImplementationOnce(() => Promise.reject(new Error('Network error')));

    try {
      await method.run();
    } catch (error) {
      expect(error).toEqual(new Error('Network error'));
    }
  });

  it('should throw an error when the response is not ok', async () => {
    (fetch as jest.Mock).mockResolvedValueOnce(
      new Response(JSON.stringify({ message: 'Bad Request' }), { status: 400, statusText: 'Bad Request' })
    );

    try {
      await method.run();
    } catch (error) {
      expect(error).toEqual(new LightieError(400, 'Bad Request', {message: 'Bad Request'} ));
    }
  });
});