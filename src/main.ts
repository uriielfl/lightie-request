import { Interceptor } from './models/helpers/interceptor';
import { Get, Post, Patch, Put, Delete } from './models/methods';
import { HttpMethodsEnum } from './utils/enums/http-methods.enum';
import { IHeaderRequest } from './utils/interfaces/header.interface';
import { IInterceptorCallbackConfig } from './utils/interfaces/interceptor-callback-config.interface';

export class LightieRequest {
  public headers?: IHeaderRequest;
  public url: string = 'http://localhost:80';
  private interceptor = new Interceptor();

  constructor() {}

  init(url?: string) {
    if (url) {
      this.url = url;
    }
    
    if (this.url.endsWith('/')) {
      this.url = this.url.slice(0, -1);
    }

    return this;
  }

  addInterceptor(
    interceptor: (config: IInterceptorCallbackConfig) => void,
    config?: IInterceptorCallbackConfig,
  ) {
    this.interceptor.addInterceptor(interceptor, config);
  }

  async post(path?: string, data?: any, headers?: IHeaderRequest) {
    const HEADERS = { ...this.headers, ...headers };
    if (path?.startsWith('/')) path = path.slice(1);
    const config = {
      url: this.url,
      path,
      headers: HEADERS,
      method: HttpMethodsEnum.POST,
    };
    this.interceptor.runInterceptorsByMethod(config);
    this.interceptor.runInterceptorsByPathName(config);
    this.interceptor.runInterceptors(config);
    const postRequest = new Post(this.url, config.path, {
      body: data,
      headers: config.headers,
    });
    return await postRequest.run();
  }

  async get(path?: string, headers?: IHeaderRequest) {
    const HEADERS = { ...this.headers, ...headers };

    if (path?.startsWith('/')) path = path.slice(1);
    const config = {
      url: this.url,
      path,
      headers: HEADERS,
      method: HttpMethodsEnum.GET,
    };
    this.interceptor.runInterceptorsByMethod(config);
    this.interceptor.runInterceptorsByPathName(config);
    this.interceptor.runInterceptors(config);

    const getRequest = new Get(config.url, config.path, {
      headers: config.headers,
    });
    return await getRequest.run();
  }

  async patch(path?: string, data?: any, headers?: IHeaderRequest) {
    const HEADERS = { ...this.headers, ...headers };

    if (path?.startsWith('/')) path = path.slice(1);
    const config = {
      url: this.url,
      path,
      headers: HEADERS,
      method: HttpMethodsEnum.PATCH,
    };
    this.interceptor.runInterceptorsByMethod(config);
    this.interceptor.runInterceptorsByPathName(config);
    this.interceptor.runInterceptors(config);
    const patchRequest = new Patch(this.url, config.path, {
      body: data,
      headers: config.headers,
    });
    return await patchRequest.run();
  }

  async put(path?: string, data?: any, headers?: IHeaderRequest) {
    const HEADERS = { ...this.headers, ...headers };

    if (path?.startsWith('/')) path = path.slice(1);
    const config = {
      url: this.url,
      path,
      headers: HEADERS,
      method: HttpMethodsEnum.PUT,
    };
    this.interceptor.runInterceptorsByMethod(config);
    this.interceptor.runInterceptorsByPathName(config);
    this.interceptor.runInterceptors(config);
    const putRequest = new Put(this.url, config.path, {
      body: data,
      headers: config.headers,
    });
    return await putRequest.run();
  }

  async delete(path?: string, headers?: IHeaderRequest) {
    const HEADERS = { ...this.headers, ...headers };

    if (path?.startsWith('/')) path = path.slice(1);
    const config = {
      url: this.url,
      path,
      headers: HEADERS,
      method: HttpMethodsEnum.DELETE,
    };
    this.interceptor.runInterceptorsByMethod(config);
    this.interceptor.runInterceptorsByPathName(config);
    this.interceptor.runInterceptors(config);
    const deleteRequest = new Delete(this.url, config.path, {
      headers: config.headers,
    });
    return await deleteRequest.run();
  }
}
