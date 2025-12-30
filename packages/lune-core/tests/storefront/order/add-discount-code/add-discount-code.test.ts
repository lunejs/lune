import { LunePrice } from '@lunejs/common';
import type { Application } from 'express';
import request from 'supertest';

import { LuneServer } from '@/server';
import { TEST_LUNE_CONFIG } from '@/tests/utils/test-config';
import { TestUtils } from '@/tests/utils/test-utils';

import { CustomerFixtures } from './fixtures/customer.fixtures';
import { DeliveryMethodFixtures } from './fixtures/delivery-method.fixtures';
import { DiscountConstants, DiscountFixtures } from './fixtures/discount.fixtures';
import { OptionFixtures } from './fixtures/option.fixtures';
import { OptionValueFixtures } from './fixtures/option-value.fixtures';
import { OrderConstants, OrderFixtures } from './fixtures/order.fixtures';
import { OrderDiscountFixtures } from './fixtures/order-discount.fixtures';
import { OrderLineFixtures } from './fixtures/order-line.fixtures';
import { ProductFixtures } from './fixtures/product.fixtures';
import { ShopConstants, ShopFixtures } from './fixtures/shop.fixtures';
import { UserFixtures } from './fixtures/user.fixtures';
import { VariantConstants, VariantFixtures } from './fixtures/variant.fixtures';
import { VariantOptionValueFixtures } from './fixtures/variant-option-value.fixtures';

