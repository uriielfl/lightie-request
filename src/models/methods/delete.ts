import { IHeaderRequest } from '../../utils/interfaces/header.interface';
import { HttpMethodsEnum } from '../../utils/enums/http-methods.enum';
import { IOptions } from '../../utils/interfaces/options.interface';

export class Delete {
  constructor(
    private url: string,
    private path?: string,
    private options?: IOptions,
  ) {}
  async run() {
    const fullUrl = `${this.url}/${this.path}`;

    const response = await fetch(fullUrl, {
      method: HttpMethodsEnum.DELETE,
      headers: this.options?.headers as Record<string, string>,
    });

    if (!response.ok) {
      throw new Error('HTTP error:\n' + response.status);
    }

    return response.text();
  }
}
