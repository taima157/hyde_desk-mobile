import axios from "axios";

export const api = axios.create({
  baseURL: "http://10.105.72.142:4001",
});
