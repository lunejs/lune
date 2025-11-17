/* eslint-disable */
import type { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends Record<string, unknown>> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends Record<string, unknown>, K extends keyof T> = Partial<
  Record<K, never>
>;
export type Incremental<T> =
  | T
  | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string };
  String: { input: string; output: string };
  Boolean: { input: boolean; output: boolean };
  Int: { input: number; output: number };
  Float: { input: number; output: number };
  Date: { input: any; output: any };
  JSON: { input: any; output: any };
};

export type AddProductTranslationInput = {
  description?: InputMaybe<Scalars['String']['input']>;
  locale: Locale;
  name?: InputMaybe<Scalars['String']['input']>;
  optionValues?: InputMaybe<OptionValueTranslationInput[]>;
  options?: InputMaybe<OptionTranslationInput[]>;
};

/** A customer's saved address for shipping */
export type Address = {
  /** Address's city */
  city: Scalars['String']['output'];
  /** Address's country */
  country: Country;
  createdAt: Scalars['Date']['output'];
  /** Full name of the recipient */
  fullName: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  /** Whether this is the default address for the customer */
  isDefault: Scalars['Boolean']['output'];
  /** Phone number for delivery */
  phoneNumber: Scalars['String']['output'];
  /** Postal/ZIP code */
  postalCode: Scalars['String']['output'];
  /** Additional delivery references or instructions */
  references?: Maybe<Scalars['String']['output']>;
  /** Address's state/province/region */
  state: State;
  /** Street address line 1 */
  streetLine1: Scalars['String']['output'];
  /** Street address line 2 (apartment, suite, etc.) */
  streetLine2?: Maybe<Scalars['String']['output']>;
  updatedAt: Scalars['Date']['output'];
};

export type Asset = Node & {
  createdAt: Scalars['Date']['output'];
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
  order: Scalars['Int']['output'];
  source: Scalars['String']['output'];
  type: AssetType;
  updatedAt: Scalars['Date']['output'];
};

export type AssetInEntity = {
  id: Scalars['ID']['input'];
  order: Scalars['Int']['input'];
};

export type AssetInVariantInput = {
  id: Scalars['ID']['input'];
  order: Scalars['Int']['input'];
};

export type AssetList = List & {
  count: Scalars['Int']['output'];
  items: Asset[];
  pageInfo: PageInfo;
};

export enum AssetType {
  Image = 'IMAGE',
  Pdf = 'PDF'
}

export type BooleanFilter = {
  /** Filter by exact match */
  equals?: InputMaybe<Scalars['Boolean']['input']>;
};

/** A collection is a group of products that are displayed together in the storefront. */
export type Collection = Node & {
  assets: AssetList;
  /** The collection's content type indicating if the collection contains products or other collections */
  contentType: CollectionContentType;
  createdAt: Scalars['Date']['output'];
  /** The collection's description */
  description?: Maybe<Scalars['String']['output']>;
  /**
   * Whether the collection is enabled or not.
   * Not enabled collections are not exposed to the storefront API but are visible in the admin ui.
   * Useful for collections that are not published by now but they planned to be published in the future.
   */
  enabled: Scalars['Boolean']['output'];
  id: Scalars['ID']['output'];
  /** The collection's name */
  name: Scalars['String']['output'];
  order: Scalars['Int']['output'];
  parentCollection?: Maybe<Collection>;
  products: ProductList;
  /** The collection's slug used in the URL */
  slug: Scalars['String']['output'];
  subCollections: CollectionList;
  translations: CollectionTranslation[];
  updatedAt: Scalars['Date']['output'];
};

/** A collection is a group of products that are displayed together in the storefront. */
export type CollectionAssetsArgs = {
  input?: InputMaybe<ListInput>;
};

/** A collection is a group of products that are displayed together in the storefront. */
export type CollectionProductsArgs = {
  input?: InputMaybe<ProductListInput>;
};

/** A collection is a group of products that are displayed together in the storefront. */
export type CollectionSubCollectionsArgs = {
  input?: InputMaybe<CollectionListInput>;
};

export enum CollectionContentType {
  Collections = 'COLLECTIONS',
  Products = 'PRODUCTS'
}

export type CollectionFilters = {
  contentType?: InputMaybe<CollectionContentType>;
  enabled?: InputMaybe<BooleanFilter>;
  isTopLevel?: InputMaybe<BooleanFilter>;
  name?: InputMaybe<StringFilter>;
};

export type CollectionList = List & {
  count: Scalars['Int']['output'];
  items: Collection[];
  pageInfo: PageInfo;
};

export type CollectionListInput = {
  /** Filters to apply */
  filters?: InputMaybe<CollectionFilters>;
  /** Skip the first n results */
  skip?: InputMaybe<Scalars['Int']['input']>;
  /** takes n result from where the skip position is */
  take?: InputMaybe<Scalars['Int']['input']>;
};

export type CollectionTranslation = {
  createdAt: Scalars['Date']['output'];
  description?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  locale: Locale;
  name?: Maybe<Scalars['String']['output']>;
  slug?: Maybe<Scalars['String']['output']>;
  updatedAt: Scalars['Date']['output'];
};

export type CollectionTranslationInput = {
  description?: InputMaybe<Scalars['String']['input']>;
  locale: Locale;
  name?: InputMaybe<Scalars['String']['input']>;
};

/**
 * A country is a representation of a country in the world.
 * Indicating where shops can deliver their products
 */
export type Country = {
  /** The country's ISO 3166-1 alpha-2 code (e.g., 'MX', 'US', 'CA') */
  code: Scalars['String']['output'];
  createdAt: Scalars['Date']['output'];
  id: Scalars['ID']['output'];
  /** The country's name */
  name: Scalars['String']['output'];
  /** The country states */
  states: State[];
  updatedAt: Scalars['Date']['output'];
};

export type CreateCollectionInput = {
  assets?: InputMaybe<AssetInEntity[]>;
  contentType?: InputMaybe<CollectionContentType>;
  description?: InputMaybe<Scalars['String']['input']>;
  enabled?: InputMaybe<Scalars['Boolean']['input']>;
  name: Scalars['String']['input'];
  order?: InputMaybe<Scalars['Int']['input']>;
  products?: InputMaybe<Scalars['ID']['input'][]>;
  subCollections?: InputMaybe<Scalars['ID']['input'][]>;
};

export type CreateLocationInput = {
  city: Scalars['String']['input'];
  countryId: Scalars['ID']['input'];
  enabled?: InputMaybe<Scalars['Boolean']['input']>;
  name: Scalars['String']['input'];
  phoneNumber: Scalars['String']['input'];
  postalCode: Scalars['String']['input'];
  references?: InputMaybe<Scalars['String']['input']>;
  stateId: Scalars['ID']['input'];
  streetLine1: Scalars['String']['input'];
  streetLine2?: InputMaybe<Scalars['String']['input']>;
};

export type CreateOptionInput = {
  name: Scalars['String']['input'];
  order: Scalars['Int']['input'];
  values: CreateOptionValueInput[];
};

export type CreateOptionValueInput = {
  name: Scalars['String']['input'];
  order: Scalars['Int']['input'];
};

export type CreateProductInput = {
  assets?: InputMaybe<AssetInEntity[]>;
  description?: InputMaybe<Scalars['String']['input']>;
  enabled?: InputMaybe<Scalars['Boolean']['input']>;
  name: Scalars['String']['input'];
  tags?: InputMaybe<Scalars['ID']['input'][]>;
};

export type CreateShippingMethodInput = {
  enabled?: InputMaybe<Scalars['Boolean']['input']>;
  handler: HandlerConfigInput;
  name: Scalars['String']['input'];
  zoneId: Scalars['ID']['input'];
};

export type CreateShopInput = {
  email: Scalars['String']['input'];
  logo?: InputMaybe<Scalars['String']['input']>;
  name: Scalars['String']['input'];
  phoneNumber: Scalars['String']['input'];
  socials?: InputMaybe<ShopSocialsInput>;
  storefrontUrl?: InputMaybe<Scalars['String']['input']>;
};

export type CreateTagInput = {
  name: Scalars['String']['input'];
};

export type CreateTagsResult = {
  apiErrors: TagErrorResult[];
  tags: Tag[];
};

export type CreateUserInput = {
  email: Scalars['String']['input'];
  password: Scalars['String']['input'];
};

export type CreateVariantInput = {
  assets?: InputMaybe<AssetInEntity[]>;
  comparisonPrice?: InputMaybe<Scalars['Float']['input']>;
  costPerUnit?: InputMaybe<Scalars['Float']['input']>;
  dimensions?: InputMaybe<DimensionsInput>;
  optionValues?: InputMaybe<Scalars['ID']['input'][]>;
  requiresShipping?: InputMaybe<Scalars['Boolean']['input']>;
  salePrice: Scalars['Float']['input'];
  sku?: InputMaybe<Scalars['String']['input']>;
  stock?: InputMaybe<Scalars['Int']['input']>;
  weight?: InputMaybe<Scalars['Float']['input']>;
};

export type CreateZoneInput = {
  name: Scalars['String']['input'];
  stateIds?: InputMaybe<Scalars['ID']['input'][]>;
};

/** A customer is a person who interacts with the shop, whether browsing, purchasing, or managing their profile */
export type Customer = {
  createdAt: Scalars['Date']['output'];
  /** The customer's email address. Used to identify the customer in orders and admin */
  email: Scalars['String']['output'];
  /** Whether the customer is enabled. Disabled customers cannot login or place orders */
  enabled: Scalars['Boolean']['output'];
  /** The customer's first name */
  firstName?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  /** The customer's last name */
  lastName?: Maybe<Scalars['String']['output']>;
  /** The customer's phone number */
  phoneNumber?: Maybe<Scalars['String']['output']>;
  updatedAt: Scalars['Date']['output'];
};

export type Dimensions = {
  height?: Maybe<Scalars['Float']['output']>;
  length?: Maybe<Scalars['Float']['output']>;
  width?: Maybe<Scalars['Float']['output']>;
};

export type DimensionsInput = {
  height?: InputMaybe<Scalars['Float']['input']>;
  length?: InputMaybe<Scalars['Float']['input']>;
  width?: InputMaybe<Scalars['Float']['input']>;
};

/** A fulfillment represents how an order will be delivered to the customer */
export type Fulfillment = Node & {
  /** Total amount for this fulfillment (e.g., shipping cost) */
  amount: Scalars['Int']['output'];
  createdAt: Scalars['Date']['output'];
  /** Union type which could be Shipping or InStorePickup */
  details: FulfillmentDetails;
  id: Scalars['ID']['output'];
  /** Type of fulfillment (shipping or in-store pickup) */
  type: FulfillmentType;
  updatedAt: Scalars['Date']['output'];
};

/** Union type for fulfillment details - can be either shipping or in-store pickup */
export type FulfillmentDetails = InStorePickupFulfillment | ShippingFulfillment;

/** Fulfillment type enum */
export enum FulfillmentType {
  /** Customer will pick up the product at a physical store location */
  InStorePickup = 'IN_STORE_PICKUP',
  /** Product will be shipped to the customer's address */
  Shipping = 'SHIPPING'
}

export type GenerateUserAccessTokenInput = {
  email: Scalars['String']['input'];
  password: Scalars['String']['input'];
};

export type HandlerConfig = {
  args: Scalars['JSON']['output'];
  code: Scalars['String']['output'];
};

export type HandlerConfigInput = {
  args: Scalars['JSON']['input'];
  code: Scalars['String']['input'];
};

/** Represents in-store pickup fulfillment configuration for a location */
export type InStorePickup = Node & {
  createdAt: Scalars['Date']['output'];
  id: Scalars['ID']['output'];
  /** Special instructions for in-store pickup at this location */
  instructions: Scalars['String']['output'];
  /** Whether in-store pickup is available at this location */
  isAvailable: Scalars['Boolean']['output'];
  updatedAt: Scalars['Date']['output'];
};

/** Represents in-store pickup fulfillment details for an order */
export type InStorePickupFulfillment = {
  /** Address information stored as JSON */
  address: Scalars['JSON']['output'];
  createdAt: Scalars['Date']['output'];
  id: Scalars['ID']['output'];
  /** The location where the pickup will take place */
  location: Location;
  /** Date and time when the order was picked up */
  pickedUpAt: Scalars['Date']['output'];
  /** Date and time when the order is ready for pickup */
  readyAt: Scalars['Date']['output'];
  updatedAt: Scalars['Date']['output'];
};

/** A list of items with count, each result that expose a array of items should implement this interface */
export type List = {
  count: Scalars['Int']['output'];
  items: Node[];
  pageInfo: PageInfo;
};

export type ListInput = {
  /** Skip the first n results */
  skip?: InputMaybe<Scalars['Int']['input']>;
  /** takes n result from where the skip position is */
  take?: InputMaybe<Scalars['Int']['input']>;
};

export enum Locale {
  En = 'en',
  Es = 'es',
  Fr = 'fr'
}

/** A physical location where customers can pick up their orders */
export type Location = {
  /** Location's city */
  city: Scalars['String']['output'];
  /** Address's country */
  country: Country;
  createdAt: Scalars['Date']['output'];
  /**
   * Whether this location is enabled or not
   * This is used to show/hide location in the storefront
   */
  enabled: Scalars['Boolean']['output'];
  id: Scalars['ID']['output'];
  /** In store pickup preferences */
  inStorePickup: InStorePickup;
  /** Name of the location */
  name: Scalars['String']['output'];
  /** Location's phone number */
  phoneNumber: Scalars['String']['output'];
  /** Postal/ZIP code */
  postalCode: Scalars['String']['output'];
  /** Additional references or instructions for finding the location */
  references?: Maybe<Scalars['String']['output']>;
  /** Address's state/province/region */
  state: State;
  /** Street address line 1 */
  streetLine1: Scalars['String']['output'];
  /** Street address line 2 (optional) */
  streetLine2?: Maybe<Scalars['String']['output']>;
  updatedAt: Scalars['Date']['output'];
};

export enum LocationErrorCode {
  LocationNameAlreadyExists = 'LOCATION_NAME_ALREADY_EXISTS'
}

export type LocationErrorResult = {
  code: LocationErrorCode;
  message: Scalars['String']['output'];
};

export type LocationList = {
  count: Scalars['Int']['output'];
  items: Location[];
  pageInfo: PageInfo;
};

export type LocationResult = {
  apiErrors: LocationErrorResult[];
  location?: Maybe<Location>;
};

