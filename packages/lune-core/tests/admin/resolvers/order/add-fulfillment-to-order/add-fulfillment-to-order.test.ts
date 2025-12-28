import request from 'supertest';

import { LuneServer } from '@/server';
import { TEST_LUNE_CONFIG } from '@/tests/utils/test-config';
import { TestUtils } from '@/tests/utils/test-utils';

import { DeliveryMethodFixtures } from './fixtures/delivery-method.fixtures';
import { FulfillmentFixtures } from './fixtures/fulfillment.fixtures';
import { FulfillmentLineFixtures } from './fixtures/fulfillment-line.fixtures';
import { OrderConstants, OrderFixtures } from './fixtures/order.fixtures';
import { OrderLineConstants, OrderLineFixtures } from './fixtures/order-line.fixtures';
import { ProductFixtures } from './fixtures/product.fixtures';
import { ShopConstants, ShopFixtures } from './fixtures/shop.fixtures';
import { UserConstants, UserFixtures } from './fixtures/user.fixtures';
import { VariantFixtures } from './fixtures/variant.fixtures';

describe('addFulfillmentToOrder - Mutation', () => {
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

  test('adds fulfillment to order in processing state', async () => {
    const res = await request(app)
      .post('/admin-api')
      .set('Authorization', `Bearer ${UserConstants.AccessToken}`)
      .set('x_lune_shop_id', ShopConstants.ID)
      .send({
        query: ADD_FULFILLMENT_MUTATION,
        variables: {
          id: OrderConstants.ProcessingOrderID,
          input: {
            orderLines: [{ id: OrderLineConstants.ProcessingOrderLine1ID, quantity: 1 }],
            carrier: 'FedEx',
            trackingCode: 'TRACK123456'
          }
        }
      });

    const { order, apiErrors } = res.body.data.addFulfillmentToOrder;

    expect(apiErrors).toHaveLength(0);
    expect(order).not.toBeNull();
    expect(order.id).toBe(OrderConstants.ProcessingOrderID);
    expect(order.state).toBe('PARTIALLY_FULFILLED');

    // Validate fulfillments
    expect(order.fulfillments.count).toBe(1);
    expect(order.fulfillments.items).toHaveLength(1);

    const fulfillment = order.fulfillments.items[0];
    expect(fulfillment.code).toBeDefined();
    expect(fulfillment.totalQuantity).toBe(1);
    expect(fulfillment.state).toBe('SHIPPED');
    expect(fulfillment.type).toBe('SHIPPING');
    expect(fulfillment.metadata.carrier).toBe('FedEx');
    expect(fulfillment.metadata.trackingCode).toBe('TRACK123456');
    expect(fulfillment.metadata.shippedAt).not.toBeNull();

    // Validate fulfillment lines
    expect(fulfillment.lines.count).toBe(1);
    expect(fulfillment.lines.items[0].quantity).toBe(1);
    expect(fulfillment.lines.items[0].orderLine.id).toBe(OrderLineConstants.ProcessingOrderLine1ID);
  });

  test('adds fulfillment to order in placed state', async () => {
    const res = await request(app)
      .post('/admin-api')
      .set('Authorization', `Bearer ${UserConstants.AccessToken}`)
      .set('x_lune_shop_id', ShopConstants.ID)
      .send({
        query: ADD_FULFILLMENT_MUTATION,
        variables: {
          id: OrderConstants.PlacedOrderID,
          input: {
            orderLines: [{ id: OrderLineConstants.PlacedOrderLineID, quantity: 1 }],
            carrier: 'UPS',
            trackingCode: 'UPS123'
          }
        }
      });

    const { order, apiErrors } = res.body.data.addFulfillmentToOrder;

    expect(apiErrors).toHaveLength(0);
    expect(order).not.toBeNull();
    expect(order.id).toBe(OrderConstants.PlacedOrderID);
    expect(order.state).toBe('FULFILLED');

    // Validate fulfillments
    expect(order.fulfillments.count).toBe(1);
    const fulfillment = order.fulfillments.items[0];
    expect(fulfillment.code).toBeDefined();
    expect(fulfillment.totalQuantity).toBe(1);
    expect(fulfillment.state).toBe('SHIPPED');
    expect(fulfillment.type).toBe('SHIPPING');
    expect(fulfillment.metadata.carrier).toBe('UPS');
    expect(fulfillment.metadata.trackingCode).toBe('UPS123');

    // Validate fulfillment lines
    expect(fulfillment.lines.count).toBe(1);
    expect(fulfillment.lines.items[0].quantity).toBe(1);
    expect(fulfillment.lines.items[0].orderLine.id).toBe(OrderLineConstants.PlacedOrderLineID);
  });

  test('fulfills all order lines to mark order as fulfilled', async () => {
    const res = await request(app)
      .post('/admin-api')
      .set('Authorization', `Bearer ${UserConstants.AccessToken}`)
      .set('x_lune_shop_id', ShopConstants.ID)
      .send({
        query: ADD_FULFILLMENT_MUTATION,
        variables: {
          id: OrderConstants.PartiallyFulfilledOrderID,
          input: {
            orderLines: [
              { id: OrderLineConstants.PartiallyFulfilledOrderLine1ID, quantity: 1 },
              { id: OrderLineConstants.PartiallyFulfilledOrderLine2ID, quantity: 1 }
            ]
          }
        }
      });

    const { order, apiErrors } = res.body.data.addFulfillmentToOrder;

    expect(apiErrors).toHaveLength(0);
    expect(order).not.toBeNull();
    expect(order.id).toBe(OrderConstants.PartiallyFulfilledOrderID);
    expect(order.state).toBe('FULFILLED');

    // Should have 2 fulfillments: 1 existing from fixtures + 1 new
    expect(order.fulfillments.count).toBe(2);

    // Find the new fulfillment (the one in PENDING state since no tracking info was provided)
    const newFulfillment = order.fulfillments.items.find(
      (f: { state: string }) => f.state === 'PENDING'
    );
    expect(newFulfillment).toBeDefined();
    expect(newFulfillment.code).toBeDefined();
    expect(newFulfillment.totalQuantity).toBe(2);
    expect(newFulfillment.type).toBe('PICKUP');
    expect(newFulfillment.lines.count).toBe(2);

    // Validate fulfillment lines include both order lines
    const lineOrderLineIds = newFulfillment.lines.items.map(
      (l: { orderLine: { id: string } }) => l.orderLine.id
    );
    expect(lineOrderLineIds).toContain(OrderLineConstants.PartiallyFulfilledOrderLine1ID);
    expect(lineOrderLineIds).toContain(OrderLineConstants.PartiallyFulfilledOrderLine2ID);
  });

  test('creates fulfillment in pending state when no tracking info is provided for shipping', async () => {
    const res = await request(app)
      .post('/admin-api')
      .set('Authorization', `Bearer ${UserConstants.AccessToken}`)
      .set('x_lune_shop_id', ShopConstants.ID)
      .send({
        query: ADD_FULFILLMENT_MUTATION,
        variables: {
          id: OrderConstants.ProcessingOrderID,
          input: {
            orderLines: [{ id: OrderLineConstants.ProcessingOrderLine1ID, quantity: 1 }]
          }
        }
      });

    const { order, apiErrors } = res.body.data.addFulfillmentToOrder;

    expect(apiErrors).toHaveLength(0);
    expect(order).not.toBeNull();
    expect(order.state).toBe('PARTIALLY_FULFILLED');

    // Validate fulfillment is in PENDING state
    expect(order.fulfillments.count).toBe(1);
    const fulfillment = order.fulfillments.items[0];
    expect(fulfillment.code).toBeDefined();
    expect(fulfillment.totalQuantity).toBe(1);
    expect(fulfillment.state).toBe('PENDING');
    expect(fulfillment.type).toBe('SHIPPING');
    expect(fulfillment.metadata.carrier).toBeNull();
    expect(fulfillment.metadata.trackingCode).toBeNull();
    expect(fulfillment.metadata.shippedAt).toBeNull();

    // Validate fulfillment lines
    expect(fulfillment.lines.count).toBe(1);
    expect(fulfillment.lines.items[0].quantity).toBe(1);
  });

  test('returns FORBIDDEN_ORDER_ACTION error when order is in modifying state', async () => {
    const res = await request(app)
      .post('/admin-api')
      .set('Authorization', `Bearer ${UserConstants.AccessToken}`)
      .set('x_lune_shop_id', ShopConstants.ID)
      .send({
        query: ADD_FULFILLMENT_MUTATION,
        variables: {
          id: OrderConstants.ModifyingOrderID,
          input: {
            orderLines: [{ id: OrderLineConstants.ModifyingOrderLineID, quantity: 1 }]
          }
        }
      });

    const { order, apiErrors } = res.body.data.addFulfillmentToOrder;

    expect(order).toBeNull();
    expect(apiErrors).toHaveLength(1);
    expect(apiErrors[0].code).toBe('FORBIDDEN_ORDER_ACTION');
  });

  test('returns FORBIDDEN_ORDER_ACTION error when order is in completed state', async () => {
    const res = await request(app)
      .post('/admin-api')
      .set('Authorization', `Bearer ${UserConstants.AccessToken}`)
      .set('x_lune_shop_id', ShopConstants.ID)
      .send({
        query: ADD_FULFILLMENT_MUTATION,
        variables: {
          id: OrderConstants.CompletedOrderID,
          input: {
            orderLines: [{ id: OrderLineConstants.CompletedOrderLineID, quantity: 1 }]
          }
        }
      });

    const { order, apiErrors } = res.body.data.addFulfillmentToOrder;

    expect(order).toBeNull();
    expect(apiErrors).toHaveLength(1);
    expect(apiErrors[0].code).toBe('FORBIDDEN_ORDER_ACTION');
  });

  test('returns MISSING_SHIPPING_DETAILS error when only carrier is provided', async () => {
    const res = await request(app)
      .post('/admin-api')
      .set('Authorization', `Bearer ${UserConstants.AccessToken}`)
      .set('x_lune_shop_id', ShopConstants.ID)
      .send({
        query: ADD_FULFILLMENT_MUTATION,
        variables: {
          id: OrderConstants.ProcessingOrderID,
          input: {
            orderLines: [{ id: OrderLineConstants.ProcessingOrderLine1ID, quantity: 1 }],
            carrier: 'FedEx'
          }
        }
      });

    const { order, apiErrors } = res.body.data.addFulfillmentToOrder;

    expect(order).toBeNull();
    expect(apiErrors).toHaveLength(1);
    expect(apiErrors[0].code).toBe('MISSING_SHIPPING_DETAILS');
  });

  test('returns MISSING_SHIPPING_DETAILS error when only trackingCode is provided', async () => {
    const res = await request(app)
      .post('/admin-api')
      .set('Authorization', `Bearer ${UserConstants.AccessToken}`)
      .set('x_lune_shop_id', ShopConstants.ID)
      .send({
        query: ADD_FULFILLMENT_MUTATION,
        variables: {
          id: OrderConstants.ProcessingOrderID,
          input: {
            orderLines: [{ id: OrderLineConstants.ProcessingOrderLine1ID, quantity: 1 }],
            trackingCode: 'TRACK123'
          }
        }
      });

    const { order, apiErrors } = res.body.data.addFulfillmentToOrder;

    expect(order).toBeNull();
    expect(apiErrors).toHaveLength(1);
    expect(apiErrors[0].code).toBe('MISSING_SHIPPING_DETAILS');
  });

  test('returns EXCEEDS_FULFILLMENT_LINE_QUANTITY_ERROR when quantity exceeds order line quantity', async () => {
    // ProcessingOrderLine1ID has quantity 1, requesting 5
    const res = await request(app)
      .post('/admin-api')
      .set('Authorization', `Bearer ${UserConstants.AccessToken}`)
      .set('x_lune_shop_id', ShopConstants.ID)
      .send({
        query: ADD_FULFILLMENT_MUTATION,
        variables: {
          id: OrderConstants.ProcessingOrderID,
          input: {
            orderLines: [{ id: OrderLineConstants.ProcessingOrderLine1ID, quantity: 5 }]
          }
        }
      });

    const { order, apiErrors } = res.body.data.addFulfillmentToOrder;

    expect(order).toBeNull();
    expect(apiErrors).toHaveLength(1);
    expect(apiErrors[0].code).toBe('EXCEEDS_FULFILLMENT_LINE_QUANTITY_ERROR');
  });

  test('returns EXCEEDS_FULFILLMENT_LINE_QUANTITY_ERROR when quantity exceeds remaining to fulfill', async () => {
    // PartiallyFulfilledOrderLine1ID has quantity 2, 1 already fulfilled, 1 remaining
    // Requesting 2 when only 1 is available
    const res = await request(app)
      .post('/admin-api')
      .set('Authorization', `Bearer ${UserConstants.AccessToken}`)
      .set('x_lune_shop_id', ShopConstants.ID)
      .send({
        query: ADD_FULFILLMENT_MUTATION,
        variables: {
          id: OrderConstants.PartiallyFulfilledOrderID,
          input: {
            orderLines: [{ id: OrderLineConstants.PartiallyFulfilledOrderLine1ID, quantity: 2 }]
          }
        }
      });

    const { order, apiErrors } = res.body.data.addFulfillmentToOrder;

    expect(order).toBeNull();
    expect(apiErrors).toHaveLength(1);
    expect(apiErrors[0].code).toBe('EXCEEDS_FULFILLMENT_LINE_QUANTITY_ERROR');
  });

  test('returns INVALID_QUANTITY error when quantity is 0', async () => {
    const res = await request(app)
      .post('/admin-api')
      .set('Authorization', `Bearer ${UserConstants.AccessToken}`)
      .set('x_lune_shop_id', ShopConstants.ID)
      .send({
        query: ADD_FULFILLMENT_MUTATION,
        variables: {
          id: OrderConstants.ProcessingOrderID,
          input: {
            orderLines: [{ id: OrderLineConstants.ProcessingOrderLine1ID, quantity: 0 }]
          }
        }
      });

    const { order, apiErrors } = res.body.data.addFulfillmentToOrder;

    expect(order).toBeNull();
    expect(apiErrors).toHaveLength(1);
    expect(apiErrors[0].code).toBe('INVALID_FULFILLMENT_LINE_QUANTITY');
  });

  test('returns UNAUTHORIZED error when no token is provided', async () => {
    const res = await request(app)
      .post('/admin-api')
      .send({
        query: ADD_FULFILLMENT_MUTATION,
        variables: {
          id: OrderConstants.ProcessingOrderID,
          input: {
            orderLines: [{ id: OrderLineConstants.ProcessingOrderLine1ID, quantity: 1 }]
          }
        }
      });

    expect(res.body.errors[0].extensions.code).toBe('UNAUTHORIZED');
  });
});

const ADD_FULFILLMENT_MUTATION = /* GraphQL */ `
  mutation AddFulfillmentToOrder($id: ID!, $input: AddFulfillmentToOrderInput!) {
    addFulfillmentToOrder(id: $id, input: $input) {
      order {
        id
        state
        fulfillments {
          count
          items {
            id
            code
            totalQuantity
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
