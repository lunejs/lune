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
import { ShippingFulfillmentFixtures } from './fixtures/shipping-fulfillment.fixtures';
import { ShippingMethodFixtures } from './fixtures/shipping-method.fixtures';
import { ShopConstants, ShopFixtures } from './fixtures/shop.fixtures';
import { StateFixtures } from './fixtures/state.fixtures';
import { UserConstants, UserFixtures } from './fixtures/user.fixtures';
import { ZoneFixtures } from './fixtures/zone.fixtures';

describe('markOrderAsDelivered - Mutation', () => {
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
      new ShippingMethodFixtures(),
      new LocationFixtures(),
      new OrderFixtures(),
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

  test('marks a shipped order as delivered and sets deliveredAt', async () => {
    const res = await request(app)
      .post('/admin-api')
      .set('Authorization', `Bearer ${UserConstants.AccessToken}`)
      .set('x_lune_shop_id', ShopConstants.ID)
      .send({
        query: MARK_ORDER_AS_DELIVERED_MUTATION,
        variables: {
          id: OrderConstants.ShippedWithShippingID
        }
      });

    const { order, apiErrors } = res.body.data.markOrderAsDelivered;

    expect(apiErrors).toHaveLength(0);
    expect(order.id).toBe(OrderConstants.ShippedWithShippingID);
    expect(order.state).toBe(OrderState.Delivered);
    expect(order.fulfillment.details.deliveredAt).toBeDefined();
  });

  test('marks a ready for pickup order as delivered and sets pickedUpAt', async () => {
    const res = await request(app)
      .post('/admin-api')
      .set('Authorization', `Bearer ${UserConstants.AccessToken}`)
      .set('x_lune_shop_id', ShopConstants.ID)
      .send({
        query: MARK_ORDER_AS_DELIVERED_MUTATION,
        variables: {
          id: OrderConstants.ReadyForPickupWithPickupID
        }
      });

    const { order, apiErrors } = res.body.data.markOrderAsDelivered;

    expect(apiErrors).toHaveLength(0);
    expect(order.id).toBe(OrderConstants.ReadyForPickupWithPickupID);
    expect(order.state).toBe(OrderState.Delivered);
    expect(order.fulfillment.details.pickedUpAt).toBeDefined();
  });

  test('returns FORBIDDEN_ORDER_ACTION error when order is in placed state', async () => {
    const res = await request(app)
      .post('/admin-api')
      .set('Authorization', `Bearer ${UserConstants.AccessToken}`)
      .set('x_lune_shop_id', ShopConstants.ID)
      .send({
        query: MARK_ORDER_AS_DELIVERED_MUTATION,
        variables: {
          id: OrderConstants.PlacedID
        }
      });

    const { order, apiErrors } = res.body.data.markOrderAsDelivered;

    expect(order).toBeNull();
    expect(apiErrors).toHaveLength(1);
    expect(apiErrors[0].code).toBe('FORBIDDEN_ORDER_ACTION');
  });

  test('returns FORBIDDEN_ORDER_ACTION error when order is in processing state', async () => {
    const res = await request(app)
      .post('/admin-api')
      .set('Authorization', `Bearer ${UserConstants.AccessToken}`)
      .set('x_lune_shop_id', ShopConstants.ID)
      .send({
        query: MARK_ORDER_AS_DELIVERED_MUTATION,
        variables: {
          id: OrderConstants.ProcessingID
        }
      });

    const { order, apiErrors } = res.body.data.markOrderAsDelivered;

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
        query: MARK_ORDER_AS_DELIVERED_MUTATION,
        variables: {
          id: OrderConstants.ModifyingID
        }
      });

    const { order, apiErrors } = res.body.data.markOrderAsDelivered;

    expect(order).toBeNull();
    expect(apiErrors).toHaveLength(1);
    expect(apiErrors[0].code).toBe('FORBIDDEN_ORDER_ACTION');
  });

  test('returns Authorization error when no token is provided', async () => {
    const response = await request(app)
      .post('/admin-api')
      .send({
        query: MARK_ORDER_AS_DELIVERED_MUTATION,
        variables: {
          id: OrderConstants.ShippedWithShippingID
        }
      });

    expect(response.body.errors[0].extensions.code).toBe('UNAUTHORIZED');
  });
});

const MARK_ORDER_AS_DELIVERED_MUTATION = /* GraphQL */ `
  mutation MarkOrderAsDelivered($id: ID!) {
    markOrderAsDelivered(id: $id) {
      order {
        id
        state
        fulfillment {
          id
          type
          details {
            ... on ShippingFulfillment {
              deliveredAt
            }
            ... on InStorePickupFulfillment {
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
