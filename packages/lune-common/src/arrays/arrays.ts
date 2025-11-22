/**
 * @description
 * Returns true if `index` is the last one from the `array`
 *
 * @example
 * isLast(3, [1,2,3,4]) // true
 * isLast(2, [1,2,3,4]) // false
 */
export const isLast = (index: number, array: unknown[]) => index === array.length - 1;

/**
 * @description
 * Returns true if `index` is equals to 0
 *
 * @example
 * isFirst(0) // true
 * isFirst(1) // false
 */
export const isFirst = (index: number) => index === 0;

/**
 * @description
 * Returns true if `arr` is an array
 *
 * @example
 * isArray([]) // true
 * isArray(1) // false
 */
export const isArray = (arr: any): arr is any[] => Array.isArray(arr);
