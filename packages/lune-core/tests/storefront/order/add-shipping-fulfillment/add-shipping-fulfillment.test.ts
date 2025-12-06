import request from 'supertest';

import { LunePrice } from '@lune/common';

import { FulfillmentType } from '@/api/shared/types/graphql';
import type { FulfillmentTable } from '@/persistence/entities/fulfillment';
import type { InStorePickupFulfillmentTable } from '@/persistence/entities/in-store-pickup-fulfillment';
import type { ShippingFulfillmentTable } from '@/persistence/entities/shipping-fulfillment';
import { Tables } from '@/persistence/tables';
import { LuneServer } from '@/server';
import { TEST_LUNE_CONFIG } from '@/tests/utils/test-config';
import { TestHelper } from '@/tests/utils/test-helper';

import { CountryFixtures } from './fixtures/country.fixtures';
import { FulfillmentFixtures } from './fixtures/fulfillment.fixtures';
import { InStorePickupFulfillmentFixtures } from './fixtures/in-store-pickup-fulfillment.fixtures';
import { LocationFixtures } from './fixtures/location.fixtures';
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
      new LocationFixtures(),
      new FulfillmentFixtures(),
      new ShippingFulfillmentFixtures(),
      new InStorePickupFulfillmentFixtures()
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
    expect(order.total).toBe(LunePrice.toCent(170)); // $120 subtotal + $50 shipping
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
    // Verify order already has a fulfillment (SHIPPING type)
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
    expect(order.total).toBe(LunePrice.toCent(350)); // $300 subtotal + $100 express shipping (updated)

    // Verify fulfillment was updated with new shipping method and amount
    const { fulfillment } = order;
    expect(fulfillment.type).toBe(FulfillmentType.Shipping);
    expect(fulfillment.amount).toBe(LunePrice.toCent(100)); // Express is more expensive than Standard

    // Verify shipping method was updated
    const { details } = fulfillment;
    expect(details.method).toBe('Express International');

    const { shippingMethod } = details;
    expect(shippingMethod.id).toBe(ShippingMethodConstants.ExpressInternationalID);
    expect(shippingMethod.name).toBe('Express International');

    // Verify DB: still only one fulfillment exists (updated, not created new)
    const orderFulfillments = await testHelper
      .getQueryBuilder()<FulfillmentTable>(Tables.Fulfillment)
      .where({ order_id: OrderConstants.WithFulfillmentID });

    expect(orderFulfillments).toHaveLength(1); // Same fulfillment, just updated

    // Verify DB: still only one shipping_fulfillment record (updated, not created new)
    const orderShippingFulfillments = await testHelper
      .getQueryBuilder()<ShippingFulfillmentTable>(Tables.ShippingFulfillment)
      .where({ fulfillment_id: orderFulfillments[0].id });

    expect(orderShippingFulfillments).toHaveLength(1); // Same record, just updated
  });

  test('replaces in-store pickup fulfillment with shipping fulfillment', async () => {
    const fulfillmentAlreadyCreated = await testHelper
      .getQueryBuilder()<FulfillmentTable>(Tables.Fulfillment)
      .where({ order_id: OrderConstants.WithInStorePickupFulfillmentID })
      .first();

    const inStorePickupFulfillmentBefore = await testHelper
      .getQueryBuilder()<InStorePickupFulfillmentTable>(Tables.InStorePickupFulfillment)
      .where({ fulfillment_id: fulfillmentAlreadyCreated?.id })
      .first();

    // Verify initial state: order has IN_STORE_PICKUP fulfillment
    expect(fulfillmentAlreadyCreated).toBeDefined();
    expect(fulfillmentAlreadyCreated?.type).toBe(FulfillmentType.InStorePickup);
    expect(inStorePickupFulfillmentBefore).toBeDefined();

    const res = await request(app)
      .post('/storefront-api')
      .set('x_lune_shop_id', ShopConstants.ID)
      .set('x_lune_storefront_api_key', ShopConstants.StorefrontApiKey)
      .send({
        query: ADD_SHIPPING_FULFILLMENT_TO_ORDER_MUTATION,
        variables: {
          orderId: OrderConstants.WithInStorePickupFulfillmentID,
          input: {
            methodId: ShippingMethodConstants.StandardInternationalID
          }
        }
      });

    const {
      addShippingFulfillmentToOrder: { order }
    } = res.body.data;

    expect(order.id).toBe(OrderConstants.WithInStorePickupFulfillmentID);
    expect(order.total).toBe(LunePrice.toCent(250)); // $200 subtotal + $50 shipping

    // Verify fulfillment type changed to SHIPPING
    const { fulfillment } = order;
    expect(fulfillment.type).toBe(FulfillmentType.Shipping);
    expect(fulfillment.amount).toBe(LunePrice.toCent(50));

    // Verify shipping fulfillment details are present
    const { details } = fulfillment;
    expect(details.method).toBe('Standard International');
    expect(details.shippingMethod).toBeDefined();
    expect(details.location).toBeUndefined(); // Should not have InStorePickup fields

    const { shippingMethod } = details;
    expect(shippingMethod.id).toBe(ShippingMethodConstants.StandardInternationalID);
    expect(shippingMethod.name).toBe('Standard International');

    // Verify DB: only one fulfillment exists for the order
    const orderFulfillments = await testHelper
      .getQueryBuilder()<FulfillmentTable>(Tables.Fulfillment)
      .where({ order_id: OrderConstants.WithInStorePickupFulfillmentID });

    expect(orderFulfillments).toHaveLength(1); // Only one fulfillment record
    expect(orderFulfillments[0].type).toBe(FulfillmentType.Shipping); // Type updated to SHIPPING

    // Verify DB: shipping_fulfillment record was created
    const orderShippingFulfillments = await testHelper
      .getQueryBuilder()<ShippingFulfillmentTable>(Tables.ShippingFulfillment)
      .where({ fulfillment_id: orderFulfillments[0].id });

    expect(orderShippingFulfillments).toHaveLength(1); // New shipping_fulfillment created

    // Verify DB: in_store_pickup_fulfillment record was deleted
    const inStorePickupFulfillmentAfter = await testHelper
      .getQueryBuilder()<InStorePickupFulfillmentTable>(Tables.InStorePickupFulfillment)
      .where({ id: inStorePickupFulfillmentBefore?.id });

    expect(inStorePickupFulfillmentAfter).toHaveLength(0); // Old pickup fulfillment deleted
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

    // Verify error is returned and order is null
    expect(error.code).toBe('INVALID_SHIPPING_METHOD'); // Shipping method not available for this address
    expect(order).toBeNull(); // No order returned on error
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
            ... on InStorePickupFulfillment {
              id
              address {
                name
                city
              }
              location {
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
