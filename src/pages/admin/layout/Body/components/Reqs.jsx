import React from "react";
import ReqCardNavigator from "./ReqCardNavigator";

const reqOptions = [
  {
    title: "Membership",
    path: "/admin/membership-requests",
    type: "membership",
    count: 12,
  },
  {
    title: "Offer Buy",
    path: "/admin/offer-buy-requests",
    type: "offer",
    count: 7,
  },
  {
    title: "Recharge",
    path: "/admin/recharge-requests",
    type: "recharge",
    count: 0,
  },
  {
    title: "Topup",
    path: "/admin/topup-requests",
    type: "topup",
    count: 15,
  },
];

const Reqs = () => {
  return (
    <div className="admin__reqs admin__card">
      <h3>Requests</h3>
      {reqOptions.map((reqOption) => (
        <ReqCardNavigator
          title={reqOption.title}
          type={reqOption.path}
          path={reqOption.path}
          count={reqOption.count}
        />
      ))}
    </div>
  );
};
export default Reqs;
