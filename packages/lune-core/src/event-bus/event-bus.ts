import EventEmitter from 'node:events';

import type { LuneEvent } from './events/lune.event';

class EventBus {
  private readonly emitter = new EventEmitter();

  emit(event: LuneEvent): void {
    this.emitter.emit(event.type, event);
  }

  on(eventName: string, listener: (event: LuneEvent) => void | Promise<void>): void {
    this.emitter.on(eventName, listener);
  }

  off(eventName: string, listener: (...args: unknown[]) => void): void {
    this.emitter.off(eventName, listener);
  }
}

const eventBus = new EventBus();

export { eventBus };
