import { CollectionContentType } from '@/api/shared/types/graphql';
import type { Transaction } from '@/persistence/connection/connection';
import type { CollectionTable } from '@/persistence/entities/collection';
import { Tables } from '@/persistence/tables';
import { TestUtils } from '@/tests/utils/test-utils';

import { CollectionRepository } from '../collection.repository';

import { AssetConstants, AssetFixtures } from './fixtures/asset.fixtures';
import { CollectionConstants, CollectionFixtures } from './fixtures/collection.fixtures';
import { CollectionAssetFixtures } from './fixtures/collection-assets.fixtures';
import { CollectionProductFixtures } from './fixtures/collection-product.fixtures';
import { ProductConstants, ProductFixtures } from './fixtures/product.fixtures';
import { ShopFixtures } from './fixtures/shop.fixtures';
import { UserFixtures } from './fixtures/user.fixtures';

describe('Collection repository', () => {
  const testHelper = new TestUtils();

  let repository: CollectionRepository;
  let trx: Transaction;

  beforeEach(async () => {
    trx = await testHelper.generateTrx();
    repository = new CollectionRepository(trx);

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
  });

  describe('findByFilters & countByFilters', () => {
    test('returns all collections', async () => {
      const result = await repository.findByFilters({});

      expect(result.length).toBe(await repository.countByFilters({}));
    });

    test('returns all collections without a parent', async () => {
      const filters = { isTopLevel: { equals: true } };
      const result = await repository.findByFilters({ filters });

      expect(result.every(c => !c.parentId)).toBe(true);
      expect(result.length).toBe(await repository.countByFilters({ ...filters }));
    });

    test('returns all collections with a parent', async () => {
      const filters = { isTopLevel: { equals: false } };
      const result = await repository.findByFilters({ filters });

      expect(result.every(c => c.parentId)).toBe(true);
      expect(result.length).toBe(await repository.countByFilters({ ...filters }));
    });

    test('returns collections sorted by createdAt in descending order by default', async () => {
      const result = await repository.findByFilters({});

      const sorted = await trx<CollectionTable>(Tables.Collection).orderBy('created_at', 'desc');

      expect(result.map(p => p.id)).toEqual(sorted.map(p => p.id));
    });

    test('returns collections matching name filter (contains)', async () => {
      const filters = { name: { contains: 'man' } };

      const result = await repository.findByFilters({ filters });

      expect(result.map(p => p.name).every(name => name.includes('man'))).toBe(true);
      expect(result.length).toBe(await repository.countByFilters(filters));
    });

    test('returns collections matching name filter (equals)', async () => {
      const filters = { name: { equals: 'Joel' } };
      const result = await repository.findByFilters({ filters });

      expect(result[0].name).toBe('Joel');
      expect(result.length).toBe(await repository.countByFilters(filters));
    });

    test('returns collections matching enabled filter', async () => {
      const filters = { enabled: { equals: false } };
      const result = await repository.findByFilters({ filters });

      expect(result).toHaveLength(2);
      expect(result.every(p => p.enabled)).toBe(false);
      expect(result.length).toBe(await repository.countByFilters(filters));
    });

    test('returns collections matching content type filter (PRODUCTS)', async () => {
      const filters = { contentType: CollectionContentType.Products };
      const result = await repository.findByFilters({ filters });

      expect(result).toHaveLength(14);
      expect(result.every(p => p.contentType === 'PRODUCTS')).toBe(true);
      expect(result.length).toBe(await repository.countByFilters(filters));
    });

    test('returns collections matching content type filter (COLLECTIONS)', async () => {
      const filters = { contentType: CollectionContentType.Collections };
      const result = await repository.findByFilters({ filters });

      expect(result).toHaveLength(2);
      expect(result.every(p => p.contentType === 'COLLECTIONS')).toBe(true);
      expect(result.length).toBe(await repository.countByFilters(filters));
    });

    test('returns limited number of collections', async () => {
      const result = await repository.findByFilters({ take: 4 });

      expect(result).toHaveLength(4);
      expect(await repository.countByFilters({})).toBe(16);
    });

    test('returns collections with offset', async () => {
      const result = await repository.findByFilters({ skip: 5 });

      expect(result).toHaveLength(11);
      expect(await repository.countByFilters({})).toBe(16);
    });

    test('returns collections with pagination', async () => {
      const result = await repository.findByFilters({ take: 2, skip: 4 });

      expect(result).toHaveLength(2);
      expect(result[0].id).toBe(CollectionConstants.WosCollection);
      expect(result[1].id).toBe(CollectionConstants.AppleCollection);
      expect(await repository.countByFilters({})).toBe(16);
    });

    test('returns collections with name and content type filter applied', async () => {
      const filters = { name: { equals: 'Ale' }, contentType: CollectionContentType.Products };
      const result = await repository.findByFilters({ filters });

      expect(result).toHaveLength(1);
      expect(result[0].id).toBe(CollectionConstants.AlesCollection);
      expect(result.length).toBe(await repository.countByFilters(filters));
    });
  });

  describe('findAssets', () => {
    test('returns all collection assets', async () => {
      const assets = await repository.findAssets(CollectionConstants.EllieCollection);

      expect(assets).toHaveLength(2);
      expect(assets[0].id).toBe(AssetConstants.EllieImageID);
      expect(assets[1].id).toBe(AssetConstants.ImageID);
    });
  });

  describe('findProducts', () => {
    test('returns all collection products', async () => {
      const products = await repository.findProducts(CollectionConstants.EllieCollection);

      expect(products).toHaveLength(4);
    });
  });

  describe('upsertAssets', () => {
    test('creates collection assets', async () => {
      await repository.upsertAssets(CollectionConstants.AlesCollection, [
        { id: AssetConstants.ImageID, order: 0 },
        { id: AssetConstants.MeImageID, order: 1 }
      ]);

      const createdAssets = await repository.findAssets(CollectionConstants.AlesCollection);

      expect(createdAssets).toHaveLength(2);
      expect(createdAssets[0].id).toBe(AssetConstants.ImageID);
      expect(createdAssets[1].id).toBe(AssetConstants.MeImageID);
    });

    test('re order product assets', async () => {
      await repository.upsertAssets(CollectionConstants.EllieCollection, [
        { id: AssetConstants.ImageID, order: 0 },
        { id: AssetConstants.EllieImageID, order: 1 }
      ]);

      const createdAssets = await repository.findAssets(CollectionConstants.EllieCollection);

      expect(createdAssets).toHaveLength(2);
      expect(createdAssets[0].id).toBe(AssetConstants.ImageID);
      expect(createdAssets[1].id).toBe(AssetConstants.EllieImageID);
    });
  });

  describe('upsertProducts', () => {
    test('creates collection products', async () => {
      await repository.upsertProducts(CollectionConstants.AlesCollection, [
        ProductConstants.ShirtID,
        ProductConstants.BeachShirtID,
        ProductConstants.JeansID
      ]);

      const createdProducts = await repository.findProducts(CollectionConstants.AlesCollection);

      expect(createdProducts).toHaveLength(3);
      expect(createdProducts.find(p => p.id === ProductConstants.ShirtID)).toBeDefined();
      expect(createdProducts.find(p => p.id === ProductConstants.BeachShirtID)).toBeDefined();
      expect(createdProducts.find(p => p.id === ProductConstants.JeansID)).toBeDefined();
    });
  });

  describe('addSubCollections', () => {
    test('add sub collections to existing collection', async () => {
      await repository.addSubCollections(CollectionConstants.ParentCollection1, [
        CollectionConstants.Ala,
        CollectionConstants.Alaska,
        CollectionConstants.Ales
      ]);

      const [alaCollection, alaskaCollection, alesCollection] = await Promise.all([
        trx<CollectionTable>(Tables.Collection).where({ id: CollectionConstants.Ala }).first(),
        trx<CollectionTable>(Tables.Collection).where({ id: CollectionConstants.Alaska }).first(),
        trx<CollectionTable>(Tables.Collection).where({ id: CollectionConstants.Ales }).first()
      ]);

      expect(alaCollection?.parent_id).toBe(CollectionConstants.ParentCollection1);
      expect(alaskaCollection?.parent_id).toBe(CollectionConstants.ParentCollection1);
      expect(alesCollection?.parent_id).toBe(CollectionConstants.ParentCollection1);
    });
  });

  describe('removeAssets', () => {
    test('remove collection assets', async () => {
      await repository.removeAssets(CollectionConstants.EllieCollection, [
        AssetConstants.EllieImageID
      ]);

      const assets = await repository.findAssets(CollectionConstants.EllieCollection);

      expect(assets).toHaveLength(1);
      expect(assets[0]?.id).toBe(AssetConstants.ImageID);
    });
  });

  describe('removeProducts', () => {
    test('remove collection products', async () => {
      await repository.removeProducts(CollectionConstants.EllieCollection, [
        ProductConstants.AirPodsPro2ndGenID,
        ProductConstants.AppleWatchSeries8ID
      ]);

      const products = await repository.findProducts(CollectionConstants.EllieCollection);

      expect(products).toHaveLength(2);
      expect(products.find(p => p.id === ProductConstants.MacBookPro16ID)).toBeDefined();
      expect(products.find(p => p.id === ProductConstants.iPhone14ProMaxID)).toBeDefined();
    });
  });

  describe('removeSubCollection', () => {
    test('remove subCollections from collection', async () => {
      await repository.removeSubCollection([
        CollectionConstants.EllieCollection,
        CollectionConstants.TaylorSwiftCollection,
        CollectionConstants.GamesCollection,
        CollectionConstants.AlesCollection,
        CollectionConstants.WosCollection
      ]);

      const collections = await Promise.all([
        repository.findOne({ where: { id: CollectionConstants.EllieCollection } }),
        repository.findOne({ where: { id: CollectionConstants.TaylorSwiftCollection } }),
        repository.findOne({ where: { id: CollectionConstants.GamesCollection } }),
        repository.findOne({ where: { id: CollectionConstants.AlesCollection } }),
        repository.findOne({ where: { id: CollectionConstants.WosCollection } })
      ]);

      expect(collections.every(c => !c?.parentId)).toBe(true);
    });
  });
});
