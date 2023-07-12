export type Callback = (event?: Event) => void;
export type ClassesArr = string[];

export type ElementParams = {
  tag: string;
  classesName?: ClassesArr;
  textContent?: string;
  callback?: Callback;
};
