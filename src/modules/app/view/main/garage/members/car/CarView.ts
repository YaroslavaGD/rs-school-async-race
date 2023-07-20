import { Car, ElementParams } from '../../../../../../types';
import ElementCreator from '../../../../../utils/element-creator';
import ButtonView from '../../../../button/buttonView';
import ImageCarView from '../../../../imageCar/imageCarView';
import View from '../../../../view';

const CssClasses = {
  CAR_ITEM: 'members__item',
  CAR_ITEM_SELECTED: 'members__item--selected',
  CAR_NAV: 'members__nav',
  CAR_BUTTON: 'members__button',
  CAR_NAME: 'members__name',
  CAR_TRACK: 'members__track',
  // MEMBERS_TRACK_NAV: 'members__track-nav',
  // MEMBERS_TRACK_BUTTON: 'members__track-button',
  CAR_IMG: 'members__img',
};

const TEXT_BUTTONS = {
  UPDATE: 'U',
  REMOVE: 'R',
  SELECT: 'S',
  DRIVE: 'A',
  STOP: 'B',
};

export default class CarView extends View {
  private carData: Car;

  private carImageView: ImageCarView | null = null;

  private carNameCreator: ElementCreator | null = null;

  private carButtons: ButtonView[];

  constructor(car: Car) {
    const params: ElementParams = {
      tag: 'li',
      classesName: [CssClasses.CAR_ITEM],
    };
    super(params);
    this.carData = car;
    this.carButtons = [];
    this.configureView();
  }

  public updateCar(car: Car): void {
    this.carData = car;
    this.updateId();
    this.updateColor();
    this.updateName();
  }

  private updateId(): void {
    this.elementCreator.setDataId(this.carData.id);
  }

  private updateColor(): void {
    this.carImageView?.setColor(this.carData.color);
  }

  private updateName(): void {
    this.carNameCreator?.setTextContent(this.carData.name);
  }

  private configureView(): void {
    this.elementCreator.setDataId(this.carData.id);
    const nameCreator = this.createName();
    const buttonsCreator = this.createCarsButtons();
    const trackCreator = this.createCarTrack();

    this.elementCreator.addInnerElement(nameCreator);
    this.elementCreator.addInnerElement(buttonsCreator);
    this.elementCreator.addInnerElement(trackCreator);
  }

  private createName(): ElementCreator {
    const paramsName: ElementParams = {
      tag: 'p',
      classesName: [CssClasses.CAR_NAME],
      textContent: this.carData.name,
    };
    const creatorName = new ElementCreator(paramsName);
    creatorName.setTextContent(this.carData.name);
    this.carNameCreator = creatorName;
    return creatorName;
  }

  private createCarsButtons(): ElementCreator {
    const paramsNav: ElementParams = {
      tag: 'div',
      classesName: [CssClasses.CAR_NAV],
    };
    const creatorNav = new ElementCreator(paramsNav);

    const creatorRemoveButton = new ButtonView(CssClasses.CAR_BUTTON, TEXT_BUTTONS.REMOVE, 'remove-element');
    const creatorSelectButton = new ButtonView(CssClasses.CAR_BUTTON, TEXT_BUTTONS.SELECT, 'select-element');
    const creatorDriveButton = new ButtonView(CssClasses.CAR_BUTTON, TEXT_BUTTONS.DRIVE, 'drive');
    const creatorStopButton = new ButtonView(CssClasses.CAR_BUTTON, TEXT_BUTTONS.STOP, 'stop');

    this.carButtons.push(creatorRemoveButton);
    this.carButtons.push(creatorSelectButton);
    this.carButtons.push(creatorDriveButton);
    this.carButtons.push(creatorStopButton);

    creatorNav.addInnerElement(creatorSelectButton.getHTMLElement());
    creatorNav.addInnerElement(creatorRemoveButton.getHTMLElement());
    creatorNav.addInnerElement(creatorDriveButton.getHTMLElement());
    creatorNav.addInnerElement(creatorStopButton.getHTMLElement());

    return creatorNav;
  }

  private createCarTrack(): ElementCreator {
    const paramsTrack: ElementParams = {
      tag: 'div',
      classesName: [CssClasses.CAR_TRACK],
    };
    const creatorTrack = new ElementCreator(paramsTrack);

    const creatorImg = this.createImage();
    creatorTrack.addInnerElement(creatorImg);

    return creatorTrack;
  }

  private createImage(): ElementCreator {
    const carImageView = new ImageCarView(this.carData.color);
    carImageView.getCreator().setClasses([CssClasses.CAR_IMG]);
    this.carImageView = carImageView;
    return carImageView.getCreator();
  }
}
