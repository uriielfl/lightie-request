import { HttpMethodsEnum } from '../enums/http-methods.enum';
import { IHeaderRequest } from './header.interface';

export interface IInterceptorCallbackConfig {
  path?: string;
  exactPath?: boolean;
  method?: HttpMethodsEnum | string;
  headers?: IHeaderRequest;
}
