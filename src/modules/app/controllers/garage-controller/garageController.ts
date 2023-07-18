// import { Callback, Car } from '../../../types';
import GarageView from '../../view/main/garage/garageView';
import ApiController from '../api-controller/apiController';

export default class GarageController {
  private apiController: ApiController;

  private garageView: GarageView;

  constructor(apiController: ApiController) {
    this.apiController = apiController;
    this.garageView = new GarageView();
    this.init();
  }

  private init(): void {
    // this.renderGarage();
    this.loadCars();
    // this.addEventListeners();
  }

  public getGarageView(): GarageView {
    return this.garageView;
    // const garageElement = this.garageView.getHTMLElement();
    // Рендеринг гаража в нужном месте на странице
  }

  private async loadCars(): Promise<void> {
    try {
      const cars = await this.apiController.getCars(1);
      this.garageView.renderCars(cars);
    } catch (error) {
      console.log(error);
    }
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
