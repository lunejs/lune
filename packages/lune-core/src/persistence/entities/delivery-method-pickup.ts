import type { ID, LuneEntity, LuneTable } from './entity';

/**
 * Represents pickup delivery method details for an order
 */
export interface DeliveryMethodPickup extends LuneEntity {
  /**
   * Address information stored as JSON
   */
  address: DeliveryMethodPickupAddress;
  /**
   * The fulfillment this pickup belongs to
   */
  deliveryMethodId: ID;
  /**
   * The location where the pickup will take place
   */
  locationId: ID;
}

export interface DeliveryMethodPickupTable extends LuneTable {
  address: any;
  delivery_method_id: ID;
  location_id: ID;
  shop_id: string;
}

export interface DeliveryMethodPickupAddress {
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
