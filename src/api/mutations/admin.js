import { getAuthorizationHeader } from "../../uitls";
import { NoyonAxios } from "../global";

export const createOffer = (body) =>
  NoyonAxios.post("/offer", body, {
    headers: getAuthorizationHeader(),
  });
export const createRecharge = (body) =>
  NoyonAxios.post("/recharge", body, {
    headers: getAuthorizationHeader(),
  });

export const createModerator = (body) =>
  NoyonAxios.post("/moderator", body, {
    headers: getAuthorizationHeader(),
  });
export const deleteModerator = (moderatorId) =>
  NoyonAxios.delete(`/moderator/${moderatorId}`, {
    headers: getAuthorizationHeader(),
  });

export const deleteUser = (userId) =>
  NoyonAxios.delete(`/user/${userId}`, {
    headers: getAuthorizationHeader(),
  });

export const updateTopupReq = (body) =>
  NoyonAxios.patch(`/topup-req`, body, {
    headers: getAuthorizationHeader(),
  });
export const updateMembershipReq = (body) =>
  NoyonAxios.patch(`/membership-buy-req`, body, {
    headers: getAuthorizationHeader(),
  });
export const updateRechargeReq = (body) =>
  NoyonAxios.patch(`/recharge-buy-req`, body, {
    headers: getAuthorizationHeader(),
  });
export const updateOfferReq = (body) =>
  NoyonAxios.patch(`/offer-buy-req`, body, {
    headers: getAuthorizationHeader(),
  });
export const updateWithdrawReq = (body) =>
  NoyonAxios.patch(`/withdraw-req`, body, {
    headers: getAuthorizationHeader(),
  });

export const updateAdminSettings = (body) =>
  NoyonAxios.patch(`/admin-settings`, body, {
    headers: getAuthorizationHeader(),
  });

export const rejectOfferBuyReq = (body) =>
  NoyonAxios.post(`/offer-buy-req/reject`, body, {
    headers: getAuthorizationHeader(),
  });
export const rejectRechargeBuyReq = (body) =>
  NoyonAxios.post(`/recharge-buy-req/reject`, body, {
    headers: getAuthorizationHeader(),
  });
export const rejectMembershipBuyReq = (body) =>
  NoyonAxios.post(`/membership-buy-req/reject`, body, {
    headers: getAuthorizationHeader(),
  });
export const rejectTopupAddReq = (body) =>
  NoyonAxios.post(`/topup-req/reject`, body, {
    headers: getAuthorizationHeader(),
  });

export const createNoti = (body) =>
  NoyonAxios.post(`/notification`, body, {
    headers: getAuthorizationHeader(),
  });
export const deleteNoti = (id) =>
  NoyonAxios.delete(`/notification/${id}`, {
    headers: getAuthorizationHeader(),
  });
export const udpateOffer = (body) =>
  NoyonAxios.patch(`/offer/update`, body, {
    headers: getAuthorizationHeader(),
  });