export type Mutation = {
  addCollectionTranslation: CollectionTranslation;
  addProductTranslation: ProductTranslation;
  createCollection: Collection;
  createLocation: LocationResult;
  createOption: Option[];
  createProduct: Product;
  createShippingMethod: ShippingMethodResult;
  /** Create a new shop */
  createShop: ShopResult;
  createTags: CreateTagsResult;
  /** Create a new user */
  createUser: UserResult;
  createVariant: Maybe<Variant>[];
  createZone: Zone;
  /**
   * Generate an access token for a user
   * This token can be used to access user-specific resources
   */
  generateUserAccessToken: UserAccessTokenResult;
  removeCollections: Scalars['Boolean']['output'];
  removeLocation: Scalars['Boolean']['output'];
  removeShippingMethod: Scalars['Boolean']['output'];
  removeTags: Scalars['Boolean']['output'];
  removeZone: Scalars['Boolean']['output'];
  softRemoveOption: Option;
  softRemoveOptionValues: Scalars['Boolean']['output'];
  softRemoveProducts: Scalars['Boolean']['output'];
  softRemoveVariant: Variant;
  updateCollection: Collection;
  updateInStorePickupPreferences: InStorePickup;
  updateLocation: LocationResult;
  updateOption: Option;
  updateProduct: Product;
  updateShippingMethod: ShippingMethod;
  /** Update an existing shop details */
  updateShop: ShopResult;
  updateTag: TagResult;
  /** Update an existing user */
  updateUser: UserResult;
  updateVariant: Variant;
  updateZone: Zone;
};

export type MutationAddCollectionTranslationArgs = {
  id: Scalars['ID']['input'];
  input: CollectionTranslationInput;
};

export type MutationAddProductTranslationArgs = {
  id: Scalars['ID']['input'];
  input: AddProductTranslationInput;
};

export type MutationCreateCollectionArgs = {
  input: CreateCollectionInput;
};

export type MutationCreateLocationArgs = {
  input: CreateLocationInput;
};

export type MutationCreateOptionArgs = {
  input: CreateOptionInput[];
  productId: Scalars['ID']['input'];
};

export type MutationCreateProductArgs = {
  input: CreateProductInput;
};

export type MutationCreateShippingMethodArgs = {
  input: CreateShippingMethodInput;
};

export type MutationCreateShopArgs = {
  input: CreateShopInput;
};

export type MutationCreateTagsArgs = {
  input: CreateTagInput[];
};

export type MutationCreateUserArgs = {
  input: CreateUserInput;
};

export type MutationCreateVariantArgs = {
  input: CreateVariantInput[];
  productId: Scalars['ID']['input'];
};

export type MutationCreateZoneArgs = {
  input: CreateZoneInput;
};

export type MutationGenerateUserAccessTokenArgs = {
  input: GenerateUserAccessTokenInput;
};

export type MutationRemoveCollectionsArgs = {
  ids: Scalars['ID']['input'][];
};

export type MutationRemoveLocationArgs = {
  id: Scalars['ID']['input'];
};

export type MutationRemoveShippingMethodArgs = {
  id: Scalars['ID']['input'];
};

export type MutationRemoveTagsArgs = {
  ids: Scalars['ID']['input'][];
};

export type MutationRemoveZoneArgs = {
  id: Scalars['ID']['input'];
};

export type MutationSoftRemoveOptionArgs = {
  id: Scalars['ID']['input'];
};

export type MutationSoftRemoveOptionValuesArgs = {
  ids: Scalars['ID']['input'][];
};

export type MutationSoftRemoveProductsArgs = {
  ids: Scalars['ID']['input'][];
};

export type MutationSoftRemoveVariantArgs = {
  id: Scalars['ID']['input'];
};

export type MutationUpdateCollectionArgs = {
  id: Scalars['ID']['input'];
  input: UpdateCollectionInput;
};

export type MutationUpdateInStorePickupPreferencesArgs = {
  input: UpdateInStorePickupPreferencesInput;
  locationId: Scalars['ID']['input'];
};

export type MutationUpdateLocationArgs = {
  id: Scalars['ID']['input'];
  input: UpdateLocationInput;
};

export type MutationUpdateOptionArgs = {
  id: Scalars['ID']['input'];
  input: UpdateOptionInput;
};

export type MutationUpdateProductArgs = {
  id: Scalars['ID']['input'];
  input: UpdateProductInput;
};

export type MutationUpdateShippingMethodArgs = {
  id: Scalars['ID']['input'];
  input: UpdateShippingMethodInput;
};

export type MutationUpdateShopArgs = {
  input: UpdateShopInput;
  shopSlug: Scalars['String']['input'];
};

export type MutationUpdateTagArgs = {
  id: Scalars['ID']['input'];
  input: UpdateTagInput;
};

export type MutationUpdateUserArgs = {
  id: Scalars['ID']['input'];
  input: UpdateUserInput;
};

export type MutationUpdateVariantArgs = {
  id: Scalars['ID']['input'];
  input: UpdateVariantInput;
};

export type MutationUpdateZoneArgs = {
  id: Scalars['ID']['input'];
  input: UpdateZoneInput;
};

/** A node, each type that represents a entity should implement this interface */
export type Node = {
  createdAt: Scalars['Date']['output'];
  id: Scalars['ID']['output'];
  updatedAt: Scalars['Date']['output'];
};

export type Option = Node & {
  createdAt: Scalars['Date']['output'];
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
  order: Scalars['Int']['output'];
  translations: OptionTranslation[];
  updatedAt: Scalars['Date']['output'];
  values: OptionValue[];
};

export type OptionList = List & {
  count: Scalars['Int']['output'];
  items: Option[];
  pageInfo: PageInfo;
};

export type OptionTranslation = {
  createdAt: Scalars['Date']['output'];
  id: Scalars['ID']['output'];
  locale: Locale;
  name?: Maybe<Scalars['String']['output']>;
  updatedAt: Scalars['Date']['output'];
};

export type OptionTranslationInput = {
  id: Scalars['ID']['input'];
  name?: InputMaybe<Scalars['String']['input']>;
};

export type OptionValue = Node & {
  createdAt: Scalars['Date']['output'];
  id: Scalars['ID']['output'];
  metadata?: Maybe<OptionValueMetadata>;
  name: Scalars['String']['output'];
  option: Option;
  order: Scalars['Int']['output'];
  translations: OptionValueTranslation[];
  updatedAt: Scalars['Date']['output'];
};

export type OptionValueMetadata = {
  color?: Maybe<Scalars['String']['output']>;
};

export type OptionValueMetadataInput = {
  color?: InputMaybe<Scalars['String']['input']>;
};

export type OptionValueTranslation = {
  createdAt: Scalars['Date']['output'];
  id: Scalars['ID']['output'];
  locale: Locale;
  name?: Maybe<Scalars['String']['output']>;
  updatedAt: Scalars['Date']['output'];
};

export type OptionValueTranslationInput = {
  id: Scalars['ID']['input'];
  name?: InputMaybe<Scalars['String']['input']>;
};

/** An order represents a customer's purchase, including line items, shipping, and payment information */
export type Order = Node & {
  /** Unique order code generated after order is placed */
  code?: Maybe<Scalars['String']['output']>;
  /** The date and time when the order has been marked as completed (delivered and paid) */
  completedAt?: Maybe<Scalars['Date']['output']>;
  createdAt: Scalars['Date']['output'];
  /** Customer who placed the order. Nullable for guest orders */
  customer?: Maybe<Customer>;
  /** Order's fulfillment */
  fulfillment?: Maybe<Fulfillment>;
  id: Scalars['ID']['output'];
  /** Order lines for the order */
  lines: OrderLineList;
  payments: Payment[];
  /** The date and time when the order has been marked as placed */
  placedAt?: Maybe<Scalars['Date']['output']>;
  /** Shipping address where the order has to be delivered */
  shippingAddress?: Maybe<OrderAddressJson>;
  /** Current state of the order */
  state: OrderState;
  /** Order lines total less discounts */
  subtotal: Scalars['Int']['output'];
  /** The price that will be sent to the payment provider. subtotal + shipping price */
  total: Scalars['Int']['output'];
  /** Total quantity of items across all order lines */
  totalQuantity: Scalars['Int']['output'];
  updatedAt: Scalars['Date']['output'];
};

export type OrderAddressJson = {
  /** Address's city */
  city: Scalars['String']['output'];
  /** Address's country */
  country: Scalars['String']['output'];
  /** Address's country code */
  countryCode: Scalars['String']['output'];
  /** Full name of the recipient */
  fullName: Scalars['String']['output'];
  /** Phone number for delivery */
  phoneNumber: Scalars['String']['output'];
  /** Postal/ZIP code */
  postalCode: Scalars['String']['output'];
  /** Additional delivery references or instructions */
  references?: Maybe<Scalars['String']['output']>;
  /** Address's state/province/region */
  state: Scalars['String']['output'];
  /** Address's state/province/region code */
  stateCode: Scalars['String']['output'];
  /** Street address line 1 */
  streetLine1: Scalars['String']['output'];
  /** Street address line 2 (apartment, suite, etc.) */
  streetLine2?: Maybe<Scalars['String']['output']>;
};

export enum OrderBy {
  Asc = 'ASC',
  Desc = 'DESC'
}

/** An order cancellation records when an order is canceled */
export type OrderCancellation = Node & {
  createdAt: Scalars['Date']['output'];
  id: Scalars['ID']['output'];
  /** The order that was canceled */
  order: Order;
  /** The reason why the order was canceled */
  reason: Scalars['String']['output'];
  updatedAt: Scalars['Date']['output'];
};

/** An order line represents a single item in an order */
export type OrderLine = Node & {
  createdAt: Scalars['Date']['output'];
  id: Scalars['ID']['output'];
  /** The line subtotal (unitPrice * quantity before adjustments) */
  lineSubtotal: Scalars['Int']['output'];
  /** The final line total after all adjustments */
  lineTotal: Scalars['Int']['output'];
  /** The line quantity */
  quantity: Scalars['Int']['output'];
  /** The price per unit at the time of purchase */
  unitPrice: Scalars['Int']['output'];
  updatedAt: Scalars['Date']['output'];
  /** The product variant being ordered */
  variant: Variant;
};

export type OrderLineList = List & {
  count: Scalars['Int']['output'];
  items: OrderLine[];
  pageInfo: PageInfo;
};

/** Order state enum */
export enum OrderState {
  /** Order has been cancelled */
  Canceled = 'CANCELED',
  /** Order is completed (delivered and fully paid) */
  Completed = 'COMPLETED',
  /** Order has been delivered to the customer */
  Delivered = 'DELIVERED',
  /** The order is being modified by the customer */
  Modifying = 'MODIFYING',
  /** A payment has been added to the order and cannot be modified anymore */
  Placed = 'PLACED',
  /** Order is being processed for shipment */
  Processing = 'PROCESSING',
  /** Order is ready for pick up at the location chosen by the customer */
  ReadyForPickup = 'READY_FOR_PICKUP',
  /** Order has been shipped via the carrier */
  Shipped = 'SHIPPED'
}

export type PageInfo = {
  total: Scalars['Int']['output'];
};

/** A payment is a transaction between a customer and a shop, is assigned to an order */
export type Payment = Node & {
  /** The total amount of the payment */
  amount: Scalars['Int']['output'];
  createdAt: Scalars['Date']['output'];
  /** Union type which will store details of the payment depending on the state */
  details?: Maybe<PaymentDetails>;
  id: Scalars['ID']['output'];
  /** The payment method used (e.g., 'stripe', 'paypal') */
  method: Scalars['String']['output'];
  /** Payment method used for this payment */
  paymentMethod: PaymentMethod;
  /** Payment's state */
  state: PaymentState;
  /** The transaction ID from the payment provider (nullable if not processed yet) */
  transactionId?: Maybe<Scalars['String']['output']>;
  updatedAt: Scalars['Date']['output'];
};

/** A payment cancellation records when a payment is canceled (voided) */
export type PaymentCancellation = Node & {
  createdAt: Scalars['Date']['output'];
  id: Scalars['ID']['output'];
  /** The payment that was canceled */
  payment: Payment;
  /** The reason why the payment was canceled */
  reason: Scalars['String']['output'];
  updatedAt: Scalars['Date']['output'];
};

export type PaymentDetails = PaymentCancellation | PaymentFailure | PaymentRejection;

/** A payment failure records the reason why a payment attempt failed */
export type PaymentFailure = Node & {
  createdAt: Scalars['Date']['output'];
  id: Scalars['ID']['output'];
  /** The payment that failed */
  payment: Payment;
  /** The reason why the payment failed */
  reason: Scalars['String']['output'];
  updatedAt: Scalars['Date']['output'];
};

/** A payment method is a way to pay for an order in your shop, like credit card, PayPal, etc. */
export type PaymentMethod = Node & {
  createdAt: Scalars['Date']['output'];
  /** Whether the payment method is enabled. Disabled methods won't be shown in the storefront */
  enabled: Scalars['Boolean']['output'];
  /**
   * Specific data for the payment handler chosen.
   * Usually stores payment integration keys and the handler code
   */
  handler: Scalars['JSON']['output'];
  id: Scalars['ID']['output'];
  /** Payment method's name */
  name: Scalars['String']['output'];
  updatedAt: Scalars['Date']['output'];
};

/** A payment rejection records when an admin manually rejects a payment (typically for bank transfers or submitted proofs) */
export type PaymentRejection = Node & {
  createdAt: Scalars['Date']['output'];
  id: Scalars['ID']['output'];
  /** The payment that was rejected */
  payment: Payment;
  /** The reason why the payment was rejected */
  reason: Scalars['String']['output'];
  updatedAt: Scalars['Date']['output'];
};

/** Payment state enum */
export enum PaymentState {
  /** Funds are reserved in the customer's account but have not been transferred yet. */
  Authorized = 'AUTHORIZED',
  /** The payment was canceled because the order could not be fulfilled or was voided before completion. */
  Canceled = 'CANCELED',
  /** Funds have been successfully transferred. */
  Captured = 'CAPTURED',
  /** The payment failed during processing by the provider. */
  Failed = 'FAILED',
  /** The payment record exists, but there is no evidence of it yet. */
  Pending = 'PENDING',
  /** The payment was manually rejected by an administrator. */
  Rejected = 'REJECTED',
  /** Evidence of the payment has been submitted but not yet verified. */
  Submitted = 'SUBMITTED'
}

export type PriceRange = {
  max?: InputMaybe<Scalars['Int']['input']>;
  min?: InputMaybe<Scalars['Int']['input']>;
};

/** A product is a good or service that you want to sell. */
export type Product = Node & {
  /**
   * Whether the product is archived or not.
   * Archived products are not exposed to the storefront API and are not visible in the admin ui by default.
   * Useful for products that are not available anymore but you don't want to lose their data.
   */
  archived: Scalars['Boolean']['output'];
  assets: AssetList;
  createdAt: Scalars['Date']['output'];
  /** The product's description */
  description?: Maybe<Scalars['String']['output']>;
  /**
   * Whether the products is enabled or not.
   * Not enabled products are not exposed to the storefront API but are visible in the admin ui.
   * Useful for products that are not published by now but they planned to be published in the future.
   */
  enabled: Scalars['Boolean']['output'];
  id: Scalars['ID']['output'];
  /**
   * The maximum price of the product
   * obtained from the variants sale prices.
   */
  maxSalePrice: Scalars['Int']['output'];
  /**
   * The minimum price of the product
   * obtained from the variants sale prices.
   */
  minSalePrice: Scalars['Int']['output'];
  /** The product's name */
  name: Scalars['String']['output'];
  options: Option[];
  /** A human-friendly unique string for the Product automatically generated from its name */
  slug: Scalars['String']['output'];
  tags: Tag[];
  translations: ProductTranslation[];
  updatedAt: Scalars['Date']['output'];
  variants: VariantList;
};

