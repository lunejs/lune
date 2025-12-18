import { eventBus, OrderEvent, OrderPlacedEvent } from '@lune/core';
import { EmailSender } from '../senders/sender';

export class OrderListener {
  constructor(private readonly sender: EmailSender) {}

  onOrderPlaced() {
    eventBus.on(OrderEvent.Placed, (event: OrderPlacedEvent) => {
      console.log({ event });

      this.sender.send({
        from: { email: '', name: '' },
        html: '',
        subject: '',
        to: '',
      });
    });
  }
}
