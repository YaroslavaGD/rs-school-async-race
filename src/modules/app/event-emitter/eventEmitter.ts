// import { Car } from '../../types';

export enum EventType {
  TO_GARAGE,
  TO_WINNERS,
  CREATE,
  UPDATE,
  REMOVE,
  SELECT,
  GENERATE,
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
  REQUEST_VELOCITY,
  REQUEST_DRIVE,
  REQUEST_STOP,
  ENGINE_READY,
  CAR_BROKEN,
  CAR_STOP,
  RASE,
  RESET,
  WIN,
}

export const eventEmitter: {
  readonly events: Record<string, (() => void)[]>;
  emit(eventType: EventType, storageCarId?: number): void;
  subscribe(eventType: EventType, callback: (storageCarId?: number) => void): void;
  unsubscribe(eventType: EventType): void;
} = {
  events: {},

  emit(eventName, storageCarId) {
    if (!this.events[eventName]) return;
    this.events[eventName].forEach((callback: (storageCarId?: number) => void) => callback(storageCarId));
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
