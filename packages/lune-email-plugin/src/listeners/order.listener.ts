import { Database, eventBus, OrderEvent, OrderPlacedEvent } from '@lune/core';
import { EmailSender } from '../senders/sender';

export class OrderListener {
  private database: Database | undefined;

  constructor(private readonly sender: EmailSender) {}

  init(database: Database) {
    this.database = database;

    return this;
  }

  registerOnOrderPlacedListener() {
    eventBus.on(OrderEvent.Placed, (event: OrderPlacedEvent) => {
      console.log({ event });

      this.sender.send({
        from: { email: '', name: '' },
        html: '',
        subject: '',
        to: '',
      });
    });

    return this;
  }
}
