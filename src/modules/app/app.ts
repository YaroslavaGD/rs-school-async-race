import { WinnerFull } from '../types';
import ApiController from './controllers/apiController';
import HeaderController from './controllers/headerController';
import MainController from './controllers/mainController';
import appStorage from './data/app-storage';
import { EventType, eventEmitter } from './event-emitter/eventEmitter';

export default class App {
  private apiController: ApiController;

  private headerController: HeaderController | null = null;

  private mainController: MainController | null = null;

  constructor() {
    this.apiController = new ApiController();
  }

  public async run(): Promise<void> {
    this.setStorage();
    this.createView();
    this.addEventListeners();
  }

  private createView(): void {
    this.createHeaderView();
    this.createMainView();
  }

  private createHeaderView(): void {
    this.headerController = new HeaderController();
    const header = this.headerController.getView().getHTMLElement();
    document.body.append(header);
  }

  private createMainView(): void {
    this.mainController = new MainController();
    const main = this.mainController.getView().getHTMLElement();
    document.body.append(main);
  }

  private async setStorage(): Promise<void> {
    this.loadCars();
    this.loadWinners();
  }

  private async loadCars(): Promise<void> {
    try {
      const currentPage = appStorage.getCurrentCarsPage();
      const carsData = await this.apiController.getCarsNew(currentPage);
      appStorage.setCars(carsData.cars);
      appStorage.setTotalsCars(carsData.total);
    } catch (error) {
      // console.log(error);
    }
  }

  private async loadWinners(): Promise<void> {
    try {
      const currentPage = appStorage.getCurrentWinnersPage();
      const winnersData = await this.apiController.getWinnersNew(currentPage);
      const { total } = winnersData;

      const { winners } = winnersData;
      const cars = await Promise.all(winners.map((winner) => this.apiController.getCar(winner.id)));

      const winnersFull = winners.map((winner, i) => {
        const winnerFull: WinnerFull = {
          id: winner.id,
          name: cars[i].name,
          color: cars[i].color,
          wins: winner.wins,
          time: winner.time,
        };

        return winnerFull;
      });
      appStorage.setWinners(winnersFull);
      appStorage.setTotalWinners(total);
    } catch (error) {
      // console.log(error);
    }
  }

  private addEventListeners(): void {
    eventEmitter.subscribe(EventType.SELECT, this.setSelectedCarId.bind(this));
    eventEmitter.subscribe(EventType.UPDATE, this.updateCar.bind(this));
    eventEmitter.subscribe(EventType.CREATE, this.createCar.bind(this));
    eventEmitter.subscribe(EventType.REMOVE, this.removeCar.bind(this));
  }

  private setSelectedCarId(carId?: number): void {
    if (carId !== undefined) {
      appStorage.setSelectedCarId(carId);
    }
  }

  private async updateCar(carStorageId?: number): Promise<void> {
    if (carStorageId !== undefined) {
      const changedCar = appStorage.getNewCarWithId(carStorageId);
      if (changedCar) {
        try {
          await this.apiController.updateCar(changedCar.id, changedCar.name, changedCar.color);
          appStorage.setCar(changedCar);
        } catch (error) {
          // console.log(error);
        }
      }
    }
  }

  private async createCar(): Promise<void> {
    console.log('create car - app');
    try {
      const newCar = appStorage.getNewCar();
      const car = await this.apiController.createCar(newCar.name, newCar.color);
      appStorage.setCar(car);
    } catch (error) {
      // console.log(error);
    }
  }

  private async removeCar(carStorageId?: number): Promise<void> {
    if (carStorageId !== undefined) {
      const id = appStorage.getCar(carStorageId)?.id;
      if (id !== undefined) {
        try {
          await this.apiController.removeCar(id);
          appStorage.removeCar(carStorageId);
        } catch (error) {
          // console.log(error);
        }

        try {
          await this.apiController.getWinner(id);
          await this.apiController.removeWinner(id);
          appStorage.removeWinner(id);
        } catch (error) {
          // console.log(error);
        }
      }
    }
  }
}
