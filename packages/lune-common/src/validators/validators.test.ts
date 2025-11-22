import { isNumber, isTruthy, isUUID } from './validators';

describe('Validators', () => {
  describe('isUUID', () => {
    test('returns true if provided value is a uuid', () => {
      expect(isUUID('09c71f74-e934-4067-a2e9-cffdf1ca7aa0')).toBe(true);
    });

    test('returns false if provided value is not a uuid', () => {
      expect(isUUID('invalid-uuid')).toBe(false);
    });
  });

  describe('isTruthy', () => {
    test('returns true if provided value is truthy', () => {
      expect(isTruthy(true)).toBe(true);
      expect(isTruthy('value')).toBe(true);
      expect(isTruthy(1)).toBe(true);
      expect(isTruthy([])).toBe(true);
      expect(isTruthy({})).toBe(true);
    });

    test('returns false if provided value is not truthy', () => {
      expect(isTruthy(false)).toBe(false);
      expect(isTruthy('')).toBe(false);
      expect(isTruthy(0)).toBe(false);
      expect(isTruthy(null)).toBe(false);
      expect(isTruthy(undefined)).toBe(false);
    });
  });

  describe('isNumber', () => {
    test('returns true if provided value is a valid number', () => {
      expect(isNumber(123)).toBe(true);
      expect(isTruthy(1.23)).toBe(true);
    });

    test('returns true if provided value is not a valid number', () => {
      expect(isNumber('123')).toBe(false);
      expect(isNumber(Infinity)).toBe(false);
    });
  });
});
