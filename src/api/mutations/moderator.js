import { getAuthorizationHeader } from "../../uitls";
import { NoyonAxios } from "../global";

export const createWithdraw = (body) =>
  NoyonAxios.post(`/withdraw-req`, body, { headers: getAuthorizationHeader() });
