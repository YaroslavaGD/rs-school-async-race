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
      console.log('select');
      eventEmitter.emit(EventType.SELECT, this.carView.getId());
    });

    buttons[CarButtons.REMOVE].getCreator().setCallback(() => {
      console.log('remove');
      appStorage.setTotalsCars(appStorage.getTotalsCars() - 1);
      eventEmitter.emit(EventType.REMOVE, this.carView.getId());
    });

    buttons[CarButtons.DRIVE].getCreator().setCallback(() => {
      console.log('drive-mode');
      buttons[CarButtons.DRIVE].setDisabled(true);
      buttons[CarButtons.STOP].setDisabled(false);
      eventEmitter.emit(EventType.REQUEST_VELOCITY, this.carView.getId());
    });

    buttons[CarButtons.STOP].getCreator().setCallback(() => {
      console.log('stop');
      buttons[CarButtons.DRIVE].setDisabled(false);
      buttons[CarButtons.STOP].setDisabled(true);
      eventEmitter.emit(EventType.REQUEST_STOP, this.carView.getId());
    });
  }
}
