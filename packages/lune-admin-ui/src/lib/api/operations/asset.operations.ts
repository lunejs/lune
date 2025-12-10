import { graphql } from '../codegen';

export const COMMON_ASSET_FRAGMENT = graphql(`
  fragment CommonAsset on Asset {
    id
    createdAt
    filename
    ext
    source
    size
  }
`);

export const GET_ALL_ASSETS_QUERY = graphql(`
  query GetAllAssetsQuery($input: AssetListInput) {
    assets(input: $input) {
      count
      pageInfo {
        total
      }
      items {
        ...CommonAsset
      }
    }
  }
`);

export const COUNT_ASSETS_QUERY = graphql(`
  query CountAssetsQuery {
    assets {
      count
    }
  }
`);
