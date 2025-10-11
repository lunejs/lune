import type { Transaction } from '@/persistence/connection';
import type { VariantAssetTable } from '@/persistence/entities/variant-asset';
import type { VariantOptionValueTable } from '@/persistence/entities/variant-option-value';
import { Tables } from '@/persistence/tables';
import { TestHelper } from '@/tests/utils/test-helper';

import { VariantRepository } from '../variant.repository';

import { AssetConstants, AssetFixtures } from './fixtures/asset.fixtures';
import { OptionFixtures } from './fixtures/option.fixtures';
import { OptionValueConstants, OptionValueFixtures } from './fixtures/option-value.fixtures';
import { ProductFixtures } from './fixtures/product.fixtures';
import { ProductOptionFixtures } from './fixtures/product-option.fixtures';
import { ShopFixtures } from './fixtures/shop.fixtures';
import { UserFixtures } from './fixtures/user.fixtures';
import { VariantConstants, VariantFixtures } from './fixtures/variant.fixtures';
import { VariantOptionValueFixtures } from './fixtures/variant-option-value.fixtures';

describe('Variant repository', () => {
  const testHelper = new TestHelper();

  let repository: VariantRepository;
  let trx: Transaction;

  beforeEach(async () => {
    trx = await testHelper.generateTrx();
    repository = new VariantRepository(trx);

    await testHelper.loadFixtures([
      new UserFixtures(),
      new ShopFixtures(),
      new ProductFixtures(),
      new OptionFixtures(),
      new OptionValueFixtures(),
      new VariantFixtures(),
      new VariantOptionValueFixtures(),
      new AssetFixtures(),
      new ProductOptionFixtures()
    ]);
  });

  afterEach(async () => {
    await trx.rollback();
    await testHelper.resetDatabase();
  });

  afterAll(async () => {
    await testHelper.destroyDatabase();
  });

  describe('upsertOptionValues', () => {
    test('creates variant option values', async () => {
      await repository.upsertOptionValues(VariantConstants.EmptyVariantID, [
        OptionValueConstants.BlueOptionValueID,
        OptionValueConstants.JackedRedOptionValueID
      ]);

      const createdOptionValues = await trx<VariantOptionValueTable>(Tables.VariantOptionValue)
        .where({ variant_id: VariantConstants.EmptyVariantID })
        .innerJoin(
          Tables.OptionValue,
          `${Tables.OptionValue}.id`,
          `${Tables.VariantOptionValue}.option_value_id`
        );

      expect(createdOptionValues).toHaveLength(2);
      expect(createdOptionValues[0].id).toBe(OptionValueConstants.BlueOptionValueID);
      expect(createdOptionValues[1].id).toBe(OptionValueConstants.JackedRedOptionValueID);
    });

    test('do not duplicate option values in variant', async () => {
      await repository.upsertOptionValues(VariantConstants.EmptyVariantID, [
        OptionValueConstants.BlueOptionValueID,
        OptionValueConstants.JackedRedOptionValueID
      ]);

      const createdOptionValues = await trx<VariantOptionValueTable>(Tables.VariantOptionValue)
        .where({ variant_id: VariantConstants.EmptyVariantID })
        .innerJoin(
          Tables.OptionValue,
          `${Tables.OptionValue}.id`,
          `${Tables.VariantOptionValue}.option_value_id`
        );

      await repository.upsertOptionValues(VariantConstants.EmptyVariantID, [
        OptionValueConstants.BlueOptionValueID,
        OptionValueConstants.JackedRedOptionValueID
      ]);

      expect(createdOptionValues).toHaveLength(2);
      expect(createdOptionValues[0].id).toBe(OptionValueConstants.BlueOptionValueID);
      expect(createdOptionValues[1].id).toBe(OptionValueConstants.JackedRedOptionValueID);
    });
  });

  describe('upsertAssets', () => {
    test('creates variant assets', async () => {
      await repository.upsertAssets(VariantConstants.GreenLargeShirtID, [
        { id: AssetConstants.ImageID, order: 0 },
        { id: AssetConstants.MeImageID, order: 1 }
      ]);

      const createdAssets = await trx<VariantAssetTable>(Tables.VariantAsset)
        .where({ variant_id: VariantConstants.GreenLargeShirtID })
        .innerJoin(Tables.Asset, `${Tables.Asset}.id`, `${Tables.VariantAsset}.asset_id`)
        .orderBy(`${Tables.VariantAsset}.order`, 'asc');

      expect(createdAssets).toHaveLength(2);
      expect(createdAssets[0].id).toBe(AssetConstants.ImageID);
      expect(createdAssets[1].id).toBe(AssetConstants.MeImageID);
    });

    test('re order variant assets', async () => {
      await repository.upsertAssets(VariantConstants.GreenLargeShirtID, [
        { id: AssetConstants.ImageID, order: 0 }
      ]);

      await repository.upsertAssets(VariantConstants.GreenLargeShirtID, [
        { id: AssetConstants.MeImageID, order: 0 },
        { id: AssetConstants.ImageID, order: 1 }
      ]);

      const createdAssets = await trx<VariantAssetTable>(Tables.VariantAsset)
        .where({ variant_id: VariantConstants.GreenLargeShirtID })
        .innerJoin(Tables.Asset, `${Tables.Asset}.id`, `${Tables.VariantAsset}.asset_id`)
        .orderBy(`${Tables.VariantAsset}.order`, 'asc');

      expect(createdAssets).toHaveLength(2);
      expect(createdAssets[0].id).toBe(AssetConstants.MeImageID);
      expect(createdAssets[1].id).toBe(AssetConstants.ImageID);
    });
  });
});