/** A product is a good or service that you want to sell. */
export type ProductAssetsArgs = {
  input?: InputMaybe<ListInput>;
};

/** A product is a good or service that you want to sell. */
export type ProductOptionsArgs = {
  name?: InputMaybe<Scalars['String']['input']>;
};

/** A product is a good or service that you want to sell. */
export type ProductVariantsArgs = {
  input?: InputMaybe<ListInput>;
};

export type ProductFilters = {
  archived?: InputMaybe<BooleanFilter>;
  enabled?: InputMaybe<BooleanFilter>;
  name?: InputMaybe<StringFilter>;
};

export type ProductList = List & {
  count: Scalars['Int']['output'];
  items: Product[];
  pageInfo: PageInfo;
};

export type ProductListInput = {
  /** Filters to apply */
  filters?: InputMaybe<ProductFilters>;
  /** Skip the first n results */
  skip?: InputMaybe<Scalars['Int']['input']>;
  /** takes n result from where the skip position is */
  take?: InputMaybe<Scalars['Int']['input']>;
};

export type ProductTranslation = {
  createdAt: Scalars['Date']['output'];
  description?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  locale: Locale;
  name?: Maybe<Scalars['String']['output']>;
  slug?: Maybe<Scalars['String']['output']>;
  updatedAt: Scalars['Date']['output'];
};

export type Query = {
  collection?: Maybe<Collection>;
  collections: CollectionList;
  countries: Country[];
  location?: Maybe<Location>;
  locations: LocationList;
  order?: Maybe<Order>;
  product?: Maybe<Product>;
  products: ProductList;
  /**
   * Get a list of products by their variant IDs.
   * Useful for fetching products win cases when you only have variant IDs like
   * fetching products from a discount metadata
   */
  productsByVariantIds: ProductList;
  shippingHandlers: ShippingHandler[];
  shippingMethods: ShippingMethod[];
  /** Get shop by slug */
  shop?: Maybe<Shop>;
  /** Get a list of shops */
  shops: ShopList;
  tags: TagList;
  /** Validate current token of the user in session */
  validateAccessToken?: Maybe<Scalars['Boolean']['output']>;
  variant?: Maybe<Variant>;
  /** Get user in session */
  whoami?: Maybe<User>;
  zone?: Maybe<Zone>;
  zones: Zone[];
};

export type QueryCollectionArgs = {
  id?: InputMaybe<Scalars['ID']['input']>;
  slug?: InputMaybe<Scalars['String']['input']>;
};

export type QueryCollectionsArgs = {
  input?: InputMaybe<CollectionListInput>;
};

export type QueryLocationArgs = {
  id: Scalars['ID']['input'];
};

export type QueryLocationsArgs = {
  input?: InputMaybe<ListInput>;
};

export type QueryOrderArgs = {
  code?: InputMaybe<Scalars['String']['input']>;
  id?: InputMaybe<Scalars['ID']['input']>;
};

export type QueryProductArgs = {
  id?: InputMaybe<Scalars['ID']['input']>;
  slug?: InputMaybe<Scalars['String']['input']>;
};

export type QueryProductsArgs = {
  input?: InputMaybe<ProductListInput>;
};

export type QueryProductsByVariantIdsArgs = {
  ids: Scalars['ID']['input'][];
  input?: InputMaybe<ProductListInput>;
};

export type QueryShopArgs = {
  slug: Scalars['String']['input'];
};

export type QueryShopsArgs = {
  input?: InputMaybe<ListInput>;
};

export type QueryTagsArgs = {
  input?: InputMaybe<TagListInput>;
};

export type QueryVariantArgs = {
  id: Scalars['ID']['input'];
};

export type QueryZoneArgs = {
  id: Scalars['ID']['input'];
};

/** Represents shipping fulfillment details for an order */
export type ShippingFulfillment = {
  /** Name of the shipping carrier */
  carrier?: Maybe<Scalars['String']['output']>;
  createdAt: Scalars['Date']['output'];
  /** Date and time when the order was delivered */
  deliveredAt?: Maybe<Scalars['Date']['output']>;
  id: Scalars['ID']['output'];
  /** The shipping method used to generate this fulfillment */
  method: Scalars['String']['output'];
  /** Date and time when the order was shipped */
  shippedAt?: Maybe<Scalars['Date']['output']>;
  shippingMethod: ShippingMethod;
  /** Tracking code provided by the carrier */
  trackingCode?: Maybe<Scalars['String']['output']>;
  updatedAt: Scalars['Date']['output'];
};

/** A shipping handler is a way to manage the shipping of an order in your shop, manage include the shipping cost, the shipping time, etc */
export type ShippingHandler = {
  /**
   * Specific data for the shipping handler chosen
   * Usually, this json stores the shipping integration keys
   * Record<string, Arg>
   */
  args: Scalars['JSON']['output'];
  /** The shipping handler's code (e.g. 'fedex') */
  code: Scalars['String']['output'];
  /** The shipping handler's name (e.g. 'Fedex') */
  name: Scalars['String']['output'];
};

/** A shipping method defines a way to ship products to customers within a specific zone. */
export type ShippingMethod = {
  createdAt: Scalars['Date']['output'];
  /** Whether the shipping method is enabled */
  enabled: Scalars['Boolean']['output'];
  /** The shipping method's handler configuration */
  handler: HandlerConfig;
  id: Scalars['ID']['output'];
  /** The shipping method's name */
  name: Scalars['String']['output'];
  /** The shipping method's price preview */
  pricePreview: Scalars['Int']['output'];
  updatedAt: Scalars['Date']['output'];
};

export enum ShippingMethodErrorCode {
  HandlerNotFound = 'HANDLER_NOT_FOUND'
}

export type ShippingMethodErrorResult = {
  code: ShippingMethodErrorCode;
  message: Scalars['String']['output'];
};

export type ShippingMethodResult = {
  apiErrors: ShippingMethodErrorResult[];
  shippingMethod?: Maybe<ShippingMethod>;
};

/** A lune shop */
export type Shop = Node & {
  createdAt: Scalars['Date']['output'];
  /** Contact email for the shop, used to show as contact information in emails */
  email: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  /** The shop's logo, used for emails and branding in admin and storefront */
  logo?: Maybe<Scalars['String']['output']>;
  /** The shop's name */
  name: Scalars['String']['output'];
  /** The shop's owner */
  owner: User;
  /** Contact phone number for the shop, used to show as contact information in emails */
  phoneNumber: Scalars['String']['output'];
  /** The shop's slug */
  slug: Scalars['String']['output'];
  /** The shop's socials, used for branding and social media links in emails and storefront */
  socials?: Maybe<ShopSocials>;
  /** Api key for other stores to connect to this store */
  storefrontApiKey: Scalars['String']['output'];
  /** The shop's storefront url */
  storefrontUrl?: Maybe<Scalars['String']['output']>;
  updatedAt: Scalars['Date']['output'];
};

export enum ShopErrorCode {
  /** Error thrown when the emails provided for a shop already exists */
  EmailAlreadyExists = 'EMAIL_ALREADY_EXISTS'
}

export type ShopErrorResult = {
  code: ShopErrorCode;
  message: Scalars['String']['output'];
};

export type ShopList = List & {
  count: Scalars['Int']['output'];
  items: Shop[];
  pageInfo: PageInfo;
};

export type ShopResult = {
  apiErrors: ShopErrorResult[];
  shop?: Maybe<Shop>;
};

export type ShopSocials = {
  facebook?: Maybe<Scalars['String']['output']>;
  instagram?: Maybe<Scalars['String']['output']>;
  twitter?: Maybe<Scalars['String']['output']>;
};

export type ShopSocialsInput = {
  facebook?: InputMaybe<Scalars['String']['input']>;
  instagram?: InputMaybe<Scalars['String']['input']>;
  twitter?: InputMaybe<Scalars['String']['input']>;
};

/** A state is a Geographical Region in a country. */
export type State = {
  /** The state's code (e.g., 'JAL', 'CA', 'TX') */
  code: Scalars['String']['output'];
  /** The country this state belongs to */
  country: Country;
  createdAt: Scalars['Date']['output'];
  id: Scalars['ID']['output'];
  /** The state's name */
  name: Scalars['String']['output'];
  updatedAt: Scalars['Date']['output'];
};

export type StringFilter = {
  /** Filter by contains match */
  contains?: InputMaybe<Scalars['String']['input']>;
  /** Filter by exact match */
  equals?: InputMaybe<Scalars['String']['input']>;
};

/**
 * A tag is an arbitrary label which can be applied to certain entities.
 * It is used to help organize and filter those entities.
 */
export type Tag = Node & {
  createdAt: Scalars['Date']['output'];
  id: Scalars['ID']['output'];
  /** The tag's name */
  name: Scalars['String']['output'];
  updatedAt: Scalars['Date']['output'];
};

export enum TagErrorCode {
  NameAlreadyExists = 'NAME_ALREADY_EXISTS'
}

export type TagErrorResult = {
  code: TagErrorCode;
  message: Scalars['String']['output'];
};

export type TagFilters = {
  name?: InputMaybe<StringFilter>;
};

export type TagList = List & {
  count: Scalars['Int']['output'];
  items: Tag[];
  pageInfo: PageInfo;
};

export type TagListInput = {
  /** Filters to apply */
  filters?: InputMaybe<TagFilters>;
  /** Skip the first n results */
  skip?: InputMaybe<Scalars['Int']['input']>;
  /** takes n result from where the skip position is */
  take?: InputMaybe<Scalars['Int']['input']>;
};

export type TagResult = {
  apiErrors: TagErrorResult[];
  tag?: Maybe<Tag>;
};

export type UpdateCollectionInput = {
  assets?: InputMaybe<AssetInEntity[]>;
  description?: InputMaybe<Scalars['String']['input']>;
  enabled?: InputMaybe<Scalars['Boolean']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  order?: InputMaybe<Scalars['Int']['input']>;
  products?: InputMaybe<Scalars['ID']['input'][]>;
  subCollections?: InputMaybe<Scalars['ID']['input'][]>;
};

export type UpdateInStorePickupPreferencesInput = {
  instructions?: InputMaybe<Scalars['String']['input']>;
  isAvailable?: InputMaybe<Scalars['Boolean']['input']>;
};

export type UpdateLocationInput = {
  city?: InputMaybe<Scalars['String']['input']>;
  countryId?: InputMaybe<Scalars['ID']['input']>;
  enabled?: InputMaybe<Scalars['Boolean']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  phoneNumber?: InputMaybe<Scalars['String']['input']>;
  postalCode?: InputMaybe<Scalars['String']['input']>;
  references?: InputMaybe<Scalars['String']['input']>;
  stateId?: InputMaybe<Scalars['ID']['input']>;
  streetLine1?: InputMaybe<Scalars['String']['input']>;
  streetLine2?: InputMaybe<Scalars['String']['input']>;
};

export type UpdateOptionInput = {
  name?: InputMaybe<Scalars['String']['input']>;
  order?: InputMaybe<Scalars['Int']['input']>;
  values?: InputMaybe<UpdateOptionValueInput[]>;
};

export type UpdateOptionValueInput = {
  /**
   * If present, the value will be updated.
   * If not, the value will be created and add it to the option
   */
  id?: InputMaybe<Scalars['ID']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  order?: InputMaybe<Scalars['Int']['input']>;
};

export type UpdateProductInput = {
  archived?: InputMaybe<Scalars['Boolean']['input']>;
  assets?: InputMaybe<AssetInEntity[]>;
  description?: InputMaybe<Scalars['String']['input']>;
  enabled?: InputMaybe<Scalars['Boolean']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  tags?: InputMaybe<Scalars['ID']['input'][]>;
};

export type UpdateShippingMethodInput = {
  args?: InputMaybe<Scalars['JSON']['input']>;
  enabled?: InputMaybe<Scalars['Boolean']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
};

export type UpdateShopInput = {
  email?: InputMaybe<Scalars['String']['input']>;
  logo?: InputMaybe<Scalars['String']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  phoneNumber?: InputMaybe<Scalars['String']['input']>;
  socials?: InputMaybe<ShopSocialsInput>;
  storefrontUrl?: InputMaybe<Scalars['String']['input']>;
};

export type UpdateTagInput = {
  name?: InputMaybe<Scalars['String']['input']>;
};

export type UpdateUserInput = {
  email?: InputMaybe<Scalars['String']['input']>;
};

export type UpdateVariantInput = {
  assets?: InputMaybe<AssetInVariantInput[]>;
  comparisonPrice?: InputMaybe<Scalars['Float']['input']>;
  costPerUnit?: InputMaybe<Scalars['Float']['input']>;
  dimensions?: InputMaybe<DimensionsInput>;
  optionValues?: InputMaybe<Scalars['ID']['input'][]>;
  requiresShipping?: InputMaybe<Scalars['Boolean']['input']>;
  salePrice?: InputMaybe<Scalars['Float']['input']>;
  sku?: InputMaybe<Scalars['String']['input']>;
  stock?: InputMaybe<Scalars['Int']['input']>;
  weight?: InputMaybe<Scalars['Float']['input']>;
};

export type UpdateZoneInput = {
  name?: InputMaybe<Scalars['String']['input']>;
  stateIds?: InputMaybe<Scalars['ID']['input'][]>;
};

/** A lune customer */
export type User = Node & {
  createdAt: Scalars['Date']['output'];
  /** The user's email (unique) */
  email: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  /** The user's shops */
  shops: ShopList;
  updatedAt: Scalars['Date']['output'];
};

export type UserAccessTokenResult = {
  /** The access token for the user, needed to access user-specific resources */
  accessToken?: Maybe<Scalars['String']['output']>;
  apiErrors: UserErrorResult[];
};

export enum UserErrorCode {
  /** Error thrown when the email provided already exists in the system */
  EmailAlreadyExists = 'EMAIL_ALREADY_EXISTS',
  /** Error thrown when the provided credentials are invalid */
  InvalidCredentials = 'INVALID_CREDENTIALS',
  /** Error thrown when the provided email is not valid or does not conform to the expected format */
  InvalidEmail = 'INVALID_EMAIL',
  /** Error thrown when the password provided is invalid, e.g., too short or does not meet complexity requirements */
  InvalidPassword = 'INVALID_PASSWORD'
}

export type UserErrorResult = {
  code: UserErrorCode;
  message: Scalars['String']['output'];
};

export type UserList = List & {
  count: Scalars['Int']['output'];
  items: User[];
  pageInfo: PageInfo;
};

export type UserResult = {
  apiErrors: UserErrorResult[];
  user?: Maybe<User>;
};

/**
 * A variant is a specific version of a product.
 * For example, a product can have a variant with a specific color, size, or material.
 */
