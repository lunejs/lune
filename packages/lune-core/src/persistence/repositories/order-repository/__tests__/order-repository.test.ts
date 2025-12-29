import type { Transaction } from '@/persistence/connection/types';
import { Tables } from '@/persistence/tables';
import { TestUtils } from '@/tests/utils/test-utils';

import { OrderRepository } from '../order.repository';

import { AssetFixtures } from './fixtures/asset.fixtures';
import { CountryFixtures } from './fixtures/country.fixtures';
import {
  CustomFieldDefinitionConstants,
  CustomFieldDefinitionFixtures
} from './fixtures/custom-field-definition.fixtures';
import {
  CustomObjectDefinitionConstants,
  CustomObjectDefinitionFixtures
} from './fixtures/custom-object-definition.fixtures';
import { CustomObjectEntryFixtures } from './fixtures/custom-object-entry.fixtures';
import {
  CustomObjectEntryValueConstants,
  CustomObjectEntryValueFixtures
} from './fixtures/custom-object-entry-value.fixtures';
import { CustomerConstants, CustomerFixtures } from './fixtures/customer.fixtures';
import { FulfillmentConstants, FulfillmentFixtures } from './fixtures/fulfillment.fixtures';
import {
  InStorePickupFulfillmentConstants,
  InStorePickupFulfillmentFixtures
} from './fixtures/in-store-pickup-fulfillment.fixtures';
import { LocationFixtures } from './fixtures/location.fixtures';
import { OptionFixtures } from './fixtures/option.fixtures';
import { OptionValueFixtures } from './fixtures/option-value.fixtures';
import { OrderConstants, OrderFixtures } from './fixtures/order.fixtures';
import {
  OrderFulfillmentConstants,
  OrderFulfillmentFixtures
} from './fixtures/order-fulfillment.fixtures';
import {
  OrderFulfillmentLineConstants,
  OrderFulfillmentLineFixtures
} from './fixtures/order-fulfillment-line.fixtures';
import { OrderLineFixtures } from './fixtures/order-line.fixtures';
import { ProductConstants, ProductFixtures } from './fixtures/product.fixtures';
import { ProductAssetFixtures } from './fixtures/product-asset.fixtures';
import {
  ShippingFulfillmentConstants,
  ShippingFulfillmentFixtures
} from './fixtures/shipping-fulfillment.fixtures';
import { ShippingMethodFixtures } from './fixtures/shipping-method.fixtures';
import { ShopConstants, ShopFixtures } from './fixtures/shop.fixtures';
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
      new AssetFixtures(),
      new ProductFixtures(),
      new ProductAssetFixtures(),
      new CustomObjectDefinitionFixtures(),
      new CustomFieldDefinitionFixtures(),
      new CustomObjectEntryFixtures(),
      new CustomObjectEntryValueFixtures(),
      new OptionFixtures(),
      new OptionValueFixtures(),
      new VariantFixtures(),
      new VariantAssetFixtures(),
      new VariantOptionValueFixtures(),
      new OrderFixtures(),
      new OrderLineFixtures(),
      new FulfillmentFixtures(),
      new ShippingFulfillmentFixtures(),
      new InStorePickupFulfillmentFixtures(),
      new OrderFulfillmentFixtures(),
      new OrderFulfillmentLineFixtures()
    ]);

    // Set display_field_id for Color custom object definition
    await trx(Tables.CustomObjectDefinition)
      .where({ id: CustomObjectDefinitionConstants.ColorID, shop_id: ShopConstants.ID })
      .update({ display_field_id: CustomFieldDefinitionConstants.ColorNameFieldID });
  });

  afterEach(async () => {
    await testUtils.resetDatabase();
  });

  afterAll(async () => {
    await testUtils.destroyDatabase();
  });

  describe('findOneWithDetails', () => {
    test('returns order with shipping delivery method', async () => {
      const order = await repository.findOneWithDetails(OrderConstants.ID);

      expect(order?.id).toBe(OrderConstants.ID);

      expect(order?.customer.id).toBe(CustomerConstants.ID);
      expect(order?.deliveryMethod.id).toBe(FulfillmentConstants.ID);

      expect(order?.deliveryMethodDetails.id).toBe(ShippingFulfillmentConstants.ID);

      // Fulfillments
      expect(order?.fulfillments).toHaveLength(1);
      expect(order?.fulfillments[0].id).toBe(OrderFulfillmentConstants.ID);
      expect(order?.fulfillments[0].code).toBe(OrderFulfillmentConstants.Code);
      expect(order?.fulfillments[0].totalQuantity).toBe(2);
      expect(order?.fulfillments[0].lines).toHaveLength(2);
      expect(order?.fulfillments[0].lines[0].id).toBe(OrderFulfillmentLineConstants.ID);
      expect(order?.fulfillments[0].lines[1].id).toBe(OrderFulfillmentLineConstants.ID2);

      expect(order?.lines).toHaveLength(2);

      expect(order?.lines[0].variant.id).toBe(VariantConstants.AlreadyInLineID);
      expect(order?.lines[1].variant.id).toBe(VariantConstants.ID);

      expect(order?.lines[0].variant.assets).toHaveLength(1);
      expect(order?.lines[1].variant.assets).toHaveLength(1);

      expect(order?.lines[0].variant.optionValues).toHaveLength(1);
      expect(order?.lines[1].variant.optionValues).toHaveLength(1);

      // Option value without custom object entry (Polyester)
      expect(order?.lines[0].variant.optionValues[0].name).toBe('Polyester');
      expect(order?.lines[0].variant.optionValues[0].metadata).toBeUndefined();

      // Option value with custom object entry (Cotton -> Red color)
      expect(order?.lines[1].variant.optionValues[0].name).toBe(
        CustomObjectEntryValueConstants.RedNameValue
      );
      expect(order?.lines[1].variant.optionValues[0].metadata).toEqual({
        hex: CustomObjectEntryValueConstants.RedHexValue
      });

      expect(order?.lines[0].variant.product.id).toBe(ProductConstants.ShirtID);
      expect(order?.lines[1].variant.product.id).toBe(ProductConstants.ShirtID);

      expect(order?.lines[0].variant.product.assets).toHaveLength(2);
      expect(order?.lines[1].variant.product.assets).toHaveLength(2);
    });

    test('returns order with in store pickup delivery method', async () => {
      const order = await repository.findOneWithDetails(OrderConstants.InStorePickupID);

      expect(order?.id).toBe(OrderConstants.InStorePickupID);

      expect(order?.customer.id).toBe(CustomerConstants.ID);
      expect(order?.deliveryMethod.id).toBe(FulfillmentConstants.InStorePickupID);

      expect(order?.deliveryMethodDetails.id).toBe(InStorePickupFulfillmentConstants.ID);

      // Fulfillments
      expect(order?.fulfillments).toHaveLength(1);
      expect(order?.fulfillments[0].id).toBe(OrderFulfillmentConstants.InStorePickupID);
      expect(order?.fulfillments[0].code).toBe(OrderFulfillmentConstants.InStorePickupCode);
      expect(order?.fulfillments[0].totalQuantity).toBe(2);
      expect(order?.fulfillments[0].lines).toHaveLength(2);
      expect(order?.fulfillments[0].lines[0].id).toBe(
        OrderFulfillmentLineConstants.InStorePickupID
      );
      expect(order?.fulfillments[0].lines[1].id).toBe(
        OrderFulfillmentLineConstants.InStorePickupID2
      );

      expect(order?.lines).toHaveLength(2);

      expect(order?.lines[0].variant.id).toBe(VariantConstants.AlreadyInLineID);
      expect(order?.lines[1].variant.id).toBe(VariantConstants.ID);

      expect(order?.lines[0].variant.assets).toHaveLength(1);
      expect(order?.lines[1].variant.assets).toHaveLength(1);

      expect(order?.lines[0].variant.optionValues).toHaveLength(1);
      expect(order?.lines[1].variant.optionValues).toHaveLength(1);

      // Option value without custom object entry (Polyester)
      expect(order?.lines[0].variant.optionValues[0].name).toBe('Polyester');
      expect(order?.lines[0].variant.optionValues[0].metadata).toBeUndefined();

      // Option value with custom object entry (Cotton -> Red color)
      expect(order?.lines[1].variant.optionValues[0].name).toBe(
        CustomObjectEntryValueConstants.RedNameValue
      );
      expect(order?.lines[1].variant.optionValues[0].metadata).toEqual({
        hex: CustomObjectEntryValueConstants.RedHexValue
      });

      expect(order?.lines[0].variant.product.id).toBe(ProductConstants.ShirtID);
      expect(order?.lines[1].variant.product.id).toBe(ProductConstants.ShirtID);

      expect(order?.lines[0].variant.product.assets).toHaveLength(2);
      expect(order?.lines[1].variant.product.assets).toHaveLength(2);
    });
  });
});
