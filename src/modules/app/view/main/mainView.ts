import './main.scss';
import { ElementParams } from '../../../types';
import View from '../view';
import GarageView from './garage/garageView';
import WinnersView from './winners/winnersView';

const CssClasses = {
  MAIN: 'main',
};

export default class MainView extends View {
  private garageView: GarageView;

  private winnersView: WinnersView;

  constructor(garageView: GarageView, winnersView: WinnersView) {
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
    this.elementCreator.addInnerElement(this.garageView.getHTMLElement());
    this.elementCreator.addInnerElement(this.winnersView.getHTMLElement());
  }
}
