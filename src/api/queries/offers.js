import { NoyonAxios } from "../global";

export const getOffersBasedOnFilter = (query) =>
  NoyonAxios.get(`/offer/all/query?${query}`);
export const getVipOffersBasedOnFilter = (query) =>
  NoyonAxios.get(`/offer/all/vip/query?${query}`);
export const getAllNonVipOffers = () => NoyonAxios.get(`/offer/all/non-vip`);
export const getAllVipOffers = () => NoyonAxios.get(`/offer/all/vip`);
