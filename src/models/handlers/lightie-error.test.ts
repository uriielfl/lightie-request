import { LightieError } from "./lightie-error";

describe('LightieError handler', () => {
    it('should create an instance of LightieError with default values', () => {
        const error = new LightieError(404);
        expect(error).toBeInstanceOf(LightieError);
        
        expect(error.status).toBe(404);
        expect(error.statusText).toBe('No status text provided');
        expect(error.message).toBe('No message provided');
    });
});