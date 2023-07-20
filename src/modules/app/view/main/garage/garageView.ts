import './garage.scss';
import View from '../../view';
import { ElementParams } from '../../../../types';
import ElementCreator from '../../../utils/element-creator';
import ButtonView from '../../button/buttonView';
import MembersView from './members/membersView';
import ControlView from './control/controlView';

const CssClasses = {
  GARAGE: 'garage',
  HEADER: 'garage__header',
  NOT_ACTIVE: 'not-active',
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
  // private createCarButtons: HTMLButtonElement[] = [];
  // private updateCarButtons: HTMLButtonElement[] = [];
  // private removeCarButtons: HTMLButtonElement[] = [];
  private controlView: ControlView;

  private membersView: MembersView | null;

  constructor(controlView: ControlView) {
    const params: ElementParams = {
      tag: 'article',
      classesName: [CssClasses.GARAGE],
    };
    super(params);
    this.controlView = controlView;
    this.membersView = null;
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

  // public updateCars(cars: Car[]): void {
  //   this.membersView?.updateView(cars);
  // }

  public setMembersView(membersView: MembersView): void {
    this.membersView = membersView;
    if (this.membersView) {
      this.elementCreator.addInnerElement(this.membersView.getHTMLElement());
    }
  }

  // public createCars(cars: Car[]): void {
  //   this.membersView = new MembersView(cars);
  //   if (this.membersView) {
  //     // this.membersView.getCreator().removeInner();
  //     this.elementCreator.addInnerElement(this.membersView.getHTMLElement());
  //   }
  // }

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
