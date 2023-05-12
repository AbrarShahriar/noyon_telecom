import React, { useEffect, useState } from "react";
import "./Admin.scss";

import AppBar from "../shared/AppBar";
import AdminBody from "./layout/Body/AdminBody";
import { getAdminKey } from "../../uitls";
import OneSignal from "react-onesignal";
import { useNavigate } from "react-router-dom";

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
  const [adminKeyAvailable, setadminKeyAvailable] = useState(false);
  const navigate = useNavigate();

  React.useEffect(() => {
    if (getAdminKey()) {
      setadminKeyAvailable(true);
    }
  }, []);

  useEffect(() => {
    OneSignal.setDefaultNotificationUrl("http://localhost:5173/admin");
    OneSignal.init({
      // @ts-ignore
      appId: "35e8edb2-4a6f-469a-8824-9d2b9f09813b",
      autoRegister: true,
      autoResubscribe: true,
    }).then(() => {
      OneSignal.showSlidedownPrompt().then(async () => {
        if (page == "admin") {
          console.log("started tagging admin");
          await OneSignal.sendTag("role", "admin");
          console.log("tagged admin");
        }
      });
    });
  });

  return (
    <>
      {adminKeyAvailable ? (
        <div className="admin">
          <AppBar showBackButton={false} title="Admin Panel" page="admin" />
          <AdminBody />
        </div>
      ) : (
        <h2 onClick={() => navigate("/admin-login")}>
          Login To View This Page
        </h2>
      )}
    </>
  );
};
export default Admin;
