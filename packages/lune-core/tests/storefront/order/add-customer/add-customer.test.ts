import request from 'supertest';

import { LuneServer } from '@/server';
import { TEST_LUNE_CONFIG } from '@/tests/utils/test-config';
import { TestUtils } from '@/tests/utils/test-utils';

import { CustomerConstants, CustomerFixtures } from './fixtures/customer.fixtures';
import { OrderConstants, OrderFixtures } from './fixtures/order.fixtures';
import { ShopConstants, ShopFixtures } from './fixtures/shop.fixtures';
import { UserFixtures } from './fixtures/user.fixtures';

describe('addCustomerToOrder - Mutation', () => {
  const testHelper = new TestUtils();

  const luneServer = new LuneServer(TEST_LUNE_CONFIG);
  const app = luneServer.getApp();

  beforeEach(async () => {
    await testHelper.loadFixtures([
      new UserFixtures(),
      new ShopFixtures(),
      new CustomerFixtures(),
      new OrderFixtures()
    ]);
  });

  afterEach(async () => {
    await testHelper.resetDatabase();
  });

  afterAll(async () => {
    await testHelper.destroyDatabase();
    await luneServer.teardown();
  });

  test('adds a partial non existing customer to an order', async () => {
    const res = await request(app)
      .post('/storefront-api')
      .set('x_lune_shop_id', ShopConstants.ID)
      .set('x_lune_storefront_api_key', ShopConstants.StorefrontApiKey)
      .send({
        query: ADD_CUSTOMER_TO_ORDER_MUTATION,
        variables: {
          orderId: OrderConstants.ID,
          input: {
            email: 'non@existing.com'
          }
        }
      });

    const {
      addCustomerToOrder: { order }
    } = res.body.data;

    expect(order.id).toBe(OrderConstants.ID);

    expect(order.customer.email).toBe('non@existing.com');
    expect(order.customer.firstName).toBeNull();
    expect(order.customer.lastName).toBeNull();
    expect(order.customer.phoneNumber).toBeNull();
  });

  test('adds a fully non existing customer to an order', async () => {
    const res = await request(app)
      .post('/storefront-api')
      .set('x_lune_shop_id', ShopConstants.ID)
      .set('x_lune_storefront_api_key', ShopConstants.StorefrontApiKey)
      .send({
        query: ADD_CUSTOMER_TO_ORDER_MUTATION,
        variables: {
          orderId: OrderConstants.ID,
          input: {
            email: 'non@existing.com',
            firstName: 'Roberto',
            lastName: 'Lopez',
            phoneNumber: '+526672538492'
          }
        }
      });

    const {
      addCustomerToOrder: { order }
    } = res.body.data;

    expect(order.id).toBe(OrderConstants.ID);

    expect(order.customer.email).toBe('non@existing.com');
    expect(order.customer.firstName).toBe('Roberto');
    expect(order.customer.lastName).toBe('Lopez');
    expect(order.customer.phoneNumber).toBe('+526672538492');
  });

  test('adds a partial existing customer to an order', async () => {
    const res = await request(app)
      .post('/storefront-api')
      .set('x_lune_shop_id', ShopConstants.ID)
      .set('x_lune_storefront_api_key', ShopConstants.StorefrontApiKey)
      .send({
        query: ADD_CUSTOMER_TO_ORDER_MUTATION,
        variables: {
          orderId: OrderConstants.ID,
          input: {
            email: CustomerConstants.Email
          }
        }
      });

    const {
      addCustomerToOrder: { order }
    } = res.body.data;

    expect(order.id).toBe(OrderConstants.ID);

    expect(order.customer.email).toBe(CustomerConstants.Email);
    expect(order.customer.firstName).toBe(CustomerConstants.FirstName);
    expect(order.customer.lastName).toBe(CustomerConstants.LastName);
    expect(order.customer.phoneNumber).toBe(CustomerConstants.PhoneNumber);
  });

  test('adds a fully existing customer to an order', async () => {
    const res = await request(app)
      .post('/storefront-api')
      .set('x_lune_shop_id', ShopConstants.ID)
      .set('x_lune_storefront_api_key', ShopConstants.StorefrontApiKey)
      .send({
        query: ADD_CUSTOMER_TO_ORDER_MUTATION,
        variables: {
          orderId: OrderConstants.ID,
          input: {
            email: CustomerConstants.Email,
            firstName: 'Abby',
            lastName: 'Anderson',
            phoneNumber: '+526672538492'
          }
        }
      });

    const {
      addCustomerToOrder: { order }
    } = res.body.data;

    expect(order.id).toBe(OrderConstants.ID);

    expect(order.customer.email).toBe(CustomerConstants.Email);
    expect(order.customer.firstName).toBe('Abby');
    expect(order.customer.lastName).toBe('Anderson');
    expect(order.customer.phoneNumber).toBe('+526672538492');
  });

  test('sets null values for a existing customer adding to an order', async () => {
    const res = await request(app)
      .post('/storefront-api')
      .set('x_lune_shop_id', ShopConstants.ID)
      .set('x_lune_storefront_api_key', ShopConstants.StorefrontApiKey)
      .send({
        query: ADD_CUSTOMER_TO_ORDER_MUTATION,
        variables: {
          orderId: OrderConstants.ID,
          input: {
            email: CustomerConstants.Email,
            firstName: null,
            lastName: null,
            phoneNumber: null
          }
        }
      });

    const {
      addCustomerToOrder: { order }
    } = res.body.data;

    expect(order.id).toBe(OrderConstants.ID);

    expect(order.customer.email).toBe(CustomerConstants.Email);
    expect(order.customer.firstName).toBeNull();
    expect(order.customer.lastName).toBeNull();
    expect(order.customer.phoneNumber).toBeNull();
  });

  test('replaces a customer in an order', async () => {
    const res = await request(app)
      .post('/storefront-api')
      .set('x_lune_shop_id', ShopConstants.ID)
      .set('x_lune_storefront_api_key', ShopConstants.StorefrontApiKey)
      .send({
        query: ADD_CUSTOMER_TO_ORDER_MUTATION,
        variables: {
          orderId: OrderConstants.WithCustomerID,
          input: {
            email: CustomerConstants.Email
          }
        }
      });

    const {
      addCustomerToOrder: { order }
    } = res.body.data;

    expect(order.id).toBe(OrderConstants.WithCustomerID);

    expect(order.customer.email).toBe(CustomerConstants.Email);
    expect(order.customer.firstName).toBe(CustomerConstants.FirstName);
    expect(order.customer.lastName).toBe(CustomerConstants.LastName);
    expect(order.customer.phoneNumber).toBe(CustomerConstants.PhoneNumber);
  });

  test('replaces and updates a customer in an order', async () => {
    const res = await request(app)
      .post('/storefront-api')
      .set('x_lune_shop_id', ShopConstants.ID)
      .set('x_lune_storefront_api_key', ShopConstants.StorefrontApiKey)
      .send({
        query: ADD_CUSTOMER_TO_ORDER_MUTATION,
        variables: {
          orderId: OrderConstants.WithCustomerID,
          input: {
            email: CustomerConstants.Email,
            firstName: 'Abby',
            lastName: 'Anderson',
            phoneNumber: '+526672538492'
          }
        }
      });

    const {
      addCustomerToOrder: { order }
    } = res.body.data;

    expect(order.id).toBe(OrderConstants.WithCustomerID);

    expect(order.customer.email).toBe(CustomerConstants.Email);
    expect(order.customer.firstName).toBe('Abby');
    expect(order.customer.lastName).toBe('Anderson');
    expect(order.customer.phoneNumber).toBe('+526672538492');
  });

  test('returns INVALID_CUSTOMER_EMAIL error code when in invalid email is provided', async () => {
    const res = await request(app)
      .post('/storefront-api')
      .set('x_lune_shop_id', ShopConstants.ID)
      .set('x_lune_storefront_api_key', ShopConstants.StorefrontApiKey)
      .send({
        query: ADD_CUSTOMER_TO_ORDER_MUTATION,
        variables: {
          orderId: OrderConstants.ID,
          input: {
            email: 'invalid-email'
          }
        }
      });

    const {
      addCustomerToOrder: { order, apiErrors }
    } = res.body.data;

    const [error] = apiErrors;

    expect(order).toBeNull();
    expect(error.code).toBe('INVALID_CUSTOMER_EMAIL');
  });

  test('returns FORBIDDEN_ORDER_ACTION when order states is not MODIFYING', async () => {
    const res = await request(app)
      .post('/storefront-api')
      .set('x_lune_shop_id', ShopConstants.ID)
      .set('x_lune_storefront_api_key', ShopConstants.StorefrontApiKey)
      .send({
        query: ADD_CUSTOMER_TO_ORDER_MUTATION,
        variables: {
          orderId: OrderConstants.OrderPlacedID,
          input: {
            email: CustomerConstants.Email
          }
        }
      });

    const {
      addCustomerToOrder: { order, apiErrors }
    } = res.body.data;

    const [error] = apiErrors;

    expect(order).toBeNull();
    expect(error.code).toBe('FORBIDDEN_ORDER_ACTION');
  });

  test('returns UNAUTHORIZED error when storefront api key is invalid', async () => {
    const response = await request(app)
      .post('/storefront-api')
      .set('x_lune_shop_id', ShopConstants.ID)
      .set('x_lune_storefront_api_key', 'invalid_key')
      .send({
        query: ADD_CUSTOMER_TO_ORDER_MUTATION,
        variables: {
          orderId: OrderConstants.ID,
          input: {
            email: 'test@example.com'
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
        query: ADD_CUSTOMER_TO_ORDER_MUTATION,
        variables: {
          orderId: OrderConstants.ID,
          input: {
            email: 'test@example.com'
          }
        }
      });

    expect(response.body.errors[0].extensions.code).toBe('UNAUTHORIZED');
  });
});

const ADD_CUSTOMER_TO_ORDER_MUTATION = /* GraphQL */ `
  mutation AddCustomer($orderId: ID!, $input: AddCustomerToOrderInput!) {
    addCustomerToOrder(orderId: $orderId, input: $input) {
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
        shippingAddress {
          streetLine1
        }
        customer {
          id
          email
          firstName
          lastName
          phoneNumber
        }
      }
    }
  }
`;
