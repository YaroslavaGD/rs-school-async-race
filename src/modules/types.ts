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
  | 'create'
  | 'prev'
  | 'next'
  | 'update-element'
  | 'remove-element'
  | 'drive'
  | 'stop';
