import axios from "axios";

export const api = axios.create({
  baseURL: "https://hdteste.azurewebsites.net/",
  // baseURL: "http://192.168.1.191:4001/",
});
