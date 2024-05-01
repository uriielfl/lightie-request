import { Interceptor } from './interceptor';
import { HttpMethodsEnum } from '../../utils/enums/http-methods.enum';

describe('Interceptor', () => {
  let interceptor: Interceptor;

  beforeEach(() => {
    interceptor = new Interceptor();
  });

  it('should add a new interceptor', () => {
    const testInterceptor = jest.fn();
    interceptor.addInterceptor(testInterceptor);

    expect(interceptor['interceptors']).toContain(testInterceptor);
  });

  it('should run all interceptors', () => {
    const testInterceptor1 = jest.fn();
    const testInterceptor2 = jest.fn();
    interceptor.addInterceptor(testInterceptor1);
    interceptor.addInterceptor(testInterceptor2);

    const config = {
      url: 'http://test.com',
      path: '/test',
      headers: {},
      method: HttpMethodsEnum.GET,
    };
    interceptor.runInterceptors(config);

    expect(testInterceptor1).toHaveBeenCalledWith(config);
    expect(testInterceptor2).toHaveBeenCalledWith(config);
  });

  it('should run interceptors by exact pathname', () => {
    const testInterceptor1 = jest.fn();
    const testInterceptor2 = jest.fn();
    interceptor.addInterceptor(testInterceptor1, {
      path: '/test/2',
      exactPath: true,
    });
    interceptor.addInterceptor(testInterceptor2, {
      path: '/test/2',
      exactPath: true,
    });

    const config = {
      path: '/test/2',
    };
    interceptor.runInterceptorsByPathName(config);

    expect(testInterceptor1).toHaveBeenCalledWith(config);
    expect(testInterceptor2).toHaveBeenCalledWith(config);
  });

  it('should run interceptors by path dinamically', () => {
    const testInterceptor1 = jest.fn();
    const testInterceptor2 = jest.fn();
    interceptor.addInterceptor(testInterceptor1, {
      path: '/test/{id}',
      exactPath: false,
    });
    interceptor.addInterceptor(testInterceptor2, {
      path: '/test/{id}',
      exactPath: false,
    });

    const config = {
      path: '/test/2',
    };

    interceptor.runInterceptorsByPathName(config);

    expect(testInterceptor1).toHaveBeenCalledWith(config);
    expect(testInterceptor2).toHaveBeenCalledWith(config);
  });

  it('should add interceptor by method', () => {
    const testInterceptor = jest.fn();
    const testInterceptor2 = jest.fn();
    interceptor.addInterceptor(testInterceptor, { method: 'GET' });
    interceptor.addInterceptor(testInterceptor2);

    const config = {
      method: 'GET',
    };

    interceptor.runInterceptorsByMethod(config);
    expect(testInterceptor).toHaveBeenCalledWith(config);
  });
});
