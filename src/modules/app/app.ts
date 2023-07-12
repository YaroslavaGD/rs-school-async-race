import HeaderView from './view/header/headerView';

class App {
  constructor() {
    this.createView();
  }

  public async run(): Promise<void> {
    const response = await fetch('http://127.0.0.1:3000/garage');
    const data = await response.text();
    console.log(data);
    console.log('test');
  }

  private createView(): void {
    const headerView = new HeaderView();
    const header = headerView.getHTMLElement();

    document.body.append(header);
  }
}

export default App;
