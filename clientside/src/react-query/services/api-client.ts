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
    return axiosInstance.post<R>(this.endpoint, data).then((res) => res.data);
  };

  getChatPartners = () => {
    return axiosInstance.get<T>(this.endpoint).then((res) => res.data);
  };

  logout = () => {
    return axiosInstance.get(this.endpoint).then((res) => res.data);
  };
}

export default ClientAPI;
