import type { ID } from '@/persistence/entities/entity';

import type { LuneEventContext } from './lune.event';
import { LuneEvent } from './lune.event';

export enum CustomerEvent {
  Registered = 'customer.registered'
}

/**
 * @description
 * Event emitted when a new customer has registered.
 */
export class CustomerRegisteredEvent extends LuneEvent {
  constructor(
    public readonly ctx: LuneEventContext,
    public readonly customerId: ID
  ) {
    super(CustomerEvent.Registered, ctx);
  }
}
