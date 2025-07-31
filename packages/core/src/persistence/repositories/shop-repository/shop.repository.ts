import { Repository } from '../repository';
import { Tables } from '@/persistence/tables';
import { Transaction } from '@/persistence/connection';
import { ShopSerializer } from '@/persistence/serializers/shop.serializer';
import { Shop } from '@/persistence/entities/shop';

export class ShopRepository extends Repository<Shop> {
  constructor(trx: Transaction) {
    super(Tables.Shop, trx, new ShopSerializer());
  }
}
