import { NoyonAxios } from "../global";

export const getTotalHistory = (phone) =>
  NoyonAxios(`/user-history/total/${phone}`);
export const getMonthlyHistory = (date) =>
  NoyonAxios.get(`/user-history/query?date=${date}`);