export type Variant = Node & {
  assets: AssetList;
  /**
   * The variant's comparison price.
   * Useful when you want to mark a variant as on sale. Comparison price should be higher than the sale price.
   */
  comparisonPrice?: Maybe<Scalars['Int']['output']>;
  /**
   * The variant's cost per unit.
   * Useful when you want to calculate the profit of a variant.
   */
  costPerUnit?: Maybe<Scalars['Int']['output']>;
  createdAt: Scalars['Date']['output'];
  deletedAt?: Maybe<Scalars['Date']['output']>;
  dimensions?: Maybe<Dimensions>;
  id: Scalars['ID']['output'];
  optionValues: OptionValue[];
  product: Product;
  /**
   * The variant's weight
   * Useful when you want to indicate that the variant needs shipping.
   */
  requiresShipping: Scalars['Boolean']['output'];
  /** The variant's sale price */
  salePrice: Scalars['Int']['output'];
  /** The variant's SKU */
  sku?: Maybe<Scalars['String']['output']>;
  /** The variant's stock */
  stock: Scalars['Int']['output'];
  updatedAt: Scalars['Date']['output'];
  weight?: Maybe<Scalars['Float']['output']>;
};

/**
 * A variant is a specific version of a product.
 * For example, a product can have a variant with a specific color, size, or material.
 */
export type VariantAssetsArgs = {
  input?: InputMaybe<ListInput>;
};

export type VariantList = List & {
  count: Scalars['Int']['output'];
  items: Variant[];
  pageInfo: PageInfo;
};

/** A zone represents a geographical area for shipping purposes. */
export type Zone = Node & {
  createdAt: Scalars['Date']['output'];
  id: Scalars['ID']['output'];
  /** The zone's name */
  name: Scalars['String']['output'];
  /** The zone's shipping methods */
  shippingMethods: ShippingMethod[];
  /** The zone's states */
  states: State[];
  updatedAt: Scalars['Date']['output'];
};

export type CommonCollectionForTranslationFragment = {
  id: string;
  name: string;
  description?: string | null;
  translations: { name?: string | null; description?: string | null; locale: Locale }[];
  assets: { items: { id: string; name: string; source: string }[] };
} & { ' $fragmentName'?: 'CommonCollectionForTranslationFragment' };

export type CommonCollectionFragment = {
  id: string;
  name: string;
  description?: string | null;
  enabled: boolean;
  contentType: CollectionContentType;
  order: number;
  products: { items: { id: string }[] };
  assets: { items: { id: string; name: string; source: string }[] };
} & { ' $fragmentName'?: 'CommonCollectionFragment' };

export type CommonListCollectionFragment = {
  id: string;
  name: string;
  slug: string;
  enabled: boolean;
  contentType: CollectionContentType;
  assets: { items: { id: string; source: string }[] };
  subCollections: { count: number; items: { id: string; name: string }[] };
  products: { count: number; items: { id: string; name: string }[] };
} & { ' $fragmentName'?: 'CommonListCollectionFragment' };

export type CommonCollectionProductFragment = {
  id: string;
  name: string;
  slug: string;
  enabled: boolean;
  assets: { items: { id: string; source: string }[] };
} & { ' $fragmentName'?: 'CommonCollectionProductFragment' };

export type CommonCollectionSubCollectionFragment = {
  id: string;
  name: string;
  slug: string;
  enabled: boolean;
  assets: { items: { id: string; source: string }[] };
} & { ' $fragmentName'?: 'CommonCollectionSubCollectionFragment' };

export type GetAllCollectionsQueryVariables = Exact<{
  input?: InputMaybe<CollectionListInput>;
}>;

export type GetAllCollectionsQuery = {
  collections: {
    count: number;
    pageInfo: { total: number };
    items: {
      ' $fragmentRefs'?: { CommonListCollectionFragment: CommonListCollectionFragment };
    }[];
  };
};

export type GetCollectionsExistsQueryVariables = Exact<Record<string, never>>;

export type GetCollectionsExistsQuery = { collections: { count: number } };

export type GetCollectionQueryVariables = Exact<{
  id?: InputMaybe<Scalars['ID']['input']>;
}>;

export type GetCollectionQuery = {
  collection?: { ' $fragmentRefs'?: { CommonCollectionFragment: CommonCollectionFragment } } | null;
};

export type GetCollectionProductsQueryVariables = Exact<{
  id?: InputMaybe<Scalars['ID']['input']>;
  input?: InputMaybe<ProductListInput>;
}>;

export type GetCollectionProductsQuery = {
  collection?: {
    products: {
      count: number;
      items: {
        ' $fragmentRefs'?: { CommonCollectionProductFragment: CommonCollectionProductFragment };
      }[];
    };
  } | null;
};

export type GetCollectionSubCollectionsQueryVariables = Exact<{
  id?: InputMaybe<Scalars['ID']['input']>;
  input?: InputMaybe<CollectionListInput>;
}>;

export type GetCollectionSubCollectionsQuery = {
  collection?: {
    subCollections: {
      count: number;
      items: {
        ' $fragmentRefs'?: {
          CommonCollectionSubCollectionFragment: CommonCollectionSubCollectionFragment;
        };
      }[];
    };
  } | null;
};

export type GetCollectionForTranslationQueryVariables = Exact<{
  id?: InputMaybe<Scalars['ID']['input']>;
}>;

export type GetCollectionForTranslationQuery = {
  collection?: {
    ' $fragmentRefs'?: {
      CommonCollectionForTranslationFragment: CommonCollectionForTranslationFragment;
    };
  } | null;
};

export type CreateCollectionMutationVariables = Exact<{
  input: CreateCollectionInput;
}>;

export type CreateCollectionMutation = { createCollection: { id: string } };

export type UpdateCollectionMutationVariables = Exact<{
  id: Scalars['ID']['input'];
  input: UpdateCollectionInput;
}>;

export type UpdateCollectionMutation = { updateCollection: { id: string } };

export type RemoveCollectionsMutationVariables = Exact<{
  ids: Scalars['ID']['input'][] | Scalars['ID']['input'];
}>;

export type RemoveCollectionsMutation = { removeCollections: boolean };

export type AddCollectionTranslationMutationMutationVariables = Exact<{
  id: Scalars['ID']['input'];
  input: CollectionTranslationInput;
}>;

export type AddCollectionTranslationMutationMutation = { addCollectionTranslation: { id: string } };

export type CommonCountryFragment = {
  id: string;
  name: string;
  states: { id: string; name: string }[];
} & { ' $fragmentName'?: 'CommonCountryFragment' };

export type CommonCountryForSelectorFragment = { id: string; name: string } & {
  ' $fragmentName'?: 'CommonCountryForSelectorFragment';
};

export type GetCountriesQueryVariables = Exact<Record<string, never>>;

export type GetCountriesQuery = {
  countries: { ' $fragmentRefs'?: { CommonCountryFragment: CommonCountryFragment } }[];
};

export type GetCountriesForSelectorQueryVariables = Exact<Record<string, never>>;

export type GetCountriesForSelectorQuery = {
  countries: {
    ' $fragmentRefs'?: { CommonCountryForSelectorFragment: CommonCountryForSelectorFragment };
  }[];
};

export type CommonLocationFragment = {
  id: string;
  name: string;
  createdAt: any;
  enabled: boolean;
  streetLine1: string;
  streetLine2?: string | null;
  city: string;
  phoneNumber: string;
  postalCode: string;
  country: { id: string; name: string };
  state: { id: string; name: string };
  inStorePickup: { isAvailable: boolean; instructions: string };
} & { ' $fragmentName'?: 'CommonLocationFragment' };

export type CommonListLocationFragment = {
  id: string;
  name: string;
  enabled: boolean;
  streetLine1: string;
  city: string;
  postalCode: string;
  inStorePickup: { isAvailable: boolean };
  country: { name: string };
  state: { name: string };
} & { ' $fragmentName'?: 'CommonListLocationFragment' };

export type GetAllLocationsQueryVariables = Exact<Record<string, never>>;

export type GetAllLocationsQuery = {
  locations: {
    items: { ' $fragmentRefs'?: { CommonListLocationFragment: CommonListLocationFragment } }[];
  };
};

export type GetLocationByIdQueryVariables = Exact<{
  id: Scalars['ID']['input'];
}>;

export type GetLocationByIdQuery = {
  location?: { ' $fragmentRefs'?: { CommonLocationFragment: CommonLocationFragment } } | null;
};

export type CreateOptionMutationVariables = Exact<{
  productId: Scalars['ID']['input'];
  input: CreateOptionInput[] | CreateOptionInput;
}>;

export type CreateOptionMutation = {
  createOption: { id: string; name: string; values: { id: string; name: string }[] }[];
};

export type UpdateOptionMutationVariables = Exact<{
  id: Scalars['ID']['input'];
  input: UpdateOptionInput;
}>;

export type UpdateOptionMutation = {
  updateOption: { id: string; name: string; values: { id: string; name: string }[] };
};

export type RemoveOptionMutationVariables = Exact<{
  id: Scalars['ID']['input'];
}>;

export type RemoveOptionMutation = { softRemoveOption: { id: string } };

export type CommonProductForTranslationFragment = {
  id: string;
  createdAt: any;
  name: string;
  description?: string | null;
  slug: string;
  enabled: boolean;
  options: {
    id: string;
    name: string;
    translations: { id: string; locale: Locale; name?: string | null }[];
    values: {
      id: string;
      name: string;
      translations: { id: string; locale: Locale; name?: string | null }[];
    }[];
  }[];
  translations: {
    name?: string | null;
    slug?: string | null;
    description?: string | null;
    locale: Locale;
  }[];
  assets: { items: { id: string; source: string; order: number }[] };
} & { ' $fragmentName'?: 'CommonProductForTranslationFragment' };

export type CommonProductFragment = {
  id: string;
  createdAt: any;
  name: string;
  description?: string | null;
  slug: string;
  enabled: boolean;
  minSalePrice: number;
  variants: {
    items: {
      id: string;
      salePrice: number;
      sku?: string | null;
      stock: number;
      comparisonPrice?: number | null;
      costPerUnit?: number | null;
      requiresShipping: boolean;
      weight?: number | null;
      dimensions?: { length?: number | null; width?: number | null; height?: number | null } | null;
      optionValues: { id: string; name: string }[];
      assets: { items: { id: string; source: string }[] };
    }[];
  };
  options: { id: string; name: string; values: { id: string; name: string }[] }[];
  assets: { items: { id: string; source: string; order: number }[] };
} & { ' $fragmentName'?: 'CommonProductFragment' };

export type CommonListProductFragment = {
  id: string;
  createdAt: any;
  name: string;
  slug: string;
  enabled: boolean;
  minSalePrice: number;
  variants: { items: { id: string; sku?: string | null; stock: number; salePrice: number }[] };
  assets: { items: { id: string; source: string }[] };
} & { ' $fragmentName'?: 'CommonListProductFragment' };

export type GetProductsQueryVariables = Exact<{
  input?: InputMaybe<ProductListInput>;
}>;

export type GetProductsQuery = {
  products: {
    count: number;
    pageInfo: { total: number };
    items: { ' $fragmentRefs'?: { CommonListProductFragment: CommonListProductFragment } }[];
  };
};

export type GetProductsExistsQueryVariables = Exact<Record<string, never>>;

export type GetProductsExistsQuery = { products: { count: number } };

export type GetProductQueryVariables = Exact<{
  id?: InputMaybe<Scalars['ID']['input']>;
}>;

export type GetProductQuery = {
  product?: { ' $fragmentRefs'?: { CommonProductFragment: CommonProductFragment } } | null;
};

export type GetProductForTranslationQueryVariables = Exact<{
  id?: InputMaybe<Scalars['ID']['input']>;
}>;

export type GetProductForTranslationQuery = {
  product?: {
    ' $fragmentRefs'?: { CommonProductForTranslationFragment: CommonProductForTranslationFragment };
  } | null;
};

export type CreateProductMutationVariables = Exact<{
  input: CreateProductInput;
}>;

export type CreateProductMutation = { createProduct: { id: string } };

export type UpdateProductMutationVariables = Exact<{
  id: Scalars['ID']['input'];
  input: UpdateProductInput;
}>;

export type UpdateProductMutation = { updateProduct: { id: string } };

export type RemoveProductsMutationVariables = Exact<{
  ids: Scalars['ID']['input'][] | Scalars['ID']['input'];
}>;

export type RemoveProductsMutation = { softRemoveProducts: boolean };

export type AddProductTranslationMutationMutationVariables = Exact<{
  id: Scalars['ID']['input'];
  input: AddProductTranslationInput;
}>;

export type AddProductTranslationMutationMutation = { addProductTranslation: { id: string } };

export type CommonShippingHandlersFragment = { name: string; code: string; args: any } & {
  ' $fragmentName'?: 'CommonShippingHandlersFragment';
};

export type GetAllHandlersQueryVariables = Exact<Record<string, never>>;

export type GetAllHandlersQuery = {
  shippingHandlers: {
    ' $fragmentRefs'?: { CommonShippingHandlersFragment: CommonShippingHandlersFragment };
  }[];
};

export type CreateShippingMethodMutationVariables = Exact<{
  input: CreateShippingMethodInput;
}>;

export type CreateShippingMethodMutation = {
  createShippingMethod: {
    apiErrors: { code: ShippingMethodErrorCode; message: string }[];
    shippingMethod?: { id: string } | null;
  };
};

export type UpdateShippingMethodMutationVariables = Exact<{
  id: Scalars['ID']['input'];
  input: UpdateShippingMethodInput;
}>;

export type UpdateShippingMethodMutation = { updateShippingMethod: { id: string } };

export type RemoveShippingMethodMutationVariables = Exact<{
  id: Scalars['ID']['input'];
}>;

export type RemoveShippingMethodMutation = { removeShippingMethod: boolean };

export type CommonShopFragment = {
  id: string;
  name: string;
  slug: string;
  email: string;
  logo?: string | null;
  phoneNumber: string;
  storefrontApiKey: string;
  socials?: { facebook?: string | null; twitter?: string | null; instagram?: string | null } | null;
} & { ' $fragmentName'?: 'CommonShopFragment' };

export type CommonListShopFragment = { id: string; name: string; slug: string } & {
  ' $fragmentName'?: 'CommonListShopFragment';
};

export type GetShopsQueryVariables = Exact<Record<string, never>>;

export type GetShopsQuery = {
  shops: {
    items: { ' $fragmentRefs'?: { CommonListShopFragment: CommonListShopFragment } }[];
  };
};

export type ShopQueryVariables = Exact<{
  slug: Scalars['String']['input'];
}>;

export type ShopQuery = {
  shop?: { ' $fragmentRefs'?: { CommonShopFragment: CommonShopFragment } } | null;
};

export type CreateShopMutationVariables = Exact<{
  input: CreateShopInput;
}>;

export type CreateShopMutation = {
  createShop: {
    apiErrors: { message: string; code: ShopErrorCode }[];
    shop?: { id: string; slug: string } | null;
  };
};

export type UpdateShopMutationVariables = Exact<{
  shopSlug: Scalars['String']['input'];
  input: UpdateShopInput;
}>;

