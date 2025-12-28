import { addMonths } from 'date-fns';
import request from 'supertest';

import { DiscountApplicationLevel, DiscountApplicationMode } from '@/api/shared/types/graphql';
import { LuneServer } from '@/server';
import { TEST_LUNE_CONFIG } from '@/tests/utils/test-config';
import { TestUtils } from '@/tests/utils/test-utils';

import { DiscountConstants, DiscountFixtures } from './fixtures/discount.fixtures';
import { ShopConstants, ShopFixtures } from './fixtures/shop.fixtures';
import { UserConstants, UserFixtures } from './fixtures/user.fixtures';

describe('createDiscount - Mutation', () => {
  const testHelper = new TestUtils();

  const luneServer = new LuneServer(TEST_LUNE_CONFIG);
  const app = luneServer.getApp();

  beforeEach(async () => {
    await testHelper.loadFixtures([new UserFixtures(), new ShopFixtures(), new DiscountFixtures()]);
  });

  afterEach(async () => {
    await testHelper.resetDatabase();
  });

  afterAll(async () => {
    await testHelper.destroyDatabase();
    await luneServer.teardown();
  });

  test('creates a basic discount with application mode as code', async () => {
    const startsAt = new Date('2024-11-08');

    const res = await request(app)
      .post('/admin-api')
      .set('Authorization', `Bearer ${UserConstants.AccessToken}`)
      .set('x_lune_shop_id', ShopConstants.ID)
      .send({
        query: CREATE_DISCOUNT_MUTATION,
        variables: {
          input: {
            code: 'SUMMER2024',
            applicationMode: DiscountApplicationMode.Code,
            applicationLevel: DiscountApplicationLevel.Order,
            startsAt: startsAt,
            handler: {
              code: 'order-discount',
              args: {
                discountValue: { type: 'percentage', value: 20 },
                orderRequirements: { type: 'none' }
              }
            }
          }
        }
      });

    const {
      createDiscount: { discount, apiErrors }
    } = res.body.data;

    expect(apiErrors).toHaveLength(0);
    expect(discount).toMatchObject({
      code: 'SUMMER2024',
      applicationMode: 'CODE',
      applicationLevel: 'ORDER',
      enabled: true,
      startsAt: startsAt.toISOString(),
      handler: {
        code: 'order-discount',
        args: {
          discountValue: { type: 'percentage', value: 20 },
          orderRequirements: { type: 'none' }
        }
      }
    });
  });

  test('creates a discount with application mode as automatic', async () => {
    const startsAt = new Date('2025-11-08');

    const res = await request(app)
      .post('/admin-api')
      .set('Authorization', `Bearer ${UserConstants.AccessToken}`)
      .set('x_lune_shop_id', ShopConstants.ID)
      .send({
        query: CREATE_DISCOUNT_MUTATION,
        variables: {
          input: {
            code: 'Auto Winter Sale',
            applicationMode: DiscountApplicationMode.Automatic,
            applicationLevel: DiscountApplicationLevel.Order,
            startsAt: startsAt,
            handler: {
              code: 'order-discount',
              args: {
                discountValue: { type: 'fixed', value: 1000 },
                orderRequirements: { type: 'minimum_amount', value: 5000 }
              }
            }
          }
        }
      });

    const {
      createDiscount: { discount, apiErrors }
    } = res.body.data;

    expect(apiErrors).toHaveLength(0);
    expect(discount).toMatchObject({
      code: 'Auto Winter Sale',
      applicationMode: 'AUTOMATIC',
      applicationLevel: 'ORDER',
      enabled: true,
      startsAt: startsAt.toISOString(),
      handler: {
        code: 'order-discount',
        args: {
          discountValue: { type: 'fixed', value: 1000 },
          orderRequirements: { type: 'minimum_amount', value: 5000 }
        }
      }
    });
  });

  test('creates a discount with application level as order line', async () => {
    const startsAt = new Date('2025-11-08');

    const res = await request(app)
      .post('/admin-api')
      .set('Authorization', `Bearer ${UserConstants.AccessToken}`)
      .set('x_lune_shop_id', ShopConstants.ID)
      .send({
        query: CREATE_DISCOUNT_MUTATION,
        variables: {
          input: {
            code: 'PRODUCT20',
            applicationMode: DiscountApplicationMode.Code,
            applicationLevel: DiscountApplicationLevel.OrderLine,
            startsAt: startsAt,
            handler: {
              code: 'product-discount',
              args: {
                discountValue: { type: 'percentage', value: 20 },
                orderRequirements: { type: 'none' },
                variants: []
              }
            }
          }
        }
      });

    const {
      createDiscount: { discount, apiErrors }
    } = res.body.data;

    expect(apiErrors).toHaveLength(0);
    expect(discount).toMatchObject({
      code: 'PRODUCT20',
      applicationMode: 'CODE',
      applicationLevel: 'ORDER_LINE',
      enabled: true,
      startsAt: startsAt.toISOString(),
      handler: {
        code: 'product-discount',
        args: {
          discountValue: { type: 'percentage', value: 20 },
          orderRequirements: { type: 'none' },
          variants: []
        }
      }
    });
  });

  test('creates a discount with application level as fulfillment', async () => {
    const startsAt = new Date('2025-11-08');

    const res = await request(app)
      .post('/admin-api')
      .set('Authorization', `Bearer ${UserConstants.AccessToken}`)
      .set('x_lune_shop_id', ShopConstants.ID)
      .send({
        query: CREATE_DISCOUNT_MUTATION,
        variables: {
          input: {
            code: 'FREE_SHIP',
            applicationMode: DiscountApplicationMode.Code,
            applicationLevel: DiscountApplicationLevel.DeliveryMethod,
            startsAt: startsAt,
            handler: {
              code: 'free-shipping-discount',
              args: {
                orderRequirements: { type: 'minimum_amount', value: 10000 }
              }
            }
          }
        }
      });

    const {
      createDiscount: { discount, apiErrors }
    } = res.body.data;

    expect(apiErrors).toHaveLength(0);
    expect(discount).toMatchObject({
      code: 'FREE_SHIP',
      applicationMode: 'CODE',
      applicationLevel: 'DELIVERY_METHOD',
      enabled: true,
      startsAt: startsAt.toISOString(),
      handler: {
        code: 'free-shipping-discount',
        args: {
          orderRequirements: { type: 'minimum_amount', value: 10000 }
        }
      }
    });
  });

  test('creates a discount with optional fields', async () => {
    const startsAt = new Date('2025-11-08');
    const endsAt = addMonths(startsAt, 3);

    const res = await request(app)
      .post('/admin-api')
      .set('Authorization', `Bearer ${UserConstants.AccessToken}`)
      .set('x_lune_shop_id', ShopConstants.ID)
      .send({
        query: CREATE_DISCOUNT_MUTATION,
        variables: {
          input: {
            code: 'DISABLED10',
            applicationMode: DiscountApplicationMode.Code,
            applicationLevel: DiscountApplicationLevel.Order,
            startsAt: startsAt,
            enabled: false,
            perCustomerLimit: 1,
            endsAt: endsAt,
            handler: {
              code: 'order-discount',
              args: {
                discountValue: { type: 'percentage', value: 10 },
                orderRequirements: { type: 'none' }
              }
            }
          }
        }
      });

    const {
      createDiscount: { discount, apiErrors }
    } = res.body.data;

    expect(apiErrors).toHaveLength(0);
    expect(discount).toMatchObject({
      code: 'DISABLED10',
      applicationMode: 'CODE',
      applicationLevel: 'ORDER',
      enabled: false,
      perCustomerLimit: 1,
      startsAt: startsAt.toISOString(),
      endsAt: endsAt.toISOString(),
      handler: {
        code: 'order-discount',
        args: {
          discountValue: { type: 'percentage', value: 10 },
          orderRequirements: { type: 'none' }
        }
      }
    });
  });

  test('returns CODE_ALREADY_EXISTS error when creating discount with duplicate code', async () => {
    const res = await request(app)
      .post('/admin-api')
      .set('Authorization', `Bearer ${UserConstants.AccessToken}`)
      .set('x_lune_shop_id', ShopConstants.ID)
      .send({
        query: CREATE_DISCOUNT_MUTATION,
        variables: {
          input: {
            code: DiscountConstants.DuplicateCode,
            applicationMode: DiscountApplicationMode.Code,
            applicationLevel: DiscountApplicationLevel.Order,
            startsAt: new Date(),
            handler: {
              code: 'order-discount',
              args: {
                discountValue: { type: 'percentage', value: 10 },
                orderRequirements: { type: 'none' }
              }
            }
          }
        }
      });

    const {
      createDiscount: { discount, apiErrors }
    } = res.body.data;
    const [error] = apiErrors;

    expect(error.code).toBe('CODE_ALREADY_EXISTS');
    expect(error.message).toContain(DiscountConstants.DuplicateCode);
    expect(discount).toBeNull();
  });

  test('returns Authorization error when no token is provided', async () => {
    const response = await request(app)
      .post('/admin-api')
      .send({
        query: CREATE_DISCOUNT_MUTATION,
        variables: {
          input: {
            code: 'NO_AUTH',
            applicationMode: DiscountApplicationMode.Code,
            applicationLevel: DiscountApplicationLevel.Order,
            startsAt: new Date(),
            handler: {
              code: 'order-discount',
              args: {
                discountValue: { type: 'percentage', value: 10 },
                orderRequirements: { type: 'none' }
              }
            }
          }
        }
      });

    expect(response.body.errors[0].extensions.code).toBe('UNAUTHORIZED');
  });
});

const CREATE_DISCOUNT_MUTATION = /* GraphQL */ `
  mutation CreateDiscount($input: CreateDiscountInput!) {
    createDiscount(input: $input) {
      apiErrors {
        code
        message
      }
      discount {
        id
        createdAt
        updatedAt
        code
        applicationMode
        applicationLevel
        perCustomerLimit
        startsAt
        endsAt
        enabled
        handler {
          code
          args
        }
      }
    }
  }
`;
