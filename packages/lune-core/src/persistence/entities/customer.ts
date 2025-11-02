import type { LuneEntity, LuneTable } from './entity';

/**
 * A customer is a person who interacts with the shop, whether browsing, purchasing, or managing their profile
 */
export interface Customer extends LuneEntity {
  /**
   * The customer's first name
   */
  firstName?: string | null;
  /**
   * The customer's last name
   */
  lastName: string;
  /**
   * The customer's email address. Used to identify the customer in orders and admin
   */
  email: string;
  /**
   * The customer's password. Nullable for guest customers
   */
  password?: string | null;
  /**
   * The customer's phone number
   */
  phoneNumber?: string | null;
  /**
   * Whether the customer is enabled. Disabled customers cannot login or place orders
   */
  enabled: boolean;
}

export interface CustomerTable extends LuneTable {
  first_name?: string | null;
  last_name: string;
  email: string;
  password?: string | null;
  phone_number?: string | null;
  enabled: boolean;
  shop_id: string;
}
