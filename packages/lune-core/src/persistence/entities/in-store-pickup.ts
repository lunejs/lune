import type { ID, LuneEntity, LuneTable } from './entity';

/**
 * Represents in-store pickup fulfillment configuration for a location
 */
export interface InStorePickup extends LuneEntity {
  /**
   * Whether in-store pickup is available at this location
   */
  isAvailable: boolean;
  /**
   * Special instructions for in-store pickup at this location
   */
  instructions: string;
  /**
   * The location where the pickup will take place
   */
  locationId: ID;
}

export interface InStorePickupTable extends LuneTable {
  isAvailable: boolean;
  instructions: string;
  location_id: ID;
  shop_id: string;
}
