import type { ID, LuneEntity, LuneTable } from './entity';

export interface OrderLine extends LuneEntity {
  unitPrice: number;
  lineSubtotal: number;
  lineTotal: number;
  quantity: number;
  variantId: ID;
  orderId: ID;
}

export interface OrderLineTable extends LuneTable {
  unit_price: number;
  line_subtotal: number;
  line_total: number;
  quantity: number;
  variant_id: ID;
  order_id: ID;
  shop_id: ID;
}
