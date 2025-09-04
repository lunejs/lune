/* eslint-disable */
import type { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
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
  total: Scalars['Int']['output'];
};

export type PriceRange = {
  max?: InputMaybe<Scalars['Int']['input']>;
  min?: InputMaybe<Scalars['Int']['input']>;
};

export type Query = {
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
  /** Api key for other stores to connect to this store */
  shopApiKey: Scalars['String']['output'];
  /** The shop's slug */
  slug: Scalars['String']['output'];
  /** The shop's socials, used for branding and social media links in emails and storefront */
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
  code: ShopErrorCode;
  message: Scalars['String']['output'];
};

export type ShopList = List & {
  count: Scalars['Int']['output'];
  items: Array<Shop>;
  pageInfo: PageInfo;
};

export type ShopResult = {
  apiErrors: Array<ShopErrorResult>;
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
  code: UserErrorCode;
  message: Scalars['String']['output'];
};

export type UserList = List & {
  count: Scalars['Int']['output'];
  items: Array<User>;
  pageInfo: PageInfo;
};

export type UserResult = {
  apiErrors: Array<UserErrorResult>;
  user?: Maybe<User>;
};

export type CommonShopFragment = { id: string, name: string, slug: string, email: string, logo?: string | null, phoneNumber: string, shopApiKey: string, socials?: { facebook?: string | null, twitter?: string | null, instagram?: string | null } | null } & { ' $fragmentName'?: 'CommonShopFragment' };

export type CommonListShopFragment = { id: string, name: string, slug: string } & { ' $fragmentName'?: 'CommonListShopFragment' };

export type GetShopsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetShopsQuery = { shops: { items: Array<{ ' $fragmentRefs'?: { 'CommonListShopFragment': CommonListShopFragment } }> } };

export type ShopQueryVariables = Exact<{
  slug: Scalars['String']['input'];
}>;


export type ShopQuery = { shop?: { ' $fragmentRefs'?: { 'CommonShopFragment': CommonShopFragment } } | null };

export type CreateShopMutationVariables = Exact<{
  input: CreateShopInput;
}>;


export type CreateShopMutation = { createShop: { apiErrors: Array<{ message: string, code: ShopErrorCode }>, shop?: { id: string, slug: string } | null } };

export type UpdateShopMutationVariables = Exact<{
  shopSlug: Scalars['String']['input'];
  input: UpdateShopInput;
}>;


export type UpdateShopMutation = { updateShop: { apiErrors: Array<{ message: string, code: ShopErrorCode }>, shop?: { id: string, slug: string } | null } };

export type CommonUserFragment = { id: string, email: string } & { ' $fragmentName'?: 'CommonUserFragment' };

export type WhoamiQueryVariables = Exact<{ [key: string]: never; }>;


export type WhoamiQuery = { whoami?: { ' $fragmentRefs'?: { 'CommonUserFragment': CommonUserFragment } } | null };

export type GenerateAccessTokenMutationVariables = Exact<{
  input: GenerateUserAccessTokenInput;
}>;


export type GenerateAccessTokenMutation = { generateUserAccessToken: { accessToken?: string | null, apiErrors: Array<{ code: UserErrorCode, message: string }> } };

export const CommonShopFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"CommonShop"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Shop"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"slug"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"logo"}},{"kind":"Field","name":{"kind":"Name","value":"socials"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"facebook"}},{"kind":"Field","name":{"kind":"Name","value":"twitter"}},{"kind":"Field","name":{"kind":"Name","value":"instagram"}}]}},{"kind":"Field","name":{"kind":"Name","value":"phoneNumber"}},{"kind":"Field","name":{"kind":"Name","value":"shopApiKey"}}]}}]} as unknown as DocumentNode<CommonShopFragment, unknown>;
export const CommonListShopFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"CommonListShop"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Shop"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"slug"}}]}}]} as unknown as DocumentNode<CommonListShopFragment, unknown>;
export const CommonUserFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"CommonUser"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"User"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"email"}}]}}]} as unknown as DocumentNode<CommonUserFragment, unknown>;
export const GetShopsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"getShops"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"shops"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"items"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"CommonListShop"}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"CommonListShop"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Shop"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"slug"}}]}}]} as unknown as DocumentNode<GetShopsQuery, GetShopsQueryVariables>;
export const ShopDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"Shop"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"slug"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"shop"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"slug"},"value":{"kind":"Variable","name":{"kind":"Name","value":"slug"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"CommonShop"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"CommonShop"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Shop"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"slug"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"logo"}},{"kind":"Field","name":{"kind":"Name","value":"socials"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"facebook"}},{"kind":"Field","name":{"kind":"Name","value":"twitter"}},{"kind":"Field","name":{"kind":"Name","value":"instagram"}}]}},{"kind":"Field","name":{"kind":"Name","value":"phoneNumber"}},{"kind":"Field","name":{"kind":"Name","value":"shopApiKey"}}]}}]} as unknown as DocumentNode<ShopQuery, ShopQueryVariables>;
export const CreateShopDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CreateShop"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"CreateShopInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createShop"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"apiErrors"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"message"}},{"kind":"Field","name":{"kind":"Name","value":"code"}}]}},{"kind":"Field","name":{"kind":"Name","value":"shop"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"slug"}}]}}]}}]}}]} as unknown as DocumentNode<CreateShopMutation, CreateShopMutationVariables>;
export const UpdateShopDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UpdateShop"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"shopSlug"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UpdateShopInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateShop"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"shopSlug"},"value":{"kind":"Variable","name":{"kind":"Name","value":"shopSlug"}}},{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"apiErrors"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"message"}},{"kind":"Field","name":{"kind":"Name","value":"code"}}]}},{"kind":"Field","name":{"kind":"Name","value":"shop"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"slug"}}]}}]}}]}}]} as unknown as DocumentNode<UpdateShopMutation, UpdateShopMutationVariables>;
export const WhoamiDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"Whoami"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"whoami"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"CommonUser"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"CommonUser"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"User"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"email"}}]}}]} as unknown as DocumentNode<WhoamiQuery, WhoamiQueryVariables>;
export const GenerateAccessTokenDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"GenerateAccessToken"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"GenerateUserAccessTokenInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"generateUserAccessToken"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"apiErrors"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"code"}},{"kind":"Field","name":{"kind":"Name","value":"message"}}]}},{"kind":"Field","name":{"kind":"Name","value":"accessToken"}}]}}]}}]} as unknown as DocumentNode<GenerateAccessTokenMutation, GenerateAccessTokenMutationVariables>;