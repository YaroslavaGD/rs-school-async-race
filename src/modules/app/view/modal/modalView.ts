import './modal.scss';
import View from '../view';
import ElementCreator from '../../utils/element-creator';
import { ElementParams } from '../../../types';
import ImageCarView from '../imageCar/imageCarView';
import appStorage from '../../data/app-storage';

const CssClasses = {
  MODAL: 'app-modal',
  MODAL_OPEN: 'app-modal--open',
  MODAL_WINDOW: 'app-modal__window',
  MODAL_HEADER: 'app-modal__header',
  MODAL_IMG: 'app-modal__img',
  MODAL_CONTENT: 'app-modal__content',
  MODAL_TEXT: 'app-modal__text',
  MODAL_BUTTON: 'app-modal__button',
};

export default class ModalView extends View {
  private text: ElementCreator | null = null;

  private image: ImageCarView | null = null;

  constructor() {
    const params: ElementParams = {
      tag: 'div',
      classesName: [CssClasses.MODAL],
      callback: (e) => {
        if (e?.target === this.getHTMLElement()) {
          this.onCloseModal();
        }
      },
    };
    super(params);
    this.configureView();
  }

  public onWin(carId?: number): void {
    if (carId !== undefined) {
      const car = appStorage.getCar(carId);
      if (car) {
        this.text?.setTextContent(`Frog ${car.name} wins!`);
        this.image?.setColor(car.color);
      }
    }
    this.elementCreator.setClasses([CssClasses.MODAL_OPEN]);
  }

  public onCloseModal(): void {
    this.elementCreator.removeClasses(CssClasses.MODAL_OPEN);
  }

  private configureView(): void {
    const windowParams: ElementParams = {
      tag: 'div',
      classesName: [CssClasses.MODAL_WINDOW],
    };
    const windowCreator = new ElementCreator(windowParams);

    const headerCreator = this.setHeader();
    windowCreator.addInnerElement(headerCreator);

    const contentCreator = this.setContent();
    windowCreator.addInnerElement(contentCreator);

    const buttonCreator = this.setButton();
    windowCreator.addInnerElement(buttonCreator);

    this.elementCreator.addInnerElement(windowCreator);
  }

  private setHeader(): ElementCreator {
    const headerParams: ElementParams = {
      tag: 'div',
      classesName: [CssClasses.MODAL_HEADER],
    };
    const headerCreator = new ElementCreator(headerParams);

    const modalImgWin = new ImageCarView('#6fbe7d');
    modalImgWin.setStop();
    modalImgWin.getHTMLElement().classList.add(CssClasses.MODAL_IMG);
    this.image = modalImgWin;
    headerCreator.addInnerElement(modalImgWin.getHTMLElement());

    return headerCreator;
  }

  private setContent(): ElementCreator {
    const contentParams: ElementParams = {
      tag: 'div',
      classesName: [CssClasses.MODAL_CONTENT],
    };
    const contentCreator = new ElementCreator(contentParams);

    const textParams: ElementParams = {
      tag: 'p',
      classesName: [CssClasses.MODAL_TEXT],
      textContent: 'Win!',
    };
    const textCreator = new ElementCreator(textParams);
    this.text = textCreator;

    contentCreator.addInnerElement(textCreator);

    return contentCreator;
  }

  private setButton(): ElementCreator {
    const buttonParams: ElementParams = {
      tag: 'button',
      classesName: [CssClasses.MODAL_BUTTON],
      callback: () => {
        this.elementCreator.removeClasses(CssClasses.MODAL_OPEN);
      },
    };
    const buttonCreator = new ElementCreator(buttonParams);
    return buttonCreator;
  }
}
