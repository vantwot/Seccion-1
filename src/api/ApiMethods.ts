import axios from "axios";

class ApiMethods {
  public get(url: string, config = {}) {
    return axios.get(url, config);
  }

  public post(url: string, data: any, config = {}) {
    return axios.post(url, data, config);
  }

  public put(url: string, data: any, config = {}) {
    return axios.put(url, data, config);
  }

  public delete(url: string, config = {}) {
    return axios.delete(url, config);
  }
}

export default ApiMethods;
