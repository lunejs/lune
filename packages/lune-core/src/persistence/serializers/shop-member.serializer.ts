import type { ShopMember, ShopMemberTable } from '../entities/shop-member';

import { Serializer } from './serializer';

export class ShopMemberSerializer extends Serializer<ShopMember, ShopMemberTable> {
  constructor() {
    super([
      ['id', 'id'],
      ['created_at', 'createdAt'],
      ['updated_at', 'updatedAt'],
      ['shop_id', 'shopId'],
      ['user_id', 'userId']
    ]);
  }
}
