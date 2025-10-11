import type { Transaction } from '@/persistence/connection';
import type { ID } from '@/persistence/entities/entity';
import type { Variant, VariantTable } from '@/persistence/entities/variant';
import type { VariantAssetTable } from '@/persistence/entities/variant-asset';
import type { VariantOptionValueTable } from '@/persistence/entities/variant-option-value';
import { VariantSerializer } from '@/persistence/serializers/variant.serializer';
import { Tables } from '@/persistence/tables';

import { Repository } from '../repository';
import { RepositoryError } from '../repository.error';

export class VariantRepository extends Repository<Variant, VariantTable> {
  constructor(trx: Transaction) {
    super(Tables.Variant, trx, new VariantSerializer());
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
}

type UpsertAssetInput = {
  id: ID;
  order: number;
};
