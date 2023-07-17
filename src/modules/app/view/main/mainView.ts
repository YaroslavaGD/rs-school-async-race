import './main.scss';
import { ElementParams } from '../../../types';
import ElementCreator from '../../element-creator/element-creator';
import View from '../view';
import ButtonView from '../button/buttonView';
import GarageView from './garage/garageView';

const CssClasses = {
  MAIN: 'main',
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

export default class MainView extends View {
  private garageView: GarageView;

  private winnersView: GarageView;

  constructor(garageView: GarageView, winnersView: GarageView) {
    const params: ElementParams = {
      tag: 'main',
      classesName: [CssClasses.MAIN],
    };
    super(params);
    this.garageView = garageView;
    this.winnersView = winnersView;
    this.configureView();
  }

  public showGarage(): void {}

  public showWinners(): void {}

  private configureView(): void {
    const creatorControl = this.createControls();
    this.elementCreator.addInnerElement(creatorControl);
    this.elementCreator.addInnerElement(this.garageView.getHTMLElement());
    this.elementCreator.addInnerElement(this.winnersView.getHTMLElement());
  }

  private createControls(): ElementCreator {
    const paramsControl: ElementParams = {
      tag: 'div',
      classesName: [CssClasses.CONTROL],
    };
    const creatorControl = new ElementCreator(paramsControl);
    const elementsControl = this.createElementControls();
    const creatorRace = new ButtonView(CssClasses.CONTROL_ITEM, TextControl.RACE, 'race');
    const creatorReset = new ButtonView(CssClasses.CONTROL_ITEM, TextControl.RESET, 'reset');
    const creatorGenerate = new ButtonView(CssClasses.CONTROL_ITEM, TextControl.GENERATE, 'generate');

    creatorControl.addInnerElement(elementsControl);
    creatorControl.addInnerElement(creatorRace.getHTMLElement());
    creatorControl.addInnerElement(creatorReset.getHTMLElement());
    creatorControl.addInnerElement(creatorGenerate.getHTMLElement());

    return creatorControl;
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
