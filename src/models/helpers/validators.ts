import { IOptions } from '../../utils/interfaces/options.interface';
import { isHeaderValid, isUrlValid } from '../../utils/validators/validators';

export class Validator {
  constructor(
    protected url: string,
    protected path?: string,
    protected options?: IOptions,
  ) {
    this.isUrlValid();
    this.isHeaderValid();
  }

  isUrlValid() {
    const url = new URL(this.url);
    return isUrlValid(`${url.protocol}//${url.hostname}`);
  }

  isHeaderValid() {
    if (this.options?.headers) {
      return isHeaderValid(this.options.headers);
    }
    return true;
  }
}
