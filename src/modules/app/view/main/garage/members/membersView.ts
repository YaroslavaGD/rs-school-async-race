import './members.scss';
import View from '../../../view';
import { ElementParams } from '../../../../../types';
import ElementCreator from '../../../../utils/element-creator';
import CarView from './car/CarView';

const CssClasses = {
  MEMBERS: 'members',
};

export default class MembersView extends View {
  private cars: CarView[] = [];

  constructor(carsView: CarView[]) {
    const params: ElementParams = {
      tag: 'ul',
      classesName: [CssClasses.MEMBERS],
    };
    super(params);
    this.configureView(carsView);
  }

  public getCreator(): ElementCreator {
    return this.elementCreator;
  }

  public updateView(cars: CarView[]): void {
    this.elementCreator.removeInner();
    this.configureView(cars);
  }

  private configureView(carsView: CarView[]): void {
    this.cars = carsView;
    this.createCars(this.cars);
  }

  private createCars(cars: CarView[]): void {
    for (let i = 0; i < cars.length; i += 1) {
      this.elementCreator.addInnerElement(cars[i].getHTMLElement());
    }
  }
}
