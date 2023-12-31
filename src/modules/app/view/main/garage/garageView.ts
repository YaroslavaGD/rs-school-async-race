import './garage.scss';
import View from '../../view';
import { ElementParams } from '../../../../types';
import ElementCreator from '../../../utils/element-creator';
import ButtonView from '../../button/buttonView';
import MembersView from './members/membersView';
import ControlView from './control/controlView';
import appStorage from '../../../data/app-storage';

const CssClasses = {
  GARAGE: 'garage',
  HEADER: 'garage__header',
  NOT_ACTIVE: 'not-active',
  RACE: 'race',
  RACE_PAGE: 'race__page',
  RACE_PAGINATION: 'race-pagination',
  RACE_PAGINATION_ITEM: 'race-pagination__item',
};

const TEXT_HEADER = 'Garage';
const TEXT_PAGE = 'Page #1';
const TEXT_PAGINATION = {
  PREV: 'prev',
  NEXT: 'next',
};

export default class GarageView extends View {
  private controlView: ControlView;

  private membersView: MembersView | null;

  private headerCreator: ElementCreator | null;

  private buttonPrev: ButtonView | null = null;

  private buttonNext: ButtonView | null = null;

  private page: ElementCreator | null = null;

  constructor(controlView: ControlView) {
    const params: ElementParams = {
      tag: 'article',
      classesName: [CssClasses.GARAGE],
    };
    super(params);
    this.controlView = controlView;
    this.membersView = null;
    this.headerCreator = null;
    this.configureView();
  }

  public setActive(): void {
    this.elementCreator.removeClasses(CssClasses.NOT_ACTIVE);
  }

  public setInactive(): void {
    this.elementCreator.setClasses([CssClasses.NOT_ACTIVE]);
  }

  public getCreator(): ElementCreator {
    return this.elementCreator;
  }

  public setMembersView(membersView: MembersView): void {
    this.membersView = membersView;
    if (this.membersView) {
      this.elementCreator.addInnerElement(this.membersView.getHTMLElement());
    }
  }

  public setHeader(): void {
    this.headerCreator?.setTextContent(`${TEXT_HEADER}(${appStorage.getTotalsCars()})`);
  }

  public setPage(): void {
    const page = appStorage.getCurrentCarsPage();
    this.page?.setTextContent(`Page #${page}`);
  }

  public getButtonPrev(): ButtonView | null {
    return this.buttonPrev;
  }

  public getButtonNext(): ButtonView | null {
    return this.buttonNext;
  }

  private configureView(): void {
    const creatorHeader = this.createHeader();
    const creatorRace = this.createRace();
    // this.membersView = new MembersView();

    this.elementCreator.addInnerElement(creatorHeader);
    this.elementCreator.addInnerElement(this.controlView.getHTMLElement());
    this.elementCreator.addInnerElement(creatorRace);
  }

  private createHeader(): ElementCreator {
    const paramsHeader: ElementParams = {
      tag: 'h3',
      classesName: [CssClasses.HEADER],
      textContent: `${TEXT_HEADER}(${appStorage.getTotalsCars()})`,
    };
    const creatorHeader = new ElementCreator(paramsHeader);
    this.headerCreator = creatorHeader;
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
    this.page = creatorPage;
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
    this.buttonPrev = creatorButtonPrev;
    this.buttonNext = creatorButtonNext;
    creatorPagination.addInnerElement(creatorButtonPrev.getHTMLElement());
    creatorPagination.addInnerElement(creatorButtonNext.getHTMLElement());

    return creatorPagination;
  }
}
