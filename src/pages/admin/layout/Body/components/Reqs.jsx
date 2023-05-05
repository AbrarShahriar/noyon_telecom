// @ts-ignore
import React, { useState } from "react";
import ReqCardNavigator from "./ReqCardNavigator";
import { useQuery } from "react-query";
import { getReqCount } from "../../../../../api/queries/admin";

const Reqs = ({ isModerator }) => {
  const [data, setdata] = useState([]);
  const { isLoading } = useQuery(["admin", "count"], getReqCount, {
    retry: false,
    onSuccess: (res) => {
      let counts = res.data;

      let reqOptions = [];

      if (isModerator) {
        reqOptions = [
          {
            title: "Offer Buy",
            path: "/offer-buy-requests",
            type: "offer",
            count: counts.offerReqCount,
          },
          {
            title: "Recharge",
            path: "/recharge-requests",
            type: "recharge",
            count: counts.rechargeReqCount,
          },
        ];
      } else {
        reqOptions = [
          {
            title: "Membership",
            path: "/membership-requests",
            type: "membership",
            count: counts.membershipReqCount,
          },
          {
            title: "Offer Buy",
            path: "/offer-buy-requests",
            type: "offer",
            count: counts.offerReqCount,
          },
          {
            title: "Recharge",
            path: "/recharge-requests",
            type: "recharge",
            count: counts.rechargeReqCount,
          },
          {
            title: "Topup",
            path: "/topup-requests",
            type: "topup",
            count: counts.topupReqCount,
          },
          {
            title: "Withdraw",
            path: "/withdraw-requests",
            type: "withdraw",
            count: counts.withdrawReqCount,
          },
        ];
      }

      // @ts-ignore
      setdata(reqOptions);
    },
  });

  if (isLoading) {
    return <>Loading...</>;
  }

  return (
    <div className="admin__reqs admin__card">
      <h3>Requests</h3>
      {data.map((reqOption) => (
        <ReqCardNavigator
          isModerator={isModerator}
          // @ts-ignore
          title={reqOption.title}
          // @ts-ignore
          type={reqOption.path}
          // @ts-ignore
          path={reqOption.path}
          // @ts-ignore
          count={reqOption.count}
        />
      ))}
    </div>
  );
};
export default Reqs;
