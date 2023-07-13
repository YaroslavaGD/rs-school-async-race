import { ButtonTypeValue, ElementParams } from '../../../types';
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
}
