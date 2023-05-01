import React from "react";
import AppBar from "../shared/AppBar";
import "./Topup.scss";

// @ts-ignore
import bkash from "../../assets/images/bkash.png";
// @ts-ignore
import nagad from "../../assets/images/nagad.png";
// @ts-ignore
import userIcon from "../../assets/images/user.png";
import { AiOutlineInfoCircle } from "react-icons/ai";
import { MySwal, formatLabel, formatPhone } from "../../uitls";
import { BsArrowDown, BsArrowRight } from "react-icons/bs";
import { IMaskInput } from "react-imask";
import { useMutation } from "react-query";
import { insertTopupReq } from "../../api/mutations/topup";
import { membershipReq } from "../../api/mutations/membership-buy";
import { PageLoader } from "../shared/SuspenseWrapper";
import { useStateValue } from "../shared/StateProvider";
import NotLoggedIn from "../shared/NotLoggedIn";
import Swal from "sweetalert2";
import { TbCurrencyTaka } from "react-icons/tb";

const paymentMethods = [
  {
    label: "nagad",
    imgSrc: nagad,
  },
  {
    label: "bkash",
    imgSrc: bkash,
  },
  {
    label: "balance",
    imgSrc: userIcon,
  },
];

const Topup = ({ type = "topup", title = "", showBalanceMethod = false }) => {
  const [paymentMethod, setpaymentMethod] = React.useState("");
  const [phone, setphone] = React.useState("");
  const [amount, setamount] = React.useState(0);
  const [transactionId, settransactionId] = React.useState("");

  // @ts-ignore
  const [{ user, loggedIn, topupFee: charge, membershipFee }] = useStateValue();

  const { isLoading: isTopupReqLoading, mutate: sendTopupReq } =
    useMutation(insertTopupReq);
  const { isLoading: isMembershipReqLoading, mutate: sendMembershipReq } =
    useMutation(membershipReq);

  React.useEffect(() => {
    if (type == "membership") {
      setamount(membershipFee);
      setpaymentMethod("balance");
    }
  }, []);

  const handlePaymentMethodClick = (label) => setpaymentMethod(label);

  const handleSubmitClick = () => {
    const formattedPhone = formatPhone(phone);

    if (type == "membership") {
      if (paymentMethod == "balance" && user.balance < amount) {
        return Swal.fire({
          title: "Insufficient Balance",
          icon: "error",
        });
      }
      sendMembershipReq(
        {
          amount,
          userPhone: user.phone,
          paymentMethod: paymentMethod,
          paymentPhone:
            paymentMethod == "balance" ? user.phone : formattedPhone,
          transactionId: paymentMethod == "balance" ? "N/A" : transactionId,
        },
        {
          onSuccess: () => {
            MySwal.fire({
              title: <p style={{ fontSize: 24 }}>We Received Your Request!</p>,
              text: "Your request will be processed in a few minutes.",
              icon: "success",
            });
          },
        }
      );
    } else {
      sendTopupReq(
        {
          amount: amount,
          userPhone: user.phone,
          paymentMethod: paymentMethod,
          paymentPhone: formattedPhone,
          transactionId: transactionId,
        },
        {
          onSuccess: () => {
            MySwal.fire({
              title: <p style={{ fontSize: 24 }}>We Received Your Request!</p>,
              text: "Your request will be processed in a few minutes.",
              icon: "success",
            });
          },
        }
      );
    }
  };

  if (isTopupReqLoading || isMembershipReqLoading) {
    return <PageLoader />;
  }

  if (!loggedIn) {
    return <NotLoggedIn />;
  }

  return (
    <div className={`topup ${type != "topup" && type}`}>
      <AppBar title={title} />

      <div className="container">
        {type == 'membership' && <div className="box professional">
          <div className="title">VIP Member</div>
          <div className="price">
            <p>
              <TbCurrencyTaka strokeWidth={3} /> {`${membershipFee}`}
            </p>
            <span>- VIP Features -</span>
          </div>
          <div className="features">
            <div>Buy Wholesale Offers</div>
            <div>Get Cashback Per 1000tk Spend</div>
            <div>Fillup Target & Get Rewards!</div>
            <div>Special Opportunities</div>
          </div>
          <div className="button">
            <button>
              <BsArrowDown /> BE A MEMBER NOW! <BsArrowDown />
            </button>
          </div>
        </div>}

        <div className="payment__method">
          <p className="payment__method__title">Select Payment Method</p>
          <div className="methods">
            {showBalanceMethod ? (
              //  paymentMethods.map((method, i) => (
              <>
                <div
                  key={paymentMethods[2].label}
                  className={`method ${paymentMethods[2].label} ${
                    paymentMethod == paymentMethods[2].label && "--selected"
                  }`}
                  onClick={() =>
                    handlePaymentMethodClick(paymentMethods[2].label)
                  }
                >
                  <div className={`bg ${paymentMethods[2].label}`}>
                    <img
                      src={paymentMethods[2].imgSrc}
                      alt={paymentMethods[2].label}
                    />
                  </div>
                  <span className="label">
                    {formatLabel(paymentMethods[2].label)}
                  </span>
                  <span className="charge">{charge}% charge</span>
                </div>
              </>
            ) : (
              // ))
              paymentMethods.map((method) => (
                <>
                  {method.label != "balance" && (
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
                  )}
                </>
              ))
            )}
          </div>
        </div>

        {type == "topup" && (
          <div className="info">
            <AiOutlineInfoCircle size={32} />
            <span>
              {charge}% gateway charge will be deducted from your inputted
              balance
            </span>
          </div>
        )}

        <div className="inputs">
          {paymentMethod != "balance" && (
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
          )}
          <div className="input__container">
            <p className="label">Amount</p>
            {type == "membership" ? (
              <IMaskInput
                mask={Number}
                value={`${amount}`}
                signed={false}
                min={10}
                max={10000}
                radix="."
                disabled
                // @ts-ignore
                onAccept={(value) => setamount(parseInt(value))}
              />
            ) : (
              <IMaskInput
                mask={Number}
                signed={false}
                min={10}
                max={10000}
                radix="."
                // @ts-ignore
                onAccept={(value) => setamount(parseInt(value))}
              />
            )}
          </div>
          {paymentMethod != "balance" && (
            <div className="input__container">
              <p className="label">Transaction ID</p>

              <input
                className="transaction-id"
                value={transactionId}
                onChange={(e) => settransactionId(e.target.value)}
              />
            </div>
          )}

          {paymentMethod != "balance" ? (
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
          ) : (
            <button
              onClick={handleSubmitClick}
              disabled={!amount || !paymentMethod}
              className={`btn__submit ${
                (!amount || !paymentMethod) && "--disabled"
              }`}
            >
              Buy <BsArrowRight />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
export default Topup;
