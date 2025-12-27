import request from 'supertest';

import { Tables } from '@/persistence/tables';
import { LuneServer } from '@/server';
import { TEST_LUNE_CONFIG } from '@/tests/utils/test-config';
import { TestUtils } from '@/tests/utils/test-utils';

import { OrderConstants, OrderFixtures } from './fixtures/order.fixtures';
import { OrderLineFixtures } from './fixtures/order-line.fixtures';
import { ProductFixtures } from './fixtures/product.fixtures';
import { ShopConstants, ShopFixtures } from './fixtures/shop.fixtures';
import { UserConstants, UserFixtures } from './fixtures/user.fixtures';
import { VariantConstants, VariantFixtures } from './fixtures/variant.fixtures';

describe('cancelOrder - Mutation', () => {
  const testHelper = new TestUtils();

  const luneServer = new LuneServer(TEST_LUNE_CONFIG);
  const app = luneServer.getApp();

  beforeEach(async () => {
    await testHelper.loadFixtures([
      new UserFixtures(),
      new ShopFixtures(),
      new ProductFixtures(),
      new VariantFixtures(),
      new OrderFixtures(),
      new OrderLineFixtures()
    ]);
  });

  afterEach(async () => {
    await testHelper.resetDatabase();
  });

  afterAll(async () => {
    await testHelper.destroyDatabase();
    await luneServer.teardown();
  });

  test('cancels a placed order', async () => {
    const res = await request(app)
      .post('/admin-api')
      .set('Authorization', `Bearer ${UserConstants.AccessToken}`)
      .set('x_lune_shop_id', ShopConstants.ID)
      .send({
        query: CANCEL_ORDER_MUTATION,
        variables: {
          id: OrderConstants.PlacedID,
          input: {
            reason: 'Customer requested cancellation'
          }
        }
      });

    const { order, apiErrors } = res.body.data.cancelOrder;

    expect(apiErrors).toHaveLength(0);
    expect(order.id).toBe(OrderConstants.PlacedID);
    expect(order.state).toBe('CANCELED');
    expect(order.cancellation).toBeDefined();
    expect(order.cancellation.reason).toBe('Customer requested cancellation');
  });

  test('cancels a processing order', async () => {
    const res = await request(app)
      .post('/admin-api')
      .set('Authorization', `Bearer ${UserConstants.AccessToken}`)
      .set('x_lune_shop_id', ShopConstants.ID)
      .send({
        query: CANCEL_ORDER_MUTATION,
        variables: {
          id: OrderConstants.ProcessingID,
          input: {
            reason: 'Out of stock'
          }
        }
      });

    const { order, apiErrors } = res.body.data.cancelOrder;

    expect(apiErrors).toHaveLength(0);
    expect(order.id).toBe(OrderConstants.ProcessingID);
    expect(order.state).toBe('CANCELED');
    expect(order.cancellation).toBeDefined();
    expect(order.cancellation.reason).toBe('Out of stock');
  });

  test('restocks variants when shouldRestock is true', async () => {
    const db = testHelper.getQueryBuilder();

    // Reduce stock first to simulate a placed order
    await db(Tables.Variant)
      .where('id', VariantConstants.ID)
      .update({ stock: VariantConstants.InitialStock - 1 });

    const res = await request(app)
      .post('/admin-api')
      .set('Authorization', `Bearer ${UserConstants.AccessToken}`)
      .set('x_lune_shop_id', ShopConstants.ID)
      .send({
        query: CANCEL_ORDER_MUTATION,
        variables: {
          id: OrderConstants.PlacedID,
          input: {
            reason: 'Customer changed mind',
            shouldRestock: true
          }
        }
      });

    const { order, apiErrors } = res.body.data.cancelOrder;

    expect(apiErrors).toHaveLength(0);
    expect(order.state).toBe('CANCELED');

    // Verify stock was restored (initial - 1 + 1 quantity from order line = initial)
    const variant = await db(Tables.Variant).where('id', VariantConstants.ID).first();
    expect(variant.stock).toBe(VariantConstants.InitialStock);
  });

  test('does not restock variants when shouldRestock is false', async () => {
    const db = testHelper.getQueryBuilder();
    const currentStock = 5;

    await db(Tables.Variant).where('id', VariantConstants.ID).update({ stock: currentStock });

    const res = await request(app)
      .post('/admin-api')
      .set('Authorization', `Bearer ${UserConstants.AccessToken}`)
      .set('x_lune_shop_id', ShopConstants.ID)
      .send({
        query: CANCEL_ORDER_MUTATION,
        variables: {
          id: OrderConstants.PlacedID,
          input: {
            reason: 'Fraudulent order',
            shouldRestock: false
          }
        }
      });

    const { order, apiErrors } = res.body.data.cancelOrder;

    expect(apiErrors).toHaveLength(0);
    expect(order.state).toBe('CANCELED');

    // Verify stock was NOT restored
    const variant = await db(Tables.Variant).where('id', VariantConstants.ID).first();
    expect(variant.stock).toBe(currentStock);
  });

  test('returns FORBIDDEN_ORDER_ACTION error when order is shipped', async () => {
    const res = await request(app)
      .post('/admin-api')
      .set('Authorization', `Bearer ${UserConstants.AccessToken}`)
      .set('x_lune_shop_id', ShopConstants.ID)
      .send({
        query: CANCEL_ORDER_MUTATION,
        variables: {
          id: OrderConstants.ShippedID,
          input: {
            reason: 'Test',
            shouldRestock: false
          }
        }
      });

    const { order, apiErrors } = res.body.data.cancelOrder;

    expect(order).toBeNull();
    expect(apiErrors).toHaveLength(1);
    expect(apiErrors[0].code).toBe('FORBIDDEN_ORDER_ACTION');
  });

  test('returns Authorization error when no token is provided', async () => {
    const response = await request(app)
      .post('/admin-api')
      .send({
        query: CANCEL_ORDER_MUTATION,
        variables: {
          id: OrderConstants.PlacedID,
          input: {
            reason: 'Test',
            shouldRestock: false
          }
        }
      });

    expect(response.body.errors[0].extensions.code).toBe('UNAUTHORIZED');
  });
});

const CANCEL_ORDER_MUTATION = /* GraphQL */ `
  mutation CancelOrder($id: ID!, $input: CancelOrderInput!) {
    cancelOrder(id: $id, input: $input) {
      order {
        id
        state
        cancellation {
          id
          reason
        }
      }
      apiErrors {
        code
        message
      }
    }
  }
`;
