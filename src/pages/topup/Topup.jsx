import React from "react";
import AppBar from "../shared/AppBar";
import "./Topup.scss";

// @ts-ignore
import bkash from "../../assets/images/bkash.png";
// @ts-ignore
import nagad from "../../assets/images/nagad.png";
import { AiOutlineInfoCircle } from "react-icons/ai";
import { formatLabel } from "../../uitls";
import { BsArrowRight } from "react-icons/bs";
import { IMaskInput } from "react-imask";
import { useParams } from "react-router-dom";
import { TbCurrencyTaka } from "react-icons/tb";
import { MdDateRange } from "react-icons/md";

const paymentMethods = [
  {
    label: "nagad",
    imgSrc: nagad,
  },
  {
    label: "bkash",
    imgSrc: bkash,
  },
];
const charge = 2.5;

const offer = {
  offerId: "wrgwrytry",
  title: "1GB + 500MB Free Limited Time!",
  amount: 37,
  expiry: "3 Day",
};

const recharge = {
  offerId: "wrgwrytry",
  title: "Recharge",
  amount: 37,
};

const validateButton = (transactionId, amount, phone, paymentMethod) => {
  if (
    transactionId == "" ||
    amount == "" ||
    phone == "" ||
    paymentMethod == ""
  ) {
    return "--disabled";
  }
};

const Topup = ({ type = "topup", title = "" }) => {
  const [paymentMethod, setpaymentMethod] = React.useState("");

  const [phone, setphone] = React.useState("");
  const [amount, setamount] = React.useState("");
  const [transactionId, settransactionId] = React.useState("");

  const params = useParams();

  React.useEffect(() => {
    console.log(params);

    setamount(`${offer.amount}`);
  }, [params.offerId]);

  const handlePaymentMethodClick = (label) => setpaymentMethod(label);

  const handleSubmitClick = () => console.log({ phone, transactionId, amount });

  return (
    <div className={`topup ${type != "topup" && type}`}>
      <AppBar title={title} />

      <div className="container">
        {type == "offer" && (
          <div className="offer__data">
            <p className="offer__title">{offer.title}</p>

            <div className="expiry__amount">
              <p className="offer__expiry">
                <MdDateRange size={16} />
                {offer.expiry}
              </p>
              <p className="offer__amount">
                <TbCurrencyTaka size={18} strokeWidth={3} />
                {offer.amount}
              </p>
            </div>
          </div>
        )}

        <div className="payment__method">
          <p className="payment__method__title">Select Payment Method</p>
          <div className="methods">
            {paymentMethods.map((method) => (
              <div
                key={method.label}
                className={`method ${method.label} ${
                  paymentMethod == method.label && "--selected"
                }`}
                onClick={() => handlePaymentMethodClick(method.label)}
              >
                <div className={`bg ${method.label}`}>
                  <img src={method.imgSrc} alt={method.label} />
                </div>
                <span className="label">{formatLabel(method.label)}</span>
                <span className="charge">{charge}% charge</span>
              </div>
            ))}
          </div>
        </div>

        <div className="info">
          <AiOutlineInfoCircle size={32} />
          <span>
            {charge}% gateway charge will be deducted from your inputted balance
          </span>
        </div>

        <div className="inputs">
          <div className="input__container">
            <p className="label">Phone Number</p>
            <div className="warning">
              <p>Enter The Number You Will Be Sending Money From.</p>
            </div>
            <IMaskInput
              mask="+{88\0} 0000 000000"
              signed={false}
              min={10}
              max={10000}
              lazy={true}
              onAccept={(value) => setphone(value)}
            />
          </div>
          <div className="input__container">
            <p className="label">Amount</p>
            <IMaskInput
              mask={Number}
              value={type == "offer" ? `${offer.amount}` : ""}
              signed={false}
              min={10}
              max={10000}
              radix="."
              disabled={type == "offer" || type == "recharge"}
              onAccept={(value) => setamount(value)}
            />
          </div>
          <div className="input__container">
            <p className="label">Transaction ID</p>

            <input
              className="transaction-id"
              value={transactionId}
              onChange={(e) => settransactionId(e.target.value)}
            />
          </div>

          <button
            onClick={handleSubmitClick}
            disabled={!transactionId || !amount || !phone || !paymentMethod}
            className={`btn__submit ${
              (!transactionId || !amount || !phone || !paymentMethod) &&
              "--disabled"
            }`}
          >
            Submit <BsArrowRight />
          </button>
        </div>
      </div>
    </div>
  );
};
export default Topup;
