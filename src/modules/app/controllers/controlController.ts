import { Car } from '../../types';
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
        const newCar: Car = {
          id: -1, // для новых машин ненужный id
          name,
          color,
        };

        eventEmitter.emit(EventType.CREATE, newCar);
      }
    });

    buttons[ControlButtons.Update].getCreator().setCallback(() => {
      const nameInput = inputs[ControlInputs.Name].getElement();
      const colorInput = inputs[ControlInputs.Color].getElement();

      if (nameInput instanceof HTMLInputElement && colorInput instanceof HTMLInputElement) {
        const name = nameInput.value;
        const color = colorInput.value;
        const id = this.car ? this.car.id : 0;
        const updatedCar: Car = {
          id,
          name,
          color,
        };
        eventEmitter.emit(EventType.UPDATE, updatedCar);
      }
    });

    eventEmitter.subscribe(EventType.SELECT, this.setOldCar.bind(this));
  }

  private setOldCar(oldCar?: Car): void {
    const inputs = this.controlView.getInputs();
    const nameInput = inputs[ControlInputs.Name].getElement();
    const colorInput = inputs[ControlInputs.Color].getElement();
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
