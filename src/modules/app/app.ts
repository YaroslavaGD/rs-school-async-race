import { Car, Engine, NewCar, Winner, WinnerFull } from '../types';
import ApiController from './controllers/apiController';
import HeaderController from './controllers/headerController';
import MainController from './controllers/mainController';
import ModalController from './controllers/modalController';
import appStorage from './data/app-storage';
import NAMES from './data/names';
import { EventType, eventEmitter } from './event-emitter/eventEmitter';

// const NUM_CARS = 100;

export default class App {
  private apiController: ApiController;

  private headerController: HeaderController | null = null;

  private mainController: MainController | null = null;

  private modalController: ModalController | null = null;

  private isWinner = false;

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
    this.createModalView();
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

  private createModalView(): void {
    this.modalController = new ModalController();
    const main = this.modalController.getView().getHTMLElement();
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
    eventEmitter.subscribe(EventType.GENERATE, this.createRandomCars.bind(this));
    eventEmitter.subscribe(EventType.REQUEST_VELOCITY, this.setEngineData.bind(this));
    eventEmitter.subscribe(EventType.REQUEST_STOP, this.stopDriveCar.bind(this));
    eventEmitter.subscribe(EventType.RASE, this.startRace.bind(this));
  }

  private startRace(): void {
    this.isWinner = false;
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
    try {
      const newCar = appStorage.getNewCar();
      await this.apiController.createCar(newCar.name, newCar.color);
      this.loadCars();
      // appStorage.setCar(car);
    } catch (error) {
      // console.log(error);
    }
  }

  private async createRandomCars(): Promise<void> {
    const newCars = this.generateCars();
    await Promise.all(newCars.map((newCar) => this.createRandomCar(newCar)));
    this.loadCars();
  }

  private async createRandomCar(newCar: NewCar): Promise<Car> {
    try {
      const car = await this.apiController.createCar(newCar.name, newCar.color);
      return car;
    } catch (error) {
      // console.log(error);
      throw Error('creation error');
    }
  }

  private async removeCar(carStorageId?: number): Promise<void> {
    if (carStorageId !== undefined) {
      const id = appStorage.getCar(carStorageId)?.id;
      if (id !== undefined) {
        try {
          await this.apiController.removeCar(id);
          await this.loadCars();
          // appStorage.removeCar(carStorageId);
        } catch (error) {
          // console.log(error);
        }

        try {
          await this.apiController.getWinner(id);
          await this.apiController.removeWinner(id);
          appStorage.removeWinner(id);
          appStorage.setTotalWinners(appStorage.getTotalWinners() - 1);
        } catch (error) {
          // console.log(error);
        }
      }
    }
  }

  private generateCars(): NewCar[] {
    let cars: NewCar[] = [];
    const firstArr = NAMES.first;
    const secondArr = NAMES.second;

    firstArr.forEach((firstName) => {
      secondArr.forEach((secondName) => {
        const car = this.generateCar(`${firstName} ${secondName}`);
        cars.push(car);
      });
    });

    cars = this.shuffleRandomArray(cars);
    return cars;
  }

  private generateCar(name: string): NewCar {
    const color = this.getRandomColor();
    return { name, color };
  }

  private shuffleRandomArray<T>(arr: T[]): T[] {
    const resultArr = [...arr];

    for (let i = resultArr.length - 1; i > 0; i -= 1) {
      const j = Math.floor(Math.random() * (i + 1));

      [resultArr[i], resultArr[j]] = [resultArr[j], resultArr[i]];
    }

    return resultArr;
  }

  private getRandomColor(): string {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i += 1) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }

  private async setEngineData(carStorageId?: number): Promise<void> {
    if (carStorageId !== undefined) {
      const car = appStorage.getCar(carStorageId);
      if (car) {
        try {
          const engineData: Engine = await this.apiController.startEngine(car.id);
          appStorage.updateEngine(carStorageId, engineData);
          this.startDriveCar(carStorageId);
        } catch (error) {
          console.log(error);
        }
      }
    }
  }

  private async startDriveCar(carsStorageId: number): Promise<void> {
    const car = appStorage.getCar(carsStorageId);
    if (car) {
      try {
        const startTime = performance.now();
        await this.apiController.startRace(car.id);
        const endTime = performance.now();

        if (!this.isWinner) {
          this.isWinner = true;
          console.log('winner');
          console.log(carsStorageId);
          const responseTime = (endTime - startTime) / 1000;
          console.log('Response Time for Winner (s):', responseTime);
          await this.setWinner(carsStorageId, responseTime);
          eventEmitter.emit(EventType.WIN, carsStorageId);
          this.loadWinners();
        }
      } catch (error) {
        eventEmitter.emit(EventType.CAR_BROKEN, carsStorageId);
      }
    }
  }

  private async setWinner(carStorageId: number, time: number): Promise<void> {
    const car = appStorage.getCar(carStorageId);
    let isNew = false;
    if (car) {
      let winner: Winner | null = null;
      try {
        winner = await this.apiController.getWinner(car.id);
        winner.time = time;
        winner.wins += 1;
        isNew = false;
      } catch (error) {
        winner = {
          id: car.id,
          time,
          wins: 1,
        };
        isNew = true;
      }

      if (isNew) {
        this.apiController.createWinner(winner.id, winner.wins, winner.time);
      } else {
        this.apiController.updateWinner(winner.id, winner.wins, winner.time);
      }
    }
  }

  private async stopDriveCar(carsStorageId?: number): Promise<void> {
    if (carsStorageId !== undefined) {
      const car = appStorage.getCar(carsStorageId);
      if (car) {
        try {
          const engine = await this.apiController.stopEngine(car.id);
          appStorage.updateEngine(carsStorageId, engine);
          // eventEmitter.emit(EventType.CAR_STOP, carsStorageId);
        } catch (error) {
          console.log(error);
        }
      }
    }
  }
}
