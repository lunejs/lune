import { ApiKey } from './api-key';

describe('ApiKey', () => {
  test('generates a valid API key', () => {
    const key = ApiKey.generate();
    expect(typeof key).toBe('string');
    expect(key.startsWith('VXSK_')).toBe(true);
    expect(ApiKey.validate(key)).toBe(true);
  });

  test('rejects keys with invalid checksum', () => {
    const key = ApiKey.generate();
    const tampered = key.replace(/.$/, c => (c === 'A' ? 'B' : 'A')); // cambia el último char
    expect(ApiKey.validate(tampered)).toBe(false);
  });

  test('rejects keys with invalid format', () => {
    const invalid = '1234_not_a_valid_key';
    expect(ApiKey.validate(invalid)).toBe(false);
  });

  test('rejects keys with missing parts', () => {
    const missingChecksum = ApiKey.generate().split('_').slice(0, 2).join('_');
    expect(ApiKey.validate(missingChecksum)).toBe(false);
  });

  test('generates unique keys across multiple calls', () => {
    const iterations = 1000;
    const keys = new Set<string>();

    for (let i = 0; i < iterations; i++) {
      const key = ApiKey.generate();
      expect(keys.has(key)).toBe(false);
      keys.add(key);
    }

    expect(keys.size).toBe(iterations);
  });
});
