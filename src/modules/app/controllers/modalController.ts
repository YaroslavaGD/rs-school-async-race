import { EventType, eventEmitter } from '../event-emitter/eventEmitter';
import ModalView from '../view/modal/modalView';

export default class ModalController {
  private modalView: ModalView;

  constructor() {
    this.modalView = new ModalView();
    this.init();
  }

  public getView(): ModalView {
    return this.modalView;
  }

  private init(): void {
    this.addEventListeners();
  }

  private addEventListeners(): void {
    eventEmitter.subscribe(EventType.WIN, this.modalView.onWin.bind(this.modalView));
  }
}