export type UpdateShopMutation = {
  updateShop: {
    apiErrors: { message: string; code: ShopErrorCode }[];
    shop?: { id: string; slug: string } | null;
  };
};

export type CommonUserFragment = { id: string; email: string } & {
  ' $fragmentName'?: 'CommonUserFragment';
};

export type WhoamiQueryVariables = Exact<Record<string, never>>;

export type WhoamiQuery = {
  whoami?: { ' $fragmentRefs'?: { CommonUserFragment: CommonUserFragment } } | null;
};

export type GenerateAccessTokenMutationVariables = Exact<{
  input: GenerateUserAccessTokenInput;
}>;

export type GenerateAccessTokenMutation = {
  generateUserAccessToken: {
    accessToken?: string | null;
    apiErrors: { code: UserErrorCode; message: string }[];
  };
};

export type CreateVariantMutationVariables = Exact<{
  productId: Scalars['ID']['input'];
  input: CreateVariantInput[] | CreateVariantInput;
}>;

export type CreateVariantMutation = { createVariant: ({ id: string } | null)[] };

export type UpdateVariantMutationVariables = Exact<{
  id: Scalars['ID']['input'];
  input: UpdateVariantInput;
}>;

export type UpdateVariantMutation = { updateVariant: { id: string } };

export type SoftRemoveVariantMutationVariables = Exact<{
  id: Scalars['ID']['input'];
}>;

export type SoftRemoveVariantMutation = { softRemoveVariant: { id: string } };

export type CommonZoneFragment = {
  id: string;
  name: string;
  createdAt: any;
  states: { id: string; name: string }[];
  shippingMethods: {
    id: string;
    name: string;
    enabled: boolean;
    pricePreview: number;
    handler: { code: string; args: any };
  }[];
} & { ' $fragmentName'?: 'CommonZoneFragment' };

export type CommonListZoneFragment = {
  id: string;
  name: string;
  shippingMethods: { id: string }[];
} & { ' $fragmentName'?: 'CommonListZoneFragment' };

export type GetAllZonesQueryVariables = Exact<Record<string, never>>;

export type GetAllZonesQuery = {
  zones: { ' $fragmentRefs'?: { CommonListZoneFragment: CommonListZoneFragment } }[];
};

export type GetZoneQueryVariables = Exact<{
  id: Scalars['ID']['input'];
}>;

export type GetZoneQuery = {
  zone?: { ' $fragmentRefs'?: { CommonZoneFragment: CommonZoneFragment } } | null;
};

export type CreateZoneMutationVariables = Exact<{
  input: CreateZoneInput;
}>;

export type CreateZoneMutation = { createZone: { id: string } };

export type UpdateZoneMutationVariables = Exact<{
  id: Scalars['ID']['input'];
  input: UpdateZoneInput;
}>;

export type UpdateZoneMutation = { updateZone: { id: string } };

export type RemoveZoneMutationVariables = Exact<{
  id: Scalars['ID']['input'];
}>;

export type RemoveZoneMutation = { removeZone: boolean };

