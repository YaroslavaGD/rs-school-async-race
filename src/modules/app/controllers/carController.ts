import { Car } from '../../types';
import appStorage from '../data/app-storage';
import { EventType, eventEmitter } from '../event-emitter/eventEmitter';
import CarView from '../view/main/garage/members/car/CarView';

enum CarButtons {
  SELECT,
  REMOVE,
  DRIVE,
  STOP,
}

export default class CarController {
  private carView: CarView;

  constructor(id: number, car: Car) {
    this.carView = new CarView(id, car);
    this.init();
  }

  public getCarView(): CarView {
    return this.carView;
  }

  private init(): void {
    this.addEventListeners();
  }

  private addEventListeners(): void {
    const buttons = this.carView.getButtons();

    buttons[CarButtons.SELECT].getCreator().setCallback(() => {
      eventEmitter.emit(EventType.SELECT, this.carView.getId());
    });

    buttons[CarButtons.REMOVE].getCreator().setCallback(() => {
      appStorage.setTotalsCars(appStorage.getTotalsCars() - 1);
      eventEmitter.emit(EventType.REMOVE, this.carView.getId());
    });

    buttons[CarButtons.DRIVE].getCreator().setCallback(() => {
      this.setDriveMode();
    });

    buttons[CarButtons.STOP].getCreator().setCallback(() => {
      this.setStopMode();
    });
  }

  public async setDriveMode(): Promise<void> {
    const buttons = this.carView.getButtons();
    buttons[CarButtons.DRIVE].setDisabled(true);
    buttons[CarButtons.STOP].setDisabled(false);
    eventEmitter.emit(EventType.REQUEST_VELOCITY, this.carView.getId());
  }

  public async setStopMode(): Promise<void> {
    const buttons = this.carView.getButtons();
    buttons[CarButtons.DRIVE].setDisabled(false);
    buttons[CarButtons.STOP].setDisabled(true);
    eventEmitter.emit(EventType.REQUEST_STOP, this.carView.getId());
  }
}
