import { ButtonTypeValue, ElementParams } from '../../../types';
import ElementCreator from '../../utils/element-creator';
import View from '../view';

export default class ButtonView extends View {
  constructor(className: string, text: string, type: ButtonTypeValue) {
    const params: ElementParams = {
      tag: 'button',
      classesName: [className],
      textContent: text,
    };
    super(params);

    this.elementCreator.setDataType(type);
  }

  public getCreator(): ElementCreator {
    return this.elementCreator;
  }

  public setDisabled(isDisabled: boolean): void {
    if (isDisabled) {
      this.getHTMLElement().setAttribute('disabled', isDisabled.toString());
    } else {
      this.getHTMLElement().removeAttribute('disabled');
    }
  }
}
