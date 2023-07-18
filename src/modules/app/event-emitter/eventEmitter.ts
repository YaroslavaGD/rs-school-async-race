export enum EventType {
  TO_GARAGE = 'to-garage',
  TO_WINNERS = 'to-winners',
};

export const eventEmitter: {
  readonly events: Record<string, (() => void)[]>;
  emit(eventType: EventType, data?: string): void;
  subscribe(eventType: EventType, callback: (data?: string) => void): void;
  unsubscribe(eventType: EventType): void;
} = {
  events: {},

  emit(eventName, data) {
    if (!this.events[eventName]) return;
    this.events[eventName].forEach((callback: (data?: string) => void) => callback(data));
  },

  subscribe(eventName, callback) {
    if (!this.events[eventName]) this.events[eventName] = [];
    this.events[eventName]?.push(callback); // подписать всех
  },

  unsubscribe(eventName) {
    if (!this.events[eventName]) return;
    delete this.events[eventName];
  },
};