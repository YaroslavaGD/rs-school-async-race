export type Callback = (event?: Event) => void;
export type ClassesArr = string[];

export type ElementParams = {
  tag: string;
  classesName?: ClassesArr;
  textContent?: string;
  callback?: Callback;
};

export type ButtonTypeValue =
  | 'garage'
  | 'winners'
  | 'race'
  | 'reset'
  | 'generate'
  | 'prev'
  | 'next'
  | 'create-element'
  | 'update-element'
  | 'remove-element'
  | 'select-element'
  | 'drive'
  | 'stop'
  | 'table-id'
  | 'table-img'
  | 'table-name'
  | 'table-wins'
  | 'table-time';

export interface Car {
  id: number;
  name: string;
  color: string;
}

export interface Winner {
  id: number;
  carId: number;
  wins: number;
  time: number;
}

export interface WinnerFull {
  id: number;
  name: string;
  color: string;
  wins: number;
  time: number;
}
