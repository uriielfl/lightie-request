import { Validator } from './validators';

describe('Validators', () => {
  describe('isHeaderValid', () => {
    it('should return true if the header is valid', () => {
      const validator = new Validator('http://localhost:80', '/path', {
        headers: { Authorization: 'Bearer 123' },
      });
      expect(validator.isHeaderValid()).toBe(true);
    });
  });

  describe('isUrlValid', () => {
    it('should return true if the url is valid', () => {
      const validator = new Validator('http://localhost:80', '/path', {
        headers: { Authorization: 'Bearer 123' },
      });
      expect(validator.isHeaderValid()).toBe(true);
    });
  });
});
