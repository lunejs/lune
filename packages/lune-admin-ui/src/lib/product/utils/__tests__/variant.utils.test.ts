/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { describe, expect, test } from 'vitest';

import type { VariantContext } from '../../components/product-details/variants/variants.context';
import { generateVariants } from '../variant.utils';

describe('generateVariants', () => {
  describe('Basic generation', () => {
    test('generates variants from 1 option with 2 values', () => {
      const options: VariantContext['options'] = [
        {
          id: '1',
          isEditing: false,
          name: 'Size',
          values: [
            { id: 'v1', name: 'S' },
            { id: 'v2', name: 'M' }
          ]
        }
      ];

      const result = generateVariants(options, []);

      expect(result).toHaveLength(2);
      expect(result[0].values).toEqual([{ id: 'v1', name: 'S' }]);
      expect(result[1].values).toEqual([{ id: 'v2', name: 'M' }]);
      expect(result[0].action).toBe('create');
      expect(result[1].action).toBe('create');
    });

    test('generates variants from 1 option with 3 values', () => {
      const options: VariantContext['options'] = [
        {
          id: '1',
          isEditing: false,
          name: 'Size',
          values: [
            { id: 'v1', name: 'S' },
            { id: 'v2', name: 'M' },
            { id: 'v3', name: 'L' }
          ]
        }
      ];

      const result = generateVariants(options, []);

      expect(result).toHaveLength(3);
      expect(result[0].values).toEqual([{ id: 'v1', name: 'S' }]);
      expect(result[1].values).toEqual([{ id: 'v2', name: 'M' }]);
      expect(result[2].values).toEqual([{ id: 'v3', name: 'L' }]);
      expect(result.every(v => v.action === 'create')).toBe(true);
    });

    test('generates variants from 2 options (cartesian product)', () => {
      const options: VariantContext['options'] = [
        {
          id: '1',
          isEditing: false,
          name: 'Size',
          values: [
            { id: 'v1', name: 'S' },
            { id: 'v2', name: 'M' }
          ]
        },
        {
          id: '2',
          isEditing: false,
          name: 'Color',
          values: [
            { id: 'v3', name: 'Red' },
            { id: 'v4', name: 'Blue' }
          ]
        }
      ];

      const result = generateVariants(options, []);

      // Should generate 2 x 2 = 4 variants
      expect(result).toHaveLength(4);

      // Verify cartesian product
      expect(result[0].values).toEqual([
        { id: 'v1', name: 'S' },
        { id: 'v3', name: 'Red' }
      ]);
      expect(result[1].values).toEqual([
        { id: 'v1', name: 'S' },
        { id: 'v4', name: 'Blue' }
      ]);
      expect(result[2].values).toEqual([
        { id: 'v2', name: 'M' },
        { id: 'v3', name: 'Red' }
      ]);
      expect(result[3].values).toEqual([
        { id: 'v2', name: 'M' },
        { id: 'v4', name: 'Blue' }
      ]);

      expect(result.every(v => v.action === 'create')).toBe(true);
    });

    test('generates variants from 3 options (cartesian product)', () => {
      const options: VariantContext['options'] = [
        {
          id: '1',
          isEditing: false,
          name: 'Size',
          values: [
            { id: 'v1', name: 'S' },
            { id: 'v2', name: 'M' }
          ]
        },
        {
          id: '2',
          isEditing: false,
          name: 'Color',
          values: [
            { id: 'v3', name: 'Red' },
            { id: 'v4', name: 'Blue' }
          ]
        },
        {
          id: '3',
          isEditing: false,
          name: 'Material',
          values: [
            { id: 'v5', name: 'Cotton' },
            { id: 'v6', name: 'Polyester' }
          ]
        }
      ];

      const result = generateVariants(options, []);

      // Should generate 2 x 2 x 2 = 8 variants
      expect(result).toHaveLength(8);

      // Verify first variant has all 3 option values
      expect(result[0].values).toHaveLength(3);
      expect(result[0].values).toEqual([
        { id: 'v1', name: 'S' },
        { id: 'v3', name: 'Red' },
        { id: 'v5', name: 'Cotton' }
      ]);

      expect(result.every(v => v.action === 'create')).toBe(true);
    });
  });

  describe('Data persistence', () => {
    test('persists variant data when variant already exists', () => {
      const options: VariantContext['options'] = [
        {
          id: '1',
          isEditing: false,
          name: 'Size',
          values: [
            { id: 'v1', name: 'S' },
            { id: 'v2', name: 'M' }
          ]
        }
      ];

      const existingVariants: VariantContext['variants'] = [
        {
          id: 'existing-1',
          values: [{ id: 'v1', name: 'S' }],
          price: '25.99',
          stock: 100,
          sku: 'SKU-S',
          selected: false
        }
      ];

      const result = generateVariants(options, existingVariants);

      expect(result).toHaveLength(2);

      // First variant should have persisted data
      expect(result[0].id).toBe('existing-1');
      expect(result[0].price).toBe('25.99');
      expect(result[0].stock).toBe(100);
      expect(result[0].sku).toBe('SKU-S');
      expect(result[0].action).toBe('none');

      // Second variant is new
      expect(result[1].id).not.toBe('existing-1');
      expect(result[1].price).toBe('0');
      expect(result[1].stock).toBe(0);
      expect(result[1].action).toBe('create');
    });

    test('persists data when adding new option to existing variants', () => {
      const options: VariantContext['options'] = [
        {
          id: '1',
          isEditing: false,
          name: 'Size',
          values: [
            { id: 'v1', name: 'S' },
            { id: 'v2', name: 'M' }
          ]
        },
        {
          id: '2',
          isEditing: false,
          name: 'Color',
          values: [
            { id: 'v3', name: 'Red' },
            { id: 'v4', name: 'Blue' }
          ]
        }
      ];

      const existingVariants: VariantContext['variants'] = [
        {
          id: 'existing-1',
          values: [{ id: 'v1', name: 'S' }],
          price: '19.99',
          stock: 50,
          selected: false
        },
        {
          id: 'existing-2',
          values: [{ id: 'v2', name: 'M' }],
          price: '29.99',
          stock: 75,
          selected: false
        }
      ];

      const result = generateVariants(options, existingVariants);

      // Should generate 2 x 2 = 4 variants
      expect(result).toHaveLength(4);

      // Find S/Red variant - should have persisted data from 'S'
      const sRed = result.find(v => v.values[0].name === 'S' && v.values[1].name === 'Red');
      expect(sRed).toBeDefined();
      expect(sRed!.id).toBe('existing-1');
      expect(sRed!.price).toBe('19.99');
      expect(sRed!.stock).toBe(50);
      expect(sRed!.action).toBe('update');

      // Find S/Blue variant - should be new (no data to persist)
      const sBlue = result.find(v => v.values[0].name === 'S' && v.values[1].name === 'Blue');
      expect(sBlue).toBeDefined();
      expect(sBlue!.price).toBe('0');
      expect(sBlue!.stock).toBe(0);
      expect(sBlue!.action).toBe('create');

      // Find M/Red variant - should have persisted data from 'M'
      const mRed = result.find(v => v.values[0].name === 'M' && v.values[1].name === 'Red');
      expect(mRed).toBeDefined();
      expect(mRed!.id).toBe('existing-2');
      expect(mRed!.price).toBe('29.99');
      expect(mRed!.stock).toBe(75);
      expect(mRed!.action).toBe('update');

      // Find M/Blue variant - should be new
      const mBlue = result.find(v => v.values[0].name === 'M' && v.values[1].name === 'Blue');
      expect(mBlue).toBeDefined();
      expect(mBlue!.price).toBe('0');
      expect(mBlue!.action).toBe('create');
    });

    test('persists data when adding new value to existing option', () => {
      const options: VariantContext['options'] = [
        {
          id: '1',
          isEditing: false,
          name: 'Size',
          values: [
            { id: 'v1', name: 'S' },
            { id: 'v2', name: 'M' }
          ]
        },
        {
          id: '2',
          isEditing: false,
          name: 'Color',
          values: [
            { id: 'v3', name: 'Red' },
            { id: 'v4', name: 'Blue' },
            { id: 'v5', name: 'Green' } // New value
          ]
        }
      ];

      const existingVariants: VariantContext['variants'] = [
        {
          id: 'existing-1',
          values: [
            { id: 'v1', name: 'S' },
            { id: 'v3', name: 'Red' }
          ],
          price: '19.99',
          stock: 50,
          selected: false
        },
        {
          id: 'existing-2',
          values: [
            { id: 'v1', name: 'S' },
            { id: 'v4', name: 'Blue' }
          ],
          price: '24.99',
          stock: 75,
          selected: false
        },
        {
          id: 'existing-3',
          values: [
            { id: 'v2', name: 'M' },
            { id: 'v3', name: 'Red' }
          ],
          price: '29.99',
          stock: 100,
          selected: false
        },
        {
          id: 'existing-4',
          values: [
            { id: 'v2', name: 'M' },
            { id: 'v4', name: 'Blue' }
          ],
          price: '34.99',
          stock: 125,
          selected: false
        }
      ];

      const result = generateVariants(options, existingVariants);

      // Should generate 2 x 3 = 6 variants
      expect(result).toHaveLength(6);

      // All existing variants should maintain their data
      const sRed = result.find(v => v.values[0].name === 'S' && v.values[1].name === 'Red');
      expect(sRed!.price).toBe('19.99');
      expect(sRed!.stock).toBe(50);
      expect(sRed!.action).toBe('none');

      const sBlue = result.find(v => v.values[0].name === 'S' && v.values[1].name === 'Blue');
      expect(sBlue!.price).toBe('24.99');
      expect(sBlue!.stock).toBe(75);
      expect(sBlue!.action).toBe('none');

      const mRed = result.find(v => v.values[0].name === 'M' && v.values[1].name === 'Red');
      expect(mRed!.price).toBe('29.99');
      expect(mRed!.stock).toBe(100);
      expect(mRed!.action).toBe('none');

      const mBlue = result.find(v => v.values[0].name === 'M' && v.values[1].name === 'Blue');
      expect(mBlue!.price).toBe('34.99');
      expect(mBlue!.stock).toBe(125);
      expect(mBlue!.action).toBe('none');

      // New variants should have default values
      const sGreen = result.find(v => v.values[0].name === 'S' && v.values[1].name === 'Green');
      expect(sGreen!.price).toBe('0');
      expect(sGreen!.stock).toBe(0);
      expect(sGreen!.action).toBe('create');

      const mGreen = result.find(v => v.values[0].name === 'M' && v.values[1].name === 'Green');
      expect(mGreen!.price).toBe('0');
      expect(mGreen!.stock).toBe(0);
      expect(mGreen!.action).toBe('create');
    });
  });

  describe('Partial variant deletion scenarios', () => {
    test('handles partially deleted variants when adding new option', () => {
      // Start with Size (S, M) × Color (Red, Blue) = 4 variants
      // User manually deletes S/Blue and M/Red
      // Only S/Red and M/Blue remain
      const existingVariants: VariantContext['variants'] = [
        {
          id: 'existing-1',
          values: [
            { id: 'v1', name: 'S' },
            { id: 'v3', name: 'Red' }
          ],
          price: '19.99',
          stock: 50,
          sku: 'S-RED',
          selected: false
        },
        {
          id: 'existing-2',
          values: [
            { id: 'v2', name: 'M' },
            { id: 'v4', name: 'Blue' }
          ],
          price: '34.99',
          stock: 125,
          sku: 'M-BLUE',
          selected: false
        }
      ];

      // Now add a third option: Material
      const options: VariantContext['options'] = [
        {
          id: '1',
          isEditing: false,
          name: 'Size',
          values: [
            { id: 'v1', name: 'S' },
            { id: 'v2', name: 'M' }
          ]
        },
        {
          id: '2',
          isEditing: false,
          name: 'Color',
          values: [
            { id: 'v3', name: 'Red' },
            { id: 'v4', name: 'Blue' }
          ]
        },
        {
          id: '3',
          isEditing: false,
          name: 'Material',
          values: [
            { id: 'v5', name: 'Cotton' },
            { id: 'v6', name: 'Polyester' }
          ]
        }
      ];

      const result = generateVariants(options, existingVariants);

      // Should generate 2 × 2 × 2 = 8 variants
      expect(result).toHaveLength(8);

      // S/Red/Cotton - First use of S/Red base → 'update' (persists data)
      const sRedCotton = result.find(
        v => v.values[0].name === 'S' && v.values[1].name === 'Red' && v.values[2].name === 'Cotton'
      );
      expect(sRedCotton).toBeDefined();
      expect(sRedCotton!.id).toBe('existing-1');
      expect(sRedCotton!.price).toBe('19.99');
      expect(sRedCotton!.stock).toBe(50);
      expect(sRedCotton!.sku).toBe('S-RED');
      expect(sRedCotton!.action).toBe('update');

      // S/Red/Polyester - Second use of S/Red base → 'create' (base already used)
      const sRedPoly = result.find(
        v =>
          v.values[0].name === 'S' && v.values[1].name === 'Red' && v.values[2].name === 'Polyester'
      );
      expect(sRedPoly).toBeDefined();
      expect(sRedPoly!.price).toBe('0');
      expect(sRedPoly!.stock).toBe(0);
      expect(sRedPoly!.action).toBe('create');

      // S/Blue/Cotton - S/Blue doesn't exist in existing variants → 'create'
      const sBlueCotton = result.find(
        v =>
          v.values[0].name === 'S' && v.values[1].name === 'Blue' && v.values[2].name === 'Cotton'
      );
      expect(sBlueCotton).toBeDefined();
      expect(sBlueCotton!.price).toBe('0');
      expect(sBlueCotton!.stock).toBe(0);
      expect(sBlueCotton!.action).toBe('create');

      // S/Blue/Polyester - S/Blue doesn't exist → 'create'
      const sBluePoly = result.find(
        v =>
          v.values[0].name === 'S' &&
          v.values[1].name === 'Blue' &&
          v.values[2].name === 'Polyester'
      );
      expect(sBluePoly).toBeDefined();
      expect(sBluePoly!.action).toBe('create');

      // M/Red/Cotton - M/Red doesn't exist in existing variants → 'create'
      const mRedCotton = result.find(
        v => v.values[0].name === 'M' && v.values[1].name === 'Red' && v.values[2].name === 'Cotton'
      );
      expect(mRedCotton).toBeDefined();
      expect(mRedCotton!.price).toBe('0');
      expect(mRedCotton!.action).toBe('create');

      // M/Red/Polyester - M/Red doesn't exist → 'create'
      const mRedPoly = result.find(
        v =>
          v.values[0].name === 'M' && v.values[1].name === 'Red' && v.values[2].name === 'Polyester'
      );
      expect(mRedPoly).toBeDefined();
      expect(mRedPoly!.action).toBe('create');

      // M/Blue/Cotton - First use of M/Blue base → 'update' (persists data)
      const mBlueCotton = result.find(
        v =>
          v.values[0].name === 'M' && v.values[1].name === 'Blue' && v.values[2].name === 'Cotton'
      );
      expect(mBlueCotton).toBeDefined();
      expect(mBlueCotton!.id).toBe('existing-2');
      expect(mBlueCotton!.price).toBe('34.99');
      expect(mBlueCotton!.stock).toBe(125);
      expect(mBlueCotton!.sku).toBe('M-BLUE');
      expect(mBlueCotton!.action).toBe('update');

      // M/Blue/Polyester - Second use of M/Blue base → 'create'
      const mBluePoly = result.find(
        v =>
          v.values[0].name === 'M' &&
          v.values[1].name === 'Blue' &&
          v.values[2].name === 'Polyester'
      );
      expect(mBluePoly).toBeDefined();
      expect(mBluePoly!.price).toBe('0');
      expect(mBluePoly!.action).toBe('create');
    });

    test('handles case where only one variant remains', () => {
      // User has Size (S, M, L) × Color (Red, Blue) = 6 variants
      // User deletes all except S/Red
      const existingVariants: VariantContext['variants'] = [
        {
          id: 'only-one',
          values: [
            { id: 'v1', name: 'S' },
            { id: 'v3', name: 'Red' }
          ],
          price: '99.99',
          stock: 999,
          sku: 'ONLY-ONE',
          selected: false
        }
      ];

      const options: VariantContext['options'] = [
        {
          id: '1',
          isEditing: false,
          name: 'Size',
          values: [
            { id: 'v1', name: 'S' },
            { id: 'v2', name: 'M' },
            { id: 'v3', name: 'L' }
          ]
        },
        {
          id: '2',
          isEditing: false,
          name: 'Color',
          values: [
            { id: 'v4', name: 'Red' },
            { id: 'v5', name: 'Blue' }
          ]
        }
      ];

      const result = generateVariants(options, existingVariants);

      // Should generate 3 × 2 = 6 variants
      expect(result).toHaveLength(6);

      // S/Red should be 'none' (exists exactly)
      const sRed = result.find(v => v.values[0].name === 'S' && v.values[1].name === 'Red');
      expect(sRed!.id).toBe('only-one');
      expect(sRed!.price).toBe('99.99');
      expect(sRed!.stock).toBe(999);
      expect(sRed!.sku).toBe('ONLY-ONE');
      expect(sRed!.action).toBe('none');

      // All other variants should be 'create'
      const others = result.filter(v => v.id !== 'only-one');
      expect(others).toHaveLength(5);
      expect(others.every(v => v.action === 'create')).toBe(true);
    });

    test('handles alternating deletion pattern', () => {
      // Size (S, M) × Color (Red, Blue, Green) = 6 variants
      // Keep: S/Red, S/Green, M/Blue
      // Delete: S/Blue, M/Red, M/Green
      const existingVariants: VariantContext['variants'] = [
        {
          id: 'ex-1',
          values: [
            { id: 'v1', name: 'S' },
            { id: 'v3', name: 'Red' }
          ],
          price: '10',
          stock: 10,
          selected: false
        },
        {
          id: 'ex-2',
          values: [
            { id: 'v1', name: 'S' },
            { id: 'v5', name: 'Green' }
          ],
          price: '30',
          stock: 30,
          selected: false
        },
        {
          id: 'ex-3',
          values: [
            { id: 'v2', name: 'M' },
            { id: 'v4', name: 'Blue' }
          ],
          price: '50',
          stock: 50,
          selected: false
        }
      ];

      const options: VariantContext['options'] = [
        {
          id: '1',
          isEditing: false,
          name: 'Size',
          values: [
            { id: 'v1', name: 'S' },
            { id: 'v2', name: 'M' }
          ]
        },
        {
          id: '2',
          isEditing: false,
          name: 'Color',
          values: [
            { id: 'v3', name: 'Red' },
            { id: 'v4', name: 'Blue' },
            { id: 'v5', name: 'Green' }
          ]
        }
      ];

      const result = generateVariants(options, existingVariants);

      expect(result).toHaveLength(6);

      // Existing variants should have 'none'
      expect(result.find(v => v.id === 'ex-1')!.action).toBe('none');
      expect(result.find(v => v.id === 'ex-2')!.action).toBe('none');
      expect(result.find(v => v.id === 'ex-3')!.action).toBe('none');

      // Missing variants should be 'create'
      const sBlue = result.find(v => v.values[0].name === 'S' && v.values[1].name === 'Blue');
      expect(sBlue!.action).toBe('create');

      const mRed = result.find(v => v.values[0].name === 'M' && v.values[1].name === 'Red');
      expect(mRed!.action).toBe('create');

      const mGreen = result.find(v => v.values[0].name === 'M' && v.values[1].name === 'Green');
      expect(mGreen!.action).toBe('create');
    });

    test('handles complex 3-option scenario with deletions', () => {
      // Size (S, M) × Color (Red, Blue) × Material (Cotton, Poly) = 8 variants
      // Keep only: S/Red/Cotton, M/Blue/Poly
      const existingVariants: VariantContext['variants'] = [
        {
          id: 'keep-1',
          values: [
            { id: 'v1', name: 'S' },
            { id: 'v3', name: 'Red' },
            { id: 'v5', name: 'Cotton' }
          ],
          price: '100',
          stock: 100,
          selected: false
        },
        {
          id: 'keep-2',
          values: [
            { id: 'v2', name: 'M' },
            { id: 'v4', name: 'Blue' },
            { id: 'v6', name: 'Poly' }
          ],
          price: '200',
          stock: 200,
          selected: false
        }
      ];

      const options: VariantContext['options'] = [
        {
          id: '1',
          isEditing: false,
          name: 'Size',
          values: [
            { id: 'v1', name: 'S' },
            { id: 'v2', name: 'M' }
          ]
        },
        {
          id: '2',
          isEditing: false,
          name: 'Color',
          values: [
            { id: 'v3', name: 'Red' },
            { id: 'v4', name: 'Blue' }
          ]
        },
        {
          id: '3',
          isEditing: false,
          name: 'Material',
          values: [
            { id: 'v5', name: 'Cotton' },
            { id: 'v6', name: 'Poly' }
          ]
        }
      ];

      const result = generateVariants(options, existingVariants);

      expect(result).toHaveLength(8);

      // Existing variants should be 'none'
      const keep1 = result.find(v => v.id === 'keep-1');
      expect(keep1!.action).toBe('none');
      expect(keep1!.price).toBe('100');

      const keep2 = result.find(v => v.id === 'keep-2');
      expect(keep2!.action).toBe('none');
      expect(keep2!.price).toBe('200');

      // All other 6 variants should be 'create'
      const created = result.filter(v => v.action === 'create');
      expect(created).toHaveLength(6);
      expect(created.every(v => v.price === '0')).toBe(true);
    });
  });

  describe('Edge cases', () => {
    test('returns empty array when no options provided', () => {
      const result = generateVariants([], []);
      expect(result).toEqual([]);
    });

    test('filters out variants with empty values', () => {
      const options: VariantContext['options'] = [
        {
          id: '1',
          isEditing: false,
          name: 'Size',
          values: [
            { id: 'v1', name: 'S' },
            { id: 'v2', name: '' } // Empty value
          ]
        }
      ];

      const result = generateVariants(options, []);

      // Should only generate 1 variant (the one with non-empty value)
      expect(result).toHaveLength(1);
      expect(result[0].values[0].name).toBe('S');
    });

    test('uses form default values when provided', () => {
      const options: VariantContext['options'] = [
        {
          id: '1',
          isEditing: false,
          name: 'Size',
          values: [{ id: 'v1', name: 'S' }]
        }
      ];

      const formValues = {
        salePrice: 50,
        stock: 200,
        comparisonPrice: 60,
        sku: 'DEFAULT-SKU',
        requiresShipping: true,
        weight: 1.5,
        length: 10,
        width: 5,
        height: 3
      };

      const result = generateVariants(options, [], formValues as any);

      expect(result).toHaveLength(1);
      expect(result[0].price).toBe(50);
      expect(result[0].stock).toBe(200);
      expect(result[0].comparisonPrice).toBe(60);
      expect(result[0].sku).toBe('DEFAULT-SKU');
      expect(result[0].requiresShipping).toBe(true);
      expect(result[0].weight).toBe(1.5);
      expect(result[0].length).toBe(10);
      expect(result[0].width).toBe(5);
      expect(result[0].height).toBe(3);
    });
  });
});
