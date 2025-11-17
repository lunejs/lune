import type { HandlerConfig, LuneEntity, LuneTable } from './entity';

/**
 * A payment method is a way to pay for an order in your shop, like credit card, PayPal, etc.
 */
export interface PaymentMethod extends LuneEntity {
  deletedAt?: Date | null;
  /**
   * Payment method's name
   */
  name: string;
  /**
   * Whether the payment method is enabled. Disabled methods won't be shown in the storefront
   */
  enabled: boolean;
  /**
   * Specific data for the payment handler chosen.
   * Usually stores payment integration keys and the handler code
   */
  handler: HandlerConfig;
}

export interface PaymentMethodTable extends LuneTable {
  deleted_at?: Date | null;
  name: string;
  enabled: boolean;
  handler: unknown;
  shop_id: string;
}
