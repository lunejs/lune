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
import { LocationConstants, LocationFixtures } from './fixtures/location.fixtures';
import { OrderConstants, OrderFixtures } from './fixtures/order.fixtures';
import { ShippingFulfillmentFixtures } from './fixtures/shipping-fulfillment.fixtures';
import { ShippingMethodFixtures } from './fixtures/shipping-method.fixtures';
import { ShopConstants, ShopFixtures } from './fixtures/shop.fixtures';
import { StateFixtures } from './fixtures/state.fixtures';
import { UserFixtures } from './fixtures/user.fixtures';
import { ZoneFixtures } from './fixtures/zone.fixtures';
import { ZoneStateFixtures } from './fixtures/zone-state.fixtures';

describe('addInStorePickupFulfillmentToOrder - Mutation', () => {
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

  test('adds in-store pickup fulfillment to order', async () => {
    const res = await request(app)
      .post('/storefront-api')
      .set('x_lune_shop_id', ShopConstants.ID)
      .set('x_lune_storefront_api_key', ShopConstants.StorefrontApiKey)
      .send({
        query: ADD_IN_STORE_PICKUP_FULFILLMENT_TO_ORDER_MUTATION,
        variables: {
          orderId: OrderConstants.ID,
          input: {
            locationId: LocationConstants.ID
          }
        }
      });

    const {
      addInStorePickupFulfillmentToOrder: { order }
    } = res.body.data;

    // Verify order totals (no additional cost for pickup)
    expect(order.id).toBe(OrderConstants.ID);
    expect(order.total).toBe(LunePrice.toCent(150)); // Same as subtotal (pickup is free)
    expect(order.subtotal).toBe(LunePrice.toCent(150));

    // Verify fulfillment was created with correct type and amount
    const { fulfillment } = order;
    expect(fulfillment.type).toBe(FulfillmentType.InStorePickup);
    expect(fulfillment.amount).toBe(LunePrice.toCent(0)); // In-store pickup is free

    // Verify location details
    const { details } = fulfillment;
    expect(details.address.name).toBe('New York Store');
    expect(details.address.city).toBe('New York');
    expect(details.location.id).toBe(LocationConstants.ID);
    expect(details.location.id).toBe(LocationConstants.ID);
  });

  test('adds in-store pickup fulfillment to order with already a fulfillment', async () => {
    // Verify order already has a fulfillment (IN_STORE_PICKUP type)
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
        query: ADD_IN_STORE_PICKUP_FULFILLMENT_TO_ORDER_MUTATION,
        variables: {
          orderId: OrderConstants.WithFulfillmentID,
          input: {
            locationId: LocationConstants.SecondLocationID
          }
        }
      });

    const {
      addInStorePickupFulfillmentToOrder: { order }
    } = res.body.data;

    // Verify order totals (still no cost for pickup)
    expect(order.id).toBe(OrderConstants.WithFulfillmentID);
    expect(order.total).toBe(LunePrice.toCent(300)); // Same as subtotal (pickup is free)
    expect(order.subtotal).toBe(LunePrice.toCent(300));

    // Verify fulfillment was updated with new location
    const { fulfillment } = order;
    expect(fulfillment.type).toBe(FulfillmentType.InStorePickup);
    expect(fulfillment.amount).toBe(LunePrice.toCent(0)); // Still free

    // Verify location was updated to Brooklyn Store
    const { details } = fulfillment;
    expect(details.address.name).toBe('Brooklyn Store');
    expect(details.location.id).toBe(LocationConstants.SecondLocationID);

    // Verify DB: still only one fulfillment exists (updated, not created new)
    const orderFulfillments = await testHelper
      .getQueryBuilder()<FulfillmentTable>(Tables.Fulfillment)
      .where({ order_id: OrderConstants.WithFulfillmentID });

    expect(orderFulfillments).toHaveLength(1); // Same fulfillment, just updated

    // Verify DB: still only one in_store_pickup_fulfillment record (updated, not created new)
    const orderInStorePickupFulfillments = await testHelper
      .getQueryBuilder()<InStorePickupFulfillmentTable>(Tables.InStorePickupFulfillment)
      .where({ fulfillment_id: orderFulfillments[0].id });

    expect(orderInStorePickupFulfillments).toHaveLength(1); // Same record, location updated
  });

  test('replaces shipping fulfillment with in-store pickup fulfillment', async () => {
    const fulfillmentAlreadyCreated = await testHelper
      .getQueryBuilder()<FulfillmentTable>(Tables.Fulfillment)
      .where({ order_id: OrderConstants.WithShippingFulfillmentID })
      .first();

    const shippingFulfillmentBefore = await testHelper
      .getQueryBuilder()<ShippingFulfillmentTable>(Tables.ShippingFulfillment)
      .where({ fulfillment_id: fulfillmentAlreadyCreated?.id })
      .first();

    // Verify initial state: order has SHIPPING fulfillment
    expect(fulfillmentAlreadyCreated).toBeDefined();
    expect(fulfillmentAlreadyCreated?.type).toBe(FulfillmentType.Shipping);
    expect(shippingFulfillmentBefore).toBeDefined();

    const res = await request(app)
      .post('/storefront-api')
      .set('x_lune_shop_id', ShopConstants.ID)
      .set('x_lune_storefront_api_key', ShopConstants.StorefrontApiKey)
      .send({
        query: ADD_IN_STORE_PICKUP_FULFILLMENT_TO_ORDER_MUTATION,
        variables: {
          orderId: OrderConstants.WithShippingFulfillmentID,
          input: {
            locationId: LocationConstants.ID
          }
        }
      });

    const {
      addInStorePickupFulfillmentToOrder: { order }
    } = res.body.data;

    // Verify order basic info
    expect(order.id).toBe(OrderConstants.WithShippingFulfillmentID);
    expect(order.total).toBe(LunePrice.toCent(200)); // $200 subtotal + $0 pickup (no shipping cost)
    expect(order.subtotal).toBe(LunePrice.toCent(200));

    // Verify fulfillment type changed to IN_STORE_PICKUP
    const { fulfillment } = order;
    expect(fulfillment.type).toBe(FulfillmentType.InStorePickup);
    expect(fulfillment.amount).toBe(LunePrice.toCent(0)); // In-store pickup is free

    // Verify in-store pickup fulfillment details are present
    const { details } = fulfillment;
    expect(details.address.name).toBe('New York Store');
    expect(details.location.id).toBe(LocationConstants.ID);

    // Verify via API that it's InStorePickupFulfillment and NOT ShippingFulfillment
    expect(details.address).toBeDefined(); // InStorePickupFulfillment field
    expect(details.location).toBeDefined(); // InStorePickupFulfillment field
    expect(details.method).toBeUndefined(); // ShippingFulfillment field should not exist
    expect(details.shippingMethod).toBeUndefined(); // ShippingFulfillment field should not exist

    // Verify DB: only one fulfillment exists for the order
    const orderFulfillments = await testHelper
      .getQueryBuilder()<FulfillmentTable>(Tables.Fulfillment)
      .where({ order_id: OrderConstants.WithShippingFulfillmentID });

    expect(orderFulfillments).toHaveLength(1); // Only one fulfillment record
    expect(orderFulfillments[0].type).toBe(FulfillmentType.InStorePickup); // Type updated to IN_STORE_PICKUP

    // Verify DB: in_store_pickup_fulfillment record was created
    const orderInStorePickupFulfillments = await testHelper
      .getQueryBuilder()<InStorePickupFulfillmentTable>(Tables.InStorePickupFulfillment)
      .where({ fulfillment_id: orderFulfillments[0].id });

    expect(orderInStorePickupFulfillments).toHaveLength(1); // New in-store pickup fulfillment created

    // Verify DB: shipping_fulfillment record was deleted
    const shippingFulfillmentAfter = await testHelper
      .getQueryBuilder()<ShippingFulfillmentTable>(Tables.ShippingFulfillment)
      .where({ id: shippingFulfillmentBefore?.id });

    expect(shippingFulfillmentAfter).toHaveLength(0); // Old shipping fulfillment deleted
  });

  test('returns FORBIDDEN_ORDER_ACTION error when provided order is already placed', async () => {
    const res = await request(app)
      .post('/storefront-api')
      .set('x_lune_shop_id', ShopConstants.ID)
      .set('x_lune_storefront_api_key', ShopConstants.StorefrontApiKey)
      .send({
        query: ADD_IN_STORE_PICKUP_FULFILLMENT_TO_ORDER_MUTATION,
        variables: {
          orderId: OrderConstants.PlacedID,
          input: {
            locationId: LocationConstants.ID
          }
        }
      });

    const {
      addInStorePickupFulfillmentToOrder: { order, apiErrors }
    } = res.body.data;

    const [error] = apiErrors;

    expect(error.code).toBe('FORBIDDEN_ORDER_ACTION');
    expect(order).toBeNull();
  });
});

const ADD_IN_STORE_PICKUP_FULFILLMENT_TO_ORDER_MUTATION = /* GraphQL */ `
  mutation AddInStorePickupFulfillment($orderId: ID!, $input: AddInStorePickupFulfillmentInput!) {
    addInStorePickupFulfillmentToOrder(orderId: $orderId, input: $input) {
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
            ... on InStorePickupFulfillment {
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
