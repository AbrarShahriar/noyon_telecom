import React from "react";
import { ACTION_TYPES } from "../../reducer";
import { useStateValue } from "../shared/StateProvider";
import { PageLoader } from "../shared/SuspenseWrapper";

const AuthProvider = ({ children }) => {
  // @ts-ignore
  const [{ loggedIn }, dispatch] = useStateValue();
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    setTimeout(() => {
      dispatch({
        type: ACTION_TYPES.SET_LOGGED_IN_STATE,
        payload: { loggedIn: false },
      });
      setLoading(false);
    }, 2000);
  }, []);

  if (loading) {
    return <PageLoader />;
  }
  return <>{children}</>;
};
export default AuthProvider;
