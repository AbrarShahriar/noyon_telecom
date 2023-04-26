import React from "react";
import "./Requests.scss";
import AppBar from "../../../shared/AppBar";
import Req from "./components/Req";
import { useQuery } from "react-query";
import { getReqsBasedOnType } from "../../../../api/queries/admin";
import { PageLoader } from "../../../shared/SuspenseWrapper";

const parseAppBarTitle = (type) => {
  switch (type) {
    case "membership":
      return "Membership Requests";
    case "offer":
      return "Offer Buy Requests";
    case "recharge":
      return "Recharge Requests";
    case "topup":
      return "Topup Requests";

    default:
      break;
  }
};

const Requests = ({ type }) => {
  const { isLoading, data: res } = useQuery(
    ["requests", type],
    () => getReqsBasedOnType(type),
    { staleTime: 1000 * 60 * 2 }
  );

  if (isLoading) {
    return <PageLoader />;
  }

  return (
    <div className="admin__requests">
      <AppBar title={parseAppBarTitle(type)} />

      <div className="admin__requests__container">
        {res?.data.map((req, i) => (
          <Req
            key={i}
            type={type}
            id={req.id}
            phone={req.phone}
            paymentMethod={req.paymentMethod}
            paymentPhone={req.paymentPhone}
            amount={req.amount}
            transactionId={req.transactionId}
            title={req.title}
          />
        ))}
      </div>
    </div>
  );
};
export default Requests;
