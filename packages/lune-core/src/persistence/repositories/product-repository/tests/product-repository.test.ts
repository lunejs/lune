import { LunePrice } from '@lune/common';

import { OrderBy } from '@/api/shared/types/graphql';
import type { Transaction } from '@/persistence/connection';
import type { OptionTable } from '@/persistence/entities/option';
import type { ProductAssetTable } from '@/persistence/entities/product-asset';
import type { ProductTagTable } from '@/persistence/entities/product-tag';
import type { ProductTranslationTable } from '@/persistence/entities/product-translation';
import { Tables } from '@/persistence/tables';
import { TestHelper } from '@/tests/utils/test-helper';

import { ProductRepository } from '../product.repository';

import { AssetConstants, AssetFixtures } from './fixtures/asset.fixtures';
import { OptionFixtures } from './fixtures/option.fixtures';
import { OptionValueFixtures } from './fixtures/option-value.fixtures';
import { ProductConstants, ProductFixtures } from './fixtures/product.fixtures';
import { ProductAssetFixtures } from './fixtures/product-asset.fixtures';
import { ProductTagFixtures } from './fixtures/product-tag.fixtures';
import { ProductTranslationFixtures } from './fixtures/product-translation.fixtures';
import { ShopFixtures } from './fixtures/shop.fixtures';
import { TagConstants, TagFixtures } from './fixtures/tag.fixtures';
import { UserFixtures } from './fixtures/user.fixtures';
import { VariantFixtures } from './fixtures/variant.fixtures';
import { VariantOptionValueFixtures } from './fixtures/variant-option-value.fixtures';

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
      new ProductAssetFixtures(),
      new ProductTranslationFixtures()
    ]);
  });

  afterEach(async () => {
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
      const filters = { salePriceRange: { min: 23_000 } };
      const result = await repository.findByFilters({ filters });

      expect(result.every(p => p.minSalePrice >= LunePrice.toCent(23_000))).toBe(true);
      expect(result.length).toBe(await repository.countByFilters(filters));
    });

    test('returns products matching max sale price range', async () => {
      const filters = { salePriceRange: { max: 10_000 } };
      const result = await repository.findByFilters({ filters });

      expect(result.every(p => p.maxSalePrice <= LunePrice.toCent(10_000))).toBe(true);
      expect(result.length).toBe(await repository.countByFilters(filters));
    });

    test('returns products matching both min and max sale price range', async () => {
      const filters = { salePriceRange: { min: 50, max: 500 } };
      const result = await repository.findByFilters({ filters });

      expect(result.every(p => p.minSalePrice >= LunePrice.toCent(50))).toBe(true);
      expect(result.every(p => p.maxSalePrice <= LunePrice.toCent(500))).toBe(true);
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

      expect(result.map(p => p.id)).toEqual(sorted.map(p => p.id));
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

    test('returns products with pagination and order applied', async () => {
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
        salePriceRange: { min: 90 }
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
        { id: AssetConstants.ImageID, order: 0 }
      ]);

      await repository.upsertAssets(ProductConstants.MacBookPro16ID, [
        { id: AssetConstants.MeImageID, order: 0 },
        { id: AssetConstants.ImageID, order: 1 }
      ]);

      const createdAssets = await repository.findAssets(ProductConstants.MacBookPro16ID);

      expect(createdAssets).toHaveLength(2);
      expect(createdAssets[0].id).toBe(AssetConstants.MeImageID);
      expect(createdAssets[1].id).toBe(AssetConstants.ImageID);
    });
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

    test('does not duplicate existing product tags', async () => {
      const beforeTags = await repository.findTags(ProductConstants.AppleWatchSeries8ID);
      expect(beforeTags).toHaveLength(1);
      expect(beforeTags[0].id).toBe(TagConstants.ElectronicsID);

      await repository.upsertTags(ProductConstants.AppleWatchSeries8ID, [
        TagConstants.ElectronicsID
      ]);

      const createdTags = await repository.findTags(ProductConstants.AppleWatchSeries8ID);

      expect(createdTags).toHaveLength(1);
      expect(createdTags.map(t => t.id)).toEqual([TagConstants.ElectronicsID]);
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
    });
  });

  describe('removeTags', () => {
    test('removes product tags', async () => {
      const mockedTags = await repository.findTags(ProductConstants.ShirtID);
      expect(mockedTags).toHaveLength(1);

      await repository.removeTags([TagConstants.ClothingID]);

      const tagsAfterRemoval = await repository.findTags(ProductConstants.ShirtID);

      expect(tagsAfterRemoval).toHaveLength(0);
    });
  });

  describe('findAssetsByProductIds', () => {
    test('returns all assets for the given product ids', async () => {
      const assets = await repository.findAssetsByProductIds([
        ProductConstants.ShirtID,
        ProductConstants.iPhone14ProMaxID,
        ProductConstants.JacketID
      ]);

      expect(assets).toHaveLength(4);
    });
  });

  describe('removeAllOptions', () => {
    test('removes all product options for the given product ids', async () => {
      const mockedOptions = await trx<OptionTable>(Tables.Option).whereIn('product_id', [
        ProductConstants.ShirtID,
        ProductConstants.JacketID
      ]);

      expect(mockedOptions).toHaveLength(4);

      await repository.removeAllOptions([ProductConstants.ShirtID, ProductConstants.JacketID]);

      const optionsAfterRemoval = await trx<OptionTable>(Tables.Option).whereIn('product_id', [
        ProductConstants.ShirtID,
        ProductConstants.JacketID
      ]);
      expect(optionsAfterRemoval).toHaveLength(0);
    });
  });

  describe('removeAllAssets', () => {
    test('removes all product assets for the given product ids', async () => {
      const mockedAssets = await trx<ProductAssetTable>(Tables.ProductAsset).whereIn('product_id', [
        ProductConstants.iPhone14ProMaxID,
        ProductConstants.ShirtID
      ]);

      expect(mockedAssets).toHaveLength(4);

      await repository.removeAllAssets([
        ProductConstants.iPhone14ProMaxID,
        ProductConstants.ShirtID
      ]);

      const assetsAfterRemoval = await trx<ProductAssetTable>(Tables.ProductAsset).whereIn(
        'product_id',
        [ProductConstants.iPhone14ProMaxID, ProductConstants.ShirtID]
      );
      expect(assetsAfterRemoval).toHaveLength(0);
    });
  });

  describe('removeAllTags', () => {
    test('removes all product tags for the given product ids', async () => {
      const mockedTags = await trx<ProductTagTable>(Tables.ProductTag).whereIn('product_id', [
        ProductConstants.MacBookPro16ID,
        ProductConstants.ShirtID
      ]);

      expect(mockedTags).toHaveLength(2);

      await repository.removeAllTags([ProductConstants.MacBookPro16ID, ProductConstants.ShirtID]);

      const tagsAfterRemoval = await trx<ProductTagTable>(Tables.ProductTag).whereIn('product_id', [
        ProductConstants.MacBookPro16ID,
        ProductConstants.ShirtID
      ]);
      expect(tagsAfterRemoval).toHaveLength(0);
    });
  });

  describe('removeTranslations', () => {
    test('removes all product translations for the given product ids', async () => {
      const mockedTranslations = await trx<ProductTranslationTable>(
        Tables.ProductTranslation
      ).whereIn('product_id', [ProductConstants.JacketID, ProductConstants.ShirtID]);

      expect(mockedTranslations).toHaveLength(2);

      await repository.removeAllTranslations([ProductConstants.JacketID, ProductConstants.ShirtID]);

      const translationsAfterRemoval = await trx<ProductTranslationTable>(
        Tables.ProductTranslation
      ).whereIn('product_id', [ProductConstants.JacketID, ProductConstants.ShirtID]);

      expect(translationsAfterRemoval).toHaveLength(0);
    });
  });
});
