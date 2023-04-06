export const initState = {
  loggedIn: false,
};

export const ACTION_TYPES = {
  SET_LOGGED_IN_STATE: "setLoggedInState",
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

    default:
      return state;
  }
};
