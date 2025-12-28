import type { Transaction } from '@/persistence/connection/connection';
import type { ShopMember, ShopMemberTable } from '@/persistence/entities/shop-member';
import { ShopMemberSerializer } from '@/persistence/serializers/shop-member.serializer';
import { Tables } from '@/persistence/tables';

import { Repository } from '../repository';

export class ShopMemberRepository extends Repository<ShopMember, ShopMemberTable> {
  constructor(trx: Transaction) {
    super(Tables.ShopMember, trx, new ShopMemberSerializer());
  }
}
