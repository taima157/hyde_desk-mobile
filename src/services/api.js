import axios from "axios";

export const api = axios.create({
  baseURL: "https://hdteste.azurewebsites.net/",
  // baseURL: "http://192.168.15.10:4001/",
});
