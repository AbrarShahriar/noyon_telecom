import React, { useEffect } from "react";
import "../admin/Admin.scss";

import AppBar from "../shared/AppBar";
import AdminBody from "../admin/layout/Body/AdminBody";
import { getModeratorKey } from "../../uitls";
import OneSignal from "react-onesignal";

/*
  > admin
    > admin stats
      > total import export (admin + moderator)

    > reqs
      > membership req 
      > offer buy req
      > recharge req
      > topup req
      
    > actions
      > moderator add
      > moderator remove

    > users
      > user list + remove

    > settings
      > topup percentage
      > subscription fee
      > recharge cashback rate
      
    > history
      > which moderator accepted which req

  > moderator
    > [optional] stats
      > total import export

    > reqs
      > offer buy req
      > recharge req
      > topup req

    > history
      > this moderator accepted which reqs
*/

const Admin = ({ page }) => {
  const [moderatorLoggedIn, setmoderatorLoggedIn] = React.useState(
    Boolean(localStorage.getItem("adminLoggedIn"))
  );

  useEffect(() => {
    OneSignal.init({
      // @ts-ignore
      appId: "df497253-8588-4771-8e59-c6d58d3d8fe2",
      autoRegister: true,
      autoResubscribe: true,
    }).then(() => {
      OneSignal.showSlidedownPrompt().then(async () => {
        if (page == "moderator") {
          console.log("started tagging moderator");
          await OneSignal.sendTag("role", "moderator");
          console.log("tagged moderator");
        }
      });
    });
  });

  React.useEffect(() => {
    if (getModeratorKey()) {
      setmoderatorLoggedIn(true);
    }
  }, []);

  return (
    <>
      {moderatorLoggedIn ? (
        <div className="moderator">
          <AppBar
            showBackButton={false}
            title="Moderator Panel"
            page="moderator"
          />
          <AdminBody isModerator />
        </div>
      ) : (
        <h2>Login To View This Page</h2>
      )}
    </>
  );
};
export default Admin;
