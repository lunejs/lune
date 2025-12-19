import type { ID, LuneEntity, LuneTable } from './entity';

/**
 * Represents in-store pickup fulfillment details for an order
 */
export interface InStorePickupFulfillment extends LuneEntity {
  /**
   * Address information stored as JSON
   */
  address: InStorePickupFulfillmentAddress;
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

export interface InStorePickupFulfillmentAddress {
  /**
   * Name of the location
   */
  name: string;
  /**
   * Street address line 1
   */
  streetLine1: string;
  /**
   * Street address line 2 (optional)
   */
  streetLine2?: string | null;
  /**
   * Location's city
   */
  city: string;
  /**
   * Postal/ZIP code
   */
  postalCode: string;
  /**
   * Location's phone number
   */
  phoneNumber: string;
  /**
   * Additional references or instructions for finding the location
   */
  references?: string | null;
  /**
   * Address's country
   */
  country: string;
  /**
   * Address's country code
   */
  countryCode: string;
  /**
   * Address's state/province/region
   */
  state: string;
  /**
   * Address's state/province/region code
   */
  stateCode: string;
}
