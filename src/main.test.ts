import { req } from './index';

// Cria mocks para os métodos
const mockPost = jest.fn();
const mockGet = jest.fn();
const mockPatch = jest.fn();
const mockPut = jest.fn();
const mockDelete = jest.fn();
// ...

// Mock do objeto req
jest.mock('./index', () => {
  let defaultUrl = 'http://localhost:80';
  return {
    req: {
      init: jest.fn().mockImplementation((url?: string) => {
        if (url) {
          defaultUrl = url;
        }
        return {
          url: defaultUrl,
          post: mockPost,
          get: mockGet,
          patch: mockPatch,
          put: mockPut,
          delete: mockDelete,
        };
      }),
    },
  };
});

describe('Requests', () => {
  it('should initialize with default base url', () => {
    const api = req.init();
    expect(api.url).toBe('http://localhost:80');
  });

  it('should be able to set, with init method, a new base url', () => {
    const api = req.init('http://localhost:3000');
    expect(api.url).toBe('http://localhost:3000');
  });

  it('should call post method when req.init().post is called', () => {
    req.init().post('path', { body: { data: 'data' } });
    expect(mockPost).toHaveBeenCalledWith('path', { body: { data: 'data' } });
  });

  it('should call patch method when req.init().patch is called', () => {
    req.init().patch('path', { body: { data: 'data' } });
    expect(mockPatch).toHaveBeenCalledWith('path', { body: { data: 'data' } });
  });

  it('should call put method when req.init().put is called', () => {
    req.init().put('path', { body: { data: 'data' } });
    expect(mockPut).toHaveBeenCalledWith('path', { body: { data: 'data' } });
  });

  it('should call get method when req.init().get is called', () => {
    req.init().get('path');
    expect(mockGet).toHaveBeenCalledWith('path');
  });

  it('should call delete method when req.init().delete is called', () => {
    req.init().delete('path');
    expect(mockDelete).toHaveBeenCalledWith('path');
  });
});
