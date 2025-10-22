/**
 * Utility class to manage prices in vendyx
 */
export class VendyxPrice {
  /**
   * Utility function to convert a price in dollars to cents, this is useful for storing prices in the database as integers and avoiding floating point errors
   * @param price Price in dollar
   * @returns Price in cents
   *
   * @example
   * ```ts
   * const priceInDollars = 10.99;
   * const priceInCents = VendyxPrice.toCent(priceInDollars);
   * // priceInCents = 1099
   * ```
   *
   * @warning This function only has to be called when storing prices in the database or make operations with them, displaying prices in the frontend should use floats.
   */
  static toCent(price: number) {
    return price * 100;
  }

  /**
   * Utility function to convert a price in cents to dollars, this is useful for displaying prices in the frontend
   * @param price Price in cents
   * @returns Price in dollars
   *
   * @example
   * ```ts
   * const priceInCents = 1099;
   * const priceInDollars = VendyxPrice.toDollar(priceInCents);
   * // priceInDollars = 10.99
   * ```
   *
   * @warning This function only has to be called when displaying prices in the frontend, operations and storing process should use integers.
   */
  static toDollar(price: number) {
    return price / 100;
  }

  /**
   * Utility function to format a price in cents to a string with the currency symbol
   * @param price Price in cents
   * @returns Price formatted
   *
   * @example
   * ```ts
   * const priceInCents = 1099;
   * const priceFormatted = VendyxPrice.format(priceInCents);
   * // priceFormatted = $10.99
   * ```
   */
  static format(price: number) {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(VendyxPrice.toDollar(price));
  }

  /**
   * Convert formatted price to number
   *
   * @example
   * VendyxPrice.parse('$1,234.56') // 123456
   */
  static parse(price: string) {
    const parsedPrice = price;

    const decimals = Number(price.split('.')[1]);

    if (!decimals) {
      // if decimals are zero, remove them and remove all non-numeric characters (, . $)
      return Number(price.split('.')[0].replace(/[^0-9]/g, ''));
    } else {
      // if decimals are present, remove all non-numeric characters (, and $)
      return Number(parsedPrice.replace(/[^0-9.]/g, ''));
    }
  }
}

/**
 * Utility function to convert a price in dollars to cents, this is useful for storing prices in the database as integers and avoiding floating point errors
 * @param price Price in dollar
 * @returns Price in cents
 *
 * @example
 * ```ts
 * const priceInDollars = 10.99;
 * const priceInCents = convertToCent(priceInDollars);
 * // priceInCents = 1099
 * ```
 *
 * @warning This function only has to be called when storing prices in the database or make operations with them, displaying prices in the frontend should use floats.
 *
 * @deprecated
 */
export const convertToCent = (price: number) => {
  return price * 100;
};

/**
 * Utility function to convert a price in cents to dollars, this is useful for displaying prices in the frontend
 * @param price Price in cents
 * @returns Price in dollars
 *
 * @example
 * ```ts
 * const priceInCents = 1099;
 * const priceInDollars = convertToDollar(priceInCents);
 * // priceInDollars = 10.99
 * ```
 *
 * @warning This function only has to be called when displaying prices in the frontend, operations and storing process should use integers.
 *
 * @deprecated
 */
export const convertToDollar = (price: number) => {
  return price / 100;
};

/**
 * Utility function to format a price in cents to a string with the currency symbol
 * @param price Price in cents
 * @returns Price formatted
 *
 * @example
 * ```ts
 * const priceInCents = 1099;
 * const priceFormatted = formatPrice(priceInCents);
 * // priceFormatted = $10.99
 * ```
 *
 * @deprecated
 */
export const formatPrice = (price: number) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(convertToDollar(price));
};

/**
 * Convert formatted price to number
 *
 * @example
 * parsePrice('$1,234.56') // 123456
 *
 * @deprecated
 */
export const parsePrice = (price: string) => {
  const parsedPrice = price;

  const decimals = Number(price.split('.')[1]);

  if (!decimals) {
    // if decimals are zero, remove them and remove all non-numeric characters (, . $)
    return Number(price.split('.')[0].replace(/[^0-9]/g, ''));
  } else {
    // if decimals are present, remove all non-numeric characters (, and $)
    return Number(parsedPrice.replace(/[^0-9.]/g, ''));
  }
};
