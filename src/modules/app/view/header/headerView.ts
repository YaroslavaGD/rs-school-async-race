import './header.scss';
import { ElementParams } from '../../../types';
import ElementCreator from '../../element-creator/element-creator';
import View from '../view';

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

export default class HeaderView extends View {
  constructor() {
    const params: ElementParams = {
      tag: 'header',
      classesName: [CssClasses.HEADER],
    };
    super(params);
    this.configureView();
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

    const paramsGarage: ElementParams = {
      tag: 'button',
      classesName: [CssClasses.NAV_ITEM],
      textContent: TEXT_GARAGE,
    };
    const creatorGarage = new ElementCreator(paramsGarage);

    const paramsWinners: ElementParams = {
      tag: 'button',
      classesName: [CssClasses.NAV_ITEM],
      textContent: TEXT_WINNERS,
    };
    const creatorWinners = new ElementCreator(paramsWinners);

    creatorGarage.setDataType('garage');
    creatorWinners.setDataType('winners');
    creatorNav.addInnerElement(creatorGarage);
    creatorNav.addInnerElement(creatorWinners);

    return creatorNav;
  }
}
