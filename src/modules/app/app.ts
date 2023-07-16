import ApiController from './controllers/api-controller/api-controller';
import HeaderView from './view/header/headerView';
import MainView from './view/main/mainView';

class App {
  private apiController = new ApiController();

  constructor() {
    this.createView();
  }

  public async run(): Promise<void> {
    console.log('получение списка машин на первой странице');
    try {
      const cars = await this.apiController.getCars(1);
      console.log(cars);
    } catch (error) {
      console.log(error);
    }
    // console.log('создание новой машины');
    // try {
    //   const car = await this.apiController.createCar('Tesla Model S', 'red');
    //   console.log(car);
    // } catch (error) {
    //   console.log(error);
    // }
    console.log('обновление атрибутов машины');
    try {
      const car = await this.apiController.updateCar(6, 'Ford Mustang', 'blue');
      console.log(car);
    } catch (error) {
      console.log(error);
    }
    console.log('удаление машины с указанным id');
    try {
      await this.apiController.deleteCar(6);
      console.log('Car deleted successfully');
    } catch (error) {
      console.log(error);
    }
    console.log('получение списка машин на первой странице');
    try {
      const cars = await this.apiController.getCars(1);
      console.log(cars);
    } catch (error) {
      console.log(error);
    }
  }

  private createView(): void {
    const headerView = new HeaderView();
    const mainView = new MainView();

    const header = headerView.getHTMLElement();
    const main = mainView.getHTMLElement();

    document.body.append(header);
    document.body.append(main);
  }
}

export default App;
