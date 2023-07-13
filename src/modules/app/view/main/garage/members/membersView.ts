import './members.scss';
import imageFrog from '../../../../../../img/sushi-1.svg';
import View from '../../../view';
import { ElementParams } from '../../../../../types';
import ElementCreator from '../../../../element-creator/element-creator';
import ButtonView from '../../../button/buttonView';

const CssClasses = {
  MEMBERS: 'members',
  MEMBERS_ITEM: 'members__item',
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
  DRIVE: 'A',
  STOP: 'B',
};

const NUM_MEMBERS = 7;
const DEFAULT_NAME = 'Frog';

export default class MembersView extends View {
  constructor() {
    const params: ElementParams = {
      tag: 'ul',
      classesName: [CssClasses.MEMBERS],
    };
    super(params);
    this.configureView();
  }

  private configureView(): void {
    for (let i = 0; i < NUM_MEMBERS; i += 1) {
      const member = this.createMembersItem(i, DEFAULT_NAME + i);
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

    const creatorUpdateButton = new ButtonView(CssClasses.MEMBERS_BUTTON, TEXT_BUTTONS.UPDATE, 'update-element');
    const creatorRemoveButton = new ButtonView(CssClasses.MEMBERS_BUTTON, TEXT_BUTTONS.REMOVE, 'remove-element');
    const creatorName = this.createMembersName(name);

    creatorNav.addInnerElement(creatorUpdateButton.getHTMLElement());
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
