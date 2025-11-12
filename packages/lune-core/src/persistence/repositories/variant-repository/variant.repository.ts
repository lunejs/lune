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

export class VariantRepository extends Repository<Variant, VariantTable> {
  private assetSerializer: AssetSerializer;
  private optionValueSerializer: OptionValueSerializer;

  constructor(trx: Transaction) {
    super(Tables.Variant, trx, new VariantSerializer());

    this.assetSerializer = new AssetSerializer();
    this.optionValueSerializer = new OptionValueSerializer();
  }

  async findAssets(variantId: ID): Promise<Asset[]> {
    const result = await this.trx<VariantAssetTable>(Tables.VariantAsset)
      .where({ variant_id: variantId })
      .innerJoin(Tables.Asset, `${Tables.Asset}.id`, `${Tables.VariantAsset}.asset_id`)
      .orderBy(`${Tables.VariantAsset}.order`, 'asc');

    return result.map(asset => this.assetSerializer.deserialize(asset) as Asset);
  }

  async findOptionValues(variantId: ID): Promise<OptionValue[]> {
    const result = await this.trx<VariantOptionValueTable>(Tables.VariantOptionValue)
      .where({ variant_id: variantId })
      .innerJoin(
        Tables.OptionValue,
        `${Tables.OptionValue}.id`,
        `${Tables.VariantOptionValue}.option_value_id`
      );

    return result.map(asset => this.optionValueSerializer.deserialize(asset) as OptionValue);
  }

  async upsertOptionValues(variantId: ID, optionValues: ID[]) {
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
  }

  async upsertAssets(variantId: ID, assets: UpsertAssetInput[]) {
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
  }

  async removeAssets(variantId: ID, ids: ID[]) {
    const result = await this.trx<VariantAssetTable>(Tables.VariantAsset)
      .where({ variant_id: variantId })
      .whereIn('asset_id', ids)
      .del();

    return result;
  }

  async removeOptionValues(variantId: ID, ids: ID[]) {
    const result = await this.trx<VariantOptionValueTable>(Tables.VariantOptionValue)
      .where({ variant_id: variantId })
      .whereIn('option_value_id', ids)
      .del();

    return result;
  }
}

type UpsertAssetInput = {
  id: ID;
  order: number;
};
