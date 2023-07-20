// import { Callback, Car } from '../../../types';
import { NewCar } from '../../types';
import { EventType, eventEmitter } from '../event-emitter/eventEmitter';
import GarageView from '../view/main/garage/garageView';
import ApiController from './apiController';
import ControlController from './controlController';
import MembersController from './membersController';

export default class GarageController {
  private apiController: ApiController;

  private garageView: GarageView;

  private membersController: MembersController | null = null;

  constructor(apiController: ApiController) {
    this.apiController = apiController;
    const controlController = new ControlController();
    this.garageView = new GarageView(controlController.getControlView());
    this.init();
  }

  public getGarageView(): GarageView {
    return this.garageView;
  }

  private init(): void {
    this.loadCars(true);
    this.addEventListeners();
  }

  private async loadCars(isNew: boolean): Promise<void> {
    try {
      const cars = await this.apiController.getCars(1);
      if (isNew) {
        this.membersController = new MembersController(cars);
        this.garageView.setMembersView(this.membersController.getMembersView());
      } else {
        this.membersController?.updateCars(cars);
        // this.garageView.updateCars(cars);
      }
    } catch (error) {
      console.log(error);
    }
  }

  private addEventListeners(): void {
    const garage = this.garageView;
    eventEmitter.subscribe(EventType.TO_GARAGE, garage.setActive.bind(garage));
    eventEmitter.subscribe(EventType.TO_WINNERS, garage.setInactive.bind(garage));
    eventEmitter.subscribe(EventType.CREATE, this.createNewCar.bind(this));
  }

  private async createNewCarServer(newCar?: NewCar): Promise<void> {
    try {
      if (newCar) {
        await this.apiController.createCar(newCar.name, newCar.color);
        await this.loadCars(false);
      }
    } catch (error) {
      console.log(error);
    }
  }

  private createNewCar(newCar?: NewCar): void {
    this.createNewCarServer(newCar);
  }
  // private addEventListeners(): void {
  //   const createCarButtons = this.garageView.getCreateCarButtons();
  //   const updateCarButtons = this.garageView.getUpdateCarButtons();
  //   const removeCarButtons = this.garageView.getRemoveCarButtons();

  //   createCarButtons.addEventListeners('click', this.handleCreateCar);
  //   updateCarButtons.forEach((button) => {
  //     button.addEventListeners('click', this.handleUpdateCar);
  //   });
  //   removeCarButtons.forEach((button) => {
  //     button.addEventListeners('click', this.handleRemoveCar);
  //   });
  // }

  // private handleCreateCar: Callback = async (): Promise<void> => {
  //   try {
  //     const name = prompt('Enter car name:');
  //     const color = prompt('Enter car color');

  //     if (name && color) {
  //       const newCar = await this.apiController.createCar(name, color);
  //       // this.garageView.addCar(newCar);
  //     }
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  // private handleUpdateCar: Callback = async (event?: Event): Promise<void> => {
  //   const button = event?.target as HTMLElement;
  //   const carId = button.dataset.id;

  //   if (carId) {
  //     try {
  //       const name = prompt('Enter updated car name:');
  //       const color = prompt('Enter updated car color:');
  //       if (name && color) {
  //         const updatedCar = await this.apiController.updateCar(Number(carId), name, color);
  //         // this.garageView.updateCar(updatedCar);
  //       }
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   }
  // };

  // private handleRemoveCar: Callback = async (event?: Event): Promise<void> => {
  //   const button = event?.target as HTMLElement;
  //   const carId = button.dataset.id;
  //   if (carId) {
  //     try {
  //       await this.apiController.deleteCar(Number(carId));
  //       // this.garageView.removeCar(Number(carId));
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   }
  // };
}