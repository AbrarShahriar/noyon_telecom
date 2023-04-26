import axios from "axios";

export const NoyonAxios = axios.create({
  baseURL: "https://ill-plum-pants.cyclic.app",
  timeout: 10000,
  withCredentials: true,
});

export const updateBalance = (body) =>
  NoyonAxios.patch("/user/update/balance", body);
