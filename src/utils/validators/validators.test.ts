import { IHeaderRequest } from '../interfaces/header.interface';
import { isHeaderValid, isUrlValid } from './validators';

describe('Validators', () => {
  describe('isHeaderValid', () => {
    it('should return true if the header is valid', () => {
      expect(isHeaderValid({ Authorization: 'Bearer 123' })).toBe(true);
    });

    it('should throw error if the header is not valid', () => {
      try {
        isHeaderValid('Content-Type-' as unknown as IHeaderRequest);
      } catch (error) {
        expect(error).toEqual(new Error('Invalid headers'));
      }
    });
  });

  describe('isUrlValid', () => {
    it('should return true if the url is valid', () => {
      expect(isUrlValid('https://www.google.com')).toBe(true);
    });

    it('should throw error if the url is not valid', () => {
      try {
        isUrlValid('google-.COM');
      } catch (error) {
        expect(error).toEqual(new Error('Invalid URL'));
      }
    });
  });
});
