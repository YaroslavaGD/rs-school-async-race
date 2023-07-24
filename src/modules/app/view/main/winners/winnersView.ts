// import ImgFrog from '../../../../../img/frog1.svg';
import View from '../../view';
import { ButtonTypeValue, ElementParams, WinnerFull } from '../../../../types';
import ElementCreator from '../../../utils/element-creator';
import appStorage from '../../../data/app-storage';
import ImageCarView from '../../imageCar/imageCarView';
import ButtonView from '../../button/buttonView';

const CssClasses = {
  WINNERS: 'winners',
  WINNERS_HEADER: 'winners__header',
  WINNERS_PAGE: 'winners__page',
  WINNERS_BUTTON: 'winners__button',
  NOT_ACTIVE: 'not-active',
  TABLE: 'table',
  TABLE_HEADER: 'table__header',
  TABLE_HEADER_CONTAINER: 'table__header-container',
  TABLE_HEADER_ITEM: 'table__header-item',
  TABLE_BODY: 'table__body',
  TABLE_ROW: 'table__row',
  TABLE_COLUMN: 'table__column',
  TABLE_IMG: 'table__img',
};

const TEXT_HEADER = 'Winners';
const TEXT_PAGE = 'Page #';
const TEXT_HEADER_ITEM = {
  NUMBER: 'Number',
  IMG: 'Frog',
  NAME: 'Name',
  WINS: 'Wins',
  TIME: 'Best time (s)',
};

export default class WinnersView extends View {
  private header: ElementCreator;

  private page: ElementCreator;

  private table: ElementCreator;

  private tableHeader: ElementCreator;

  private tableBody: ElementCreator;

  private prevButton: ButtonView;

  private nextButton: ButtonView;

  constructor() {
    const params: ElementParams = {
      tag: 'article',
      classesName: [CssClasses.WINNERS, CssClasses.NOT_ACTIVE],
    };
    super(params);

    this.header = this.createHeader();
    this.page = this.createPage();
    this.prevButton = this.createPrevButton();
    this.nextButton = this.createNextButton();
    this.tableHeader = this.createTableHeader();
    this.tableBody = this.createTableBody();
    this.table = this.createTable();
    this.configureView();
  }

  public setActive(): void {
    this.elementCreator.removeClasses(CssClasses.NOT_ACTIVE);
  }

  public setInactive(): void {
    this.elementCreator.setClasses([CssClasses.NOT_ACTIVE]);
  }

  public renderWinners(winners: WinnerFull[]): void {
    this.tableBody.removeInner();

    winners.forEach((winner) => {
      const tableRow = this.renderWinnerRow(winner);
      this.tableBody?.addInnerElement(tableRow);
    });
  }

  public setHeader(): void {
    this.header.setTextContent(`${TEXT_HEADER}(${appStorage.getTotalWinners()})`);
  }

  public setPage(): void {
    const page = appStorage.getCurrentWinnersPage();
    this.page.setTextContent(`${TEXT_PAGE}${page}`);
  }

  public getPrevButton(): ButtonView {
    return this.prevButton;
  }

  public getNextButton(): ButtonView {
    return this.nextButton;
  }

  private configureView(): void {
    this.elementCreator.addInnerElement(this.header);
    const params: ElementParams = {
      tag: 'div',
      classesName: ['winners__nav'],
    };
    const navCreator = new ElementCreator(params);
    navCreator.addInnerElement(this.prevButton.getHTMLElement());
    navCreator.addInnerElement(this.page);
    navCreator.addInnerElement(this.nextButton.getHTMLElement());

    this.elementCreator.addInnerElement(navCreator);
    this.elementCreator.addInnerElement(this.table);
  }

  private createHeader(): ElementCreator {
    const paramsHeader: ElementParams = {
      tag: 'h2',
      classesName: [CssClasses.WINNERS_HEADER],
      textContent: `${TEXT_HEADER}(${appStorage.getTotalWinners()})`,
    };
    const creatorHeader = new ElementCreator(paramsHeader);
    return creatorHeader;
  }

  private createPage(): ElementCreator {
    const paramsPage: ElementParams = {
      tag: 'p',
      classesName: [CssClasses.WINNERS_PAGE],
      textContent: `${TEXT_PAGE}${appStorage.getCurrentWinnersPage()}`,
    };
    const creatorPage = new ElementCreator(paramsPage);
    return creatorPage;
  }

  private createPrevButton(): ButtonView {
    return new ButtonView(CssClasses.WINNERS_BUTTON, 'prev', 'prev');
  }

  private createNextButton(): ButtonView {
    return new ButtonView(CssClasses.WINNERS_BUTTON, 'next', 'next');
  }

