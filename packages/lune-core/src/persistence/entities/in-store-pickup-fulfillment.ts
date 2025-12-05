import type { ID, LuneEntity, LuneTable } from './entity';

/**
 * Represents in-store pickup fulfillment details for an order
 */
export interface InStorePickupFulfillment extends LuneEntity {
  /**
   * Address information stored as JSON
   */
  address: any;
  /**
   * Date and time when the order is ready for pickup
   */
  readyAt?: Date | undefined;
  /**
   * Date and time when the order was picked up
   */
  pickedUpAt?: Date | undefined;
  /**
   * The fulfillment this pickup belongs to
   */
  fulfillmentId: ID;
  /**
   * The location where the pickup will take place
   */
  locationId: ID;
}

export interface InStorePickupFulfillmentTable extends LuneTable {
  address: any;
  ready_at?: Date | null;
  picked_up_at?: Date | null;
  fulfillment_id: ID;
  location_id: ID;
  shop_id: string;
}
