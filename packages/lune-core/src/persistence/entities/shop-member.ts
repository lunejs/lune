import type { ID, LuneEntity, LuneTable } from './entity';

export interface ShopMember extends LuneEntity {
  shopId: ID;
  userId: ID;
}

export interface ShopMemberTable extends LuneTable {
  shop_id: ID;
  user_id: ID;
}
