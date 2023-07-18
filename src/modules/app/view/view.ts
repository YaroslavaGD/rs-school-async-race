import { ElementParams } from '../../types';
import ElementCreator from '../utils/element-creator';

export default abstract class View {
  protected elementCreator: ElementCreator;

  constructor(params: ElementParams) {
    this.elementCreator = this.createView(params);
  }

  private createView(params: ElementParams): ElementCreator {
    const elementParams: ElementParams = {
      tag: params.tag,
      classesName: params.classesName,
      textContent: params.textContent,
      callback: params.callback,
    };

    const element = new ElementCreator(elementParams);
    return element;
  }

  public getHTMLElement(): HTMLElement {
    return this.elementCreator.getElement();
  }
}
