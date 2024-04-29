import { Get, Post, Patch, Put, Delete } from './models/methods';
import { IHeaderRequest } from './utils/interfaces/header.interface';

export class Requests {
  url: string = 'http://localhost:80';
  headers?: IHeaderRequest;
  constructor() {}

  init(url?: string) {
    if(url) {
      this.url = url;
    }
    return this;
  }

  async post(path?: string, data?: any) {
    const postRequest = new Post(this.url, path, { body: data, headers: this.headers });
    return await postRequest.run();
  }

  async get(path?: string) {
    const getRequest = new Get(this.url, path, { headers: this.headers });
    return await getRequest.run();
  }

  async patch(path?: string, data?: any) {
    const postRequest = new Patch(this.url, path, { body: data, headers: this.headers  });
    return await postRequest.run();
  }

  async put(path?: string, data?: any) {
    const postRequest = new Put(this.url, path, { body: data, headers: this.headers  });
    return await postRequest.run();
  }

  async delete(path?: string) {
    const postRequest = new Delete(this.url, path, { headers: this.headers });
    return await postRequest.run();
  }
}

