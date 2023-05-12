import React from "react";
import "./Requests.scss";
import AppBar from "../../../shared/AppBar";
import Req from "./components/Req";
import { useQuery } from "react-query";
import { getReqsBasedOnType } from "../../../../api/queries/admin";
import { PageLoader } from "../../../shared/SuspenseWrapper";
import Nothing from "../../../shared/Nothing";

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
    case "withdraw":
      return "Withdraw Requests";

    default:
      break;
  }
};

const Requests = ({ type, isModerator = false }) => {
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
        {res?.data.length >= 1 ? (
          res?.data.map((req, i) =>
            isModerator ? (
              <Req
                simcard={req.simcard}
                moderator={req.moderator}
                sendTo={req.sendTo}
                isModerator={isModerator}
                key={i}
                type={type}
                isPremium={
                  req.hasOwnProperty("isPremium") ? req.isPremium : "N/A"
                }
                actionAt={req.actionAt}
                id={req.id}
                phone={req.phone}
                paymentMethod={req.paymentMethod}
                paymentPhone={req.paymentPhone}
                amount={req.amount || req.adminPrice}
                transactionId={req.transactionId}
                title={req.title}
              />
            ) : (
              <Req
                moderator={req.moderator}
                sendTo={req.sendTo}
                simcard={req.simcard}
                key={i}
                type={type}
                isPremium={
                  req.hasOwnProperty("isPremium") ? req.isPremium : "N/A"
                }
                actionAt={req.actionAt}
                id={req.id}
                phone={req.phone}
                paymentMethod={req.paymentMethod}
                paymentPhone={req.paymentPhone}
                amount={req.amount}
                regularPrice={req.regularPrice}
                discountPrice={req.discountPrice}
                adminPrice={req.adminPrice}
                transactionId={req.transactionId}
                title={req.title}
              />
            )
          )
        ) : (
          <Nothing title="No Pending Request" />
        )}
      </div>
    </div>
  );
};
export default Requests;
