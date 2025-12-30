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
import { LocationConstants, LocationFixtures } from './fixtures/location.fixtures';
import { OrderConstants, OrderFixtures } from './fixtures/order.fixtures';
import { ShippingMethodFixtures } from './fixtures/shipping-method.fixtures';
import { ShopConstants, ShopFixtures } from './fixtures/shop.fixtures';
import { StateFixtures } from './fixtures/state.fixtures';
import { UserFixtures } from './fixtures/user.fixtures';
import { ZoneFixtures } from './fixtures/zone.fixtures';
import { ZoneStateFixtures } from './fixtures/zone-state.fixtures';

describe('addDeliveryMethodPickupToOrder - Mutation', () => {
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

  test('adds pickup delivery method to order', async () => {
    const res = await request(app)
      .post('/storefront-api')
      .set('x_lune_shop_id', ShopConstants.ID)
      .set('x_lune_storefront_api_key', ShopConstants.StorefrontApiKey)
      .send({
        query: ADD_DELIVERY_METHOD_PICKUP_TO_ORDER_MUTATION,
        variables: {
          orderId: OrderConstants.ID,
          input: {
            locationId: LocationConstants.ID
          }
        }
      });

    const {
      addDeliveryMethodPickupToOrder: { order }
    } = res.body.data;

    // Verify order totals (no additional cost for pickup)
    expect(order.id).toBe(OrderConstants.ID);
    expect(order.total).toBe(LunePrice.toCent(150)); // Same as subtotal (pickup is free)
    expect(order.subtotal).toBe(LunePrice.toCent(150));

    // Verify delivery method was created with correct type and amount
    const { deliveryMethod } = order;
    expect(deliveryMethod.type).toBe(DeliveryMethodType.Pickup);
    expect(deliveryMethod.amount).toBe(LunePrice.toCent(0)); // Pickup is free

    // Verify location details
    const { details } = deliveryMethod;
    expect(details.address.name).toBe('New York Store');
    expect(details.address.city).toBe('New York');
    expect(details.location.id).toBe(LocationConstants.ID);
    expect(details.location.id).toBe(LocationConstants.ID);
  });

  test('adds pickup delivery method to order with already a delivery method', async () => {
    // Verify order already has a delivery method (PICKUP type)
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
        query: ADD_DELIVERY_METHOD_PICKUP_TO_ORDER_MUTATION,
        variables: {
          orderId: OrderConstants.WithDeliveryMethodID,
          input: {
            locationId: LocationConstants.SecondLocationID
          }
        }
      });

    const {
      addDeliveryMethodPickupToOrder: { order }
    } = res.body.data;

    // Verify order totals (still no cost for pickup)
    expect(order.id).toBe(OrderConstants.WithDeliveryMethodID);
    expect(order.total).toBe(LunePrice.toCent(300)); // Same as subtotal (pickup is free)
    expect(order.subtotal).toBe(LunePrice.toCent(300));

    // Verify delivery method was updated with new location
    const { deliveryMethod } = order;
    expect(deliveryMethod.type).toBe(DeliveryMethodType.Pickup);
    expect(deliveryMethod.amount).toBe(LunePrice.toCent(0)); // Still free

    // Verify location was updated to Brooklyn Store
    const { details } = deliveryMethod;
    expect(details.address.name).toBe('Brooklyn Store');
    expect(details.location.id).toBe(LocationConstants.SecondLocationID);

    // Verify DB: still only one delivery method exists (updated, not created new)
    const orderDeliveryMethods = await testHelper
      .getQueryBuilder()<DeliveryMethodTable>(Tables.DeliveryMethod)
      .where({ order_id: OrderConstants.WithDeliveryMethodID });

    expect(orderDeliveryMethods).toHaveLength(1); // Same delivery method, just updated

    // Verify DB: still only one delivery_method_pickup record (updated, not created new)
    const orderDeliveryMethodPickups = await testHelper
      .getQueryBuilder()<DeliveryMethodPickupTable>(Tables.DeliveryMethodPickup)
      .where({ delivery_method_id: orderDeliveryMethods[0].id });

    expect(orderDeliveryMethodPickups).toHaveLength(1); // Same record, location updated
  });

  test('replaces shipping delivery method with pickup delivery method', async () => {
    const deliveryMethodAlreadyCreated = await testHelper
      .getQueryBuilder()<DeliveryMethodTable>(Tables.DeliveryMethod)
      .where({ order_id: OrderConstants.WithShippingDeliveryMethodID })
      .first();

    const shippingDeliveryMethodBefore = await testHelper
      .getQueryBuilder()<DeliveryMethodShippingTable>(Tables.DeliveryMethodShipping)
      .where({ delivery_method_id: deliveryMethodAlreadyCreated?.id })
      .first();

    // Verify initial state: order has SHIPPING delivery method
    expect(deliveryMethodAlreadyCreated).toBeDefined();
    expect(deliveryMethodAlreadyCreated?.type).toBe(DeliveryMethodType.Shipping);
    expect(shippingDeliveryMethodBefore).toBeDefined();

    const res = await request(app)
      .post('/storefront-api')
      .set('x_lune_shop_id', ShopConstants.ID)
      .set('x_lune_storefront_api_key', ShopConstants.StorefrontApiKey)
      .send({
        query: ADD_DELIVERY_METHOD_PICKUP_TO_ORDER_MUTATION,
        variables: {
          orderId: OrderConstants.WithShippingDeliveryMethodID,
          input: {
            locationId: LocationConstants.ID
          }
        }
      });

    const {
      addDeliveryMethodPickupToOrder: { order }
    } = res.body.data;

    // Verify order basic info
    expect(order.id).toBe(OrderConstants.WithShippingDeliveryMethodID);
    expect(order.total).toBe(LunePrice.toCent(200)); // $200 subtotal + $0 pickup (no shipping cost)
    expect(order.subtotal).toBe(LunePrice.toCent(200));

    // Verify delivery method type changed to PICKUP
    const { deliveryMethod } = order;
    expect(deliveryMethod.type).toBe(DeliveryMethodType.Pickup);
    expect(deliveryMethod.amount).toBe(LunePrice.toCent(0)); // Pickup is free

    // Verify pickup delivery method details are present
    const { details } = deliveryMethod;
    expect(details.address.name).toBe('New York Store');
    expect(details.location.id).toBe(LocationConstants.ID);

    // Verify via API that it's DeliveryMethodPickup and NOT DeliveryMethodShipping
    expect(details.address).toBeDefined(); // DeliveryMethodPickup field
    expect(details.location).toBeDefined(); // DeliveryMethodPickup field
    expect(details.method).toBeUndefined(); // DeliveryMethodShipping field should not exist
    expect(details.shippingMethod).toBeUndefined(); // DeliveryMethodShipping field should not exist

    // Verify DB: only one delivery method exists for the order
    const orderDeliveryMethods = await testHelper
      .getQueryBuilder()<DeliveryMethodTable>(Tables.DeliveryMethod)
      .where({ order_id: OrderConstants.WithShippingDeliveryMethodID });

    expect(orderDeliveryMethods).toHaveLength(1); // Only one delivery method record
    expect(orderDeliveryMethods[0].type).toBe(DeliveryMethodType.Pickup); // Type updated to PICKUP

    // Verify DB: delivery_method_pickup record was created
    const orderDeliveryMethodPickups = await testHelper
      .getQueryBuilder()<DeliveryMethodPickupTable>(Tables.DeliveryMethodPickup)
      .where({ delivery_method_id: orderDeliveryMethods[0].id });

    expect(orderDeliveryMethodPickups).toHaveLength(1); // New pickup delivery method created

    // Verify DB: delivery_method_shipping record was deleted
    const shippingDeliveryMethodAfter = await testHelper
      .getQueryBuilder()<DeliveryMethodShippingTable>(Tables.DeliveryMethodShipping)
      .where({ id: shippingDeliveryMethodBefore?.id });

    expect(shippingDeliveryMethodAfter).toHaveLength(0); // Old shipping delivery method deleted
  });

  test('returns FORBIDDEN_ORDER_ACTION error when provided order is already placed', async () => {
    const res = await request(app)
      .post('/storefront-api')
      .set('x_lune_shop_id', ShopConstants.ID)
      .set('x_lune_storefront_api_key', ShopConstants.StorefrontApiKey)
      .send({
        query: ADD_DELIVERY_METHOD_PICKUP_TO_ORDER_MUTATION,
        variables: {
          orderId: OrderConstants.PlacedID,
          input: {
            locationId: LocationConstants.ID
          }
        }
      });

    const {
      addDeliveryMethodPickupToOrder: { order, apiErrors }
    } = res.body.data;

    const [error] = apiErrors;

    expect(error.code).toBe('FORBIDDEN_ORDER_ACTION');
    expect(order).toBeNull();
  });

  test('returns UNAUTHORIZED error when storefront api key is invalid', async () => {
    const response = await request(app)
      .post('/storefront-api')
      .set('x_lune_shop_id', ShopConstants.ID)
      .set('x_lune_storefront_api_key', 'invalid_key')
      .send({
        query: ADD_DELIVERY_METHOD_PICKUP_TO_ORDER_MUTATION,
        variables: {
          orderId: OrderConstants.ID,
          input: {
            locationId: LocationConstants.ID
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
        query: ADD_DELIVERY_METHOD_PICKUP_TO_ORDER_MUTATION,
        variables: {
          orderId: OrderConstants.ID,
          input: {
            locationId: LocationConstants.ID
          }
        }
      });

    expect(response.body.errors[0].extensions.code).toBe('UNAUTHORIZED');
  });
});

const ADD_DELIVERY_METHOD_PICKUP_TO_ORDER_MUTATION = /* GraphQL */ `
  mutation AddDeliveryMethodPickup($orderId: ID!, $input: AddDeliveryMethodPickupInput!) {
    addDeliveryMethodPickupToOrder(orderId: $orderId, input: $input) {
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
            ... on DeliveryMethodPickup {
              id
              address {
                name
                streetLine1
                streetLine2
                city
                postalCode
                phoneNumber
                references
                country
                countryCode
                state
                stateCode
              }
              location {
                id
                name
              }
            }
            ... on DeliveryMethodShipping {
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
