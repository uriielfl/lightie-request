import { HttpMethodsEnum } from '../../utils/enums/http-methods.enum';
import { IOptions } from '../../utils/interfaces/options.interface';
import { LightieError } from '../handlers/lightie-error';

export class Head {
  constructor(
    public url: string,
    public path?: string,
    public options?: IOptions,
  ) {}

  async run() {
    const fullUrl = `${this.url}/${this.path}`;

    const HEADER = {
      'Content-Type': 'application/json',
      ...(this.options?.headers as Record<string, string>),
    };

    const response = await fetch(fullUrl, {
      method: HttpMethodsEnum.HEAD,
      headers: HEADER,
    });

    if (!response.ok) {
      const errorData = response.headers;

      throw new LightieError(response.status, response.statusText, errorData);
    }

    let data;
    if (response.headers.get('content-type')?.includes('application/json')) {
      data = await response.json();
    } else {
      data = await response.text();
    }
    return {
      status: response.status,
      statusText: response.statusText,
      headers: response.headers,
      data,
    };
  }
}
