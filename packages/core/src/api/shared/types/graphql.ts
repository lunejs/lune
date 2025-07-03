/* eslint-disable */
import { GraphQLResolveInfo, GraphQLScalarType, GraphQLScalarTypeConfig } from 'graphql';
import { GraphqlContext } from '../context/types';
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

export type BooleanFilter = {
  /** Filter by exact match */
  equals?: InputMaybe<Scalars['Boolean']['input']>;
};

export type CreateShopInput = {
  email: Scalars['String']['input'];
  logo?: InputMaybe<Scalars['String']['input']>;
  name: Scalars['String']['input'];
  phoneNumber: Scalars['String']['input'];
  socials?: InputMaybe<ShopSocialsInput>;
  storefrontUrl?: InputMaybe<Scalars['String']['input']>;
};

export type CreateUserInput = {
  email: Scalars['String']['input'];
  password: Scalars['String']['input'];
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

export type Mutation = {
  __typename?: 'Mutation';
  /** Create a new shop */
  createShop: ShopResult;
  /** Create a new user */
  createUser: UserResult;
  /**
   * Generate an access token for a user
   * This token can be used to access user-specific resources
   */
  generateUserAccessToken: UserAccessTokenResult;
  /** Update an existing shop details */
  updateShop: ShopResult;
  /** Update an existing user */
  updateUser: UserResult;
};


export type MutationCreateShopArgs = {
  input: CreateShopInput;
};


export type MutationCreateUserArgs = {
  input: CreateUserInput;
};


export type MutationGenerateUserAccessTokenArgs = {
  input: GenerateUserAccessTokenInput;
};


export type MutationUpdateShopArgs = {
  input: UpdateShopInput;
  shopSlug: Scalars['String']['input'];
};


export type MutationUpdateUserArgs = {
  id: Scalars['ID']['input'];
  input: UpdateUserInput;
};

/** A node, each type that represents a entity should implement this interface */
export type Node = {
  createdAt: Scalars['Date']['output'];
  id: Scalars['ID']['output'];
  updatedAt: Scalars['Date']['output'];
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

export type Query = {
  __typename?: 'Query';
  /** Get shop by slug */
  shop?: Maybe<Shop>;
  /** Get a list of shops */
  shops: ShopList;
  /** Validate current token of the user in session */
  validateAccessToken?: Maybe<Scalars['Boolean']['output']>;
  /** Get user in session */
  whoami?: Maybe<User>;
};


export type QueryShopArgs = {
  slug: Scalars['String']['input'];
};


export type QueryShopsArgs = {
  input?: InputMaybe<ListInput>;
};

/** A vendyx shop */
export type Shop = Node & {
  __typename?: 'Shop';
  createdAt: Scalars['Date']['output'];
  /** Contact email for the shop */
  email: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  /** The shop's logo */
  logo?: Maybe<Scalars['String']['output']>;
  /** The shop's name */
  name: Scalars['String']['output'];
  /** The shop's owner */
  owner: User;
  /** Contact phone number for the shop */
  phoneNumber: Scalars['String']['output'];
  /** Api key for other stores to connect to this store */
  shopApiKey: Scalars['String']['output'];
  /** The shop's slug */
  slug: Scalars['String']['output'];
  /** The shop's socials */
  socials?: Maybe<ShopSocials>;
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

export type UpdateShopInput = {
  email?: InputMaybe<Scalars['String']['input']>;
  logo?: InputMaybe<Scalars['String']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  phoneNumber?: InputMaybe<Scalars['String']['input']>;
  socials?: InputMaybe<ShopSocialsInput>;
  storefrontUrl?: InputMaybe<Scalars['String']['input']>;
};

export type UpdateUserInput = {
  email?: InputMaybe<Scalars['String']['input']>;
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
  List: ( ShopList ) | ( UserList );
  Node: ( Shop ) | ( User );
};

/** Mapping between all available schema types and the resolvers types */
export type ResolversTypes = {
  Boolean: ResolverTypeWrapper<Scalars['Boolean']['output']>;
  BooleanFilter: BooleanFilter;
  CreateShopInput: CreateShopInput;
  CreateUserInput: CreateUserInput;
  Date: ResolverTypeWrapper<Scalars['Date']['output']>;
  GenerateUserAccessTokenInput: GenerateUserAccessTokenInput;
  ID: ResolverTypeWrapper<Scalars['ID']['output']>;
  Int: ResolverTypeWrapper<Scalars['Int']['output']>;
  JSON: ResolverTypeWrapper<Scalars['JSON']['output']>;
  List: ResolverTypeWrapper<ResolversInterfaceTypes<ResolversTypes>['List']>;
  ListInput: ListInput;
  Mutation: ResolverTypeWrapper<{}>;
  Node: ResolverTypeWrapper<ResolversInterfaceTypes<ResolversTypes>['Node']>;
  OrderBy: OrderBy;
  PageInfo: ResolverTypeWrapper<PageInfo>;
  PriceRange: PriceRange;
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
  UpdateShopInput: UpdateShopInput;
  UpdateUserInput: UpdateUserInput;
  User: ResolverTypeWrapper<User>;
  UserAccessTokenResult: ResolverTypeWrapper<UserAccessTokenResult>;
  UserErrorCode: UserErrorCode;
  UserErrorResult: ResolverTypeWrapper<UserErrorResult>;
  UserList: ResolverTypeWrapper<UserList>;
  UserResult: ResolverTypeWrapper<UserResult>;
};

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = {
  Boolean: Scalars['Boolean']['output'];
  BooleanFilter: BooleanFilter;
  CreateShopInput: CreateShopInput;
  CreateUserInput: CreateUserInput;
  Date: Scalars['Date']['output'];
  GenerateUserAccessTokenInput: GenerateUserAccessTokenInput;
  ID: Scalars['ID']['output'];
  Int: Scalars['Int']['output'];
  JSON: Scalars['JSON']['output'];
  List: ResolversInterfaceTypes<ResolversParentTypes>['List'];
  ListInput: ListInput;
  Mutation: {};
  Node: ResolversInterfaceTypes<ResolversParentTypes>['Node'];
  PageInfo: PageInfo;
  PriceRange: PriceRange;
  Query: {};
  Shop: Shop;
  ShopErrorResult: ShopErrorResult;
  ShopList: ShopList;
  ShopResult: ShopResult;
  ShopSocials: ShopSocials;
  ShopSocialsInput: ShopSocialsInput;
  String: Scalars['String']['output'];
  StringFilter: StringFilter;
  UpdateShopInput: UpdateShopInput;
  UpdateUserInput: UpdateUserInput;
  User: User;
  UserAccessTokenResult: UserAccessTokenResult;
  UserErrorResult: UserErrorResult;
  UserList: UserList;
  UserResult: UserResult;
};

export interface DateScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['Date'], any> {
  name: 'Date';
}

export interface JsonScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['JSON'], any> {
  name: 'JSON';
}

export type ListResolvers<ContextType = GraphqlContext, ParentType extends ResolversParentTypes['List'] = ResolversParentTypes['List']> = {
  __resolveType: TypeResolveFn<'ShopList' | 'UserList', ParentType, ContextType>;
  count?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  items?: Resolver<Array<ResolversTypes['Node']>, ParentType, ContextType>;
  pageInfo?: Resolver<ResolversTypes['PageInfo'], ParentType, ContextType>;
};

export type MutationResolvers<ContextType = GraphqlContext, ParentType extends ResolversParentTypes['Mutation'] = ResolversParentTypes['Mutation']> = {
  createShop?: Resolver<ResolversTypes['ShopResult'], ParentType, ContextType, RequireFields<MutationCreateShopArgs, 'input'>>;
  createUser?: Resolver<ResolversTypes['UserResult'], ParentType, ContextType, RequireFields<MutationCreateUserArgs, 'input'>>;
  generateUserAccessToken?: Resolver<ResolversTypes['UserAccessTokenResult'], ParentType, ContextType, RequireFields<MutationGenerateUserAccessTokenArgs, 'input'>>;
  updateShop?: Resolver<ResolversTypes['ShopResult'], ParentType, ContextType, RequireFields<MutationUpdateShopArgs, 'input' | 'shopSlug'>>;
  updateUser?: Resolver<ResolversTypes['UserResult'], ParentType, ContextType, RequireFields<MutationUpdateUserArgs, 'id' | 'input'>>;
};

export type NodeResolvers<ContextType = GraphqlContext, ParentType extends ResolversParentTypes['Node'] = ResolversParentTypes['Node']> = {
  __resolveType: TypeResolveFn<'Shop' | 'User', ParentType, ContextType>;
  createdAt?: Resolver<ResolversTypes['Date'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  updatedAt?: Resolver<ResolversTypes['Date'], ParentType, ContextType>;
};

export type PageInfoResolvers<ContextType = GraphqlContext, ParentType extends ResolversParentTypes['PageInfo'] = ResolversParentTypes['PageInfo']> = {
  total?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type QueryResolvers<ContextType = GraphqlContext, ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']> = {
  shop?: Resolver<Maybe<ResolversTypes['Shop']>, ParentType, ContextType, RequireFields<QueryShopArgs, 'slug'>>;
  shops?: Resolver<ResolversTypes['ShopList'], ParentType, ContextType, Partial<QueryShopsArgs>>;
  validateAccessToken?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  whoami?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType>;
};

export type ShopResolvers<ContextType = GraphqlContext, ParentType extends ResolversParentTypes['Shop'] = ResolversParentTypes['Shop']> = {
  createdAt?: Resolver<ResolversTypes['Date'], ParentType, ContextType>;
  email?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  logo?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  owner?: Resolver<ResolversTypes['User'], ParentType, ContextType>;
  phoneNumber?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  shopApiKey?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  slug?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  socials?: Resolver<Maybe<ResolversTypes['ShopSocials']>, ParentType, ContextType>;
  storefrontUrl?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  updatedAt?: Resolver<ResolversTypes['Date'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ShopErrorResultResolvers<ContextType = GraphqlContext, ParentType extends ResolversParentTypes['ShopErrorResult'] = ResolversParentTypes['ShopErrorResult']> = {
  code?: Resolver<ResolversTypes['ShopErrorCode'], ParentType, ContextType>;
  message?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ShopListResolvers<ContextType = GraphqlContext, ParentType extends ResolversParentTypes['ShopList'] = ResolversParentTypes['ShopList']> = {
  count?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  items?: Resolver<Array<ResolversTypes['Shop']>, ParentType, ContextType>;
  pageInfo?: Resolver<ResolversTypes['PageInfo'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ShopResultResolvers<ContextType = GraphqlContext, ParentType extends ResolversParentTypes['ShopResult'] = ResolversParentTypes['ShopResult']> = {
  apiErrors?: Resolver<Array<ResolversTypes['ShopErrorResult']>, ParentType, ContextType>;
  shop?: Resolver<Maybe<ResolversTypes['Shop']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ShopSocialsResolvers<ContextType = GraphqlContext, ParentType extends ResolversParentTypes['ShopSocials'] = ResolversParentTypes['ShopSocials']> = {
  facebook?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  instagram?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  twitter?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type UserResolvers<ContextType = GraphqlContext, ParentType extends ResolversParentTypes['User'] = ResolversParentTypes['User']> = {
  createdAt?: Resolver<ResolversTypes['Date'], ParentType, ContextType>;
  email?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  shops?: Resolver<ResolversTypes['ShopList'], ParentType, ContextType>;
  updatedAt?: Resolver<ResolversTypes['Date'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type UserAccessTokenResultResolvers<ContextType = GraphqlContext, ParentType extends ResolversParentTypes['UserAccessTokenResult'] = ResolversParentTypes['UserAccessTokenResult']> = {
  accessToken?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  apiErrors?: Resolver<Array<ResolversTypes['UserErrorResult']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type UserErrorResultResolvers<ContextType = GraphqlContext, ParentType extends ResolversParentTypes['UserErrorResult'] = ResolversParentTypes['UserErrorResult']> = {
  code?: Resolver<ResolversTypes['UserErrorCode'], ParentType, ContextType>;
  message?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type UserListResolvers<ContextType = GraphqlContext, ParentType extends ResolversParentTypes['UserList'] = ResolversParentTypes['UserList']> = {
  count?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  items?: Resolver<Array<ResolversTypes['User']>, ParentType, ContextType>;
  pageInfo?: Resolver<ResolversTypes['PageInfo'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type UserResultResolvers<ContextType = GraphqlContext, ParentType extends ResolversParentTypes['UserResult'] = ResolversParentTypes['UserResult']> = {
  apiErrors?: Resolver<Array<ResolversTypes['UserErrorResult']>, ParentType, ContextType>;
  user?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type Resolvers<ContextType = GraphqlContext> = {
  Date?: GraphQLScalarType;
  JSON?: GraphQLScalarType;
  List?: ListResolvers<ContextType>;
  Mutation?: MutationResolvers<ContextType>;
  Node?: NodeResolvers<ContextType>;
  PageInfo?: PageInfoResolvers<ContextType>;
  Query?: QueryResolvers<ContextType>;
  Shop?: ShopResolvers<ContextType>;
  ShopErrorResult?: ShopErrorResultResolvers<ContextType>;
  ShopList?: ShopListResolvers<ContextType>;
  ShopResult?: ShopResultResolvers<ContextType>;
  ShopSocials?: ShopSocialsResolvers<ContextType>;
  User?: UserResolvers<ContextType>;
  UserAccessTokenResult?: UserAccessTokenResultResolvers<ContextType>;
  UserErrorResult?: UserErrorResultResolvers<ContextType>;
  UserList?: UserListResolvers<ContextType>;
  UserResult?: UserResultResolvers<ContextType>;
};

