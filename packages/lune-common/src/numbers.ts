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
