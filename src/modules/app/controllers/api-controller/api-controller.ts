const BASE_URL = 'http://localhost:3000';

interface Car {
  id: number;
  name: string;
  color: string;
}

interface Winner {
  id: number;
  carId: number;
  wins: number;
  time: number;
}

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

  public async deleteCar(id: number): Promise<void> {
    try {
      await this.request<void>(`/garage/${id}`, 'DELETE');
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(`Failed to delete car: ${error.message}`);
      }

      throw new Error('Something went wrong');
    }
  }

  public async startEngine(id: number): Promise<Car> {
    try {
      const response = await this.request<Car>(`/engine?id=${id}&status=started`);
      return response;
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(`Failed to start engine: ${error.message}`);
      }

      throw new Error('Something went wrong');
    }
  }

  public async stopEngine(id: number): Promise<Car> {
    try {
      const response = await this.request<Car>(`/engine?id=${id}&status=stopped`);
      return response;
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(`Failed to stop engine: ${error.message}`);
      }

      throw new Error('Something went wrong');
    }
  }

  public async startRace(): Promise<void> {
    try {
      await this.request<void>('engine', 'POST', { status: 'drive' });
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
}

export default ApiController;
