import MainView from '../../view/main/mainView';
import ApiController from '../api-controller/apiController';
import GarageController from '../garage-controller/garageController';
import WinnersController from '../winners-controller/winnersController';

export default class MainController {
  // private apiController: ApiController;
  private mainView: MainView;

  private garageController: GarageController;

  private WinnersController: WinnersController;

  constructor(apiController: ApiController) {
    // this.apiController = apiController;
    this.garageController = new GarageController(apiController);
    this.WinnersController = new WinnersController(apiController);
    const garageView = this.garageController.getGarageView();
    const winnersView = this.WinnersController.getWinnersView();
    this.mainView = new MainView(garageView, winnersView);
  }

  public getView(): MainView {
    return this.mainView;
  }
}
