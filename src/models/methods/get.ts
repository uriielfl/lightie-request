import { HttpMethodsEnum } from '../../utils/enums/http-methods.enum';
import { IOptions } from '../../utils/interfaces/options.interface';

export class Get {
  constructor(
    private url: string,
    private path?: string,
    private options?: IOptions,
  ) {}
  async run() {
    const fullUrl = `${this.url}/${this.path}`;

    const HEADER = {
      'Content-Type': 'application/json',
      ...(this.options?.headers as Record<string, string>),
    };

    const response = await fetch(fullUrl, {
      method: HttpMethodsEnum.GET,
      headers: HEADER
    });

    if (!response.ok) {
      throw new Error('HTTP error:\n' + response.status);
    }
    
    return {
      status: response.status,
      data: JSON.parse(await response.text())
    }
  }
}
