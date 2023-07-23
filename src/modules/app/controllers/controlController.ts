import { Car, NewCar } from '../../types';
import appStorage from '../data/app-storage';
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

  private car: Car | null = null;

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
        appStorage.setNewCar(newCar);
        eventEmitter.emit(EventType.CREATE);
      }
    });

    buttons[ControlButtons.Update].getCreator().setCallback(() => {
      const nameInput = inputs[ControlInputs.Name].getElement();
      const colorInput = inputs[ControlInputs.Color].getElement();
      if (nameInput instanceof HTMLInputElement && colorInput instanceof HTMLInputElement) {
        const name = nameInput.value;
        const color = colorInput.value;
        const id = appStorage.getSelectedCarId();
        const updatedCar: NewCar = {
          // id,
          name,
          color,
        };
        appStorage.setNewCar(updatedCar);
        eventEmitter.emit(EventType.UPDATE, id);
      }
    });

    eventEmitter.subscribe(EventType.SELECTED_CAR_ID_CHANGE, this.setOldCar.bind(this));
  }

  private setOldCar(): void {
    const inputs = this.controlView.getInputs();
    const nameInput = inputs[ControlInputs.Name].getElement();
    const colorInput = inputs[ControlInputs.Color].getElement();

    const oldCarId = appStorage.getSelectedCarId();
    const oldCar = appStorage.getCar(oldCarId);
    if (oldCar) {
      if (nameInput instanceof HTMLInputElement && colorInput instanceof HTMLInputElement) {
        nameInput.value = '';
        nameInput.value = oldCar.name;
        colorInput.value = '#000000';
        colorInput.value = oldCar.color;
      }
      this.car = oldCar;
    }
  }
}
