import type { LuneEntity, LuneTable } from './entity';

/**
 * A customer's saved address for shipping
 */
export interface Address extends LuneEntity {
  /**
   * Full name of the recipient
   */
  fullName: string;
  /**
   * Street address line 1
   */
  streetLine1: string;
  /**
   * Street address line 2 (apartment, suite, etc.)
   */
  streetLine2?: string | null;
  /**
   * Address's city
   */
  city: string;
  /**
   * Postal/ZIP code
   */
  postalCode: string;
  /**
   * Phone number for delivery
   */
  phoneNumber: string;
  /**
   * Whether this is the default address for the customer
   */
  isDefault: boolean;
  /**
   * Additional delivery references or instructions
   */
  references?: string | null;
  /**
   * Address's country
   */
  countryId: string;
  /**
   * Address's state/province/region
   */
  stateId: string;
  /**
   * Customer this address belongs to
   */
  customerId: string;
}

export interface AddressTable extends LuneTable {
  full_name: string;
  street_line_1: string;
  street_line_2?: string | null;
  city: string;
  postal_code: string;
  phone_number: string;
  is_default: boolean;
  references?: string | null;
  country_id: string;
  state_id: string;
  customer_id: string;
  shop_id: string;
}