export const CommonCollectionForTranslationFragmentDoc = {
  kind: 'Document',
  definitions: [
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'CommonCollectionForTranslation' },
      typeCondition: { kind: 'NamedType', name: { kind: 'Name', value: 'Collection' } },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          { kind: 'Field', name: { kind: 'Name', value: 'id' } },
          { kind: 'Field', name: { kind: 'Name', value: 'name' } },
          { kind: 'Field', name: { kind: 'Name', value: 'description' } },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'translations' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'name' } },
                { kind: 'Field', name: { kind: 'Name', value: 'description' } },
                { kind: 'Field', name: { kind: 'Name', value: 'locale' } }
              ]
            }
          },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'assets' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'input' },
                value: {
                  kind: 'ObjectValue',
                  fields: [
                    {
                      kind: 'ObjectField',
                      name: { kind: 'Name', value: 'take' },
                      value: { kind: 'IntValue', value: '1' }
                    }
                  ]
                }
              }
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'items' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'name' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'source' } }
                    ]
                  }
                }
              ]
            }
          }
        ]
      }
    }
  ]
} as unknown as DocumentNode<CommonCollectionForTranslationFragment, unknown>;
export const CommonCollectionFragmentDoc = {
  kind: 'Document',
  definitions: [
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'CommonCollection' },
      typeCondition: { kind: 'NamedType', name: { kind: 'Name', value: 'Collection' } },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          { kind: 'Field', name: { kind: 'Name', value: 'id' } },
          { kind: 'Field', name: { kind: 'Name', value: 'name' } },
          { kind: 'Field', name: { kind: 'Name', value: 'description' } },
          { kind: 'Field', name: { kind: 'Name', value: 'enabled' } },
          { kind: 'Field', name: { kind: 'Name', value: 'contentType' } },
          { kind: 'Field', name: { kind: 'Name', value: 'order' } },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'products' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'items' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [{ kind: 'Field', name: { kind: 'Name', value: 'id' } }]
                  }
                }
              ]
            }
          },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'assets' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'input' },
                value: {
                  kind: 'ObjectValue',
                  fields: [
                    {
                      kind: 'ObjectField',
                      name: { kind: 'Name', value: 'take' },
                      value: { kind: 'IntValue', value: '1' }
                    }
                  ]
                }
              }
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'items' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'name' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'source' } }
                    ]
                  }
                }
              ]
            }
          }
        ]
      }
    }
  ]
} as unknown as DocumentNode<CommonCollectionFragment, unknown>;
export const CommonListCollectionFragmentDoc = {
  kind: 'Document',
  definitions: [
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'CommonListCollection' },
      typeCondition: { kind: 'NamedType', name: { kind: 'Name', value: 'Collection' } },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          { kind: 'Field', name: { kind: 'Name', value: 'id' } },
          { kind: 'Field', name: { kind: 'Name', value: 'name' } },
          { kind: 'Field', name: { kind: 'Name', value: 'slug' } },
          { kind: 'Field', name: { kind: 'Name', value: 'enabled' } },
          { kind: 'Field', name: { kind: 'Name', value: 'contentType' } },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'assets' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'input' },
                value: {
                  kind: 'ObjectValue',
                  fields: [
                    {
                      kind: 'ObjectField',
                      name: { kind: 'Name', value: 'take' },
                      value: { kind: 'IntValue', value: '1' }
                    }
                  ]
                }
              }
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'items' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'source' } }
                    ]
                  }
                }
              ]
            }
          },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'subCollections' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'count' } },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'items' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'name' } }
                    ]
                  }
                }
              ]
            }
          },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'products' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'count' } },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'items' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'name' } }
                    ]
                  }
                }
              ]
            }
          }
        ]
      }
    }
  ]
} as unknown as DocumentNode<CommonListCollectionFragment, unknown>;
export const CommonCollectionProductFragmentDoc = {
  kind: 'Document',
  definitions: [
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'CommonCollectionProduct' },
      typeCondition: { kind: 'NamedType', name: { kind: 'Name', value: 'Product' } },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          { kind: 'Field', name: { kind: 'Name', value: 'id' } },
          { kind: 'Field', name: { kind: 'Name', value: 'name' } },
          { kind: 'Field', name: { kind: 'Name', value: 'slug' } },
          { kind: 'Field', name: { kind: 'Name', value: 'enabled' } },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'assets' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'input' },
                value: {
                  kind: 'ObjectValue',
                  fields: [
                    {
                      kind: 'ObjectField',
                      name: { kind: 'Name', value: 'take' },
                      value: { kind: 'IntValue', value: '1' }
                    }
                  ]
                }
              }
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'items' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'source' } }
                    ]
                  }
                }
              ]
            }
          }
        ]
      }
    }
  ]
} as unknown as DocumentNode<CommonCollectionProductFragment, unknown>;
export const CommonCollectionSubCollectionFragmentDoc = {
  kind: 'Document',
  definitions: [
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'CommonCollectionSubCollection' },
      typeCondition: { kind: 'NamedType', name: { kind: 'Name', value: 'Collection' } },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          { kind: 'Field', name: { kind: 'Name', value: 'id' } },
          { kind: 'Field', name: { kind: 'Name', value: 'name' } },
          { kind: 'Field', name: { kind: 'Name', value: 'slug' } },
          { kind: 'Field', name: { kind: 'Name', value: 'enabled' } },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'assets' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'input' },
                value: {
                  kind: 'ObjectValue',
                  fields: [
                    {
                      kind: 'ObjectField',
                      name: { kind: 'Name', value: 'take' },
                      value: { kind: 'IntValue', value: '1' }
                    }
                  ]
                }
              }
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'items' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'source' } }
                    ]
                  }
                }
              ]
            }
          }
        ]
      }
    }
  ]
} as unknown as DocumentNode<CommonCollectionSubCollectionFragment, unknown>;
export const CommonCountryFragmentDoc = {
  kind: 'Document',
  definitions: [
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'CommonCountry' },
      typeCondition: { kind: 'NamedType', name: { kind: 'Name', value: 'Country' } },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          { kind: 'Field', name: { kind: 'Name', value: 'id' } },
          { kind: 'Field', name: { kind: 'Name', value: 'name' } },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'states' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                { kind: 'Field', name: { kind: 'Name', value: 'name' } }
              ]
            }
          }
        ]
      }
    }
  ]
} as unknown as DocumentNode<CommonCountryFragment, unknown>;
export const CommonCountryForSelectorFragmentDoc = {
  kind: 'Document',
  definitions: [
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'CommonCountryForSelector' },
      typeCondition: { kind: 'NamedType', name: { kind: 'Name', value: 'Country' } },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          { kind: 'Field', name: { kind: 'Name', value: 'id' } },
          { kind: 'Field', name: { kind: 'Name', value: 'name' } }
        ]
      }
    }
  ]
} as unknown as DocumentNode<CommonCountryForSelectorFragment, unknown>;
export const CommonLocationFragmentDoc = {
  kind: 'Document',
  definitions: [
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'CommonLocation' },
      typeCondition: { kind: 'NamedType', name: { kind: 'Name', value: 'Location' } },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          { kind: 'Field', name: { kind: 'Name', value: 'id' } },
          { kind: 'Field', name: { kind: 'Name', value: 'name' } },
          { kind: 'Field', name: { kind: 'Name', value: 'createdAt' } },
          { kind: 'Field', name: { kind: 'Name', value: 'enabled' } },
          { kind: 'Field', name: { kind: 'Name', value: 'streetLine1' } },
          { kind: 'Field', name: { kind: 'Name', value: 'streetLine2' } },
          { kind: 'Field', name: { kind: 'Name', value: 'city' } },
          { kind: 'Field', name: { kind: 'Name', value: 'phoneNumber' } },
          { kind: 'Field', name: { kind: 'Name', value: 'postalCode' } },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'country' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                { kind: 'Field', name: { kind: 'Name', value: 'name' } }
              ]
            }
          },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'state' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                { kind: 'Field', name: { kind: 'Name', value: 'name' } }
              ]
            }
          },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'inStorePickup' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'isAvailable' } },
                { kind: 'Field', name: { kind: 'Name', value: 'instructions' } }
              ]
            }
          }
        ]
      }
    }
  ]
} as unknown as DocumentNode<CommonLocationFragment, unknown>;
export const CommonListLocationFragmentDoc = {
  kind: 'Document',
  definitions: [
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'CommonListLocation' },
      typeCondition: { kind: 'NamedType', name: { kind: 'Name', value: 'Location' } },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          { kind: 'Field', name: { kind: 'Name', value: 'id' } },
          { kind: 'Field', name: { kind: 'Name', value: 'name' } },
          { kind: 'Field', name: { kind: 'Name', value: 'enabled' } },
          { kind: 'Field', name: { kind: 'Name', value: 'streetLine1' } },
          { kind: 'Field', name: { kind: 'Name', value: 'city' } },
          { kind: 'Field', name: { kind: 'Name', value: 'postalCode' } },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'inStorePickup' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [{ kind: 'Field', name: { kind: 'Name', value: 'isAvailable' } }]
            }
          },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'country' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [{ kind: 'Field', name: { kind: 'Name', value: 'name' } }]
            }
          },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'state' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [{ kind: 'Field', name: { kind: 'Name', value: 'name' } }]
            }
          }
        ]
      }
    }
  ]
} as unknown as DocumentNode<CommonListLocationFragment, unknown>;
export const CommonProductForTranslationFragmentDoc = {
  kind: 'Document',
  definitions: [
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'CommonProductForTranslation' },
      typeCondition: { kind: 'NamedType', name: { kind: 'Name', value: 'Product' } },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          { kind: 'Field', name: { kind: 'Name', value: 'id' } },
          { kind: 'Field', name: { kind: 'Name', value: 'createdAt' } },
          { kind: 'Field', name: { kind: 'Name', value: 'name' } },
          { kind: 'Field', name: { kind: 'Name', value: 'description' } },
          { kind: 'Field', name: { kind: 'Name', value: 'slug' } },
          { kind: 'Field', name: { kind: 'Name', value: 'enabled' } },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'options' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                { kind: 'Field', name: { kind: 'Name', value: 'name' } },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'translations' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'locale' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'name' } }
                    ]
                  }
                },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'values' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'name' } },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'translations' },
                        selectionSet: {
                          kind: 'SelectionSet',
                          selections: [
                            { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                            { kind: 'Field', name: { kind: 'Name', value: 'locale' } },
                            { kind: 'Field', name: { kind: 'Name', value: 'name' } }
                          ]
                        }
                      }
                    ]
                  }
                }
              ]
            }
          },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'translations' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'name' } },
                { kind: 'Field', name: { kind: 'Name', value: 'slug' } },
                { kind: 'Field', name: { kind: 'Name', value: 'description' } },
                { kind: 'Field', name: { kind: 'Name', value: 'locale' } }
              ]
            }
          },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'assets' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'input' },
                value: {
                  kind: 'ObjectValue',
                  fields: [
                    {
                      kind: 'ObjectField',
                      name: { kind: 'Name', value: 'take' },
                      value: { kind: 'IntValue', value: '1' }
                    }
                  ]
                }
              }
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'items' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'source' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'order' } }
                    ]
                  }
                }
              ]
            }
          }
        ]
      }
    }
  ]
} as unknown as DocumentNode<CommonProductForTranslationFragment, unknown>;
export const CommonProductFragmentDoc = {
  kind: 'Document',
  definitions: [
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'CommonProduct' },
      typeCondition: { kind: 'NamedType', name: { kind: 'Name', value: 'Product' } },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          { kind: 'Field', name: { kind: 'Name', value: 'id' } },
          { kind: 'Field', name: { kind: 'Name', value: 'createdAt' } },
          { kind: 'Field', name: { kind: 'Name', value: 'name' } },
          { kind: 'Field', name: { kind: 'Name', value: 'description' } },
          { kind: 'Field', name: { kind: 'Name', value: 'slug' } },
          { kind: 'Field', name: { kind: 'Name', value: 'enabled' } },
          { kind: 'Field', name: { kind: 'Name', value: 'minSalePrice' } },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'variants' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'items' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'salePrice' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'sku' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'stock' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'comparisonPrice' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'costPerUnit' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'requiresShipping' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'weight' } },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'dimensions' },
                        selectionSet: {
                          kind: 'SelectionSet',
                          selections: [
                            { kind: 'Field', name: { kind: 'Name', value: 'length' } },
                            { kind: 'Field', name: { kind: 'Name', value: 'width' } },
                            { kind: 'Field', name: { kind: 'Name', value: 'height' } }
                          ]
                        }
                      },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'optionValues' },
                        selectionSet: {
                          kind: 'SelectionSet',
                          selections: [
                            { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                            { kind: 'Field', name: { kind: 'Name', value: 'name' } }
                          ]
                        }
                      },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'assets' },
                        selectionSet: {
                          kind: 'SelectionSet',
                          selections: [
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'items' },
                              selectionSet: {
                                kind: 'SelectionSet',
                                selections: [
                                  { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                                  { kind: 'Field', name: { kind: 'Name', value: 'source' } }
                                ]
                              }
                            }
                          ]
                        }
                      }
                    ]
                  }
                }
              ]
            }
          },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'options' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                { kind: 'Field', name: { kind: 'Name', value: 'name' } },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'values' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'name' } }
                    ]
                  }
                }
              ]
            }
          },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'assets' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'items' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'source' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'order' } }
                    ]
                  }
                }
              ]
            }
          }
        ]
      }
    }
  ]
} as unknown as DocumentNode<CommonProductFragment, unknown>;
export const CommonListProductFragmentDoc = {
  kind: 'Document',
  definitions: [
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'CommonListProduct' },
      typeCondition: { kind: 'NamedType', name: { kind: 'Name', value: 'Product' } },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          { kind: 'Field', name: { kind: 'Name', value: 'id' } },
          { kind: 'Field', name: { kind: 'Name', value: 'createdAt' } },
          { kind: 'Field', name: { kind: 'Name', value: 'name' } },
          { kind: 'Field', name: { kind: 'Name', value: 'slug' } },
          { kind: 'Field', name: { kind: 'Name', value: 'enabled' } },
          { kind: 'Field', name: { kind: 'Name', value: 'minSalePrice' } },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'variants' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'items' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'sku' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'stock' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'salePrice' } }
                    ]
                  }
                }
              ]
            }
          },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'assets' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'input' },
                value: {
                  kind: 'ObjectValue',
                  fields: [
                    {
                      kind: 'ObjectField',
                      name: { kind: 'Name', value: 'take' },
                      value: { kind: 'IntValue', value: '1' }
                    }
                  ]
                }
              }
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'items' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'source' } }
                    ]
                  }
                }
              ]
            }
          }
        ]
      }
    }
  ]
} as unknown as DocumentNode<CommonListProductFragment, unknown>;
export const CommonShippingHandlersFragmentDoc = {
  kind: 'Document',
  definitions: [
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'CommonShippingHandlers' },
      typeCondition: { kind: 'NamedType', name: { kind: 'Name', value: 'ShippingHandler' } },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          { kind: 'Field', name: { kind: 'Name', value: 'name' } },
          { kind: 'Field', name: { kind: 'Name', value: 'code' } },
          { kind: 'Field', name: { kind: 'Name', value: 'args' } }
        ]
      }
    }
  ]
} as unknown as DocumentNode<CommonShippingHandlersFragment, unknown>;
export const CommonShopFragmentDoc = {
  kind: 'Document',
  definitions: [
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'CommonShop' },
      typeCondition: { kind: 'NamedType', name: { kind: 'Name', value: 'Shop' } },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          { kind: 'Field', name: { kind: 'Name', value: 'id' } },
          { kind: 'Field', name: { kind: 'Name', value: 'name' } },
          { kind: 'Field', name: { kind: 'Name', value: 'slug' } },
          { kind: 'Field', name: { kind: 'Name', value: 'email' } },
          { kind: 'Field', name: { kind: 'Name', value: 'logo' } },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'socials' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'facebook' } },
                { kind: 'Field', name: { kind: 'Name', value: 'twitter' } },
                { kind: 'Field', name: { kind: 'Name', value: 'instagram' } }
              ]
            }
          },
          { kind: 'Field', name: { kind: 'Name', value: 'phoneNumber' } },
          { kind: 'Field', name: { kind: 'Name', value: 'storefrontApiKey' } }
        ]
      }
    }
  ]
} as unknown as DocumentNode<CommonShopFragment, unknown>;
export const CommonListShopFragmentDoc = {
  kind: 'Document',
  definitions: [
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'CommonListShop' },
      typeCondition: { kind: 'NamedType', name: { kind: 'Name', value: 'Shop' } },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          { kind: 'Field', name: { kind: 'Name', value: 'id' } },
          { kind: 'Field', name: { kind: 'Name', value: 'name' } },
          { kind: 'Field', name: { kind: 'Name', value: 'slug' } }
        ]
      }
    }
  ]
} as unknown as DocumentNode<CommonListShopFragment, unknown>;
export const CommonUserFragmentDoc = {
  kind: 'Document',
  definitions: [
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'CommonUser' },
      typeCondition: { kind: 'NamedType', name: { kind: 'Name', value: 'User' } },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          { kind: 'Field', name: { kind: 'Name', value: 'id' } },
          { kind: 'Field', name: { kind: 'Name', value: 'email' } }
        ]
      }
    }
  ]
} as unknown as DocumentNode<CommonUserFragment, unknown>;
export const CommonZoneFragmentDoc = {
  kind: 'Document',
  definitions: [
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'CommonZone' },
      typeCondition: { kind: 'NamedType', name: { kind: 'Name', value: 'Zone' } },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          { kind: 'Field', name: { kind: 'Name', value: 'id' } },
          { kind: 'Field', name: { kind: 'Name', value: 'name' } },
          { kind: 'Field', name: { kind: 'Name', value: 'createdAt' } },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'states' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                { kind: 'Field', name: { kind: 'Name', value: 'name' } }
              ]
            }
          },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'shippingMethods' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                { kind: 'Field', name: { kind: 'Name', value: 'name' } },
                { kind: 'Field', name: { kind: 'Name', value: 'enabled' } },
                { kind: 'Field', name: { kind: 'Name', value: 'pricePreview' } },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'handler' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: 'code' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'args' } }
                    ]
                  }
                }
              ]
            }
          }
        ]
      }
    }
  ]
} as unknown as DocumentNode<CommonZoneFragment, unknown>;
export const CommonListZoneFragmentDoc = {
  kind: 'Document',
  definitions: [
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'CommonListZone' },
      typeCondition: { kind: 'NamedType', name: { kind: 'Name', value: 'Zone' } },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          { kind: 'Field', name: { kind: 'Name', value: 'id' } },
          { kind: 'Field', name: { kind: 'Name', value: 'name' } },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'shippingMethods' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [{ kind: 'Field', name: { kind: 'Name', value: 'id' } }]
            }
          }
        ]
      }
    }
  ]
} as unknown as DocumentNode<CommonListZoneFragment, unknown>;
export const GetAllCollectionsDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'GetAllCollections' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'input' } },
          type: { kind: 'NamedType', name: { kind: 'Name', value: 'CollectionListInput' } }
        }
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'collections' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'input' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'input' } }
              }
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'count' } },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'pageInfo' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [{ kind: 'Field', name: { kind: 'Name', value: 'total' } }]
                  }
                },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'items' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      {
                        kind: 'FragmentSpread',
                        name: { kind: 'Name', value: 'CommonListCollection' }
                      }
                    ]
                  }
                }
              ]
            }
          }
        ]
      }
    },
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'CommonListCollection' },
      typeCondition: { kind: 'NamedType', name: { kind: 'Name', value: 'Collection' } },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          { kind: 'Field', name: { kind: 'Name', value: 'id' } },
          { kind: 'Field', name: { kind: 'Name', value: 'name' } },
          { kind: 'Field', name: { kind: 'Name', value: 'slug' } },
          { kind: 'Field', name: { kind: 'Name', value: 'enabled' } },
          { kind: 'Field', name: { kind: 'Name', value: 'contentType' } },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'assets' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'input' },
                value: {
                  kind: 'ObjectValue',
                  fields: [
                    {
                      kind: 'ObjectField',
                      name: { kind: 'Name', value: 'take' },
                      value: { kind: 'IntValue', value: '1' }
                    }
                  ]
                }
              }
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'items' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'source' } }
                    ]
                  }
                }
              ]
            }
          },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'subCollections' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'count' } },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'items' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'name' } }
                    ]
                  }
                }
              ]
            }
          },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'products' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'count' } },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'items' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'name' } }
                    ]
                  }
                }
              ]
            }
          }
        ]
      }
    }
  ]
} as unknown as DocumentNode<GetAllCollectionsQuery, GetAllCollectionsQueryVariables>;
export const GetCollectionsExistsDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'GetCollectionsExists' },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'collections' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'input' },
                value: {
                  kind: 'ObjectValue',
                  fields: [
                    {
                      kind: 'ObjectField',
                      name: { kind: 'Name', value: 'take' },
                      value: { kind: 'IntValue', value: '1' }
                    }
                  ]
                }
              }
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [{ kind: 'Field', name: { kind: 'Name', value: 'count' } }]
            }
          }
        ]
      }
    }
  ]
} as unknown as DocumentNode<GetCollectionsExistsQuery, GetCollectionsExistsQueryVariables>;
export const GetCollectionDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'GetCollection' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'id' } },
          type: { kind: 'NamedType', name: { kind: 'Name', value: 'ID' } }
        }
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'collection' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'id' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'id' } }
              }
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'FragmentSpread', name: { kind: 'Name', value: 'CommonCollection' } }
              ]
            }
          }
        ]
      }
    },
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'CommonCollection' },
      typeCondition: { kind: 'NamedType', name: { kind: 'Name', value: 'Collection' } },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          { kind: 'Field', name: { kind: 'Name', value: 'id' } },
          { kind: 'Field', name: { kind: 'Name', value: 'name' } },
          { kind: 'Field', name: { kind: 'Name', value: 'description' } },
          { kind: 'Field', name: { kind: 'Name', value: 'enabled' } },
          { kind: 'Field', name: { kind: 'Name', value: 'contentType' } },
          { kind: 'Field', name: { kind: 'Name', value: 'order' } },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'products' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'items' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [{ kind: 'Field', name: { kind: 'Name', value: 'id' } }]
                  }
                }
              ]
            }
          },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'assets' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'input' },
                value: {
                  kind: 'ObjectValue',
                  fields: [
                    {
                      kind: 'ObjectField',
                      name: { kind: 'Name', value: 'take' },
                      value: { kind: 'IntValue', value: '1' }
                    }
                  ]
                }
              }
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'items' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'name' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'source' } }
                    ]
                  }
                }
              ]
            }
          }
        ]
      }
    }
  ]
} as unknown as DocumentNode<GetCollectionQuery, GetCollectionQueryVariables>;
export const GetCollectionProductsDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'GetCollectionProducts' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'id' } },
          type: { kind: 'NamedType', name: { kind: 'Name', value: 'ID' } }
        },
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'input' } },
          type: { kind: 'NamedType', name: { kind: 'Name', value: 'ProductListInput' } }
        }
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'collection' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'id' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'id' } }
              }
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'products' },
                  arguments: [
                    {
                      kind: 'Argument',
                      name: { kind: 'Name', value: 'input' },
                      value: { kind: 'Variable', name: { kind: 'Name', value: 'input' } }
                    }
                  ],
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: 'count' } },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'items' },
                        selectionSet: {
                          kind: 'SelectionSet',
                          selections: [
                            {
                              kind: 'FragmentSpread',
                              name: { kind: 'Name', value: 'CommonCollectionProduct' }
                            }
                          ]
                        }
                      }
                    ]
                  }
                }
              ]
            }
          }
        ]
      }
    },
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'CommonCollectionProduct' },
      typeCondition: { kind: 'NamedType', name: { kind: 'Name', value: 'Product' } },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          { kind: 'Field', name: { kind: 'Name', value: 'id' } },
          { kind: 'Field', name: { kind: 'Name', value: 'name' } },
          { kind: 'Field', name: { kind: 'Name', value: 'slug' } },
          { kind: 'Field', name: { kind: 'Name', value: 'enabled' } },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'assets' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'input' },
                value: {
                  kind: 'ObjectValue',
                  fields: [
                    {
                      kind: 'ObjectField',
                      name: { kind: 'Name', value: 'take' },
                      value: { kind: 'IntValue', value: '1' }
                    }
                  ]
                }
              }
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'items' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'source' } }
                    ]
                  }
                }
              ]
            }
          }
        ]
      }
    }
  ]
} as unknown as DocumentNode<GetCollectionProductsQuery, GetCollectionProductsQueryVariables>;
export const GetCollectionSubCollectionsDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'GetCollectionSubCollections' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'id' } },
          type: { kind: 'NamedType', name: { kind: 'Name', value: 'ID' } }
        },
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'input' } },
          type: { kind: 'NamedType', name: { kind: 'Name', value: 'CollectionListInput' } }
        }
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'collection' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'id' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'id' } }
              }
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'subCollections' },
                  arguments: [
                    {
                      kind: 'Argument',
                      name: { kind: 'Name', value: 'input' },
                      value: { kind: 'Variable', name: { kind: 'Name', value: 'input' } }
                    }
                  ],
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: 'count' } },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'items' },
                        selectionSet: {
                          kind: 'SelectionSet',
                          selections: [
                            {
                              kind: 'FragmentSpread',
                              name: { kind: 'Name', value: 'CommonCollectionSubCollection' }
                            }
                          ]
                        }
                      }
                    ]
                  }
                }
              ]
            }
          }
        ]
      }
    },
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'CommonCollectionSubCollection' },
      typeCondition: { kind: 'NamedType', name: { kind: 'Name', value: 'Collection' } },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          { kind: 'Field', name: { kind: 'Name', value: 'id' } },
          { kind: 'Field', name: { kind: 'Name', value: 'name' } },
          { kind: 'Field', name: { kind: 'Name', value: 'slug' } },
          { kind: 'Field', name: { kind: 'Name', value: 'enabled' } },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'assets' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'input' },
                value: {
                  kind: 'ObjectValue',
                  fields: [
                    {
                      kind: 'ObjectField',
                      name: { kind: 'Name', value: 'take' },
                      value: { kind: 'IntValue', value: '1' }
                    }
                  ]
                }
              }
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'items' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'source' } }
                    ]
                  }
                }
              ]
            }
          }
        ]
      }
    }
  ]
} as unknown as DocumentNode<
  GetCollectionSubCollectionsQuery,
  GetCollectionSubCollectionsQueryVariables
