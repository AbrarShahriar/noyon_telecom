export const initState = {
  loggedIn: false,
  user: null,
  membershipFee: 150,
  topupFee: 2.5,
  noticeText: "Notice Text",
  adminPaymentPhone: "01887764008",
  moderatorBalance: 0,
};

export const ACTION_TYPES = {
  SET_LOGGED_IN_STATE: "setLoggedInState",
  SET_USER: "setUser",
  UPDATE_USER: "updateUser",
  UPDATE_MEMBERSHIPFEE: "updateMembershipFee",
  UPDATE_TOPUPFEE: "updateTopupFee",
  UPDATE_NOITCETEXT: "updateNoticeText",
  UPDATE_PAYMENT_PHONE: "updatePaymentPhone",
  UPDATE_MODERATOR_BALANCE: "updateModeratorBalance",
};

export const reducer = (state = initState, action) => {
  console.log(action);
  let payload = action.payload;

  switch (action.type) {
    case ACTION_TYPES.SET_LOGGED_IN_STATE:
      return {
        ...state,
        loggedIn: payload.loggedIn,
      };

    case ACTION_TYPES.SET_USER:
      return {
        ...state,
        user: payload.user,
      };

    case ACTION_TYPES.UPDATE_USER:
      return {
        ...state,
        // @ts-ignore
        user: { ...state.user, ...payload },
      };

    case ACTION_TYPES.UPDATE_MEMBERSHIPFEE:
      return {
        ...state,
        membershipFee: payload.membershipFee,
      };

    case ACTION_TYPES.UPDATE_TOPUPFEE:
      return {
        ...state,
        topupFee: payload.topupFee,
      };

    case ACTION_TYPES.UPDATE_NOITCETEXT:
      return {
        ...state,
        noticeText: payload.noticeText,
      };

    case ACTION_TYPES.UPDATE_PAYMENT_PHONE:
      return {
        ...state,
        adminPaymentPhone: payload.adminPaymentPhone,
      };

    case ACTION_TYPES.UPDATE_MODERATOR_BALANCE:
      return {
        ...state,
        moderatorBalance: payload.moderatorBalance,
      };

    default:
      return state;
  }
};
