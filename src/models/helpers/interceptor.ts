import { HttpMethodsEnum } from '../../utils/enums/http-methods.enum';
import { IInterceptorCallbackConfig } from '../../utils/interfaces/interceptor-callback-config.interface';
import {
  IInterceptorByMethod,
  IInterceptorByPathName,
} from '../../utils/interfaces/interceptors.interface';

export class Interceptor {
  private interceptors:
    | ((config: IInterceptorCallbackConfig) => void)[]
    | ((config: IInterceptorCallbackConfig) => any)[] = [];
  private interceptorsByMethod: IInterceptorByMethod = {
    GET: [],
    POST: [],
    PUT: [],
    PATCH: [],
    DELETE: [],
  } as IInterceptorByMethod;
  private interceptorsByPathName: IInterceptorByPathName[] = [];

  constructor() {}

  public addInterceptor(
    interceptor: (config: IInterceptorCallbackConfig) => void,
    config?: IInterceptorCallbackConfig,
  ) {
    if (config) {
      if (
        config.method &&
        HttpMethodsEnum[config.method as keyof typeof HttpMethodsEnum]
      ) {
        this.interceptorsByMethod[
          config.method as keyof typeof HttpMethodsEnum
        ].push(interceptor);
        return;
      }
      if (config.path) {
        const pathRegex = new RegExp(
          '^' + config.path.replace(/{.*?}/g, '.*') + '$',
        );
        this.interceptorsByPathName.push({
          pathName: config.exactPath ? config.path : pathRegex,
          interceptor: interceptor,
          exactPath: config.exactPath,
        });
        return;
      }
    }
    this.interceptors.push(interceptor);
    return;
  }

  public runInterceptorsByPathName(config: IInterceptorCallbackConfig) {
    const filteredInterceptorsByPathName = this.interceptorsByPathName.filter(
      (interceptor) => {
        if (interceptor.exactPath) {
          return interceptor.pathName === config.path;
        }
        return RegExp(interceptor.pathName).test(String(config.path));
      },
    );

    filteredInterceptorsByPathName.forEach((interceptor) => {
      interceptor.interceptor(config);
    });
  }
  public runInterceptorsByMethod(config: IInterceptorCallbackConfig) {
    this.interceptorsByMethod[
      config.method as keyof typeof HttpMethodsEnum
    ].forEach((interceptor) => {
      interceptor(config);
    });
  }

  public runInterceptors(config: IInterceptorCallbackConfig) {
    this.interceptors.forEach((interceptor) => {
      interceptor(config);
    });
  }
}
