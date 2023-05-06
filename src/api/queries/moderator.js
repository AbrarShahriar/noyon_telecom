import { getAuthorizationHeader } from "../../uitls";
import { getModeratorId } from "../../uitls";
import { NoyonAxios } from "../global";

export const getTotalModeratorHistory = () =>
  NoyonAxios.get(`/moderator/history?moderatorId=${getModeratorId()}`, {
    headers: getAuthorizationHeader(),
  });
export const getTodayModeratorHistory = (date) =>
  NoyonAxios.get(
    `/moderator/history?moderatorId=${getModeratorId()}&date=${date}`,
    { headers: getAuthorizationHeader() }
  );
export const getModeratorInAndOut = () =>
  NoyonAxios.get(`/moderator/total-in-out/${getModeratorId()}`, {
    headers: getAuthorizationHeader(),
  });
export const getAllModeratorInAndOut = () =>
  NoyonAxios.get(`/moderator/all/in-out`, {
    headers: getAuthorizationHeader(),
  });
export const getModeratorWithdrawHistory = () =>
  NoyonAxios.get(`/withdraw-req/all/${getModeratorId()}`, {
    headers: getAuthorizationHeader(),
  });
export const getAllModeratorWithdrawHistory = () =>
  NoyonAxios.get(`/withdraw-req/all`, {
    headers: getAuthorizationHeader(),
  });
