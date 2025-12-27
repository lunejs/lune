import request from 'supertest';

import { LuneServer } from '@/server';
import { TEST_LUNE_CONFIG } from '@/tests/utils/test-config';
import { TestUtils } from '@/tests/utils/test-utils';

import { DeliveryMethodFixtures } from './fixtures/delivery-method.fixtures';
import { FulfillmentConstants, FulfillmentFixtures } from './fixtures/fulfillment.fixtures';
import { FulfillmentLineFixtures } from './fixtures/fulfillment-line.fixtures';
import { OrderConstants, OrderFixtures } from './fixtures/order.fixtures';
import { OrderLineFixtures } from './fixtures/order-line.fixtures';
import { ProductFixtures } from './fixtures/product.fixtures';
import { ShopConstants, ShopFixtures } from './fixtures/shop.fixtures';
import { UserConstants, UserFixtures } from './fixtures/user.fixtures';
import { VariantFixtures } from './fixtures/variant.fixtures';

describe('markFulfillmentAsReadyForPickup - Mutation', () => {
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
      new OrderLineFixtures(),
      new DeliveryMethodFixtures(),
      new FulfillmentFixtures(),
      new FulfillmentLineFixtures()
    ]);
  });

  afterEach(async () => {
    await testHelper.resetDatabase();
  });

  afterAll(async () => {
    await testHelper.destroyDatabase();
    await luneServer.teardown();
  });

  test('marks pending pickup fulfillment as ready for pickup', async () => {
    const res = await request(app)
      .post('/admin-api')
      .set('Authorization', `Bearer ${UserConstants.AccessToken}`)
      .set('x_lune_shop_id', ShopConstants.ID)
      .send({
        query: MARK_FULFILLMENT_AS_READY_FOR_PICKUP_MUTATION,
        variables: {
          fulfillmentId: FulfillmentConstants.PendingPickupFulfillmentID
        }
      });

    const { order, apiErrors } = res.body.data.markFulfillmentAsReadyForPickup;

    expect(apiErrors).toHaveLength(0);
    expect(order).not.toBeNull();
    expect(order.id).toBe(OrderConstants.PendingPickupOrderID);

    // Validate fulfillment is now ready for pickup
    const fulfillment = order.fulfillments.items.find(
      (f: { id: string }) => f.id === FulfillmentConstants.PendingPickupFulfillmentID
    );
    expect(fulfillment).toBeDefined();
    expect(fulfillment.state).toBe('READY_FOR_PICKUP');
    expect(fulfillment.type).toBe('PICKUP');
    expect(fulfillment.metadata.readyAt).not.toBeNull();
    expect(fulfillment.metadata.pickedUpAt).toBeNull();
  });

  test('returns FORBIDDEN_FULFILLMENT_ACTION error when fulfillment type is shipping', async () => {
    const res = await request(app)
      .post('/admin-api')
      .set('Authorization', `Bearer ${UserConstants.AccessToken}`)
      .set('x_lune_shop_id', ShopConstants.ID)
      .send({
        query: MARK_FULFILLMENT_AS_READY_FOR_PICKUP_MUTATION,
        variables: {
          fulfillmentId: FulfillmentConstants.ShippingFulfillmentID
        }
      });

    const { order, apiErrors } = res.body.data.markFulfillmentAsReadyForPickup;

    expect(order).toBeNull();
    expect(apiErrors).toHaveLength(1);
    expect(apiErrors[0].code).toBe('FORBIDDEN_FULFILLMENT_ACTION');
  });

  test('returns INVALID_FULFILLMENT_STATE_TRANSITION error when fulfillment is already ready for pickup', async () => {
    const res = await request(app)
      .post('/admin-api')
      .set('Authorization', `Bearer ${UserConstants.AccessToken}`)
      .set('x_lune_shop_id', ShopConstants.ID)
      .send({
        query: MARK_FULFILLMENT_AS_READY_FOR_PICKUP_MUTATION,
        variables: {
          fulfillmentId: FulfillmentConstants.AlreadyReadyFulfillmentID
        }
      });

    const { order, apiErrors } = res.body.data.markFulfillmentAsReadyForPickup;

    expect(order).toBeNull();
    expect(apiErrors).toHaveLength(1);
    expect(apiErrors[0].code).toBe('INVALID_FULFILLMENT_STATE_TRANSITION');
  });

  test('returns UNAUTHORIZED error when no token is provided', async () => {
    const res = await request(app)
      .post('/admin-api')
      .send({
        query: MARK_FULFILLMENT_AS_READY_FOR_PICKUP_MUTATION,
        variables: {
          fulfillmentId: FulfillmentConstants.PendingPickupFulfillmentID
        }
      });

    expect(res.body.errors[0].extensions.code).toBe('UNAUTHORIZED');
  });
});

const MARK_FULFILLMENT_AS_READY_FOR_PICKUP_MUTATION = /* GraphQL */ `
  mutation MarkFulfillmentAsReadyForPickup($fulfillmentId: ID!) {
    markFulfillmentAsReadyForPickup(fulfillmentId: $fulfillmentId) {
      order {
        id
        state
        fulfillments {
          count
          items {
            id
            state
            type
            metadata
            lines {
              count
              items {
                id
                quantity
                orderLine {
                  id
                }
              }
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
