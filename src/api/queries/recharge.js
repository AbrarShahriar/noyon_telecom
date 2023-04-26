import { NoyonAxios } from "../global";
export const getAllRecharge = () => NoyonAxios.get("/recharge");
