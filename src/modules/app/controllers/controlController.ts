import { Car, NewCar } from '../../types';
import appStorage from '../data/app-storage';
import { EventType, eventEmitter } from '../event-emitter/eventEmitter';
import ElementCreator from '../utils/element-creator';
import ButtonView from '../view/button/buttonView';
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

  private buttons: ButtonView[] = [];

  private inputs: ElementCreator[] = [];

  private car: Car | null = null;

  constructor() {
    this.init();
  }

  public getControlView(): ControlView {
    return this.controlView;
  }

  private init(): void {
    this.setButtons();
    this.setInputs();
    this.addEventListeners();
  }

  private setButtons(): void {
    this.buttons = this.controlView.getButtons();
  }

  private setInputs(): void {
    this.inputs = this.controlView.getInputs();
  }

  private addEventListeners(): void {
    this.addEventListenerCreate();
    this.addEventListenerUpdate();
    this.addEventListenerGenerate();
    this.addEventListenerRace();
    this.addEventListenerReset();
    eventEmitter.subscribe(EventType.SELECTED_CAR_ID_CHANGE, this.setOldCar.bind(this));
  }

  private addEventListenerCreate(): void {
    this.buttons[ControlButtons.Create].getCreator().setCallback(() => {
      const nameInput = this.inputs[ControlInputs.Name].getElement();
      const colorInput = this.inputs[ControlInputs.Color].getElement();

      if (nameInput instanceof HTMLInputElement && colorInput instanceof HTMLInputElement) {
        const name = nameInput.value;
        const color = colorInput.value;
        const newCar: NewCar = {
          name,
          color,
        };
        appStorage.setNewCar(newCar);
        appStorage.setTotalsCars(appStorage.getTotalsCars() + 1);
        eventEmitter.emit(EventType.CREATE);
      }
    });
  }

  private addEventListenerUpdate(): void {
    this.buttons[ControlButtons.Update].getCreator().setCallback(() => {
      const nameInput = this.inputs[ControlInputs.Name].getElement();
      const colorInput = this.inputs[ControlInputs.Color].getElement();
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
  }

  private addEventListenerRace(): void {
    console.log('RACE');
    this.buttons[ControlButtons.Race].getCreator().setCallback(() => {
      eventEmitter.emit(EventType.RASE);
    });
  }

  private addEventListenerReset(): void {
    console.log('RESET');
    this.buttons[ControlButtons.Reset].getCreator().setCallback(() => {
      eventEmitter.emit(EventType.RESET);
    });
  }

  private addEventListenerGenerate(): void {
    this.buttons[ControlButtons.Generate].getCreator().setCallback(() => {
      eventEmitter.emit(EventType.GENERATE);
    });
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
