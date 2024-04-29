import { StatusCodeEnum } from '../../utils/enums/status-code.enum';
import { StatusTextEnum } from '../../utils/enums/status-text.enum';
import { LightieError } from './lightie-error';

describe('LightieError handler', () => {
  it('should create an instance of LightieError with default values', () => {
    const error = new LightieError(StatusCodeEnum.NOT_FOUND);
    expect(error).toBeInstanceOf(LightieError);

    expect(error.status).toBe(StatusCodeEnum.NOT_FOUND);
    expect(error.statusText).toBe(StatusTextEnum._404);
    expect(error.message).toBe('No message provided');
  });

  it('should create an instance of LightieError with values coming from server', () => {
    const error = new LightieError(
      StatusCodeEnum.INTERNAL_SERVER_ERROR,
      StatusTextEnum._500,
      'Internal Server Error',
    );
    expect(error).toBeInstanceOf(LightieError);

    expect(error.status).toBe(StatusCodeEnum.INTERNAL_SERVER_ERROR);
    expect(error.statusText).toBe(StatusTextEnum._500);
    expect(error.message).toBe('Internal Server Error');
  });

  it('should use default status text if status is not in StatusTextEnum', () => {
    const error = new LightieError(999);
    expect(error).toBeInstanceOf(LightieError);

    expect(error.status).toBe(999);
    expect(error.statusText).toBe('Unknown Status');
    expect(error.message).toBe('No message provided');
  });
});
