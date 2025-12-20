import type {
  Asset,
  Customer,
  Fulfillment,
  InStorePickupFulfillment,
  OptionValue,
  OptionValuePreset,
  Order,
  OrderLine,
  Product,
  ShippingFulfillment,
  Variant
} from '@lune/core';

export type CommonEmailOrder = Order & {
  customer: Customer;
  fulfillment: Fulfillment;
  fulfillmentDetails: ShippingFulfillment | InStorePickupFulfillment;
  lines: (OrderLine & {
    variant: Variant & {
      assets: Asset[];
      product: Product & {
        assets: Asset[];
      };
      optionValues: (OptionValue & { preset: OptionValuePreset | null })[];
    };
  })[];
};
