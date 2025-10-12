import type { Transaction } from '@/persistence/connection';
import type { Asset } from '@/persistence/entities/asset';
import type { ID } from '@/persistence/entities/entity';
import type { OptionValue } from '@/persistence/entities/option_value';
import type { Variant, VariantTable } from '@/persistence/entities/variant';
import type { VariantAssetTable } from '@/persistence/entities/variant-asset';
import type { VariantOptionValueTable } from '@/persistence/entities/variant-option-value';
import { AssetSerializer } from '@/persistence/serializers/asset.serializer';
import { OptionValueSerializer } from '@/persistence/serializers/option-value.serializer';
import { VariantSerializer } from '@/persistence/serializers/variant.serializer';
import { Tables } from '@/persistence/tables';

import { Repository } from '../repository';
import { RepositoryError } from '../repository.error';

export class VariantRepository extends Repository<Variant, VariantTable> {
  private assetSerializer: AssetSerializer;
  private optionValueSerializer: OptionValueSerializer;

  constructor(trx: Transaction) {
    super(Tables.Variant, trx, new VariantSerializer());

    this.assetSerializer = new AssetSerializer();
    this.optionValueSerializer = new OptionValueSerializer();
  }

  async findAssets(variantId: ID): Promise<Asset[]> {
    try {
      const result = await this.trx<VariantAssetTable>(Tables.VariantAsset)
        .where({ variant_id: variantId })
        .innerJoin(Tables.Asset, `${Tables.Asset}.id`, `${Tables.VariantAsset}.asset_id`)
        .orderBy(`${Tables.VariantAsset}.order`, 'asc');

      return result.map(asset => this.assetSerializer.deserialize(asset) as Asset);
    } catch (error) {
      throw new RepositoryError('VariantRepository.findAssets', error);
    }
  }

  async findOptionValues(variantId: ID): Promise<OptionValue[]> {
    try {
      const result = await this.trx<VariantOptionValueTable>(Tables.VariantOptionValue)
        .where({ variant_id: variantId })
        .innerJoin(
          Tables.OptionValue,
          `${Tables.OptionValue}.id`,
          `${Tables.VariantOptionValue}.option_value_id`
        );

      return result.map(asset => this.optionValueSerializer.deserialize(asset) as OptionValue);
    } catch (error) {
      throw new RepositoryError('VariantRepository.findOptionValues', error);
    }
  }

  async upsertOptionValues(variantId: ID, optionValues: ID[]) {
    try {
      const result = await this.trx<VariantOptionValueTable>(Tables.VariantOptionValue)
        .insert(
          optionValues.map(opv => ({
            option_value_id: opv,
            variant_id: variantId
          }))
        )
        .onConflict(['option_value_id', 'variant_id'])
        .merge();

      return result;
    } catch (error) {
      throw new RepositoryError('VariantRepository.upsertOptionValues', error);
    }
  }

  async upsertAssets(variantId: ID, assets: UpsertAssetInput[]) {
    try {
      const result = await this.trx<VariantAssetTable>(Tables.VariantAsset)
        .insert(
          assets.map(asset => ({
            asset_id: asset.id,
            variant_id: variantId,
            order: asset.order
          }))
        )
        .onConflict(['asset_id', 'variant_id'])
        .merge();

      return result;
    } catch (error) {
      throw new RepositoryError('VariantRepository.upsertAssets', error);
    }
  }

  async removeAssets(variantId: ID, ids: ID[]) {
    try {
      const result = await this.trx<VariantAssetTable>(Tables.VariantAsset)
        .where({ variant_id: variantId })
        .whereIn('asset_id', ids)
        .del();

      return result;
    } catch (error) {
      throw new RepositoryError('ProductRepository.removeAssets', error);
    }
  }
}

type UpsertAssetInput = {
  id: ID;
  order: number;
};