  private renderWinnerRow(winner: WinnerFull): ElementCreator {
    const paramsRow: ElementParams = {
      tag: 'tr',
      classesName: [CssClasses.TABLE_ROW],
    };
    const creatorRow = new ElementCreator(paramsRow);
    creatorRow.setDataId(winner.id);
    const colId = this.renderWinnerColumn('table-id', winner.id.toString());
    const colImg = this.renderWinnerColumn('table-img', winner.name, winner.color);
    const colName = this.renderWinnerColumn('table-name', winner.name);
    const colWins = this.renderWinnerColumn('table-wins', winner.wins.toString());
    const colTime = this.renderWinnerColumn('table-time', winner.time.toString());
    creatorRow.addInnerElement(colId);
    creatorRow.addInnerElement(colImg);
    creatorRow.addInnerElement(colName);
    creatorRow.addInnerElement(colWins);
    creatorRow.addInnerElement(colTime);
    return creatorRow;
  }

  private renderWinnerColumn(type: ButtonTypeValue, text?: string, color?: string): ElementCreator {
    const paramsColumn: ElementParams = {
      tag: 'td',
      classesName: [CssClasses.TABLE_COLUMN],
    };
    const creatorColumn = new ElementCreator(paramsColumn);
    creatorColumn.setDataType(type);

    if (type === 'table-img') {
      const paramsImg: ElementParams = {
        tag: 'div',
        classesName: [CssClasses.TABLE_IMG],
      };
      const creatorImg = new ElementCreator(paramsImg);
      // creatorImg.getElement().setAttribute('src', ImgFrog);
      if (color) {
        const newImg: ImageCarView = new ImageCarView(color);
        newImg.setStop();
        creatorImg.addInnerElement(newImg.getCreator());
        // creatorImg.getElement().setAttribute('alt', color);
      }
      creatorColumn.addInnerElement(creatorImg);
    } else {
      creatorColumn.setTextContent(text);
    }

    return creatorColumn;
  }

  private createTable(): ElementCreator {
    const paramsTable: ElementParams = {
      tag: 'table',
      classesName: [CssClasses.TABLE],
    };
    const creatorTable = new ElementCreator(paramsTable);
    creatorTable.addInnerElement(this.tableHeader);
    creatorTable.addInnerElement(this.tableBody);
    return creatorTable;
  }

  private createTableHeader(): ElementCreator {
    const paramsTableHeader: ElementParams = {
      tag: 'thead',
      classesName: [CssClasses.TABLE_HEADER],
    };
    const creatorTableHeader = new ElementCreator(paramsTableHeader);

    const paramsTableHeaderRow: ElementParams = {
      tag: 'tr',
      classesName: [CssClasses.TABLE_HEADER_CONTAINER],
    };
    const creatorTableHeaderRow = new ElementCreator(paramsTableHeaderRow);

    const creatorNumber = this.createTableHeaderItem(TEXT_HEADER_ITEM.NUMBER, 'table-id');
    const creatorImg = this.createTableHeaderItem(TEXT_HEADER_ITEM.IMG, 'table-img');
    const creatorName = this.createTableHeaderItem(TEXT_HEADER_ITEM.NAME, 'table-name');
    const creatorWins = this.createTableHeaderItem(TEXT_HEADER_ITEM.WINS, 'table-wins');
    const creatorTime = this.createTableHeaderItem(TEXT_HEADER_ITEM.TIME, 'table-time');

    creatorTableHeaderRow.addInnerElement(creatorNumber);
    creatorTableHeaderRow.addInnerElement(creatorImg);
    creatorTableHeaderRow.addInnerElement(creatorName);
    creatorTableHeaderRow.addInnerElement(creatorWins);
    creatorTableHeaderRow.addInnerElement(creatorTime);

    creatorTableHeader.addInnerElement(creatorTableHeaderRow);
    return creatorTableHeader;
  }

  private createTableHeaderItem(text: string, type: ButtonTypeValue): ElementCreator {
    const paramsHeaderItem: ElementParams = {
      tag: 'th',
      classesName: [CssClasses.TABLE_HEADER_ITEM],
      textContent: text,
    };
    const creatorHeaderItem = new ElementCreator(paramsHeaderItem);
    creatorHeaderItem.setDataType(type);

    return creatorHeaderItem;
  }

  private createTableBody(): ElementCreator {
    const paramsTableBody: ElementParams = {
      tag: 'tbody',
      classesName: [CssClasses.TABLE_BODY],
    };
    const creatorTableBody = new ElementCreator(paramsTableBody);
    return creatorTableBody;
  }
}
