import { LunePrice } from './lune-price';

describe('LunePrices', () => {
  describe('toCent', () => {
    test('returns dollars in cents', () => {
      expect(LunePrice.toCent(1899)).toBe(189900);
      expect(LunePrice.toCent(0)).toBe(0);
    });

    test('returns dollars as rounded cents', () => {
      expect(LunePrice.toCent(10.99)).toBe(1099);
      expect(LunePrice.toCent(10.3399999)).toBe(1034);
    });
  });

  describe('toDollar', () => {
    test('returns cents in dollars', () => {
      expect(LunePrice.toDollar(1034)).toBe(10.34);
      expect(LunePrice.toDollar(189900)).toBe(1_899.0);
      expect(LunePrice.toDollar(0)).toBe(0);
    });
  });

  describe('format', () => {
    test('returns formatted price', () => {
      expect(LunePrice.format(1099)).toBe('$10.99');
      expect(LunePrice.format(100)).toBe('$1.00');
      expect(LunePrice.format(127389900)).toBe('$1,273,899.00');
    });
  });

  describe('parse', () => {
    test('returns the numeric value of a formatted price', () => {
      expect(LunePrice.parse('$1,234.56')).toBe(1234.56);
    });
  });
});
