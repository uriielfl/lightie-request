import { HttpMethodsEnum } from '../enums/http-methods.enum';
import { IInterceptorCallbackConfig } from '../interfaces/interceptor-callback-config.interface';

export type TInterceptorByMethod = {
  [key in HttpMethodsEnum]: ((config: IInterceptorCallbackConfig) => any)[];
};
