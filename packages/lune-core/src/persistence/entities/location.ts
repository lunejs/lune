import type { ID, LuneEntity, LuneTable } from './entity';

/**
 * A physical location where customers can pick up their orders
 */
export interface Location extends LuneEntity {
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
   * Whether this location is enabled or not
   * This is used to show/hide location in the storefront
   */
  enabled: boolean;
  /**
   * Country where the location is located
   */
  countryId: ID;
  /**
   * State/province where the location is located
   */
  stateId: ID;
}

export interface LocationTable extends LuneTable {
  name: string;
  street_line_1: string;
  street_line_2?: string | null;
  city: string;
  postal_code: string;
  phone_number: string;
  references?: string | null;
  enabled: boolean;
  country_id: ID;
  state_id: ID;
  shop_id: string;
}
