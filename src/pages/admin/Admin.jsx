import React from "react";
import "./Admin.scss";

import AppBar from "../shared/AppBar";
import AdminBody from "./layout/Body/AdminBody";
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

const Admin = () => {
  const [adminLoggedIn, setadminLoggedIn] = React.useState(
    Boolean(localStorage.getItem("adminLoggedIn"))
  );

  React.useEffect(() => {}, []);

  return (
    <>
      {adminLoggedIn ? (
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
