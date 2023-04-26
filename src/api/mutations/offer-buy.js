import { NoyonAxios } from "../global";

export const buyOffer = (body) => NoyonAxios.post(`/offer-buy-req`, body);
