import EventEmitter from 'node:events';

import type { LuneEvent } from './events/lune.event';

export class EventBus {
  private readonly emitter = new EventEmitter();

  emit<Event extends LuneEvent>(event: Event): void {
    this.emitter.emit(event.type, event);
  }

  on<Event extends LuneEvent>(
    eventName: string,
    listener: (event: Event) => void | Promise<void>
  ): void {
    this.emitter.on(eventName, listener);
  }

  off(eventName: string, listener: (...args: unknown[]) => void): void {
    this.emitter.off(eventName, listener);
  }
}

const eventBus = new EventBus();

export { eventBus };
