import MainView from '../view/main/mainView';
// import ApiController from './apiController';
import GarageController from './garageController';
import WinnersController from './winnersController';

export default class MainController {
  // private apiController: ApiController;
  private mainView: MainView;

  private garageController: GarageController;

  private WinnersController: WinnersController;

  constructor() {
    // this.apiController = apiController;
    this.garageController = new GarageController();
    this.WinnersController = new WinnersController();
    const garageView = this.garageController.getGarageView();
    const winnersView = this.WinnersController.getWinnersView();
    this.mainView = new MainView(garageView, winnersView);
  }

  public getView(): MainView {
    return this.mainView;
  }
}
