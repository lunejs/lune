import { createOptionLocalizationLoader } from '@/api/storefront/loaders/option-localization.loader';
import { createOptionValueLocalizationLoader } from '@/api/storefront/loaders/option-value-localization.loader copy';
import { createProductLocalizationLoader } from '@/api/storefront/loaders/product-localization.loader';
import type { Transaction } from '@/persistence/connection/connection';
import type { Locale } from '@/persistence/entities/locale';

import { createAddressCountryLoader } from './address/address-country.loader';
import { createAddressStateLoader } from './address/address-state.loader';
import { createCollectionAssetsLoader } from './collection/collection-asset.loader';
import { createCollectionSubCollectionsLoader } from './collection/collection-asset.loader copy';
import { createCollectionCustomFieldTranslationsLoader } from './collection/collection-custom-field-translations.loader';
import { createCollectionCustomFieldsLoader } from './collection/collection-custom-fields.loader';
import { createCollectionProductsLoader } from './collection/collection-product.loader';
import { createCollectionTranslationsLoader } from './collection/collection-translations.loader';
import { createCountryStatesLoader } from './country/country-states.loader';
import { createCustomerOrdersLoader } from './customer/customer-orders.loader';
import { createCustomerTotalSpentLoader } from './customer/customer-total-spent.loader';
import { createFulfillmentDetailsLoader } from './fulfillment/fulfillment-details.loader';
import { createFulfillmentLocationLoader } from './fulfillment/fulfillment-location.loader';
import { createFulfillmentShippingMethodLoader } from './fulfillment/fulfillment-shipping-method.loader';
import { createLocationCountryLoader } from './location/location-country.loader';
import { createLocationInStorePickupLoader } from './location/location-in-store-pickup.loader';
import { createLocationStateLoader } from './location/location-state.loader';
import { createOptionTranslationsLoader } from './option/option-translations.loader';
import { createOptionValuePresetsLoader } from './option-preset/option-value-preset.loader';
import { createOptionValuePresetLoader } from './option-value/option-value-preset.loader';
import { createOptionValuesLoader } from './option-value/option-values.loader';
import { createOptionValuesTranslationsLoader } from './option-value/option-values-translations.loader';
import { createOrderCancellationLoader } from './order/order-cancellation.loader';
import { createOrderCustomersLoader } from './order/order-customers.loader';
import { createOrderFulfillmentsLoader } from './order/order-fulfillments.loader';
import { createOrderLineLoader } from './order/order-lines.loader';
import { createOrderPaymentsLoader } from './order/order-payments.loader';
import { createOrderLineVariantsLoader } from './order-line/variants.loader';
import { createProductAssetsLoader } from './product/product-asset.loader';
import { createProductCustomFieldTranslationsLoader } from './product/product-custom-field-translations.loader';
import { createProductCustomFieldsLoader } from './product/product-custom-fields.loader';
import { createProductOptionsLoader } from './product/product-options.loader';
import { createProductTagsLoader } from './product/product-tags.loader';
import { createProductTranslationsLoader } from './product/product-translations.loader';
import { createStateCountryLoader } from './state/state-country.loader';
import { createVariantAssetsLoader } from './variant/variant-assets.loader';
import { createVariantOptionValuesLoader } from './variant/variant-option-values.loader';
import { createVariantProductLoader } from './variant/variant-product.loader';
import { createVariantsLoader } from './variant/variants.loader';
import { createZoneShippingMethodsLoader } from './zone/zone-shipping-methods.loader';
import { createZoneStatesLoader } from './zone/zone-states.loader';

// TODO: standardize object keys (all plural or all singular)
export const buildLoaders = (trx: Transaction, locale: Locale | null | undefined) => {
  return {
    product: {
      localization: createProductLocalizationLoader(trx, locale),
      translation: createProductTranslationsLoader(trx),
      assets: createProductAssetsLoader(trx),
      tags: createProductTagsLoader(trx),
      variants: createVariantsLoader(trx),
      options: createProductOptionsLoader(trx),
      customFields: createProductCustomFieldsLoader(trx),
      customFieldTranslations: createProductCustomFieldTranslationsLoader(trx)
    },
    variant: {
      assets: createVariantAssetsLoader(trx),
      optionValues: createVariantOptionValuesLoader(trx),
      product: createVariantProductLoader(trx)
    },
    option: {
      localization: createOptionLocalizationLoader(trx, locale),
      values: createOptionValuesLoader(trx),
      translations: createOptionTranslationsLoader(trx)
    },
    optionValues: {
      localization: createOptionValueLocalizationLoader(trx, locale),
      translations: createOptionValuesTranslationsLoader(trx),
      preset: createOptionValuePresetLoader(trx)
    },
    collections: {
      assets: createCollectionAssetsLoader(trx),
      products: createCollectionProductsLoader(trx),
      subCollections: createCollectionSubCollectionsLoader(trx),
      translations: createCollectionTranslationsLoader(trx),
      customFields: createCollectionCustomFieldsLoader(trx),
      customFieldTranslations: createCollectionCustomFieldTranslationsLoader(trx)
    },
    order: {
      lines: createOrderLineLoader(trx),
      customers: createOrderCustomersLoader(trx),
      fulfillment: createOrderFulfillmentsLoader(trx),
      payments: createOrderPaymentsLoader(trx),
      cancellation: createOrderCancellationLoader(trx)
    },
    orderLine: {
      variant: createOrderLineVariantsLoader(trx)
    },
    fulfillment: {
      details: createFulfillmentDetailsLoader(trx),
      shippingMethod: createFulfillmentShippingMethodLoader(trx),
      location: createFulfillmentLocationLoader(trx)
    },
    zone: {
      states: createZoneStatesLoader(trx),
      shippingMethods: createZoneShippingMethodsLoader(trx)
    },
    country: {
      states: createCountryStatesLoader(trx)
    },
    state: {
      country: createStateCountryLoader(trx)
    },
    location: {
      country: createLocationCountryLoader(trx),
      state: createLocationStateLoader(trx),
      inStorePickup: createLocationInStorePickupLoader(trx)
    },
    optionPreset: {
      optionValues: createOptionValuePresetsLoader(trx)
    },
    address: {
      country: createAddressCountryLoader(trx),
      state: createAddressStateLoader(trx)
    },
    customer: {
      orders: createCustomerOrdersLoader(trx),
      totalSpent: createCustomerTotalSpentLoader(trx)
    }
  };
};

export type Loaders = ReturnType<typeof buildLoaders>;
