// import ApiController from './controllers/api-controller/api-controller';
import ApiController from './controllers/api-controller/apiController';
import MainController from './controllers/main-controller/mainController';
import HeaderView from './view/header/headerView';
// import MainView from './view/main/mainView';

export default class App {
  private apiController: ApiController;

  constructor() {
    this.apiController = new ApiController();
    this.createView();
  }

  public async run(): Promise<void> {
    try {
      const car = await this.apiController.getCar(1);
      console.log(car);
    } catch (error) {
      console.log(error);
    }
    // console.log('получение списка машин на первой странице');
    // try {
    //   const cars = await this.apiController.getCars(1);
    //   console.log(cars);
    // } catch (error) {
    //   console.log(error);
    // }
    // console.log('создание новой машины');
    // try {
    //   const car = await this.apiController.createCar('Tesla Model S', 'red');
    //   console.log(car);
    // } catch (error) {
    //   console.log(error);
    // }
    // console.log('обновление атрибутов машины');
    // try {
    //   const car = await this.apiController.updateCar(6, 'Ford Mustang', 'blue');
    //   console.log(car);
    // } catch (error) {
    //   console.log(error);
    // }
    // console.log('удаление машины с указанным id');
    // try {
    //   await this.apiController.deleteCar(6);
    //   console.log('Car deleted successfully');
    // } catch (error) {
    //   console.log(error);
    // }
  }

  private async createView(): Promise<void> {
    const headerView = new HeaderView();
    const header = headerView.getHTMLElement();

    // const mainController = new MainController(this.apiController);
    // const main = mainController.getView().getHTMLElement();

    document.body.append(header);

    try {
      await this.createMain();
    } catch (error) {
      console.log(error);
    }
    // document.body.append(main);
  }

  private async createMain(): Promise<void> {
    const mainController = new MainController(this.apiController);
    const main = mainController.getView().getHTMLElement();
    document.body.append(main);
  }
}
