import { WinnerFull } from '../types';
import ApiController from './controllers/apiController';
import HeaderController from './controllers/headerController';
import MainController from './controllers/mainController';
import appStorage from './data/app-storage';

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
    // console.log(appStorage);
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
    this.mainController = new MainController(this.apiController);
    const main = this.mainController.getView().getHTMLElement();
    document.body.append(main);
  }

  private async setStorage(): Promise<void> {
    this.loadCars();
    this.loadWinners();
  }

  private async loadCars(): Promise<void> {
    const currentPage = appStorage.getCurrentCarsPage();
    const carsData = await this.apiController.getCarsNew(currentPage);
    appStorage.setCars(carsData.cars);
    appStorage.setTotalsCars(carsData.total);
  }

  private async loadWinners(): Promise<void> {
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
  }
}
