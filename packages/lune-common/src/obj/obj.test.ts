import { clean, equals } from './obj';

describe('Obj', () => {
  describe('clean', () => {
    test('returns object with null properties as undefined', () => {
      const obj = {
        foo: null,
        bar: null
      };

      expect(clean(obj)).toEqual({
        foo: undefined,
        bar: undefined
      });
    });

    test('returns object with null properties as undefined while preserving other values', () => {
      const obj = {
        first: 'name',
        is: true,
        take: 1,
        length: [],
        obj: {},
        foo: null,
        bar: null
      };

      expect(clean(obj)).toEqual({
        first: 'name',
        is: true,
        take: 1,
        length: [],
        obj: {},
        foo: undefined,
        bar: undefined
      });
    });
  });

  describe('equals', () => {
    test('returns true when both of the provide objects are deep equal', () => {
      const obj1 = {
        user: { name: 'sam', age: 23 },
        favorites: [{ id: 1 }, { id: 2 }]
      };

      const obj2 = {
        user: { name: 'sam', age: 23 },
        favorites: [{ id: 1 }, { id: 2 }]
      };

      expect(equals(obj1, obj2)).toBe(true);
    });

    test('returns false when both of the provide objects are not deep equal', () => {
      const obj1 = {
        user: { name: 'sam', age: 23 },
        favorites: [{ id: 1 }, { id: 2 }]
      };

      const obj2 = {
        user: { name: 'sam', age: 24 },
        favorites: [{ id: 1 }, { id: 2 }]
      };

      expect(equals(obj1, obj2)).toBe(false);
    });
  });
});
