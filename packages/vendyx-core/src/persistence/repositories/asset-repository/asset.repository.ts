import { Tables } from '@/persistence/tables';
import { Transaction } from '@/persistence/connection';
import { Repository } from '../repository';
import { Asset, AssetTable } from '@/persistence/entities/asset';
import { AssetSerializer } from '@/persistence/serializers/asset.serializer';

export class AssetRepository extends Repository<Asset, AssetTable> {
  constructor(trx: Transaction) {
    super(Tables.Asset, trx, new AssetSerializer());
  }
}
