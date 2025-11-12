import request from 'supertest';

import { LunePrice } from '@lune/common';

import { FulfillmentType } from '@/api/shared/types/graphql';
import type { FulfillmentTable } from '@/persistence/entities/fulfillment';
import type { ShippingFulfillmentTable } from '@/persistence/entities/shipping-fulfillment';
import { Tables } from '@/persistence/tables';
import { LuneServer } from '@/server';
import { TEST_LUNE_CONFIG } from '@/tests/utils/test-config';
import { TestHelper } from '@/tests/utils/test-helper';

import { CountryFixtures } from './fixtures/country.fixtures';
import { FulfillmentFixtures } from './fixtures/fulfillment.fixtures';
import { OrderConstants, OrderFixtures } from './fixtures/order.fixtures';
import { ShippingFulfillmentFixtures } from './fixtures/shipping-fulfillment.fixtures';
import {
  ShippingMethodConstants,
  ShippingMethodFixtures
} from './fixtures/shipping-method.fixtures';
import { ShopConstants, ShopFixtures } from './fixtures/shop.fixtures';
import { StateFixtures } from './fixtures/state.fixtures';
import { UserFixtures } from './fixtures/user.fixtures';
import { ZoneFixtures } from './fixtures/zone.fixtures';
import { ZoneStateFixtures } from './fixtures/zone-state.fixtures';

