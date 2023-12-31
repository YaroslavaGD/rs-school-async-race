import { Car, CarsData, Engine, Winner, WinnersData } from '../../types';

const BASE_URL = 'http://localhost:3000';

class ApiController {
  private baseUrl: string;

  constructor() {
    this.baseUrl = BASE_URL;
  }

  private async request<T>(url: string, method = 'GET', body: object | null = null): Promise<T> {
    try {
      const options: RequestInit = {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
      };

      if (body) {
        options.body = JSON.stringify(body);
      }

      const response = await fetch(`${this.baseUrl}${url}`, options);

      if (!response.ok) {
        const errorData: { message?: string } = await response.json();
        throw new Error(errorData.message || 'Something went wrong');
      }

      const data: T = await response.json();

      return data;
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }

      throw new Error('Something went wrong');
    }
  }

  public async getCars(page: number): Promise<Car[]> {
    try {
      const response = await this.request<Car[]>(`/garage?_page=${page}&_limit=7`);
      return response;
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(`Failed to get cars: ${error.message}`);
      }

      throw new Error('Something went wrong');
    }
  }

  public async getCarsNew(page: number): Promise<CarsData> {
    try {
      const options: RequestInit = {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      };
      const url = `/garage?_page=${page}&_limit=7`;
      const response = await fetch(`${this.baseUrl}${url}`, options);

      if (!response.ok) {
        const errorData: { message?: string } = await response.json();
        throw new Error(errorData.message || 'Something went wrong');
      }
      const total = Number(response.headers.get('X-Total-Count'));
      const cars: Car[] = await response.json();
      const carsData: CarsData = {
        total,
        cars,
      };
      return carsData;
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
      throw new Error('Something went wrong');
    }
  }

  public async getCar(id: number): Promise<Car> {
    try {
      const response = await this.request<Car>(`/garage/${id}`);
      return response;
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(`Failed to get car with id: ${error.message}`);
      }

      throw new Error('Something went wrong');
    }
  }

  public async createCar(name: string, color: string): Promise<Car> {
    try {
      const response = await this.request<Car>('/garage', 'POST', { name, color });
      return response;
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(`Failed to create car: ${error.message}`);
      }

      throw new Error('Something went wrong');
    }
  }

  public async updateCar(id: number, name: string, color: string): Promise<Car> {
    try {
      const response = await this.request<Car>(`/garage/${id}`, 'PUT', { name, color });
      return response;
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(`Failed to update car: ${error.message}`);
      }

      throw new Error('Something went wrong');
    }
  }

  public async removeCar(id: number): Promise<void> {
    try {
      await this.request<void>(`/garage/${id}`, 'DELETE');
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(`Failed to delete car: ${error.message}`);
      }

      throw new Error('Something went wrong');
    }
  }

  public async startEngine(id: number): Promise<Engine> {
    try {
      const response = await this.request<Engine>(`/engine?id=${id}&status=started`, 'PATCH');
      return response;
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(`Failed to start engine ${id}: ${error.message}`);
      }

      throw new Error('Something went wrong');
    }
  }

  public async stopEngine(id: number): Promise<Engine> {
    try {
      const response = await this.request<Engine>(`/engine?id=${id}&status=stopped`, 'PATCH');
      return response;
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(`Failed to stop engine: ${error.message}`);
      }

      throw new Error('Something went wrong');
    }
  }

  public async startRace(id: number): Promise<void> {
    try {
      await this.request<void>(`/engine?id=${id}&status=drive`, 'PATCH');
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(`Failed to start race: ${error.message}`);
      }

      throw new Error('Something went wrong');
    }
  }

  public async resetRace(): Promise<void> {
    try {
      await this.request<void>('/engine', 'POST', { status: 'stop' });
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(`Failed to reset race: ${error.message}`);
      }

      throw new Error('Something went wrong');
    }
  }

  public async getWinners(page: number): Promise<Winner[]> {
    try {
      const response = await this.request<Winner[]>(`/winners?_page=${page}&_limit=10`);
      return response;
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(`Failed to get winners: ${error.message}`);
      }

      throw new Error('Something went wrong');
    }
  }

  public async getWinnersNew(page: number): Promise<WinnersData> {
    try {
      const options: RequestInit = {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      };
      const url = `/winners?_page=${page}&_limit=10`;
      const response = await fetch(`${this.baseUrl}${url}`, options);

      if (!response.ok) {
        const errorData: { message?: string } = await response.json();
        throw new Error(errorData.message || 'Something went wrong');
      }
      const total = Number(response.headers.get('X-Total-Count'));
      const winners: Winner[] = await response.json();
      const winnersData: WinnersData = {
        total,
        winners,
      };
      return winnersData;
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
      throw new Error('Something went wrong');
    }
  }

  public async getWinner(id: number): Promise<Winner> {
    try {
      const response = await this.request<Winner>(`/winners/${id}`);
      return response;
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(`Failed to get winner with id ${id}: ${error.message}`);
      }

      throw new Error('Something went wrong');
    }
  }

  public async createWinner(id: number, wins: number, time: number): Promise<Winner> {
    try {
      const response = await this.request<Winner>('/winners', 'POST', { id, wins, time });
      return response;
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(`Failed to create winner with id ${id}: ${error.message}`);
      }

      throw new Error('Something went wrong');
    }
  }

  public async updateWinner(id: number, wins: number, time: number): Promise<Winner> {
    try {
      const response = await this.request<Winner>(`/winners/${id}`, 'PUT', { wins, time });
      return response;
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(`Failed to update winner ${id}: ${error.message}`);
      }

      throw new Error('Something went wrong');
    }
  }

  public async removeWinner(id: number): Promise<void> {
    try {
      await this.request<void>(`/winners/${id}`, 'DELETE');
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(`Failed to delete winner ${id}: ${error.message}`);
      }

      throw new Error('Something went wrong');
    }
  }
}

export default ApiController;
