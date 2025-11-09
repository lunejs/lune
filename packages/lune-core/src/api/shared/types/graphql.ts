/* eslint-disable */
import { GraphQLResolveInfo, GraphQLScalarType, GraphQLScalarTypeConfig } from 'graphql';
import { ExecutionContext } from '../context/types';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
export type RequireFields<T, K extends keyof T> = Omit<T, K> & { [P in K]-?: NonNullable<T[P]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  Date: { input: any; output: any; }
  JSON: { input: any; output: any; }
};

export type AddCustomerToOrderInput = {
  email: Scalars['String']['input'];
  firstName?: InputMaybe<Scalars['String']['input']>;
  lastName?: InputMaybe<Scalars['String']['input']>;
  phoneNumber?: InputMaybe<Scalars['String']['input']>;
};

export type AddProductTranslationInput = {
  description?: InputMaybe<Scalars['String']['input']>;
  locale: Locale;
  name?: InputMaybe<Scalars['String']['input']>;
  optionValues?: InputMaybe<Array<OptionValueTranslationInput>>;
  options?: InputMaybe<Array<OptionTranslationInput>>;
};

export type AddShippingFulfillmentInput = {
  methodId: Scalars['ID']['input'];
};

/** A customer's saved address for shipping */
export type Address = {
  __typename?: 'Address';
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
  __typename?: 'Asset';
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
  __typename?: 'AssetList';
  count: Scalars['Int']['output'];
  items: Array<Asset>;
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
  __typename?: 'Collection';
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
  translations: Array<CollectionTranslation>;
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
  __typename?: 'CollectionList';
  count: Scalars['Int']['output'];
  items: Array<Collection>;
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
  __typename?: 'CollectionTranslation';
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
  __typename?: 'Country';
  /** The country's ISO 3166-1 alpha-2 code (e.g., 'MX', 'US', 'CA') */
  code: Scalars['String']['output'];
  createdAt: Scalars['Date']['output'];
  id: Scalars['ID']['output'];
  /** The country's name */
  name: Scalars['String']['output'];
  updatedAt: Scalars['Date']['output'];
};

export type CreateCollectionInput = {
  assets?: InputMaybe<Array<AssetInEntity>>;
  contentType?: InputMaybe<CollectionContentType>;
  description?: InputMaybe<Scalars['String']['input']>;
  enabled?: InputMaybe<Scalars['Boolean']['input']>;
  name: Scalars['String']['input'];
  order?: InputMaybe<Scalars['Int']['input']>;
  products?: InputMaybe<Array<Scalars['ID']['input']>>;
  subCollections?: InputMaybe<Array<Scalars['ID']['input']>>;
};

export type CreateOptionInput = {
  name: Scalars['String']['input'];
  order: Scalars['Int']['input'];
  values: Array<CreateOptionValueInput>;
};

export type CreateOptionValueInput = {
  name: Scalars['String']['input'];
  order: Scalars['Int']['input'];
};

export type CreateOrderAddressInput = {
  city: Scalars['String']['input'];
  countryCode: Scalars['String']['input'];
  fullName: Scalars['String']['input'];
  phoneNumber: Scalars['String']['input'];
  postalCode: Scalars['String']['input'];
  references?: InputMaybe<Scalars['String']['input']>;
  stateCode: Scalars['String']['input'];
  streetLine1: Scalars['String']['input'];
  streetLine2?: InputMaybe<Scalars['String']['input']>;
};

export type CreateOrderInput = {
  line?: InputMaybe<CreateOrderLineInput>;
};

export type CreateOrderLineInput = {
  productVariantId: Scalars['ID']['input'];
  quantity: Scalars['Int']['input'];
};

export type CreateProductInput = {
  assets?: InputMaybe<Array<AssetInEntity>>;
  description?: InputMaybe<Scalars['String']['input']>;
  enabled?: InputMaybe<Scalars['Boolean']['input']>;
  name: Scalars['String']['input'];
  tags?: InputMaybe<Array<Scalars['ID']['input']>>;
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
  __typename?: 'CreateTagsResult';
  apiErrors: Array<TagErrorResult>;
  tags: Array<Tag>;
};

export type CreateUserInput = {
  email: Scalars['String']['input'];
  password: Scalars['String']['input'];
};

export type CreateVariantInput = {
  assets?: InputMaybe<Array<AssetInEntity>>;
  comparisonPrice?: InputMaybe<Scalars['Float']['input']>;
  costPerUnit?: InputMaybe<Scalars['Float']['input']>;
  dimensions?: InputMaybe<DimensionsInput>;
  optionValues?: InputMaybe<Array<Scalars['ID']['input']>>;
  requiresShipping?: InputMaybe<Scalars['Boolean']['input']>;
  salePrice: Scalars['Float']['input'];
  sku?: InputMaybe<Scalars['String']['input']>;
  stock?: InputMaybe<Scalars['Int']['input']>;
  weight?: InputMaybe<Scalars['Float']['input']>;
};

