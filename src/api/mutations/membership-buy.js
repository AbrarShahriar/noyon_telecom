import { NoyonAxios } from "../global";

export const membershipReq = (body) =>
  NoyonAxios.post("/membership-buy-req", body);
