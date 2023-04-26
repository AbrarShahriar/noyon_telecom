import { NoyonAxios } from "../global";

export const getAllVipOffers = () => NoyonAxios.get("/offer/all/vip");
