import axios, { AxiosResponse } from "axios";
import { ApiResponse } from "./ApiResponse";

export class ApiRequest {
  static get(url: string) {
    return axios.get(url);
  }

  static post<T>(url: string, body: T) {
    return axios.post(url, body);
  }

  static patch<T>(url: string, body: T) {
    return axios.patch(url, body);
  }

  static del(url: string) {
    return axios.delete(url);
  }

  static getData<T>(res: AxiosResponse): ApiResponse<T> {
    return res.data;
  }
}
