import { z } from 'zod';

export function isValidEmail(email: string) {
  return z.email().safeParse(email).success;
}

export function isValidPassword(password: string) {
  return z.string().min(8).safeParse(password).success;
}

export const isValidTimezone = (timezone: string): boolean => {
  try {
    Intl.DateTimeFormat(undefined, { timeZone: timezone });
    return true;
  } catch {
    return false;
  }
};
