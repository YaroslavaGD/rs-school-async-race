import { WinnerFull } from '../../types';
import { EventType, eventEmitter } from '../event-emitter/eventEmitter';
import WinnersView from '../view/main/winners/winnersView';
import ApiController from './apiController';

export default class WinnersController {
  private apiController: ApiController;

  private winnersView: WinnersView;

  constructor(apiController: ApiController) {
    this.apiController = apiController;
    this.winnersView = new WinnersView();
    this.init();
  }

  public getWinnersView(): WinnersView {
    return this.winnersView;
  }

  private init(): void {
    this.loadWinners(1);
    this.addEventListeners();
  }

  private async loadWinners(page: number): Promise<void> {
    try {
      const winners = await this.apiController.getWinners(page);

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
      this.winnersView.renderWinners(winnersFull);
    } catch (error) {
      console.log(error);
    }
  }

  private addEventListeners(): void {
    const winners = this.winnersView;
    eventEmitter.subscribe(EventType.TO_WINNERS, winners.setActive.bind(winners));
    eventEmitter.subscribe(EventType.TO_GARAGE, winners.setInactive.bind(winners));
  }
}