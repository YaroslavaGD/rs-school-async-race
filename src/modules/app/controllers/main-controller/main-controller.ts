import MainView from '../../view/main/mainView';
import ApiController from '../api-controller/api-controller';
import GarageController from '../garage-controller/garage-controller';

export default class MainController {
  // private apiController: ApiController;
  private mainView: MainView;

  private garageController: GarageController;

  private WinnersController: GarageController;

  constructor(apiController: ApiController) {
    // this.apiController = apiController;
    this.garageController = new GarageController(apiController);
    this.WinnersController = new GarageController(apiController);
    const garageView = this.garageController.getGarageView();
    const winnersView = this.WinnersController.getGarageView();
    this.mainView = new MainView(garageView, winnersView);
  }

  public getView(): MainView {
    return this.mainView;
  }
}
