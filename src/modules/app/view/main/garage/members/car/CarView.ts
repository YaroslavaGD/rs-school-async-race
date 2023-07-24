import { Car, ElementParams, Engine } from '../../../../../../types';
import appStorage from '../../../../../data/app-storage';
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
  private id = 0;

  private carData: Car;

  private carImageView: ImageCarView | null = null;

  private carNameCreator: ElementCreator | null = null;

  private carButtons: ButtonView[];

  constructor(id: number, car: Car) {
    const params: ElementParams = {
      tag: 'li',
      classesName: [CssClasses.CAR_ITEM],
    };
    super(params);
    this.id = id;
    this.carData = { ...car };
    this.carButtons = [];
    this.configureView();
  }

  public getId(): number {
    return this.id;
  }

  public getCarData(): Car {
    return this.carData;
  }

  public getButtons(): ButtonView[] {
    return this.carButtons;
  }

  public updateCar(car: Car): void {
    this.carData = car;
    this.updateId();
    this.updateColor();
    this.updateName();
  }

  public updateCarEngine(engine: Engine): void {
    this.carData.engine = engine;
  }

  public animateCar(): void {
    this.elementCreator.setClasses(['animate-race']);
    if (this.carImageView) {
      this.carImageView.setActive();
      const imageHtml = this.carImageView.getCreator().getElement();
      const distance = appStorage.getCurrentDistance() - 70;
      const velocity = this.carData.engine?.velocity;
      const actualDistance = this.carData.engine?.distance;
      console.log('animation distance');
      console.log(distance);
      if (velocity !== undefined && actualDistance !== undefined) {
        const animation = imageHtml.animate(
          [{ transform: 'translate(0) rotate(0deg)' }, { transform: `translate(${distance}px) rotate(359deg)` }],
          {
            duration: actualDistance / velocity,
            fill: 'forwards',
          },
        );

        animation.addEventListener('finish', () => {
          this.carImageView?.setStop();
        });
      }
    }
  }

  public brokeCar(): void {
    this.elementCreator.setClasses(['animate-race', 'pause']);
    if (this.carImageView) {
      this.carImageView.setBroke();
      const imageHtml = this.carImageView.getCreator().getElement();

      imageHtml.getAnimations({ subtree: true }).map((animation) => animation.pause());
    }
  }

  public stopCar(): void {
    this.elementCreator.removeClasses('animate-race');
    this.elementCreator.removeClasses('pause');
    if (this.carImageView) {
      this.carImageView.setStop();
      const imageHtml = this.carImageView.getCreator().getElement();

      imageHtml.getAnimations({ subtree: true }).map((animation) => animation.cancel());
    }
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
    this.elementCreator.setDataId(this.id);
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

    const creatorSelectButton = new ButtonView(CssClasses.CAR_BUTTON, TEXT_BUTTONS.SELECT, 'select-element');
    const creatorRemoveButton = new ButtonView(CssClasses.CAR_BUTTON, TEXT_BUTTONS.REMOVE, 'remove-element');
    const creatorDriveButton = new ButtonView(CssClasses.CAR_BUTTON, TEXT_BUTTONS.DRIVE, 'drive');
    const creatorStopButton = new ButtonView(CssClasses.CAR_BUTTON, TEXT_BUTTONS.STOP, 'stop');
    creatorStopButton.setDisabled(true);

    this.carButtons.push(creatorSelectButton);
    this.carButtons.push(creatorRemoveButton);
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
