import './members.scss';
import View from '../../../view';
import { ElementParams } from '../../../../../types';
import ElementCreator from '../../../../utils/element-creator';
import CarView from './car/CarView';

const CssClasses = {
  MEMBERS: 'members',
};

// const NUM_MEMBERS = 7;
// const DEFAULT_NAME = 'Frog';

export default class MembersView extends View {
  private cars: CarView[] = [];

  // constructor(cars: Car[]) {
  //   const params: ElementParams = {
  //     tag: 'ul',
  //     classesName: [CssClasses.MEMBERS],
  //   };
  //   super(params);
  //   this.configureView(cars);
  // }

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
    // if (this.cars.length === cars.length) {
    //   for (let i = 0; i < this.cars.length; i += 1) {
    //     this.cars[i].updateCar(cars[i]);
    //   }
    // }

    // if (this.cars.length > cars.length) {
    //   this.cars = [];
    //   this.elementCreator.removeInner();
    //   this.createCars(cars);
    // }

    // if (this.cars.length < cars.length) {
    //   this.cars = [];
    //   this.elementCreator.removeInner();
    //   this.createCars(cars);
    // }
  }

  // private configureView(cars: Car[]): void {
  //   this.createCars(cars);
  // }

  private configureView(carsView: CarView[]): void {
    this.cars = carsView;
    this.createCars(this.cars);
  }

  private createCars(cars: CarView[]): void {
    for (let i = 0; i < cars.length; i += 1) {
      // const car = new CarView(cars[i]);
      // this.cars.push(car);
      this.elementCreator.addInnerElement(cars[i].getHTMLElement());
    }
  }
}
