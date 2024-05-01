import { IInterceptorCallbackConfig } from './interceptor-callback-config.interface';

export interface IInterceptorByMethod {
  GET:
    | ((config: IInterceptorCallbackConfig) => void)[]
    | ((config: IInterceptorCallbackConfig) => any)[];
  POST:
    | ((config: IInterceptorCallbackConfig) => void)[]
    | ((config: IInterceptorCallbackConfig) => any)[];
  PUT:
    | ((config: IInterceptorCallbackConfig) => void)[]
    | ((config: IInterceptorCallbackConfig) => any)[];
  PATCH:
    | ((config: IInterceptorCallbackConfig) => void)[]
    | ((config: IInterceptorCallbackConfig) => any)[];
  DELETE:
    | ((config: IInterceptorCallbackConfig) => void)[]
    | ((config: IInterceptorCallbackConfig) => any)[];
}

export interface IInterceptorByPathName {
  pathName: string | RegExp;
  exactPath?: boolean;
  interceptor:
    | ((config: IInterceptorCallbackConfig) => void)
    | ((config: IInterceptorCallbackConfig) => any);
}