// TODO: add tests for when discount code is already in order, stops being applicable (by conditions met) and then comes back to being applicable
// TODO: add tests for when discount code is already in order, stops being applicable (by admin options (disabled, expired, per customer limit, etc)) and the comes back to being applicable
describe('addDiscountCode - Mutation', () => {
  const testHelper = new TestUtils();

  const luneServer = new LuneServer(TEST_LUNE_CONFIG);
  const app = luneServer.getApp();

  beforeEach(async () => {
    await testHelper.loadFixtures([
      new UserFixtures(),
      new ShopFixtures(),
      new CustomerFixtures(),
      new ProductFixtures(),
      new VariantFixtures(),
      new OptionFixtures(),
      new OptionValueFixtures(),
      new VariantOptionValueFixtures(),
      new OrderFixtures(),
      new OrderLineFixtures(),
      new DeliveryMethodFixtures(),
      new DiscountFixtures(),
      new OrderDiscountFixtures()
    ]);
  });

  afterEach(async () => {
    await testHelper.resetDatabase();
  });

  afterAll(async () => {
    await testHelper.destroyDatabase();
    await luneServer.teardown();
  });

  test('adds order-level discount', async () => {
    const res = await request(app)
      .post('/storefront-api')
      .set('x_lune_shop_id', ShopConstants.ID)
      .set('x_lune_storefront_api_key', ShopConstants.StorefrontApiKey)
      .send({
        query: ADD_DISCOUNT_CODE_TO_ORDER,
        variables: {
          orderId: OrderConstants.ID,
          code: DiscountConstants.OrderDiscountCode
        }
      });

    const {
      addDiscountCodeToOrder: { order }
    } = res.body.data;

    expect(order).toMatchObject({
      id: OrderConstants.ID,
      state: 'MODIFYING',
      subtotal: LunePrice.toCent(2_000),
      total: LunePrice.toCent(2_200),
      placedAt: null,
      completedAt: null,
      totalQuantity: 2,
      deliveryMethod: {
        amount: LunePrice.toCent(200)
      },
      appliedDiscounts: [
        {
          code: DiscountConstants.OrderDiscountCode,
          applicationMode: 'CODE',
          applicationLevel: 'ORDER',
          discountedAmount: LunePrice.toCent(100)
        }
      ],
      lines: {
        items: [
          {
            unitPrice: LunePrice.toCent(800),
            lineSubtotal: LunePrice.toCent(800),
            lineTotal: LunePrice.toCent(800),
            quantity: 1,
            variant: {
              id: VariantConstants.AlreadyInLineID
            }
          },
          {
            unitPrice: LunePrice.toCent(1_300),
            lineSubtotal: LunePrice.toCent(1_300),
            lineTotal: LunePrice.toCent(1_300),
            quantity: 1,
            variant: {
              id: VariantConstants.ID
            }
          }
        ]
      }
    });
  });

  test('adds order-line-level discount', async () => {
    const res = await request(app)
      .post('/storefront-api')
      .set('x_lune_shop_id', ShopConstants.ID)
      .set('x_lune_storefront_api_key', ShopConstants.StorefrontApiKey)
      .send({
        query: ADD_DISCOUNT_CODE_TO_ORDER,
        variables: {
          orderId: OrderConstants.ID,
          code: DiscountConstants.OrderLineDiscountCode
        }
      });

    const {
      addDiscountCodeToOrder: { order }
    } = res.body.data;

    expect(order).toMatchObject({
      id: OrderConstants.ID,
      state: 'MODIFYING',
      subtotal: LunePrice.toCent(1_800),
      total: LunePrice.toCent(2_000),
      placedAt: null,
      completedAt: null,
      totalQuantity: 2,
      deliveryMethod: {
        amount: LunePrice.toCent(200)
      },
      appliedDiscounts: [],
      lines: {
        items: [
          {
            unitPrice: LunePrice.toCent(800),
            lineSubtotal: LunePrice.toCent(800),
            lineTotal: LunePrice.toCent(800),
            quantity: 1,
            appliedDiscounts: [],
            variant: {
              id: VariantConstants.AlreadyInLineID
            }
          },
          {
            unitPrice: LunePrice.toCent(1_300),
            lineSubtotal: LunePrice.toCent(1_300),
            lineTotal: LunePrice.toCent(1_000),
            appliedDiscounts: [
              {
                code: DiscountConstants.OrderLineDiscountCode,
                applicationMode: 'CODE',
                applicationLevel: 'ORDER_LINE',
                discountedAmount: LunePrice.toCent(300)
              }
            ],
            quantity: 1,
            variant: {
              id: VariantConstants.ID
            }
          }
        ]
      }
    });
  });

  test('adds delivery-method-level discount', async () => {
    const res = await request(app)
      .post('/storefront-api')
      .set('x_lune_shop_id', ShopConstants.ID)
      .set('x_lune_storefront_api_key', ShopConstants.StorefrontApiKey)
      .send({
        query: ADD_DISCOUNT_CODE_TO_ORDER,
        variables: {
          orderId: OrderConstants.ID,
          code: DiscountConstants.DeliveryMethodDiscountCode
        }
      });

    const {
      addDiscountCodeToOrder: { order }
    } = res.body.data;

    expect(order).toMatchObject({
      id: OrderConstants.ID,
      state: 'MODIFYING',
      subtotal: LunePrice.toCent(2_100),
      total: LunePrice.toCent(2_250),
      placedAt: null,
      completedAt: null,
      totalQuantity: 2,
      deliveryMethod: {
        amount: LunePrice.toCent(200),
        total: LunePrice.toCent(150)
      },
      appliedDiscounts: [
        {
          code: DiscountConstants.DeliveryMethodDiscountCode,
          applicationMode: 'CODE',
          applicationLevel: 'DELIVERY_METHOD',
          discountedAmount: LunePrice.toCent(50)
        }
      ],
      lines: {
        items: [
          {
            unitPrice: LunePrice.toCent(800),
            lineSubtotal: LunePrice.toCent(800),
            lineTotal: LunePrice.toCent(800),
            quantity: 1,
            variant: {
              id: VariantConstants.AlreadyInLineID
            }
          },
          {
            unitPrice: LunePrice.toCent(1_300),
            lineSubtotal: LunePrice.toCent(1_300),
            lineTotal: LunePrice.toCent(1_300),
            quantity: 1,
            variant: {
              id: VariantConstants.ID
            }
          }
        ]
      }
    });
  });

  test('adds delivery-method-level discount with 0 discounted amount when delivery method is not present', async () => {
    const res = await request(app)
      .post('/storefront-api')
      .set('x_lune_shop_id', ShopConstants.ID)
      .set('x_lune_storefront_api_key', ShopConstants.StorefrontApiKey)
      .send({
        query: ADD_DISCOUNT_CODE_TO_ORDER,
        variables: {
          orderId: OrderConstants.WithoutDeliveryMethodID,
          code: DiscountConstants.DeliveryMethodDiscountCode
        }
      });

    const {
      addDiscountCodeToOrder: { order }
    } = res.body.data;

    expect(order).toMatchObject({
      id: OrderConstants.WithoutDeliveryMethodID,
      state: 'MODIFYING',
      subtotal: LunePrice.toCent(2_100),
      total: LunePrice.toCent(2_100),
      placedAt: null,
      completedAt: null,
      totalQuantity: 2,
      deliveryMethod: null,
      appliedDiscounts: [
        {
          code: DiscountConstants.DeliveryMethodDiscountCode,
          applicationMode: 'CODE',
          applicationLevel: 'DELIVERY_METHOD',
          discountedAmount: 0
        }
      ],
      lines: {
        items: [
          {
            unitPrice: LunePrice.toCent(800),
            lineSubtotal: LunePrice.toCent(800),
            lineTotal: LunePrice.toCent(800),
            quantity: 1,
            variant: {
              id: VariantConstants.AlreadyInLineID
            }
          },
          {
            unitPrice: LunePrice.toCent(1_300),
            lineSubtotal: LunePrice.toCent(1_300),
            lineTotal: LunePrice.toCent(1_300),
            quantity: 1,
            variant: {
              id: VariantConstants.ID
            }
          }
        ]
      }
    });
  });

  test('applies discount when order has no customer and discount has perCustomerLimit', async () => {
    const res = await request(app)
      .post('/storefront-api')
      .set('x_lune_shop_id', ShopConstants.ID)
      .set('x_lune_storefront_api_key', ShopConstants.StorefrontApiKey)
      .send({
        query: ADD_DISCOUNT_CODE_TO_ORDER,
        variables: {
          orderId: OrderConstants.WithoutCustomerID,
          code: DiscountConstants.AlreadyUsedCode
        }
      });

    const {
      addDiscountCodeToOrder: { order }
    } = res.body.data;

    expect(order).toMatchObject({
      id: OrderConstants.WithoutCustomerID,
      state: 'MODIFYING',
      subtotal: LunePrice.toCent(2_000),
      total: LunePrice.toCent(2_200),
      placedAt: null,
      completedAt: null,
      totalQuantity: 2,
      deliveryMethod: {
        amount: LunePrice.toCent(200)
      },
      appliedDiscounts: [
        {
          code: DiscountConstants.AlreadyUsedCode,
          applicationMode: 'CODE',
          applicationLevel: 'ORDER',
          discountedAmount: LunePrice.toCent(100)
        }
      ],
      lines: {
        items: [
          {
            unitPrice: LunePrice.toCent(800),
            lineSubtotal: LunePrice.toCent(800),
            lineTotal: LunePrice.toCent(800),
            quantity: 1,
            variant: {
              id: VariantConstants.AlreadyInLineID
            }
          },
          {
            unitPrice: LunePrice.toCent(1_300),
            lineSubtotal: LunePrice.toCent(1_300),
            lineTotal: LunePrice.toCent(1_300),
            quantity: 1,
            variant: {
              id: VariantConstants.ID
            }
          }
        ]
      }
    });
  });

  test('replaces order-level discount with order-line-level discount', async () => {
    const res = await request(app)
      .post('/storefront-api')
      .set('x_lune_shop_id', ShopConstants.ID)
      .set('x_lune_storefront_api_key', ShopConstants.StorefrontApiKey)
      .send({
        query: ADD_DISCOUNT_CODE_TO_ORDER,
        variables: {
          orderId: OrderConstants.WithOrderLevelDiscountID,
          code: DiscountConstants.OrderLineDiscountCode
        }
      });

    const {
      addDiscountCodeToOrder: { order }
    } = res.body.data;

    expect(order).toMatchObject({
      id: OrderConstants.WithOrderLevelDiscountID,
      state: 'MODIFYING',
      subtotal: LunePrice.toCent(700), // 1000 - 300 discount on line
      total: LunePrice.toCent(900), // 700 + 200 delivery method
      placedAt: null,
      completedAt: null,
      totalQuantity: 1,
      deliveryMethod: {
        amount: LunePrice.toCent(200)
      },
      appliedDiscounts: [], // ORDER_LINE discounts go on lines, not order
      lines: {
        items: [
          {
            unitPrice: LunePrice.toCent(1_000),
            lineSubtotal: LunePrice.toCent(1_000),
            lineTotal: LunePrice.toCent(700), // 1000 - 300 discount
            quantity: 1,
            appliedDiscounts: [
              {
                code: DiscountConstants.OrderLineDiscountCode,
                applicationMode: 'CODE',
                applicationLevel: 'ORDER_LINE',
                discountedAmount: LunePrice.toCent(300)
              }
            ],
            variant: {
              id: VariantConstants.ID
            }
          }
        ]
      }
    });
  });

  test('replaces order-line-level discount with delivery-method-level discount', async () => {
    const res = await request(app)
      .post('/storefront-api')
      .set('x_lune_shop_id', ShopConstants.ID)
      .set('x_lune_storefront_api_key', ShopConstants.StorefrontApiKey)
      .send({
        query: ADD_DISCOUNT_CODE_TO_ORDER,
        variables: {
          orderId: OrderConstants.WithOrderLineLevelDiscountID,
          code: DiscountConstants.DeliveryMethodDiscountCode
        }
      });

    const {
      addDiscountCodeToOrder: { order }
    } = res.body.data;

    expect(order).toMatchObject({
      id: OrderConstants.WithOrderLineLevelDiscountID,
      state: 'MODIFYING',
      subtotal: LunePrice.toCent(1_800), // 800 + 1000 (no line discount anymore)
      total: LunePrice.toCent(1_950), // 1800 + 150 (200 - 50 delivery method discount)
      placedAt: null,
      completedAt: null,
      totalQuantity: 2,
      deliveryMethod: {
        amount: LunePrice.toCent(200),
        total: LunePrice.toCent(150) // 200 - 50 discount
      },
      appliedDiscounts: [
        {
          code: DiscountConstants.DeliveryMethodDiscountCode,
          applicationMode: 'CODE',
          applicationLevel: 'DELIVERY_METHOD',
          discountedAmount: LunePrice.toCent(50)
        }
      ],
      lines: {
        items: [
          {
            unitPrice: LunePrice.toCent(800),
            lineSubtotal: LunePrice.toCent(800),
            lineTotal: LunePrice.toCent(800),
            quantity: 1,
            appliedDiscounts: [],
            variant: {
              id: VariantConstants.AlreadyInLineID
            }
          },
          {
            unitPrice: LunePrice.toCent(1_000),
            lineSubtotal: LunePrice.toCent(1_000),
            lineTotal: LunePrice.toCent(1_000), // 1000 (no discount anymore)
            appliedDiscounts: [],
            quantity: 1,
            variant: {
              id: VariantConstants.ID
            }
          }
        ]
      }
    });
  });

  test('replaces delivery-method-level discount with order-level discount', async () => {
    const res = await request(app)
      .post('/storefront-api')
      .set('x_lune_shop_id', ShopConstants.ID)
      .set('x_lune_storefront_api_key', ShopConstants.StorefrontApiKey)
      .send({
        query: ADD_DISCOUNT_CODE_TO_ORDER,
        variables: {
          orderId: OrderConstants.WithDeliveryMethodLevelDiscountID,
          code: DiscountConstants.OrderDiscountCode
        }
      });

    const {
      addDiscountCodeToOrder: { order }
    } = res.body.data;

    expect(order).toMatchObject({
      id: OrderConstants.WithDeliveryMethodLevelDiscountID,
      state: 'MODIFYING',
      subtotal: LunePrice.toCent(900), // 1000 - 100 order discount
      total: LunePrice.toCent(1_100), // 900 + 200 (no delivery method discount anymore)
      placedAt: null,
      completedAt: null,
      totalQuantity: 1,
      deliveryMethod: {
        amount: LunePrice.toCent(200),
        total: LunePrice.toCent(200) // 200 (no discount anymore)
      },
      appliedDiscounts: [
        {
          code: DiscountConstants.OrderDiscountCode,
          applicationMode: 'CODE',
          applicationLevel: 'ORDER',
          discountedAmount: LunePrice.toCent(100)
        }
      ],
      lines: {
        items: [
          {
            unitPrice: LunePrice.toCent(1_000),
            lineSubtotal: LunePrice.toCent(1_000),
            lineTotal: LunePrice.toCent(1_000),
            quantity: 1,
            variant: {
              id: VariantConstants.ID
            }
          }
        ]
      }
    });
  });

  test('returns FORBIDDEN_ORDER_ACTION error when provided order is not in MODIFYING state', async () => {
    const res = await request(app)
      .post('/storefront-api')
      .set('x_lune_shop_id', ShopConstants.ID)
      .set('x_lune_storefront_api_key', ShopConstants.StorefrontApiKey)
      .send({
        query: ADD_DISCOUNT_CODE_TO_ORDER,
        variables: {
          orderId: OrderConstants.PlacedID,
          code: DiscountConstants.DisabledDiscount
        }
      });

    const {
      addDiscountCodeToOrder: { apiErrors, order }
    } = res.body.data;

    expect(apiErrors[0].code).toBe('FORBIDDEN_ORDER_ACTION');
    expect(order).toBe(null);

    const orderFetched = await fetchOrder(OrderConstants.ID, app);

    expect(orderFetched).toMatchObject({
      subtotal: LunePrice.toCent(2_100),
      total: LunePrice.toCent(2_300),
      deliveryMethod: {
        amount: LunePrice.toCent(200)
      },
      appliedDiscounts: [],
      lines: {
        items: [
          {
            unitPrice: LunePrice.toCent(800),
            lineSubtotal: LunePrice.toCent(800),
            lineTotal: LunePrice.toCent(800)
          },
          {
            unitPrice: LunePrice.toCent(1_300),
            lineSubtotal: LunePrice.toCent(1_300),
            lineTotal: LunePrice.toCent(1_300)
          }
        ]
      }
    });
  });

  test('returns DISCOUNT_CODE_NOT_APPLICABLE error when provided discount does not exists and keeps order without mutations', async () => {
    const res = await request(app)
      .post('/storefront-api')
      .set('x_lune_shop_id', ShopConstants.ID)
      .set('x_lune_storefront_api_key', ShopConstants.StorefrontApiKey)
      .send({
        query: ADD_DISCOUNT_CODE_TO_ORDER,
        variables: {
          orderId: OrderConstants.ID,
          code: 'NON_EXISTING_DISCOUNT_CODE'
        }
      });

    const {
      addDiscountCodeToOrder: { apiErrors, order }
    } = res.body.data;

    expect(apiErrors[0].code).toBe('DISCOUNT_CODE_NOT_APPLICABLE');
    expect(order).toBe(null);

    const orderFetched = await fetchOrder(OrderConstants.ID, app);

    expect(orderFetched).toMatchObject({
      subtotal: LunePrice.toCent(2_100),
      total: LunePrice.toCent(2_300),
      deliveryMethod: {
        amount: LunePrice.toCent(200)
      },
      appliedDiscounts: [],
      lines: {
        items: [
          {
            unitPrice: LunePrice.toCent(800),
            lineSubtotal: LunePrice.toCent(800),
            lineTotal: LunePrice.toCent(800)
          },
          {
            unitPrice: LunePrice.toCent(1_300),
            lineSubtotal: LunePrice.toCent(1_300),
            lineTotal: LunePrice.toCent(1_300)
          }
        ]
      }
    });
  });

  test('returns DISCOUNT_CODE_NOT_APPLICABLE error when provided discount is disabled and keeps order without mutations', async () => {
    const res = await request(app)
      .post('/storefront-api')
      .set('x_lune_shop_id', ShopConstants.ID)
      .set('x_lune_storefront_api_key', ShopConstants.StorefrontApiKey)
      .send({
        query: ADD_DISCOUNT_CODE_TO_ORDER,
        variables: {
          orderId: OrderConstants.ID,
          code: DiscountConstants.DisabledDiscount
        }
      });

    const {
      addDiscountCodeToOrder: { apiErrors, order }
    } = res.body.data;

    expect(apiErrors[0].code).toBe('DISCOUNT_CODE_NOT_APPLICABLE');
    expect(order).toBe(null);

    const orderFetched = await fetchOrder(OrderConstants.ID, app);

    expect(orderFetched).toMatchObject({
      subtotal: LunePrice.toCent(2_100),
      total: LunePrice.toCent(2_300),
      deliveryMethod: {
        amount: LunePrice.toCent(200)
      },
      appliedDiscounts: [],
      lines: {
        items: [
          {
            unitPrice: LunePrice.toCent(800),
            lineSubtotal: LunePrice.toCent(800),
            lineTotal: LunePrice.toCent(800)
          },
          {
            unitPrice: LunePrice.toCent(1_300),
            lineSubtotal: LunePrice.toCent(1_300),
            lineTotal: LunePrice.toCent(1_300)
          }
        ]
      }
    });
  });

  test('returns DISCOUNT_CODE_NOT_APPLICABLE error when provided discount is premature to today date and keeps order without mutations', async () => {
    const res = await request(app)
      .post('/storefront-api')
      .set('x_lune_shop_id', ShopConstants.ID)
      .set('x_lune_storefront_api_key', ShopConstants.StorefrontApiKey)
      .send({
        query: ADD_DISCOUNT_CODE_TO_ORDER,
        variables: {
          orderId: OrderConstants.ID,
          code: DiscountConstants.PrematureDiscount
        }
      });

    const {
      addDiscountCodeToOrder: { apiErrors, order }
    } = res.body.data;

    expect(apiErrors[0].code).toBe('DISCOUNT_CODE_NOT_APPLICABLE');
    expect(order).toBe(null);

    const orderFetched = await fetchOrder(OrderConstants.ID, app);

    expect(orderFetched).toMatchObject({
      subtotal: LunePrice.toCent(2_100),
      total: LunePrice.toCent(2_300),
      deliveryMethod: {
        amount: LunePrice.toCent(200)
      },
      appliedDiscounts: [],
      lines: {
        items: [
          {
            unitPrice: LunePrice.toCent(800),
            lineSubtotal: LunePrice.toCent(800),
            lineTotal: LunePrice.toCent(800)
          },
          {
            unitPrice: LunePrice.toCent(1_300),
            lineSubtotal: LunePrice.toCent(1_300),
            lineTotal: LunePrice.toCent(1_300)
          }
        ]
      }
    });
  });

  test('returns DISCOUNT_CODE_NOT_APPLICABLE error when provided discount is expired and keeps order without mutations', async () => {
    const res = await request(app)
      .post('/storefront-api')
      .set('x_lune_shop_id', ShopConstants.ID)
      .set('x_lune_storefront_api_key', ShopConstants.StorefrontApiKey)
      .send({
        query: ADD_DISCOUNT_CODE_TO_ORDER,
        variables: {
          orderId: OrderConstants.ID,
          code: DiscountConstants.ExpiredDiscount
        }
      });

    const {
      addDiscountCodeToOrder: { apiErrors, order }
    } = res.body.data;

    expect(apiErrors[0].code).toBe('DISCOUNT_CODE_NOT_APPLICABLE');
    expect(order).toBe(null);

    const orderFetched = await fetchOrder(OrderConstants.ID, app);

    expect(orderFetched).toMatchObject({
      subtotal: LunePrice.toCent(2_100),
      total: LunePrice.toCent(2_300),
      deliveryMethod: {
        amount: LunePrice.toCent(200)
      },
      appliedDiscounts: [],
      lines: {
        items: [
          {
            unitPrice: LunePrice.toCent(800),
            lineSubtotal: LunePrice.toCent(800),
            lineTotal: LunePrice.toCent(800)
          },
          {
            unitPrice: LunePrice.toCent(1_300),
            lineSubtotal: LunePrice.toCent(1_300),
            lineTotal: LunePrice.toCent(1_300)
          }
        ]
      }
    });
  });

  test('returns DISCOUNT_CODE_NOT_APPLICABLE error when provided discount exceeds per customer limit and keeps order without mutations', async () => {
    const res = await request(app)
      .post('/storefront-api')
      .set('x_lune_shop_id', ShopConstants.ID)
      .set('x_lune_storefront_api_key', ShopConstants.StorefrontApiKey)
      .send({
        query: ADD_DISCOUNT_CODE_TO_ORDER,
        variables: {
          orderId: OrderConstants.ID,
          code: DiscountConstants.AlreadyUsedCode
        }
      });

    const {
      addDiscountCodeToOrder: { apiErrors, order }
    } = res.body.data;

    expect(apiErrors[0].code).toBe('DISCOUNT_CODE_NOT_APPLICABLE');
    expect(order).toBe(null);

    const orderFetched = await fetchOrder(OrderConstants.ID, app);

    expect(orderFetched).toMatchObject({
      subtotal: LunePrice.toCent(2_100),
      total: LunePrice.toCent(2_300),
      deliveryMethod: {
        amount: LunePrice.toCent(200)
      },
      appliedDiscounts: [],
      lines: {
        items: [
          {
            unitPrice: LunePrice.toCent(800),
            lineSubtotal: LunePrice.toCent(800),
            lineTotal: LunePrice.toCent(800)
          },
          {
            unitPrice: LunePrice.toCent(1_300),
            lineSubtotal: LunePrice.toCent(1_300),
            lineTotal: LunePrice.toCent(1_300)
          }
        ]
      }
    });
  });

  test('returns DISCOUNT_CODE_NOT_APPLICABLE error when provided order-level discount does not apply', async () => {
    const res = await request(app)
      .post('/storefront-api')
      .set('x_lune_shop_id', ShopConstants.ID)
      .set('x_lune_storefront_api_key', ShopConstants.StorefrontApiKey)
      .send({
        query: ADD_DISCOUNT_CODE_TO_ORDER,
        variables: {
          orderId: OrderConstants.ID,
          code: DiscountConstants.OrderDiscountDoesNotApplyCode
        }
      });

    const {
      addDiscountCodeToOrder: { apiErrors, order }
    } = res.body.data;

    expect(apiErrors[0].code).toBe('DISCOUNT_CODE_NOT_APPLICABLE');
    expect(order).toBe(null);

    const orderFetched = await fetchOrder(OrderConstants.ID, app);

    expect(orderFetched).toMatchObject({
      subtotal: LunePrice.toCent(2_100),
      total: LunePrice.toCent(2_300),
      deliveryMethod: {
        amount: LunePrice.toCent(200)
      },
      appliedDiscounts: [],
      lines: {
        items: [
          {
            unitPrice: LunePrice.toCent(800),
            lineSubtotal: LunePrice.toCent(800),
            lineTotal: LunePrice.toCent(800)
          },
          {
            unitPrice: LunePrice.toCent(1_300),
            lineSubtotal: LunePrice.toCent(1_300),
            lineTotal: LunePrice.toCent(1_300)
          }
        ]
      }
    });
  });

  test('returns DISCOUNT_CODE_NOT_APPLICABLE error when provided order-line-level discount does not apply', async () => {
    const res = await request(app)
      .post('/storefront-api')
      .set('x_lune_shop_id', ShopConstants.ID)
      .set('x_lune_storefront_api_key', ShopConstants.StorefrontApiKey)
      .send({
        query: ADD_DISCOUNT_CODE_TO_ORDER,
        variables: {
          orderId: OrderConstants.ID,
          code: DiscountConstants.OrderLineDiscountDoesNotApplyCode
        }
      });

    const {
      addDiscountCodeToOrder: { apiErrors, order }
    } = res.body.data;

    expect(apiErrors[0].code).toBe('DISCOUNT_CODE_NOT_APPLICABLE');
    expect(order).toBe(null);

    const orderFetched = await fetchOrder(OrderConstants.ID, app);

    expect(orderFetched).toMatchObject({
      subtotal: LunePrice.toCent(2_100),
      total: LunePrice.toCent(2_300),
      deliveryMethod: {
        amount: LunePrice.toCent(200)
      },
      appliedDiscounts: [],
      lines: {
        items: [
          {
            unitPrice: LunePrice.toCent(800),
            lineSubtotal: LunePrice.toCent(800),
            lineTotal: LunePrice.toCent(800)
          },
          {
            unitPrice: LunePrice.toCent(1_300),
            lineSubtotal: LunePrice.toCent(1_300),
            lineTotal: LunePrice.toCent(1_300)
          }
        ]
      }
    });
  });

  test('returns DISCOUNT_CODE_NOT_APPLICABLE error when provided delivery-method-level discount does not apply', async () => {
    const res = await request(app)
      .post('/storefront-api')
      .set('x_lune_shop_id', ShopConstants.ID)
      .set('x_lune_storefront_api_key', ShopConstants.StorefrontApiKey)
      .send({
        query: ADD_DISCOUNT_CODE_TO_ORDER,
        variables: {
          orderId: OrderConstants.ID,
          code: DiscountConstants.DeliveryMethodDiscountDoesNotApplyCode
        }
      });

    const {
      addDiscountCodeToOrder: { apiErrors, order }
    } = res.body.data;

    expect(apiErrors[0].code).toBe('DISCOUNT_CODE_NOT_APPLICABLE');
    expect(order).toBe(null);

    const orderFetched = await fetchOrder(OrderConstants.ID, app);

    expect(orderFetched).toMatchObject({
      subtotal: LunePrice.toCent(2_100),
      total: LunePrice.toCent(2_300),
      deliveryMethod: {
        amount: LunePrice.toCent(200)
      },
      appliedDiscounts: [],
      lines: {
        items: [
          {
            unitPrice: LunePrice.toCent(800),
            lineSubtotal: LunePrice.toCent(800),
            lineTotal: LunePrice.toCent(800)
          },
          {
            unitPrice: LunePrice.toCent(1_300),
            lineSubtotal: LunePrice.toCent(1_300),
            lineTotal: LunePrice.toCent(1_300)
          }
        ]
      }
    });
  });

  test('returns UNAUTHORIZED error when storefront api key is invalid', async () => {
    const response = await request(app)
      .post('/storefront-api')
      .set('x_lune_shop_id', ShopConstants.ID)
      .set('x_lune_storefront_api_key', 'invalid_key')
      .send({
        query: ADD_DISCOUNT_CODE_TO_ORDER,
        variables: {
          orderId: OrderConstants.ID,
          code: DiscountConstants.OrderDiscountCode
        }
      });

    expect(response.body.errors[0].extensions.code).toBe('UNAUTHORIZED');
  });

  test('returns UNAUTHORIZED error when no shop id is provided', async () => {
    const response = await request(app)
      .post('/storefront-api')
      .set('x_lune_storefront_api_key', ShopConstants.StorefrontApiKey)
      .send({
        query: ADD_DISCOUNT_CODE_TO_ORDER,
        variables: {
          orderId: OrderConstants.ID,
          code: DiscountConstants.OrderDiscountCode
        }
      });

    expect(response.body.errors[0].extensions.code).toBe('UNAUTHORIZED');
  });
});

