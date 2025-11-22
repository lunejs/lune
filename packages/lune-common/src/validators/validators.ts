/**
 * Returns true if provided value is a valid UUID
 */
export const isUUID = (value: string) => {
  return /^[0-9a-f]{8}-[0-9a-f]{4}-[0-5][0-9a-f]{3}-[089ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(value);
};

/**
 * Returns true if provided value is a truthy
 */
export const isTruthy = <T>(a: T): a is NonNullable<T> => Boolean(a);

/**
 * Validates if the value is a type number and is finite
 *
 * @example
 *
 * isNumber(123)      // true
 * isNumber(1.23)     // true
 * isNumber("123")    // false
 * isNumber(Infinity) // false
 */
export const isNumber = (value: any): value is number => {
  return typeof value === 'number' && Number.isFinite(value);
};
