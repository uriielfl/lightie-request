import { IInterceptorCallbackConfig } from './interceptor-callback-config.interface';

export interface IInterceptorByPathName {
  pathName: string | RegExp;
  exactPath?: boolean;
  interceptor:
    | ((config: IInterceptorCallbackConfig) => void)
    | ((config: IInterceptorCallbackConfig) => any);
}
