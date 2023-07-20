import { EventType, eventEmitter } from '../event-emitter/eventEmitter';
import HeaderView from '../view/header/headerView';

enum HeaderButtons {
  GARAGE,
  WINNERS,
}

export default class HeaderController {
  private headerView: HeaderView;

  constructor() {
    this.headerView = new HeaderView();
    this.init();
  }

  public getView(): HeaderView {
    return this.headerView;
  }

  private init(): void {
    this.addEventListeners();
  }

  private addEventListeners(): void {
    const buttons = this.headerView.getButtons();
    buttons[HeaderButtons.GARAGE].getCreator().setCallback(() => {
      eventEmitter.emit(EventType.TO_GARAGE);
    });

    buttons[HeaderButtons.WINNERS].getCreator().setCallback(() => {
      eventEmitter.emit(EventType.TO_WINNERS);
    });
  }
}
