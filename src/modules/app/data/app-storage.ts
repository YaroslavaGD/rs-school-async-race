import { Car, WinnerFull } from '../../types';
import { EventType, eventEmitter } from '../event-emitter/eventEmitter';

class AppStorage {
  private winners: WinnerFull[] = [];

  private cars: Car[] = [];

  private selectedCarId = 0;

  private currentCarsPage = 1;

  private currentWinnersPage = 1;

  private totalCars = 0;

  private totalWinners = 0;

  public setCars(cars: Car[]): void {
    this.cars = [...cars];
    eventEmitter.emit(EventType.CARS_CHANGE);
  }

  public setCar(car: Car): void {
    if (car.id >= 0) {
      if (car.id < this.cars.length) {
        this.cars[car.id] = car;
        eventEmitter.emit(EventType.CAR_CHANGE);
      } else {
        this.cars.push(car);
        eventEmitter.emit(EventType.NEW_CAR_CHANGE);
      }
    }
  }

  public setWinner(winner: WinnerFull): void {
    if (winner.id >= 0) {
      if (winner.id < this.winners.length) {
        this.winners[winner.id] = winner;
        eventEmitter.emit(EventType.WINNER_CHANGE);
      } else {
        this.winners.push(winner);
        eventEmitter.emit(EventType.NEW_WINNER_CHANGE);
      }
    }
  }

  public setWinners(winners: WinnerFull[]): void {
    this.winners = [...winners];
    eventEmitter.emit(EventType.WINNERS_CHANGE);
  }

  public setSelectedCarId(id: number): void {
    if (id >= 0) {
      this.selectedCarId = id;
      eventEmitter.emit(EventType.SELECTED_CAR_ID_CHANGE);
    }
  }

  public setCurrentCarsPage(page: number): void {
    if (page > 0) {
      this.currentCarsPage = page;
      eventEmitter.emit(EventType.CURRENT_CARS_PAGE_CHANGE);
    }
  }

  public setCurrentWinnersPage(page: number): void {
    if (page > 0) {
      this.currentWinnersPage = page;
      eventEmitter.emit(EventType.CURRENT_WINNERS_PAGE_CHANGE);
    }
  }

  public setTotalsCars(totalNumber: number): void {
    if (totalNumber >= 0) {
      this.totalCars = totalNumber;
      eventEmitter.emit(EventType.TOTAL_CARS_CHANGE);
    }
  }

  public setTotalWinners(totalNumber: number): void {
    if (this.totalWinners >= 0) {
      this.totalWinners = totalNumber;
      eventEmitter.emit(EventType.TOTAL_WINNERS_CHANGE);
    }
  }

  public removeCar(carId: number): void {
    if (carId >= 0 && carId < this.cars.length) {
      this.cars.splice(carId, 1);
      eventEmitter.emit(EventType.CARS_CHANGE);
    }
  }

  public removeWinner(winnerId: number): void {
    if (winnerId >= 0 && winnerId < this.winners.length) {
      this.winners.splice(winnerId, 1);
      eventEmitter.emit(EventType.WINNERS_CHANGE);
    }
  }

  public getCars(): Car[] {
    return this.cars.map((car) => car);
  }

  public getWinners(): WinnerFull[] {
    return this.winners.map((winner) => winner);
  }

  public getSelectedCarId(): number {
    return this.selectedCarId;
  }

  public getCurrentCarsPage(): number {
    return this.currentCarsPage;
  }

  public getCurrentWinnersPage(): number {
    return this.currentWinnersPage;
  }

  public getTotalsCars(): number {
    return this.totalCars;
  }

  public getTotalWinners(): number {
    return this.totalWinners;
  }

  public getCar(carId: number): Car | null {
    if (carId >= 0 && carId < this.cars.length) {
      return this.cars[carId];
    }
    return null;
  }

  public getWinner(winnerId: number): WinnerFull | null {
    if (winnerId >= 0 && winnerId < this.winners.length) {
      return this.winners[winnerId];
    }
    return null;
  }
}

const appStorage = new AppStorage();

export default appStorage;
