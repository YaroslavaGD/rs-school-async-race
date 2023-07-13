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
    const garageView = new GarageView();
    this.elementCreator.addInnerElement(creatorControl);
    this.elementCreator.addInnerElement(garageView.getHTMLElement());
  }

  private createControls(): ElementCreator {
    const paramsControl: ElementParams = {
      tag: 'div',
      classesName: [CssClasses.CONTROL],
    };
    const creatorControl = new ElementCreator(paramsControl);

    const creatorRace = new ButtonView(CssClasses.CONTROL_ITEM, TextControl.RACE, 'race');
    const creatorReset = new ButtonView(CssClasses.CONTROL_ITEM, TextControl.RESET, 'reset');
    const creatorGenerate = new ButtonView(CssClasses.CONTROL_ITEM, TextControl.GENERATE, 'generate');
    const creatorCreate = new ButtonView(CssClasses.CONTROL_ITEM, TextControl.CREATE, 'create');

    creatorControl.addInnerElement(creatorRace.getHTMLElement());
    creatorControl.addInnerElement(creatorReset.getHTMLElement());
    creatorControl.addInnerElement(creatorGenerate.getHTMLElement());
    creatorControl.addInnerElement(creatorCreate.getHTMLElement());

    return creatorControl;
  }
}
