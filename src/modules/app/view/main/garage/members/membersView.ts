import './members.scss';
import imageFrog from '../../../../../../img/frog1.svg';
import View from '../../../view';
import { Car, ElementParams } from '../../../../../types';
import ElementCreator from '../../../../element-creator/element-creator';
import ButtonView from '../../../button/buttonView';

const CssClasses = {
  MEMBERS: 'members',
  MEMBERS_ITEM: 'members__item',
  MEMBERS_ITEM_SELECTED: 'members__item--selected',
  MEMBERS_NAV: 'members__nav',
  MEMBERS_BUTTON: 'members__button',
  MEMBERS_NAME: 'members__name',
  MEMBERS_TRACK: 'members__track',
  MEMBERS_TRACK_NAV: 'members__track-nav',
  MEMBERS_TRACK_BUTTON: 'members__track-button',
  MEMBERS_IMG: 'members__img',
};

const TEXT_BUTTONS = {
  UPDATE: 'U',
  REMOVE: 'R',
  SELECT: 'S',
  DRIVE: 'A',
  STOP: 'B',
};

// const NUM_MEMBERS = 7;
// const DEFAULT_NAME = 'Frog';

export default class MembersView extends View {
  constructor(cars: Car[]) {
    const params: ElementParams = {
      tag: 'ul',
      classesName: [CssClasses.MEMBERS],
    };
    super(params);
    this.configureView(cars);
  }

  private configureView(cars: Car[]): void {
    for (let i = 0; i < cars.length; i += 1) {
      const member = this.createMembersItem(Number(cars[i].id), cars[i].name);
      this.elementCreator.addInnerElement(member);
    }
  }

  private createMembersItem(id: number, name: string): ElementCreator {
    const paramsMembers: ElementParams = {
      tag: 'li',
      classesName: [CssClasses.MEMBERS_ITEM],
    };
    const creatorMembers = new ElementCreator(paramsMembers);
    creatorMembers.setDataId(id);

    const creatorMembersNav = this.createMembersNav(name);
    const creatorMembersTrack = this.createMembersTrack();

    creatorMembers.addInnerElement(creatorMembersNav);
    creatorMembers.addInnerElement(creatorMembersTrack);

    return creatorMembers;
  }

  private createMembersNav(name: string): ElementCreator {
    const paramsNav: ElementParams = {
      tag: 'div',
      classesName: [CssClasses.MEMBERS_NAV],
    };
    const creatorNav = new ElementCreator(paramsNav);

    const creatorRemoveButton = new ButtonView(CssClasses.MEMBERS_BUTTON, TEXT_BUTTONS.REMOVE, 'remove-element');
    const creatorSelectButton = new ButtonView(CssClasses.MEMBERS_BUTTON, TEXT_BUTTONS.SELECT, 'select-element');
    const creatorName = this.createMembersName(name);

    creatorNav.addInnerElement(creatorSelectButton.getHTMLElement());
    creatorNav.addInnerElement(creatorRemoveButton.getHTMLElement());
    creatorNav.addInnerElement(creatorName);

    return creatorNav;
  }

  private createMembersName(name: string): ElementCreator {
    const paramsName: ElementParams = {
      tag: 'p',
      classesName: [CssClasses.MEMBERS_NAME],
      textContent: name,
    };
    const creatorName = new ElementCreator(paramsName);
    return creatorName;
  }

  private createMembersTrack(): ElementCreator {
    const paramsTrack: ElementParams = {
      tag: 'div',
      classesName: [CssClasses.MEMBERS_TRACK],
    };
    const creatorTrack = new ElementCreator(paramsTrack);

    const creatorNav = this.createMembersTrackNav();
    const creatorImg = this.createMembersImg();

    creatorTrack.addInnerElement(creatorNav);
    creatorTrack.addInnerElement(creatorImg);

    return creatorTrack;
  }

  private createMembersTrackNav(): ElementCreator {
    const paramsTrackNav: ElementParams = {
      tag: 'div',
      classesName: [CssClasses.MEMBERS_TRACK_NAV],
    };
    const creatorTrackNav = new ElementCreator(paramsTrackNav);

    const creatorDriveButton = new ButtonView(CssClasses.MEMBERS_TRACK_BUTTON, TEXT_BUTTONS.DRIVE, 'drive');
    const creatorStopButton = new ButtonView(CssClasses.MEMBERS_TRACK_BUTTON, TEXT_BUTTONS.STOP, 'stop');

    creatorTrackNav.addInnerElement(creatorDriveButton.getHTMLElement());
    creatorTrackNav.addInnerElement(creatorStopButton.getHTMLElement());

    return creatorTrackNav;
  }

  private createMembersImg(): ElementCreator {
    const paramsImg: ElementParams = {
      tag: 'img',
      classesName: [CssClasses.MEMBERS_IMG],
    };
    const creatorImg = new ElementCreator(paramsImg);
    creatorImg.getElement().setAttribute('src', imageFrog);

    return creatorImg;
  }
}
