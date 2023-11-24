import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "/api",
});

class ClientAPI<T, R> {
  endpoint: string;

  constructor(endpoint: string) {
    this.endpoint = endpoint;
  }

  login = (data: T) => {
    //post request
    return axiosInstance.post<R>(this.endpoint, data).then((res) => res.data);
  };
}

export default ClientAPI;
