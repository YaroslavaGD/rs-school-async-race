import { Car } from '../../types';
import appStorage from '../data/app-storage';
import { EventType, eventEmitter } from '../event-emitter/eventEmitter';
import CarView from '../view/main/garage/members/car/CarView';
import MembersView from '../view/main/garage/members/membersView';
import CarController from './carController';

export default class MembersController {
  private membersView: MembersView;

  private carsController: CarController[] = [];

  constructor(cars: Car[]) {
    this.createCarsController(cars);
    const carsView = this.getCarsView();
    this.membersView = new MembersView(carsView);
    this.addEventListeners();
  }

  public getMembersView(): MembersView {
    return this.membersView;
  }

  private createCarsController(cars: Car[]): void {
    const carsController: CarController[] = [];
    for (let i = 0; i < cars.length; i += 1) {
      const car = new CarController(i, cars[i]);
      carsController.push(car);
    }
    this.carsController = carsController;
  }

  private getCarsView(): CarView[] {
    return this.carsController.map((car) => car.getCarView());
  }

  private addEventListeners(): void {
    eventEmitter.subscribe(EventType.CARS_CHANGE, this.updateCars.bind(this));
    eventEmitter.subscribe(EventType.CAR_CHANGE, this.updateCar.bind(this));
    eventEmitter.subscribe(EventType.NEW_CAR_CHANGE, this.createNewCar.bind(this));
  }

  private updateCars(): void {
    const cars = appStorage.getCars();
    if (this.carsController.length === cars.length) {
      for (let i = 0; i < this.carsController.length; i += 1) {
        this.carsController[i].getCarView().updateCar(cars[i]);
      }
    } else {
      this.createCarsController(cars);
      this.membersView.updateView(this.getCarsView());
    }
  }

  private updateCar(carId?: number): void {
    if (carId !== undefined) {
      const newCar = appStorage.getNewCarWithId(carId);
      if (newCar) {
        this.carsController[carId].getCarView().updateCar(newCar);
      }
    }
  }

  private createNewCar(carId?: number): void {
    if (carId !== undefined) {
      const car = appStorage.getNewCarWithId(carId);
      if (car) {
        const newCarController = new CarController(this.carsController.length - 1, car);
        this.carsController.push(newCarController);
        this.membersView.updateView(this.getCarsView());
      }
    }
  }
}
