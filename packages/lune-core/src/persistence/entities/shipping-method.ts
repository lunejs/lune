import type { HandlerConfig, LuneEntity, LuneTable } from './entity';

/**
 * A shipping method defines a way to ship products to customers within a specific zone.
 */
export interface ShippingMethod extends LuneEntity {
  deletedAt?: Date | null;
  /**
   * The shipping method's name.
   */
  name: string;
  /**
   * The shipping method's handler configuration.
   */
  handler: HandlerConfig;
  /**
   * Whether the shipping method is enabled.
   */
  enabled: boolean;
  /**
   * The zone this shipping method applies to.
   */
  zoneId: string;
}

export interface ShippingMethodTable extends LuneTable {
  deleted_at?: Date | null;
  name: string;
  handler: unknown;
  enabled: boolean;
  zone_id: string;
  shop_id: string;
}
