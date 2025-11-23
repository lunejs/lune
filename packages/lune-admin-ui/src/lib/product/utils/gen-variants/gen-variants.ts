// ============================================
// TYPES
// ============================================

type OptionValue = {
  id: string;
  name: string;
};

type Option = {
  id: string;
  name: string;
  values: OptionValue[];
};

type Variant = {
  id: string;
  values: OptionValue[];
  price: string;
  stock: number;
  selected: boolean;
};

/**
 * Variant with an action field indicating what operation should be performed
 * - 'create': Variant needs to be created in the database
 * - 'none': Variant already exists with matching option values
 */
export type VariantWithAction = Variant & {
  action: 'create' | 'update' | 'none';
};

// ============================================
// MAIN FUNCTION
// ============================================

/**
 * Generate all possible variants based on the provided options.
 *
 * @description
 * Generates variants using an iterative cartesian product algorithm.
 * Matches existing variants by option value IDs (not names) to preserve data.
 * The action property is used to determine if the variant should be created or kept as-is.
 *
 * - If 'create', it means the variant combination is new and should be created in the database.
 * - If 'none', it means the variant already exists with matching option values.
 *
 * This approach ensures data persistence for existing variants while generating new ones.
 *
 * const options = [
 *   { id: '1', name: 'Color', values: [{ id: 'red', name: 'Red' }, { id: 'blue', name: 'Blue' }] },
 *   { id: '2', name: 'Size', values: [{ id: 's', name: 'S' }, { id: 'm', name: 'M' }] }
 * ];
 *
 * const existingVariants = [
 *   { id: 'v1', values: [{ id: 'red', name: 'Red' }, { id: 's', name: 'S' }], price: '10.00', stock: 10 }
 * ];
 *
 * const variants = genVariants(options, existingVariants);
 *
 * // Result:
 * // [
 * //   { id: 'v1', values: [Red, S], price: '10.00', stock: 10, action: 'none' },  // Preserved
 * //   { id: '...', values: [Red, M], price: '', stock: 0, action: 'create' },     // New
 * //   { id: '...', values: [Blue, S], price: '', stock: 0, action: 'create' },    // New
 * //   { id: '...', values: [Blue, M], price: '', stock: 0, action: 'create' }     // New
 * // ]
 */
export function genVariants(options: Option[], existingVariants: Variant[]): VariantWithAction[] {
  // Edge case: no options or empty values
  if (options.length === 0 || options.some(o => o.values.length === 0)) {
    return [];
  }

  // 1. Generate cartesian product (all possible combinations)
  const combinations = cartesianProduct(options);

  // 2. Create index of existing variants by their option values for O(1) lookup
  const variantIndex = indexVariantsByValues(existingVariants);

  // 3. Map each combination to a variant with action
  return combinations.map(combo => {
    const key = createKey(combo);
    const existing = variantIndex.get(key);

    // Does not exist → CREATE (new combination)
    if (!existing) {
      return {
        id: Math.random().toString(),
        action: 'create',
        values: combo,
        price: '',
        stock: 0,
        selected: false
      };
    }

    // Exists exactly → NONE (preserve all data)
    return {
      ...existing,
      action: 'none',
      values: combo // Keep order updated
    };
  });
}

// ============================================
// HELPERS
// ============================================

/**
 * Iterative cartesian product (simpler than recursive approach)
 *
 * @description
 * Generates combinations grouped by the first option values.
 * This ordering is important for UI display, as it keeps all variants
 * of the same first option value together.
 *
 * @example
 * Input: Color [Red, Blue] × Size [S, M, XL]
 * Output: [Red,S], [Red,M], [Red,XL], [Blue,S], [Blue,M], [Blue,XL]
 *         (all Red variants together, then all Blue variants)
 *
 * Step by step:
 * Initial: [[]]
 *
 * Option 1 - Color: [Red, Blue]
 *   combo=[], value=Red  → [Red]
 *   combo=[], value=Blue → [Blue]
 * result = [[Red], [Blue]]
 *
 * Option 2 - Size: [S, M]
 *   combo=[Red], value=S  → [Red, S]
 *   combo=[Red], value=M  → [Red, M]
 *   combo=[Blue], value=S → [Blue, S]
 *   combo=[Blue], value=M → [Blue, M]
 * result = [[Red,S], [Red,M], [Blue,S], [Blue,M]]
 */
function cartesianProduct(options: Option[]): OptionValue[][] {
  let result: OptionValue[][] = [[]];

  for (const option of options) {
    const temp: OptionValue[][] = [];

    for (const combo of result) {
      for (const value of option.values) {
        temp.push([...combo, value]);
      }
    }

    result = temp;
  }

  return result;
}

/**
 * Create an index of variants by their option values for O(1) lookup
 *
 * @description
 * Converts an array of variants into a Map where:
 * - Key: unique string created from sorted option value IDs (e.g., "red|s")
 * - Value: the complete variant object
 *
 * This allows finding matching variants in O(1) time instead of O(n).
 *
 * Input: [
 *   { id: 'v1', values: [{ id: 'red' }, { id: 's' }], price: '10.00' },
 *   { id: 'v2', values: [{ id: 'blue' }, { id: 'm' }], price: '12.00' }
 * ]
 * Output: Map {
 *   'red|s' => { id: 'v1', values: [...], price: '10.00' },
 *   'blue|m' => { id: 'v2', values: [...], price: '12.00' }
 * }
 */
function indexVariantsByValues(variants: Variant[]): Map<string, Variant> {
  const index = new Map<string, Variant>();

  for (const variant of variants) {
    const key = createKey(variant.values);
    index.set(key, variant);
  }

  return index;
}

/**
 * Create a unique key for a combination of option values
 *
 * @description
 * Generates a unique string key from option value IDs.
 * Uses sorting to ensure the same combination always produces the same key,
 * regardless of the order of values in the array.
 *
 * [{ id: 'red' }, { id: 's' }] → "red|s"
 * [{ id: 's' }, { id: 'red' }] → "red|s" (same key due to sorting)
 *
 * Why sort? So that these two produce the same key:
 * - [Red, S] → "red|s"
 * - [S, Red] → "red|s" (matches!)
 */
function createKey(values: OptionValue[]): string {
  return values
    .map(v => v.id)
    .sort()
    .join('|');
}
