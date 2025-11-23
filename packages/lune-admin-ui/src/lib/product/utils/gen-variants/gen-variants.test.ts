import { genVariants } from './gen-variants';

describe('gen-variants', () => {
  describe('without persisted variants', () => {
    /**
     * input:  size - XS, S, M, L
     * output: ['XS'], ['S'], ['M'], ['L']
     */
    test('returns generated variants when 1 option is provided', () => {
      const options = [
        {
          id: '1',
          name: 'Size',
          values: [
            { id: 'xs', name: 'XS' },
            { id: 's', name: 'S' },
            { id: 'm', name: 'M' },
            { id: 'l', name: 'L' }
          ]
        }
      ];

      const variants = genVariants(options, []);

      expect(variants).toHaveLength(4);

      expect(variants[0]).toMatchObject({
        action: 'create',
        price: '',
        stock: 0,
        values: [{ id: 'xs', name: 'XS' }]
      });
      expect(variants[1]).toMatchObject({
        action: 'create',
        price: '',
        stock: 0,
        values: [{ id: 's', name: 'S' }]
      });
      expect(variants[2]).toMatchObject({
        action: 'create',
        price: '',
        stock: 0,
        values: [{ id: 'm', name: 'M' }]
      });
      expect(variants[3]).toMatchObject({
        action: 'create',
        price: '',
        stock: 0,
        values: [{ id: 'l', name: 'L' }]
      });
    });

    /**
     * input:  color - Red, Blue
     *         size  - S, M, XL
     * output: ['Red', 'S'], ['Red', 'M'], ['Red', 'XL'],
     *         ['Blue', 'S'], ['Blue', 'M'], ['Blue', 'XL']
     */
    test('returns generated variants when 2 options are provided', () => {
      const options = [
        {
          id: '1',
          name: 'Color',
          values: [
            { id: 'red', name: 'Red' },
            { id: 'blue', name: 'Blue' }
          ]
        },
        {
          id: '2',
          name: 'Size',
          values: [
            { id: 's', name: 'S' },
            { id: 'm', name: 'M' },
            { id: 'xl', name: 'XL' }
          ]
        }
      ];

      const variants = genVariants(options, []);

      expect(variants).toHaveLength(6);

      // Order: [Red,S], [Red,M], [Red,XL], [Blue,S], [Blue,M], [Blue,XL]
      // Grouped by first option (Color)
      expect(variants[0]).toMatchObject({
        action: 'create',
        price: '',
        stock: 0,
        values: [
          { id: 'red', name: 'Red' },
          { id: 's', name: 'S' }
        ]
      });
      expect(variants[1]).toMatchObject({
        action: 'create',
        price: '',
        stock: 0,
        values: [
          { id: 'red', name: 'Red' },
          { id: 'm', name: 'M' }
        ]
      });
      expect(variants[2]).toMatchObject({
        action: 'create',
        price: '',
        stock: 0,
        values: [
          { id: 'red', name: 'Red' },
          { id: 'xl', name: 'XL' }
        ]
      });

      expect(variants[3]).toMatchObject({
        action: 'create',
        price: '',
        stock: 0,
        values: [
          { id: 'blue', name: 'Blue' },
          { id: 's', name: 'S' }
        ]
      });
      expect(variants[4]).toMatchObject({
        action: 'create',
        price: '',
        stock: 0,
        values: [
          { id: 'blue', name: 'Blue' },
          { id: 'm', name: 'M' }
        ]
      });
      expect(variants[5]).toMatchObject({
        action: 'create',
        price: '',
        stock: 0,
        values: [
          { id: 'blue', name: 'Blue' },
          { id: 'xl', name: 'XL' }
        ]
      });
    });

    /**
     * input:  color     - Red, Blue
     *         size      - S, M, XL
     *         material  - Polyester, Lycra
     * output: ['Red', 'S', 'Polyester'], ['Red', 'S', 'Lycra'],
     *         ['Red', 'M', 'Polyester'], ['Red', 'M', 'Lycra'],
     *         ['Red', 'XL', 'Polyester'], ['Red', 'XL', 'Lycra']
     *
     *         ['Blue', 'S', 'Polyester'], ['Blue', 'S', 'Lycra'],
     *         ['Blue', 'M', 'Polyester'], ['Blue', 'M', 'Lycra'],
     *         ['Blue', 'XL', 'Polyester'], ['Blue', 'XL', 'Lycra']
     */
    test('returns generated variants when 3 options are provided', () => {
      const options = [
        {
          id: '1',
          name: 'Color',
          values: [
            { id: 'red', name: 'Red' },
            { id: 'blue', name: 'Blue' }
          ]
        },
        {
          id: '2',
          name: 'Size',
          values: [
            { id: 's', name: 'S' },
            { id: 'm', name: 'M' },
            { id: 'xl', name: 'XL' }
          ]
        },
        {
          id: '3',
          name: 'Material',
          values: [
            { id: 'polyester', name: 'Polyester' },
            { id: 'lycra', name: 'Lycra' }
          ]
        }
      ];

      const variants = genVariants(options, []);

      expect(variants).toHaveLength(12);

      // Order: Grouped by first option (Color)
      // [Red,S,Poly], [Red,S,Lycra], [Red,M,Poly], [Red,M,Lycra], [Red,XL,Poly], [Red,XL,Lycra],
      // [Blue,S,Poly], [Blue,S,Lycra], [Blue,M,Poly], [Blue,M,Lycra], [Blue,XL,Poly], [Blue,XL,Lycra]
      expect(variants[0]).toMatchObject({
        action: 'create',
        price: '',
        stock: 0,
        values: [
          { id: 'red', name: 'Red' },
          { id: 's', name: 'S' },
          { id: 'polyester', name: 'Polyester' }
        ]
      });
      expect(variants[1]).toMatchObject({
        action: 'create',
        price: '',
        stock: 0,
        values: [
          { id: 'red', name: 'Red' },
          { id: 's', name: 'S' },
          { id: 'lycra', name: 'Lycra' }
        ]
      });
      expect(variants[2]).toMatchObject({
        action: 'create',
        price: '',
        stock: 0,
        values: [
          { id: 'red', name: 'Red' },
          { id: 'm', name: 'M' },
          { id: 'polyester', name: 'Polyester' }
        ]
      });
      expect(variants[3]).toMatchObject({
        action: 'create',
        price: '',
        stock: 0,
        values: [
          { id: 'red', name: 'Red' },
          { id: 'm', name: 'M' },
          { id: 'lycra', name: 'Lycra' }
        ]
      });

      expect(variants[4]).toMatchObject({
        action: 'create',
        price: '',
        stock: 0,
        values: [
          { id: 'red', name: 'Red' },
          { id: 'xl', name: 'XL' },
          { id: 'polyester', name: 'Polyester' }
        ]
      });
      expect(variants[5]).toMatchObject({
        action: 'create',
        price: '',
        stock: 0,
        values: [
          { id: 'red', name: 'Red' },
          { id: 'xl', name: 'XL' },
          { id: 'lycra', name: 'Lycra' }
        ]
      });

      expect(variants[6]).toMatchObject({
        action: 'create',
        price: '',
        stock: 0,
        values: [
          { id: 'blue', name: 'Blue' },
          { id: 's', name: 'S' },
          { id: 'polyester', name: 'Polyester' }
        ]
      });
      expect(variants[7]).toMatchObject({
        action: 'create',
        price: '',
        stock: 0,
        values: [
          { id: 'blue', name: 'Blue' },
          { id: 's', name: 'S' },
          { id: 'lycra', name: 'Lycra' }
        ]
      });
      expect(variants[8]).toMatchObject({
        action: 'create',
        price: '',
        stock: 0,
        values: [
          { id: 'blue', name: 'Blue' },
          { id: 'm', name: 'M' },
          { id: 'polyester', name: 'Polyester' }
        ]
      });
      expect(variants[9]).toMatchObject({
        action: 'create',
        price: '',
        stock: 0,
        values: [
          { id: 'blue', name: 'Blue' },
          { id: 'm', name: 'M' },
          { id: 'lycra', name: 'Lycra' }
        ]
      });
      expect(variants[10]).toMatchObject({
        action: 'create',
        price: '',
        stock: 0,
        values: [
          { id: 'blue', name: 'Blue' },
          { id: 'xl', name: 'XL' },
          { id: 'polyester', name: 'Polyester' }
        ]
      });
      expect(variants[11]).toMatchObject({
        action: 'create',
        price: '',
        stock: 0,
        values: [
          { id: 'blue', name: 'Blue' },
          { id: 'xl', name: 'XL' },
          { id: 'lycra', name: 'Lycra' }
        ]
      });
    });
  });

  describe('with persisted variants', () => {
    test('returns action "none" for variants that already exist', () => {
      const options = [
        {
          id: '1',
          name: 'Size',
          values: [
            { id: 's', name: 'S' },
            { id: 'm', name: 'M' }
          ]
        }
      ];

      const existingVariants = [
        {
          id: 'existing-1',
          values: [{ id: 's', name: 'S' }],
          price: '19.99',
          stock: 50,
          sku: 'SKU-S',
          requiresShipping: true,
          selected: false
        },
        {
          id: 'existing-2',
          values: [{ id: 'm', name: 'M' }],
          price: '24.99',
          stock: 30,
          sku: 'SKU-M',
          requiresShipping: true,
          selected: false
        }
      ];

      const variants = genVariants(options, existingVariants);

      expect(variants).toHaveLength(2);

      // Debe mantener los datos existentes con action 'none'
      expect(variants[0]).toMatchObject({
        id: 'existing-1',
        action: 'none',
        price: '19.99',
        stock: 50,
        sku: 'SKU-S',
        values: [{ id: 's', name: 'S' }]
      });

      expect(variants[1]).toMatchObject({
        id: 'existing-2',
        action: 'none',
        price: '24.99',
        stock: 30,
        sku: 'SKU-M',
        values: [{ id: 'm', name: 'M' }]
      });
    });

    test('returns action "create" for new combinations', () => {
      const options = [
        {
          id: '1',
          name: 'Size',
          values: [
            { id: 's', name: 'S' },
            { id: 'm', name: 'M' },
            { id: 'l', name: 'L' } // Nueva opción
          ]
        }
      ];

      const existingVariants = [
        {
          id: 'existing-1',
          values: [{ id: 's', name: 'S' }],
          price: '19.99',
          stock: 50,
          sku: 'SKU-S',
          requiresShipping: true,
          selected: false
        }
      ];

      const variants = genVariants(options, existingVariants);

      expect(variants).toHaveLength(3);

      // Primera variante existe → 'none'
      expect(variants[0]).toMatchObject({
        id: 'existing-1',
        action: 'none',
        price: '19.99'
      });

      // Segunda y tercera variante son nuevas → 'create'
      expect(variants[1]).toMatchObject({
        action: 'create',
        price: '',
        stock: 0,
        values: [{ id: 'm', name: 'M' }]
      });

      expect(variants[2]).toMatchObject({
        action: 'create',
        price: '',
        stock: 0,
        values: [{ id: 'l', name: 'L' }]
      });
    });

    test('preserves all data fields when variants match exactly', () => {
      const options = [
        {
          id: '1',
          name: 'Size',
          values: [{ id: 's', name: 'S' }]
        }
      ];

      const existingVariants = [
        {
          id: 'v1',
          values: [{ id: 's', name: 'S' }],
          price: '19.99',
          comparisonPrice: '29.99',
          stock: 50,
          sku: 'SKU-001',
          requiresShipping: true,
          weight: 100,
          length: 10,
          width: 5,
          height: 2,
          image: 'https://example.com/image.jpg',
          selected: false
        }
      ];

      const variants = genVariants(options, existingVariants);

      // Debe preservar TODOS los campos
      expect(variants[0]).toEqual({
        id: 'v1',
        action: 'none',
        values: [{ id: 's', name: 'S' }],
        price: '19.99',
        comparisonPrice: '29.99',
        stock: 50,
        sku: 'SKU-001',
        requiresShipping: true,
        weight: 100,
        length: 10,
        width: 5,
        height: 2,
        image: 'https://example.com/image.jpg',
        selected: false
      });
    });

    test('works with 2 options when all variants exist', () => {
      const options = [
        {
          id: '1',
          name: 'Color',
          values: [
            { id: 'red', name: 'Red' },
            { id: 'blue', name: 'Blue' }
          ]
        },
        {
          id: '2',
          name: 'Size',
          values: [
            { id: 's', name: 'S' },
            { id: 'm', name: 'M' }
          ]
        }
      ];

      const existingVariants = [
        {
          id: 'v1',
          values: [
            { id: 'red', name: 'Red' },
            { id: 's', name: 'S' }
          ],
          price: '10.00',
          stock: 10,
          selected: false
        },
        {
          id: 'v2',
          values: [
            { id: 'red', name: 'Red' },
            { id: 'm', name: 'M' }
          ],
          price: '12.00',
          stock: 20,
          selected: false
        },
        {
          id: 'v3',
          values: [
            { id: 'blue', name: 'Blue' },
            { id: 's', name: 'S' }
          ],
          price: '11.00',
          stock: 15,
          selected: false
        },
        {
          id: 'v4',
          values: [
            { id: 'blue', name: 'Blue' },
            { id: 'm', name: 'M' }
          ],
          price: '13.00',
          stock: 25,
          selected: false
        }
      ];

      const variants = genVariants(options, existingVariants);

      expect(variants).toHaveLength(4);
      expect(variants.every(v => v.action === 'none')).toBe(true);
      expect(variants.map(v => v.id)).toEqual(['v1', 'v2', 'v3', 'v4']);
    });

    test('handles order changes in option values by matching IDs', () => {
      const options = [
        {
          id: '1',
          name: 'Size',
          values: [
            { id: 'l', name: 'L' }, // Era tercero
            { id: 's', name: 'S' }, // Era primero
            { id: 'm', name: 'M' } // Era segundo
          ]
        }
      ];

      const existingVariants = [
        {
          id: 'v-s',
          values: [{ id: 's', name: 'S' }],
          price: '10.00',
          stock: 10,
          selected: false
        },
        {
          id: 'v-m',
          values: [{ id: 'm', name: 'M' }],
          price: '12.00',
          stock: 20,
          selected: false
        },
        {
          id: 'v-l',
          values: [{ id: 'l', name: 'L' }],
          price: '14.00',
          stock: 30,
          selected: false
        }
      ];

      const variants = genVariants(options, existingVariants);

      expect(variants).toHaveLength(3);

      // Deben estar en el nuevo orden pero con datos correctos
      expect(variants[0]).toMatchObject({ id: 'v-l', price: '14.00' });
      expect(variants[1]).toMatchObject({ id: 'v-s', price: '10.00' });
      expect(variants[2]).toMatchObject({ id: 'v-m', price: '12.00' });
      expect(variants.every(v => v.action === 'none')).toBe(true);
    });

    test('matches by ID not by name', () => {
      const options = [
        {
          id: '1',
          name: 'Size',
          values: [
            { id: 'size-1', name: 'Small' }, // Nombre cambió
            { id: 'size-2', name: 'Medium' }
          ]
        }
      ];

      const existingVariants = [
        {
          id: 'v1',
          values: [{ id: 'size-1', name: 'S' }], // Nombre viejo
          price: '10.00',
          stock: 10,
          selected: false
        }
      ];

      const variants = genVariants(options, existingVariants);

      expect(variants).toHaveLength(2);

      // Debe matchear por ID y actualizar el nombre
      expect(variants[0]).toMatchObject({
        id: 'v1',
        action: 'none',
        price: '10.00',
        values: [{ id: 'size-1', name: 'Small' }]
      });

      expect(variants[1]).toMatchObject({
        action: 'create',
        values: [{ id: 'size-2', name: 'Medium' }]
      });
    });

    test('creates new variants when adding option values', () => {
      const options = [
        {
          id: '1',
          name: 'Size',
          values: [
            { id: 's', name: 'S' },
            { id: 'm', name: 'M' },
            { id: 'l', name: 'L' }, // Nuevo
            { id: 'xl', name: 'XL' } // Nuevo
          ]
        }
      ];

      const existingVariants = [
        {
          id: 'v-s',
          values: [{ id: 's', name: 'S' }],
          price: '19.99',
          stock: 50,
          selected: false
        },
        {
          id: 'v-m',
          values: [{ id: 'm', name: 'M' }],
          price: '24.99',
          stock: 30,
          selected: false
        }
      ];

      const variants = genVariants(options, existingVariants);

      expect(variants).toHaveLength(4);

      // Primeras dos: existentes
      expect(variants[0].action).toBe('none');
      expect(variants[1].action).toBe('none');

      // Últimas dos: nuevas
      expect(variants[2]).toMatchObject({
        action: 'create',
        price: '',
        stock: 0,
        values: [{ id: 'l', name: 'L' }]
      });
      expect(variants[3]).toMatchObject({
        action: 'create',
        price: '',
        stock: 0,
        values: [{ id: 'xl', name: 'XL' }]
      });
    });

    test('creates all new variants when adding second option', () => {
      const options = [
        {
          id: '1',
          name: 'Size',
          values: [
            { id: 's', name: 'S' },
            { id: 'm', name: 'M' }
          ]
        },
        {
          id: '2',
          name: 'Color', // Nueva opción
          values: [
            { id: 'red', name: 'Red' },
            { id: 'blue', name: 'Blue' }
          ]
        }
      ];

      const existingVariants = [
        {
          id: 'v-s',
          values: [{ id: 's', name: 'S' }],
          price: '10.00',
          stock: 100,
          selected: false
        },
        {
          id: 'v-m',
          values: [{ id: 'm', name: 'M' }],
          price: '12.00',
          stock: 50,
          selected: false
        }
      ];

      const variants = genVariants(options, existingVariants);

      expect(variants).toHaveLength(4);

      // TODAS son 'create' porque ninguna tiene 2 option values
      expect(variants.every(v => v.action === 'create')).toBe(true);
      expect(variants.every(v => v.values.length === 2)).toBe(true);

      // Verificar combinaciones
      expect(variants[0].values).toEqual([
        { id: 's', name: 'S' },
        { id: 'red', name: 'Red' }
      ]);
      expect(variants[1].values).toEqual([
        { id: 's', name: 'S' },
        { id: 'blue', name: 'Blue' }
      ]);

      expect(variants[2].values).toEqual([
        { id: 'm', name: 'M' },
        { id: 'red', name: 'Red' }
      ]);
      expect(variants[3].values).toEqual([
        { id: 'm', name: 'M' },
        { id: 'blue', name: 'Blue' }
      ]);
    });

    test('creates all new variants when adding third option', () => {
      const options = [
        {
          id: '1',
          name: 'Color',
          values: [
            { id: 'red', name: 'Red' },
            { id: 'blue', name: 'Blue' }
          ]
        },
        {
          id: '2',
          name: 'Size',
          values: [
            { id: 's', name: 'S' },
            { id: 'm', name: 'M' }
          ]
        },
        {
          id: '3',
          name: 'Material', // Nueva tercera opción
          values: [
            { id: 'cotton', name: 'Cotton' },
            { id: 'poly', name: 'Polyester' }
          ]
        }
      ];

      // Antes tenía todas las combinaciones de Color × Size = 4 variantes
      const existingVariants = [
        {
          id: 'v1',
          values: [
            { id: 'red', name: 'Red' },
            { id: 's', name: 'S' }
          ],
          price: '10.00',
          stock: 10,
          selected: false
        },
        {
          id: 'v2',
          values: [
            { id: 'red', name: 'Red' },
            { id: 'm', name: 'M' }
          ],
          price: '12.00',
          stock: 12,
          selected: false
        },
        {
          id: 'v3',
          values: [
            { id: 'blue', name: 'Blue' },
            { id: 's', name: 'S' }
          ],
          price: '11.00',
          stock: 15,
          selected: false
        },
        {
          id: 'v4',
          values: [
            { id: 'blue', name: 'Blue' },
            { id: 'm', name: 'M' }
          ],
          price: '13.00',
          stock: 20,
          selected: false
        }
      ];

      // Ahora debe generar 2×2×2 = 8 variantes
      const variants = genVariants(options, existingVariants);

      expect(variants).toHaveLength(8);

      // TODAS son 'create' porque ninguna tiene 3 option values
      expect(variants.every(v => v.action === 'create')).toBe(true);
      expect(variants.every(v => v.values.length === 3)).toBe(true);
    });

    test('handles mix of existing and new variants', () => {
      const options = [
        {
          id: '1',
          name: 'Color',
          values: [
            { id: 'red', name: 'Red' },
            { id: 'blue', name: 'Blue' },
            { id: 'green', name: 'Green' } // Nuevo color agregado
          ]
        },
        {
          id: '2',
          name: 'Size',
          values: [
            { id: 's', name: 'S' },
            { id: 'm', name: 'M' }
          ]
        }
      ];

      // Antes tenía Red y Blue con todas sus tallas
      const existingVariants = [
        {
          id: 'v1',
          values: [
            { id: 'red', name: 'Red' },
            { id: 's', name: 'S' }
          ],
          price: '10.00',
          stock: 10,
          selected: false
        },
        {
          id: 'v2',
          values: [
            { id: 'red', name: 'Red' },
            { id: 'm', name: 'M' }
          ],
          price: '12.00',
          stock: 12,
          selected: false
        },
        {
          id: 'v3',
          values: [
            { id: 'blue', name: 'Blue' },
            { id: 's', name: 'S' }
          ],
          price: '11.00',
          stock: 15,
          selected: false
        },
        {
          id: 'v4',
          values: [
            { id: 'blue', name: 'Blue' },
            { id: 'm', name: 'M' }
          ],
          price: '13.00',
          stock: 20,
          selected: false
        }
      ];

      // Ahora debe generar 3 colores × 2 tallas = 6 variantes
      const variants = genVariants(options, existingVariants);

      expect(variants).toHaveLength(6);

      // 4 existentes con 'none' (Red/S, Red/M, Blue/S, Blue/M)
      const existingOnes = variants.filter(v => v.action === 'none');
      expect(existingOnes).toHaveLength(4);
      expect(existingOnes.map(v => v.id)).toEqual(['v1', 'v2', 'v3', 'v4']);

      // 2 nuevas con 'create' (Green/S, Green/M)
      const newOnes = variants.filter(v => v.action === 'create');
      expect(newOnes).toHaveLength(2);
      expect(newOnes.every(v => v.values.some(val => val.id === 'green'))).toBe(true);
    });

    test('all variants are new when no existing variants provided', () => {
      const options = [
        {
          id: '1',
          name: 'Size',
          values: [
            { id: 's', name: 'S' },
            { id: 'm', name: 'M' }
          ]
        }
      ];

      const variants = genVariants(options, []);

      expect(variants).toHaveLength(2);
      expect(variants.every(v => v.action === 'create')).toBe(true);
      expect(variants.every(v => v.price === '')).toBe(true);
      expect(variants.every(v => v.stock === 0)).toBe(true);
    });

    test('removes variants when option values are deleted', () => {
      const options = [
        {
          id: '1',
          name: 'Size',
          values: [
            { id: 's', name: 'S' },
            { id: 'm', name: 'M' }
            // Eliminó L y XL
          ]
        }
      ];

      const existingVariants = [
        {
          id: 'v-s',
          values: [{ id: 's', name: 'S' }],
          price: '10.00',
          stock: 10,
          selected: false
        },
        {
          id: 'v-m',
          values: [{ id: 'm', name: 'M' }],
          price: '12.00',
          stock: 20,
          selected: false
        },
        {
          id: 'v-l',
          values: [{ id: 'l', name: 'L' }],
          price: '14.00',
          stock: 30,
          selected: false
        },
        {
          id: 'v-xl',
          values: [{ id: 'xl', name: 'XL' }],
          price: '16.00',
          stock: 40,
          selected: false
        }
      ];

      const variants = genVariants(options, existingVariants);

      // Solo debe retornar S y M (las que quedaron)
      expect(variants).toHaveLength(2);
      expect(variants[0]).toMatchObject({
        id: 'v-s',
        action: 'none',
        price: '10.00'
      });
      expect(variants[1]).toMatchObject({
        id: 'v-m',
        action: 'none',
        price: '12.00'
      });

      // L y XL no deben estar en el resultado
      expect(variants.find(v => v.id === 'v-l')).toBeUndefined();
      expect(variants.find(v => v.id === 'v-xl')).toBeUndefined();
    });

    test('removes variants when deleting values from 2 options', () => {
      const options = [
        {
          id: '1',
          name: 'Color',
          values: [
            { id: 'red', name: 'Red' }
            // Eliminó Blue
          ]
        },
        {
          id: '2',
          name: 'Size',
          values: [
            { id: 's', name: 'S' },
            { id: 'm', name: 'M' }
            // Eliminó L
          ]
        }
      ];

      const existingVariants = [
        {
          id: 'v1',
          values: [
            { id: 'red', name: 'Red' },
            { id: 's', name: 'S' }
          ],
          price: '10.00',
          stock: 10,
          selected: false
        },
        {
          id: 'v2',
          values: [
            { id: 'red', name: 'Red' },
            { id: 'm', name: 'M' }
          ],
          price: '12.00',
          stock: 20,
          selected: false
        },
        {
          id: 'v3',
          values: [
            { id: 'red', name: 'Red' },
            { id: 'l', name: 'L' }
          ],
          price: '14.00',
          stock: 30,
          selected: false
        },
        {
          id: 'v4',
          values: [
            { id: 'blue', name: 'Blue' },
            { id: 's', name: 'S' }
          ],
          price: '11.00',
          stock: 15,
          selected: false
        },
        {
          id: 'v5',
          values: [
            { id: 'blue', name: 'Blue' },
            { id: 'm', name: 'M' }
          ],
          price: '13.00',
          stock: 25,
          selected: false
        },
        {
          id: 'v6',
          values: [
            { id: 'blue', name: 'Blue' },
            { id: 'l', name: 'L' }
          ],
          price: '15.00',
          stock: 35,
          selected: false
        }
      ];

      const variants = genVariants(options, existingVariants);

      // Solo Red × (S, M) = 2 variantes
      expect(variants).toHaveLength(2);
      expect(variants.map(v => v.id)).toEqual(['v1', 'v2']);
      expect(variants.every(v => v.action === 'none')).toBe(true);

      // Todas las variantes con Blue o L deben haber desaparecido
      expect(variants.find(v => v.id === 'v3')).toBeUndefined(); // Red/L
      expect(variants.find(v => v.id === 'v4')).toBeUndefined(); // Blue/S
      expect(variants.find(v => v.id === 'v5')).toBeUndefined(); // Blue/M
      expect(variants.find(v => v.id === 'v6')).toBeUndefined(); // Blue/L
    });

    test('handles deleting all values except one', () => {
      const options = [
        {
          id: '1',
          name: 'Size',
          values: [
            { id: 'm', name: 'M' }
            // Solo quedó M, eliminó todo lo demás
          ]
        }
      ];

      const existingVariants = [
        {
          id: 'v-s',
          values: [{ id: 's', name: 'S' }],
          price: '10.00',
          stock: 10,
          selected: false
        },
        {
          id: 'v-m',
          values: [{ id: 'm', name: 'M' }],
          price: '12.00',
          stock: 20,
          selected: false
        },
        {
          id: 'v-l',
          values: [{ id: 'l', name: 'L' }],
          price: '14.00',
          stock: 30,
          selected: false
        }
      ];

      const variants = genVariants(options, existingVariants);

      expect(variants).toHaveLength(1);
      expect(variants[0]).toMatchObject({
        id: 'v-m',
        action: 'none',
        price: '12.00'
      });
    });

    test('collapses from 2 options to 1 option', () => {
      const options = [
        {
          id: '1',
          name: 'Size',
          values: [
            { id: 's', name: 'S' },
            { id: 'm', name: 'M' }
          ]
        }
        // Eliminó la opción Color completa
      ];

      // Antes tenía Size × Color
      const existingVariants = [
        {
          id: 'v1',
          values: [
            { id: 's', name: 'S' },
            { id: 'red', name: 'Red' }
          ],
          price: '10.00',
          stock: 10,
          selected: false
        },
        {
          id: 'v2',
          values: [
            { id: 's', name: 'S' },
            { id: 'blue', name: 'Blue' }
          ],
          price: '11.00',
          stock: 15,
          selected: false
        },
        {
          id: 'v3',
          values: [
            { id: 'm', name: 'M' },
            { id: 'red', name: 'Red' }
          ],
          price: '12.00',
          stock: 20,
          selected: false
        },
        {
          id: 'v4',
          values: [
            { id: 'm', name: 'M' },
            { id: 'blue', name: 'Blue' }
          ],
          price: '13.00',
          stock: 25,
          selected: false
        }
      ];

      // Ahora solo debe generar 2 variantes (S, M)
      const variants = genVariants(options, existingVariants);

      expect(variants).toHaveLength(2);

      // TODAS son 'create' porque las existentes tienen 2 valores
      expect(variants.every(v => v.action === 'create')).toBe(true);
      expect(variants.every(v => v.values.length === 1)).toBe(true);

      expect(variants[0].values).toEqual([{ id: 's', name: 'S' }]);
      expect(variants[1].values).toEqual([{ id: 'm', name: 'M' }]);
    });

    test('collapses from 3 options to 2 options', () => {
      const options = [
        {
          id: '1',
          name: 'Color',
          values: [
            { id: 'red', name: 'Red' },
            { id: 'blue', name: 'Blue' }
          ]
        },
        {
          id: '2',
          name: 'Size',
          values: [
            { id: 's', name: 'S' },
            { id: 'm', name: 'M' }
          ]
        }
        // Eliminó Material completa
      ];

      // Antes tenía Color × Size × Material = 8 variantes
      const existingVariants = [
        {
          id: 'v1',
          values: [
            { id: 'red', name: 'Red' },
            { id: 's', name: 'S' },
            { id: 'cotton', name: 'Cotton' }
          ],
          price: '10.00',
          stock: 10,
          selected: false
        },
        {
          id: 'v2',
          values: [
            { id: 'red', name: 'Red' },
            { id: 's', name: 'S' },
            { id: 'poly', name: 'Polyester' }
          ],
          price: '11.00',
          stock: 11,
          selected: false
        },
        {
          id: 'v3',
          values: [
            { id: 'red', name: 'Red' },
            { id: 'm', name: 'M' },
            { id: 'cotton', name: 'Cotton' }
          ],
          price: '12.00',
          stock: 12,
          selected: false
        },
        {
          id: 'v4',
          values: [
            { id: 'red', name: 'Red' },
            { id: 'm', name: 'M' },
            { id: 'poly', name: 'Polyester' }
          ],
          price: '13.00',
          stock: 13,
          selected: false
        },
        {
          id: 'v5',
          values: [
            { id: 'blue', name: 'Blue' },
            { id: 's', name: 'S' },
            { id: 'cotton', name: 'Cotton' }
          ],
          price: '14.00',
          stock: 14,
          selected: false
        },
        {
          id: 'v6',
          values: [
            { id: 'blue', name: 'Blue' },
            { id: 's', name: 'S' },
            { id: 'poly', name: 'Polyester' }
          ],
          price: '15.00',
          stock: 15,
          selected: false
        },
        {
          id: 'v7',
          values: [
            { id: 'blue', name: 'Blue' },
            { id: 'm', name: 'M' },
            { id: 'cotton', name: 'Cotton' }
          ],
          price: '16.00',
          stock: 16,
          selected: false
        },
        {
          id: 'v8',
          values: [
            { id: 'blue', name: 'Blue' },
            { id: 'm', name: 'M' },
            { id: 'poly', name: 'Polyester' }
          ],
          price: '17.00',
          stock: 17,
          selected: false
        }
      ];

      // Ahora debe generar Color × Size = 4 variantes
      const variants = genVariants(options, existingVariants);

      expect(variants).toHaveLength(4);

      // TODAS son 'create' porque las existentes tienen 3 valores
      expect(variants.every(v => v.action === 'create')).toBe(true);
      expect(variants.every(v => v.values.length === 2)).toBe(true);

      // Verificar las combinaciones
      expect(variants[0].values).toEqual([
        { id: 'red', name: 'Red' },
        { id: 's', name: 'S' }
      ]);
      expect(variants[1].values).toEqual([
        { id: 'red', name: 'Red' },
        { id: 'm', name: 'M' }
      ]);
      expect(variants[2].values).toEqual([
        { id: 'blue', name: 'Blue' },
        { id: 's', name: 'S' }
      ]);
      expect(variants[3].values).toEqual([
        { id: 'blue', name: 'Blue' },
        { id: 'm', name: 'M' }
      ]);
    });

    test('collapses from 3 options to 1 option', () => {
      const options = [
        {
          id: '1',
          name: 'Color',
          values: [
            { id: 'red', name: 'Red' },
            { id: 'blue', name: 'Blue' }
          ]
        }
        // Eliminó Size y Material completas
      ];

      const existingVariants = [
        {
          id: 'v1',
          values: [
            { id: 'red', name: 'Red' },
            { id: 's', name: 'S' },
            { id: 'cotton', name: 'Cotton' }
          ],
          price: '10.00',
          stock: 10,
          selected: false
        },
        {
          id: 'v2',
          values: [
            { id: 'red', name: 'Red' },
            { id: 's', name: 'S' },
            { id: 'poly', name: 'Polyester' }
          ],
          price: '11.00',
          stock: 11,
          selected: false
        },
        {
          id: 'v3',
          values: [
            { id: 'red', name: 'Red' },
            { id: 'm', name: 'M' },
            { id: 'cotton', name: 'Cotton' }
          ],
          price: '12.00',
          stock: 12,
          selected: false
        },
        {
          id: 'v4',
          values: [
            { id: 'red', name: 'Red' },
            { id: 'm', name: 'M' },
            { id: 'poly', name: 'Polyester' }
          ],
          price: '13.00',
          stock: 13,
          selected: false
        },
        {
          id: 'v5',
          values: [
            { id: 'blue', name: 'Blue' },
            { id: 's', name: 'S' },
            { id: 'cotton', name: 'Cotton' }
          ],
          price: '14.00',
          stock: 14,
          selected: false
        },
        {
          id: 'v6',
          values: [
            { id: 'blue', name: 'Blue' },
            { id: 's', name: 'S' },
            { id: 'poly', name: 'Polyester' }
          ],
          price: '15.00',
          stock: 15,
          selected: false
        },
        {
          id: 'v7',
          values: [
            { id: 'blue', name: 'Blue' },
            { id: 'm', name: 'M' },
            { id: 'cotton', name: 'Cotton' }
          ],
          price: '16.00',
          stock: 16,
          selected: false
        },
        {
          id: 'v8',
          values: [
            { id: 'blue', name: 'Blue' },
            { id: 'm', name: 'M' },
            { id: 'poly', name: 'Polyester' }
          ],
          price: '17.00',
          stock: 17,
          selected: false
        }
      ];

      const variants = genVariants(options, existingVariants);

      expect(variants).toHaveLength(2);

      // TODAS son 'create' porque las existentes tienen 3 valores
      expect(variants.every(v => v.action === 'create')).toBe(true);
      expect(variants.every(v => v.values.length === 1)).toBe(true);

      expect(variants[0].values).toEqual([{ id: 'red', name: 'Red' }]);
      expect(variants[1].values).toEqual([{ id: 'blue', name: 'Blue' }]);
    });

    test('returns empty array when options are empty', () => {
      const existingVariants = [
        {
          id: 'v1',
          values: [{ id: 's', name: 'S' }],
          price: '10.00',
          stock: 10,
          selected: false
        }
      ];

      const variants = genVariants([], existingVariants);

      expect(variants).toEqual([]);
    });

    test('returns empty array when option has no values', () => {
      const options = [
        {
          id: '1',
          name: 'Size',
          values: []
        }
      ];

      const existingVariants = [
        {
          id: 'v1',
          values: [{ id: 's', name: 'S' }],
          price: '10.00',
          stock: 10,
          selected: false
        }
      ];

      const variants = genVariants(options, existingVariants);

      expect(variants).toEqual([]);
    });

    // test('handles variants with undefined optional fields', () => {
    //   const options = [
    //     {
    //       id: '1',
    //       name: 'Size',
    //       values: [{ id: 's', name: 'S' }]
    //     }
    //   ];

    //   const existingVariants = [
    //     {
    //       id: 'v1',
    //       values: [{ id: 's', name: 'S' }],
    //       price: '10.00',
    //       stock: 10,
    //       selected: false
    //       // Sin comparisonPrice, sku, weight, etc.
    //     }
    //   ];

    //   const variants = genVariants(options, existingVariants);

    //   expect(variants).toHaveLength(1);
    //   expect(variants[0]).toMatchObject({
    //     id: 'v1',
    //     action: 'none',
    //     price: '10.00',
    //     stock: 10
    //   });

    //   // Los campos undefined se preservan
    //   expect(variants[0].comparisonPrice).toBeUndefined();
    //   expect(variants[0].sku).toBeUndefined();
    // });

    test('regenerates when no changes to options', () => {
      const options = [
        {
          id: '1',
          name: 'Size',
          values: [
            { id: 's', name: 'S' },
            { id: 'm', name: 'M' }
          ]
        }
      ];

      const existingVariants = [
        {
          id: 'v-s',
          values: [{ id: 's', name: 'S' }],
          price: '10.00',
          stock: 10,
          selected: false
        },
        {
          id: 'v-m',
          values: [{ id: 'm', name: 'M' }],
          price: '12.00',
          stock: 20,
          selected: false
        }
      ];

      const variants = genVariants(options, existingVariants);

      // Debe retornar las mismas variantes con action 'none'
      expect(variants).toHaveLength(2);
      expect(variants.every(v => v.action === 'none')).toBe(true);
      expect(variants[0]).toMatchObject({ id: 'v-s', price: '10.00' });
      expect(variants[1]).toMatchObject({ id: 'v-m', price: '12.00' });
    });
  });
});