/** A customer is a person who interacts with the shop, whether browsing, purchasing, or managing their profile */
export type Customer = {
  __typename?: 'Customer';
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
  __typename?: 'Dimensions';
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
  __typename?: 'Fulfillment';
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

/** Represents in-store pickup fulfillment configuration for a location */
export type InStorePickup = Node & {
  __typename?: 'InStorePickup';
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
  __typename?: 'InStorePickupFulfillment';
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
  items: Array<Node>;
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
  __typename?: 'Location';
  /** Location's city */
  city: Scalars['String']['output'];
  createdAt: Scalars['Date']['output'];
  /**
   * Whether this location is enabled or not
   * This is used to show/hide location in the storefront
   */
  enabled: Scalars['Boolean']['output'];
  id: Scalars['ID']['output'];
  inStorePickup: InStorePickup;
  /** Name of the location */
  name: Scalars['String']['output'];
  /** Location's phone number */
  phoneNumber: Scalars['String']['output'];
  /** Postal/ZIP code */
  postalCode: Scalars['String']['output'];
  /** Additional references or instructions for finding the location */
  references?: Maybe<Scalars['String']['output']>;
  /** Street address line 1 */
  streetLine1: Scalars['String']['output'];
  /** Street address line 2 (optional) */
  streetLine2?: Maybe<Scalars['String']['output']>;
  updatedAt: Scalars['Date']['output'];
};

export type Mutation = {
  __typename?: 'Mutation';
  addCollectionTranslation: CollectionTranslation;
  addCustomerToOrder: OrderResult;
  addLineToOrder: OrderResult;
  addProductTranslation: ProductTranslation;
  addShippingAddressToOrder: OrderResult;
  addShippingFulfillmentToOrder: OrderResult;
  createCollection: Collection;
  createOption: Array<Option>;
  createOrder: OrderResult;
  createProduct: Product;
  /** Create a new shop */
  createShop: ShopResult;
  createTags: CreateTagsResult;
  /** Create a new user */
  createUser: UserResult;
  createVariant: Array<Maybe<Variant>>;
  /**
   * Generate an access token for a user
   * This token can be used to access user-specific resources
   */
  generateUserAccessToken: UserAccessTokenResult;
  removeCollections: Scalars['Boolean']['output'];
  removeOrderLine: OrderResult;
  removeTags: Scalars['Boolean']['output'];
  softRemoveOption: Option;
  softRemoveOptionValues: Scalars['Boolean']['output'];
  softRemoveProducts: Scalars['Boolean']['output'];
  softRemoveVariant: Variant;
  updateCollection: Collection;
  updateOption: Option;
  updateOrderLine: OrderResult;
  updateProduct: Product;
  /** Update an existing shop details */
  updateShop: ShopResult;
  updateTag: TagResult;
  /** Update an existing user */
  updateUser: UserResult;
  updateVariant: Variant;
};


export type MutationAddCollectionTranslationArgs = {
  id: Scalars['ID']['input'];
  input: CollectionTranslationInput;
};


export type MutationAddCustomerToOrderArgs = {
  input: AddCustomerToOrderInput;
  orderId: Scalars['ID']['input'];
};


export type MutationAddLineToOrderArgs = {
  input: CreateOrderLineInput;
  orderId: Scalars['ID']['input'];
};


export type MutationAddProductTranslationArgs = {
  id: Scalars['ID']['input'];
  input: AddProductTranslationInput;
};


export type MutationAddShippingAddressToOrderArgs = {
  input: CreateOrderAddressInput;
  orderId: Scalars['ID']['input'];
};


export type MutationAddShippingFulfillmentToOrderArgs = {
  input: AddShippingFulfillmentInput;
  orderId: Scalars['ID']['input'];
};


export type MutationCreateCollectionArgs = {
  input: CreateCollectionInput;
};


export type MutationCreateOptionArgs = {
  input: Array<CreateOptionInput>;
  productId: Scalars['ID']['input'];
};


export type MutationCreateOrderArgs = {
  input: CreateOrderInput;
};


export type MutationCreateProductArgs = {
  input: CreateProductInput;
};


export type MutationCreateShopArgs = {
  input: CreateShopInput;
};


export type MutationCreateTagsArgs = {
  input: Array<CreateTagInput>;
};


export type MutationCreateUserArgs = {
  input: CreateUserInput;
};


export type MutationCreateVariantArgs = {
  input: Array<CreateVariantInput>;
  productId: Scalars['ID']['input'];
};


export type MutationGenerateUserAccessTokenArgs = {
  input: GenerateUserAccessTokenInput;
};


export type MutationRemoveCollectionsArgs = {
  ids: Array<Scalars['ID']['input']>;
};


export type MutationRemoveOrderLineArgs = {
  lineId: Scalars['ID']['input'];
};


export type MutationRemoveTagsArgs = {
  ids: Array<Scalars['ID']['input']>;
};


export type MutationSoftRemoveOptionArgs = {
  id: Scalars['ID']['input'];
};


export type MutationSoftRemoveOptionValuesArgs = {
  ids: Array<Scalars['ID']['input']>;
};


export type MutationSoftRemoveProductsArgs = {
  ids: Array<Scalars['ID']['input']>;
};


export type MutationSoftRemoveVariantArgs = {
  id: Scalars['ID']['input'];
};


export type MutationUpdateCollectionArgs = {
  id: Scalars['ID']['input'];
  input: UpdateCollectionInput;
};


export type MutationUpdateOptionArgs = {
  id: Scalars['ID']['input'];
  input: UpdateOptionInput;
};


export type MutationUpdateOrderLineArgs = {
  input: UpdateOrderLineInput;
  lineId: Scalars['ID']['input'];
};


export type MutationUpdateProductArgs = {
  id: Scalars['ID']['input'];
  input: UpdateProductInput;
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

/** A node, each type that represents a entity should implement this interface */
export type Node = {
  createdAt: Scalars['Date']['output'];
  id: Scalars['ID']['output'];
  updatedAt: Scalars['Date']['output'];
};

export type Option = Node & {
  __typename?: 'Option';
  createdAt: Scalars['Date']['output'];
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
  order: Scalars['Int']['output'];
  translations: Array<OptionTranslation>;
  updatedAt: Scalars['Date']['output'];
  values: Array<OptionValue>;
};

export type OptionList = List & {
  __typename?: 'OptionList';
  count: Scalars['Int']['output'];
  items: Array<Option>;
  pageInfo: PageInfo;
};

export type OptionTranslation = {
  __typename?: 'OptionTranslation';
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
  __typename?: 'OptionValue';
  createdAt: Scalars['Date']['output'];
  id: Scalars['ID']['output'];
  metadata?: Maybe<OptionValueMetadata>;
  name: Scalars['String']['output'];
  option: Option;
  order: Scalars['Int']['output'];
  translations: Array<OptionValueTranslation>;
  updatedAt: Scalars['Date']['output'];
};

export type OptionValueFilter = {
  option: Scalars['String']['input'];
  values: Array<Scalars['String']['input']>;
};

export type OptionValueMetadata = {
  __typename?: 'OptionValueMetadata';
  color?: Maybe<Scalars['String']['output']>;
};

export type OptionValueMetadataInput = {
  color?: InputMaybe<Scalars['String']['input']>;
};

export type OptionValueTranslation = {
  __typename?: 'OptionValueTranslation';
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
  __typename?: 'Order';
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
  payments: Array<Payment>;
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
  __typename?: 'OrderAddressJson';
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
  __typename?: 'OrderCancellation';
  createdAt: Scalars['Date']['output'];
  id: Scalars['ID']['output'];
  /** The order that was canceled */
  order: Order;
  /** The reason why the order was canceled */
  reason: Scalars['String']['output'];
  updatedAt: Scalars['Date']['output'];
};

/**  Utils  */
export enum OrderErrorCode {
  ForbiddenOrderAction = 'FORBIDDEN_ORDER_ACTION',
  InvalidCustomerEmail = 'INVALID_CUSTOMER_EMAIL',
  InvalidQuantity = 'INVALID_QUANTITY',
  NotEnoughStock = 'NOT_ENOUGH_STOCK'
}

export type OrderErrorResult = {
  __typename?: 'OrderErrorResult';
  code: OrderErrorCode;
  message: Scalars['String']['output'];
};

/** An order line represents a single item in an order */
export type OrderLine = Node & {
  __typename?: 'OrderLine';
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
  __typename?: 'OrderLineList';
  count: Scalars['Int']['output'];
  items: Array<OrderLine>;
  pageInfo: PageInfo;
};

/**  Results  */
export type OrderResult = {
  __typename?: 'OrderResult';
  apiErrors: Array<OrderErrorResult>;
  order?: Maybe<Order>;
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
  __typename?: 'PageInfo';
  total: Scalars['Int']['output'];
};

/** A payment is a transaction between a customer and a shop, is assigned to an order */
export type Payment = Node & {
  __typename?: 'Payment';
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
  __typename?: 'PaymentCancellation';
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
  __typename?: 'PaymentFailure';
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
  __typename?: 'PaymentMethod';
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
  __typename?: 'PaymentRejection';
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
  __typename?: 'Product';
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
  options: Array<Option>;
  /** A human-friendly unique string for the Product automatically generated from its name */
  slug: Scalars['String']['output'];
  tags: Array<Tag>;
  translations: Array<ProductTranslation>;
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
  optionValues?: InputMaybe<Array<OptionValueFilter>>;
  salePriceRange?: InputMaybe<PriceRange>;
  tag?: InputMaybe<Scalars['String']['input']>;
};

export type ProductList = List & {
  __typename?: 'ProductList';
  count: Scalars['Int']['output'];
  items: Array<Product>;
  pageInfo: PageInfo;
};

export type ProductListInput = {
  /** Filters to apply */
  filters?: InputMaybe<ProductFilters>;
  /** Skip the first n results */
  skip?: InputMaybe<Scalars['Int']['input']>;
  /** Sort order to apply */
  sort?: InputMaybe<ProductSort>;
  /** takes n result from where the skip position is */
  take?: InputMaybe<Scalars['Int']['input']>;
};

export type ProductSort = {
  createdAt?: InputMaybe<OrderBy>;
  name?: InputMaybe<OrderBy>;
  salePrice?: InputMaybe<OrderBy>;
  stock?: InputMaybe<OrderBy>;
};

export type ProductTranslation = {
  __typename?: 'ProductTranslation';
  createdAt: Scalars['Date']['output'];
  description?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  locale: Locale;
  name?: Maybe<Scalars['String']['output']>;
  slug?: Maybe<Scalars['String']['output']>;
  updatedAt: Scalars['Date']['output'];
};

export type Query = {
  __typename?: 'Query';
  collection?: Maybe<Collection>;
  collections: CollectionList;
  order?: Maybe<Order>;
  product?: Maybe<Product>;
  products: ProductList;
  /**
   * Get a list of products by their variant IDs.
   * Useful for fetching products win cases when you only have variant IDs like
   * fetching products from a discount metadata
   */
  productsByVariantIds: ProductList;
  /** Get shop by slug */
  shop?: Maybe<Shop>;
  /** Get a list of shops */
  shops: ShopList;
  tagList: Array<Tag>;
  tags: TagList;
  /** Validate current token of the user in session */
  validateAccessToken?: Maybe<Scalars['Boolean']['output']>;
  variant?: Maybe<Variant>;
  /** Get user in session */
  whoami?: Maybe<User>;
};


export type QueryCollectionArgs = {
  id?: InputMaybe<Scalars['ID']['input']>;
  slug?: InputMaybe<Scalars['String']['input']>;
};


export type QueryCollectionsArgs = {
  input?: InputMaybe<CollectionListInput>;
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
  ids: Array<Scalars['ID']['input']>;
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

/** Represents shipping fulfillment details for an order */
export type ShippingFulfillment = {
  __typename?: 'ShippingFulfillment';
  /** Name of the shipping carrier */
  carrier: Scalars['String']['output'];
  createdAt: Scalars['Date']['output'];
  /** Date and time when the order was delivered */
  deliveredAt: Scalars['Date']['output'];
  id: Scalars['ID']['output'];
  /** Date and time when the order was shipped */
  shippedAt: Scalars['Date']['output'];
  /** Tracking code provided by the carrier */
  trackingCode: Scalars['String']['output'];
  updatedAt: Scalars['Date']['output'];
};

/** A shipping method defines a way to ship products to customers within a specific zone. */
export type ShippingMethod = Node & {
  __typename?: 'ShippingMethod';
  createdAt: Scalars['Date']['output'];
  /** Whether the shipping method is enabled */
  enabled: Scalars['Boolean']['output'];
  /** The shipping method's handler configuration */
  handler: Scalars['JSON']['output'];
  id: Scalars['ID']['output'];
  /** The shipping method's name */
  name: Scalars['String']['output'];
  updatedAt: Scalars['Date']['output'];
  /** The zone this shipping method applies to */
  zone: Zone;
};

/** A lune shop */
export type Shop = Node & {
  __typename?: 'Shop';
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
  __typename?: 'ShopErrorResult';
  code: ShopErrorCode;
  message: Scalars['String']['output'];
};

export type ShopList = List & {
  __typename?: 'ShopList';
  count: Scalars['Int']['output'];
  items: Array<Shop>;
  pageInfo: PageInfo;
};

export type ShopResult = {
  __typename?: 'ShopResult';
  apiErrors: Array<ShopErrorResult>;
  shop?: Maybe<Shop>;
};

export type ShopSocials = {
  __typename?: 'ShopSocials';
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
  __typename?: 'State';
  /** The state's code (e.g., 'JAL', 'CA', 'TX') */
  code: Scalars['String']['output'];
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
  __typename?: 'Tag';
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
  __typename?: 'TagErrorResult';
  code: TagErrorCode;
  message: Scalars['String']['output'];
};

export type TagFilters = {
  name?: InputMaybe<StringFilter>;
};

export type TagList = List & {
  __typename?: 'TagList';
  count: Scalars['Int']['output'];
  items: Array<Tag>;
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
  __typename?: 'TagResult';
  apiErrors: Array<TagErrorResult>;
  tag?: Maybe<Tag>;
};

export type UpdateCollectionInput = {
  assets?: InputMaybe<Array<AssetInEntity>>;
  description?: InputMaybe<Scalars['String']['input']>;
  enabled?: InputMaybe<Scalars['Boolean']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  order?: InputMaybe<Scalars['Int']['input']>;
  products?: InputMaybe<Array<Scalars['ID']['input']>>;
  subCollections?: InputMaybe<Array<Scalars['ID']['input']>>;
};

export type UpdateOptionInput = {
  name?: InputMaybe<Scalars['String']['input']>;
  order?: InputMaybe<Scalars['Int']['input']>;
  values?: InputMaybe<Array<UpdateOptionValueInput>>;
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

export type UpdateOrderLineInput = {
  quantity: Scalars['Int']['input'];
};

export type UpdateProductInput = {
  archived?: InputMaybe<Scalars['Boolean']['input']>;
  assets?: InputMaybe<Array<AssetInEntity>>;
  description?: InputMaybe<Scalars['String']['input']>;
  enabled?: InputMaybe<Scalars['Boolean']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  tags?: InputMaybe<Array<Scalars['ID']['input']>>;
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
  assets?: InputMaybe<Array<AssetInVariantInput>>;
  comparisonPrice?: InputMaybe<Scalars['Float']['input']>;
  costPerUnit?: InputMaybe<Scalars['Float']['input']>;
  dimensions?: InputMaybe<DimensionsInput>;
  optionValues?: InputMaybe<Array<Scalars['ID']['input']>>;
  requiresShipping?: InputMaybe<Scalars['Boolean']['input']>;
  salePrice?: InputMaybe<Scalars['Float']['input']>;
  sku?: InputMaybe<Scalars['String']['input']>;
  stock?: InputMaybe<Scalars['Int']['input']>;
  weight?: InputMaybe<Scalars['Float']['input']>;
};

/** A lune customer */
export type User = Node & {
  __typename?: 'User';
  createdAt: Scalars['Date']['output'];
  /** The user's email (unique) */
  email: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  /** The user's shops */
  shops: ShopList;
  updatedAt: Scalars['Date']['output'];
};

export type UserAccessTokenResult = {
  __typename?: 'UserAccessTokenResult';
  /** The access token for the user, needed to access user-specific resources */
  accessToken?: Maybe<Scalars['String']['output']>;
  apiErrors: Array<UserErrorResult>;
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
  __typename?: 'UserErrorResult';
  code: UserErrorCode;
  message: Scalars['String']['output'];
};

export type UserList = List & {
  __typename?: 'UserList';
  count: Scalars['Int']['output'];
  items: Array<User>;
  pageInfo: PageInfo;
};

export type UserResult = {
  __typename?: 'UserResult';
  apiErrors: Array<UserErrorResult>;
  user?: Maybe<User>;
};

/**
 * A variant is a specific version of a product.
 * For example, a product can have a variant with a specific color, size, or material.
 */
export type Variant = Node & {
  __typename?: 'Variant';
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
  optionValues: Array<OptionValue>;
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
  __typename?: 'VariantList';
  count: Scalars['Int']['output'];
  items: Array<Variant>;
  pageInfo: PageInfo;
};

/** A zone represents a geographical area for shipping purposes. */
export type Zone = Node & {
  __typename?: 'Zone';
  createdAt: Scalars['Date']['output'];
  id: Scalars['ID']['output'];
  /** The zone's name */
  name: Scalars['String']['output'];
  /** The zone's states */
  states: Array<State>;
  updatedAt: Scalars['Date']['output'];
};



export type ResolverTypeWrapper<T> = Promise<T> | T;


export type ResolverWithResolve<TResult, TParent, TContext, TArgs> = {
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};
export type Resolver<TResult, TParent = {}, TContext = {}, TArgs = {}> = ResolverFn<TResult, TParent, TContext, TArgs> | ResolverWithResolve<TResult, TParent, TContext, TArgs>;

export type ResolverFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => Promise<TResult> | TResult;

export type SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => AsyncIterable<TResult> | Promise<AsyncIterable<TResult>>;

export type SubscriptionResolveFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

export interface SubscriptionSubscriberObject<TResult, TKey extends string, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<{ [key in TKey]: TResult }, TParent, TContext, TArgs>;
  resolve?: SubscriptionResolveFn<TResult, { [key in TKey]: TResult }, TContext, TArgs>;
}

export interface SubscriptionResolverObject<TResult, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<any, TParent, TContext, TArgs>;
  resolve: SubscriptionResolveFn<TResult, any, TContext, TArgs>;
}

export type SubscriptionObject<TResult, TKey extends string, TParent, TContext, TArgs> =
  | SubscriptionSubscriberObject<TResult, TKey, TParent, TContext, TArgs>
  | SubscriptionResolverObject<TResult, TParent, TContext, TArgs>;

export type SubscriptionResolver<TResult, TKey extends string, TParent = {}, TContext = {}, TArgs = {}> =
  | ((...args: any[]) => SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>)
  | SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>;

export type TypeResolveFn<TTypes, TParent = {}, TContext = {}> = (
  parent: TParent,
  context: TContext,
  info: GraphQLResolveInfo
) => Maybe<TTypes> | Promise<Maybe<TTypes>>;

export type IsTypeOfResolverFn<T = {}, TContext = {}> = (obj: T, context: TContext, info: GraphQLResolveInfo) => boolean | Promise<boolean>;

export type NextResolverFn<T> = () => Promise<T>;

export type DirectiveResolverFn<TResult = {}, TParent = {}, TContext = {}, TArgs = {}> = (
  next: NextResolverFn<TResult>,
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

/** Mapping of union types */
export type ResolversUnionTypes<_RefType extends Record<string, unknown>> = {
  FulfillmentDetails: ( InStorePickupFulfillment ) | ( ShippingFulfillment );
  PaymentDetails: ( Omit<PaymentCancellation, 'payment'> & { payment: _RefType['Payment'] } ) | ( Omit<PaymentFailure, 'payment'> & { payment: _RefType['Payment'] } ) | ( Omit<PaymentRejection, 'payment'> & { payment: _RefType['Payment'] } );
};

/** Mapping of interface types */
export type ResolversInterfaceTypes<_RefType extends Record<string, unknown>> = {
  List: ( AssetList ) | ( CollectionList ) | ( OptionList ) | ( OrderLineList ) | ( ProductList ) | ( ShopList ) | ( TagList ) | ( UserList ) | ( VariantList );
  Node: ( Asset ) | ( Collection ) | ( Omit<Fulfillment, 'details'> & { details: _RefType['FulfillmentDetails'] } ) | ( InStorePickup ) | ( Option ) | ( OptionValue ) | ( Omit<Order, 'fulfillment' | 'payments'> & { fulfillment?: Maybe<_RefType['Fulfillment']>, payments: Array<_RefType['Payment']> } ) | ( Omit<OrderCancellation, 'order'> & { order: _RefType['Order'] } ) | ( OrderLine ) | ( Omit<Payment, 'details'> & { details?: Maybe<_RefType['PaymentDetails']> } ) | ( Omit<PaymentCancellation, 'payment'> & { payment: _RefType['Payment'] } ) | ( Omit<PaymentFailure, 'payment'> & { payment: _RefType['Payment'] } ) | ( PaymentMethod ) | ( Omit<PaymentRejection, 'payment'> & { payment: _RefType['Payment'] } ) | ( Product ) | ( ShippingMethod ) | ( Shop ) | ( Tag ) | ( User ) | ( Variant ) | ( Zone );
};

/** Mapping between all available schema types and the resolvers types */
export type ResolversTypes = {
  AddCustomerToOrderInput: AddCustomerToOrderInput;
  AddProductTranslationInput: AddProductTranslationInput;
  AddShippingFulfillmentInput: AddShippingFulfillmentInput;
  Address: ResolverTypeWrapper<Address>;
  Asset: ResolverTypeWrapper<Asset>;
  AssetInEntity: AssetInEntity;
  AssetInVariantInput: AssetInVariantInput;
  AssetList: ResolverTypeWrapper<AssetList>;
  AssetType: AssetType;
  Boolean: ResolverTypeWrapper<Scalars['Boolean']['output']>;
  BooleanFilter: BooleanFilter;
  Collection: ResolverTypeWrapper<Collection>;
  CollectionContentType: CollectionContentType;
  CollectionFilters: CollectionFilters;
  CollectionList: ResolverTypeWrapper<CollectionList>;
  CollectionListInput: CollectionListInput;
  CollectionTranslation: ResolverTypeWrapper<CollectionTranslation>;
  CollectionTranslationInput: CollectionTranslationInput;
  Country: ResolverTypeWrapper<Country>;
  CreateCollectionInput: CreateCollectionInput;
  CreateOptionInput: CreateOptionInput;
  CreateOptionValueInput: CreateOptionValueInput;
  CreateOrderAddressInput: CreateOrderAddressInput;
  CreateOrderInput: CreateOrderInput;
  CreateOrderLineInput: CreateOrderLineInput;
  CreateProductInput: CreateProductInput;
  CreateShopInput: CreateShopInput;
  CreateTagInput: CreateTagInput;
  CreateTagsResult: ResolverTypeWrapper<CreateTagsResult>;
  CreateUserInput: CreateUserInput;
  CreateVariantInput: CreateVariantInput;
  Customer: ResolverTypeWrapper<Customer>;
  Date: ResolverTypeWrapper<Scalars['Date']['output']>;
  Dimensions: ResolverTypeWrapper<Dimensions>;
  DimensionsInput: DimensionsInput;
  Float: ResolverTypeWrapper<Scalars['Float']['output']>;
  Fulfillment: ResolverTypeWrapper<Omit<Fulfillment, 'details'> & { details: ResolversTypes['FulfillmentDetails'] }>;
  FulfillmentDetails: ResolverTypeWrapper<ResolversUnionTypes<ResolversTypes>['FulfillmentDetails']>;
  FulfillmentType: FulfillmentType;
  GenerateUserAccessTokenInput: GenerateUserAccessTokenInput;
  ID: ResolverTypeWrapper<Scalars['ID']['output']>;
  InStorePickup: ResolverTypeWrapper<InStorePickup>;
  InStorePickupFulfillment: ResolverTypeWrapper<InStorePickupFulfillment>;
  Int: ResolverTypeWrapper<Scalars['Int']['output']>;
  JSON: ResolverTypeWrapper<Scalars['JSON']['output']>;
  List: ResolverTypeWrapper<ResolversInterfaceTypes<ResolversTypes>['List']>;
  ListInput: ListInput;
  Locale: Locale;
  Location: ResolverTypeWrapper<Location>;
  Mutation: ResolverTypeWrapper<{}>;
  Node: ResolverTypeWrapper<ResolversInterfaceTypes<ResolversTypes>['Node']>;
  Option: ResolverTypeWrapper<Option>;
  OptionList: ResolverTypeWrapper<OptionList>;
  OptionTranslation: ResolverTypeWrapper<OptionTranslation>;
  OptionTranslationInput: OptionTranslationInput;
  OptionValue: ResolverTypeWrapper<OptionValue>;
  OptionValueFilter: OptionValueFilter;
  OptionValueMetadata: ResolverTypeWrapper<OptionValueMetadata>;
  OptionValueMetadataInput: OptionValueMetadataInput;
  OptionValueTranslation: ResolverTypeWrapper<OptionValueTranslation>;
  OptionValueTranslationInput: OptionValueTranslationInput;
  Order: ResolverTypeWrapper<Omit<Order, 'fulfillment' | 'payments'> & { fulfillment?: Maybe<ResolversTypes['Fulfillment']>, payments: Array<ResolversTypes['Payment']> }>;
  OrderAddressJson: ResolverTypeWrapper<OrderAddressJson>;
  OrderBy: OrderBy;
  OrderCancellation: ResolverTypeWrapper<Omit<OrderCancellation, 'order'> & { order: ResolversTypes['Order'] }>;
  OrderErrorCode: OrderErrorCode;
  OrderErrorResult: ResolverTypeWrapper<OrderErrorResult>;
  OrderLine: ResolverTypeWrapper<OrderLine>;
  OrderLineList: ResolverTypeWrapper<OrderLineList>;
  OrderResult: ResolverTypeWrapper<Omit<OrderResult, 'order'> & { order?: Maybe<ResolversTypes['Order']> }>;
  OrderState: OrderState;
  PageInfo: ResolverTypeWrapper<PageInfo>;
  Payment: ResolverTypeWrapper<Omit<Payment, 'details'> & { details?: Maybe<ResolversTypes['PaymentDetails']> }>;
  PaymentCancellation: ResolverTypeWrapper<Omit<PaymentCancellation, 'payment'> & { payment: ResolversTypes['Payment'] }>;
  PaymentDetails: ResolverTypeWrapper<ResolversUnionTypes<ResolversTypes>['PaymentDetails']>;
  PaymentFailure: ResolverTypeWrapper<Omit<PaymentFailure, 'payment'> & { payment: ResolversTypes['Payment'] }>;
  PaymentMethod: ResolverTypeWrapper<PaymentMethod>;
  PaymentRejection: ResolverTypeWrapper<Omit<PaymentRejection, 'payment'> & { payment: ResolversTypes['Payment'] }>;
  PaymentState: PaymentState;
  PriceRange: PriceRange;
  Product: ResolverTypeWrapper<Product>;
  ProductFilters: ProductFilters;
  ProductList: ResolverTypeWrapper<ProductList>;
  ProductListInput: ProductListInput;
  ProductSort: ProductSort;
  ProductTranslation: ResolverTypeWrapper<ProductTranslation>;
  Query: ResolverTypeWrapper<{}>;
  ShippingFulfillment: ResolverTypeWrapper<ShippingFulfillment>;
  ShippingMethod: ResolverTypeWrapper<ShippingMethod>;
  Shop: ResolverTypeWrapper<Shop>;
  ShopErrorCode: ShopErrorCode;
  ShopErrorResult: ResolverTypeWrapper<ShopErrorResult>;
  ShopList: ResolverTypeWrapper<ShopList>;
  ShopResult: ResolverTypeWrapper<ShopResult>;
  ShopSocials: ResolverTypeWrapper<ShopSocials>;
  ShopSocialsInput: ShopSocialsInput;
  State: ResolverTypeWrapper<State>;
  String: ResolverTypeWrapper<Scalars['String']['output']>;
  StringFilter: StringFilter;
  Tag: ResolverTypeWrapper<Tag>;
  TagErrorCode: TagErrorCode;
  TagErrorResult: ResolverTypeWrapper<TagErrorResult>;
  TagFilters: TagFilters;
  TagList: ResolverTypeWrapper<TagList>;
  TagListInput: TagListInput;
  TagResult: ResolverTypeWrapper<TagResult>;
  UpdateCollectionInput: UpdateCollectionInput;
  UpdateOptionInput: UpdateOptionInput;
  UpdateOptionValueInput: UpdateOptionValueInput;
  UpdateOrderLineInput: UpdateOrderLineInput;
  UpdateProductInput: UpdateProductInput;
  UpdateShopInput: UpdateShopInput;
  UpdateTagInput: UpdateTagInput;
  UpdateUserInput: UpdateUserInput;
  UpdateVariantInput: UpdateVariantInput;
  User: ResolverTypeWrapper<User>;
  UserAccessTokenResult: ResolverTypeWrapper<UserAccessTokenResult>;
  UserErrorCode: UserErrorCode;
  UserErrorResult: ResolverTypeWrapper<UserErrorResult>;
  UserList: ResolverTypeWrapper<UserList>;
  UserResult: ResolverTypeWrapper<UserResult>;
  Variant: ResolverTypeWrapper<Variant>;
  VariantList: ResolverTypeWrapper<VariantList>;
  Zone: ResolverTypeWrapper<Zone>;
};

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = {
  AddCustomerToOrderInput: AddCustomerToOrderInput;
  AddProductTranslationInput: AddProductTranslationInput;
  AddShippingFulfillmentInput: AddShippingFulfillmentInput;
  Address: Address;
  Asset: Asset;
  AssetInEntity: AssetInEntity;
  AssetInVariantInput: AssetInVariantInput;
  AssetList: AssetList;
  Boolean: Scalars['Boolean']['output'];
  BooleanFilter: BooleanFilter;
  Collection: Collection;
  CollectionFilters: CollectionFilters;
  CollectionList: CollectionList;
  CollectionListInput: CollectionListInput;
  CollectionTranslation: CollectionTranslation;
  CollectionTranslationInput: CollectionTranslationInput;
  Country: Country;
  CreateCollectionInput: CreateCollectionInput;
  CreateOptionInput: CreateOptionInput;
  CreateOptionValueInput: CreateOptionValueInput;
  CreateOrderAddressInput: CreateOrderAddressInput;
  CreateOrderInput: CreateOrderInput;
  CreateOrderLineInput: CreateOrderLineInput;
  CreateProductInput: CreateProductInput;
  CreateShopInput: CreateShopInput;
  CreateTagInput: CreateTagInput;
  CreateTagsResult: CreateTagsResult;
  CreateUserInput: CreateUserInput;
  CreateVariantInput: CreateVariantInput;
  Customer: Customer;
  Date: Scalars['Date']['output'];
  Dimensions: Dimensions;
  DimensionsInput: DimensionsInput;
  Float: Scalars['Float']['output'];
  Fulfillment: Omit<Fulfillment, 'details'> & { details: ResolversParentTypes['FulfillmentDetails'] };
  FulfillmentDetails: ResolversUnionTypes<ResolversParentTypes>['FulfillmentDetails'];
  GenerateUserAccessTokenInput: GenerateUserAccessTokenInput;
  ID: Scalars['ID']['output'];
  InStorePickup: InStorePickup;
  InStorePickupFulfillment: InStorePickupFulfillment;
  Int: Scalars['Int']['output'];
  JSON: Scalars['JSON']['output'];
  List: ResolversInterfaceTypes<ResolversParentTypes>['List'];
  ListInput: ListInput;
  Location: Location;
  Mutation: {};
  Node: ResolversInterfaceTypes<ResolversParentTypes>['Node'];
  Option: Option;
  OptionList: OptionList;
  OptionTranslation: OptionTranslation;
  OptionTranslationInput: OptionTranslationInput;
  OptionValue: OptionValue;
  OptionValueFilter: OptionValueFilter;
  OptionValueMetadata: OptionValueMetadata;
  OptionValueMetadataInput: OptionValueMetadataInput;
  OptionValueTranslation: OptionValueTranslation;
  OptionValueTranslationInput: OptionValueTranslationInput;
  Order: Omit<Order, 'fulfillment' | 'payments'> & { fulfillment?: Maybe<ResolversParentTypes['Fulfillment']>, payments: Array<ResolversParentTypes['Payment']> };
  OrderAddressJson: OrderAddressJson;
  OrderCancellation: Omit<OrderCancellation, 'order'> & { order: ResolversParentTypes['Order'] };
  OrderErrorResult: OrderErrorResult;
  OrderLine: OrderLine;
  OrderLineList: OrderLineList;
  OrderResult: Omit<OrderResult, 'order'> & { order?: Maybe<ResolversParentTypes['Order']> };
  PageInfo: PageInfo;
  Payment: Omit<Payment, 'details'> & { details?: Maybe<ResolversParentTypes['PaymentDetails']> };
  PaymentCancellation: Omit<PaymentCancellation, 'payment'> & { payment: ResolversParentTypes['Payment'] };
  PaymentDetails: ResolversUnionTypes<ResolversParentTypes>['PaymentDetails'];
  PaymentFailure: Omit<PaymentFailure, 'payment'> & { payment: ResolversParentTypes['Payment'] };
  PaymentMethod: PaymentMethod;
  PaymentRejection: Omit<PaymentRejection, 'payment'> & { payment: ResolversParentTypes['Payment'] };
  PriceRange: PriceRange;
  Product: Product;
  ProductFilters: ProductFilters;
  ProductList: ProductList;
  ProductListInput: ProductListInput;
  ProductSort: ProductSort;
  ProductTranslation: ProductTranslation;
  Query: {};
  ShippingFulfillment: ShippingFulfillment;
  ShippingMethod: ShippingMethod;
  Shop: Shop;
  ShopErrorResult: ShopErrorResult;
  ShopList: ShopList;
  ShopResult: ShopResult;
  ShopSocials: ShopSocials;
  ShopSocialsInput: ShopSocialsInput;
  State: State;
  String: Scalars['String']['output'];
  StringFilter: StringFilter;
  Tag: Tag;
  TagErrorResult: TagErrorResult;
  TagFilters: TagFilters;
  TagList: TagList;
  TagListInput: TagListInput;
  TagResult: TagResult;
  UpdateCollectionInput: UpdateCollectionInput;
  UpdateOptionInput: UpdateOptionInput;
  UpdateOptionValueInput: UpdateOptionValueInput;
  UpdateOrderLineInput: UpdateOrderLineInput;
  UpdateProductInput: UpdateProductInput;
  UpdateShopInput: UpdateShopInput;
  UpdateTagInput: UpdateTagInput;
  UpdateUserInput: UpdateUserInput;
  UpdateVariantInput: UpdateVariantInput;
  User: User;
  UserAccessTokenResult: UserAccessTokenResult;
  UserErrorResult: UserErrorResult;
  UserList: UserList;
  UserResult: UserResult;
  Variant: Variant;
  VariantList: VariantList;
  Zone: Zone;
};

export type AddressResolvers<ContextType = ExecutionContext, ParentType extends ResolversParentTypes['Address'] = ResolversParentTypes['Address']> = {
  city?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  country?: Resolver<ResolversTypes['Country'], ParentType, ContextType>;
  createdAt?: Resolver<ResolversTypes['Date'], ParentType, ContextType>;
  fullName?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  isDefault?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  phoneNumber?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  postalCode?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  references?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  state?: Resolver<ResolversTypes['State'], ParentType, ContextType>;
  streetLine1?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  streetLine2?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  updatedAt?: Resolver<ResolversTypes['Date'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type AssetResolvers<ContextType = ExecutionContext, ParentType extends ResolversParentTypes['Asset'] = ResolversParentTypes['Asset']> = {
  createdAt?: Resolver<ResolversTypes['Date'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  order?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  source?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  type?: Resolver<ResolversTypes['AssetType'], ParentType, ContextType>;
  updatedAt?: Resolver<ResolversTypes['Date'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type AssetListResolvers<ContextType = ExecutionContext, ParentType extends ResolversParentTypes['AssetList'] = ResolversParentTypes['AssetList']> = {
  count?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  items?: Resolver<Array<ResolversTypes['Asset']>, ParentType, ContextType>;
  pageInfo?: Resolver<ResolversTypes['PageInfo'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type CollectionResolvers<ContextType = ExecutionContext, ParentType extends ResolversParentTypes['Collection'] = ResolversParentTypes['Collection']> = {
  assets?: Resolver<ResolversTypes['AssetList'], ParentType, ContextType, Partial<CollectionAssetsArgs>>;
  contentType?: Resolver<ResolversTypes['CollectionContentType'], ParentType, ContextType>;
  createdAt?: Resolver<ResolversTypes['Date'], ParentType, ContextType>;
  description?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  enabled?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  order?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  parentCollection?: Resolver<Maybe<ResolversTypes['Collection']>, ParentType, ContextType>;
  products?: Resolver<ResolversTypes['ProductList'], ParentType, ContextType, Partial<CollectionProductsArgs>>;
  slug?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  subCollections?: Resolver<ResolversTypes['CollectionList'], ParentType, ContextType, Partial<CollectionSubCollectionsArgs>>;
  translations?: Resolver<Array<ResolversTypes['CollectionTranslation']>, ParentType, ContextType>;
  updatedAt?: Resolver<ResolversTypes['Date'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type CollectionListResolvers<ContextType = ExecutionContext, ParentType extends ResolversParentTypes['CollectionList'] = ResolversParentTypes['CollectionList']> = {
  count?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  items?: Resolver<Array<ResolversTypes['Collection']>, ParentType, ContextType>;
  pageInfo?: Resolver<ResolversTypes['PageInfo'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type CollectionTranslationResolvers<ContextType = ExecutionContext, ParentType extends ResolversParentTypes['CollectionTranslation'] = ResolversParentTypes['CollectionTranslation']> = {
  createdAt?: Resolver<ResolversTypes['Date'], ParentType, ContextType>;
  description?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  locale?: Resolver<ResolversTypes['Locale'], ParentType, ContextType>;
  name?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  slug?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  updatedAt?: Resolver<ResolversTypes['Date'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type CountryResolvers<ContextType = ExecutionContext, ParentType extends ResolversParentTypes['Country'] = ResolversParentTypes['Country']> = {
  code?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  createdAt?: Resolver<ResolversTypes['Date'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  updatedAt?: Resolver<ResolversTypes['Date'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type CreateTagsResultResolvers<ContextType = ExecutionContext, ParentType extends ResolversParentTypes['CreateTagsResult'] = ResolversParentTypes['CreateTagsResult']> = {
  apiErrors?: Resolver<Array<ResolversTypes['TagErrorResult']>, ParentType, ContextType>;
  tags?: Resolver<Array<ResolversTypes['Tag']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type CustomerResolvers<ContextType = ExecutionContext, ParentType extends ResolversParentTypes['Customer'] = ResolversParentTypes['Customer']> = {
  createdAt?: Resolver<ResolversTypes['Date'], ParentType, ContextType>;
  email?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  enabled?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  firstName?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  lastName?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  phoneNumber?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  updatedAt?: Resolver<ResolversTypes['Date'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export interface DateScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['Date'], any> {
  name: 'Date';
}

export type DimensionsResolvers<ContextType = ExecutionContext, ParentType extends ResolversParentTypes['Dimensions'] = ResolversParentTypes['Dimensions']> = {
  height?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  length?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  width?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type FulfillmentResolvers<ContextType = ExecutionContext, ParentType extends ResolversParentTypes['Fulfillment'] = ResolversParentTypes['Fulfillment']> = {
  amount?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  createdAt?: Resolver<ResolversTypes['Date'], ParentType, ContextType>;
  details?: Resolver<ResolversTypes['FulfillmentDetails'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  type?: Resolver<ResolversTypes['FulfillmentType'], ParentType, ContextType>;
  updatedAt?: Resolver<ResolversTypes['Date'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type FulfillmentDetailsResolvers<ContextType = ExecutionContext, ParentType extends ResolversParentTypes['FulfillmentDetails'] = ResolversParentTypes['FulfillmentDetails']> = {
  __resolveType: TypeResolveFn<'InStorePickupFulfillment' | 'ShippingFulfillment', ParentType, ContextType>;
};

export type InStorePickupResolvers<ContextType = ExecutionContext, ParentType extends ResolversParentTypes['InStorePickup'] = ResolversParentTypes['InStorePickup']> = {
  createdAt?: Resolver<ResolversTypes['Date'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  instructions?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  isAvailable?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  updatedAt?: Resolver<ResolversTypes['Date'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type InStorePickupFulfillmentResolvers<ContextType = ExecutionContext, ParentType extends ResolversParentTypes['InStorePickupFulfillment'] = ResolversParentTypes['InStorePickupFulfillment']> = {
  address?: Resolver<ResolversTypes['JSON'], ParentType, ContextType>;
  createdAt?: Resolver<ResolversTypes['Date'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  location?: Resolver<ResolversTypes['Location'], ParentType, ContextType>;
  pickedUpAt?: Resolver<ResolversTypes['Date'], ParentType, ContextType>;
  readyAt?: Resolver<ResolversTypes['Date'], ParentType, ContextType>;
  updatedAt?: Resolver<ResolversTypes['Date'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export interface JsonScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['JSON'], any> {
  name: 'JSON';
}

export type ListResolvers<ContextType = ExecutionContext, ParentType extends ResolversParentTypes['List'] = ResolversParentTypes['List']> = {
  __resolveType: TypeResolveFn<'AssetList' | 'CollectionList' | 'OptionList' | 'OrderLineList' | 'ProductList' | 'ShopList' | 'TagList' | 'UserList' | 'VariantList', ParentType, ContextType>;
  count?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  items?: Resolver<Array<ResolversTypes['Node']>, ParentType, ContextType>;
  pageInfo?: Resolver<ResolversTypes['PageInfo'], ParentType, ContextType>;
};

export type LocationResolvers<ContextType = ExecutionContext, ParentType extends ResolversParentTypes['Location'] = ResolversParentTypes['Location']> = {
  city?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  createdAt?: Resolver<ResolversTypes['Date'], ParentType, ContextType>;
  enabled?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  inStorePickup?: Resolver<ResolversTypes['InStorePickup'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  phoneNumber?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  postalCode?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  references?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  streetLine1?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  streetLine2?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  updatedAt?: Resolver<ResolversTypes['Date'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type MutationResolvers<ContextType = ExecutionContext, ParentType extends ResolversParentTypes['Mutation'] = ResolversParentTypes['Mutation']> = {
  addCollectionTranslation?: Resolver<ResolversTypes['CollectionTranslation'], ParentType, ContextType, RequireFields<MutationAddCollectionTranslationArgs, 'id' | 'input'>>;
  addCustomerToOrder?: Resolver<ResolversTypes['OrderResult'], ParentType, ContextType, RequireFields<MutationAddCustomerToOrderArgs, 'input' | 'orderId'>>;
  addLineToOrder?: Resolver<ResolversTypes['OrderResult'], ParentType, ContextType, RequireFields<MutationAddLineToOrderArgs, 'input' | 'orderId'>>;
  addProductTranslation?: Resolver<ResolversTypes['ProductTranslation'], ParentType, ContextType, RequireFields<MutationAddProductTranslationArgs, 'id' | 'input'>>;
  addShippingAddressToOrder?: Resolver<ResolversTypes['OrderResult'], ParentType, ContextType, RequireFields<MutationAddShippingAddressToOrderArgs, 'input' | 'orderId'>>;
  addShippingFulfillmentToOrder?: Resolver<ResolversTypes['OrderResult'], ParentType, ContextType, RequireFields<MutationAddShippingFulfillmentToOrderArgs, 'input' | 'orderId'>>;
  createCollection?: Resolver<ResolversTypes['Collection'], ParentType, ContextType, RequireFields<MutationCreateCollectionArgs, 'input'>>;
  createOption?: Resolver<Array<ResolversTypes['Option']>, ParentType, ContextType, RequireFields<MutationCreateOptionArgs, 'input' | 'productId'>>;
  createOrder?: Resolver<ResolversTypes['OrderResult'], ParentType, ContextType, RequireFields<MutationCreateOrderArgs, 'input'>>;
  createProduct?: Resolver<ResolversTypes['Product'], ParentType, ContextType, RequireFields<MutationCreateProductArgs, 'input'>>;
  createShop?: Resolver<ResolversTypes['ShopResult'], ParentType, ContextType, RequireFields<MutationCreateShopArgs, 'input'>>;
  createTags?: Resolver<ResolversTypes['CreateTagsResult'], ParentType, ContextType, RequireFields<MutationCreateTagsArgs, 'input'>>;
  createUser?: Resolver<ResolversTypes['UserResult'], ParentType, ContextType, RequireFields<MutationCreateUserArgs, 'input'>>;
  createVariant?: Resolver<Array<Maybe<ResolversTypes['Variant']>>, ParentType, ContextType, RequireFields<MutationCreateVariantArgs, 'input' | 'productId'>>;
  generateUserAccessToken?: Resolver<ResolversTypes['UserAccessTokenResult'], ParentType, ContextType, RequireFields<MutationGenerateUserAccessTokenArgs, 'input'>>;
  removeCollections?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType, RequireFields<MutationRemoveCollectionsArgs, 'ids'>>;
  removeOrderLine?: Resolver<ResolversTypes['OrderResult'], ParentType, ContextType, RequireFields<MutationRemoveOrderLineArgs, 'lineId'>>;
  removeTags?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType, RequireFields<MutationRemoveTagsArgs, 'ids'>>;
  softRemoveOption?: Resolver<ResolversTypes['Option'], ParentType, ContextType, RequireFields<MutationSoftRemoveOptionArgs, 'id'>>;
  softRemoveOptionValues?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType, RequireFields<MutationSoftRemoveOptionValuesArgs, 'ids'>>;
  softRemoveProducts?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType, RequireFields<MutationSoftRemoveProductsArgs, 'ids'>>;
  softRemoveVariant?: Resolver<ResolversTypes['Variant'], ParentType, ContextType, RequireFields<MutationSoftRemoveVariantArgs, 'id'>>;
  updateCollection?: Resolver<ResolversTypes['Collection'], ParentType, ContextType, RequireFields<MutationUpdateCollectionArgs, 'id' | 'input'>>;
  updateOption?: Resolver<ResolversTypes['Option'], ParentType, ContextType, RequireFields<MutationUpdateOptionArgs, 'id' | 'input'>>;
  updateOrderLine?: Resolver<ResolversTypes['OrderResult'], ParentType, ContextType, RequireFields<MutationUpdateOrderLineArgs, 'input' | 'lineId'>>;
  updateProduct?: Resolver<ResolversTypes['Product'], ParentType, ContextType, RequireFields<MutationUpdateProductArgs, 'id' | 'input'>>;
  updateShop?: Resolver<ResolversTypes['ShopResult'], ParentType, ContextType, RequireFields<MutationUpdateShopArgs, 'input' | 'shopSlug'>>;
  updateTag?: Resolver<ResolversTypes['TagResult'], ParentType, ContextType, RequireFields<MutationUpdateTagArgs, 'id' | 'input'>>;
  updateUser?: Resolver<ResolversTypes['UserResult'], ParentType, ContextType, RequireFields<MutationUpdateUserArgs, 'id' | 'input'>>;
  updateVariant?: Resolver<ResolversTypes['Variant'], ParentType, ContextType, RequireFields<MutationUpdateVariantArgs, 'id' | 'input'>>;
};

export type NodeResolvers<ContextType = ExecutionContext, ParentType extends ResolversParentTypes['Node'] = ResolversParentTypes['Node']> = {
  __resolveType: TypeResolveFn<'Asset' | 'Collection' | 'Fulfillment' | 'InStorePickup' | 'Option' | 'OptionValue' | 'Order' | 'OrderCancellation' | 'OrderLine' | 'Payment' | 'PaymentCancellation' | 'PaymentFailure' | 'PaymentMethod' | 'PaymentRejection' | 'Product' | 'ShippingMethod' | 'Shop' | 'Tag' | 'User' | 'Variant' | 'Zone', ParentType, ContextType>;
  createdAt?: Resolver<ResolversTypes['Date'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  updatedAt?: Resolver<ResolversTypes['Date'], ParentType, ContextType>;
};

export type OptionResolvers<ContextType = ExecutionContext, ParentType extends ResolversParentTypes['Option'] = ResolversParentTypes['Option']> = {
  createdAt?: Resolver<ResolversTypes['Date'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  order?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  translations?: Resolver<Array<ResolversTypes['OptionTranslation']>, ParentType, ContextType>;
  updatedAt?: Resolver<ResolversTypes['Date'], ParentType, ContextType>;
  values?: Resolver<Array<ResolversTypes['OptionValue']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type OptionListResolvers<ContextType = ExecutionContext, ParentType extends ResolversParentTypes['OptionList'] = ResolversParentTypes['OptionList']> = {
  count?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  items?: Resolver<Array<ResolversTypes['Option']>, ParentType, ContextType>;
  pageInfo?: Resolver<ResolversTypes['PageInfo'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type OptionTranslationResolvers<ContextType = ExecutionContext, ParentType extends ResolversParentTypes['OptionTranslation'] = ResolversParentTypes['OptionTranslation']> = {
  createdAt?: Resolver<ResolversTypes['Date'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  locale?: Resolver<ResolversTypes['Locale'], ParentType, ContextType>;
  name?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  updatedAt?: Resolver<ResolversTypes['Date'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type OptionValueResolvers<ContextType = ExecutionContext, ParentType extends ResolversParentTypes['OptionValue'] = ResolversParentTypes['OptionValue']> = {
  createdAt?: Resolver<ResolversTypes['Date'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  metadata?: Resolver<Maybe<ResolversTypes['OptionValueMetadata']>, ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  option?: Resolver<ResolversTypes['Option'], ParentType, ContextType>;
  order?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  translations?: Resolver<Array<ResolversTypes['OptionValueTranslation']>, ParentType, ContextType>;
  updatedAt?: Resolver<ResolversTypes['Date'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type OptionValueMetadataResolvers<ContextType = ExecutionContext, ParentType extends ResolversParentTypes['OptionValueMetadata'] = ResolversParentTypes['OptionValueMetadata']> = {
  color?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type OptionValueTranslationResolvers<ContextType = ExecutionContext, ParentType extends ResolversParentTypes['OptionValueTranslation'] = ResolversParentTypes['OptionValueTranslation']> = {
  createdAt?: Resolver<ResolversTypes['Date'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  locale?: Resolver<ResolversTypes['Locale'], ParentType, ContextType>;
  name?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  updatedAt?: Resolver<ResolversTypes['Date'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type OrderResolvers<ContextType = ExecutionContext, ParentType extends ResolversParentTypes['Order'] = ResolversParentTypes['Order']> = {
  code?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  completedAt?: Resolver<Maybe<ResolversTypes['Date']>, ParentType, ContextType>;
  createdAt?: Resolver<ResolversTypes['Date'], ParentType, ContextType>;
  customer?: Resolver<Maybe<ResolversTypes['Customer']>, ParentType, ContextType>;
  fulfillment?: Resolver<Maybe<ResolversTypes['Fulfillment']>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  lines?: Resolver<ResolversTypes['OrderLineList'], ParentType, ContextType>;
  payments?: Resolver<Array<ResolversTypes['Payment']>, ParentType, ContextType>;
  placedAt?: Resolver<Maybe<ResolversTypes['Date']>, ParentType, ContextType>;
  shippingAddress?: Resolver<Maybe<ResolversTypes['OrderAddressJson']>, ParentType, ContextType>;
  state?: Resolver<ResolversTypes['OrderState'], ParentType, ContextType>;
  subtotal?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  total?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  totalQuantity?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  updatedAt?: Resolver<ResolversTypes['Date'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type OrderAddressJsonResolvers<ContextType = ExecutionContext, ParentType extends ResolversParentTypes['OrderAddressJson'] = ResolversParentTypes['OrderAddressJson']> = {
  city?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  country?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  countryCode?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  fullName?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  phoneNumber?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  postalCode?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  references?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  state?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  stateCode?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  streetLine1?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  streetLine2?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type OrderCancellationResolvers<ContextType = ExecutionContext, ParentType extends ResolversParentTypes['OrderCancellation'] = ResolversParentTypes['OrderCancellation']> = {
  createdAt?: Resolver<ResolversTypes['Date'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  order?: Resolver<ResolversTypes['Order'], ParentType, ContextType>;
  reason?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  updatedAt?: Resolver<ResolversTypes['Date'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type OrderErrorResultResolvers<ContextType = ExecutionContext, ParentType extends ResolversParentTypes['OrderErrorResult'] = ResolversParentTypes['OrderErrorResult']> = {
  code?: Resolver<ResolversTypes['OrderErrorCode'], ParentType, ContextType>;
  message?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type OrderLineResolvers<ContextType = ExecutionContext, ParentType extends ResolversParentTypes['OrderLine'] = ResolversParentTypes['OrderLine']> = {
  createdAt?: Resolver<ResolversTypes['Date'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  lineSubtotal?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  lineTotal?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  quantity?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  unitPrice?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  updatedAt?: Resolver<ResolversTypes['Date'], ParentType, ContextType>;
  variant?: Resolver<ResolversTypes['Variant'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type OrderLineListResolvers<ContextType = ExecutionContext, ParentType extends ResolversParentTypes['OrderLineList'] = ResolversParentTypes['OrderLineList']> = {
  count?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  items?: Resolver<Array<ResolversTypes['OrderLine']>, ParentType, ContextType>;
  pageInfo?: Resolver<ResolversTypes['PageInfo'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type OrderResultResolvers<ContextType = ExecutionContext, ParentType extends ResolversParentTypes['OrderResult'] = ResolversParentTypes['OrderResult']> = {
  apiErrors?: Resolver<Array<ResolversTypes['OrderErrorResult']>, ParentType, ContextType>;
  order?: Resolver<Maybe<ResolversTypes['Order']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type PageInfoResolvers<ContextType = ExecutionContext, ParentType extends ResolversParentTypes['PageInfo'] = ResolversParentTypes['PageInfo']> = {
  total?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type PaymentResolvers<ContextType = ExecutionContext, ParentType extends ResolversParentTypes['Payment'] = ResolversParentTypes['Payment']> = {
  amount?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  createdAt?: Resolver<ResolversTypes['Date'], ParentType, ContextType>;
  details?: Resolver<Maybe<ResolversTypes['PaymentDetails']>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  method?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  paymentMethod?: Resolver<ResolversTypes['PaymentMethod'], ParentType, ContextType>;
  state?: Resolver<ResolversTypes['PaymentState'], ParentType, ContextType>;
  transactionId?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  updatedAt?: Resolver<ResolversTypes['Date'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type PaymentCancellationResolvers<ContextType = ExecutionContext, ParentType extends ResolversParentTypes['PaymentCancellation'] = ResolversParentTypes['PaymentCancellation']> = {
  createdAt?: Resolver<ResolversTypes['Date'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  payment?: Resolver<ResolversTypes['Payment'], ParentType, ContextType>;
  reason?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  updatedAt?: Resolver<ResolversTypes['Date'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type PaymentDetailsResolvers<ContextType = ExecutionContext, ParentType extends ResolversParentTypes['PaymentDetails'] = ResolversParentTypes['PaymentDetails']> = {
  __resolveType: TypeResolveFn<'PaymentCancellation' | 'PaymentFailure' | 'PaymentRejection', ParentType, ContextType>;
};

export type PaymentFailureResolvers<ContextType = ExecutionContext, ParentType extends ResolversParentTypes['PaymentFailure'] = ResolversParentTypes['PaymentFailure']> = {
  createdAt?: Resolver<ResolversTypes['Date'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  payment?: Resolver<ResolversTypes['Payment'], ParentType, ContextType>;
  reason?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  updatedAt?: Resolver<ResolversTypes['Date'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type PaymentMethodResolvers<ContextType = ExecutionContext, ParentType extends ResolversParentTypes['PaymentMethod'] = ResolversParentTypes['PaymentMethod']> = {
  createdAt?: Resolver<ResolversTypes['Date'], ParentType, ContextType>;
  enabled?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  handler?: Resolver<ResolversTypes['JSON'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  updatedAt?: Resolver<ResolversTypes['Date'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type PaymentRejectionResolvers<ContextType = ExecutionContext, ParentType extends ResolversParentTypes['PaymentRejection'] = ResolversParentTypes['PaymentRejection']> = {
  createdAt?: Resolver<ResolversTypes['Date'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  payment?: Resolver<ResolversTypes['Payment'], ParentType, ContextType>;
  reason?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  updatedAt?: Resolver<ResolversTypes['Date'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ProductResolvers<ContextType = ExecutionContext, ParentType extends ResolversParentTypes['Product'] = ResolversParentTypes['Product']> = {
  archived?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  assets?: Resolver<ResolversTypes['AssetList'], ParentType, ContextType, Partial<ProductAssetsArgs>>;
  createdAt?: Resolver<ResolversTypes['Date'], ParentType, ContextType>;
  description?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  enabled?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  maxSalePrice?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  minSalePrice?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  options?: Resolver<Array<ResolversTypes['Option']>, ParentType, ContextType, Partial<ProductOptionsArgs>>;
  slug?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  tags?: Resolver<Array<ResolversTypes['Tag']>, ParentType, ContextType>;
  translations?: Resolver<Array<ResolversTypes['ProductTranslation']>, ParentType, ContextType>;
  updatedAt?: Resolver<ResolversTypes['Date'], ParentType, ContextType>;
  variants?: Resolver<ResolversTypes['VariantList'], ParentType, ContextType, Partial<ProductVariantsArgs>>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ProductListResolvers<ContextType = ExecutionContext, ParentType extends ResolversParentTypes['ProductList'] = ResolversParentTypes['ProductList']> = {
  count?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  items?: Resolver<Array<ResolversTypes['Product']>, ParentType, ContextType>;
  pageInfo?: Resolver<ResolversTypes['PageInfo'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ProductTranslationResolvers<ContextType = ExecutionContext, ParentType extends ResolversParentTypes['ProductTranslation'] = ResolversParentTypes['ProductTranslation']> = {
  createdAt?: Resolver<ResolversTypes['Date'], ParentType, ContextType>;
  description?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  locale?: Resolver<ResolversTypes['Locale'], ParentType, ContextType>;
  name?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  slug?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  updatedAt?: Resolver<ResolversTypes['Date'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type QueryResolvers<ContextType = ExecutionContext, ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']> = {
  collection?: Resolver<Maybe<ResolversTypes['Collection']>, ParentType, ContextType, Partial<QueryCollectionArgs>>;
  collections?: Resolver<ResolversTypes['CollectionList'], ParentType, ContextType, Partial<QueryCollectionsArgs>>;
  order?: Resolver<Maybe<ResolversTypes['Order']>, ParentType, ContextType, Partial<QueryOrderArgs>>;
  product?: Resolver<Maybe<ResolversTypes['Product']>, ParentType, ContextType, Partial<QueryProductArgs>>;
  products?: Resolver<ResolversTypes['ProductList'], ParentType, ContextType, Partial<QueryProductsArgs>>;
  productsByVariantIds?: Resolver<ResolversTypes['ProductList'], ParentType, ContextType, RequireFields<QueryProductsByVariantIdsArgs, 'ids'>>;
  shop?: Resolver<Maybe<ResolversTypes['Shop']>, ParentType, ContextType, RequireFields<QueryShopArgs, 'slug'>>;
  shops?: Resolver<ResolversTypes['ShopList'], ParentType, ContextType, Partial<QueryShopsArgs>>;
  tagList?: Resolver<Array<ResolversTypes['Tag']>, ParentType, ContextType>;
  tags?: Resolver<ResolversTypes['TagList'], ParentType, ContextType, Partial<QueryTagsArgs>>;
  validateAccessToken?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  variant?: Resolver<Maybe<ResolversTypes['Variant']>, ParentType, ContextType, RequireFields<QueryVariantArgs, 'id'>>;
  whoami?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType>;
};

export type ShippingFulfillmentResolvers<ContextType = ExecutionContext, ParentType extends ResolversParentTypes['ShippingFulfillment'] = ResolversParentTypes['ShippingFulfillment']> = {
  carrier?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  createdAt?: Resolver<ResolversTypes['Date'], ParentType, ContextType>;
  deliveredAt?: Resolver<ResolversTypes['Date'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  shippedAt?: Resolver<ResolversTypes['Date'], ParentType, ContextType>;
  trackingCode?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  updatedAt?: Resolver<ResolversTypes['Date'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ShippingMethodResolvers<ContextType = ExecutionContext, ParentType extends ResolversParentTypes['ShippingMethod'] = ResolversParentTypes['ShippingMethod']> = {
  createdAt?: Resolver<ResolversTypes['Date'], ParentType, ContextType>;
  enabled?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  handler?: Resolver<ResolversTypes['JSON'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  updatedAt?: Resolver<ResolversTypes['Date'], ParentType, ContextType>;
  zone?: Resolver<ResolversTypes['Zone'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ShopResolvers<ContextType = ExecutionContext, ParentType extends ResolversParentTypes['Shop'] = ResolversParentTypes['Shop']> = {
  createdAt?: Resolver<ResolversTypes['Date'], ParentType, ContextType>;
  email?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  logo?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  owner?: Resolver<ResolversTypes['User'], ParentType, ContextType>;
  phoneNumber?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  slug?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  socials?: Resolver<Maybe<ResolversTypes['ShopSocials']>, ParentType, ContextType>;
  storefrontApiKey?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  storefrontUrl?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  updatedAt?: Resolver<ResolversTypes['Date'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ShopErrorResultResolvers<ContextType = ExecutionContext, ParentType extends ResolversParentTypes['ShopErrorResult'] = ResolversParentTypes['ShopErrorResult']> = {
  code?: Resolver<ResolversTypes['ShopErrorCode'], ParentType, ContextType>;
  message?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ShopListResolvers<ContextType = ExecutionContext, ParentType extends ResolversParentTypes['ShopList'] = ResolversParentTypes['ShopList']> = {
  count?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  items?: Resolver<Array<ResolversTypes['Shop']>, ParentType, ContextType>;
  pageInfo?: Resolver<ResolversTypes['PageInfo'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ShopResultResolvers<ContextType = ExecutionContext, ParentType extends ResolversParentTypes['ShopResult'] = ResolversParentTypes['ShopResult']> = {
  apiErrors?: Resolver<Array<ResolversTypes['ShopErrorResult']>, ParentType, ContextType>;
  shop?: Resolver<Maybe<ResolversTypes['Shop']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ShopSocialsResolvers<ContextType = ExecutionContext, ParentType extends ResolversParentTypes['ShopSocials'] = ResolversParentTypes['ShopSocials']> = {
  facebook?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  instagram?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  twitter?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type StateResolvers<ContextType = ExecutionContext, ParentType extends ResolversParentTypes['State'] = ResolversParentTypes['State']> = {
  code?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  createdAt?: Resolver<ResolversTypes['Date'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  updatedAt?: Resolver<ResolversTypes['Date'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type TagResolvers<ContextType = ExecutionContext, ParentType extends ResolversParentTypes['Tag'] = ResolversParentTypes['Tag']> = {
  createdAt?: Resolver<ResolversTypes['Date'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  updatedAt?: Resolver<ResolversTypes['Date'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type TagErrorResultResolvers<ContextType = ExecutionContext, ParentType extends ResolversParentTypes['TagErrorResult'] = ResolversParentTypes['TagErrorResult']> = {
  code?: Resolver<ResolversTypes['TagErrorCode'], ParentType, ContextType>;
  message?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type TagListResolvers<ContextType = ExecutionContext, ParentType extends ResolversParentTypes['TagList'] = ResolversParentTypes['TagList']> = {
  count?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  items?: Resolver<Array<ResolversTypes['Tag']>, ParentType, ContextType>;
  pageInfo?: Resolver<ResolversTypes['PageInfo'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type TagResultResolvers<ContextType = ExecutionContext, ParentType extends ResolversParentTypes['TagResult'] = ResolversParentTypes['TagResult']> = {
  apiErrors?: Resolver<Array<ResolversTypes['TagErrorResult']>, ParentType, ContextType>;
  tag?: Resolver<Maybe<ResolversTypes['Tag']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type UserResolvers<ContextType = ExecutionContext, ParentType extends ResolversParentTypes['User'] = ResolversParentTypes['User']> = {
  createdAt?: Resolver<ResolversTypes['Date'], ParentType, ContextType>;
  email?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  shops?: Resolver<ResolversTypes['ShopList'], ParentType, ContextType>;
  updatedAt?: Resolver<ResolversTypes['Date'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type UserAccessTokenResultResolvers<ContextType = ExecutionContext, ParentType extends ResolversParentTypes['UserAccessTokenResult'] = ResolversParentTypes['UserAccessTokenResult']> = {
  accessToken?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  apiErrors?: Resolver<Array<ResolversTypes['UserErrorResult']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type UserErrorResultResolvers<ContextType = ExecutionContext, ParentType extends ResolversParentTypes['UserErrorResult'] = ResolversParentTypes['UserErrorResult']> = {
  code?: Resolver<ResolversTypes['UserErrorCode'], ParentType, ContextType>;
  message?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type UserListResolvers<ContextType = ExecutionContext, ParentType extends ResolversParentTypes['UserList'] = ResolversParentTypes['UserList']> = {
  count?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  items?: Resolver<Array<ResolversTypes['User']>, ParentType, ContextType>;
  pageInfo?: Resolver<ResolversTypes['PageInfo'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type UserResultResolvers<ContextType = ExecutionContext, ParentType extends ResolversParentTypes['UserResult'] = ResolversParentTypes['UserResult']> = {
  apiErrors?: Resolver<Array<ResolversTypes['UserErrorResult']>, ParentType, ContextType>;
  user?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type VariantResolvers<ContextType = ExecutionContext, ParentType extends ResolversParentTypes['Variant'] = ResolversParentTypes['Variant']> = {
  assets?: Resolver<ResolversTypes['AssetList'], ParentType, ContextType, Partial<VariantAssetsArgs>>;
  comparisonPrice?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  costPerUnit?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  createdAt?: Resolver<ResolversTypes['Date'], ParentType, ContextType>;
  deletedAt?: Resolver<Maybe<ResolversTypes['Date']>, ParentType, ContextType>;
  dimensions?: Resolver<Maybe<ResolversTypes['Dimensions']>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  optionValues?: Resolver<Array<ResolversTypes['OptionValue']>, ParentType, ContextType>;
  product?: Resolver<ResolversTypes['Product'], ParentType, ContextType>;
  requiresShipping?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  salePrice?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  sku?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  stock?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  updatedAt?: Resolver<ResolversTypes['Date'], ParentType, ContextType>;
  weight?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type VariantListResolvers<ContextType = ExecutionContext, ParentType extends ResolversParentTypes['VariantList'] = ResolversParentTypes['VariantList']> = {
  count?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  items?: Resolver<Array<ResolversTypes['Variant']>, ParentType, ContextType>;
  pageInfo?: Resolver<ResolversTypes['PageInfo'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ZoneResolvers<ContextType = ExecutionContext, ParentType extends ResolversParentTypes['Zone'] = ResolversParentTypes['Zone']> = {
  createdAt?: Resolver<ResolversTypes['Date'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  states?: Resolver<Array<ResolversTypes['State']>, ParentType, ContextType>;
  updatedAt?: Resolver<ResolversTypes['Date'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type Resolvers<ContextType = ExecutionContext> = {
  Address?: AddressResolvers<ContextType>;
  Asset?: AssetResolvers<ContextType>;
  AssetList?: AssetListResolvers<ContextType>;
  Collection?: CollectionResolvers<ContextType>;
  CollectionList?: CollectionListResolvers<ContextType>;
  CollectionTranslation?: CollectionTranslationResolvers<ContextType>;
  Country?: CountryResolvers<ContextType>;
  CreateTagsResult?: CreateTagsResultResolvers<ContextType>;
  Customer?: CustomerResolvers<ContextType>;
  Date?: GraphQLScalarType;
  Dimensions?: DimensionsResolvers<ContextType>;
  Fulfillment?: FulfillmentResolvers<ContextType>;
  FulfillmentDetails?: FulfillmentDetailsResolvers<ContextType>;
  InStorePickup?: InStorePickupResolvers<ContextType>;
  InStorePickupFulfillment?: InStorePickupFulfillmentResolvers<ContextType>;
  JSON?: GraphQLScalarType;
  List?: ListResolvers<ContextType>;
  Location?: LocationResolvers<ContextType>;
  Mutation?: MutationResolvers<ContextType>;
  Node?: NodeResolvers<ContextType>;
  Option?: OptionResolvers<ContextType>;
  OptionList?: OptionListResolvers<ContextType>;
  OptionTranslation?: OptionTranslationResolvers<ContextType>;
  OptionValue?: OptionValueResolvers<ContextType>;
  OptionValueMetadata?: OptionValueMetadataResolvers<ContextType>;
  OptionValueTranslation?: OptionValueTranslationResolvers<ContextType>;
  Order?: OrderResolvers<ContextType>;
  OrderAddressJson?: OrderAddressJsonResolvers<ContextType>;
  OrderCancellation?: OrderCancellationResolvers<ContextType>;
  OrderErrorResult?: OrderErrorResultResolvers<ContextType>;
  OrderLine?: OrderLineResolvers<ContextType>;
  OrderLineList?: OrderLineListResolvers<ContextType>;
  OrderResult?: OrderResultResolvers<ContextType>;
  PageInfo?: PageInfoResolvers<ContextType>;
  Payment?: PaymentResolvers<ContextType>;
  PaymentCancellation?: PaymentCancellationResolvers<ContextType>;
  PaymentDetails?: PaymentDetailsResolvers<ContextType>;
  PaymentFailure?: PaymentFailureResolvers<ContextType>;
  PaymentMethod?: PaymentMethodResolvers<ContextType>;
  PaymentRejection?: PaymentRejectionResolvers<ContextType>;
  Product?: ProductResolvers<ContextType>;
  ProductList?: ProductListResolvers<ContextType>;
  ProductTranslation?: ProductTranslationResolvers<ContextType>;
  Query?: QueryResolvers<ContextType>;
  ShippingFulfillment?: ShippingFulfillmentResolvers<ContextType>;
  ShippingMethod?: ShippingMethodResolvers<ContextType>;
  Shop?: ShopResolvers<ContextType>;
  ShopErrorResult?: ShopErrorResultResolvers<ContextType>;
  ShopList?: ShopListResolvers<ContextType>;
  ShopResult?: ShopResultResolvers<ContextType>;
  ShopSocials?: ShopSocialsResolvers<ContextType>;
  State?: StateResolvers<ContextType>;
  Tag?: TagResolvers<ContextType>;
  TagErrorResult?: TagErrorResultResolvers<ContextType>;
  TagList?: TagListResolvers<ContextType>;
  TagResult?: TagResultResolvers<ContextType>;
  User?: UserResolvers<ContextType>;
  UserAccessTokenResult?: UserAccessTokenResultResolvers<ContextType>;
  UserErrorResult?: UserErrorResultResolvers<ContextType>;
  UserList?: UserListResolvers<ContextType>;
  UserResult?: UserResultResolvers<ContextType>;
  Variant?: VariantResolvers<ContextType>;
  VariantList?: VariantListResolvers<ContextType>;
  Zone?: ZoneResolvers<ContextType>;
};

