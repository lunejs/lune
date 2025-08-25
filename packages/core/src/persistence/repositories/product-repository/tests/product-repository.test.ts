import { TestHelper } from '@/tests/utils/test-helper';
import { UserFixtures } from './fixtures/user.fixtures';
import { ShopFixtures } from './fixtures/shop.fixtures';
import { ProductConstants, ProductFixtures } from './fixtures/product.fixtures';
import { ProductRepository } from '../product.repository';
import { Transaction } from '@/persistence/connection';
import { TagConstants, TagFixtures } from './fixtures/tag.fixtures';
import { ProductTagFixtures } from './fixtures/product-tag.fixtures';
import { convertToCent } from '@vendyx/common';
import { OptionValueFixtures } from './fixtures/option-value.fixtures';
import { OptionFixtures } from './fixtures/option.fixtures';
import { VariantFixtures } from './fixtures/variant.fixtures';
import { VariantOptionValueFixtures } from './fixtures/variant-option-value.fixtures';
import { OrderBy } from '@/api/shared/types/graphql';
import { Tables } from '@/persistence/tables';
import { AssetConstants, AssetFixtures } from './fixtures/asset.fixtures';
import { ProductAssetFixtures } from './fixtures/product-asset.fixtures';

describe('Product repository', () => {
  const testHelper = new TestHelper();

  let repository: ProductRepository;
  let trx: Transaction;

  beforeEach(async () => {
    trx = await testHelper.generateTrx();
    repository = new ProductRepository(trx);

    await testHelper.loadFixtures([
      new UserFixtures(),
      new ShopFixtures(),
      new ProductFixtures(),
      new TagFixtures(),
      new ProductTagFixtures(),
      new OptionFixtures(),
      new OptionValueFixtures(),
      new VariantFixtures(),
      new VariantOptionValueFixtures(),
      new AssetFixtures(),
      new ProductAssetFixtures()
    ]);
  });

  afterEach(async () => {
    await trx.rollback();
    await testHelper.resetDatabase();
  });

  afterAll(async () => {
    await testHelper.destroyDatabase();
  });

  describe('findByFilters & countByFilters', () => {
    test('returns products matching name filter (contains)', async () => {
      const filters = { name: { contains: 'Mac' } };

      const result = await repository.findByFilters({ filters });

      expect(result.map(p => p.name).every(name => name.includes('Mac'))).toBe(true);
      expect(result.length).toBe(await repository.countByFilters(filters));
    });

    test('returns products matching name filter (equals)', async () => {
      const filters = { name: { equals: 'MacBook Pro 16' } };
      const result = await repository.findByFilters({ filters });

      expect(result[0].name).toBe('MacBook Pro 16');
      expect(result.length).toBe(await repository.countByFilters(filters));
    });

    test('returns products matching enabled filter', async () => {
      const filters = { enabled: { equals: false } };
      const result = await repository.findByFilters({ filters });

      expect(result.length).toBe(2);
      expect(result.every(p => p.enabled)).toBe(false);
      expect(result.length).toBe(await repository.countByFilters(filters));
    });

    test('returns products matching tag filter', async () => {
      const filters = { tag: 'electronics' };
      const result = await repository.findByFilters({ filters });

      expect(result).toHaveLength(4);
      expect(result.find(p => p.id === ProductConstants.MacBookPro16ID)).toBeDefined();
      expect(result.find(p => p.id === ProductConstants.iPhone14ProMaxID)).toBeDefined();
      expect(result.find(p => p.id === ProductConstants.AppleWatchSeries8ID)).toBeDefined();
      expect(result.find(p => p.id === ProductConstants.AirPodsPro2ndGenID)).toBeDefined();
      expect(result.length).toBe(await repository.countByFilters(filters));
    });

    test('returns products matching min sale price range', async () => {
      const filters = { salePriceRange: { min: convertToCent(23_000) } };
      const result = await repository.findByFilters({ filters });

      expect(result.every(p => p.minSalePrice >= convertToCent(23_000))).toBe(true);
      expect(result.length).toBe(await repository.countByFilters(filters));
    });

    test('returns products matching max sale price range', async () => {
      const filters = { salePriceRange: { max: convertToCent(10_000) } };
      const result = await repository.findByFilters({ filters });

      expect(result.every(p => p.maxSalePrice <= convertToCent(10_000))).toBe(true);
      expect(result.length).toBe(await repository.countByFilters(filters));
    });

    test('returns products matching both min and max sale price range', async () => {
      const filters = { salePriceRange: { min: convertToCent(50), max: convertToCent(500) } };
      const result = await repository.findByFilters({ filters });

      expect(result.every(p => p.minSalePrice >= convertToCent(50))).toBe(true);
      expect(result.every(p => p.maxSalePrice <= convertToCent(500))).toBe(true);
      expect(result.length).toBe(await repository.countByFilters(filters));
    });

    test('returns products matching option values in the same group (OR)', async () => {
      const filters = {
        optionValues: [{ option: 'Color', values: ['Red', 'Green'] }]
      };
      const result = await repository.findByFilters({ filters });

      expect(result).toHaveLength(2);
      expect(result.find(p => p.id === ProductConstants.ShirtID)).toBeDefined();
      expect(result.find(p => p.id === ProductConstants.JacketID)).toBeDefined();
      expect(result.length).toBe(await repository.countByFilters(filters));
    });

    test('returns products matching multiple option values in different groups (AND)', async () => {
      const filters = {
        optionValues: [
          { option: 'Color', values: ['Red'] },
          { option: 'Material', values: ['Cotton'] }
        ]
      };

      const result = await repository.findByFilters({ filters });

      expect(result).toHaveLength(1);
      expect(result[0].id).toBe(ProductConstants.JacketID);
      expect(result.length).toBe(await repository.countByFilters(filters));
    });

    test('returns products matching sort by createdAt in descending order', async () => {
      const result = await repository.findByFilters({
        sort: { createdAt: OrderBy.Desc }
      });

      const sorted = await trx(Tables.Product).orderBy('created_at', 'desc');

      expect(result.map(p => p.createdAt)).toEqual(sorted.map(p => p.created_at));
    });

    test('returns products matching sort by createdAt in ascending order', async () => {
      const result = await repository.findByFilters({
        sort: { createdAt: OrderBy.Asc }
      });

      const sorted = await trx(Tables.Product).orderBy('created_at', 'asc');

      expect(result.map(p => p.createdAt)).toEqual(sorted.map(p => p.created_at));
    });

    test('returns products matching sort by name in descending order', async () => {
      const result = await repository.findByFilters({
        sort: { name: OrderBy.Desc }
      });

      const sorted = await trx(Tables.Product).orderBy('name', 'desc');

      expect(result.map(p => p.name)).toEqual(sorted.map(p => p.name));
    });

    test('returns products matching sort by name in ascending order', async () => {
      const result = await repository.findByFilters({
        sort: { name: OrderBy.Asc }
      });

      const sorted = await trx(Tables.Product).orderBy('name', 'asc');

      expect(result.map(p => p.name)).toEqual(sorted.map(p => p.name));
    });

    test('returns products matching sort by min sale price in descending order', async () => {
      const result = await repository.findByFilters({
        sort: { salePrice: OrderBy.Desc }
      });

      const sorted = await trx(Tables.Product).orderBy('min_sale_price', 'desc');

      expect(result.map(p => p.minSalePrice)).toEqual(sorted.map(p => p.min_sale_price));
    });

    test('returns products matching sort by min sale price in ascending order', async () => {
      const result = await repository.findByFilters({
        sort: { salePrice: OrderBy.Asc }
      });

      const sorted = await trx(Tables.Product).orderBy('min_sale_price', 'asc');

      expect(result.map(p => p.minSalePrice)).toEqual(sorted.map(p => p.min_sale_price));
    });

    test('returns limited number of products', async () => {
      const result = await repository.findByFilters({ take: 3 });

      expect(result).toHaveLength(3);
    });

    test('returns product with offset', async () => {
      const result = await repository.findByFilters({ skip: 2 });

      expect(result).toHaveLength((await new ProductFixtures().build()).length - 2);
    });

    test('returns products with pagination', async () => {
      const result = await repository.findByFilters({
        take: 2,
        skip: 1,
        sort: { createdAt: OrderBy.Desc }
      });

      expect(result).toHaveLength(2);
      expect(result[0].id).toBe(ProductConstants.iPhone14ProMaxID);
      expect(result[1].id).toBe(ProductConstants.AppleWatchSeries8ID);
    });

    test('returns products with name and tag filter applied', async () => {
      const filters = { name: { contains: 'Shirt' }, tag: 'clothing' };
      const result = await repository.findByFilters({ filters });

      expect(result).toHaveLength(2);
      expect(result.find(p => p.id === ProductConstants.ShirtID)).toBeDefined();
      expect(result.find(p => p.id === ProductConstants.BeachShirtID)).toBeDefined();
      expect(result.length).toBe(await repository.countByFilters(filters));
    });

    test('returns products with option values and price range filter applied', async () => {
      const filters = {
        optionValues: [{ option: 'Color', values: ['Red'] }],
        salePriceRange: { min: convertToCent(90) }
      };
      const result = await repository.findByFilters({ filters });

      expect(result).toHaveLength(1);
      expect(result[0].id).toBe(ProductConstants.JacketID);
      expect(result.length).toBe(await repository.countByFilters(filters));
    });

    test('returns products with name and option values filter applied', async () => {
      const filters = {
        optionValues: [{ option: 'Color', values: ['Red'] }],
        name: { contains: 'Shirt' }
      };

      const result = await repository.findByFilters({ filters });

      expect(result).toHaveLength(1);
      expect(result[0].id).toBe(ProductConstants.ShirtID);
      expect(result.length).toBe(await repository.countByFilters(filters));
    });

    test('returns products with filters and sort applied', async () => {
      const filters = { name: { contains: 'Shirt' }, tag: 'clothing' };
      const result = await repository.findByFilters({
        filters,
        sort: { createdAt: OrderBy.Asc }
      });

      expect(result).toHaveLength(2);
      expect(result[0].id).toBe(ProductConstants.BeachShirtID);
      expect(result[1].id).toBe(ProductConstants.ShirtID);
      expect(result.length).toBe(await repository.countByFilters(filters));
    });
  });

  describe('upsertAssets', () => {
    test('creates product assets', async () => {
      await repository.upsertAssets(ProductConstants.MacBookPro16ID, [
        { id: AssetConstants.ImageID, order: 0 },
        { id: AssetConstants.MeImageID, order: 1 }
      ]);

      const createdAssets = await repository.findAssets(ProductConstants.MacBookPro16ID);

      expect(createdAssets).toHaveLength(2);
      expect(createdAssets[0].id).toBe(AssetConstants.ImageID);
      expect(createdAssets[1].id).toBe(AssetConstants.MeImageID);
    });

    test('re order product assets', async () => {
      await repository.upsertAssets(ProductConstants.MacBookPro16ID, [
        { id: AssetConstants.ImageID, order: 0 },
      ]);

      await repository.upsertAssets(ProductConstants.MacBookPro16ID, [
        { id: AssetConstants.MeImageID, order: 0 },
        { id: AssetConstants.ImageID, order: 1 }
      ]);

      const createdAssets = await repository.findAssets(ProductConstants.MacBookPro16ID);

      expect(createdAssets).toHaveLength(2);
      expect(createdAssets[0].id).toBe(AssetConstants.MeImageID);
      expect(createdAssets[1].id).toBe(AssetConstants.ImageID);
    })
  });

  describe('upsertTags', () => {
    test('creates product tags', async () => {
      await repository.upsertTags(ProductConstants.AppleWatchSeries8ID, [
        TagConstants.ClothingID,
        TagConstants.DomesticsID
      ]);

      const createdTags = await repository.findTags(ProductConstants.AppleWatchSeries8ID);

      expect(createdTags).toHaveLength(3);
      expect(createdTags.map(t => t.id).sort()).toEqual(
        [TagConstants.ElectronicsID, TagConstants.ClothingID, TagConstants.DomesticsID].sort()
      );
    });
  });

  describe('findAssets', () => {
    test('returns all product assets', async () => {
      await repository.upsertAssets(ProductConstants.MacBookPro16ID, [
        { id: AssetConstants.ImageID, order: 0 },
        { id: AssetConstants.MeImageID, order: 1 }
      ]);

      const createdAssets = await repository.findAssets(ProductConstants.MacBookPro16ID);

      expect(createdAssets).toHaveLength(2);
      expect(createdAssets[0].id).toBe(AssetConstants.ImageID);
      expect(createdAssets[1].id).toBe(AssetConstants.MeImageID);
    });

    test('returns all product assets with pagination', async () => {
      await repository.upsertAssets(ProductConstants.MacBookPro16ID, [
        { id: AssetConstants.ImageID, order: 0 },
        { id: AssetConstants.MeImageID, order: 1 }
      ]);

      const createdAssets = await repository.findAssets(ProductConstants.MacBookPro16ID, {
        take: 1
      });

      expect(createdAssets).toHaveLength(1);
      expect(createdAssets[0].id).toBe(AssetConstants.ImageID);
    });
  });

  describe('findTags', () => {
    test('returns all product tags', async () => {
      await repository.upsertTags(ProductConstants.AppleWatchSeries8ID, [
        TagConstants.ClothingID,
        TagConstants.DomesticsID
      ]);

      const createdTags = await repository.findTags(ProductConstants.AppleWatchSeries8ID);

      expect(createdTags).toHaveLength(3);
      expect(createdTags.map(t => t.id).sort()).toEqual(
        [TagConstants.ElectronicsID, TagConstants.ClothingID, TagConstants.DomesticsID].sort()
      );
    });
  });

  describe('removeAssets', () => {
    test('removes product assets', async () => {
      const mockedAssets = await repository.findAssets(ProductConstants.iPhone14ProMaxID);
      expect(mockedAssets).toHaveLength(2);

      await repository.removeAssets(ProductConstants.iPhone14ProMaxID, [
        AssetConstants.ImageID,
        AssetConstants.MeImageID
      ]);

      const assetsAfterRemoval = await repository.findAssets(ProductConstants.iPhone14ProMaxID);

      expect(assetsAfterRemoval).toHaveLength(0);
    })
  })

  describe('removeTags', () => {
    test('removes product tags', async () => {
      const mockedTags = await repository.findTags(ProductConstants.ShirtID);
      expect(mockedTags).toHaveLength(1);

      await repository.removeTags([TagConstants.ClothingID]);

      const tagsAfterRemoval = await repository.findTags(ProductConstants.ShirtID);

      expect(tagsAfterRemoval).toHaveLength(0);
    })
  })
});
