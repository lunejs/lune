import { Tables } from '@/persistence/tables';

import { DefaultAddressFixture } from './address.fixture';
import { DefaultAssetFixture } from './asset.fixture';
import { DefaultCollectionFixture } from './collection.fixture';
import { DefaultCollectionAssetFixture } from './collection-asset.fixture';
import { DefaultCollectionCustomFieldFixture } from './collection-custom-field.fixture';
import { DefaultCollectionCustomFieldTranslationFixture } from './collection-custom-field-translation.fixture';
import { DefaultCollectionProductFixture } from './collection-product.fixture';
import { DefaultCollectionTranslationFixture } from './collection-translation.fixture';
import { DefaultCountryFixture } from './country.fixture';
import { DefaultCustomFieldDefinitionFixture } from './custom-field-definition.fixture';
import { DefaultCustomObjectDefinitionFixture } from './custom-object-definition.fixture';
import { DefaultCustomObjectEntryFixture } from './custom-object-entry.fixture';
import { DefaultCustomObjectEntryValueFixture } from './custom-object-entry-value.fixture';
import { DefaultCustomObjectEntryValueTranslationFixture } from './custom-object-entry-value-translation.fixture';
import { DefaultCustomerFixture } from './customer.fixture';
import { DefaultCustomerAuthMethodFixture } from './customer-auth-method.fixture';
import { DefaultDeliveryMethodFixture } from './delivery-method.fixture';
import { DefaultDeliveryMethodPickupFixture } from './delivery-method-pickup.fixture';
import { DefaultDeliveryMethodShippingFixture } from './delivery-method-shipping.fixture';
import { DefaultDiscountFixture } from './discount.fixture';
import { DefaultFulfillmentFixture } from './fulfillment.fixture';
import { DefaultFulfillmentLineFixture } from './fulfillment-line.fixture';
import { DefaultInStorePickupFixture } from './in-store-pickup.fixture';
import { DefaultLocationFixture } from './location.fixture';
import { DefaultOptionFixture } from './option.fixture';
import { DefaultOptionTranslationFixture } from './option-translation.fixture';
import { DefaultOptionValueFixture } from './option-value.fixture';
import { DefaultOptionValueTranslationFixture } from './option-value-translation.fixture';
import { DefaultOrderFixture } from './order.fixture';
import { DefaultOrderCancellationFixture } from './order-cancellation.fixture';
import { DefaultOrderDiscountFixture } from './order-discount.fixture';
import { DefaultOrderLineFixture } from './order-line.fixture';
import { DefaultPaymentFixture } from './payment.fixture';
import { DefaultPaymentCancellationFixture } from './payment-cancellation.fixture';
import { DefaultPaymentFailureFixture } from './payment-failure.fixture';
import { DefaultPaymentMethodFixture } from './payment-method.fixture';
import { DefaultPaymentRejectionFixture } from './payment-rejection.fixture';
import { DefaultProductFixture } from './product.fixture';
import { DefaultProductAssetFixture } from './product-asset.fixture';
import { DefaultProductCustomFieldFixture } from './product-custom-field.fixture';
import { DefaultProductCustomFieldTranslationFixture } from './product-custom-field-translation.fixture';
import { DefaultProductTagFixture } from './product-tag.fixture';
import { DefaultProductTranslationFixture } from './product-translation.fixture';
import { DefaultShippingMethodFixture } from './shipping-method.fixture';
import { DefaultShopFixture } from './shop.fixture';
import { DefaultShopMemberFixture } from './shop-member.fixture';
import { DefaultStateFixture } from './state.fixture';
import { DefaultTagFixture } from './tag.fixture';
import { DefaultUserFixture } from './user.fixture';
import { DefaultVariantFixture } from './variant.fixture';
import { DefaultVariantAssetFixture } from './variant-asset.fixture';
import { DefaultVariantOptionValueFixture } from './variant-option-value.fixture';
import { DefaultZoneFixture } from './zone.fixture';
import { DefaultZoneStateFixture } from './zone-state.fixture';

