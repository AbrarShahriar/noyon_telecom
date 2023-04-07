import React from "react";
import "./Req.scss";
import { TbCurrencyTaka } from "react-icons/tb";

const Req = ({
  type,
  title,
  amount,
  accountPhone,
  paymentPhone,
  transactionId,
  paymentMethod,
}) => {
  return (
    <div className="admin__requests__container__req">
      <div className="content">
        {type == "offer" && title && <p className="title">{title}</p>}

        <p className="amount">
          <TbCurrencyTaka size={18} strokeWidth={3} />
          {amount}
        </p>

        <div className="data account-phone">
          <p className="label">Account Phone: </p>
          <p className="value">{accountPhone}</p>
        </div>

        <hr />

        <div className="data payment-phone">
          <p className="label">Payment From: </p>
          <p className="value">{paymentPhone}</p>
        </div>
        <div className="data payment-method">
          <p className="label">Payment Method: </p>
          <p className="value">{paymentMethod}</p>
        </div>
        <div className="data payment-method">
          <p className="label">TranscationId: </p>
          <p className="value">{transactionId}</p>
        </div>
      </div>

      <div className="actions">
        <button className="btn__approve">Approve</button>
        <button className="btn__reject">Reject</button>
      </div>
    </div>
  );
};
export default Req;
