import './image-car.scss';
import View from '../view';
import { ElementParams } from '../../../types';
import { FROG_SVG_STOP, FROG_SVG_ACTIVE, FROG_SVG_BROKE } from '../../data/frog';
import ElementCreator from '../../utils/element-creator';

const CssClasses = {
  IMAGE: 'svg-image',
  IMAGE_COLOR: 'frog-color',
  IMAGE_ACTIVE: 'frog-active',
  IMAGE_STOP: 'frog-stop',
  IMAGE_BROKE: 'frog-broke',
  IMAGE_INVISIBLE: 'invisible',
};

const DEFAULT_COLOR = '#6fbe7d';

export default class ImageCarView extends View {
  private color: string = DEFAULT_COLOR;

  private imageColorContainer: NodeListOf<HTMLElement> | null = null;

  private imageActive: HTMLElement | null = null;

  private imageStop: HTMLElement | null = null;

  private imageBroke: HTMLElement | null = null;

  constructor(color: string) {
    const params: ElementParams = {
      tag: 'div',
      classesName: [CssClasses.IMAGE],
    };
    super(params);
    this.color = color;
    this.configureView();
  }

  public getHTMLElement(): HTMLElement {
    return this.elementCreator.getElement();
  }

  public getCreator(): ElementCreator {
    return this.elementCreator;
  }

  public setColor(color: string): void {
    this.imageColorContainer?.forEach((image) => {
      image.setAttribute('fill', color);
    });
  }

  public setActive(): void {
    this.imageActive?.classList.remove(CssClasses.IMAGE_INVISIBLE);
    this.imageStop?.classList.add(CssClasses.IMAGE_INVISIBLE);
    this.imageBroke?.classList.add(CssClasses.IMAGE_INVISIBLE);
  }

  public setStop(): void {
    this.imageStop?.classList.remove(CssClasses.IMAGE_INVISIBLE);
    this.imageActive?.classList.add(CssClasses.IMAGE_INVISIBLE);
    this.imageBroke?.classList.add(CssClasses.IMAGE_INVISIBLE);
  }

  public setBroke(): void {
    this.imageBroke?.classList.remove(CssClasses.IMAGE_INVISIBLE);
    this.imageActive?.classList.add(CssClasses.IMAGE_INVISIBLE);
    this.imageStop?.classList.add(CssClasses.IMAGE_INVISIBLE);
  }

  private configureView(): void {
    const params = FROG_SVG_STOP + FROG_SVG_ACTIVE + FROG_SVG_BROKE;
    this.elementCreator.addInnerHtml(params);
    this.imageColorContainer = this.elementCreator.getElement().querySelectorAll(`.${CssClasses.IMAGE_COLOR}`);
    this.setColor(this.color);

    this.imageActive = this.elementCreator.getElement().querySelector(`.${CssClasses.IMAGE_ACTIVE}`);
    this.imageStop = this.elementCreator.getElement().querySelector(`.${CssClasses.IMAGE_STOP}`);
    this.imageBroke = this.elementCreator.getElement().querySelector(`.${CssClasses.IMAGE_BROKE}`);
    this.setStop();
  }
}
