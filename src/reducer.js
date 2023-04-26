export const initState = {
  loggedIn: false,
  user: null,
  membershipFee: 150,
  topupFee: 2.5,
  noticeText: "iejtgi etj wiet ew twie tjwje ttoejt ejjetjqwt",
};

export const ACTION_TYPES = {
  SET_LOGGED_IN_STATE: "setLoggedInState",
  SET_USER: "setUser",
  UPDATE_USER: "updateUser",
  UPDATE_MEMBERSHIPFEE: "updateMembershipFee",
  UPDATE_TOPUPFEE: "updateTopupFee",
  UPDATE_NOITCETEXT: "updateNoticeText",
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

    default:
      return state;
  }
};
