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

export type AddProductTranslationInput = {
  description?: InputMaybe<Scalars['String']['input']>;
  locale: Locale;
  name?: InputMaybe<Scalars['String']['input']>;
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

export type AssetInProductInput = {
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

export type CreateOptionInput = {
  name: Scalars['String']['input'];
  order: Scalars['Int']['input'];
  values: Array<CreateOptionValueInput>;
};

export type CreateOptionValueInput = {
  metadata: OptionValueMetadataInput;
  name: Scalars['String']['input'];
  order: Scalars['Int']['input'];
};

export type CreateProductInput = {
  assets?: InputMaybe<Array<AssetInProductInput>>;
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
  assetId?: InputMaybe<Scalars['ID']['input']>;
  assets?: InputMaybe<Array<AssetInProductInput>>;
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

export type GenerateUserAccessTokenInput = {
  email: Scalars['String']['input'];
  password: Scalars['String']['input'];
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
  Es = 'es'
}

export type Mutation = {
  __typename?: 'Mutation';
  addProductTranslation: ProductTranslation;
  createOption: Array<Option>;
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
  removeTags: Scalars['Boolean']['output'];
  softRemoveOption: Option;
  softRemoveOptionValues: Scalars['Boolean']['output'];
  softRemoveProduct: Scalars['Boolean']['output'];
  softRemoveVariant: Variant;
  updateOption: Option;
  updateProduct: Product;
  /** Update an existing shop details */
  updateShop: ShopResult;
  updateTag: TagResult;
  /** Update an existing user */
  updateUser: UserResult;
  updateVariant: Variant;
};


export type MutationAddProductTranslationArgs = {
  id: Scalars['ID']['input'];
  input: AddProductTranslationInput;
};


export type MutationCreateOptionArgs = {
  input: Array<CreateOptionInput>;
  productId: Scalars['ID']['input'];
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


export type MutationRemoveTagsArgs = {
  ids: Array<Scalars['ID']['input']>;
};


export type MutationSoftRemoveOptionArgs = {
  id: Scalars['ID']['input'];
};


export type MutationSoftRemoveOptionValuesArgs = {
  ids: Array<Scalars['ID']['input']>;
};


export type MutationSoftRemoveProductArgs = {
  ids: Array<Scalars['ID']['input']>;
};


export type MutationSoftRemoveVariantArgs = {
  id: Scalars['ID']['input'];
};


export type MutationUpdateOptionArgs = {
  id: Scalars['ID']['input'];
  input: UpdateOptionInput;
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
  updatedAt: Scalars['Date']['output'];
  values: Array<OptionValue>;
};

export type OptionList = List & {
  __typename?: 'OptionList';
  count: Scalars['Int']['output'];
  items: Array<Option>;
  pageInfo: PageInfo;
};

export type OptionValue = Node & {
  __typename?: 'OptionValue';
  createdAt: Scalars['Date']['output'];
  id: Scalars['ID']['output'];
  metadata?: Maybe<OptionValueMetadata>;
  name: Scalars['String']['output'];
  option: Option;
  order: Scalars['Int']['output'];
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

export enum OrderBy {
  Asc = 'ASC',
  Desc = 'DESC'
}

export type PageInfo = {
  __typename?: 'PageInfo';
  total: Scalars['Int']['output'];
};

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

/** A vendyx shop */
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
  metadata?: InputMaybe<OptionValueMetadataInput>;
  name?: InputMaybe<Scalars['String']['input']>;
  order?: InputMaybe<Scalars['Int']['input']>;
};

export type UpdateProductInput = {
  archived?: InputMaybe<Scalars['Boolean']['input']>;
  assets?: InputMaybe<Array<AssetInProductInput>>;
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

/** A vendyx customer */
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


/** Mapping of interface types */
export type ResolversInterfaceTypes<_RefType extends Record<string, unknown>> = {
  List: ( AssetList ) | ( OptionList ) | ( ProductList ) | ( ShopList ) | ( TagList ) | ( UserList ) | ( VariantList );
  Node: ( Asset ) | ( Option ) | ( OptionValue ) | ( Product ) | ( Shop ) | ( Tag ) | ( User ) | ( Variant );
};

/** Mapping between all available schema types and the resolvers types */
export type ResolversTypes = {
  AddProductTranslationInput: AddProductTranslationInput;
  Asset: ResolverTypeWrapper<Asset>;
  AssetInProductInput: AssetInProductInput;
  AssetInVariantInput: AssetInVariantInput;
  AssetList: ResolverTypeWrapper<AssetList>;
  AssetType: AssetType;
  Boolean: ResolverTypeWrapper<Scalars['Boolean']['output']>;
  BooleanFilter: BooleanFilter;
  CreateOptionInput: CreateOptionInput;
  CreateOptionValueInput: CreateOptionValueInput;
  CreateProductInput: CreateProductInput;
  CreateShopInput: CreateShopInput;
  CreateTagInput: CreateTagInput;
  CreateTagsResult: ResolverTypeWrapper<CreateTagsResult>;
  CreateUserInput: CreateUserInput;
  CreateVariantInput: CreateVariantInput;
  Date: ResolverTypeWrapper<Scalars['Date']['output']>;
  Dimensions: ResolverTypeWrapper<Dimensions>;
  DimensionsInput: DimensionsInput;
  Float: ResolverTypeWrapper<Scalars['Float']['output']>;
  GenerateUserAccessTokenInput: GenerateUserAccessTokenInput;
  ID: ResolverTypeWrapper<Scalars['ID']['output']>;
  Int: ResolverTypeWrapper<Scalars['Int']['output']>;
  JSON: ResolverTypeWrapper<Scalars['JSON']['output']>;
  List: ResolverTypeWrapper<ResolversInterfaceTypes<ResolversTypes>['List']>;
  ListInput: ListInput;
  Locale: Locale;
  Mutation: ResolverTypeWrapper<{}>;
  Node: ResolverTypeWrapper<ResolversInterfaceTypes<ResolversTypes>['Node']>;
  Option: ResolverTypeWrapper<Option>;
  OptionList: ResolverTypeWrapper<OptionList>;
  OptionValue: ResolverTypeWrapper<OptionValue>;
  OptionValueFilter: OptionValueFilter;
  OptionValueMetadata: ResolverTypeWrapper<OptionValueMetadata>;
  OptionValueMetadataInput: OptionValueMetadataInput;
  OrderBy: OrderBy;
  PageInfo: ResolverTypeWrapper<PageInfo>;
  PriceRange: PriceRange;
  Product: ResolverTypeWrapper<Product>;
  ProductFilters: ProductFilters;
  ProductList: ResolverTypeWrapper<ProductList>;
  ProductListInput: ProductListInput;
  ProductSort: ProductSort;
  ProductTranslation: ResolverTypeWrapper<ProductTranslation>;
  Query: ResolverTypeWrapper<{}>;
  Shop: ResolverTypeWrapper<Shop>;
  ShopErrorCode: ShopErrorCode;
  ShopErrorResult: ResolverTypeWrapper<ShopErrorResult>;
  ShopList: ResolverTypeWrapper<ShopList>;
  ShopResult: ResolverTypeWrapper<ShopResult>;
  ShopSocials: ResolverTypeWrapper<ShopSocials>;
  ShopSocialsInput: ShopSocialsInput;
  String: ResolverTypeWrapper<Scalars['String']['output']>;
  StringFilter: StringFilter;
  Tag: ResolverTypeWrapper<Tag>;
  TagErrorCode: TagErrorCode;
  TagErrorResult: ResolverTypeWrapper<TagErrorResult>;
  TagFilters: TagFilters;
  TagList: ResolverTypeWrapper<TagList>;
  TagListInput: TagListInput;
  TagResult: ResolverTypeWrapper<TagResult>;
  UpdateOptionInput: UpdateOptionInput;
  UpdateOptionValueInput: UpdateOptionValueInput;
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
};

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = {
  AddProductTranslationInput: AddProductTranslationInput;
  Asset: Asset;
  AssetInProductInput: AssetInProductInput;
  AssetInVariantInput: AssetInVariantInput;
  AssetList: AssetList;
  Boolean: Scalars['Boolean']['output'];
  BooleanFilter: BooleanFilter;
  CreateOptionInput: CreateOptionInput;
  CreateOptionValueInput: CreateOptionValueInput;
  CreateProductInput: CreateProductInput;
  CreateShopInput: CreateShopInput;
  CreateTagInput: CreateTagInput;
  CreateTagsResult: CreateTagsResult;
  CreateUserInput: CreateUserInput;
  CreateVariantInput: CreateVariantInput;
  Date: Scalars['Date']['output'];
  Dimensions: Dimensions;
  DimensionsInput: DimensionsInput;
  Float: Scalars['Float']['output'];
  GenerateUserAccessTokenInput: GenerateUserAccessTokenInput;
  ID: Scalars['ID']['output'];
  Int: Scalars['Int']['output'];
  JSON: Scalars['JSON']['output'];
  List: ResolversInterfaceTypes<ResolversParentTypes>['List'];
  ListInput: ListInput;
  Mutation: {};
  Node: ResolversInterfaceTypes<ResolversParentTypes>['Node'];
  Option: Option;
  OptionList: OptionList;
  OptionValue: OptionValue;
  OptionValueFilter: OptionValueFilter;
  OptionValueMetadata: OptionValueMetadata;
  OptionValueMetadataInput: OptionValueMetadataInput;
  PageInfo: PageInfo;
  PriceRange: PriceRange;
  Product: Product;
  ProductFilters: ProductFilters;
  ProductList: ProductList;
  ProductListInput: ProductListInput;
  ProductSort: ProductSort;
  ProductTranslation: ProductTranslation;
  Query: {};
  Shop: Shop;
  ShopErrorResult: ShopErrorResult;
  ShopList: ShopList;
  ShopResult: ShopResult;
  ShopSocials: ShopSocials;
  ShopSocialsInput: ShopSocialsInput;
  String: Scalars['String']['output'];
  StringFilter: StringFilter;
  Tag: Tag;
  TagErrorResult: TagErrorResult;
  TagFilters: TagFilters;
  TagList: TagList;
  TagListInput: TagListInput;
  TagResult: TagResult;
  UpdateOptionInput: UpdateOptionInput;
  UpdateOptionValueInput: UpdateOptionValueInput;
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

export type CreateTagsResultResolvers<ContextType = ExecutionContext, ParentType extends ResolversParentTypes['CreateTagsResult'] = ResolversParentTypes['CreateTagsResult']> = {
  apiErrors?: Resolver<Array<ResolversTypes['TagErrorResult']>, ParentType, ContextType>;
  tags?: Resolver<Array<ResolversTypes['Tag']>, ParentType, ContextType>;
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

export interface JsonScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['JSON'], any> {
  name: 'JSON';
}

export type ListResolvers<ContextType = ExecutionContext, ParentType extends ResolversParentTypes['List'] = ResolversParentTypes['List']> = {
  __resolveType: TypeResolveFn<'AssetList' | 'OptionList' | 'ProductList' | 'ShopList' | 'TagList' | 'UserList' | 'VariantList', ParentType, ContextType>;
  count?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  items?: Resolver<Array<ResolversTypes['Node']>, ParentType, ContextType>;
  pageInfo?: Resolver<ResolversTypes['PageInfo'], ParentType, ContextType>;
};

export type MutationResolvers<ContextType = ExecutionContext, ParentType extends ResolversParentTypes['Mutation'] = ResolversParentTypes['Mutation']> = {
  addProductTranslation?: Resolver<ResolversTypes['ProductTranslation'], ParentType, ContextType, RequireFields<MutationAddProductTranslationArgs, 'id' | 'input'>>;
  createOption?: Resolver<Array<ResolversTypes['Option']>, ParentType, ContextType, RequireFields<MutationCreateOptionArgs, 'input' | 'productId'>>;
  createProduct?: Resolver<ResolversTypes['Product'], ParentType, ContextType, RequireFields<MutationCreateProductArgs, 'input'>>;
  createShop?: Resolver<ResolversTypes['ShopResult'], ParentType, ContextType, RequireFields<MutationCreateShopArgs, 'input'>>;
  createTags?: Resolver<ResolversTypes['CreateTagsResult'], ParentType, ContextType, RequireFields<MutationCreateTagsArgs, 'input'>>;
  createUser?: Resolver<ResolversTypes['UserResult'], ParentType, ContextType, RequireFields<MutationCreateUserArgs, 'input'>>;
  createVariant?: Resolver<Array<Maybe<ResolversTypes['Variant']>>, ParentType, ContextType, RequireFields<MutationCreateVariantArgs, 'input' | 'productId'>>;
  generateUserAccessToken?: Resolver<ResolversTypes['UserAccessTokenResult'], ParentType, ContextType, RequireFields<MutationGenerateUserAccessTokenArgs, 'input'>>;
  removeTags?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType, RequireFields<MutationRemoveTagsArgs, 'ids'>>;
  softRemoveOption?: Resolver<ResolversTypes['Option'], ParentType, ContextType, RequireFields<MutationSoftRemoveOptionArgs, 'id'>>;
  softRemoveOptionValues?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType, RequireFields<MutationSoftRemoveOptionValuesArgs, 'ids'>>;
  softRemoveProduct?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType, RequireFields<MutationSoftRemoveProductArgs, 'ids'>>;
  softRemoveVariant?: Resolver<ResolversTypes['Variant'], ParentType, ContextType, RequireFields<MutationSoftRemoveVariantArgs, 'id'>>;
  updateOption?: Resolver<ResolversTypes['Option'], ParentType, ContextType, RequireFields<MutationUpdateOptionArgs, 'id' | 'input'>>;
  updateProduct?: Resolver<ResolversTypes['Product'], ParentType, ContextType, RequireFields<MutationUpdateProductArgs, 'id' | 'input'>>;
  updateShop?: Resolver<ResolversTypes['ShopResult'], ParentType, ContextType, RequireFields<MutationUpdateShopArgs, 'input' | 'shopSlug'>>;
  updateTag?: Resolver<ResolversTypes['TagResult'], ParentType, ContextType, RequireFields<MutationUpdateTagArgs, 'id' | 'input'>>;
  updateUser?: Resolver<ResolversTypes['UserResult'], ParentType, ContextType, RequireFields<MutationUpdateUserArgs, 'id' | 'input'>>;
  updateVariant?: Resolver<ResolversTypes['Variant'], ParentType, ContextType, RequireFields<MutationUpdateVariantArgs, 'id' | 'input'>>;
};

export type NodeResolvers<ContextType = ExecutionContext, ParentType extends ResolversParentTypes['Node'] = ResolversParentTypes['Node']> = {
  __resolveType: TypeResolveFn<'Asset' | 'Option' | 'OptionValue' | 'Product' | 'Shop' | 'Tag' | 'User' | 'Variant', ParentType, ContextType>;
  createdAt?: Resolver<ResolversTypes['Date'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  updatedAt?: Resolver<ResolversTypes['Date'], ParentType, ContextType>;
};

export type OptionResolvers<ContextType = ExecutionContext, ParentType extends ResolversParentTypes['Option'] = ResolversParentTypes['Option']> = {
  createdAt?: Resolver<ResolversTypes['Date'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  order?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
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

export type OptionValueResolvers<ContextType = ExecutionContext, ParentType extends ResolversParentTypes['OptionValue'] = ResolversParentTypes['OptionValue']> = {
  createdAt?: Resolver<ResolversTypes['Date'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  metadata?: Resolver<Maybe<ResolversTypes['OptionValueMetadata']>, ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  option?: Resolver<ResolversTypes['Option'], ParentType, ContextType>;
  order?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  updatedAt?: Resolver<ResolversTypes['Date'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type OptionValueMetadataResolvers<ContextType = ExecutionContext, ParentType extends ResolversParentTypes['OptionValueMetadata'] = ResolversParentTypes['OptionValueMetadata']> = {
  color?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type PageInfoResolvers<ContextType = ExecutionContext, ParentType extends ResolversParentTypes['PageInfo'] = ResolversParentTypes['PageInfo']> = {
  total?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
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

export type Resolvers<ContextType = ExecutionContext> = {
  Asset?: AssetResolvers<ContextType>;
  AssetList?: AssetListResolvers<ContextType>;
  CreateTagsResult?: CreateTagsResultResolvers<ContextType>;
  Date?: GraphQLScalarType;
  Dimensions?: DimensionsResolvers<ContextType>;
  JSON?: GraphQLScalarType;
  List?: ListResolvers<ContextType>;
  Mutation?: MutationResolvers<ContextType>;
  Node?: NodeResolvers<ContextType>;
  Option?: OptionResolvers<ContextType>;
  OptionList?: OptionListResolvers<ContextType>;
  OptionValue?: OptionValueResolvers<ContextType>;
  OptionValueMetadata?: OptionValueMetadataResolvers<ContextType>;
  PageInfo?: PageInfoResolvers<ContextType>;
  Product?: ProductResolvers<ContextType>;
  ProductList?: ProductListResolvers<ContextType>;
  ProductTranslation?: ProductTranslationResolvers<ContextType>;
  Query?: QueryResolvers<ContextType>;
  Shop?: ShopResolvers<ContextType>;
  ShopErrorResult?: ShopErrorResultResolvers<ContextType>;
  ShopList?: ShopListResolvers<ContextType>;
  ShopResult?: ShopResultResolvers<ContextType>;
  ShopSocials?: ShopSocialsResolvers<ContextType>;
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
};

