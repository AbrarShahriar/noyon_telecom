import React, { useEffect, useState } from "react";
import "./Admin.scss";

import AppBar from "../shared/AppBar";
import AdminBody from "./layout/Body/AdminBody";
import { getAdminKey } from "../../uitls";
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
// async function runOneSignal(setInitialized) {
//   await OneSignal.init({
//     appId: "5461ed21-1a14-4f39-8498-5fec641998c1",
//     notifyButton: {
//       enable: true,
//     },
//     allowLocalhostAsSecureOrigin: true,
//   });
//   OneSignal.showSlidedownPrompt();

//   setInitialized(true);
// }

const Admin = ({ page }) => {
  const [adminKeyAvailable, setadminKeyAvailable] = useState(false);

  React.useEffect(() => {
    if (getAdminKey()) {
      setadminKeyAvailable(true);
    }
  }, []);

  useEffect(() => {
    OneSignal.init({
      // @ts-ignore
      appId: "df497253-8588-4771-8e59-c6d58d3d8fe2",
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
        <h2>Login To View This Page</h2>
      )}
    </>
  );
};
export default Admin;
