import axios from 'axios';

export class RequestHandler {
  async post<T>(url: string, data: any): Promise<T> {
    const result = await axios.post<T>(
      `${this.prepareBaseUrl()}/${url}`,
      data,
      {
        headers: {
          Authorization: `Bearer ${this.accessToken}`,
        },
      },
    );

    return result.data;
  }

  async get<T>(url: string): Promise<T> {
    const result = await axios.get<T>(`${this.prepareBaseUrl()}/${url}`, {
      headers: {
        Authorization: `Bearer ${this.accessToken}`,
      },
    });

    return result.data;
  }

  private prepareBaseUrl() {
    return process.env.API_URL;
  }

  constructor(private accessToken: string) {}
}
