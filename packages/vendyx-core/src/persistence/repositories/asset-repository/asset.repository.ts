import { Transaction } from '@/persistence/connection';
import { Asset, AssetTable } from '@/persistence/entities/asset';
import { AssetSerializer } from '@/persistence/serializers/asset.serializer';
import { Tables } from '@/persistence/tables';

import { Repository } from '../repository';

export class AssetRepository extends Repository<Asset, AssetTable> {
  constructor(trx: Transaction) {
    super(Tables.Asset, trx, new AssetSerializer());
  }
}
