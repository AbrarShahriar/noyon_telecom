import { getAuthorizationHeader } from "../../uitls";
import { NoyonAxios } from "../global";

export const getAllModerators = () =>
  NoyonAxios.get("/moderator/all", {
    headers: getAuthorizationHeader(),
  });
export const getAdminSettings = () =>
  NoyonAxios.get("/admin-settings/all", {
    headers: getAuthorizationHeader(),
  });
export const getReqCount = () =>
  NoyonAxios.get("/admin/count", {
    headers: getAuthorizationHeader(),
  });
export const getAllUsers = () =>
  NoyonAxios.get("/user/all", {
    headers: getAuthorizationHeader(),
  });
export const getReqsBasedOnType = (type) =>
  NoyonAxios.get(`/admin/req/${type}`, {
    headers: getAuthorizationHeader(),
  });
export const getTotalInOut = () =>
  NoyonAxios.get(`/admin/total-in-out`, {
    headers: getAuthorizationHeader(),
  });
export const getTodayTransactionHistory = (query) =>
  NoyonAxios.get(`/admin/history/query${query}`, {
    headers: getAuthorizationHeader(),
  });
export const getAllTransactionHistory = (query) =>
  NoyonAxios.get(`/admin/history/all`, {
    headers: getAuthorizationHeader(),
  });
