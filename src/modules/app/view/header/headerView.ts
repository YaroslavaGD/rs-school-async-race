import './header.scss';
import imgFrog from '../../../../img/frog3.svg';
import { ElementParams } from '../../../types';
import ElementCreator from '../../utils/element-creator';
import View from '../view';
import ButtonView from '../button/buttonView';

const CssClasses = {
  HEADER: 'header',
  LOGO: 'logo',
  LOGO_A: 'logo__a',
  LOGO_IMG: 'logo__img',
  LOGO_TEXT: 'logo__text',
  NAV: 'nav',
  NAV_ITEM: 'nav__item',
};

const TEXT_LOGO = 'Async Race';
const TEXT_GARAGE = 'to Garage';
const TEXT_WINNERS = 'to Winners';
const ALT_LOGO = 'Frog';

export default class HeaderView extends View {
  private buttons: ButtonView[];

  constructor() {
    const params: ElementParams = {
      tag: 'header',
      classesName: [CssClasses.HEADER],
    };
    super(params);
    this.buttons = [];
    this.configureView();
  }

  public getButtons(): ButtonView[] {
    return this.buttons;
  }

  private configureView(): void {
    const creatorLogo = this.createLogo();
    const creatorNav = this.createNav();

    this.elementCreator.addInnerElement(creatorLogo);
    this.elementCreator.addInnerElement(creatorNav);
  }

  private createLogo(): ElementCreator {
    const paramsLogo: ElementParams = {
      tag: 'h1',
      classesName: [CssClasses.LOGO],
    };
    const creatorLogo = new ElementCreator(paramsLogo);

    const paramsLink: ElementParams = {
      tag: 'a',
      classesName: [CssClasses.LOGO_A],
    };
    const creatorLink = new ElementCreator(paramsLink);

    const paramsImg: ElementParams = {
      tag: 'img',
      classesName: [CssClasses.LOGO_IMG],
    };
    const creatorImg = new ElementCreator(paramsImg);
    creatorImg.getElement().setAttribute('src', imgFrog);
    creatorImg.getElement().setAttribute('alt', ALT_LOGO);

    const paramsText: ElementParams = {
      tag: 'span',
      classesName: [CssClasses.LOGO_TEXT],
      textContent: TEXT_LOGO,
    };
    const creatorText = new ElementCreator(paramsText);

    creatorLink.addInnerElement(creatorImg);
    creatorLink.addInnerElement(creatorText);
    creatorLogo.addInnerElement(creatorLink);

    return creatorLogo;
  }

  private createNav(): ElementCreator {
    const paramsNav: ElementParams = {
      tag: 'nav',
      classesName: [CssClasses.NAV],
    };
    const creatorNav = new ElementCreator(paramsNav);

    const creatorGarage = new ButtonView(CssClasses.NAV_ITEM, TEXT_GARAGE, 'garage');
    const creatorWinners = new ButtonView(CssClasses.NAV_ITEM, TEXT_WINNERS, 'winners');
    this.buttons.push(creatorGarage);
    this.buttons.push(creatorWinners);
    creatorNav.addInnerElement(creatorGarage.getHTMLElement());
    creatorNav.addInnerElement(creatorWinners.getHTMLElement());

    return creatorNav;
  }
}
