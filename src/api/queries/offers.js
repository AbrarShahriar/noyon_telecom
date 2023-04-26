import { NoyonAxios } from "../global";

export const getOffersBasedOnFilter = (query) =>
  NoyonAxios.get(`/offer/all/query?${query}`);
