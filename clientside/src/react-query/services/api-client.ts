import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http://localhost:3000/api",
});

class ClientAPI<T> {
  endpoint: string;

  constructor(endpoint: string) {
    this.endpoint = endpoint;
  }

  login = (data: T) => {
    //post request
    return axiosInstance.post<T>(this.endpoint, data).then((res) => res.data);
  };
}

export default ClientAPI;
