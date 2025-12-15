import request from 'supertest';

import { OrderState } from '@/persistence/entities/order';
import { LuneServer } from '@/server';
import { TEST_LUNE_CONFIG } from '@/tests/utils/test-config';
import { TestUtils } from '@/tests/utils/test-utils';

import { FulfillmentFixtures } from './fixtures/fulfillment.fixtures';
import { OrderConstants, OrderFixtures } from './fixtures/order.fixtures';
import { ShippingFulfillmentFixtures } from './fixtures/shipping-fulfillment.fixtures';
import { ShippingMethodFixtures } from './fixtures/shipping-method.fixtures';
import { ShopConstants, ShopFixtures } from './fixtures/shop.fixtures';
import { UserConstants, UserFixtures } from './fixtures/user.fixtures';
import { ZoneFixtures } from './fixtures/zone.fixtures';

describe('markOrderAsShipped - Mutation', () => {
  const testHelper = new TestUtils();

  const luneServer = new LuneServer(TEST_LUNE_CONFIG);
  const app = luneServer.getApp();

  beforeEach(async () => {
    await testHelper.loadFixtures([
      new UserFixtures(),
      new ShopFixtures(),
      new ZoneFixtures(),
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

  test('marks a placed order with shipping fulfillment as shipped', async () => {
    const res = await request(app)
      .post('/admin-api')
      .set('Authorization', `Bearer ${UserConstants.AccessToken}`)
      .set('x_lune_shop_id', ShopConstants.ID)
      .send({
        query: MARK_ORDER_AS_SHIPPED_MUTATION,
        variables: {
          id: OrderConstants.PlacedWithShippingID,
          input: {
            carrier: 'FedEx',
            trackingCode: 'TRACK123'
          }
        }
      });

    const { order, apiErrors } = res.body.data.markOrderAsShipped;

    expect(apiErrors).toHaveLength(0);
    expect(order.id).toBe(OrderConstants.PlacedWithShippingID);
    expect(order.state).toBe(OrderState.Shipped);
    expect(order.fulfillment.details.carrier).toBe('FedEx');
    expect(order.fulfillment.details.trackingCode).toBe('TRACK123');
    expect(order.fulfillment.details.shippedAt).toBeDefined();
    expect(order.fulfillment.details.deliveredAt).toBeNull();
  });

  test('marks a processing order with shipping fulfillment as shipped', async () => {
    const res = await request(app)
      .post('/admin-api')
      .set('Authorization', `Bearer ${UserConstants.AccessToken}`)
      .set('x_lune_shop_id', ShopConstants.ID)
      .send({
        query: MARK_ORDER_AS_SHIPPED_MUTATION,
        variables: {
          id: OrderConstants.ProcessingWithShippingID,
          input: {
            carrier: 'DHL',
            trackingCode: 'DHL456'
          }
        }
      });

    const { order, apiErrors } = res.body.data.markOrderAsShipped;

    expect(apiErrors).toHaveLength(0);
    expect(order.id).toBe(OrderConstants.ProcessingWithShippingID);
    expect(order.state).toBe(OrderState.Shipped);
    expect(order.fulfillment.details.carrier).toBe('DHL');
    expect(order.fulfillment.details.trackingCode).toBe('DHL456');
    expect(order.fulfillment.details.shippedAt).toBeDefined();
    expect(order.fulfillment.details.deliveredAt).toBeNull();
  });

  test('returns FORBIDDEN_ORDER_ACTION error when order has in-store pickup fulfillment', async () => {
    const res = await request(app)
      .post('/admin-api')
      .set('Authorization', `Bearer ${UserConstants.AccessToken}`)
      .set('x_lune_shop_id', ShopConstants.ID)
      .send({
        query: MARK_ORDER_AS_SHIPPED_MUTATION,
        variables: {
          id: OrderConstants.PlacedWithPickupID,
          input: {
            carrier: 'FedEx',
            trackingCode: 'TRACK123'
          }
        }
      });

    const { order, apiErrors } = res.body.data.markOrderAsShipped;

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
        query: MARK_ORDER_AS_SHIPPED_MUTATION,
        variables: {
          id: OrderConstants.ModifyingID,
          input: {
            carrier: 'FedEx',
            trackingCode: 'TRACK123'
          }
        }
      });

    const { order, apiErrors } = res.body.data.markOrderAsShipped;

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
        query: MARK_ORDER_AS_SHIPPED_MUTATION,
        variables: {
          id: OrderConstants.PlacedWithoutFulfillmentID,
          input: {
            carrier: 'FedEx',
            trackingCode: 'TRACK123'
          }
        }
      });

    const { order, apiErrors } = res.body.data.markOrderAsShipped;

    expect(order).toBeNull();
    expect(apiErrors).toHaveLength(1);
    expect(apiErrors[0].code).toBe('FORBIDDEN_ORDER_ACTION');
  });

  test('returns Authorization error when no token is provided', async () => {
    const response = await request(app)
      .post('/admin-api')
      .send({
        query: MARK_ORDER_AS_SHIPPED_MUTATION,
        variables: {
          id: OrderConstants.PlacedWithShippingID,
          input: {
            carrier: 'FedEx',
            trackingCode: 'TRACK123'
          }
        }
      });

    expect(response.body.errors[0].extensions.code).toBe('UNAUTHORIZED');
  });
});

const MARK_ORDER_AS_SHIPPED_MUTATION = /* GraphQL */ `
  mutation MarkOrderAsShipped($id: ID!, $input: MarkOrderAsShippedInput!) {
    markOrderAsShipped(id: $id, input: $input) {
      order {
        id
        state
        fulfillment {
          id
          type
          details {
            ... on ShippingFulfillment {
              carrier
              trackingCode
              shippedAt
              deliveredAt
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
