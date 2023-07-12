import './main.scss';
import { ButtonTypeValue, ElementParams } from '../../../types';
import ElementCreator from '../../element-creator/element-creator';
import View from '../view';

const CssClasses = {
  MAIN: 'main',
  CONTROL: 'control-main',
  CONTROL_ITEM: 'control-main__item',
};

const TextControl = {
  RACE: 'Race',
  RESET: 'Reset',
  GENERATE: 'Generate cards',
  CREATE: 'Create new',
};

export default class MainView extends View {
  constructor() {
    const params: ElementParams = {
      tag: 'main',
      classesName: [CssClasses.MAIN],
    };
    super(params);
    this.configureView();
  }

  private configureView(): void {
    const creatorControl = this.createControls();
    this.elementCreator.addInnerElement(creatorControl);
  }

  private createControls(): ElementCreator {
    const paramsControl: ElementParams = {
      tag: 'div',
      classesName: [CssClasses.CONTROL],
    };
    const creatorControl = new ElementCreator(paramsControl);

    const creatorRace = this.createControlItem('race', TextControl.RACE);
    const creatorReset = this.createControlItem('reset', TextControl.RESET);
    const creatorGenerate = this.createControlItem('generate', TextControl.GENERATE);
    const creatorCreate = this.createControlItem('create', TextControl.CREATE);

    creatorControl.addInnerElement(creatorRace);
    creatorControl.addInnerElement(creatorReset);
    creatorControl.addInnerElement(creatorGenerate);
    creatorControl.addInnerElement(creatorCreate);

    return creatorControl;
  }

  private createControlItem(dataType: ButtonTypeValue, text: string): ElementCreator {
    const paramsControlItem: ElementParams = {
      tag: 'button',
      classesName: [CssClasses.CONTROL_ITEM],
      textContent: text,
    };
    const creatorControlItem = new ElementCreator(paramsControlItem);
    creatorControlItem.setDataType(dataType);

    return creatorControlItem;
  }
}
