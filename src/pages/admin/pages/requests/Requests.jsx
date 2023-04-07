import React from "react";
import "./Requests.scss";
import AppBar from "../../../shared/AppBar";
import Req from "./components/Req";

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

const reqs = {
  offer: [
    {
      title: "wetwe tre t wr ytry rywryw!!",
      amount: 37,
      paymentPhone: "01841210657",
      transactionId: "ewtretet",
      paymentMethod: "bkash",
      accountPhone: "01887764008",
    },
    {
      title: "wetwe er ytry rywryw!!",
      amount: 78,
      paymentPhone: "01841210657",
      transactionId: "ewtretet",
      paymentMethod: "bkash",
      accountPhone: "01887764008",
    },
    {
      title: "wetwe ewerwr ytrywryw!!",
      amount: 54,
      paymentPhone: "01841210657",
      transactionId: "ewtretet",
      paymentMethod: "bkash",
      accountPhone: "01887764008",
    },
    {
      title: "wetywryw!!",
      amount: 98,
      paymentPhone: "01841210657",
      transactionId: "ewtretet",
      paymentMethod: "bkash",
      accountPhone: "01887764008",
    },
  ],
  recharge: [
    {
      amount: 100,
      paymentPhone: "01841210657",
      transactionId: "ewtretet",
      paymentMethod: "bkash",
      accountPhone: "01887764008",
    },
    {
      amount: 50,
      paymentPhone: "01841210657",
      transactionId: "ewtretet",
      paymentMethod: "bkash",
      accountPhone: "01887764008",
    },
    {
      amount: 300,
      paymentPhone: "01841210657",
      transactionId: "ewtretet",
      paymentMethod: "bkash",
      accountPhone: "01887764008",
    },
  ],
  membership: [
    {
      amount: 150,
      paymentPhone: "01841210657",
      transactionId: "ewtretet",
      paymentMethod: "bkash",
      accountPhone: "01887764008",
    },
    {
      amount: 150,
      paymentPhone: "01841210657",
      transactionId: "ewtretet",
      paymentMethod: "bkash",
      accountPhone: "01887764008",
    },
    {
      amount: 150,
      paymentPhone: "01841210657",
      transactionId: "ewtretet",
      paymentMethod: "bkash",
      accountPhone: "01887764008",
    },
    {
      amount: 150,
      paymentPhone: "01841210657",
      transactionId: "ewtretet",
      paymentMethod: "bkash",
      accountPhone: "01887764008",
    },
  ],
  topup: [
    {
      amount: 200,
      paymentPhone: "01841210657",
      transactionId: "ewtretet",
      paymentMethod: "bkash",
      accountPhone: "01887764008",
    },
    {
      amount: 200,
      paymentPhone: "01841210657",
      transactionId: "ewtretet",
      paymentMethod: "bkash",
      accountPhone: "01887764008",
    },
    {
      amount: 200,
      paymentPhone: "01841210657",
      transactionId: "ewtretet",
      paymentMethod: "bkash",
      accountPhone: "01887764008",
    },
    {
      amount: 200,
      paymentPhone: "01841210657",
      transactionId: "ewtretet",
      paymentMethod: "bkash",
      accountPhone: "01887764008",
    },
  ],
};

const Requests = ({ type }) => {
  return (
    <div className="admin__requests">
      <AppBar title={parseAppBarTitle(type)} />

      <div className="admin__requests__container">
        {reqs[type].map((req, i) => (
          <Req
            type={type}
            accountPhone={req.accountPhone}
            paymentMethod={req.paymentMethod}
            paymentPhone={req.paymentPhone}
            amount={req.amount}
            transactionId={req.transactionId}
            title={req.title || ""}
          />
        ))}
      </div>
    </div>
  );
};
export default Requests;
