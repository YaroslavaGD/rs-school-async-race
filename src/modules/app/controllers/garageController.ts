// import { Callback, Car } from '../../../types';
// import { Car } from '../../types';
import appStorage from '../data/app-storage';
import { EventType, eventEmitter } from '../event-emitter/eventEmitter';
import GarageView from '../view/main/garage/garageView';
// import ApiController from './apiController';
import ControlController from './controlController';
import MembersController from './membersController';

export default class GarageController {
  // private apiController: ApiController;

  private garageView: GarageView;

  private membersController: MembersController | null = null;

  private controlController: ControlController;

  constructor() {
    // this.apiController = apiController;
    this.controlController = new ControlController();
    this.garageView = new GarageView(this.controlController.getControlView());
    this.init();
  }

  public getGarageView(): GarageView {
    return this.garageView;
  }

  private init(): void {
    // this.loadCars(true);
    this.createMembersController();
    this.addEventListeners();
  }

  // private async loadCars(isNew: boolean): Promise<void> {
  //   try {
  //     const cars = await this.apiController.getCars(1);
  //     if (isNew) {
  //       this.membersController = new MembersController(cars);
  //       this.garageView.setMembersView(this.membersController.getMembersView());
  //     } else {
  //       this.membersController?.updateCars(cars);
  //       // this.garageView.updateCars(cars);
  //     }
  //   } catch (error) {
  //     console.log(error);
  //   }
  // }

  private createMembersController(): void {
    const cars = appStorage.getCars();
    this.membersController = new MembersController(cars);
    this.garageView.setMembersView(this.membersController.getMembersView());
  }

  // private updateCars(): void {
  //   const cars = appStorage.getCars();
  //   this.membersController?.updateCars(cars);
  // }

  private addEventListeners(): void {
    const garage = this.garageView;
    eventEmitter.subscribe(EventType.TO_GARAGE, garage.setActive.bind(garage));
    eventEmitter.subscribe(EventType.TO_WINNERS, garage.setInactive.bind(garage));
    eventEmitter.subscribe(EventType.TOTAL_CARS_CHANGE, garage.setHeader.bind(garage));
  }
}
