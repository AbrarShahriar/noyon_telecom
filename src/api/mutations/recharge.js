import { NoyonAxios } from "../global";

export const rechargeReq = (body) => NoyonAxios.post("/recharge-buy-req", body);
