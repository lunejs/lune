import type { Transaction } from '../connection/connection';

import { AddressRepository } from './address-repository';
import { AssetRepository } from './asset-repository';
import { CollectionRepository } from './collection-repository';
import { CollectionTranslationRepository } from './collection-translation-repository';
import { CountryRepository } from './country-repository';
import { CustomFieldDefinitionRepository } from './custom-field-definition-repository';
import { CustomerAuthMethodRepository } from './customer-auth-method-repository';
import { CustomerRepository } from './customer-repository';
import { DiscountRepository } from './discount-repository';
import { FulfillmentRepository } from './fulfillment-repository';
import { InStorePickupFulfillmentRepository } from './in-store-pickup-fulfillment-repository';
import { InStorePickupRepository } from './in-store-pickup-repository';
import { LocationRepository } from './location-repository';
import { OptionPresetRepository } from './option-preset-repository';
import { OptionRepository } from './option-repository';
import { OptionTranslationRepository } from './option-translation-repository';
import { OptionValueRepository } from './option-value-repository';
import { OptionValueTranslationRepository } from './option-value-translation-repository';
import { OrderCancellationRepository } from './order-cancellation-repository';
import { OrderDiscountRepository } from './order-discount-repository';
import { OrderLineRepository } from './order-line-repository';
import { OrderRepository } from './order-repository';
import { PaymentCancellationRepository } from './payment-cancellation-repository';
import { PaymentFailureRepository } from './payment-failure-repository';
import { PaymentMethodRepository } from './payment-method-repository';
import { PaymentRejectionRepository } from './payment-rejection-repository';
import { PaymentRepository } from './payment-repository';
import { ProductCustomFieldRepository } from './product-custom-field-repository';
import { ProductCustomFieldTranslationRepository } from './product-custom-field-translation-repository';
import { ProductRepository } from './product-repository';
import { ProductTranslationRepository } from './product-translation-repository';
import { ShippingFulfillmentRepository } from './shipping-fulfillment-repository';
import { ShippingMethodRepository } from './shipping-method-repository';
import { ShopRepository } from './shop-repository';
import { StateRepository } from './state-repository';
import { UserRepository } from './user-repository';
import { VariantRepository } from './variant-repository';
import { ZoneRepository } from './zone-repository';
import { ZoneStateRepository } from './zone-state-repository';

export function buildRepositories(trx: Transaction) {
  return {
    user: new UserRepository(trx),
    shop: new ShopRepository(trx),
    product: new ProductRepository(trx),
    asset: new AssetRepository(trx),
    variant: new VariantRepository(trx),
    productTranslation: new ProductTranslationRepository(trx),
    option: new OptionRepository(trx),
    optionValue: new OptionValueRepository(trx),
    optionTranslation: new OptionTranslationRepository(trx),
    optionValueTranslation: new OptionValueTranslationRepository(trx),
    collection: new CollectionRepository(trx),
    collectionTranslation: new CollectionTranslationRepository(trx),
    customer: new CustomerRepository(trx),
    customerAuthMethod: new CustomerAuthMethodRepository(trx),
    country: new CountryRepository(trx),
    state: new StateRepository(trx),
    address: new AddressRepository(trx),
    order: new OrderRepository(trx),
    orderCancellation: new OrderCancellationRepository(trx),
    orderLine: new OrderLineRepository(trx),
    payment: new PaymentRepository(trx),
    paymentMethod: new PaymentMethodRepository(trx),
    paymentFailure: new PaymentFailureRepository(trx),
    paymentRejection: new PaymentRejectionRepository(trx),
    paymentCancellation: new PaymentCancellationRepository(trx),
    location: new LocationRepository(trx),
    inStorePickup: new InStorePickupRepository(trx),
    fulfillment: new FulfillmentRepository(trx),
    shippingFulfillment: new ShippingFulfillmentRepository(trx),
    inStorePickupFulfillment: new InStorePickupFulfillmentRepository(trx),
    zone: new ZoneRepository(trx),
    zoneState: new ZoneStateRepository(trx),
    shippingMethod: new ShippingMethodRepository(trx),
    discount: new DiscountRepository(trx),
    orderDiscount: new OrderDiscountRepository(trx),
    optionPreset: new OptionPresetRepository(trx),
    customFieldDefinition: new CustomFieldDefinitionRepository(trx),
    productCustomField: new ProductCustomFieldRepository(trx),
    productCustomFieldTranslation: new ProductCustomFieldTranslationRepository(trx)
  };
}

export type Repositories = ReturnType<typeof buildRepositories>;
