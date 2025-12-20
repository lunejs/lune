import type { Transaction } from '@/persistence/connection/types';
import { TestUtils } from '@/tests/utils/test-utils';

import { OrderRepository } from '../order.repository';

import { AssetFixtures } from './fixtures/asset.fixtures';
import { CountryFixtures } from './fixtures/country.fixtures';
import { CustomerConstants, CustomerFixtures } from './fixtures/customer.fixtures';
import { FulfillmentConstants, FulfillmentFixtures } from './fixtures/fulfillment.fixtures';
import {
  InStorePickupFulfillmentConstants,
  InStorePickupFulfillmentFixtures
} from './fixtures/in-store-pickup-fulfillment.fixtures';
import { LocationFixtures } from './fixtures/location.fixtures';
import { OptionFixtures } from './fixtures/option.fixtures';
import { OptionPresetFixtures } from './fixtures/option-preset.fixtures';
import { OptionValueFixtures } from './fixtures/option-value.fixtures';
import { OptionValuePresetFixtures } from './fixtures/option-value-preset.fixtures';
import { OrderConstants, OrderFixtures } from './fixtures/order.fixtures';
import { OrderLineFixtures } from './fixtures/order-line.fixtures';
import { ProductConstants, ProductFixtures } from './fixtures/product.fixtures';
import { ProductAssetFixtures } from './fixtures/product-asset.fixtures';
import {
  ShippingFulfillmentConstants,
  ShippingFulfillmentFixtures
} from './fixtures/shipping-fulfillment.fixtures';
import { ShippingMethodFixtures } from './fixtures/shipping-method.fixtures';
import { ShopFixtures } from './fixtures/shop.fixtures';
import { StateFixtures } from './fixtures/state.fixtures';
import { UserFixtures } from './fixtures/user.fixtures';
import { VariantConstants, VariantFixtures } from './fixtures/variant.fixtures';
import { VariantAssetFixtures } from './fixtures/variant-asset.fixtures';
import { VariantOptionValueFixtures } from './fixtures/variant-option-value.fixtures';
import { ZoneFixtures } from './fixtures/zone.fixtures';

describe('OrderRepository.findOneWithDetails', () => {
  const testUtils = new TestUtils();

  let repository: OrderRepository;
  let trx: Transaction;

  beforeEach(async () => {
    trx = await testUtils.generateTrx();
    repository = new OrderRepository(trx);

    await testUtils.loadFixtures([
      new UserFixtures(),
      new ShopFixtures(),
      new ZoneFixtures(),
      new ShippingMethodFixtures(),
      new CountryFixtures(),
      new StateFixtures(),
      new LocationFixtures(),
      new CustomerFixtures(),
      new OptionPresetFixtures(),
      new OptionValuePresetFixtures(),
      new AssetFixtures(),
      new ProductFixtures(),
      new ProductAssetFixtures(),
      new OptionFixtures(),
      new OptionValueFixtures(),
      new VariantFixtures(),
      new VariantAssetFixtures(),
      new VariantOptionValueFixtures(),
      new OrderFixtures(),
      new OrderLineFixtures(),
      new FulfillmentFixtures(),
      new ShippingFulfillmentFixtures(),
      new InStorePickupFulfillmentFixtures()
    ]);
  });

  afterEach(async () => {
    await testUtils.resetDatabase();
  });

  afterAll(async () => {
    await testUtils.destroyDatabase();
  });

  describe('findOneWithDetails', () => {
    test('returns order with shipping fulfillment', async () => {
      const order = await repository.findOneWithDetails(OrderConstants.ID);

      expect(order?.id).toBe(OrderConstants.ID);

      expect(order?.customer.id).toBe(CustomerConstants.ID);
      expect(order?.fulfillment.id).toBe(FulfillmentConstants.ID);

      expect(order?.fulfillmentDetails.id).toBe(ShippingFulfillmentConstants.ID);

      expect(order?.lines).toHaveLength(2);

      expect(order?.lines[0].variant.id).toBe(VariantConstants.AlreadyInLineID);
      expect(order?.lines[1].variant.id).toBe(VariantConstants.ID);

      expect(order?.lines[0].variant.assets).toHaveLength(1);
      expect(order?.lines[1].variant.assets).toHaveLength(1);

      expect(order?.lines[0].variant.optionValues).toHaveLength(1);
      expect(order?.lines[1].variant.optionValues).toHaveLength(1);

      expect(order?.lines[0].variant.product.id).toBe(ProductConstants.ShirtID);
      expect(order?.lines[1].variant.product.id).toBe(ProductConstants.ShirtID);

      expect(order?.lines[0].variant.product.assets).toHaveLength(2);
      expect(order?.lines[1].variant.product.assets).toHaveLength(2);

      expect(order?.lines[0].variant.optionValues[0].preset).not.toBeNull();
      expect(order?.lines[1].variant.optionValues[0].preset).not.toBeNull();
    });

    test('returns order with in store pickup fulfillment', async () => {
      const order = await repository.findOneWithDetails(OrderConstants.InStorePickupID);

      expect(order?.id).toBe(OrderConstants.InStorePickupID);

      expect(order?.customer.id).toBe(CustomerConstants.ID);
      expect(order?.fulfillment.id).toBe(FulfillmentConstants.InStorePickupID);

      expect(order?.fulfillmentDetails.id).toBe(InStorePickupFulfillmentConstants.ID);

      expect(order?.lines).toHaveLength(2);

      expect(order?.lines[0].variant.id).toBe(VariantConstants.AlreadyInLineID);
      expect(order?.lines[1].variant.id).toBe(VariantConstants.ID);

      expect(order?.lines[0].variant.assets).toHaveLength(1);
      expect(order?.lines[1].variant.assets).toHaveLength(1);

      expect(order?.lines[0].variant.optionValues).toHaveLength(1);
      expect(order?.lines[1].variant.optionValues).toHaveLength(1);

      expect(order?.lines[0].variant.product.id).toBe(ProductConstants.ShirtID);
      expect(order?.lines[1].variant.product.id).toBe(ProductConstants.ShirtID);

      expect(order?.lines[0].variant.product.assets).toHaveLength(2);
      expect(order?.lines[1].variant.product.assets).toHaveLength(2);

      expect(order?.lines[0].variant.optionValues[0].preset).not.toBeNull();
      expect(order?.lines[1].variant.optionValues[0].preset).not.toBeNull();
    });
  });
});
