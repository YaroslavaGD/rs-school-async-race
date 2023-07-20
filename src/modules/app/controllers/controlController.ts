import { NewCar } from '../../types';
import { EventType, eventEmitter } from '../event-emitter/eventEmitter';
import ControlView from '../view/main/garage/control/controlView';

enum ControlButtons {
  Create,
  Update,
  Race,
  Reset,
  Generate,
}

enum ControlInputs {
  Name,
  Color,
}

export default class ControlController {
  private controlView: ControlView = new ControlView();

  constructor() {
    this.init();
  }

  public getControlView(): ControlView {
    return this.controlView;
  }

  private init(): void {
    this.addEventListeners();
  }

  private addEventListeners(): void {
    const buttons = this.controlView.getButtons();
    const inputs = this.controlView.getInputs();
    buttons[ControlButtons.Create].getCreator().setCallback(() => {
      const nameInput = inputs[ControlInputs.Name].getElement();
      const colorInput = inputs[ControlInputs.Color].getElement();

      if (nameInput instanceof HTMLInputElement && colorInput instanceof HTMLInputElement) {
        const name = nameInput.value;
        const color = colorInput.value;
        const newCar: NewCar = {
          name,
          color,
        };

        eventEmitter.emit(EventType.CREATE, newCar);
      }
    });
  }
}
