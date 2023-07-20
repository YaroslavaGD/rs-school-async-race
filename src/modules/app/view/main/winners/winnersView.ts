import ImgFrog from '../../../../../img/frog1.svg';
import View from '../../view';
import { ButtonTypeValue, ElementParams, WinnerFull } from '../../../../types';
import ElementCreator from '../../../utils/element-creator';

const CssClasses = {
  WINNERS: 'winners',
  WINNERS_HEADER: 'winners__header',
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

const TEXT_HEADER = 'Winners (10)';
const TEXT_HEADER_ITEM = {
  NUMBER: 'Number',
  IMG: 'Frog',
  NAME: 'Name',
  WINS: 'Wins',
  TIME: 'Best time (s)',
};

export default class WinnersView extends View {
  private table: ElementCreator;

  private tableHeader: ElementCreator;

  private tableBody: ElementCreator;

  constructor() {
    const params: ElementParams = {
      tag: 'article',
      classesName: [CssClasses.WINNERS, CssClasses.NOT_ACTIVE],
    };
    super(params);
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

  private configureView(): void {
    const creatorHeader = this.createHeader();
    this.elementCreator.addInnerElement(creatorHeader);
    this.elementCreator.addInnerElement(this.table);
  }

  private createHeader(): ElementCreator {
    const paramsHeader: ElementParams = {
      tag: 'h2',
      classesName: [CssClasses.WINNERS_HEADER],
      textContent: TEXT_HEADER,
    };
    const creatorHeader = new ElementCreator(paramsHeader);
    return creatorHeader;
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
        tag: 'img',
        classesName: [CssClasses.TABLE_IMG],
      };
      const creatorImg = new ElementCreator(paramsImg);
      creatorImg.getElement().setAttribute('src', ImgFrog);
      if (color) {
        creatorImg.getElement().setAttribute('alt', color);
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
