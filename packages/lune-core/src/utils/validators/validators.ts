import { z } from 'zod';

export function isValidEmail(email: string) {
  return z.string().email().safeParse(email).success;
}

export function isValidPassword(password: string) {
  return z.string().min(8).safeParse(password).success;
}
