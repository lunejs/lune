import request from 'supertest';

import { LuneServer } from '@/server';
import { TEST_LUNE_CONFIG } from '@/tests/utils/test-config';
import { TestHelper } from '@/tests/utils/test-helper';

import { AssetFixtures } from './fixtures/asset.fixtures';
import { CollectionConstants, CollectionFixtures } from './fixtures/collection.fixtures';
import { CollectionAssetFixtures } from './fixtures/collection-assets.fixtures';
import { CollectionProductFixtures } from './fixtures/collection-product.fixtures';
import { ProductFixtures } from './fixtures/product.fixtures';
import { ShopConstants, ShopFixtures } from './fixtures/shop.fixtures';
import { UserConstants, UserFixtures } from './fixtures/user.fixtures';

describe('collections - Query', () => {
  const testHelper = new TestHelper();

  const luneServer = new LuneServer(TEST_LUNE_CONFIG);
  const app = luneServer.getApp();

  beforeEach(async () => {
    await testHelper.loadFixtures([
      new UserFixtures(),
      new ShopFixtures(),
      new CollectionFixtures(),
      new ProductFixtures(),
      new AssetFixtures(),
      new CollectionProductFixtures(),
      new CollectionAssetFixtures()
    ]);
  });

  afterEach(async () => {
    await testHelper.resetDatabase();
  });

  afterAll(async () => {
    await testHelper.destroyDatabase();
    await luneServer.teardown();
  });

  test('returns a list of collections with pagination', async () => {
    const res = await request(app)
      .post('/admin-api')
      .set('Authorization', `Bearer ${UserConstants.AccessToken}`)
      .set('x_lune_shop_id', ShopConstants.ID)
      .send({
        query: GET_COLLECTIONS_QUERY,
        variables: {
          input: {
            skip: 4,
            take: 4
          }
        }
      });

    const { collections } = res.body.data;

    expect(collections.items).toHaveLength(4);
    expect(collections.count).toBe(4);
    expect(collections.pageInfo.total).toBe(16);
    expect(collections.items[0].id).toBe(CollectionConstants.WosCollection);
    expect(collections.items[1].id).toBe(CollectionConstants.AppleCollection);
    expect(collections.items[2].id).toBe(CollectionConstants.JoelCollection);
    expect(collections.items[3].id).toBe(CollectionConstants.SpiderManCollection);
  });

  test('returns a list of collections with name filter', async () => {
    const res = await request(app)
      .post('/admin-api')
      .set('Authorization', `Bearer ${UserConstants.AccessToken}`)
      .set('x_lune_shop_id', ShopConstants.ID)
      .send({
        query: GET_COLLECTIONS_QUERY,
        variables: {
          input: {
            filters: {
              name: { contains: 'al' }
            }
          }
        }
      });

    const { collections } = res.body.data;

    expect(collections.items).toHaveLength(4);
    expect(collections.count).toBe(4);
    expect(collections.pageInfo.total).toBe(4);
    expect(collections.items[0].id).toBe(CollectionConstants.AlesCollection);
    expect(collections.items[1].id).toBe(CollectionConstants.Alaska);
    expect(collections.items[2].id).toBe(CollectionConstants.Ales);
    expect(collections.items[3].id).toBe(CollectionConstants.Ala);
  });

  test('returns a list of collections with enabled filter', async () => {
    const res = await request(app)
      .post('/admin-api')
      .set('Authorization', `Bearer ${UserConstants.AccessToken}`)
      .set('x_lune_shop_id', ShopConstants.ID)
      .send({
        query: GET_COLLECTIONS_QUERY,
        variables: {
          input: {
            filters: {
              enabled: { equals: false }
            }
          }
        }
      });

    const { collections } = res.body.data;

    expect(collections.items).toHaveLength(2);
    expect(collections.count).toBe(2);
    expect(collections.pageInfo.total).toBe(2);
    expect(collections.items[0].id).toBe(CollectionConstants.WaterCollection);
    expect(collections.items[1].id).toBe(CollectionConstants.Lego);
  });

  test('returns a list of collections with contentType filter', async () => {
    const res = await request(app)
      .post('/admin-api')
      .set('Authorization', `Bearer ${UserConstants.AccessToken}`)
      .set('x_lune_shop_id', ShopConstants.ID)
      .send({
        query: GET_COLLECTIONS_QUERY,
        variables: {
          input: {
            filters: {
              contentType: 'COLLECTIONS'
            }
          }
        }
      });

    const { collections } = res.body.data;

    expect(collections.items).toHaveLength(2);
    expect(collections.count).toBe(2);
    expect(collections.pageInfo.total).toBe(2);

    expect(collections.items.every(c => c.contentType === 'COLLECTIONS'));
  });

  test('returns a list of collections with isTopLevel filter', async () => {
    const res = await request(app)
      .post('/admin-api')
      .set('Authorization', `Bearer ${UserConstants.AccessToken}`)
      .set('x_lune_shop_id', ShopConstants.ID)
      .send({
        query: GET_COLLECTIONS_QUERY,
        variables: {
          input: {
            filters: {
              isTopLevel: { equals: true }
            }
          }
        }
      });

    const { collections } = res.body.data;

    expect(collections.items).toHaveLength(11);
    expect(collections.count).toBe(11);
    expect(collections.pageInfo.total).toBe(11);
  });

  test('returns a list of collections with name filter and pagination', async () => {
    const res = await request(app)
      .post('/admin-api')
      .set('Authorization', `Bearer ${UserConstants.AccessToken}`)
      .set('x_lune_shop_id', ShopConstants.ID)
      .send({
        query: GET_COLLECTIONS_QUERY,
        variables: {
          input: {
            filters: {
              name: { contains: 'al' }
            },
            take: 2
          }
        }
      });

    const { collections } = res.body.data;

    expect(collections.items).toHaveLength(2);
    expect(collections.count).toBe(2);
    expect(collections.pageInfo.total).toBe(4);
    expect(collections.items[0].id).toBe(CollectionConstants.AlesCollection);
    expect(collections.items[1].id).toBe(CollectionConstants.Alaska);
  });

  test('returns Authorization error when no token is provided', async () => {
    const response = await request(app).post('/admin-api').send({
      query: GET_COLLECTIONS_QUERY,
      variables: {}
    });

    expect(response.body.errors[0].extensions.code).toBe('UNAUTHORIZED');
  });
});

const GET_COLLECTIONS_QUERY = /* GraphQL */ `
  query Collections($input: CollectionListInput) {
    collections(input: $input) {
      items {
        id
        createdAt
        name
        slug
        description
        enabled
        contentType
      }
      count
      pageInfo {
        total
      }
    }
  }
`;
