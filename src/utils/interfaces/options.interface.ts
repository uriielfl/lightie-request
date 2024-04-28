import { IHeaderRequest } from './header.interface';

export interface IOptions<T = any> {
  headers?: IHeaderRequest;
  body?: BodyInit | any
}
