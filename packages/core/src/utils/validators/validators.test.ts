import { isValidEmail, isValidPassword } from './validators';

describe('Validators', () => {
  describe('isValidEmail', () => {
    test('returns true for a valid email', () => {
      const validEmail = 'ellie.williams@us.com';

      expect(isValidEmail(validEmail)).toBe(true);
    });

    test('returns false for an invalid email', () => {
      const invalidEmail = 'user@domain!com';

      expect(isValidEmail(invalidEmail)).toBe(false);
    });

    test('returns false for an empty string', () => {
      const emptyEmail = '';

      expect(isValidEmail(emptyEmail)).toBe(false);
    });

    test('returns false for a string with only spaces', () => {
      const spaceEmail = '   ';

      expect(isValidEmail(spaceEmail)).toBe(false);
    });

    test('returns false for a null and undefined value', () => {
      const nullEmail = null as unknown as string;
      const undefinedEmail = undefined as unknown as string;

      expect(isValidEmail(nullEmail)).toBe(false);
      expect(isValidEmail(undefinedEmail)).toBe(false);
    });
  });

  describe('isValidPassword', () => {
    test('returns true for a valid password', () => {
      const validPassword = 'strong_password';

      expect(isValidPassword(validPassword)).toBe(true);
    });

    test('returns false for a password shorter than 8 characters', () => {
      const shortPassword = 'short';

      expect(isValidPassword(shortPassword)).toBe(false);
    });

    test('returns false for an empty string', () => {
      const emptyPassword = '';

      expect(isValidPassword(emptyPassword)).toBe(false);
    });

    test('returns false for a string with only spaces', () => {
      const spacePassword = '   ';

      expect(isValidPassword(spacePassword)).toBe(false);
    });

    test('returns false for a null and undefined value', () => {
      const nullPassword = null as unknown as string;
      const undefinedPassword = undefined as unknown as string;

      expect(isValidPassword(nullPassword)).toBe(false);
      expect(isValidPassword(undefinedPassword)).toBe(false);
    });
  });
});