export const FixtureDefaults: Record<Tables, () => unknown> = {
  [Tables.Users]: DefaultUserFixture,
  [Tables.Shop]: DefaultShopFixture,
  [Tables.Product]: DefaultProductFixture,
  [Tables.Tag]: DefaultTagFixture,
  [Tables.ProductTag]: DefaultProductTagFixture,
  [Tables.Variant]: DefaultVariantFixture,
  [Tables.Option]: DefaultOptionFixture,
  [Tables.OptionValue]: DefaultOptionValueFixture,
  [Tables.VariantOptionValue]: DefaultVariantOptionValueFixture,
  [Tables.Asset]: DefaultAssetFixture,
  [Tables.ProductAsset]: DefaultProductAssetFixture,
  [Tables.ProductTranslation]: DefaultProductTranslationFixture,
  [Tables.VariantAsset]: DefaultVariantAssetFixture,
  [Tables.OptionTranslation]: DefaultOptionTranslationFixture,
  [Tables.OptionValueTranslation]: DefaultOptionValueTranslationFixture,
  [Tables.Collection]: DefaultCollectionFixture,
  [Tables.CollectionTranslation]: DefaultCollectionTranslationFixture,
  [Tables.CollectionProduct]: DefaultCollectionProductFixture,
  [Tables.CollectionAsset]: DefaultCollectionAssetFixture,
  [Tables.CollectionCustomField]: DefaultCollectionCustomFieldFixture,
  [Tables.CollectionCustomFieldTranslation]: DefaultCollectionCustomFieldTranslationFixture,
  [Tables.Customer]: DefaultCustomerFixture,
  [Tables.CustomerAuthMethod]: DefaultCustomerAuthMethodFixture,
  [Tables.Country]: DefaultCountryFixture,
  [Tables.State]: DefaultStateFixture,
  [Tables.Address]: DefaultAddressFixture,
  [Tables.Order]: DefaultOrderFixture,
  [Tables.PaymentMethod]: DefaultPaymentMethodFixture,
  [Tables.Payment]: DefaultPaymentFixture,
  [Tables.PaymentFailure]: DefaultPaymentFailureFixture,
  [Tables.PaymentRejection]: DefaultPaymentRejectionFixture,
  [Tables.PaymentCancellation]: DefaultPaymentCancellationFixture,
  [Tables.OrderCancellation]: DefaultOrderCancellationFixture,
  [Tables.OrderLine]: DefaultOrderLineFixture,
  [Tables.DeliveryMethod]: DefaultDeliveryMethodFixture,
  [Tables.Location]: DefaultLocationFixture,
  [Tables.InStorePickup]: DefaultInStorePickupFixture,
  [Tables.DeliveryMethodShipping]: DefaultDeliveryMethodShippingFixture,
  [Tables.DeliveryMethodPickup]: DefaultDeliveryMethodPickupFixture,
  [Tables.Zone]: DefaultZoneFixture,
  [Tables.ZoneState]: DefaultZoneStateFixture,
  [Tables.ShippingMethod]: DefaultShippingMethodFixture,
  [Tables.Discount]: DefaultDiscountFixture,
  [Tables.OrderDiscount]: DefaultOrderDiscountFixture,
  [Tables.CustomFieldDefinition]: DefaultCustomFieldDefinitionFixture,
  [Tables.CustomObjectDefinition]: DefaultCustomObjectDefinitionFixture,
  [Tables.CustomObjectEntry]: DefaultCustomObjectEntryFixture,
  [Tables.CustomObjectEntryValue]: DefaultCustomObjectEntryValueFixture,
  [Tables.CustomObjectEntryValueTranslation]: DefaultCustomObjectEntryValueTranslationFixture,
  [Tables.ProductCustomField]: DefaultProductCustomFieldFixture,
  [Tables.ProductCustomFieldTranslation]: DefaultProductCustomFieldTranslationFixture,
  [Tables.Fulfillment]: DefaultFulfillmentFixture,
  [Tables.FulfillmentLine]: DefaultFulfillmentLineFixture,
  [Tables.ShopMember]: DefaultShopMemberFixture
};
