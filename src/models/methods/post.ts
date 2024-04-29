import { IOptions } from '../../utils/interfaces/options.interface';
import { HttpMethodsEnum } from '../../utils/enums/http-methods.enum';
import { IResponse } from '../../utils/interfaces/response.interface';
import { LightieError } from '../handlers/lightie-error';

export class Post {
  constructor(
    private url: string,
    private path?: string,
    private options?: IOptions,
  ) {}
  async run(): Promise<IResponse> {
    const fullUrl = `${this.url}/${this.path}`;
    const BODY = JSON.stringify(this.options?.body);

    const HEADER = {
      'Content-Type': 'application/json',
      ...(this.options?.headers as Record<string, string>),
    };

    const response = await fetch(fullUrl, {
      method: HttpMethodsEnum.POST,
      body: BODY,
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
      data: JSON.parse(await response.text()),
      statusText: response.statusText,
    }
  }
}
