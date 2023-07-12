import { Callback, ClassesArr, ElementParams } from "../../types";

export default class ElementCreator {
  private element: HTMLElement;

  constructor(params: ElementParams) {
    this.element = this.createElement(params);
    this.setClasses(params.classesName);
    this.setTextContent(params.textContent);
    this.setCallback(params.callback);
  }

  private createElement(params: ElementParams): HTMLElement {
    return document.createElement(params.tag);
  }

  public setClasses(cssClasses?: ClassesArr): void {
    if (cssClasses) this.element.classList.add(...cssClasses);
  }

  public removeClasses(cssClass: string): void {
    this.element.classList.remove(cssClass);
  }

  public setTextContent(textContent?: string): void {
    if (textContent) this.element.innerText = textContent;
  }

  public setCallback(callback?: Callback, eventName?: string): void {
    if (callback) {
      if (eventName) this.element.addEventListener(eventName, (event: Event) => callback(event));
      else this.element.addEventListener('click', (event: Event) => callback(event));
    }
  }

  public getElement(): HTMLElement {
    return this.element;
  }
}