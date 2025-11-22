import { isArray, isFirst, isLast } from './arrays';

describe('Array', () => {
  describe('isLast', () => {
    test('returns true when provided index is in fact the last index of the array', () => {
      expect(isLast(3, [1, 2, 3, 4])).toBe(true);
    });

    test('returns false when provided index is not the last index of the array', () => {
      expect(isLast(1, [1, 2, 3, 4])).toBe(false);
    });
  });

  describe('isFirst', () => {
    test('returns true if provided index is equals to 0', () => {
      expect(isFirst(0)).toBe(true);
    });

    test('returns false if provided index is other value than 0', () => {
      expect(isFirst(8)).toBe(false);
    });
  });

  describe('isArray', () => {
    test('returns true if provided value is an array', () => {
      expect(isArray([])).toBe(true);
      expect(isArray(new Array())).toBe(true);
    });

    test('returns false if provided value is not an array', () => {
      expect(isArray('')).toBe(false);
      expect(isArray(1)).toBe(false);
      expect(isArray(true)).toBe(false);
      expect(isArray(Symbol)).toBe(false);
    });
  });
});
