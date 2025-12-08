import request from 'supertest';

import { LuneServer } from '@/server';
import { TEST_LUNE_CONFIG } from '@/tests/utils/test-config';
import { TestUtils } from '@/tests/utils/test-utils';

import { CountryConstants, CountryFixtures } from './fixtures/country.fixtures';
import { OrderConstants, OrderFixtures } from './fixtures/order.fixtures';
import { ShopConstants, ShopFixtures } from './fixtures/shop.fixtures';
import { StateConstants, StateFixtures } from './fixtures/state.fixtures';
import { UserFixtures } from './fixtures/user.fixtures';

describe('addShippingAddressToOrder - Mutation', () => {
  const testHelper = new TestUtils();

  const luneServer = new LuneServer(TEST_LUNE_CONFIG);
  const app = luneServer.getApp();

  beforeEach(async () => {
    await testHelper.loadFixtures([
      new UserFixtures(),
      new ShopFixtures(),
      new CountryFixtures(),
      new StateFixtures(),
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

  test('adds partial shipping address to order', async () => {
    const res = await request(app)
      .post('/storefront-api')
      .set('x_lune_shop_id', ShopConstants.ID)
      .set('x_lune_storefront_api_key', ShopConstants.StorefrontApiKey)
      .send({
        query: ADD_SHIPPING_ADDRESS_TO_ORDER_MUTATION,
        variables: {
          orderId: OrderConstants.ID,
          input: {
            fullName: 'Ellie Williams',
            streetLine1: '1st street',
            city: 'New York',
            postalCode: '07086',
            phoneNumber: '13125552046',
            countryCode: CountryConstants.UsCode,
            stateCode: StateConstants.UsNewYorkCode
          }
        }
      });

    const {
      addShippingAddressToOrder: { order }
    } = res.body.data;

    expect(order.id).toBe(OrderConstants.ID);

    expect(order.shippingAddress).toMatchObject({
      fullName: 'Ellie Williams',
      streetLine1: '1st street',
      streetLine2: null,
      city: 'New York',
      postalCode: '07086',
      phoneNumber: '13125552046',
      references: null,
      country: 'United States',
      countryCode: CountryConstants.UsCode,
      state: 'New York',
      stateCode: StateConstants.UsNewYorkCode
    });
  });

  test('adds full shipping address to order', async () => {
    const res = await request(app)
      .post('/storefront-api')
      .set('x_lune_shop_id', ShopConstants.ID)
      .set('x_lune_storefront_api_key', ShopConstants.StorefrontApiKey)
      .send({
        query: ADD_SHIPPING_ADDRESS_TO_ORDER_MUTATION,
        variables: {
          orderId: OrderConstants.ID,
          input: {
            fullName: 'Ellie Williams',
            streetLine1: '1st street',
            streetLine2: '2nd street',
            city: 'New York',
            postalCode: '07086',
            phoneNumber: '13125552046',
            references: 'It is a cool house come in u idiots :)',
            countryCode: CountryConstants.UsCode,
            stateCode: StateConstants.UsNewYorkCode
          }
        }
      });

    const {
      addShippingAddressToOrder: { order }
    } = res.body.data;

    expect(order.id).toBe(OrderConstants.ID);

    expect(order.shippingAddress).toMatchObject({
      fullName: 'Ellie Williams',
      streetLine1: '1st street',
      streetLine2: '2nd street',
      city: 'New York',
      postalCode: '07086',
      phoneNumber: '13125552046',
      references: 'It is a cool house come in u idiots :)',
      country: 'United States',
      countryCode: CountryConstants.UsCode,
      state: 'New York',
      stateCode: StateConstants.UsNewYorkCode
    });
  });

  test('updates shipping address in an order', async () => {
    const res = await request(app)
      .post('/storefront-api')
      .set('x_lune_shop_id', ShopConstants.ID)
      .set('x_lune_storefront_api_key', ShopConstants.StorefrontApiKey)
      .send({
        query: ADD_SHIPPING_ADDRESS_TO_ORDER_MUTATION,
        variables: {
          orderId: OrderConstants.WithShippingAddressId,
          input: {
            fullName: 'Joel Miller',
            streetLine1: '1st new street',
            city: 'New York',
            postalCode: '07086',
            phoneNumber: '13125552046',
            countryCode: CountryConstants.UsCode,
            stateCode: StateConstants.UsNewYorkCode
          }
        }
      });

    const {
      addShippingAddressToOrder: { order }
    } = res.body.data;

    expect(order.id).toBe(OrderConstants.WithShippingAddressId);

    expect(order.shippingAddress).toMatchObject({
      fullName: 'Joel Miller',
      streetLine1: '1st new street',
      streetLine2: '2nd street',
      city: 'New York',
      postalCode: '07086',
      phoneNumber: '13125552046',
      references: 'It is a cool house come in u idiots :)',
      country: 'United States',
      countryCode: CountryConstants.UsCode,
      state: 'New York',
      stateCode: StateConstants.UsNewYorkCode
    });
  });

  test('sets null values for shipping address in an order', async () => {
    const res = await request(app)
      .post('/storefront-api')
      .set('x_lune_shop_id', ShopConstants.ID)
      .set('x_lune_storefront_api_key', ShopConstants.StorefrontApiKey)
      .send({
        query: ADD_SHIPPING_ADDRESS_TO_ORDER_MUTATION,
        variables: {
          orderId: OrderConstants.WithShippingAddressId,
          input: {
            fullName: 'Joel Miller',
            streetLine1: '1st new street',
            streetLine2: null,
            city: 'New York',
            postalCode: '07086',
            phoneNumber: '13125552046',
            references: null,
            countryCode: CountryConstants.UsCode,
            stateCode: StateConstants.UsNewYorkCode
          }
        }
      });

    const {
      addShippingAddressToOrder: { order }
    } = res.body.data;

    expect(order.id).toBe(OrderConstants.WithShippingAddressId);

    expect(order.shippingAddress).toMatchObject({
      fullName: 'Joel Miller',
      streetLine1: '1st new street',
      streetLine2: null,
      city: 'New York',
      postalCode: '07086',
      phoneNumber: '13125552046',
      references: null,
      country: 'United States',
      countryCode: CountryConstants.UsCode,
      state: 'New York',
      stateCode: StateConstants.UsNewYorkCode
    });
  });

  test('returns FORBIDDEN_ORDER_ACTION when order states is not MODIFYING', async () => {
    const res = await request(app)
      .post('/storefront-api')
      .set('x_lune_shop_id', ShopConstants.ID)
      .set('x_lune_storefront_api_key', ShopConstants.StorefrontApiKey)
      .send({
        query: ADD_SHIPPING_ADDRESS_TO_ORDER_MUTATION,
        variables: {
          orderId: OrderConstants.PlacedID,
          input: {
            fullName: 'Ellie Williams',
            streetLine1: '1st street',
            city: 'New York',
            postalCode: '07086',
            phoneNumber: '13125552046',
            countryCode: CountryConstants.UsCode,
            stateCode: StateConstants.UsNewYorkCode
          }
        }
      });

    const {
      addShippingAddressToOrder: { order, apiErrors }
    } = res.body.data;

    const [error] = apiErrors;

    expect(order).toBeNull();
    expect(error.code).toBe('FORBIDDEN_ORDER_ACTION');
  });
});

const ADD_SHIPPING_ADDRESS_TO_ORDER_MUTATION = /* GraphQL */ `
  mutation AddShippingAddress($orderId: ID!, $input: CreateOrderAddressInput!) {
    addShippingAddressToOrder(orderId: $orderId, input: $input) {
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
          fullName
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
      }
    }
  }
`;
