import slugify from 'slugify';

/**
 * Format the base to a slug
 *
 * @example
 * const productName = 'Black T-Shirt' // base
 *
 * const productSlug = getSlugBy(productName)
 * console.log(productSlug) // black-t-shirt
 */
export const getSlugBy = (base: string, options?: Options) => {
  return slugify(base, { lower: true, ...options });
};

type Options = {
  /**
   * @default '-'
   */
  replacement?: string;
};
