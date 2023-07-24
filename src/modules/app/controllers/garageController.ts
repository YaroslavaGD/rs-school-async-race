import appStorage from '../data/app-storage';
import { EventType, eventEmitter } from '../event-emitter/eventEmitter';
import GarageView from '../view/main/garage/garageView';
import ControlController from './controlController';
import MembersController from './membersController';

export default class GarageController {
  private garageView: GarageView;

  private membersController: MembersController | null = null;

  private controlController: ControlController;

  constructor() {
    this.controlController = new ControlController();
    this.garageView = new GarageView(this.controlController.getControlView());
    this.init();
  }

  public getGarageView(): GarageView {
    return this.garageView;
  }

  private init(): void {
    this.createMembersController();
    this.addEventListeners();
  }

  private createMembersController(): void {
    const cars = appStorage.getCars();
    this.membersController = new MembersController(cars);
    this.garageView.setMembersView(this.membersController.getMembersView());
  }

  private addEventListeners(): void {
    const garage = this.garageView;
    eventEmitter.subscribe(EventType.TO_GARAGE, garage.setActive.bind(garage));
    eventEmitter.subscribe(EventType.TO_WINNERS, garage.setInactive.bind(garage));
    eventEmitter.subscribe(EventType.TOTAL_CARS_CHANGE, garage.setHeader.bind(garage));
    eventEmitter.subscribe(EventType.CURRENT_CARS_PAGE_CHANGE, garage.setPage.bind(garage));

    this.garageView
      .getButtonPrev()
      ?.getCreator()
      .setCallback(() => {
        eventEmitter.emit(EventType.PREV_CARS);
      });

    this.garageView
      .getButtonNext()
      ?.getCreator()
      .setCallback(() => {
        eventEmitter.emit(EventType.NEXT_CARS);
      });
  }
}
