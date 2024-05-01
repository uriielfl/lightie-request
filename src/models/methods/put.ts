import { IOptions } from '../../utils/interfaces/options.interface';
import { HttpMethodsEnum } from '../../utils/enums/http-methods.enum';
import { LightieError } from '../handlers/lightie-error';
import { IResponse } from '../../utils/interfaces/response.interface';
import { Validator } from '../helpers/validators';

export class Put extends Validator {
  constructor(
    public url: string,
    public path?: string,
    public options?: IOptions,
  ) {
    super(url, path, options);
  }
  async run(): Promise<IResponse> {
    const fullUrl = `${this.url}/${this.path}`;
    const BODY = JSON.stringify(this.options?.body);

    const HEADER = {
      'Content-Type': 'application/json',
      ...(this.options?.headers as Record<string, string>),
    };

    const response = await fetch(fullUrl, {
      method: HttpMethodsEnum.PUT,
      body: BODY,
      headers: HEADER,
    });

    if (!response.ok) {
      const errorData = await response.json();

      throw new LightieError(response.status, response.statusText, errorData);
    }

    return {
      status: response.status,
      data: JSON.parse(await response.text()),
      statusText: response.statusText,
    };
  }
}
