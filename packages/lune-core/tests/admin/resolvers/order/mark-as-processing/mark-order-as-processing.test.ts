import request from 'supertest';

import { OrderState } from '@/persistence/entities/order';
import { LuneServer } from '@/server';
import { TEST_LUNE_CONFIG } from '@/tests/utils/test-config';
import { TestUtils } from '@/tests/utils/test-utils';

import { OrderConstants, OrderFixtures } from './fixtures/order.fixtures';
import { ShopConstants, ShopFixtures } from './fixtures/shop.fixtures';
import { UserConstants, UserFixtures } from './fixtures/user.fixtures';

describe('markOrderAsProcessing - Mutation', () => {
  const testHelper = new TestUtils();

  const luneServer = new LuneServer(TEST_LUNE_CONFIG);
  const app = luneServer.getApp();

  beforeEach(async () => {
    await testHelper.loadFixtures([new UserFixtures(), new ShopFixtures(), new OrderFixtures()]);
  });

  afterEach(async () => {
    await testHelper.resetDatabase();
  });

  afterAll(async () => {
    await testHelper.destroyDatabase();
    await luneServer.teardown();
  });

  test('marks an order as processing', async () => {
    const res = await request(app)
      .post('/admin-api')
      .set('Authorization', `Bearer ${UserConstants.AccessToken}`)
      .set('x_lune_shop_id', ShopConstants.ID)
      .send({
        query: MARK_ORDER_AS_PROCESSING_MUTATION,
        variables: {
          id: OrderConstants.PlacedOrderID
        }
      });

    const { order, apiErrors } = res.body.data.markOrderAsProcessing;

    expect(apiErrors).toHaveLength(0);
    expect(order.id).toBe(OrderConstants.PlacedOrderID);
    expect(order.state).toBe(OrderState.Processing);
  });

  test('returns FORBIDDEN_ORDER_ACTION error when order is in modifying state', async () => {
    const res = await request(app)
      .post('/admin-api')
      .set('Authorization', `Bearer ${UserConstants.AccessToken}`)
      .set('x_lune_shop_id', ShopConstants.ID)
      .send({
        query: MARK_ORDER_AS_PROCESSING_MUTATION,
        variables: {
          id: OrderConstants.ModifyingOrderID
        }
      });

    const { order, apiErrors } = res.body.data.markOrderAsProcessing;

    expect(order).toBeNull();
    expect(apiErrors).toHaveLength(1);
    expect(apiErrors[0].code).toBe('FORBIDDEN_ORDER_ACTION');
  });

  test('returns FORBIDDEN_ORDER_ACTION error when order is already processing', async () => {
    const res = await request(app)
      .post('/admin-api')
      .set('Authorization', `Bearer ${UserConstants.AccessToken}`)
      .set('x_lune_shop_id', ShopConstants.ID)
      .send({
        query: MARK_ORDER_AS_PROCESSING_MUTATION,
        variables: {
          id: OrderConstants.ProcessingOrderID
        }
      });

    const { order, apiErrors } = res.body.data.markOrderAsProcessing;

    expect(order).toBeNull();
    expect(apiErrors).toHaveLength(1);
    expect(apiErrors[0].code).toBe('FORBIDDEN_ORDER_ACTION');
  });

  test('returns Authorization error when no token is provided', async () => {
    const response = await request(app)
      .post('/admin-api')
      .send({
        query: MARK_ORDER_AS_PROCESSING_MUTATION,
        variables: {
          id: OrderConstants.PlacedOrderID
        }
      });

    expect(response.body.errors[0].extensions.code).toBe('UNAUTHORIZED');
  });
});

const MARK_ORDER_AS_PROCESSING_MUTATION = /* GraphQL */ `
  mutation MarkOrderAsProcessing($id: ID!) {
    markOrderAsProcessing(id: $id) {
      order {
        id
        state
      }
      apiErrors {
        code
        message
      }
    }
  }
`;
