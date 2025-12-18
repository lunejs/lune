import type { ID } from '@/persistence/entities/entity';

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
    public readonly customerId: ID,
    public readonly email: string
  ) {
    super(CustomerEvent.Registered);
  }
}
