import { NoyonAxios } from "../global";

export const insertTopupReq = (body) => NoyonAxios.post(`/topup-req`, body);