>;
export const GetCollectionForTranslationDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'GetCollectionForTranslation' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'id' } },
          type: { kind: 'NamedType', name: { kind: 'Name', value: 'ID' } }
        }
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'collection' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'id' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'id' } }
              }
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                {
                  kind: 'FragmentSpread',
                  name: { kind: 'Name', value: 'CommonCollectionForTranslation' }
                }
              ]
            }
          }
        ]
      }
    },
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'CommonCollectionForTranslation' },
      typeCondition: { kind: 'NamedType', name: { kind: 'Name', value: 'Collection' } },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          { kind: 'Field', name: { kind: 'Name', value: 'id' } },
          { kind: 'Field', name: { kind: 'Name', value: 'name' } },
          { kind: 'Field', name: { kind: 'Name', value: 'description' } },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'translations' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'name' } },
                { kind: 'Field', name: { kind: 'Name', value: 'description' } },
                { kind: 'Field', name: { kind: 'Name', value: 'locale' } }
              ]
            }
          },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'assets' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'input' },
                value: {
                  kind: 'ObjectValue',
                  fields: [
                    {
                      kind: 'ObjectField',
                      name: { kind: 'Name', value: 'take' },
                      value: { kind: 'IntValue', value: '1' }
                    }
                  ]
                }
              }
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'items' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'name' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'source' } }
                    ]
                  }
                }
              ]
            }
          }
        ]
      }
    }
  ]
} as unknown as DocumentNode<
  GetCollectionForTranslationQuery,
  GetCollectionForTranslationQueryVariables
>;
export const CreateCollectionDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'mutation',
      name: { kind: 'Name', value: 'CreateCollection' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'input' } },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'CreateCollectionInput' } }
          }
        }
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'createCollection' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'input' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'input' } }
              }
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [{ kind: 'Field', name: { kind: 'Name', value: 'id' } }]
            }
          }
        ]
      }
    }
  ]
} as unknown as DocumentNode<CreateCollectionMutation, CreateCollectionMutationVariables>;
export const UpdateCollectionDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'mutation',
      name: { kind: 'Name', value: 'UpdateCollection' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'id' } },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'ID' } }
          }
        },
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'input' } },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'UpdateCollectionInput' } }
          }
        }
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'updateCollection' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'id' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'id' } }
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'input' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'input' } }
              }
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [{ kind: 'Field', name: { kind: 'Name', value: 'id' } }]
            }
          }
        ]
      }
    }
  ]
} as unknown as DocumentNode<UpdateCollectionMutation, UpdateCollectionMutationVariables>;
export const RemoveCollectionsDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'mutation',
      name: { kind: 'Name', value: 'RemoveCollections' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'ids' } },
          type: {
            kind: 'NonNullType',
            type: {
              kind: 'ListType',
              type: {
                kind: 'NonNullType',
                type: { kind: 'NamedType', name: { kind: 'Name', value: 'ID' } }
              }
            }
          }
        }
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'removeCollections' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'ids' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'ids' } }
              }
            ]
          }
        ]
      }
    }
  ]
} as unknown as DocumentNode<RemoveCollectionsMutation, RemoveCollectionsMutationVariables>;
export const AddCollectionTranslationMutationDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'mutation',
      name: { kind: 'Name', value: 'AddCollectionTranslationMutation' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'id' } },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'ID' } }
          }
        },
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'input' } },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'CollectionTranslationInput' } }
          }
        }
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'addCollectionTranslation' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'id' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'id' } }
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'input' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'input' } }
              }
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [{ kind: 'Field', name: { kind: 'Name', value: 'id' } }]
            }
          }
        ]
      }
    }
  ]
} as unknown as DocumentNode<
  AddCollectionTranslationMutationMutation,
  AddCollectionTranslationMutationMutationVariables
>;
export const GetCountriesDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'GetCountries' },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'countries' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'FragmentSpread', name: { kind: 'Name', value: 'CommonCountry' } }
              ]
            }
          }
        ]
      }
    },
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'CommonCountry' },
      typeCondition: { kind: 'NamedType', name: { kind: 'Name', value: 'Country' } },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          { kind: 'Field', name: { kind: 'Name', value: 'id' } },
          { kind: 'Field', name: { kind: 'Name', value: 'name' } },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'states' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                { kind: 'Field', name: { kind: 'Name', value: 'name' } }
              ]
            }
          }
        ]
      }
    }
  ]
} as unknown as DocumentNode<GetCountriesQuery, GetCountriesQueryVariables>;
export const GetCountriesForSelectorDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'GetCountriesForSelector' },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'countries' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                {
                  kind: 'FragmentSpread',
                  name: { kind: 'Name', value: 'CommonCountryForSelector' }
                }
              ]
            }
          }
        ]
      }
    },
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'CommonCountryForSelector' },
      typeCondition: { kind: 'NamedType', name: { kind: 'Name', value: 'Country' } },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          { kind: 'Field', name: { kind: 'Name', value: 'id' } },
          { kind: 'Field', name: { kind: 'Name', value: 'name' } }
        ]
      }
    }
  ]
} as unknown as DocumentNode<GetCountriesForSelectorQuery, GetCountriesForSelectorQueryVariables>;
export const GetAllLocationsDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'GetAllLocations' },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'locations' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'items' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      {
                        kind: 'FragmentSpread',
                        name: { kind: 'Name', value: 'CommonListLocation' }
                      }
                    ]
                  }
                }
              ]
            }
          }
        ]
      }
    },
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'CommonListLocation' },
      typeCondition: { kind: 'NamedType', name: { kind: 'Name', value: 'Location' } },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          { kind: 'Field', name: { kind: 'Name', value: 'id' } },
          { kind: 'Field', name: { kind: 'Name', value: 'name' } },
          { kind: 'Field', name: { kind: 'Name', value: 'enabled' } },
          { kind: 'Field', name: { kind: 'Name', value: 'streetLine1' } },
          { kind: 'Field', name: { kind: 'Name', value: 'city' } },
          { kind: 'Field', name: { kind: 'Name', value: 'postalCode' } },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'inStorePickup' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [{ kind: 'Field', name: { kind: 'Name', value: 'isAvailable' } }]
            }
          },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'country' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [{ kind: 'Field', name: { kind: 'Name', value: 'name' } }]
            }
          },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'state' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [{ kind: 'Field', name: { kind: 'Name', value: 'name' } }]
            }
          }
        ]
      }
    }
  ]
} as unknown as DocumentNode<GetAllLocationsQuery, GetAllLocationsQueryVariables>;
export const GetLocationByIdDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'GetLocationById' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'id' } },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'ID' } }
          }
        }
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'location' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'id' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'id' } }
              }
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'FragmentSpread', name: { kind: 'Name', value: 'CommonLocation' } }
              ]
            }
          }
        ]
      }
    },
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'CommonLocation' },
      typeCondition: { kind: 'NamedType', name: { kind: 'Name', value: 'Location' } },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          { kind: 'Field', name: { kind: 'Name', value: 'id' } },
          { kind: 'Field', name: { kind: 'Name', value: 'name' } },
          { kind: 'Field', name: { kind: 'Name', value: 'createdAt' } },
          { kind: 'Field', name: { kind: 'Name', value: 'enabled' } },
          { kind: 'Field', name: { kind: 'Name', value: 'streetLine1' } },
          { kind: 'Field', name: { kind: 'Name', value: 'streetLine2' } },
          { kind: 'Field', name: { kind: 'Name', value: 'city' } },
          { kind: 'Field', name: { kind: 'Name', value: 'phoneNumber' } },
          { kind: 'Field', name: { kind: 'Name', value: 'postalCode' } },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'country' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                { kind: 'Field', name: { kind: 'Name', value: 'name' } }
              ]
            }
          },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'state' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                { kind: 'Field', name: { kind: 'Name', value: 'name' } }
              ]
            }
          },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'inStorePickup' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'isAvailable' } },
                { kind: 'Field', name: { kind: 'Name', value: 'instructions' } }
              ]
            }
          }
        ]
      }
    }
  ]
} as unknown as DocumentNode<GetLocationByIdQuery, GetLocationByIdQueryVariables>;
export const CreateOptionDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'mutation',
      name: { kind: 'Name', value: 'CreateOption' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'productId' } },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'ID' } }
          }
        },
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'input' } },
          type: {
            kind: 'NonNullType',
            type: {
              kind: 'ListType',
              type: {
                kind: 'NonNullType',
                type: { kind: 'NamedType', name: { kind: 'Name', value: 'CreateOptionInput' } }
              }
            }
          }
        }
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'createOption' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'productId' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'productId' } }
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'input' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'input' } }
              }
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                { kind: 'Field', name: { kind: 'Name', value: 'name' } },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'values' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'name' } }
                    ]
                  }
                }
              ]
            }
          }
        ]
      }
    }
  ]
} as unknown as DocumentNode<CreateOptionMutation, CreateOptionMutationVariables>;
export const UpdateOptionDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'mutation',
      name: { kind: 'Name', value: 'UpdateOption' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'id' } },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'ID' } }
          }
        },
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'input' } },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'UpdateOptionInput' } }
          }
        }
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'updateOption' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'id' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'id' } }
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'input' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'input' } }
              }
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                { kind: 'Field', name: { kind: 'Name', value: 'name' } },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'values' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'name' } }
                    ]
                  }
                }
              ]
            }
          }
        ]
      }
    }
  ]
} as unknown as DocumentNode<UpdateOptionMutation, UpdateOptionMutationVariables>;
export const RemoveOptionDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'mutation',
      name: { kind: 'Name', value: 'RemoveOption' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'id' } },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'ID' } }
          }
        }
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'softRemoveOption' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'id' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'id' } }
              }
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [{ kind: 'Field', name: { kind: 'Name', value: 'id' } }]
            }
          }
        ]
      }
    }
  ]
} as unknown as DocumentNode<RemoveOptionMutation, RemoveOptionMutationVariables>;
export const GetProductsDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'GetProducts' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'input' } },
          type: { kind: 'NamedType', name: { kind: 'Name', value: 'ProductListInput' } }
        }
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'products' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'input' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'input' } }
              }
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'count' } },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'pageInfo' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [{ kind: 'Field', name: { kind: 'Name', value: 'total' } }]
                  }
                },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'items' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'FragmentSpread', name: { kind: 'Name', value: 'CommonListProduct' } }
                    ]
                  }
                }
              ]
            }
          }
        ]
      }
    },
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'CommonListProduct' },
      typeCondition: { kind: 'NamedType', name: { kind: 'Name', value: 'Product' } },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          { kind: 'Field', name: { kind: 'Name', value: 'id' } },
          { kind: 'Field', name: { kind: 'Name', value: 'createdAt' } },
          { kind: 'Field', name: { kind: 'Name', value: 'name' } },
          { kind: 'Field', name: { kind: 'Name', value: 'slug' } },
          { kind: 'Field', name: { kind: 'Name', value: 'enabled' } },
          { kind: 'Field', name: { kind: 'Name', value: 'minSalePrice' } },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'variants' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'items' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'sku' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'stock' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'salePrice' } }
                    ]
                  }
                }
              ]
            }
          },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'assets' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'input' },
                value: {
                  kind: 'ObjectValue',
                  fields: [
                    {
                      kind: 'ObjectField',
                      name: { kind: 'Name', value: 'take' },
                      value: { kind: 'IntValue', value: '1' }
                    }
                  ]
                }
              }
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'items' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'source' } }
                    ]
                  }
                }
              ]
            }
          }
        ]
      }
    }
  ]
} as unknown as DocumentNode<GetProductsQuery, GetProductsQueryVariables>;
export const GetProductsExistsDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'GetProductsExists' },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'products' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'input' },
                value: {
                  kind: 'ObjectValue',
                  fields: [
                    {
                      kind: 'ObjectField',
                      name: { kind: 'Name', value: 'take' },
                      value: { kind: 'IntValue', value: '1' }
                    }
                  ]
                }
              }
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [{ kind: 'Field', name: { kind: 'Name', value: 'count' } }]
            }
          }
        ]
      }
    }
  ]
} as unknown as DocumentNode<GetProductsExistsQuery, GetProductsExistsQueryVariables>;
export const GetProductDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'GetProduct' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'id' } },
          type: { kind: 'NamedType', name: { kind: 'Name', value: 'ID' } }
        }
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'product' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'id' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'id' } }
              }
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'FragmentSpread', name: { kind: 'Name', value: 'CommonProduct' } }
              ]
            }
          }
        ]
      }
    },
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'CommonProduct' },
      typeCondition: { kind: 'NamedType', name: { kind: 'Name', value: 'Product' } },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          { kind: 'Field', name: { kind: 'Name', value: 'id' } },
          { kind: 'Field', name: { kind: 'Name', value: 'createdAt' } },
          { kind: 'Field', name: { kind: 'Name', value: 'name' } },
          { kind: 'Field', name: { kind: 'Name', value: 'description' } },
          { kind: 'Field', name: { kind: 'Name', value: 'slug' } },
          { kind: 'Field', name: { kind: 'Name', value: 'enabled' } },
          { kind: 'Field', name: { kind: 'Name', value: 'minSalePrice' } },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'variants' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'items' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'salePrice' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'sku' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'stock' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'comparisonPrice' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'costPerUnit' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'requiresShipping' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'weight' } },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'dimensions' },
                        selectionSet: {
                          kind: 'SelectionSet',
                          selections: [
                            { kind: 'Field', name: { kind: 'Name', value: 'length' } },
                            { kind: 'Field', name: { kind: 'Name', value: 'width' } },
                            { kind: 'Field', name: { kind: 'Name', value: 'height' } }
                          ]
                        }
                      },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'optionValues' },
                        selectionSet: {
                          kind: 'SelectionSet',
                          selections: [
                            { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                            { kind: 'Field', name: { kind: 'Name', value: 'name' } }
                          ]
                        }
                      },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'assets' },
                        selectionSet: {
                          kind: 'SelectionSet',
                          selections: [
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'items' },
                              selectionSet: {
                                kind: 'SelectionSet',
                                selections: [
                                  { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                                  { kind: 'Field', name: { kind: 'Name', value: 'source' } }
                                ]
                              }
                            }
                          ]
                        }
                      }
                    ]
                  }
                }
              ]
            }
          },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'options' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                { kind: 'Field', name: { kind: 'Name', value: 'name' } },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'values' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'name' } }
                    ]
                  }
                }
              ]
            }
          },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'assets' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'items' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'source' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'order' } }
                    ]
                  }
                }
              ]
            }
          }
        ]
      }
    }
  ]
} as unknown as DocumentNode<GetProductQuery, GetProductQueryVariables>;
export const GetProductForTranslationDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'GetProductForTranslation' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'id' } },
          type: { kind: 'NamedType', name: { kind: 'Name', value: 'ID' } }
        }
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'product' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'id' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'id' } }
              }
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                {
                  kind: 'FragmentSpread',
                  name: { kind: 'Name', value: 'CommonProductForTranslation' }
                }
              ]
            }
          }
        ]
      }
    },
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'CommonProductForTranslation' },
      typeCondition: { kind: 'NamedType', name: { kind: 'Name', value: 'Product' } },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          { kind: 'Field', name: { kind: 'Name', value: 'id' } },
          { kind: 'Field', name: { kind: 'Name', value: 'createdAt' } },
          { kind: 'Field', name: { kind: 'Name', value: 'name' } },
          { kind: 'Field', name: { kind: 'Name', value: 'description' } },
          { kind: 'Field', name: { kind: 'Name', value: 'slug' } },
          { kind: 'Field', name: { kind: 'Name', value: 'enabled' } },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'options' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                { kind: 'Field', name: { kind: 'Name', value: 'name' } },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'translations' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'locale' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'name' } }
                    ]
                  }
                },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'values' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'name' } },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'translations' },
                        selectionSet: {
                          kind: 'SelectionSet',
                          selections: [
                            { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                            { kind: 'Field', name: { kind: 'Name', value: 'locale' } },
                            { kind: 'Field', name: { kind: 'Name', value: 'name' } }
                          ]
                        }
                      }
                    ]
                  }
                }
              ]
            }
          },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'translations' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'name' } },
                { kind: 'Field', name: { kind: 'Name', value: 'slug' } },
                { kind: 'Field', name: { kind: 'Name', value: 'description' } },
                { kind: 'Field', name: { kind: 'Name', value: 'locale' } }
              ]
            }
          },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'assets' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'input' },
                value: {
                  kind: 'ObjectValue',
                  fields: [
                    {
                      kind: 'ObjectField',
                      name: { kind: 'Name', value: 'take' },
                      value: { kind: 'IntValue', value: '1' }
                    }
                  ]
                }
              }
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'items' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'source' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'order' } }
                    ]
                  }
                }
              ]
            }
          }
        ]
      }
    }
  ]
} as unknown as DocumentNode<GetProductForTranslationQuery, GetProductForTranslationQueryVariables>;
export const CreateProductDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'mutation',
      name: { kind: 'Name', value: 'CreateProduct' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'input' } },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'CreateProductInput' } }
          }
        }
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'createProduct' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'input' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'input' } }
              }
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [{ kind: 'Field', name: { kind: 'Name', value: 'id' } }]
            }
          }
        ]
      }
    }
  ]
} as unknown as DocumentNode<CreateProductMutation, CreateProductMutationVariables>;
export const UpdateProductDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'mutation',
      name: { kind: 'Name', value: 'UpdateProduct' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'id' } },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'ID' } }
          }
        },
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'input' } },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'UpdateProductInput' } }
          }
        }
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'updateProduct' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'id' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'id' } }
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'input' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'input' } }
              }
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [{ kind: 'Field', name: { kind: 'Name', value: 'id' } }]
            }
          }
        ]
      }
    }
  ]
} as unknown as DocumentNode<UpdateProductMutation, UpdateProductMutationVariables>;
export const RemoveProductsDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'mutation',
      name: { kind: 'Name', value: 'RemoveProducts' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'ids' } },
          type: {
            kind: 'NonNullType',
            type: {
              kind: 'ListType',
              type: {
                kind: 'NonNullType',
                type: { kind: 'NamedType', name: { kind: 'Name', value: 'ID' } }
              }
            }
          }
        }
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'softRemoveProducts' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'ids' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'ids' } }
              }
            ]
          }
        ]
      }
    }
  ]
} as unknown as DocumentNode<RemoveProductsMutation, RemoveProductsMutationVariables>;
export const AddProductTranslationMutationDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'mutation',
      name: { kind: 'Name', value: 'AddProductTranslationMutation' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'id' } },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'ID' } }
          }
        },
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'input' } },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'AddProductTranslationInput' } }
          }
        }
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'addProductTranslation' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'id' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'id' } }
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'input' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'input' } }
              }
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [{ kind: 'Field', name: { kind: 'Name', value: 'id' } }]
            }
          }
        ]
      }
    }
  ]
} as unknown as DocumentNode<
  AddProductTranslationMutationMutation,
  AddProductTranslationMutationMutationVariables
