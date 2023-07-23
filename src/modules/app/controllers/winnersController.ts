import appStorage from '../data/app-storage';
import { EventType, eventEmitter } from '../event-emitter/eventEmitter';
import WinnersView from '../view/main/winners/winnersView';

export default class WinnersController {
  private winnersView: WinnersView;

  constructor() {
    this.winnersView = new WinnersView();
    this.init();
  }

  public getWinnersView(): WinnersView {
    return this.winnersView;
  }

  private init(): void {
    this.addEventListeners();
  }

  private async updateWinners(): Promise<void> {
    const winners = appStorage.getWinners();
    this.winnersView.renderWinners(winners);
  }

  private addEventListeners(): void {
    const winners = this.winnersView;
    eventEmitter.subscribe(EventType.TO_WINNERS, winners.setActive.bind(winners));
    eventEmitter.subscribe(EventType.TO_GARAGE, winners.setInactive.bind(winners));
    eventEmitter.subscribe(EventType.TOTAL_WINNERS_CHANGE, winners.setHeader.bind(winners));
    eventEmitter.subscribe(EventType.WINNERS_CHANGE, this.updateWinners.bind(this));
  }
}
