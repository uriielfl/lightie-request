import { error } from 'console';
import { HttpMethodsEnum } from '../../utils/enums/http-methods.enum';
import { IOptions } from '../../utils/interfaces/options.interface';
import { LightieError } from '../handlers/lightie-error';
import { IResponse } from '../../utils/interfaces/response.interface';

export class Get {
  constructor(
    private url: string,
    private path?: string,
    private options?: IOptions,
  ) {}
  async run() : Promise<IResponse> {
    const fullUrl = `${this.url}/${this.path}`;

    const HEADER = {
      'Content-Type': 'application/json',
      ...(this.options?.headers as Record<string, string>),
    };

    const response = await fetch(fullUrl, {
      method: HttpMethodsEnum.GET,
      headers: HEADER,
    });

    if (!response.ok) {
      const errorData = await response.json();

      throw new LightieError(
        response.status,
        response.statusText,
        errorData,
      );
    }

    return {
      status: response.status,
      statusText: response.statusText,
      data: JSON.parse(await response.text()),
    };
  }
}
