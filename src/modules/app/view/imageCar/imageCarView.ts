import View from '../view';
import { ElementParams } from '../../../types';
import FROG_SVG from '../../data/frog';
import ElementCreator from '../../utils/element-creator';

const CssClasses = {
  IMAGE: 'svg-image',
  FROG_COLOR: 'frog-color',
};

const DEFAULT_COLOR = '#6fbe7d';

export default class ImageCarView extends View {
  private color: string = DEFAULT_COLOR;

  private imageColorContainer: HTMLElement | null = null;

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
    this.imageColorContainer?.setAttribute('fill', color);
  }

  private configureView(): void {
    this.elementCreator.addInnerHtml(FROG_SVG);
    this.imageColorContainer = this.elementCreator.getElement().querySelector('.frog-color');
    this.setColor(this.color);
  }
}
