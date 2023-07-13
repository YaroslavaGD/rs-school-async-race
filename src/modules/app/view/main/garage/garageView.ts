import './garage.scss';
import View from '../../view';
import { ElementParams } from '../../../../types';
import ElementCreator from '../../../element-creator/element-creator';
import ButtonView from '../../button/buttonView';
import MembersView from './members/membersView';

const CssClasses = {
  GARAGE: 'garage',
  HEADER: 'garage__header',
  RACE: 'race',
  RACE_PAGE: 'race__page',
  RACE_PAGINATION: 'race-pagination',
  RACE_PAGINATION_ITEM: 'race-pagination__item',
};

const TEXT_HEADER = 'Garage(7)';
const TEXT_PAGE = 'Page #1';
const TEXT_PAGINATION = {
  PREV: 'prev',
  NEXT: 'next',
};

export default class GarageView extends View {
  constructor() {
    const params: ElementParams = {
      tag: 'article',
      classesName: [CssClasses.GARAGE],
    };
    super(params);
    this.configureView();
  }

  private configureView(): void {
    const creatorHeader = this.createHeader();
    const creatorRace = this.createRace();
    const membersView = new MembersView();

    this.elementCreator.addInnerElement(creatorHeader);
    this.elementCreator.addInnerElement(creatorRace);
    this.elementCreator.addInnerElement(membersView.getHTMLElement());
  }

  private createHeader(): ElementCreator {
    const paramsHeader: ElementParams = {
      tag: 'h3',
      classesName: [CssClasses.HEADER],
      textContent: TEXT_HEADER,
    };
    const creatorHeader = new ElementCreator(paramsHeader);
    return creatorHeader;
  }

  private createRace(): ElementCreator {
    const paramsRace: ElementParams = {
      tag: 'div',
      classesName: [CssClasses.RACE],
    };
    const creatorRace = new ElementCreator(paramsRace);

    const creatorPage = this.createRacePage();
    const creatorPagination = this.createRacePagination();

    creatorRace.addInnerElement(creatorPage);
    creatorRace.addInnerElement(creatorPagination);
    return creatorRace;
  }

  private createRacePage(): ElementCreator {
    const paramsPage: ElementParams = {
      tag: 'h3',
      classesName: [CssClasses.RACE_PAGE],
      textContent: TEXT_PAGE,
    };
    const creatorPage = new ElementCreator(paramsPage);
    return creatorPage;
  }

  private createRacePagination(): ElementCreator {
    const paramsPagination: ElementParams = {
      tag: 'nav',
      classesName: [CssClasses.RACE_PAGINATION],
    };
    const creatorPagination = new ElementCreator(paramsPagination);
    const creatorButtonPrev = new ButtonView(CssClasses.RACE_PAGINATION_ITEM, TEXT_PAGINATION.PREV, 'prev');
    const creatorButtonNext = new ButtonView(CssClasses.RACE_PAGINATION_ITEM, TEXT_PAGINATION.NEXT, 'next');

    creatorPagination.addInnerElement(creatorButtonPrev.getHTMLElement());
    creatorPagination.addInnerElement(creatorButtonNext.getHTMLElement());

    return creatorPagination;
  }
}
