import type { ID, LuneEntity, LuneTable } from './entity';

/**
 * Represents shipping delivery method details for an order
 */
export interface DeliveryMethodShipping extends LuneEntity {
  /**
   * The shipping method used to generate this delivery
   */
  method: string;
  /**
   * The delivery method this shipping belongs to
   */
  deliveryMethodId: ID;
  /**
   * The shipping method id used to generate this delivery
   */
  shippingMethodId: ID;
}

export interface DeliveryMethodShippingTable extends LuneTable {
  method: string;
  delivery_method_id: ID;
  shipping_method_id: ID;
  shop_id: string;
}
