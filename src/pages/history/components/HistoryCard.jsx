import React from "react";
import "./HistoryCard.scss";
import { FaMoneyBillWave } from "react-icons/fa";
import { TbCurrencyTaka } from "react-icons/tb";
import { formatLabel } from "../../../uitls";
import dayjs from "dayjs";

const parseHistorytype = (type) => {
  switch (type) {
    case "topup":
      return "in";

    case "internet":
      return "out";

    case "minute":
      return "out";

    case "bundle":
      return "out";

    case "recharge":
      return "out";

    default:
      return "";
  }
};
const HistoryCard = ({
  type = "p",
  className = "",
  amount = 0,
  date = "2020",
}) => {
  return (
    <div className={`history__card ${parseHistorytype(type)} ${className}`}>
      <div className="left">
        <FaMoneyBillWave />
      </div>
      <div className="right">
        <div className="header">
          <span className="type">{formatLabel(type)}</span>
          <span className="date">{dayjs(date).format("DD/MM/YY")}</span>
        </div>
        {type != "topup" && (
          <p className="desc">
            Lorem ipsum dolor sit amet consectetur adipisicing elit
          </p>
        )}
        <div className="content">
          <span className="transaction-id">#{"uytgwydt665"}</span>
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
