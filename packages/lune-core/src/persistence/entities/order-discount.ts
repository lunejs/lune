import type { ID, LuneEntity, LuneTable } from './entity';

export interface OrderDiscount extends LuneEntity {
  amount: number;
  discountId: ID;
  orderId: ID;
}

export interface OrderDiscountTable extends LuneTable {
  amount: number;
  discount_id: ID;
  order_id: ID;
  shop_id: ID;
}
