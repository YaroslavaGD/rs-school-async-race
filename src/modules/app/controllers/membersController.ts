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
    this.setCurrentDistance();
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
    window.addEventListener('resize', this.setCurrentDistance.bind(this));
    window.addEventListener('DOMContentLoaded', this.setCurrentDistance.bind(this));
    eventEmitter.subscribe(EventType.CARS_CHANGE, this.updateCars.bind(this));
    eventEmitter.subscribe(EventType.CAR_CHANGE, this.updateCar.bind(this));
    eventEmitter.subscribe(EventType.NEW_CAR_CHANGE, this.createNewCar.bind(this));
    eventEmitter.subscribe(EventType.ENGINE_READY, this.driveCar.bind(this));
    eventEmitter.subscribe(EventType.CAR_BROKEN, this.brokeCar.bind(this));
    eventEmitter.subscribe(EventType.CAR_STOP, this.stopCar.bind(this));
  }

  private driveCar(carId?: number): void {
    console.log('drive car');
    if (carId !== undefined) {
      const engine = appStorage.getEngine(carId);
      if (engine) {
        const carView = this.carsController[carId].getCarView();
        carView.updateCarEngine(engine);
        carView.animateCar();
      }
    }
  }

  private brokeCar(carId?: number): void {
    if (carId !== undefined) {
      const carView = this.carsController[carId].getCarView();
      carView.brokeCar();
    }
  }

  private stopCar(carId?: number): void {
    if (carId !== undefined) {
      const engine = appStorage.getEngine(carId);
      if (engine) {
        const carView = this.carsController[carId].getCarView();
        carView.updateCarEngine(engine);
        carView.stopCar();
      }
    }
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

  private setCurrentDistance(): void {
    const distance = this.membersView.getHTMLElement().clientWidth;
    console.log('Текущее расстояние:');
    console.log(distance);
    appStorage.setCurrentDistance(distance);
  }
}
