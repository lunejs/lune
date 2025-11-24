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
  '\n  fragment CommonCollectionForTranslation on Collection {\n    id\n    name\n    description\n    translations {\n      name\n      description\n      locale\n    }\n    assets(input: { take: 1 }) {\n      items {\n        id\n        name\n        source\n      }\n    }\n  }\n': typeof types.CommonCollectionForTranslationFragmentDoc;
  '\n  fragment CommonCollection on Collection {\n    id\n    name\n    description\n    enabled\n    contentType\n    order\n    products {\n      items {\n        id\n      }\n    }\n    assets(input: { take: 1 }) {\n      items {\n        id\n        name\n        source\n      }\n    }\n  }\n': typeof types.CommonCollectionFragmentDoc;
  '\n  fragment CommonListCollection on Collection {\n    id\n    name\n    slug\n    enabled\n    contentType\n    assets(input: { take: 1 }) {\n      items {\n        id\n        source\n      }\n    }\n    subCollections {\n      count\n      items {\n        id\n        name\n      }\n    }\n    products {\n      count\n      items {\n        id\n        name\n      }\n    }\n  }\n': typeof types.CommonListCollectionFragmentDoc;
  '\n  fragment CommonCollectionProduct on Product {\n    id\n    name\n    slug\n    enabled\n    assets(input: { take: 1 }) {\n      items {\n        id\n        source\n      }\n    }\n  }\n': typeof types.CommonCollectionProductFragmentDoc;
  '\n  fragment CommonCollectionSubCollection on Collection {\n    id\n    name\n    slug\n    enabled\n    assets(input: { take: 1 }) {\n      items {\n        id\n        source\n      }\n    }\n  }\n': typeof types.CommonCollectionSubCollectionFragmentDoc;
  '\n  query GetAllCollections($input: CollectionListInput) {\n    collections(input: $input) {\n      count\n      pageInfo {\n        total\n      }\n      items {\n        ...CommonListCollection\n      }\n    }\n  }\n': typeof types.GetAllCollectionsDocument;
  '\n  query GetCollectionsExists {\n    collections(input: { take: 1 }) {\n      count\n    }\n  }\n': typeof types.GetCollectionsExistsDocument;
  '\n  query GetCollection($id: ID) {\n    collection(id: $id) {\n      ...CommonCollection\n    }\n  }\n': typeof types.GetCollectionDocument;
  '\n  query GetCollectionProducts($id: ID, $input: ProductListInput) {\n    collection(id: $id) {\n      products(input: $input) {\n        count\n        items {\n          ...CommonCollectionProduct\n        }\n      }\n    }\n  }\n': typeof types.GetCollectionProductsDocument;
  '\n  query GetCollectionSubCollections($id: ID, $input: CollectionListInput) {\n    collection(id: $id) {\n      subCollections(input: $input) {\n        count\n        items {\n          ...CommonCollectionSubCollection\n        }\n      }\n    }\n  }\n': typeof types.GetCollectionSubCollectionsDocument;
  '\n  query GetCollectionForTranslation($id: ID) {\n    collection(id: $id) {\n      ...CommonCollectionForTranslation\n    }\n  }\n': typeof types.GetCollectionForTranslationDocument;
  '\n  mutation CreateCollection($input: CreateCollectionInput!) {\n    createCollection(input: $input) {\n      id\n    }\n  }\n': typeof types.CreateCollectionDocument;
  '\n  mutation UpdateCollection($id: ID!, $input: UpdateCollectionInput!) {\n    updateCollection(id: $id, input: $input) {\n      id\n    }\n  }\n': typeof types.UpdateCollectionDocument;
  '\n  mutation RemoveCollections($ids: [ID!]!) {\n    removeCollections(ids: $ids)\n  }\n': typeof types.RemoveCollectionsDocument;
  '\n  mutation AddCollectionTranslationMutation($id: ID!, $input: CollectionTranslationInput!) {\n    addCollectionTranslation(id: $id, input: $input) {\n      id\n    }\n  }\n': typeof types.AddCollectionTranslationMutationDocument;
  '\n  fragment CommonCountry on Country {\n    id\n    name\n    states {\n      id\n      name\n    }\n  }\n': typeof types.CommonCountryFragmentDoc;
  '\n  fragment CommonCountryForSelector on Country {\n    id\n    name\n  }\n': typeof types.CommonCountryForSelectorFragmentDoc;
  '\n  query GetCountries {\n    countries {\n      ...CommonCountry\n    }\n  }\n': typeof types.GetCountriesDocument;
  '\n  query GetCountriesForSelector {\n    countries {\n      ...CommonCountryForSelector\n    }\n  }\n': typeof types.GetCountriesForSelectorDocument;
  '\n  fragment CommonLocation on Location {\n    id\n    name\n    createdAt\n    enabled\n    streetLine1\n    streetLine2\n    city\n    phoneNumber\n    postalCode\n    country {\n      id\n      name\n    }\n    state {\n      id\n      name\n    }\n    inStorePickup {\n      isAvailable\n      instructions\n    }\n  }\n': typeof types.CommonLocationFragmentDoc;
  '\n  fragment CommonListLocation on Location {\n    id\n    name\n    enabled\n    streetLine1\n    city\n    postalCode\n    inStorePickup {\n      isAvailable\n    }\n    country {\n      name\n    }\n    state {\n      name\n    }\n  }\n': typeof types.CommonListLocationFragmentDoc;
  '\n  query GetAllLocations {\n    locations {\n      items {\n        ...CommonListLocation\n      }\n    }\n  }\n': typeof types.GetAllLocationsDocument;
  '\n  query GetLocationById($id: ID!) {\n    location(id: $id) {\n      ...CommonLocation\n    }\n  }\n': typeof types.GetLocationByIdDocument;
  '\n  mutation CreateLocation($input: CreateLocationInput!) {\n    createLocation(input: $input) {\n      apiErrors {\n        code\n        message\n      }\n      location {\n        id\n      }\n    }\n  }\n': typeof types.CreateLocationDocument;
  '\n  mutation UpdateLocation($id: ID!, $input: UpdateLocationInput!) {\n    updateLocation(id: $id, input: $input) {\n      apiErrors {\n        code\n        message\n      }\n      location {\n        id\n      }\n    }\n  }\n': typeof types.UpdateLocationDocument;
  '\n  mutation RemoveLocation($id: ID!) {\n    removeLocation(id: $id)\n  }\n': typeof types.RemoveLocationDocument;
  '\n  mutation UpdateInStorePickupPreferences(\n    $locationId: ID!\n    $input: UpdateInStorePickupPreferencesInput!\n  ) {\n    updateInStorePickupPreferences(locationId: $locationId, input: $input) {\n      id\n    }\n  }\n': typeof types.UpdateInStorePickupPreferencesDocument;
  '\n  fragment CommonOptionPreset on OptionPreset {\n    id\n    name\n    values {\n      items {\n        id\n        name\n        metadata\n      }\n    }\n  }\n': typeof types.CommonOptionPresetFragmentDoc;
  '\n  query GetAllOptionPresets($input: ListInput) {\n    optionPresets(input: $input) {\n      items {\n        ...CommonOptionPreset\n      }\n    }\n  }\n': typeof types.GetAllOptionPresetsDocument;
  '\n  mutation CreateOption($productId: ID!, $input: [CreateOptionInput!]!) {\n    createOption(productId: $productId, input: $input) {\n      id\n      name\n      values {\n        id\n        name\n      }\n    }\n  }\n': typeof types.CreateOptionDocument;
  '\n  mutation UpdateOption($id: ID!, $input: UpdateOptionInput!) {\n    updateOption(id: $id, input: $input) {\n      id\n      name\n      values {\n        id\n        name\n      }\n    }\n  }\n': typeof types.UpdateOptionDocument;
  '\n  mutation RemoveOption($id: ID!) {\n    softRemoveOption(id: $id) {\n      id\n    }\n  }\n': typeof types.RemoveOptionDocument;
  '\n  fragment CommonPaymentMethod on PaymentMethod {\n    id\n    createdAt\n    name\n    enabled\n    handler {\n      code\n      args\n    }\n  }\n': typeof types.CommonPaymentMethodFragmentDoc;
  '\n  fragment CommonPaymentHandler on PaymentHandler {\n    name\n    code\n    args\n  }\n': typeof types.CommonPaymentHandlerFragmentDoc;
  '\n  query GetAllPaymentMethods {\n    paymentMethods {\n      ...CommonPaymentMethod\n    }\n  }\n': typeof types.GetAllPaymentMethodsDocument;
  '\n  query GetPaymentMethods($id: ID!) {\n    paymentMethod(id: $id) {\n      ...CommonPaymentMethod\n    }\n  }\n': typeof types.GetPaymentMethodsDocument;
  '\n  query GetAllPaymentHandlers {\n    paymentHandlers {\n      ...CommonPaymentHandler\n    }\n  }\n': typeof types.GetAllPaymentHandlersDocument;
  '\n  mutation CreatePaymentMethod($input: CreatePaymentMethodInput!) {\n    createPaymentMethod(input: $input) {\n      apiErrors {\n        code\n        message\n      }\n      paymentMethod {\n        id\n      }\n    }\n  }\n': typeof types.CreatePaymentMethodDocument;
  '\n  mutation UpdatePaymentMethod($id: ID!, $input: UpdatePaymentMethodInput!) {\n    updatePaymentMethod(id: $id, input: $input) {\n      id\n    }\n  }\n': typeof types.UpdatePaymentMethodDocument;
  '\n  mutation RemovePaymentMethod($id: ID!) {\n    removePaymentMethod(id: $id)\n  }\n': typeof types.RemovePaymentMethodDocument;
  '\n  fragment CommonProductForTranslation on Product {\n    id\n    createdAt\n    name\n    description\n    slug\n    enabled\n    options {\n      id\n      name\n      translations {\n        id\n        locale\n        name\n      }\n      values {\n        id\n        name\n        preset {\n          id\n        }\n        translations {\n          id\n          locale\n          name\n        }\n      }\n    }\n    translations {\n      name\n      slug\n      description\n      locale\n    }\n    assets(input: { take: 1 }) {\n      items {\n        id\n        source\n        order\n      }\n    }\n  }\n': typeof types.CommonProductForTranslationFragmentDoc;
  '\n  fragment CommonProduct on Product {\n    id\n    createdAt\n    name\n    description\n    slug\n    enabled\n    minSalePrice\n    variants {\n      items {\n        id\n        salePrice\n        sku\n        stock\n        comparisonPrice\n        costPerUnit\n        requiresShipping\n        weight\n        dimensions {\n          length\n          width\n          height\n        }\n        optionValues {\n          id\n          name\n        }\n        assets {\n          items {\n            id\n            source\n          }\n        }\n      }\n    }\n    options {\n      id\n      name\n      values {\n        id\n        name\n        preset {\n          id\n          name\n          metadata\n        }\n      }\n    }\n    assets {\n      items {\n        id\n        source\n        order\n      }\n    }\n  }\n': typeof types.CommonProductFragmentDoc;
  '\n  fragment CommonListProduct on Product {\n    id\n    createdAt\n    name\n    slug\n    enabled\n    minSalePrice\n    variants {\n      items {\n        id\n        sku\n        stock\n        salePrice\n      }\n    }\n    assets(input: { take: 1 }) {\n      items {\n        id\n        source\n      }\n    }\n  }\n': typeof types.CommonListProductFragmentDoc;
  '\n  query GetProducts($input: ProductListInput) {\n    products(input: $input) {\n      count\n      pageInfo {\n        total\n      }\n      items {\n        ...CommonListProduct\n      }\n    }\n  }\n': typeof types.GetProductsDocument;
  '\n  query GetProductsExists {\n    products(input: { take: 1 }) {\n      count\n    }\n  }\n': typeof types.GetProductsExistsDocument;
  '\n  query GetProduct($id: ID) {\n    product(id: $id) {\n      ...CommonProduct\n    }\n  }\n': typeof types.GetProductDocument;
  '\n  query GetProductForTranslation($id: ID) {\n    product(id: $id) {\n      ...CommonProductForTranslation\n    }\n  }\n': typeof types.GetProductForTranslationDocument;
  '\n  mutation CreateProduct($input: CreateProductInput!) {\n    createProduct(input: $input) {\n      id\n    }\n  }\n': typeof types.CreateProductDocument;
  '\n  mutation UpdateProduct($id: ID!, $input: UpdateProductInput!) {\n    updateProduct(id: $id, input: $input) {\n      id\n    }\n  }\n': typeof types.UpdateProductDocument;
  '\n  mutation RemoveProducts($ids: [ID!]!) {\n    softRemoveProducts(ids: $ids)\n  }\n': typeof types.RemoveProductsDocument;
  '\n  mutation AddProductTranslationMutation($id: ID!, $input: AddProductTranslationInput!) {\n    addProductTranslation(id: $id, input: $input) {\n      id\n    }\n  }\n': typeof types.AddProductTranslationMutationDocument;
  '\n  fragment CommonShippingHandlers on ShippingHandler {\n    name\n    code\n    args\n  }\n': typeof types.CommonShippingHandlersFragmentDoc;
  '\n  query GetAllHandlers {\n    shippingHandlers {\n      ...CommonShippingHandlers\n    }\n  }\n': typeof types.GetAllHandlersDocument;
  '\n  mutation CreateShippingMethod($input: CreateShippingMethodInput!) {\n    createShippingMethod(input: $input) {\n      apiErrors {\n        code\n        message\n      }\n      shippingMethod {\n        id\n      }\n    }\n  }\n': typeof types.CreateShippingMethodDocument;
  '\n  mutation UpdateShippingMethod($id: ID!, $input: UpdateShippingMethodInput!) {\n    updateShippingMethod(id: $id, input: $input) {\n      id\n    }\n  }\n': typeof types.UpdateShippingMethodDocument;
  '\n  mutation RemoveShippingMethod($id: ID!) {\n    removeShippingMethod(id: $id)\n  }\n': typeof types.RemoveShippingMethodDocument;
  '\n  fragment CommonShop on Shop {\n    id\n    name\n    slug\n    email\n    logo\n    socials {\n      facebook\n      twitter\n      instagram\n    }\n    phoneNumber\n    storefrontApiKey\n  }\n': typeof types.CommonShopFragmentDoc;
  '\n  fragment CommonListShop on Shop {\n    id\n    name\n    slug\n  }\n': typeof types.CommonListShopFragmentDoc;
  '\n  query getShops {\n    shops {\n      items {\n        ...CommonListShop\n      }\n    }\n  }\n': typeof types.GetShopsDocument;
  '\n  query Shop($slug: String!) {\n    shop(slug: $slug) {\n      ...CommonShop\n    }\n  }\n': typeof types.ShopDocument;
  '\n  mutation CreateShop($input: CreateShopInput!) {\n    createShop(input: $input) {\n      apiErrors {\n        message\n        code\n      }\n      shop {\n        id\n        slug\n      }\n    }\n  }\n': typeof types.CreateShopDocument;
  '\n  mutation UpdateShop($shopSlug: String!, $input: UpdateShopInput!) {\n    updateShop(shopSlug: $shopSlug, input: $input) {\n      apiErrors {\n        message\n        code\n      }\n      shop {\n        id\n        slug\n      }\n    }\n  }\n': typeof types.UpdateShopDocument;
  '\n  fragment CommonUser on User {\n    id\n    email\n  }\n': typeof types.CommonUserFragmentDoc;
  '\n  query Whoami {\n    whoami {\n      ...CommonUser\n    }\n  }\n': typeof types.WhoamiDocument;
  '\n  mutation GenerateAccessToken($input: GenerateUserAccessTokenInput!) {\n    generateUserAccessToken(input: $input) {\n      apiErrors {\n        code\n        message\n      }\n      accessToken\n    }\n  }\n': typeof types.GenerateAccessTokenDocument;
  '\n  mutation CreateVariant($productId: ID!, $input: [CreateVariantInput!]!) {\n    createVariant(productId: $productId, input: $input) {\n      id\n    }\n  }\n': typeof types.CreateVariantDocument;
  '\n  mutation UpdateVariant($id: ID!, $input: UpdateVariantInput!) {\n    updateVariant(id: $id, input: $input) {\n      id\n    }\n  }\n': typeof types.UpdateVariantDocument;
  '\n  mutation SoftRemoveVariant($id: ID!) {\n    softRemoveVariant(id: $id) {\n      id\n    }\n  }\n': typeof types.SoftRemoveVariantDocument;
  '\n  fragment CommonZone on Zone {\n    id\n    name\n    createdAt\n    states {\n      id\n      name\n    }\n    shippingMethods {\n      id\n      name\n      enabled\n      pricePreview\n      handler {\n        code\n        args\n      }\n    }\n  }\n': typeof types.CommonZoneFragmentDoc;
  '\n  fragment CommonListZone on Zone {\n    id\n    name\n    shippingMethods {\n      id\n    }\n  }\n': typeof types.CommonListZoneFragmentDoc;
  '\n  query getAllZones {\n    zones {\n      ...CommonListZone\n    }\n  }\n': typeof types.GetAllZonesDocument;
  '\n  query GetZone($id: ID!) {\n    zone(id: $id) {\n      ...CommonZone\n    }\n  }\n': typeof types.GetZoneDocument;
  '\n  mutation CreateZone($input: CreateZoneInput!) {\n    createZone(input: $input) {\n      id\n    }\n  }\n': typeof types.CreateZoneDocument;
  '\n  mutation UpdateZone($id: ID!, $input: UpdateZoneInput!) {\n    updateZone(id: $id, input: $input) {\n      id\n    }\n  }\n': typeof types.UpdateZoneDocument;
  '\n  mutation RemoveZone($id: ID!) {\n    removeZone(id: $id)\n  }\n': typeof types.RemoveZoneDocument;
};
const documents: Documents = {
  '\n  fragment CommonCollectionForTranslation on Collection {\n    id\n    name\n    description\n    translations {\n      name\n      description\n      locale\n    }\n    assets(input: { take: 1 }) {\n      items {\n        id\n        name\n        source\n      }\n    }\n  }\n':
    types.CommonCollectionForTranslationFragmentDoc,
  '\n  fragment CommonCollection on Collection {\n    id\n    name\n    description\n    enabled\n    contentType\n    order\n    products {\n      items {\n        id\n      }\n    }\n    assets(input: { take: 1 }) {\n      items {\n        id\n        name\n        source\n      }\n    }\n  }\n':
    types.CommonCollectionFragmentDoc,
  '\n  fragment CommonListCollection on Collection {\n    id\n    name\n    slug\n    enabled\n    contentType\n    assets(input: { take: 1 }) {\n      items {\n        id\n        source\n      }\n    }\n    subCollections {\n      count\n      items {\n        id\n        name\n      }\n    }\n    products {\n      count\n      items {\n        id\n        name\n      }\n    }\n  }\n':
    types.CommonListCollectionFragmentDoc,
  '\n  fragment CommonCollectionProduct on Product {\n    id\n    name\n    slug\n    enabled\n    assets(input: { take: 1 }) {\n      items {\n        id\n        source\n      }\n    }\n  }\n':
    types.CommonCollectionProductFragmentDoc,
  '\n  fragment CommonCollectionSubCollection on Collection {\n    id\n    name\n    slug\n    enabled\n    assets(input: { take: 1 }) {\n      items {\n        id\n        source\n      }\n    }\n  }\n':
    types.CommonCollectionSubCollectionFragmentDoc,
  '\n  query GetAllCollections($input: CollectionListInput) {\n    collections(input: $input) {\n      count\n      pageInfo {\n        total\n      }\n      items {\n        ...CommonListCollection\n      }\n    }\n  }\n':
    types.GetAllCollectionsDocument,
  '\n  query GetCollectionsExists {\n    collections(input: { take: 1 }) {\n      count\n    }\n  }\n':
    types.GetCollectionsExistsDocument,
  '\n  query GetCollection($id: ID) {\n    collection(id: $id) {\n      ...CommonCollection\n    }\n  }\n':
    types.GetCollectionDocument,
  '\n  query GetCollectionProducts($id: ID, $input: ProductListInput) {\n    collection(id: $id) {\n      products(input: $input) {\n        count\n        items {\n          ...CommonCollectionProduct\n        }\n      }\n    }\n  }\n':
    types.GetCollectionProductsDocument,
  '\n  query GetCollectionSubCollections($id: ID, $input: CollectionListInput) {\n    collection(id: $id) {\n      subCollections(input: $input) {\n        count\n        items {\n          ...CommonCollectionSubCollection\n        }\n      }\n    }\n  }\n':
    types.GetCollectionSubCollectionsDocument,
  '\n  query GetCollectionForTranslation($id: ID) {\n    collection(id: $id) {\n      ...CommonCollectionForTranslation\n    }\n  }\n':
    types.GetCollectionForTranslationDocument,
  '\n  mutation CreateCollection($input: CreateCollectionInput!) {\n    createCollection(input: $input) {\n      id\n    }\n  }\n':
    types.CreateCollectionDocument,
  '\n  mutation UpdateCollection($id: ID!, $input: UpdateCollectionInput!) {\n    updateCollection(id: $id, input: $input) {\n      id\n    }\n  }\n':
    types.UpdateCollectionDocument,
  '\n  mutation RemoveCollections($ids: [ID!]!) {\n    removeCollections(ids: $ids)\n  }\n':
    types.RemoveCollectionsDocument,
  '\n  mutation AddCollectionTranslationMutation($id: ID!, $input: CollectionTranslationInput!) {\n    addCollectionTranslation(id: $id, input: $input) {\n      id\n    }\n  }\n':
    types.AddCollectionTranslationMutationDocument,
  '\n  fragment CommonCountry on Country {\n    id\n    name\n    states {\n      id\n      name\n    }\n  }\n':
    types.CommonCountryFragmentDoc,
  '\n  fragment CommonCountryForSelector on Country {\n    id\n    name\n  }\n':
    types.CommonCountryForSelectorFragmentDoc,
  '\n  query GetCountries {\n    countries {\n      ...CommonCountry\n    }\n  }\n':
    types.GetCountriesDocument,
  '\n  query GetCountriesForSelector {\n    countries {\n      ...CommonCountryForSelector\n    }\n  }\n':
    types.GetCountriesForSelectorDocument,
  '\n  fragment CommonLocation on Location {\n    id\n    name\n    createdAt\n    enabled\n    streetLine1\n    streetLine2\n    city\n    phoneNumber\n    postalCode\n    country {\n      id\n      name\n    }\n    state {\n      id\n      name\n    }\n    inStorePickup {\n      isAvailable\n      instructions\n    }\n  }\n':
    types.CommonLocationFragmentDoc,
  '\n  fragment CommonListLocation on Location {\n    id\n    name\n    enabled\n    streetLine1\n    city\n    postalCode\n    inStorePickup {\n      isAvailable\n    }\n    country {\n      name\n    }\n    state {\n      name\n    }\n  }\n':
    types.CommonListLocationFragmentDoc,
  '\n  query GetAllLocations {\n    locations {\n      items {\n        ...CommonListLocation\n      }\n    }\n  }\n':
    types.GetAllLocationsDocument,
  '\n  query GetLocationById($id: ID!) {\n    location(id: $id) {\n      ...CommonLocation\n    }\n  }\n':
    types.GetLocationByIdDocument,
  '\n  mutation CreateLocation($input: CreateLocationInput!) {\n    createLocation(input: $input) {\n      apiErrors {\n        code\n        message\n      }\n      location {\n        id\n      }\n    }\n  }\n':
    types.CreateLocationDocument,
  '\n  mutation UpdateLocation($id: ID!, $input: UpdateLocationInput!) {\n    updateLocation(id: $id, input: $input) {\n      apiErrors {\n        code\n        message\n      }\n      location {\n        id\n      }\n    }\n  }\n':
    types.UpdateLocationDocument,
  '\n  mutation RemoveLocation($id: ID!) {\n    removeLocation(id: $id)\n  }\n':
    types.RemoveLocationDocument,
  '\n  mutation UpdateInStorePickupPreferences(\n    $locationId: ID!\n    $input: UpdateInStorePickupPreferencesInput!\n  ) {\n    updateInStorePickupPreferences(locationId: $locationId, input: $input) {\n      id\n    }\n  }\n':
    types.UpdateInStorePickupPreferencesDocument,
  '\n  fragment CommonOptionPreset on OptionPreset {\n    id\n    name\n    values {\n      items {\n        id\n        name\n        metadata\n      }\n    }\n  }\n':
    types.CommonOptionPresetFragmentDoc,
  '\n  query GetAllOptionPresets($input: ListInput) {\n    optionPresets(input: $input) {\n      items {\n        ...CommonOptionPreset\n      }\n    }\n  }\n':
    types.GetAllOptionPresetsDocument,
  '\n  mutation CreateOption($productId: ID!, $input: [CreateOptionInput!]!) {\n    createOption(productId: $productId, input: $input) {\n      id\n      name\n      values {\n        id\n        name\n      }\n    }\n  }\n':
    types.CreateOptionDocument,
  '\n  mutation UpdateOption($id: ID!, $input: UpdateOptionInput!) {\n    updateOption(id: $id, input: $input) {\n      id\n      name\n      values {\n        id\n        name\n      }\n    }\n  }\n':
    types.UpdateOptionDocument,
  '\n  mutation RemoveOption($id: ID!) {\n    softRemoveOption(id: $id) {\n      id\n    }\n  }\n':
    types.RemoveOptionDocument,
  '\n  fragment CommonPaymentMethod on PaymentMethod {\n    id\n    createdAt\n    name\n    enabled\n    handler {\n      code\n      args\n    }\n  }\n':
    types.CommonPaymentMethodFragmentDoc,
  '\n  fragment CommonPaymentHandler on PaymentHandler {\n    name\n    code\n    args\n  }\n':
    types.CommonPaymentHandlerFragmentDoc,
  '\n  query GetAllPaymentMethods {\n    paymentMethods {\n      ...CommonPaymentMethod\n    }\n  }\n':
    types.GetAllPaymentMethodsDocument,
  '\n  query GetPaymentMethods($id: ID!) {\n    paymentMethod(id: $id) {\n      ...CommonPaymentMethod\n    }\n  }\n':
    types.GetPaymentMethodsDocument,
  '\n  query GetAllPaymentHandlers {\n    paymentHandlers {\n      ...CommonPaymentHandler\n    }\n  }\n':
    types.GetAllPaymentHandlersDocument,
  '\n  mutation CreatePaymentMethod($input: CreatePaymentMethodInput!) {\n    createPaymentMethod(input: $input) {\n      apiErrors {\n        code\n        message\n      }\n      paymentMethod {\n        id\n      }\n    }\n  }\n':
    types.CreatePaymentMethodDocument,
  '\n  mutation UpdatePaymentMethod($id: ID!, $input: UpdatePaymentMethodInput!) {\n    updatePaymentMethod(id: $id, input: $input) {\n      id\n    }\n  }\n':
    types.UpdatePaymentMethodDocument,
  '\n  mutation RemovePaymentMethod($id: ID!) {\n    removePaymentMethod(id: $id)\n  }\n':
    types.RemovePaymentMethodDocument,
  '\n  fragment CommonProductForTranslation on Product {\n    id\n    createdAt\n    name\n    description\n    slug\n    enabled\n    options {\n      id\n      name\n      translations {\n        id\n        locale\n        name\n      }\n      values {\n        id\n        name\n        preset {\n          id\n        }\n        translations {\n          id\n          locale\n          name\n        }\n      }\n    }\n    translations {\n      name\n      slug\n      description\n      locale\n    }\n    assets(input: { take: 1 }) {\n      items {\n        id\n        source\n        order\n      }\n    }\n  }\n':
    types.CommonProductForTranslationFragmentDoc,
  '\n  fragment CommonProduct on Product {\n    id\n    createdAt\n    name\n    description\n    slug\n    enabled\n    minSalePrice\n    variants {\n      items {\n        id\n        salePrice\n        sku\n        stock\n        comparisonPrice\n        costPerUnit\n        requiresShipping\n        weight\n        dimensions {\n          length\n          width\n          height\n        }\n        optionValues {\n          id\n          name\n        }\n        assets {\n          items {\n            id\n            source\n          }\n        }\n      }\n    }\n    options {\n      id\n      name\n      values {\n        id\n        name\n        preset {\n          id\n          name\n          metadata\n        }\n      }\n    }\n    assets {\n      items {\n        id\n        source\n        order\n      }\n    }\n  }\n':
    types.CommonProductFragmentDoc,
  '\n  fragment CommonListProduct on Product {\n    id\n    createdAt\n    name\n    slug\n    enabled\n    minSalePrice\n    variants {\n      items {\n        id\n        sku\n        stock\n        salePrice\n      }\n    }\n    assets(input: { take: 1 }) {\n      items {\n        id\n        source\n      }\n    }\n  }\n':
    types.CommonListProductFragmentDoc,
  '\n  query GetProducts($input: ProductListInput) {\n    products(input: $input) {\n      count\n      pageInfo {\n        total\n      }\n      items {\n        ...CommonListProduct\n      }\n    }\n  }\n':
    types.GetProductsDocument,
  '\n  query GetProductsExists {\n    products(input: { take: 1 }) {\n      count\n    }\n  }\n':
    types.GetProductsExistsDocument,
  '\n  query GetProduct($id: ID) {\n    product(id: $id) {\n      ...CommonProduct\n    }\n  }\n':
    types.GetProductDocument,
  '\n  query GetProductForTranslation($id: ID) {\n    product(id: $id) {\n      ...CommonProductForTranslation\n    }\n  }\n':
    types.GetProductForTranslationDocument,
  '\n  mutation CreateProduct($input: CreateProductInput!) {\n    createProduct(input: $input) {\n      id\n    }\n  }\n':
    types.CreateProductDocument,
  '\n  mutation UpdateProduct($id: ID!, $input: UpdateProductInput!) {\n    updateProduct(id: $id, input: $input) {\n      id\n    }\n  }\n':
    types.UpdateProductDocument,
  '\n  mutation RemoveProducts($ids: [ID!]!) {\n    softRemoveProducts(ids: $ids)\n  }\n':
    types.RemoveProductsDocument,
  '\n  mutation AddProductTranslationMutation($id: ID!, $input: AddProductTranslationInput!) {\n    addProductTranslation(id: $id, input: $input) {\n      id\n    }\n  }\n':
    types.AddProductTranslationMutationDocument,
  '\n  fragment CommonShippingHandlers on ShippingHandler {\n    name\n    code\n    args\n  }\n':
    types.CommonShippingHandlersFragmentDoc,
  '\n  query GetAllHandlers {\n    shippingHandlers {\n      ...CommonShippingHandlers\n    }\n  }\n':
    types.GetAllHandlersDocument,
  '\n  mutation CreateShippingMethod($input: CreateShippingMethodInput!) {\n    createShippingMethod(input: $input) {\n      apiErrors {\n        code\n        message\n      }\n      shippingMethod {\n        id\n      }\n    }\n  }\n':
    types.CreateShippingMethodDocument,
  '\n  mutation UpdateShippingMethod($id: ID!, $input: UpdateShippingMethodInput!) {\n    updateShippingMethod(id: $id, input: $input) {\n      id\n    }\n  }\n':
    types.UpdateShippingMethodDocument,
  '\n  mutation RemoveShippingMethod($id: ID!) {\n    removeShippingMethod(id: $id)\n  }\n':
    types.RemoveShippingMethodDocument,
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
    types.GenerateAccessTokenDocument,
  '\n  mutation CreateVariant($productId: ID!, $input: [CreateVariantInput!]!) {\n    createVariant(productId: $productId, input: $input) {\n      id\n    }\n  }\n':
    types.CreateVariantDocument,
  '\n  mutation UpdateVariant($id: ID!, $input: UpdateVariantInput!) {\n    updateVariant(id: $id, input: $input) {\n      id\n    }\n  }\n':
    types.UpdateVariantDocument,
  '\n  mutation SoftRemoveVariant($id: ID!) {\n    softRemoveVariant(id: $id) {\n      id\n    }\n  }\n':
    types.SoftRemoveVariantDocument,
  '\n  fragment CommonZone on Zone {\n    id\n    name\n    createdAt\n    states {\n      id\n      name\n    }\n    shippingMethods {\n      id\n      name\n      enabled\n      pricePreview\n      handler {\n        code\n        args\n      }\n    }\n  }\n':
    types.CommonZoneFragmentDoc,
  '\n  fragment CommonListZone on Zone {\n    id\n    name\n    shippingMethods {\n      id\n    }\n  }\n':
    types.CommonListZoneFragmentDoc,
  '\n  query getAllZones {\n    zones {\n      ...CommonListZone\n    }\n  }\n':
    types.GetAllZonesDocument,
  '\n  query GetZone($id: ID!) {\n    zone(id: $id) {\n      ...CommonZone\n    }\n  }\n':
    types.GetZoneDocument,
  '\n  mutation CreateZone($input: CreateZoneInput!) {\n    createZone(input: $input) {\n      id\n    }\n  }\n':
    types.CreateZoneDocument,
  '\n  mutation UpdateZone($id: ID!, $input: UpdateZoneInput!) {\n    updateZone(id: $id, input: $input) {\n      id\n    }\n  }\n':
    types.UpdateZoneDocument,
  '\n  mutation RemoveZone($id: ID!) {\n    removeZone(id: $id)\n  }\n': types.RemoveZoneDocument
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
  source: '\n  fragment CommonCollectionForTranslation on Collection {\n    id\n    name\n    description\n    translations {\n      name\n      description\n      locale\n    }\n    assets(input: { take: 1 }) {\n      items {\n        id\n        name\n        source\n      }\n    }\n  }\n'
): (typeof documents)['\n  fragment CommonCollectionForTranslation on Collection {\n    id\n    name\n    description\n    translations {\n      name\n      description\n      locale\n    }\n    assets(input: { take: 1 }) {\n      items {\n        id\n        name\n        source\n      }\n    }\n  }\n'];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: '\n  fragment CommonCollection on Collection {\n    id\n    name\n    description\n    enabled\n    contentType\n    order\n    products {\n      items {\n        id\n      }\n    }\n    assets(input: { take: 1 }) {\n      items {\n        id\n        name\n        source\n      }\n    }\n  }\n'
): (typeof documents)['\n  fragment CommonCollection on Collection {\n    id\n    name\n    description\n    enabled\n    contentType\n    order\n    products {\n      items {\n        id\n      }\n    }\n    assets(input: { take: 1 }) {\n      items {\n        id\n        name\n        source\n      }\n    }\n  }\n'];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: '\n  fragment CommonListCollection on Collection {\n    id\n    name\n    slug\n    enabled\n    contentType\n    assets(input: { take: 1 }) {\n      items {\n        id\n        source\n      }\n    }\n    subCollections {\n      count\n      items {\n        id\n        name\n      }\n    }\n    products {\n      count\n      items {\n        id\n        name\n      }\n    }\n  }\n'
): (typeof documents)['\n  fragment CommonListCollection on Collection {\n    id\n    name\n    slug\n    enabled\n    contentType\n    assets(input: { take: 1 }) {\n      items {\n        id\n        source\n      }\n    }\n    subCollections {\n      count\n      items {\n        id\n        name\n      }\n    }\n    products {\n      count\n      items {\n        id\n        name\n      }\n    }\n  }\n'];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: '\n  fragment CommonCollectionProduct on Product {\n    id\n    name\n    slug\n    enabled\n    assets(input: { take: 1 }) {\n      items {\n        id\n        source\n      }\n    }\n  }\n'
): (typeof documents)['\n  fragment CommonCollectionProduct on Product {\n    id\n    name\n    slug\n    enabled\n    assets(input: { take: 1 }) {\n      items {\n        id\n        source\n      }\n    }\n  }\n'];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: '\n  fragment CommonCollectionSubCollection on Collection {\n    id\n    name\n    slug\n    enabled\n    assets(input: { take: 1 }) {\n      items {\n        id\n        source\n      }\n    }\n  }\n'
): (typeof documents)['\n  fragment CommonCollectionSubCollection on Collection {\n    id\n    name\n    slug\n    enabled\n    assets(input: { take: 1 }) {\n      items {\n        id\n        source\n      }\n    }\n  }\n'];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: '\n  query GetAllCollections($input: CollectionListInput) {\n    collections(input: $input) {\n      count\n      pageInfo {\n        total\n      }\n      items {\n        ...CommonListCollection\n      }\n    }\n  }\n'
): (typeof documents)['\n  query GetAllCollections($input: CollectionListInput) {\n    collections(input: $input) {\n      count\n      pageInfo {\n        total\n      }\n      items {\n        ...CommonListCollection\n      }\n    }\n  }\n'];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: '\n  query GetCollectionsExists {\n    collections(input: { take: 1 }) {\n      count\n    }\n  }\n'
): (typeof documents)['\n  query GetCollectionsExists {\n    collections(input: { take: 1 }) {\n      count\n    }\n  }\n'];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: '\n  query GetCollection($id: ID) {\n    collection(id: $id) {\n      ...CommonCollection\n    }\n  }\n'
): (typeof documents)['\n  query GetCollection($id: ID) {\n    collection(id: $id) {\n      ...CommonCollection\n    }\n  }\n'];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: '\n  query GetCollectionProducts($id: ID, $input: ProductListInput) {\n    collection(id: $id) {\n      products(input: $input) {\n        count\n        items {\n          ...CommonCollectionProduct\n        }\n      }\n    }\n  }\n'
): (typeof documents)['\n  query GetCollectionProducts($id: ID, $input: ProductListInput) {\n    collection(id: $id) {\n      products(input: $input) {\n        count\n        items {\n          ...CommonCollectionProduct\n        }\n      }\n    }\n  }\n'];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: '\n  query GetCollectionSubCollections($id: ID, $input: CollectionListInput) {\n    collection(id: $id) {\n      subCollections(input: $input) {\n        count\n        items {\n          ...CommonCollectionSubCollection\n        }\n      }\n    }\n  }\n'
): (typeof documents)['\n  query GetCollectionSubCollections($id: ID, $input: CollectionListInput) {\n    collection(id: $id) {\n      subCollections(input: $input) {\n        count\n        items {\n          ...CommonCollectionSubCollection\n        }\n      }\n    }\n  }\n'];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: '\n  query GetCollectionForTranslation($id: ID) {\n    collection(id: $id) {\n      ...CommonCollectionForTranslation\n    }\n  }\n'
): (typeof documents)['\n  query GetCollectionForTranslation($id: ID) {\n    collection(id: $id) {\n      ...CommonCollectionForTranslation\n    }\n  }\n'];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: '\n  mutation CreateCollection($input: CreateCollectionInput!) {\n    createCollection(input: $input) {\n      id\n    }\n  }\n'
): (typeof documents)['\n  mutation CreateCollection($input: CreateCollectionInput!) {\n    createCollection(input: $input) {\n      id\n    }\n  }\n'];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: '\n  mutation UpdateCollection($id: ID!, $input: UpdateCollectionInput!) {\n    updateCollection(id: $id, input: $input) {\n      id\n    }\n  }\n'
): (typeof documents)['\n  mutation UpdateCollection($id: ID!, $input: UpdateCollectionInput!) {\n    updateCollection(id: $id, input: $input) {\n      id\n    }\n  }\n'];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: '\n  mutation RemoveCollections($ids: [ID!]!) {\n    removeCollections(ids: $ids)\n  }\n'
): (typeof documents)['\n  mutation RemoveCollections($ids: [ID!]!) {\n    removeCollections(ids: $ids)\n  }\n'];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: '\n  mutation AddCollectionTranslationMutation($id: ID!, $input: CollectionTranslationInput!) {\n    addCollectionTranslation(id: $id, input: $input) {\n      id\n    }\n  }\n'
): (typeof documents)['\n  mutation AddCollectionTranslationMutation($id: ID!, $input: CollectionTranslationInput!) {\n    addCollectionTranslation(id: $id, input: $input) {\n      id\n    }\n  }\n'];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: '\n  fragment CommonCountry on Country {\n    id\n    name\n    states {\n      id\n      name\n    }\n  }\n'
): (typeof documents)['\n  fragment CommonCountry on Country {\n    id\n    name\n    states {\n      id\n      name\n    }\n  }\n'];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: '\n  fragment CommonCountryForSelector on Country {\n    id\n    name\n  }\n'
): (typeof documents)['\n  fragment CommonCountryForSelector on Country {\n    id\n    name\n  }\n'];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: '\n  query GetCountries {\n    countries {\n      ...CommonCountry\n    }\n  }\n'
): (typeof documents)['\n  query GetCountries {\n    countries {\n      ...CommonCountry\n    }\n  }\n'];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: '\n  query GetCountriesForSelector {\n    countries {\n      ...CommonCountryForSelector\n    }\n  }\n'
): (typeof documents)['\n  query GetCountriesForSelector {\n    countries {\n      ...CommonCountryForSelector\n    }\n  }\n'];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: '\n  fragment CommonLocation on Location {\n    id\n    name\n    createdAt\n    enabled\n    streetLine1\n    streetLine2\n    city\n    phoneNumber\n    postalCode\n    country {\n      id\n      name\n    }\n    state {\n      id\n      name\n    }\n    inStorePickup {\n      isAvailable\n      instructions\n    }\n  }\n'
): (typeof documents)['\n  fragment CommonLocation on Location {\n    id\n    name\n    createdAt\n    enabled\n    streetLine1\n    streetLine2\n    city\n    phoneNumber\n    postalCode\n    country {\n      id\n      name\n    }\n    state {\n      id\n      name\n    }\n    inStorePickup {\n      isAvailable\n      instructions\n    }\n  }\n'];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: '\n  fragment CommonListLocation on Location {\n    id\n    name\n    enabled\n    streetLine1\n    city\n    postalCode\n    inStorePickup {\n      isAvailable\n    }\n    country {\n      name\n    }\n    state {\n      name\n    }\n  }\n'
): (typeof documents)['\n  fragment CommonListLocation on Location {\n    id\n    name\n    enabled\n    streetLine1\n    city\n    postalCode\n    inStorePickup {\n      isAvailable\n    }\n    country {\n      name\n    }\n    state {\n      name\n    }\n  }\n'];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: '\n  query GetAllLocations {\n    locations {\n      items {\n        ...CommonListLocation\n      }\n    }\n  }\n'
): (typeof documents)['\n  query GetAllLocations {\n    locations {\n      items {\n        ...CommonListLocation\n      }\n    }\n  }\n'];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: '\n  query GetLocationById($id: ID!) {\n    location(id: $id) {\n      ...CommonLocation\n    }\n  }\n'
): (typeof documents)['\n  query GetLocationById($id: ID!) {\n    location(id: $id) {\n      ...CommonLocation\n    }\n  }\n'];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: '\n  mutation CreateLocation($input: CreateLocationInput!) {\n    createLocation(input: $input) {\n      apiErrors {\n        code\n        message\n      }\n      location {\n        id\n      }\n    }\n  }\n'
): (typeof documents)['\n  mutation CreateLocation($input: CreateLocationInput!) {\n    createLocation(input: $input) {\n      apiErrors {\n        code\n        message\n      }\n      location {\n        id\n      }\n    }\n  }\n'];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: '\n  mutation UpdateLocation($id: ID!, $input: UpdateLocationInput!) {\n    updateLocation(id: $id, input: $input) {\n      apiErrors {\n        code\n        message\n      }\n      location {\n        id\n      }\n    }\n  }\n'
): (typeof documents)['\n  mutation UpdateLocation($id: ID!, $input: UpdateLocationInput!) {\n    updateLocation(id: $id, input: $input) {\n      apiErrors {\n        code\n        message\n      }\n      location {\n        id\n      }\n    }\n  }\n'];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: '\n  mutation RemoveLocation($id: ID!) {\n    removeLocation(id: $id)\n  }\n'
): (typeof documents)['\n  mutation RemoveLocation($id: ID!) {\n    removeLocation(id: $id)\n  }\n'];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: '\n  mutation UpdateInStorePickupPreferences(\n    $locationId: ID!\n    $input: UpdateInStorePickupPreferencesInput!\n  ) {\n    updateInStorePickupPreferences(locationId: $locationId, input: $input) {\n      id\n    }\n  }\n'
): (typeof documents)['\n  mutation UpdateInStorePickupPreferences(\n    $locationId: ID!\n    $input: UpdateInStorePickupPreferencesInput!\n  ) {\n    updateInStorePickupPreferences(locationId: $locationId, input: $input) {\n      id\n    }\n  }\n'];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: '\n  fragment CommonOptionPreset on OptionPreset {\n    id\n    name\n    values {\n      items {\n        id\n        name\n        metadata\n      }\n    }\n  }\n'
): (typeof documents)['\n  fragment CommonOptionPreset on OptionPreset {\n    id\n    name\n    values {\n      items {\n        id\n        name\n        metadata\n      }\n    }\n  }\n'];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: '\n  query GetAllOptionPresets($input: ListInput) {\n    optionPresets(input: $input) {\n      items {\n        ...CommonOptionPreset\n      }\n    }\n  }\n'
): (typeof documents)['\n  query GetAllOptionPresets($input: ListInput) {\n    optionPresets(input: $input) {\n      items {\n        ...CommonOptionPreset\n      }\n    }\n  }\n'];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: '\n  mutation CreateOption($productId: ID!, $input: [CreateOptionInput!]!) {\n    createOption(productId: $productId, input: $input) {\n      id\n      name\n      values {\n        id\n        name\n      }\n    }\n  }\n'
): (typeof documents)['\n  mutation CreateOption($productId: ID!, $input: [CreateOptionInput!]!) {\n    createOption(productId: $productId, input: $input) {\n      id\n      name\n      values {\n        id\n        name\n      }\n    }\n  }\n'];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: '\n  mutation UpdateOption($id: ID!, $input: UpdateOptionInput!) {\n    updateOption(id: $id, input: $input) {\n      id\n      name\n      values {\n        id\n        name\n      }\n    }\n  }\n'
): (typeof documents)['\n  mutation UpdateOption($id: ID!, $input: UpdateOptionInput!) {\n    updateOption(id: $id, input: $input) {\n      id\n      name\n      values {\n        id\n        name\n      }\n    }\n  }\n'];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: '\n  mutation RemoveOption($id: ID!) {\n    softRemoveOption(id: $id) {\n      id\n    }\n  }\n'
): (typeof documents)['\n  mutation RemoveOption($id: ID!) {\n    softRemoveOption(id: $id) {\n      id\n    }\n  }\n'];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: '\n  fragment CommonPaymentMethod on PaymentMethod {\n    id\n    createdAt\n    name\n    enabled\n    handler {\n      code\n      args\n    }\n  }\n'
): (typeof documents)['\n  fragment CommonPaymentMethod on PaymentMethod {\n    id\n    createdAt\n    name\n    enabled\n    handler {\n      code\n      args\n    }\n  }\n'];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: '\n  fragment CommonPaymentHandler on PaymentHandler {\n    name\n    code\n    args\n  }\n'
): (typeof documents)['\n  fragment CommonPaymentHandler on PaymentHandler {\n    name\n    code\n    args\n  }\n'];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: '\n  query GetAllPaymentMethods {\n    paymentMethods {\n      ...CommonPaymentMethod\n    }\n  }\n'
): (typeof documents)['\n  query GetAllPaymentMethods {\n    paymentMethods {\n      ...CommonPaymentMethod\n    }\n  }\n'];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: '\n  query GetPaymentMethods($id: ID!) {\n    paymentMethod(id: $id) {\n      ...CommonPaymentMethod\n    }\n  }\n'
): (typeof documents)['\n  query GetPaymentMethods($id: ID!) {\n    paymentMethod(id: $id) {\n      ...CommonPaymentMethod\n    }\n  }\n'];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: '\n  query GetAllPaymentHandlers {\n    paymentHandlers {\n      ...CommonPaymentHandler\n    }\n  }\n'
): (typeof documents)['\n  query GetAllPaymentHandlers {\n    paymentHandlers {\n      ...CommonPaymentHandler\n    }\n  }\n'];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: '\n  mutation CreatePaymentMethod($input: CreatePaymentMethodInput!) {\n    createPaymentMethod(input: $input) {\n      apiErrors {\n        code\n        message\n      }\n      paymentMethod {\n        id\n      }\n    }\n  }\n'
): (typeof documents)['\n  mutation CreatePaymentMethod($input: CreatePaymentMethodInput!) {\n    createPaymentMethod(input: $input) {\n      apiErrors {\n        code\n        message\n      }\n      paymentMethod {\n        id\n      }\n    }\n  }\n'];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: '\n  mutation UpdatePaymentMethod($id: ID!, $input: UpdatePaymentMethodInput!) {\n    updatePaymentMethod(id: $id, input: $input) {\n      id\n    }\n  }\n'
): (typeof documents)['\n  mutation UpdatePaymentMethod($id: ID!, $input: UpdatePaymentMethodInput!) {\n    updatePaymentMethod(id: $id, input: $input) {\n      id\n    }\n  }\n'];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: '\n  mutation RemovePaymentMethod($id: ID!) {\n    removePaymentMethod(id: $id)\n  }\n'
): (typeof documents)['\n  mutation RemovePaymentMethod($id: ID!) {\n    removePaymentMethod(id: $id)\n  }\n'];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: '\n  fragment CommonProductForTranslation on Product {\n    id\n    createdAt\n    name\n    description\n    slug\n    enabled\n    options {\n      id\n      name\n      translations {\n        id\n        locale\n        name\n      }\n      values {\n        id\n        name\n        preset {\n          id\n        }\n        translations {\n          id\n          locale\n          name\n        }\n      }\n    }\n    translations {\n      name\n      slug\n      description\n      locale\n    }\n    assets(input: { take: 1 }) {\n      items {\n        id\n        source\n        order\n      }\n    }\n  }\n'
): (typeof documents)['\n  fragment CommonProductForTranslation on Product {\n    id\n    createdAt\n    name\n    description\n    slug\n    enabled\n    options {\n      id\n      name\n      translations {\n        id\n        locale\n        name\n      }\n      values {\n        id\n        name\n        preset {\n          id\n        }\n        translations {\n          id\n          locale\n          name\n        }\n      }\n    }\n    translations {\n      name\n      slug\n      description\n      locale\n    }\n    assets(input: { take: 1 }) {\n      items {\n        id\n        source\n        order\n      }\n    }\n  }\n'];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: '\n  fragment CommonProduct on Product {\n    id\n    createdAt\n    name\n    description\n    slug\n    enabled\n    minSalePrice\n    variants {\n      items {\n        id\n        salePrice\n        sku\n        stock\n        comparisonPrice\n        costPerUnit\n        requiresShipping\n        weight\n        dimensions {\n          length\n          width\n          height\n        }\n        optionValues {\n          id\n          name\n        }\n        assets {\n          items {\n            id\n            source\n          }\n        }\n      }\n    }\n    options {\n      id\n      name\n      values {\n        id\n        name\n        preset {\n          id\n          name\n          metadata\n        }\n      }\n    }\n    assets {\n      items {\n        id\n        source\n        order\n      }\n    }\n  }\n'
): (typeof documents)['\n  fragment CommonProduct on Product {\n    id\n    createdAt\n    name\n    description\n    slug\n    enabled\n    minSalePrice\n    variants {\n      items {\n        id\n        salePrice\n        sku\n        stock\n        comparisonPrice\n        costPerUnit\n        requiresShipping\n        weight\n        dimensions {\n          length\n          width\n          height\n        }\n        optionValues {\n          id\n          name\n        }\n        assets {\n          items {\n            id\n            source\n          }\n        }\n      }\n    }\n    options {\n      id\n      name\n      values {\n        id\n        name\n        preset {\n          id\n          name\n          metadata\n        }\n      }\n    }\n    assets {\n      items {\n        id\n        source\n        order\n      }\n    }\n  }\n'];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: '\n  fragment CommonListProduct on Product {\n    id\n    createdAt\n    name\n    slug\n    enabled\n    minSalePrice\n    variants {\n      items {\n        id\n        sku\n        stock\n        salePrice\n      }\n    }\n    assets(input: { take: 1 }) {\n      items {\n        id\n        source\n      }\n    }\n  }\n'
): (typeof documents)['\n  fragment CommonListProduct on Product {\n    id\n    createdAt\n    name\n    slug\n    enabled\n    minSalePrice\n    variants {\n      items {\n        id\n        sku\n        stock\n        salePrice\n      }\n    }\n    assets(input: { take: 1 }) {\n      items {\n        id\n        source\n      }\n    }\n  }\n'];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: '\n  query GetProducts($input: ProductListInput) {\n    products(input: $input) {\n      count\n      pageInfo {\n        total\n      }\n      items {\n        ...CommonListProduct\n      }\n    }\n  }\n'
): (typeof documents)['\n  query GetProducts($input: ProductListInput) {\n    products(input: $input) {\n      count\n      pageInfo {\n        total\n      }\n      items {\n        ...CommonListProduct\n      }\n    }\n  }\n'];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: '\n  query GetProductsExists {\n    products(input: { take: 1 }) {\n      count\n    }\n  }\n'
): (typeof documents)['\n  query GetProductsExists {\n    products(input: { take: 1 }) {\n      count\n    }\n  }\n'];
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
  source: '\n  query GetProductForTranslation($id: ID) {\n    product(id: $id) {\n      ...CommonProductForTranslation\n    }\n  }\n'
): (typeof documents)['\n  query GetProductForTranslation($id: ID) {\n    product(id: $id) {\n      ...CommonProductForTranslation\n    }\n  }\n'];
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
  source: '\n  mutation RemoveProducts($ids: [ID!]!) {\n    softRemoveProducts(ids: $ids)\n  }\n'
): (typeof documents)['\n  mutation RemoveProducts($ids: [ID!]!) {\n    softRemoveProducts(ids: $ids)\n  }\n'];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: '\n  mutation AddProductTranslationMutation($id: ID!, $input: AddProductTranslationInput!) {\n    addProductTranslation(id: $id, input: $input) {\n      id\n    }\n  }\n'
): (typeof documents)['\n  mutation AddProductTranslationMutation($id: ID!, $input: AddProductTranslationInput!) {\n    addProductTranslation(id: $id, input: $input) {\n      id\n    }\n  }\n'];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: '\n  fragment CommonShippingHandlers on ShippingHandler {\n    name\n    code\n    args\n  }\n'
): (typeof documents)['\n  fragment CommonShippingHandlers on ShippingHandler {\n    name\n    code\n    args\n  }\n'];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: '\n  query GetAllHandlers {\n    shippingHandlers {\n      ...CommonShippingHandlers\n    }\n  }\n'
): (typeof documents)['\n  query GetAllHandlers {\n    shippingHandlers {\n      ...CommonShippingHandlers\n    }\n  }\n'];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: '\n  mutation CreateShippingMethod($input: CreateShippingMethodInput!) {\n    createShippingMethod(input: $input) {\n      apiErrors {\n        code\n        message\n      }\n      shippingMethod {\n        id\n      }\n    }\n  }\n'
): (typeof documents)['\n  mutation CreateShippingMethod($input: CreateShippingMethodInput!) {\n    createShippingMethod(input: $input) {\n      apiErrors {\n        code\n        message\n      }\n      shippingMethod {\n        id\n      }\n    }\n  }\n'];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: '\n  mutation UpdateShippingMethod($id: ID!, $input: UpdateShippingMethodInput!) {\n    updateShippingMethod(id: $id, input: $input) {\n      id\n    }\n  }\n'
): (typeof documents)['\n  mutation UpdateShippingMethod($id: ID!, $input: UpdateShippingMethodInput!) {\n    updateShippingMethod(id: $id, input: $input) {\n      id\n    }\n  }\n'];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: '\n  mutation RemoveShippingMethod($id: ID!) {\n    removeShippingMethod(id: $id)\n  }\n'
): (typeof documents)['\n  mutation RemoveShippingMethod($id: ID!) {\n    removeShippingMethod(id: $id)\n  }\n'];
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
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: '\n  mutation CreateVariant($productId: ID!, $input: [CreateVariantInput!]!) {\n    createVariant(productId: $productId, input: $input) {\n      id\n    }\n  }\n'
): (typeof documents)['\n  mutation CreateVariant($productId: ID!, $input: [CreateVariantInput!]!) {\n    createVariant(productId: $productId, input: $input) {\n      id\n    }\n  }\n'];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: '\n  mutation UpdateVariant($id: ID!, $input: UpdateVariantInput!) {\n    updateVariant(id: $id, input: $input) {\n      id\n    }\n  }\n'
): (typeof documents)['\n  mutation UpdateVariant($id: ID!, $input: UpdateVariantInput!) {\n    updateVariant(id: $id, input: $input) {\n      id\n    }\n  }\n'];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: '\n  mutation SoftRemoveVariant($id: ID!) {\n    softRemoveVariant(id: $id) {\n      id\n    }\n  }\n'
): (typeof documents)['\n  mutation SoftRemoveVariant($id: ID!) {\n    softRemoveVariant(id: $id) {\n      id\n    }\n  }\n'];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: '\n  fragment CommonZone on Zone {\n    id\n    name\n    createdAt\n    states {\n      id\n      name\n    }\n    shippingMethods {\n      id\n      name\n      enabled\n      pricePreview\n      handler {\n        code\n        args\n      }\n    }\n  }\n'
): (typeof documents)['\n  fragment CommonZone on Zone {\n    id\n    name\n    createdAt\n    states {\n      id\n      name\n    }\n    shippingMethods {\n      id\n      name\n      enabled\n      pricePreview\n      handler {\n        code\n        args\n      }\n    }\n  }\n'];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: '\n  fragment CommonListZone on Zone {\n    id\n    name\n    shippingMethods {\n      id\n    }\n  }\n'
): (typeof documents)['\n  fragment CommonListZone on Zone {\n    id\n    name\n    shippingMethods {\n      id\n    }\n  }\n'];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: '\n  query getAllZones {\n    zones {\n      ...CommonListZone\n    }\n  }\n'
): (typeof documents)['\n  query getAllZones {\n    zones {\n      ...CommonListZone\n    }\n  }\n'];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: '\n  query GetZone($id: ID!) {\n    zone(id: $id) {\n      ...CommonZone\n    }\n  }\n'
): (typeof documents)['\n  query GetZone($id: ID!) {\n    zone(id: $id) {\n      ...CommonZone\n    }\n  }\n'];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: '\n  mutation CreateZone($input: CreateZoneInput!) {\n    createZone(input: $input) {\n      id\n    }\n  }\n'
): (typeof documents)['\n  mutation CreateZone($input: CreateZoneInput!) {\n    createZone(input: $input) {\n      id\n    }\n  }\n'];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: '\n  mutation UpdateZone($id: ID!, $input: UpdateZoneInput!) {\n    updateZone(id: $id, input: $input) {\n      id\n    }\n  }\n'
): (typeof documents)['\n  mutation UpdateZone($id: ID!, $input: UpdateZoneInput!) {\n    updateZone(id: $id, input: $input) {\n      id\n    }\n  }\n'];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: '\n  mutation RemoveZone($id: ID!) {\n    removeZone(id: $id)\n  }\n'
): (typeof documents)['\n  mutation RemoveZone($id: ID!) {\n    removeZone(id: $id)\n  }\n'];

export function graphql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> =
  TDocumentNode extends DocumentNode<infer TType, any> ? TType : never;
