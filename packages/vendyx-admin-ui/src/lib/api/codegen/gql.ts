/* eslint-disable */
import type { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';

import * as types from './graphql';

/**
 * Map of all GraphQL operations in the project.
 *
 * This map has several performance disadvantages:
 * 1. It is not tree-shakeable, so it will include all operations in the project.
 * 2. It is not minifiable, so the string of a GraphQL query will be multiple times inside the bundle.
 * 3. It does not support dead code elimination, so it will add unused operations.
 *
 * Therefore it is highly recommended to use the babel or swc plugin for production.
 * Learn more about it here: https://the-guild.dev/graphql/codegen/plugins/presets/preset-client#reducing-bundle-size
 */
type Documents = {
  '\n  fragment CommonProduct on Product {\n    id\n    createdAt\n    name\n    description\n    slug\n    enabled\n    minSalePrice\n    variants {\n      items {\n        id\n        sku\n        stock\n        salePrice\n      }\n    }\n    assets {\n      items {\n        id\n        source\n        order\n      }\n    }\n  }\n': typeof types.CommonProductFragmentDoc;
  '\n  query GetProducts($input: ProductListInput) {\n    products(input: $input) {\n      count\n      pageInfo {\n        total\n      }\n      items {\n        id\n        createdAt\n        name\n        slug\n        enabled\n        minSalePrice\n        variants {\n          items {\n            id\n            sku\n            stock\n            salePrice\n          }\n        }\n        assets(input: { take: 1 }) {\n          items {\n            id\n            source\n          }\n        }\n      }\n    }\n  }\n': typeof types.GetProductsDocument;
  '\n  query GetProduct($id: ID) {\n    product(id: $id) {\n      ...CommonProduct\n    }\n  }\n': typeof types.GetProductDocument;
  '\n  mutation CreateProduct($input: CreateProductInput!) {\n    createProduct(input: $input) {\n      id\n    }\n  }\n': typeof types.CreateProductDocument;
  '\n  mutation UpdateProduct($id: ID!, $input: UpdateProductInput!) {\n    updateProduct(id: $id, input: $input) {\n      id\n    }\n  }\n': typeof types.UpdateProductDocument;
  '\n  fragment CommonShop on Shop {\n    id\n    name\n    slug\n    email\n    logo\n    socials {\n      facebook\n      twitter\n      instagram\n    }\n    phoneNumber\n    storefrontApiKey\n  }\n': typeof types.CommonShopFragmentDoc;
  '\n  fragment CommonListShop on Shop {\n    id\n    name\n    slug\n  }\n': typeof types.CommonListShopFragmentDoc;
  '\n  query getShops {\n    shops {\n      items {\n        ...CommonListShop\n      }\n    }\n  }\n': typeof types.GetShopsDocument;
  '\n  query Shop($slug: String!) {\n    shop(slug: $slug) {\n      ...CommonShop\n    }\n  }\n': typeof types.ShopDocument;
  '\n  mutation CreateShop($input: CreateShopInput!) {\n    createShop(input: $input) {\n      apiErrors {\n        message\n        code\n      }\n      shop {\n        id\n        slug\n      }\n    }\n  }\n': typeof types.CreateShopDocument;
  '\n  mutation UpdateShop($shopSlug: String!, $input: UpdateShopInput!) {\n    updateShop(shopSlug: $shopSlug, input: $input) {\n      apiErrors {\n        message\n        code\n      }\n      shop {\n        id\n        slug\n      }\n    }\n  }\n': typeof types.UpdateShopDocument;
  '\n  fragment CommonUser on User {\n    id\n    email\n  }\n': typeof types.CommonUserFragmentDoc;
  '\n  query Whoami {\n    whoami {\n      ...CommonUser\n    }\n  }\n': typeof types.WhoamiDocument;
  '\n  mutation GenerateAccessToken($input: GenerateUserAccessTokenInput!) {\n    generateUserAccessToken(input: $input) {\n      apiErrors {\n        code\n        message\n      }\n      accessToken\n    }\n  }\n': typeof types.GenerateAccessTokenDocument;
};
const documents: Documents = {
  '\n  fragment CommonProduct on Product {\n    id\n    createdAt\n    name\n    description\n    slug\n    enabled\n    minSalePrice\n    variants {\n      items {\n        id\n        sku\n        stock\n        salePrice\n      }\n    }\n    assets {\n      items {\n        id\n        source\n        order\n      }\n    }\n  }\n':
    types.CommonProductFragmentDoc,
  '\n  query GetProducts($input: ProductListInput) {\n    products(input: $input) {\n      count\n      pageInfo {\n        total\n      }\n      items {\n        id\n        createdAt\n        name\n        slug\n        enabled\n        minSalePrice\n        variants {\n          items {\n            id\n            sku\n            stock\n            salePrice\n          }\n        }\n        assets(input: { take: 1 }) {\n          items {\n            id\n            source\n          }\n        }\n      }\n    }\n  }\n':
    types.GetProductsDocument,
  '\n  query GetProduct($id: ID) {\n    product(id: $id) {\n      ...CommonProduct\n    }\n  }\n':
    types.GetProductDocument,
  '\n  mutation CreateProduct($input: CreateProductInput!) {\n    createProduct(input: $input) {\n      id\n    }\n  }\n':
    types.CreateProductDocument,
  '\n  mutation UpdateProduct($id: ID!, $input: UpdateProductInput!) {\n    updateProduct(id: $id, input: $input) {\n      id\n    }\n  }\n':
    types.UpdateProductDocument,
  '\n  fragment CommonShop on Shop {\n    id\n    name\n    slug\n    email\n    logo\n    socials {\n      facebook\n      twitter\n      instagram\n    }\n    phoneNumber\n    storefrontApiKey\n  }\n':
    types.CommonShopFragmentDoc,
  '\n  fragment CommonListShop on Shop {\n    id\n    name\n    slug\n  }\n':
    types.CommonListShopFragmentDoc,
  '\n  query getShops {\n    shops {\n      items {\n        ...CommonListShop\n      }\n    }\n  }\n':
    types.GetShopsDocument,
  '\n  query Shop($slug: String!) {\n    shop(slug: $slug) {\n      ...CommonShop\n    }\n  }\n':
    types.ShopDocument,
  '\n  mutation CreateShop($input: CreateShopInput!) {\n    createShop(input: $input) {\n      apiErrors {\n        message\n        code\n      }\n      shop {\n        id\n        slug\n      }\n    }\n  }\n':
    types.CreateShopDocument,
  '\n  mutation UpdateShop($shopSlug: String!, $input: UpdateShopInput!) {\n    updateShop(shopSlug: $shopSlug, input: $input) {\n      apiErrors {\n        message\n        code\n      }\n      shop {\n        id\n        slug\n      }\n    }\n  }\n':
    types.UpdateShopDocument,
  '\n  fragment CommonUser on User {\n    id\n    email\n  }\n': types.CommonUserFragmentDoc,
  '\n  query Whoami {\n    whoami {\n      ...CommonUser\n    }\n  }\n': types.WhoamiDocument,
  '\n  mutation GenerateAccessToken($input: GenerateUserAccessTokenInput!) {\n    generateUserAccessToken(input: $input) {\n      apiErrors {\n        code\n        message\n      }\n      accessToken\n    }\n  }\n':
    types.GenerateAccessTokenDocument
};

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 *
 *
 * @example
 * ```ts
 * const query = graphql(`query GetUser($id: ID!) { user(id: $id) { name } }`);
 * ```
 *
 * The query argument is unknown!
 * Please regenerate the types.
 */
export function graphql(source: string): unknown;

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: '\n  fragment CommonProduct on Product {\n    id\n    createdAt\n    name\n    description\n    slug\n    enabled\n    minSalePrice\n    variants {\n      items {\n        id\n        sku\n        stock\n        salePrice\n      }\n    }\n    assets {\n      items {\n        id\n        source\n        order\n      }\n    }\n  }\n'
): (typeof documents)['\n  fragment CommonProduct on Product {\n    id\n    createdAt\n    name\n    description\n    slug\n    enabled\n    minSalePrice\n    variants {\n      items {\n        id\n        sku\n        stock\n        salePrice\n      }\n    }\n    assets {\n      items {\n        id\n        source\n        order\n      }\n    }\n  }\n'];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: '\n  query GetProducts($input: ProductListInput) {\n    products(input: $input) {\n      count\n      pageInfo {\n        total\n      }\n      items {\n        id\n        createdAt\n        name\n        slug\n        enabled\n        minSalePrice\n        variants {\n          items {\n            id\n            sku\n            stock\n            salePrice\n          }\n        }\n        assets(input: { take: 1 }) {\n          items {\n            id\n            source\n          }\n        }\n      }\n    }\n  }\n'
): (typeof documents)['\n  query GetProducts($input: ProductListInput) {\n    products(input: $input) {\n      count\n      pageInfo {\n        total\n      }\n      items {\n        id\n        createdAt\n        name\n        slug\n        enabled\n        minSalePrice\n        variants {\n          items {\n            id\n            sku\n            stock\n            salePrice\n          }\n        }\n        assets(input: { take: 1 }) {\n          items {\n            id\n            source\n          }\n        }\n      }\n    }\n  }\n'];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: '\n  query GetProduct($id: ID) {\n    product(id: $id) {\n      ...CommonProduct\n    }\n  }\n'
): (typeof documents)['\n  query GetProduct($id: ID) {\n    product(id: $id) {\n      ...CommonProduct\n    }\n  }\n'];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: '\n  mutation CreateProduct($input: CreateProductInput!) {\n    createProduct(input: $input) {\n      id\n    }\n  }\n'
): (typeof documents)['\n  mutation CreateProduct($input: CreateProductInput!) {\n    createProduct(input: $input) {\n      id\n    }\n  }\n'];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: '\n  mutation UpdateProduct($id: ID!, $input: UpdateProductInput!) {\n    updateProduct(id: $id, input: $input) {\n      id\n    }\n  }\n'
): (typeof documents)['\n  mutation UpdateProduct($id: ID!, $input: UpdateProductInput!) {\n    updateProduct(id: $id, input: $input) {\n      id\n    }\n  }\n'];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: '\n  fragment CommonShop on Shop {\n    id\n    name\n    slug\n    email\n    logo\n    socials {\n      facebook\n      twitter\n      instagram\n    }\n    phoneNumber\n    storefrontApiKey\n  }\n'
): (typeof documents)['\n  fragment CommonShop on Shop {\n    id\n    name\n    slug\n    email\n    logo\n    socials {\n      facebook\n      twitter\n      instagram\n    }\n    phoneNumber\n    storefrontApiKey\n  }\n'];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: '\n  fragment CommonListShop on Shop {\n    id\n    name\n    slug\n  }\n'
): (typeof documents)['\n  fragment CommonListShop on Shop {\n    id\n    name\n    slug\n  }\n'];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: '\n  query getShops {\n    shops {\n      items {\n        ...CommonListShop\n      }\n    }\n  }\n'
): (typeof documents)['\n  query getShops {\n    shops {\n      items {\n        ...CommonListShop\n      }\n    }\n  }\n'];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: '\n  query Shop($slug: String!) {\n    shop(slug: $slug) {\n      ...CommonShop\n    }\n  }\n'
): (typeof documents)['\n  query Shop($slug: String!) {\n    shop(slug: $slug) {\n      ...CommonShop\n    }\n  }\n'];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: '\n  mutation CreateShop($input: CreateShopInput!) {\n    createShop(input: $input) {\n      apiErrors {\n        message\n        code\n      }\n      shop {\n        id\n        slug\n      }\n    }\n  }\n'
): (typeof documents)['\n  mutation CreateShop($input: CreateShopInput!) {\n    createShop(input: $input) {\n      apiErrors {\n        message\n        code\n      }\n      shop {\n        id\n        slug\n      }\n    }\n  }\n'];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: '\n  mutation UpdateShop($shopSlug: String!, $input: UpdateShopInput!) {\n    updateShop(shopSlug: $shopSlug, input: $input) {\n      apiErrors {\n        message\n        code\n      }\n      shop {\n        id\n        slug\n      }\n    }\n  }\n'
): (typeof documents)['\n  mutation UpdateShop($shopSlug: String!, $input: UpdateShopInput!) {\n    updateShop(shopSlug: $shopSlug, input: $input) {\n      apiErrors {\n        message\n        code\n      }\n      shop {\n        id\n        slug\n      }\n    }\n  }\n'];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: '\n  fragment CommonUser on User {\n    id\n    email\n  }\n'
): (typeof documents)['\n  fragment CommonUser on User {\n    id\n    email\n  }\n'];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: '\n  query Whoami {\n    whoami {\n      ...CommonUser\n    }\n  }\n'
): (typeof documents)['\n  query Whoami {\n    whoami {\n      ...CommonUser\n    }\n  }\n'];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: '\n  mutation GenerateAccessToken($input: GenerateUserAccessTokenInput!) {\n    generateUserAccessToken(input: $input) {\n      apiErrors {\n        code\n        message\n      }\n      accessToken\n    }\n  }\n'
): (typeof documents)['\n  mutation GenerateAccessToken($input: GenerateUserAccessTokenInput!) {\n    generateUserAccessToken(input: $input) {\n      apiErrors {\n        code\n        message\n      }\n      accessToken\n    }\n  }\n'];

export function graphql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> =
  TDocumentNode extends DocumentNode<infer TType, any> ? TType : never;
