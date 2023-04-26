import { NoyonAxios } from "../global";

export const getOfferDetails = (offerId) =>
  NoyonAxios.get(`/offer/single/${offerId}`);
