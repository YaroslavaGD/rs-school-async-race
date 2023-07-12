class App {
  public async run(): Promise<void> {
    const response = await fetch('http://127.0.0.1:3000/garage');
    const data = await response.text();
    console.log(data);
    console.log('test');
  }
}

export default App;
