export const hasValue = <T>(a: T): a is NonNullable<T> => Boolean(a);
