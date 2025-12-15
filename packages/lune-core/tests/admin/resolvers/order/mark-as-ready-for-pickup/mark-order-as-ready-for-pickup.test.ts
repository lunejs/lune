import request from 'supertest';

import { OrderState } from '@/persistence/entities/order';
import { LuneServer } from '@/server';
import { TEST_LUNE_CONFIG } from '@/tests/utils/test-config';
import { TestUtils } from '@/tests/utils/test-utils';

import { CountryFixtures } from './fixtures/country.fixtures';
import { FulfillmentFixtures } from './fixtures/fulfillment.fixtures';
import { InStorePickupFulfillmentFixtures } from './fixtures/in-store-pickup-fulfillment.fixtures';
import { LocationFixtures } from './fixtures/location.fixtures';
import { OrderConstants, OrderFixtures } from './fixtures/order.fixtures';
import { ShopConstants, ShopFixtures } from './fixtures/shop.fixtures';
import { StateFixtures } from './fixtures/state.fixtures';
import { UserConstants, UserFixtures } from './fixtures/user.fixtures';

describe('markOrderAsReadyForPickup - Mutation', () => {
  const testHelper = new TestUtils();

  const luneServer = new LuneServer(TEST_LUNE_CONFIG);
  const app = luneServer.getApp();

  beforeEach(async () => {
    await testHelper.loadFixtures([
      new UserFixtures(),
      new ShopFixtures(),
      new CountryFixtures(),
      new StateFixtures(),
      new LocationFixtures(),
      new OrderFixtures(),
      new FulfillmentFixtures(),
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

  test('marks a placed order with in-store pickup fulfillment as ready for pickup', async () => {
    const res = await request(app)
      .post('/admin-api')
      .set('Authorization', `Bearer ${UserConstants.AccessToken}`)
      .set('x_lune_shop_id', ShopConstants.ID)
      .send({
        query: MARK_ORDER_AS_READY_FOR_PICKUP_MUTATION,
        variables: {
          id: OrderConstants.PlacedWithPickupID
        }
      });

    const { order, apiErrors } = res.body.data.markOrderAsReadyForPickup;

    expect(apiErrors).toHaveLength(0);
    expect(order.id).toBe(OrderConstants.PlacedWithPickupID);
    expect(order.state).toBe(OrderState.ReadyForPickup);
    expect(order.fulfillment.details.readyAt).toBeDefined();
    expect(order.fulfillment.details.pickedUpAt).toBeNull();
  });

  test('marks a processing order with in-store pickup fulfillment as ready for pickup', async () => {
    const res = await request(app)
      .post('/admin-api')
      .set('Authorization', `Bearer ${UserConstants.AccessToken}`)
      .set('x_lune_shop_id', ShopConstants.ID)
      .send({
        query: MARK_ORDER_AS_READY_FOR_PICKUP_MUTATION,
        variables: {
          id: OrderConstants.ProcessingWithPickupID
        }
      });

    const { order, apiErrors } = res.body.data.markOrderAsReadyForPickup;

    expect(apiErrors).toHaveLength(0);
    expect(order.id).toBe(OrderConstants.ProcessingWithPickupID);
    expect(order.state).toBe(OrderState.ReadyForPickup);
    expect(order.fulfillment.details.readyAt).toBeDefined();
    expect(order.fulfillment.details.pickedUpAt).toBeNull();
  });

  test('returns FORBIDDEN_ORDER_ACTION error when order has shipping fulfillment', async () => {
    const res = await request(app)
      .post('/admin-api')
      .set('Authorization', `Bearer ${UserConstants.AccessToken}`)
      .set('x_lune_shop_id', ShopConstants.ID)
      .send({
        query: MARK_ORDER_AS_READY_FOR_PICKUP_MUTATION,
        variables: {
          id: OrderConstants.PlacedWithShippingID
        }
      });

    const { order, apiErrors } = res.body.data.markOrderAsReadyForPickup;

    expect(order).toBeNull();
    expect(apiErrors).toHaveLength(1);
    expect(apiErrors[0].code).toBe('FORBIDDEN_ORDER_ACTION');
  });

  test('returns FORBIDDEN_ORDER_ACTION error when order is in modifying state', async () => {
    const res = await request(app)
      .post('/admin-api')
      .set('Authorization', `Bearer ${UserConstants.AccessToken}`)
      .set('x_lune_shop_id', ShopConstants.ID)
      .send({
        query: MARK_ORDER_AS_READY_FOR_PICKUP_MUTATION,
        variables: {
          id: OrderConstants.ModifyingID
        }
      });

    const { order, apiErrors } = res.body.data.markOrderAsReadyForPickup;

    expect(order).toBeNull();
    expect(apiErrors).toHaveLength(1);
    expect(apiErrors[0].code).toBe('FORBIDDEN_ORDER_ACTION');
  });

  test('returns FORBIDDEN_ORDER_ACTION error when order has no fulfillment', async () => {
    const res = await request(app)
      .post('/admin-api')
      .set('Authorization', `Bearer ${UserConstants.AccessToken}`)
      .set('x_lune_shop_id', ShopConstants.ID)
      .send({
        query: MARK_ORDER_AS_READY_FOR_PICKUP_MUTATION,
        variables: {
          id: OrderConstants.PlacedWithoutFulfillmentID
        }
      });

    const { order, apiErrors } = res.body.data.markOrderAsReadyForPickup;

    expect(order).toBeNull();
    expect(apiErrors).toHaveLength(1);
    expect(apiErrors[0].code).toBe('FORBIDDEN_ORDER_ACTION');
  });

  test('returns Authorization error when no token is provided', async () => {
    const response = await request(app)
      .post('/admin-api')
      .send({
        query: MARK_ORDER_AS_READY_FOR_PICKUP_MUTATION,
        variables: {
          id: OrderConstants.PlacedWithPickupID
        }
      });

    expect(response.body.errors[0].extensions.code).toBe('UNAUTHORIZED');
  });
});

const MARK_ORDER_AS_READY_FOR_PICKUP_MUTATION = /* GraphQL */ `
  mutation MarkOrderAsReadyForPickup($id: ID!) {
    markOrderAsReadyForPickup(id: $id) {
      order {
        id
        state
        fulfillment {
          id
          type
          details {
            ... on InStorePickupFulfillment {
              readyAt
              pickedUpAt
            }
          }
        }
      }
      apiErrors {
        code
        message
      }
    }
  }
`;
