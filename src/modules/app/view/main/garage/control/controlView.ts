import './control.scss';
import { ElementParams } from '../../../../../types';
import ElementCreator from '../../../../utils/element-creator';
import ButtonView from '../../../button/buttonView';
import View from '../../../view';

const CssClasses = {
  CONTROL: 'control-main',
  CONTROL_ITEM: 'control-main__item',
  CONTROL_ELEMENT: 'control-element',
  CONTROL_NAME: 'control-element__name',
  CONTROL_INPUT_NAME: 'control-element__input-name',
  CONTROL_COLOR: 'control-element__color',
  CONTROL_INPUT_COLOR: 'control-element__input-color',
};

const TextControl = {
  RACE: 'Race',
  RESET: 'Reset',
  GENERATE: 'Generate cards',
  CREATE: 'Create new',
  UPDATE: 'Update',
};

export default class ControlView extends View {
  constructor() {
    const params: ElementParams = {
      tag: 'div',
      classesName: [CssClasses.CONTROL],
    };
    super(params);
    this.configureView();
  }

  private configureView(): void {
    const elementsControl = this.createElementControls();
    const creatorRace = new ButtonView(CssClasses.CONTROL_ITEM, TextControl.RACE, 'race');
    const creatorReset = new ButtonView(CssClasses.CONTROL_ITEM, TextControl.RESET, 'reset');
    const creatorGenerate = new ButtonView(CssClasses.CONTROL_ITEM, TextControl.GENERATE, 'generate');

    this.elementCreator.addInnerElement(elementsControl);
    this.elementCreator.addInnerElement(creatorRace.getHTMLElement());
    this.elementCreator.addInnerElement(creatorReset.getHTMLElement());
    this.elementCreator.addInnerElement(creatorGenerate.getHTMLElement());
  }

  private createElementControls(): ElementCreator {
    const paramsElementControls: ElementParams = {
      tag: 'ul',
      classesName: [CssClasses.CONTROL_ELEMENT],
    };
    const creatorElementControls = new ElementCreator(paramsElementControls);
    const creatorName = this.createName();
    const creatorColor = this.createColor();

    creatorElementControls.addInnerElement(creatorName);
    creatorElementControls.addInnerElement(creatorColor);

    return creatorElementControls;
  }

  private createName(): ElementCreator {
    const paramsName: ElementParams = {
      tag: 'li',
      classesName: [CssClasses.CONTROL_NAME],
    };
    const creatorName = new ElementCreator(paramsName);

    const paramsInput: ElementParams = {
      tag: 'input',
      classesName: [CssClasses.CONTROL_INPUT_NAME],
    };
    const creatorInput = new ElementCreator(paramsInput);
    creatorInput.getElement().setAttribute('type', 'text');

    const creatorCreate = new ButtonView(CssClasses.CONTROL_ITEM, TextControl.CREATE, 'create-element');

    creatorName.addInnerElement(creatorInput);
    creatorName.addInnerElement(creatorCreate.getHTMLElement());
    return creatorName;
  }

  private createColor(): ElementCreator {
    const paramsColor: ElementParams = {
      tag: 'li',
      classesName: [CssClasses.CONTROL_COLOR],
    };
    const creatorColor = new ElementCreator(paramsColor);

    const paramsInput: ElementParams = {
      tag: 'input',
      classesName: [CssClasses.CONTROL_INPUT_COLOR],
    };
    const creatorInput = new ElementCreator(paramsInput);
    creatorInput.getElement().setAttribute('type', 'color');

    const creatorUpdate = new ButtonView(CssClasses.CONTROL_ITEM, TextControl.UPDATE, 'update-element');

    creatorColor.addInnerElement(creatorInput);
    creatorColor.addInnerElement(creatorUpdate.getHTMLElement());
    return creatorColor;
  }
}
