import type { Transaction } from '@/persistence/connection';
import type { Shop, ShopTable } from '@/persistence/entities/shop';
import { ShopSerializer } from '@/persistence/serializers/shop.serializer';
import { Tables } from '@/persistence/tables';

import { Repository } from '../repository';

export class ShopRepository extends Repository<Shop, ShopTable> {
  constructor(trx: Transaction) {
    super(Tables.Shop, trx, new ShopSerializer());
  }
}
