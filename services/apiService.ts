import axios from "axios";

const API_BASE_URL = "http://192.168.100.102:3000";
// const API_BASE_URL = "https://greatheartedly-hydrotropic-zain.ngrok-free.dev";

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

export default apiClient;
