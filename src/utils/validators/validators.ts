import { IHeaderRequest } from '../interfaces/header.interface';

export const isUrlValid = (url: string): boolean => {
  if (!(url.includes('http://') || url.includes('https://'))) {
    throw new Error('Invalid URL');
  }
  return true;
};

export const isHeaderValid = (header: IHeaderRequest): boolean => {
  if (
    header &&
    (typeof header !== 'object' ||
      Object.values(header).some((value) => typeof value !== 'string'))
  ) {
    throw new Error('Invalid headers');
  }
  return true;
};