>;
export const GetAllHandlersDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'GetAllHandlers' },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'shippingHandlers' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'FragmentSpread', name: { kind: 'Name', value: 'CommonShippingHandlers' } }
              ]
            }
          }
        ]
      }
    },
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'CommonShippingHandlers' },
      typeCondition: { kind: 'NamedType', name: { kind: 'Name', value: 'ShippingHandler' } },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          { kind: 'Field', name: { kind: 'Name', value: 'name' } },
          { kind: 'Field', name: { kind: 'Name', value: 'code' } },
          { kind: 'Field', name: { kind: 'Name', value: 'args' } }
        ]
      }
    }
  ]
} as unknown as DocumentNode<GetAllHandlersQuery, GetAllHandlersQueryVariables>;
export const CreateShippingMethodDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'mutation',
      name: { kind: 'Name', value: 'CreateShippingMethod' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'input' } },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'CreateShippingMethodInput' } }
          }
        }
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'createShippingMethod' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'input' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'input' } }
              }
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'apiErrors' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: 'code' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'message' } }
                    ]
                  }
                },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'shippingMethod' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [{ kind: 'Field', name: { kind: 'Name', value: 'id' } }]
                  }
                }
              ]
            }
          }
        ]
      }
    }
  ]
} as unknown as DocumentNode<CreateShippingMethodMutation, CreateShippingMethodMutationVariables>;
export const UpdateShippingMethodDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'mutation',
      name: { kind: 'Name', value: 'UpdateShippingMethod' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'id' } },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'ID' } }
          }
        },
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'input' } },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'UpdateShippingMethodInput' } }
          }
        }
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'updateShippingMethod' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'id' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'id' } }
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'input' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'input' } }
              }
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [{ kind: 'Field', name: { kind: 'Name', value: 'id' } }]
            }
          }
        ]
      }
    }
  ]
} as unknown as DocumentNode<UpdateShippingMethodMutation, UpdateShippingMethodMutationVariables>;
export const RemoveShippingMethodDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'mutation',
      name: { kind: 'Name', value: 'RemoveShippingMethod' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'id' } },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'ID' } }
          }
        }
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'removeShippingMethod' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'id' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'id' } }
              }
            ]
          }
        ]
      }
    }
  ]
} as unknown as DocumentNode<RemoveShippingMethodMutation, RemoveShippingMethodMutationVariables>;
export const GetShopsDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'getShops' },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'shops' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'items' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'FragmentSpread', name: { kind: 'Name', value: 'CommonListShop' } }
                    ]
                  }
                }
              ]
            }
          }
        ]
      }
    },
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'CommonListShop' },
      typeCondition: { kind: 'NamedType', name: { kind: 'Name', value: 'Shop' } },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          { kind: 'Field', name: { kind: 'Name', value: 'id' } },
          { kind: 'Field', name: { kind: 'Name', value: 'name' } },
          { kind: 'Field', name: { kind: 'Name', value: 'slug' } }
        ]
      }
    }
  ]
} as unknown as DocumentNode<GetShopsQuery, GetShopsQueryVariables>;
export const ShopDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'Shop' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'slug' } },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'String' } }
          }
        }
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'shop' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'slug' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'slug' } }
              }
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [{ kind: 'FragmentSpread', name: { kind: 'Name', value: 'CommonShop' } }]
            }
          }
        ]
      }
    },
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'CommonShop' },
      typeCondition: { kind: 'NamedType', name: { kind: 'Name', value: 'Shop' } },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          { kind: 'Field', name: { kind: 'Name', value: 'id' } },
          { kind: 'Field', name: { kind: 'Name', value: 'name' } },
          { kind: 'Field', name: { kind: 'Name', value: 'slug' } },
          { kind: 'Field', name: { kind: 'Name', value: 'email' } },
          { kind: 'Field', name: { kind: 'Name', value: 'logo' } },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'socials' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'facebook' } },
                { kind: 'Field', name: { kind: 'Name', value: 'twitter' } },
                { kind: 'Field', name: { kind: 'Name', value: 'instagram' } }
              ]
            }
          },
          { kind: 'Field', name: { kind: 'Name', value: 'phoneNumber' } },
          { kind: 'Field', name: { kind: 'Name', value: 'storefrontApiKey' } }
        ]
      }
    }
  ]
} as unknown as DocumentNode<ShopQuery, ShopQueryVariables>;
export const CreateShopDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'mutation',
      name: { kind: 'Name', value: 'CreateShop' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'input' } },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'CreateShopInput' } }
          }
        }
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'createShop' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'input' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'input' } }
              }
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'apiErrors' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: 'message' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'code' } }
                    ]
                  }
                },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'shop' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'slug' } }
                    ]
                  }
                }
              ]
            }
          }
        ]
      }
    }
  ]
} as unknown as DocumentNode<CreateShopMutation, CreateShopMutationVariables>;
export const UpdateShopDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'mutation',
      name: { kind: 'Name', value: 'UpdateShop' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'shopSlug' } },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'String' } }
          }
        },
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'input' } },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'UpdateShopInput' } }
          }
        }
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'updateShop' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'shopSlug' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'shopSlug' } }
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'input' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'input' } }
              }
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'apiErrors' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: 'message' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'code' } }
                    ]
                  }
                },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'shop' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'slug' } }
                    ]
                  }
                }
              ]
            }
          }
        ]
      }
    }
  ]
} as unknown as DocumentNode<UpdateShopMutation, UpdateShopMutationVariables>;
export const WhoamiDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'Whoami' },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'whoami' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [{ kind: 'FragmentSpread', name: { kind: 'Name', value: 'CommonUser' } }]
            }
          }
        ]
      }
    },
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'CommonUser' },
      typeCondition: { kind: 'NamedType', name: { kind: 'Name', value: 'User' } },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          { kind: 'Field', name: { kind: 'Name', value: 'id' } },
          { kind: 'Field', name: { kind: 'Name', value: 'email' } }
        ]
      }
    }
  ]
} as unknown as DocumentNode<WhoamiQuery, WhoamiQueryVariables>;
export const GenerateAccessTokenDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'mutation',
      name: { kind: 'Name', value: 'GenerateAccessToken' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'input' } },
          type: {
            kind: 'NonNullType',
            type: {
              kind: 'NamedType',
              name: { kind: 'Name', value: 'GenerateUserAccessTokenInput' }
            }
          }
        }
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'generateUserAccessToken' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'input' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'input' } }
              }
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'apiErrors' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: 'code' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'message' } }
                    ]
                  }
                },
                { kind: 'Field', name: { kind: 'Name', value: 'accessToken' } }
              ]
            }
          }
        ]
      }
    }
  ]
} as unknown as DocumentNode<GenerateAccessTokenMutation, GenerateAccessTokenMutationVariables>;
export const CreateVariantDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'mutation',
      name: { kind: 'Name', value: 'CreateVariant' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'productId' } },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'ID' } }
          }
        },
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'input' } },
          type: {
            kind: 'NonNullType',
            type: {
              kind: 'ListType',
              type: {
                kind: 'NonNullType',
                type: { kind: 'NamedType', name: { kind: 'Name', value: 'CreateVariantInput' } }
              }
            }
          }
        }
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'createVariant' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'productId' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'productId' } }
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'input' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'input' } }
              }
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [{ kind: 'Field', name: { kind: 'Name', value: 'id' } }]
            }
          }
        ]
      }
    }
  ]
} as unknown as DocumentNode<CreateVariantMutation, CreateVariantMutationVariables>;
export const UpdateVariantDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'mutation',
      name: { kind: 'Name', value: 'UpdateVariant' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'id' } },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'ID' } }
          }
        },
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'input' } },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'UpdateVariantInput' } }
          }
        }
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'updateVariant' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'id' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'id' } }
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'input' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'input' } }
              }
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [{ kind: 'Field', name: { kind: 'Name', value: 'id' } }]
            }
          }
        ]
      }
    }
  ]
} as unknown as DocumentNode<UpdateVariantMutation, UpdateVariantMutationVariables>;
export const SoftRemoveVariantDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'mutation',
      name: { kind: 'Name', value: 'SoftRemoveVariant' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'id' } },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'ID' } }
          }
        }
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'softRemoveVariant' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'id' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'id' } }
              }
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [{ kind: 'Field', name: { kind: 'Name', value: 'id' } }]
            }
          }
        ]
      }
    }
  ]
} as unknown as DocumentNode<SoftRemoveVariantMutation, SoftRemoveVariantMutationVariables>;
export const GetAllZonesDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'getAllZones' },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'zones' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'FragmentSpread', name: { kind: 'Name', value: 'CommonListZone' } }
              ]
            }
          }
        ]
      }
    },
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'CommonListZone' },
      typeCondition: { kind: 'NamedType', name: { kind: 'Name', value: 'Zone' } },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          { kind: 'Field', name: { kind: 'Name', value: 'id' } },
          { kind: 'Field', name: { kind: 'Name', value: 'name' } },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'shippingMethods' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [{ kind: 'Field', name: { kind: 'Name', value: 'id' } }]
            }
          }
        ]
      }
    }
  ]
} as unknown as DocumentNode<GetAllZonesQuery, GetAllZonesQueryVariables>;
export const GetZoneDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'GetZone' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'id' } },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'ID' } }
          }
        }
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'zone' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'id' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'id' } }
              }
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [{ kind: 'FragmentSpread', name: { kind: 'Name', value: 'CommonZone' } }]
            }
          }
        ]
      }
    },
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'CommonZone' },
      typeCondition: { kind: 'NamedType', name: { kind: 'Name', value: 'Zone' } },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          { kind: 'Field', name: { kind: 'Name', value: 'id' } },
          { kind: 'Field', name: { kind: 'Name', value: 'name' } },
          { kind: 'Field', name: { kind: 'Name', value: 'createdAt' } },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'states' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                { kind: 'Field', name: { kind: 'Name', value: 'name' } }
              ]
            }
          },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'shippingMethods' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                { kind: 'Field', name: { kind: 'Name', value: 'name' } },
                { kind: 'Field', name: { kind: 'Name', value: 'enabled' } },
                { kind: 'Field', name: { kind: 'Name', value: 'pricePreview' } },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'handler' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: 'code' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'args' } }
                    ]
                  }
                }
              ]
            }
          }
        ]
      }
    }
  ]
} as unknown as DocumentNode<GetZoneQuery, GetZoneQueryVariables>;
export const CreateZoneDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'mutation',
      name: { kind: 'Name', value: 'CreateZone' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'input' } },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'CreateZoneInput' } }
          }
        }
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'createZone' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'input' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'input' } }
              }
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [{ kind: 'Field', name: { kind: 'Name', value: 'id' } }]
            }
          }
        ]
      }
    }
  ]
} as unknown as DocumentNode<CreateZoneMutation, CreateZoneMutationVariables>;
export const UpdateZoneDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'mutation',
      name: { kind: 'Name', value: 'UpdateZone' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'id' } },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'ID' } }
          }
        },
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'input' } },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'UpdateZoneInput' } }
          }
        }
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'updateZone' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'id' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'id' } }
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'input' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'input' } }
              }
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [{ kind: 'Field', name: { kind: 'Name', value: 'id' } }]
            }
          }
        ]
      }
    }
  ]
} as unknown as DocumentNode<UpdateZoneMutation, UpdateZoneMutationVariables>;
export const RemoveZoneDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'mutation',
      name: { kind: 'Name', value: 'RemoveZone' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'id' } },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'ID' } }
          }
        }
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'removeZone' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'id' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'id' } }
              }
            ]
          }
        ]
      }
    }
  ]
} as unknown as DocumentNode<RemoveZoneMutation, RemoveZoneMutationVariables>;
