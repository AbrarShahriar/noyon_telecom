import React, { useState } from "react";
import { ACTION_TYPES } from "../../reducer";
import { useStateValue } from "../shared/StateProvider";
import { PageLoader } from "../shared/SuspenseWrapper";
import { useQuery } from "react-query";
import { isAuthenticated } from "../../api/auth/isAuthenticated";
import { getAdminSettings } from "../../api/queries/admin";

const AuthProvider = ({ children }) => {
  // @ts-ignore
  const [{}, dispatch] = useStateValue();

  const { isLoading: isAuthLoading } = useQuery(
    ["auth", "isAuthenticated"],
    isAuthenticated,
    {
      staleTime: 1000 * 60 * 1,
      retry: false,
      onSuccess: (res) => {
        dispatch({
          type: ACTION_TYPES.SET_LOGGED_IN_STATE,
          payload: { loggedIn: res?.data.isAuthenticated },
        });
        dispatch({
          type: ACTION_TYPES.SET_USER,
          payload: { user: res?.data.user },
        });
      },
      onError: (err) => {
        dispatch({
          type: ACTION_TYPES.SET_LOGGED_IN_STATE,
          payload: { loggedIn: false },
        });
        dispatch({
          type: ACTION_TYPES.SET_USER,
          payload: { user: null },
        });
      },
    }
  );

  const { isLoading: isSettingsLoading } = useQuery(
    ["admin", "settings", "list"],
    getAdminSettings,
    {
      staleTime: 1000 * 60 * 2,
      onSuccess: (res) => {
        dispatch({
          type: ACTION_TYPES.UPDATE_MEMBERSHIPFEE,
          payload: { membershipFee: res?.data.membershipFee },
        });
        dispatch({
          type: ACTION_TYPES.UPDATE_TOPUPFEE,
          payload: { topupFee: res?.data.topupFee },
        });
        dispatch({
          type: ACTION_TYPES.UPDATE_NOITCETEXT,
          payload: { noticeText: res?.data.noticeText },
        });
        dispatch({
          type: ACTION_TYPES.UPDATE_PAYMENT_PHONE,
          payload: { adminPaymentPhone: res?.data.adminPaymentPhone },
        });
        console.log(res.data.appLink);
        dispatch({
          type: ACTION_TYPES.UPDATE_APP_LINK,
          payload: { appLink: res?.data.appLink },
        });
      },
    }
  );

  if (isAuthLoading || isSettingsLoading) {
    return <PageLoader />;
  }
  return <>{children}</>;
};
export default AuthProvider;
