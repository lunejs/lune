import request from 'supertest';

import { LunePrice } from '@lunejs/common';

import { DeliveryMethodType } from '@/api/shared/types/graphql';
import type { DeliveryMethodTable } from '@/persistence/entities/delivery-method';
import type { DeliveryMethodPickupTable } from '@/persistence/entities/delivery-method-pickup';
import type { DeliveryMethodShippingTable } from '@/persistence/entities/delivery-method-shipping';
import { Tables } from '@/persistence/tables';
import { LuneServer } from '@/server';
import { TEST_LUNE_CONFIG } from '@/tests/utils/test-config';
import { TestUtils } from '@/tests/utils/test-utils';

import { CountryFixtures } from './fixtures/country.fixtures';
import { DeliveryMethodFixtures } from './fixtures/delivery-method.fixtures';
import { DeliveryMethodPickupFixtures } from './fixtures/delivery-method-pickup.fixtures';
import { DeliveryMethodShippingFixtures } from './fixtures/delivery-method-shipping.fixtures';
import { LocationFixtures } from './fixtures/location.fixtures';
import { OrderConstants, OrderFixtures } from './fixtures/order.fixtures';
import {
  ShippingMethodConstants,
  ShippingMethodFixtures
} from './fixtures/shipping-method.fixtures';
import { ShopConstants, ShopFixtures } from './fixtures/shop.fixtures';
import { StateFixtures } from './fixtures/state.fixtures';
import { UserFixtures } from './fixtures/user.fixtures';
import { ZoneFixtures } from './fixtures/zone.fixtures';
import { ZoneStateFixtures } from './fixtures/zone-state.fixtures';

