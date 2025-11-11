import type { LuneEntity, LuneTable } from './entity';

export type ShippingMethodHandler = {
  code: string;
  args: Record<string, string>;
};

/**
 * A shipping method defines a way to ship products to customers within a specific zone.
 */
export interface ShippingMethod extends LuneEntity {
  /**
   * The shipping method's name.
   */
  name: string;
  /**
   * The shipping method's handler configuration.
   */
  handler: ShippingMethodHandler;
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
  name: string;
  handler: unknown;
  enabled: boolean;
  zone_id: string;
  shop_id: string;
}
