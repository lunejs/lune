import type { LuneEntity, LuneTable } from './entity';

export enum CustomerAuthProvider {
  Credentials = 'credentials'
}

/**
 * Represents an authentication method for a customer.
 * A customer can have multiple auth methods (e.g., credentials + google)
 */
export interface CustomerAuthMethod extends LuneEntity {
  /**
   * The authentication provider type
   */
  provider: CustomerAuthProvider;
  /**
   * The unique identifier from the OAuth provider (e.g., Google sub).
   * Null for credentials provider.
   */
  providerId?: string | null;
  /**
   * The hashed password. Only used for credentials provider.
   * Null for OAuth providers.
   */
  password?: string | null;
  /**
   * The customer this auth method belongs to
   */
  customerId: string;
}

export interface CustomerAuthMethodTable extends LuneTable {
  provider: CustomerAuthProvider;
  provider_id?: string | null;
  password?: string | null;
  customer_id: string;
  shop_id: string;
}
