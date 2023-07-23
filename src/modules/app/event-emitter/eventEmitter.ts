import { Car } from '../../types';

export enum EventType {
  TO_GARAGE,
  TO_WINNERS,
  CREATE,
  UPDATE,
  REMOVE,
  SELECT,
  CAR_CHANGE,
  NEW_CAR_CHANGE,
  CARS_CHANGE,
  WINNER_CHANGE,
  NEW_WINNER_CHANGE,
  WINNERS_CHANGE,
  SELECTED_CAR_ID_CHANGE,
  CURRENT_CARS_PAGE_CHANGE,
  CURRENT_WINNERS_PAGE_CHANGE,
  TOTAL_CARS_CHANGE,
  TOTAL_WINNERS_CHANGE,
}

export const eventEmitter: {
  readonly events: Record<string, (() => void)[]>;
  emit(eventType: EventType, data?: Car): void;
  subscribe(eventType: EventType, callback: (data?: Car) => void): void;
  unsubscribe(eventType: EventType): void;
} = {
  events: {},

  emit(eventName, data) {
    if (!this.events[eventName]) return;
    this.events[eventName].forEach((callback: (data?: Car) => void) => callback(data));
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
