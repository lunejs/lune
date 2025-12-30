import type {
  Asset,
  Customer,
  DeliveryMethod,
  DeliveryMethodPickup,
  DeliveryMethodShipping,
  Fulfillment,
  FulfillmentLine,
  OptionValue,
  Order,
  OrderLine,
  Product,
  Variant
} from '@lune/core';

export type CommonEmailOrder = Order & {
  customer: Customer;
  deliveryMethod: DeliveryMethod;
  deliveryMethodDetails: DeliveryMethodShipping | DeliveryMethodPickup;
  fulfillments: (Fulfillment & {
    lines: FulfillmentLine[];
  })[];
  lines: (OrderLine & {
    variant: Variant & {
      assets: Asset[];
      product: Product & {
        assets: Asset[];
      };
      optionValues: (OptionValue & { metadata?: any })[];
    };
  })[];
};
