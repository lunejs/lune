import { FulfillmentState } from '@/persistence/entities/fulfillment';
import { StateMachine } from '@/utils/state-machine/state-machine';

export const fulfillmentStateMachine = new StateMachine<FulfillmentState>({
  [FulfillmentState.Pending]: [
    FulfillmentState.Shipped,
    FulfillmentState.ReadyForPickup,
    FulfillmentState.Canceled
  ],
  [FulfillmentState.Shipped]: [FulfillmentState.Delivered, FulfillmentState.Canceled],
  [FulfillmentState.ReadyForPickup]: [FulfillmentState.PickedUp, FulfillmentState.Canceled],
  [FulfillmentState.Delivered]: [],
  [FulfillmentState.PickedUp]: [],
  [FulfillmentState.Canceled]: []
});
