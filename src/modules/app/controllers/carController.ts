import { Car } from '../../types';
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

  constructor(car: Car) {
    this.carView = new CarView(car);
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
      eventEmitter.emit(EventType.SELECT, this.carView.getCarData());
    });

    buttons[CarButtons.REMOVE].getCreator().setCallback(() => {
      console.log('remove');
      eventEmitter.emit(EventType.REMOVE, this.carView.getCarData());
    });

    buttons[CarButtons.DRIVE].getCreator().setCallback(() => {
      console.log('drive');
    });

    buttons[CarButtons.STOP].getCreator().setCallback(() => {
      console.log('stop');
    });
  }
}
