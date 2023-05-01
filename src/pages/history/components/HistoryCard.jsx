import React from "react";
import "./HistoryCard.scss";
import { FaMoneyBillWave } from "react-icons/fa";
import { TbCurrencyTaka } from "react-icons/tb";
import { formatLabel, parseDate } from "../../../uitls";

const parseHistorytype = (type) => {
  switch (type) {
    case "topup":
      return { type: "in", showDesc: false, showTransactionId: true };

    case "membership":
      return { type: "out", showDesc: false, showTransactionId: true };

    case "internet":
      return { type: "out", showDesc: true, showTransactionId: false };

    case "minute":
      return { type: "out", showDesc: true, showTransactionId: false };

    case "bundle":
      return { type: "out", showDesc: true, showTransactionId: false };

    case "recharge":
      return { type: "out", showDesc: false, showTransactionId: false };

    default:
      return { type: "", showDesc: false, showTransactionId: false };
  }
};
const HistoryCard = ({
  type = "p",
  className = "",
  amount = 0,
  date = "",
  transactionId,
  desc,
  historyStatus = "pending",
}) => {
  return (
    <div
      className={`history__card ${parseHistorytype(type).type} ${className}`}
    >
      <div className="left">
        <FaMoneyBillWave />
      </div>
      <div className="right">
        <div className="header">
          <span className="type">{formatLabel(type)}</span>
          <span className="date">{parseDate(date)}</span>
        </div>
        {desc && parseHistorytype(type).showDesc && (
          <p className="desc">{desc}</p>
        )}
        {historyStatus && (
          <p className={`status ${historyStatus}`}>
            {formatLabel(historyStatus)}
          </p>
        )}
        <div className="content">
          <span className="transaction-id">
            {transactionId && parseHistorytype(type).showTransactionId
              ? `#${"dfaetetae"}`
              : "N/A"}
          </span>
          <div className="amount">
            <TbCurrencyTaka strokeWidth={3} />
            <span>{amount}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HistoryCard;
