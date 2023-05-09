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
import { useMutation, useQuery } from "react-query";
import { insertTopupReq } from "../../api/mutations/topup";
import { membershipReq } from "../../api/mutations/membership-buy";
import { PageLoader } from "../shared/SuspenseWrapper";
import { useStateValue } from "../shared/StateProvider";
import NotLoggedIn from "../shared/NotLoggedIn";
import Swal from "sweetalert2";
import {
  TbClipboardCheck,
  TbClipboardText,
  TbCurrencyTaka,
} from "react-icons/tb";
import useClipboard from "react-use-clipboard";
import { getAdminSettings } from "../../api/queries/admin";
import { ACTION_TYPES } from "../../reducer";

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
  const [
    { user, loggedIn, topupFee: charge, membershipFee, adminPaymentPhone },
    dispatch,
  ] = useStateValue();

  const { isLoading: isSettingsLoading } = useQuery(
    ["settings", "all"],
    getAdminSettings,
    {
      onSuccess: (res) => {
        dispatch({
          type: ACTION_TYPES.UPDATE_TOPUPFEE,
          payload: { topupFee: res.data.topupFee },
        });
        dispatch({
          type: ACTION_TYPES.UPDATE_PAYMENT_PHONE,
          payload: { adminPaymentPhone: res.data.adminPaymentPhone },
        });
      },
    }
  );

  const [isCopied, setCopied] = useClipboard(adminPaymentPhone, {
    successDuration: 1000,
  });

  const { isLoading: isTopupReqLoading, mutate: sendTopupReq } =
    useMutation(insertTopupReq);
  const { isLoading: isMembershipReqLoading, mutate: sendMembershipReq } =
    useMutation(membershipReq);

  React.useEffect(() => {
    if (type == "membership") {
      setamount(parseInt(membershipFee));
      setpaymentMethod("balance");
    }
  }, []);

  const handlePaymentMethodClick = (label) => setpaymentMethod(label);

  const handleMembershipBuyClick = () => {
    if (user.balance < amount) {
      return Swal.fire({
        title: "Insufficient Balance",
        icon: "error",
      });
    }

    MySwal.fire({
      title: "Membership!",
      icon: "warning",
      text: `Are You Sure You Want To Buy Membership?`,
      showCancelButton: true,
      cancelButtonText: "No",
      cancelButtonColor: "red",
      showConfirmButton: true,
      confirmButtonText: "Yes",
      confirmButtonColor: "green",
    }).then((result) => {
      if (result.isConfirmed) {
        sendMembershipReq(
          {
            amount,
            userPhone: user.phone,
            paymentMethod: paymentMethod,
            paymentPhone: user.phone,
            transactionId: "N/A",
          },
          {
            onSuccess: (res) => {
              if (res.data.error) {
                return MySwal.fire({
                  title: <p style={{ fontSize: 24 }}>{res.data.message}</p>,
                  text: "You Already Made A Membership Request. Please Wait Until We Process It.",
                  icon: "error",
                });
              } else {
                MySwal.fire({
                  title: <p style={{ fontSize: 24 }}>{res.data.message}</p>,
                  icon: "success",
                });
              }
            },
          }
        );
      }
    });
  };

  const handleSubmitClick = () => {
    const formattedPhone = formatPhone(phone);

    if (paymentMethod == "balance" && user.balance < amount) {
      return Swal.fire({
        title: "Insufficient Balance",
        icon: "error",
      });
    }

    sendTopupReq(
      {
        amount: amount + amount * (charge / 100),
        userPhone: user.phone,
        paymentMethod: paymentMethod,
        paymentPhone: formattedPhone,
        transactionId: transactionId,
      },
      {
        onSuccess: () => {
          setamount(0);
          setpaymentMethod("");
          setpaymentMethod("");
          settransactionId("");
          setphone("");
          MySwal.fire({
            title: <p style={{ fontSize: 24 }}>We Received Your Request!</p>,
            text: "Your request will be processed in a few minutes.",
            icon: "success",
          });
        },
      }
    );
  };

  if (isTopupReqLoading || isMembershipReqLoading || isSettingsLoading) {
    return <PageLoader />;
  }

  if (!loggedIn) {
    return <NotLoggedIn />;
  }

  return (
    <div className={`topup ${type != "topup" && type}`}>
      <AppBar title={title} />

      <div className="container">
        {type == "membership" && (
          <div className="box professional">
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
              <button onClick={handleMembershipBuyClick}>
                BE A MEMBER NOW!
              </button>
            </div>
          </div>
        )}

        <div className="payment__method">
          {type == "topup" && (
            <>
              <p className="payment__method__title">Select Payment Method</p>
              <div className="methods">
                {paymentMethods.map((method) => (
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
                        <span className="label">
                          {formatLabel(method.label)}
                        </span>
                        <span className="charge">{charge}% charge</span>
                      </div>
                    )}
                  </>
                ))}
              </div>
            </>
          )}
        </div>

        {type == "topup" && (
          <div className="info">
            <AiOutlineInfoCircle size={32} />
            {charge > 0 ? (
              <span>You Will Get {charge}% Bonus!</span>
            ) : (
              <span>
                {charge}% gateway charge will be deducted from your inputted
                balance
              </span>
            )}
          </div>
        )}

        {type == "topup" && (
          <div className="receiver-phone">
            <h4>Send To This Number:</h4>
            <button onClick={setCopied} className="value">
              {adminPaymentPhone}
              {isCopied ? (
                <TbClipboardCheck size={20} />
              ) : (
                <TbClipboardText size={20} />
              )}
            </button>
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
                type="tel"
                mask="+{88\0} #000 000000"
                definitions={{
                  "#": /[1-9]/,
                }}
                signed={false}
                lazy={true}
                onAccept={(value) => setphone(value)}
              />
            </div>
          )}
          {type == "topup" && (
            <div className="input__container">
              <p className="label">Amount</p>

              <IMaskInput
                type="number"
                mask={Number}
                signed={false}
                min={10}
                max={10000}
                radix="."
                // @ts-ignore
                onAccept={(value) => setamount(parseInt(value))}
              />
            </div>
          )}
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

          {type == "topup" && (
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
          )}
        </div>
      </div>
    </div>
  );
};
export default Topup;
