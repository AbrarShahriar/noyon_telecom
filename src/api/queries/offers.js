import { NoyonAxios } from "../global";

export const getOffersBasedOnFilter = (query) =>
  NoyonAxios.get(`/offer/all/query?${query}`);
export const getVipOffersBasedOnFilter = (query) =>
  NoyonAxios.get(`/offer/all/vip/query?${query}`);