describe('addDeliveryMethodShippingToOrder - Mutation', () => {
  const testHelper = new TestUtils();

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
      new DeliveryMethodFixtures(),
      new DeliveryMethodShippingFixtures(),
      new DeliveryMethodPickupFixtures()
    ]);
  });

  afterEach(async () => {
    await testHelper.resetDatabase();
  });

  afterAll(async () => {
    await testHelper.destroyDatabase();
    await luneServer.teardown();
  });

  test('adds shipping delivery method to order', async () => {
    const res = await request(app)
      .post('/storefront-api')
      .set('x_lune_shop_id', ShopConstants.ID)
      .set('x_lune_storefront_api_key', ShopConstants.StorefrontApiKey)
      .send({
        query: ADD_SHIPPING_DELIVERY_METHOD_TO_ORDER_MUTATION,
        variables: {
          orderId: OrderConstants.WithShippingAddressID,
          input: {
            methodId: ShippingMethodConstants.StandardInternationalID
          }
        }
      });

    const {
      addDeliveryMethodShippingToOrder: { order }
    } = res.body.data;

    expect(order.id).toBe(OrderConstants.WithShippingAddressID);
    expect(order.total).toBe(LunePrice.toCent(170)); // $120 subtotal + $50 shipping
    expect(order.subtotal).toBe(LunePrice.toCent(120));

    const { deliveryMethod } = order;
    expect(deliveryMethod.type).toBe(DeliveryMethodType.Shipping);
    expect(deliveryMethod.amount).toBe(LunePrice.toCent(50));

    const { details } = deliveryMethod;
    expect(details.method).toBe('Standard International');

    const { shippingMethod } = details;
    expect(shippingMethod.id).toBe(ShippingMethodConstants.StandardInternationalID);
    expect(shippingMethod.name).toBe('Standard International');
  });

  test('adds shipping delivery method to order with already a delivery method', async () => {
    // Verify order already has a delivery method (SHIPPING type)
    const deliveryMethodAlreadyCreated = await testHelper
      .getQueryBuilder()<DeliveryMethodTable>(Tables.DeliveryMethod)
      .where({ order_id: OrderConstants.WithDeliveryMethodID })
      .first();

    expect(deliveryMethodAlreadyCreated).toBeDefined();

    const res = await request(app)
      .post('/storefront-api')
      .set('x_lune_shop_id', ShopConstants.ID)
      .set('x_lune_storefront_api_key', ShopConstants.StorefrontApiKey)
      .send({
        query: ADD_SHIPPING_DELIVERY_METHOD_TO_ORDER_MUTATION,
        variables: {
          orderId: OrderConstants.WithDeliveryMethodID,
          input: {
            methodId: ShippingMethodConstants.ExpressInternationalID
          }
        }
      });

    const {
      addDeliveryMethodShippingToOrder: { order }
    } = res.body.data;

    expect(order.id).toBe(OrderConstants.WithDeliveryMethodID);
    expect(order.total).toBe(LunePrice.toCent(350)); // $300 subtotal + $100 express shipping (updated)

    // Verify delivery method was updated with new shipping method and amount
    const { deliveryMethod } = order;
    expect(deliveryMethod.type).toBe(DeliveryMethodType.Shipping);
    expect(deliveryMethod.amount).toBe(LunePrice.toCent(100)); // Express is more expensive than Standard

    // Verify shipping method was updated
    const { details } = deliveryMethod;
    expect(details.method).toBe('Express International');

    const { shippingMethod } = details;
    expect(shippingMethod.id).toBe(ShippingMethodConstants.ExpressInternationalID);
    expect(shippingMethod.name).toBe('Express International');

    // Verify DB: still only one delivery method exists (updated, not created new)
    const orderDeliveryMethods = await testHelper
      .getQueryBuilder()<DeliveryMethodTable>(Tables.DeliveryMethod)
      .where({ order_id: OrderConstants.WithDeliveryMethodID });

    expect(orderDeliveryMethods).toHaveLength(1); // Same delivery method, just updated

    // Verify DB: still only one delivery_method_shipping record (updated, not created new)
    const orderDeliveryMethodShipping = await testHelper
      .getQueryBuilder()<DeliveryMethodShippingTable>(Tables.DeliveryMethodShipping)
      .where({ delivery_method_id: orderDeliveryMethods[0].id });

    expect(orderDeliveryMethodShipping).toHaveLength(1); // Same record, just updated
  });

  test('replaces pickup delivery method with shipping delivery method', async () => {
    const deliveryMethodAlreadyCreated = await testHelper
      .getQueryBuilder()<DeliveryMethodTable>(Tables.DeliveryMethod)
      .where({ order_id: OrderConstants.WithPickupDeliveryMethodID })
      .first();

    const pickupDeliveryMethodBefore = await testHelper
      .getQueryBuilder()<DeliveryMethodPickupTable>(Tables.DeliveryMethodPickup)
      .where({ delivery_method_id: deliveryMethodAlreadyCreated?.id })
      .first();

    // Verify initial state: order has PICKUP delivery method
    expect(deliveryMethodAlreadyCreated).toBeDefined();
    expect(deliveryMethodAlreadyCreated?.type).toBe(DeliveryMethodType.Pickup);
    expect(pickupDeliveryMethodBefore).toBeDefined();

    const res = await request(app)
      .post('/storefront-api')
      .set('x_lune_shop_id', ShopConstants.ID)
      .set('x_lune_storefront_api_key', ShopConstants.StorefrontApiKey)
      .send({
        query: ADD_SHIPPING_DELIVERY_METHOD_TO_ORDER_MUTATION,
        variables: {
          orderId: OrderConstants.WithPickupDeliveryMethodID,
          input: {
            methodId: ShippingMethodConstants.StandardInternationalID
          }
        }
      });

    const {
      addDeliveryMethodShippingToOrder: { order }
    } = res.body.data;

    expect(order.id).toBe(OrderConstants.WithPickupDeliveryMethodID);
    expect(order.total).toBe(LunePrice.toCent(250)); // $200 subtotal + $50 shipping

    // Verify delivery method type changed to SHIPPING
    const { deliveryMethod } = order;
    expect(deliveryMethod.type).toBe(DeliveryMethodType.Shipping);
    expect(deliveryMethod.amount).toBe(LunePrice.toCent(50));

    // Verify shipping delivery method details are present
    const { details } = deliveryMethod;
    expect(details.method).toBe('Standard International');
    expect(details.shippingMethod).toBeDefined();
    expect(details.location).toBeUndefined(); // Should not have Pickup fields

    const { shippingMethod } = details;
    expect(shippingMethod.id).toBe(ShippingMethodConstants.StandardInternationalID);
    expect(shippingMethod.name).toBe('Standard International');

    // Verify DB: only one delivery method exists for the order
    const orderDeliveryMethods = await testHelper
      .getQueryBuilder()<DeliveryMethodTable>(Tables.DeliveryMethod)
      .where({ order_id: OrderConstants.WithPickupDeliveryMethodID });

    expect(orderDeliveryMethods).toHaveLength(1); // Only one delivery method record
    expect(orderDeliveryMethods[0].type).toBe(DeliveryMethodType.Shipping); // Type updated to SHIPPING

    // Verify DB: delivery_method_shipping record was created
    const orderDeliveryMethodShipping = await testHelper
      .getQueryBuilder()<DeliveryMethodShippingTable>(Tables.DeliveryMethodShipping)
      .where({ delivery_method_id: orderDeliveryMethods[0].id });

    expect(orderDeliveryMethodShipping).toHaveLength(1); // New shipping record created

    // Verify DB: delivery_method_pickup record was deleted
    const pickupDeliveryMethodAfter = await testHelper
      .getQueryBuilder()<DeliveryMethodPickupTable>(Tables.DeliveryMethodPickup)
      .where({ id: pickupDeliveryMethodBefore?.id });

    expect(pickupDeliveryMethodAfter).toHaveLength(0); // Old pickup record deleted
  });

  test('returns MISSING_SHIPPING_ADDRESS error when provided order has no shipping address', async () => {
    const res = await request(app)
      .post('/storefront-api')
      .set('x_lune_shop_id', ShopConstants.ID)
      .set('x_lune_storefront_api_key', ShopConstants.StorefrontApiKey)
      .send({
        query: ADD_SHIPPING_DELIVERY_METHOD_TO_ORDER_MUTATION,
        variables: {
          orderId: OrderConstants.ID,
          input: {
            methodId: ShippingMethodConstants.StandardInternationalID
          }
        }
      });

    const {
      addDeliveryMethodShippingToOrder: { order, apiErrors }
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
        query: ADD_SHIPPING_DELIVERY_METHOD_TO_ORDER_MUTATION,
        variables: {
          orderId: OrderConstants.PlacedID,
          input: {
            methodId: ShippingMethodConstants.StandardInternationalID
          }
        }
      });

    const {
      addDeliveryMethodShippingToOrder: { order, apiErrors }
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
        query: ADD_SHIPPING_DELIVERY_METHOD_TO_ORDER_MUTATION,
        variables: {
          orderId: OrderConstants.WithoutAvailableShippingMethod,
          input: {
            methodId: ShippingMethodConstants.StandardInternationalID
          }
        }
      });

    const {
      addDeliveryMethodShippingToOrder: { order, apiErrors }
    } = res.body.data;

    const [error] = apiErrors;

    // Verify error is returned and order is null
    expect(error.code).toBe('INVALID_SHIPPING_METHOD'); // Shipping method not available for this address
    expect(order).toBeNull(); // No order returned on error
  });

  test('returns UNAUTHORIZED error when storefront api key is invalid', async () => {
    const response = await request(app)
      .post('/storefront-api')
      .set('x_lune_shop_id', ShopConstants.ID)
      .set('x_lune_storefront_api_key', 'invalid_key')
      .send({
        query: ADD_SHIPPING_DELIVERY_METHOD_TO_ORDER_MUTATION,
        variables: {
          orderId: OrderConstants.WithShippingAddressID,
          input: {
            methodId: ShippingMethodConstants.StandardInternationalID
          }
        }
      });

    expect(response.body.errors[0].extensions.code).toBe('UNAUTHORIZED');
  });

  test('returns UNAUTHORIZED error when no shop id is provided', async () => {
    const response = await request(app)
      .post('/storefront-api')
      .set('x_lune_storefront_api_key', ShopConstants.StorefrontApiKey)
      .send({
        query: ADD_SHIPPING_DELIVERY_METHOD_TO_ORDER_MUTATION,
        variables: {
          orderId: OrderConstants.WithShippingAddressID,
          input: {
            methodId: ShippingMethodConstants.StandardInternationalID
          }
        }
      });

    expect(response.body.errors[0].extensions.code).toBe('UNAUTHORIZED');
  });
});

const ADD_SHIPPING_DELIVERY_METHOD_TO_ORDER_MUTATION = /* GraphQL */ `
  mutation AddShippingDeliveryMethod($orderId: ID!, $input: AddDeliveryMethodShippingInput!) {
    addDeliveryMethodShippingToOrder(orderId: $orderId, input: $input) {
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
          createdAt
          updatedAt
          type
          amount
          details {
            ... on DeliveryMethodShipping {
              id
              method
              shippingMethod {
                id
                name
              }
            }
            ... on DeliveryMethodPickup {
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
