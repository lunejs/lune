import { ErrorResult, isErrorResult } from './error-result';

describe('isErrorResult', () => {
  test('returns true when is an instance of ErrorResult', () => {
    class CustomError extends ErrorResult<string> {}
    const errorInstance = new CustomError('Test', 'ERROR_CODE', 'An error occurred');

    expect(isErrorResult(errorInstance)).toBe(true);
  });

  test('returns false when not an instance of ErrorResult', () => {
    const nonErrorInstance = { code: 'ERROR_CODE', message: 'An error occurred' };

    expect(isErrorResult(nonErrorInstance)).toBe(false);
  });
});
