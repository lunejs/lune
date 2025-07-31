import { Repository } from '../repository';
import { Tables } from '@/persistence/tables';
import { Transaction } from '@/persistence/connection';
import { ShopSerializer } from '@/persistence/serializers/shop.serializer';
import { Shop, ShopTable } from '@/persistence/entities/shop';

export class ShopRepository extends Repository<Shop, ShopTable> {
  constructor(trx: Transaction) {
    super(Tables.Shop, trx, new ShopSerializer());
  }
}