const ADD_DISCOUNT_CODE_TO_ORDER = /* GraphQL */ `
  mutation AddDiscountCodeToOrder($orderId: ID!, $code: String!) {
    addDiscountCodeToOrder(orderId: $orderId, code: $code) {
      apiErrors {
        code
        message
      }
      order {
        id
        createdAt
        updatedAt
        code
        state
        total
        subtotal
        placedAt
        completedAt
        totalQuantity
        deliveryMethod {
          id
          amount
          total
        }
        appliedDiscounts {
          code
          applicationMode
          applicationLevel
          discountedAmount
        }
        lines {
          items {
            id
            unitPrice
            lineSubtotal
            lineTotal
            quantity
            appliedDiscounts {
              code
              applicationMode
              applicationLevel
              discountedAmount
            }
            variant {
              id
            }
          }
        }
      }
    }
  }
`;

const FETCH_ORDER = /* GraphQL */ `
  query FetchOrder($id: ID!) {
    order(id: $id) {
      id
      createdAt
      updatedAt
      code
      state
      total
      subtotal
      placedAt
      completedAt
      totalQuantity
      deliveryMethod {
        id
        amount
        total
      }
      appliedDiscounts {
        code
        applicationMode
        applicationLevel
        discountedAmount
      }
      lines {
        items {
          id
          unitPrice
          lineSubtotal
          lineTotal
          quantity
          appliedDiscounts {
            code
            applicationMode
            applicationLevel
            discountedAmount
          }
          variant {
            id
          }
        }
      }
    }
  }
`;

const fetchOrder = async (id: string, app: Application) => {
  const res = await request(app)
    .post('/storefront-api')
    .set('x_lune_shop_id', ShopConstants.ID)
    .set('x_lune_storefront_api_key', ShopConstants.StorefrontApiKey)
    .send({
      query: FETCH_ORDER,
      variables: {
        id
      }
    });

  return res.body.data.order;
};
