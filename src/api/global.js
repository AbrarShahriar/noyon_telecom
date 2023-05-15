import axios from "axios";

export const NoyonAxios = axios.create({
  // baseURL: "https://ill-plum-pants.cyclic.app",
  baseURL: "https://nest.enoy-topup.com/",
  // baseURL: "http://localhost:3000",
  timeout: 10000,
  withCredentials: true,
});
