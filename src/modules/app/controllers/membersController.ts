import { Car } from '../../types';
import CarView from '../view/main/garage/members/car/CarView';
import MembersView from '../view/main/garage/members/membersView';
import CarController from './carController';

export default class MembersController {
  private membersView: MembersView;

  private carsController: CarController[] | [] = [];

  constructor(cars: Car[]) {
    this.createCarsController(cars);
    const carsView = this.getCarsView();
    this.membersView = new MembersView(carsView);
  }

  public getMembersView(): MembersView {
    return this.membersView;
  }

  // private init(cars: Car[]): void {
  // }

  public updateCars(cars: Car[]): void {
    if (this.carsController.length === cars.length) {
      for (let i = 0; i < this.carsController.length; i += 1) {
        this.carsController[i].getCarView().updateCar(cars[i]);
      }
    } else {
      this.createCarsController(cars);
      this.membersView.updateView(this.getCarsView());
    }
  }

  private createCarsController(cars: Car[]): void {
    const carsController: CarController[] = [];
    for (let i = 0; i < cars.length; i += 1) {
      const car = new CarController(cars[i]);
      carsController.push(car);
      // carsView.push(car.getCarView());
    }
    this.carsController = carsController;
    // return carsView;
  }

  private getCarsView(): CarView[] {
    return this.carsController.map((car) => car.getCarView());
  }
}