describe('addShippingFulfillmentToOrder - Mutation', () => {
  const testHelper = new TestHelper();

  const luneServer = new LuneServer(TEST_LUNE_CONFIG);
  const app = luneServer.getApp();

  beforeEach(async () => {
    await testHelper.loadFixtures([
      new UserFixtures(),
      new ShopFixtures(),
      new CountryFixtures(),
      new StateFixtures(),
      new ZoneFixtures(),
      new ZoneStateFixtures(),
      new ShippingMethodFixtures(),
      new OrderFixtures(),
      new FulfillmentFixtures(),
      new ShippingFulfillmentFixtures()
    ]);
  });

  afterEach(async () => {
    await testHelper.resetDatabase();
  });

  afterAll(async () => {
    await testHelper.destroyDatabase();
    await luneServer.teardown();
  });

  test('adds shipping fulfillment to order', async () => {
    const res = await request(app)
      .post('/storefront-api')
      .set('x_lune_shop_id', ShopConstants.ID)
      .set('x_lune_storefront_api_key', ShopConstants.StorefrontApiKey)
      .send({
        query: ADD_SHIPPING_FULFILLMENT_TO_ORDER_MUTATION,
        variables: {
          orderId: OrderConstants.WithShippingAddressID,
          input: {
            methodId: ShippingMethodConstants.StandardInternationalID
          }
        }
      });

    const {
      addShippingFulfillmentToOrder: { order }
    } = res.body.data;

    expect(order.id).toBe(OrderConstants.WithShippingAddressID);
    expect(order.total).toBe(LunePrice.toCent(170));
    expect(order.subtotal).toBe(LunePrice.toCent(120));

    const { fulfillment } = order;
    expect(fulfillment.type).toBe(FulfillmentType.Shipping);
    expect(fulfillment.amount).toBe(LunePrice.toCent(50));

    const { details } = fulfillment;
    expect(details.method).toBe('Standard International');

    const { shippingMethod } = details;
    expect(shippingMethod.id).toBe(ShippingMethodConstants.StandardInternationalID);
    expect(shippingMethod.name).toBe('Standard International');
  });

  test('adds shipping fulfillment to order with already a fulfillment', async () => {
    const fulfillmentAlreadyCreated = await testHelper
      .getQueryBuilder()<FulfillmentTable>(Tables.Fulfillment)
      .where({ order_id: OrderConstants.WithFulfillmentID })
      .first();

    expect(fulfillmentAlreadyCreated).toBeDefined();

    const res = await request(app)
      .post('/storefront-api')
      .set('x_lune_shop_id', ShopConstants.ID)
      .set('x_lune_storefront_api_key', ShopConstants.StorefrontApiKey)
      .send({
        query: ADD_SHIPPING_FULFILLMENT_TO_ORDER_MUTATION,
        variables: {
          orderId: OrderConstants.WithFulfillmentID,
          input: {
            methodId: ShippingMethodConstants.ExpressInternationalID
          }
        }
      });

    const {
      addShippingFulfillmentToOrder: { order }
    } = res.body.data;

    expect(order.id).toBe(OrderConstants.WithFulfillmentID);
    expect(order.total).toBe(LunePrice.toCent(350));

    const { fulfillment } = order;
    expect(fulfillment.type).toBe(FulfillmentType.Shipping);
    expect(fulfillment.amount).toBe(LunePrice.toCent(100));

    const { details } = fulfillment;
    expect(details.method).toBe('Express International');

    const { shippingMethod } = details;
    expect(shippingMethod.id).toBe(ShippingMethodConstants.ExpressInternationalID);
    expect(shippingMethod.name).toBe('Express International');

    const orderFulfillments = await testHelper
      .getQueryBuilder()<FulfillmentTable>(Tables.Fulfillment)
      .where({ order_id: OrderConstants.WithFulfillmentID });

    expect(orderFulfillments).toHaveLength(1);

    const orderShippingFulfillments = await testHelper
      .getQueryBuilder()<ShippingFulfillmentTable>(Tables.ShippingFulfillment)
      .where({ fulfillment_id: orderFulfillments[0].id });

    expect(orderShippingFulfillments).toHaveLength(1);
  });

  test('returns MISSING_SHIPPING_ADDRESS error when provided order has no shipping address', async () => {
    const res = await request(app)
      .post('/storefront-api')
      .set('x_lune_shop_id', ShopConstants.ID)
      .set('x_lune_storefront_api_key', ShopConstants.StorefrontApiKey)
      .send({
        query: ADD_SHIPPING_FULFILLMENT_TO_ORDER_MUTATION,
        variables: {
          orderId: OrderConstants.ID,
          input: {
            methodId: ShippingMethodConstants.StandardInternationalID
          }
        }
      });

    const {
      addShippingFulfillmentToOrder: { order, apiErrors }
    } = res.body.data;

    const [error] = apiErrors;

    expect(error.code).toBe('MISSING_SHIPPING_ADDRESS');
    expect(order).toBeNull();
  });

  test('returns FORBIDDEN_ORDER_ACTION error when provided order is already placed', async () => {
    const res = await request(app)
      .post('/storefront-api')
      .set('x_lune_shop_id', ShopConstants.ID)
      .set('x_lune_storefront_api_key', ShopConstants.StorefrontApiKey)
      .send({
        query: ADD_SHIPPING_FULFILLMENT_TO_ORDER_MUTATION,
        variables: {
          orderId: OrderConstants.PlacedID,
          input: {
            methodId: ShippingMethodConstants.StandardInternationalID
          }
        }
      });

    const {
      addShippingFulfillmentToOrder: { order, apiErrors }
    } = res.body.data;

    const [error] = apiErrors;

    expect(error.code).toBe('FORBIDDEN_ORDER_ACTION');
    expect(order).toBeNull();
  });

  test('returns INVALID_SHIPPING_METHOD error when provided shipping method is not available for the order shipping address', async () => {
    const res = await request(app)
      .post('/storefront-api')
      .set('x_lune_shop_id', ShopConstants.ID)
      .set('x_lune_storefront_api_key', ShopConstants.StorefrontApiKey)
      .send({
        query: ADD_SHIPPING_FULFILLMENT_TO_ORDER_MUTATION,
        variables: {
          orderId: OrderConstants.WithoutAvailableShippingMethod,
          input: {
            methodId: ShippingMethodConstants.StandardInternationalID
          }
        }
      });

    const {
      addShippingFulfillmentToOrder: { order, apiErrors }
    } = res.body.data;

    const [error] = apiErrors;

    expect(error.code).toBe('INVALID_SHIPPING_METHOD');
    expect(order).toBeNull();
  });
});

const ADD_SHIPPING_FULFILLMENT_TO_ORDER_MUTATION = /* GraphQL */ `
  mutation AddShippingFulfillment($orderId: ID!, $input: AddShippingFulfillmentInput!) {
    addShippingFulfillmentToOrder(orderId: $orderId, input: $input) {
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
        fulfillment {
          id
          createdAt
          updatedAt
          type
          amount
          details {
            ... on ShippingFulfillment {
              id
              method
              shippingMethod {
                id
                name
              }
            }
          }
        }
      }
    }
  }
`;
